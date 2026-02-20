import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import CompletionScreen from './components/CompletionScreen.jsx';
import FloatingToast from './components/FloatingToast.jsx';
import RenderQuestion from './components/RenderQuestion.jsx';
import TopBar from './components/TopBar.jsx';
import { SURVEY, SURVEY_ID } from './data/survey.js';
import { getNeutralFeedback } from './lib/neutralFeedback.js';

const STORAGE_KEY = `gamifiedSurveyState:${SURVEY_ID}`;

function isAnswerValid(question, value) {
  if (value === undefined || value === null) return false;
  switch (question.type) {
    case 'text':
      return String(value).trim().length > 0;
    case 'rating':
      return typeof value === 'number' && Number.isFinite(value) && value >= 1;
    case 'slider':
      return typeof value === 'number' && Number.isFinite(value);
    case 'binary':
      return typeof value === 'boolean';
    case 'mcq':
      return typeof value === 'string' && value.length > 0;
    default:
      return true;
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.surveyId !== SURVEY_ID) return null;
    return parsed;
  } catch {
    return null;
  }
}

export default function App() {
  const saved = useMemo(() => (typeof window !== 'undefined' ? loadState() : null), []);

  const [currentIndex, setCurrentIndex] = useState(saved?.currentIndex ?? 0);
  const [xp, setXp] = useState(saved?.xp ?? 0);
  const [answers, setAnswers] = useState(saved?.answers ?? {});
  const [rewardedIds, setRewardedIds] = useState(() => {
    // If someone clears storage mid-run, treat already-present answers as already rewarded.
    const fromStorage = saved?.rewardedIds;
    const fromAnswers = Object.keys(saved?.answers ?? {});
    return new Set(fromStorage ?? fromAnswers);
  });
  const [toast, setToast] = useState(null);

  const total = SURVEY.length;
  const isComplete = currentIndex >= total;

  const currentQuestion = useMemo(() => {
    if (isComplete) return null;
    return SURVEY[currentIndex];
  }, [currentIndex, isComplete]);

  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
  const canGoNext = currentQuestion ? isAnswerValid(currentQuestion, currentAnswer) : false;

  useEffect(() => {
    // Persist progress (nice-to-have). Keeping it lightweight.
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          surveyId: SURVEY_ID,
          currentIndex,
          xp,
          answers,
          rewardedIds: Array.from(rewardedIds),
        })
      );
    } catch {
      // ignore
    }
  }, [currentIndex, xp, answers, rewardedIds]);

  const awardXp = (amount) => {
    setXp((prev) => prev + amount);
    setToast({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      xpDelta: amount,
      message: getNeutralFeedback(),
    });
  };

  const handleAnswer = (questionId, value) => {
    const question = SURVEY.find((q) => q.id === questionId);
    if (!question) return;

    setAnswers((prev) => ({ ...prev, [questionId]: value }));

    const alreadyRewarded = rewardedIds.has(questionId);
    const validNow = isAnswerValid(question, value);

    if (!alreadyRewarded && validNow) {
      setRewardedIds((prev) => {
        const next = new Set(prev);
        next.add(questionId);
        return next;
      });
      awardXp(question.xp ?? 25);
    }
  };

  const handleNext = () => {
    if (!currentQuestion) return;
    if (!canGoNext) return;

    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1);
      return;
    }

    // Completion bonus (progress-based, not answer-content-based)
    const completionBonusId = '__completion_bonus__';
    if (!rewardedIds.has(completionBonusId)) {
      setRewardedIds((prev) => {
        const next = new Set(prev);
        next.add(completionBonusId);
        return next;
      });
      awardXp(100);
    }
    setCurrentIndex(total);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setXp(0);
    setAnswers({});
    setRewardedIds(new Set());
    setToast(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <TopBar currentIndex={Math.min(currentIndex, total)} total={total} xp={xp} />

      <FloatingToast toast={toast} onClear={() => setToast(null)} />

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 pb-10 pt-6">
        <AnimatePresence mode="wait" initial={false}>
          {isComplete ? (
            <motion.div
              key="completion"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <CompletionScreen
                xp={xp}
                answers={answers}
                questions={SURVEY}
                onRestart={handleRestart}
              />
            </motion.div>
          ) : (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.22 }}
              className="flex flex-1 flex-col"
            >
              <RenderQuestion
                question={currentQuestion}
                value={currentAnswer}
                onAnswer={(val) => handleAnswer(currentQuestion.id, val)}
              />

              <div className="mt-5 flex items-center justify-between gap-3">
                <div className="text-xs text-slate-300">
                  <span className="hidden sm:inline">
                    XP is earned for participation only — your choice doesn’t change rewards.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canGoNext}
                  className={
                    'inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold shadow-sm transition ' +
                    (canGoNext
                      ? 'bg-white/90 text-slate-950 hover:bg-white'
                      : 'cursor-not-allowed bg-white/10 text-slate-400')
                  }
                >
                  Next
                  <span aria-hidden className="text-base">
                    →
                  </span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
