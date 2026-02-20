import confetti from 'canvas-confetti';
import { useEffect, useMemo } from 'react';
import { getBadges, getLevelInfo } from '../lib/leveling.js';

function formatAnswer(question, answer) {
  switch (question.type) {
    case 'binary':
      if (typeof answer === 'boolean') {
        if (answer) return question.rightLabel ?? 'Yes';
        return question.leftLabel ?? 'No';
      }
      return String(answer);
    case 'rating':
      return `${answer}/${question.scale ?? 5}`;
    case 'slider':
      return `${answer}${question.unit ? ` ${question.unit}` : ''}`;
    case 'text':
      return String(answer);
    case 'mcq':
      return String(answer);
    default:
      return String(answer);
  }
}

export default function CompletionScreen({ xp, answers, questions, onRestart }) {
  const { level } = getLevelInfo(xp);

  const answeredCount = useMemo(() => {
    return questions.reduce((count, q) => (answers[q.id] !== undefined ? count + 1 : count), 0);
  }, [answers, questions]);

  const distinctTypes = useMemo(() => {
    const set = new Set();
    for (const q of questions) {
      if (answers[q.id] !== undefined) set.add(q.type);
    }
    return set.size;
  }, [answers, questions]);

  const badges = useMemo(() => {
    return getBadges({
      xp,
      answeredCount,
      totalQuestions: questions.length,
      distinctTypes,
    });
  }, [xp, answeredCount, questions.length, distinctTypes]);

  useEffect(() => {
    // Small celebration burst
    const durationMs = 1200;
    const end = Date.now() + durationMs;
    const frame = () => {
      confetti({
        particleCount: 5,
        startVelocity: 30,
        spread: 55,
        ticks: 120,
        origin: { x: 0.15, y: 0.2 },
      });
      confetti({
        particleCount: 5,
        startVelocity: 30,
        spread: 55,
        ticks: 120,
        origin: { x: 0.85, y: 0.2 },
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  return (
    <section className="flex flex-1 flex-col gap-5">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Completed
            </div>
            <h1 className="mt-2 text-2xl font-semibold leading-tight sm:text-3xl">
              Thanks for sharing — you’re done.
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-300">
              This prototype awards XP for participation only (never based on which option you pick).
            </p>
          </div>

          <div className="mt-4 flex shrink-0 items-center gap-3 sm:mt-0">
            <div className="rounded-2xl bg-white/10 px-4 py-3">
              <div className="text-[11px] text-slate-300">Total XP</div>
              <div className="text-xl font-semibold">{xp}</div>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3">
              <div className="text-[11px] text-slate-300">Level</div>
              <div className="text-xl font-semibold">{level}</div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="text-sm font-semibold">Badges</div>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {badges.map((b) => (
              <div
                key={b.id}
                className={
                  'flex items-start gap-3 rounded-2xl border p-4 ' +
                  (b.unlocked
                    ? 'border-white/10 bg-white/5'
                    : 'border-white/5 bg-white/5 opacity-60')
                }
              >
                <div
                  className={
                    'flex h-10 w-10 items-center justify-center rounded-xl text-lg ' +
                    (b.unlocked ? 'bg-white/10' : 'bg-white/5')
                  }
                >
                  {b.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold">
                    {b.title}{' '}
                    {!b.unlocked ? (
                      <span className="ml-1 align-middle text-[10px] font-semibold text-slate-400">
                        LOCKED
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-1 text-xs text-slate-300">{b.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-slate-300">
            Answers are stored in app state (and persisted to localStorage for the demo).
          </div>
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center justify-center rounded-xl bg-white/90 px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-white"
          >
            Restart
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold">Response recap</div>
            <div className="mt-1 text-xs text-slate-300">
              A quick preview to prove answers are being saved.
            </div>
          </div>
          <div className="text-xs text-slate-300">
            {answeredCount}/{questions.length} answered
          </div>
        </div>

        <div className="mt-4 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10">
          {questions.map((q) => (
            <div key={q.id} className="bg-white/5 px-4 py-3">
              <div className="text-xs font-semibold text-slate-200">{q.prompt}</div>
              <div className="mt-1 text-sm text-slate-100">
                {answers[q.id] === undefined ? (
                  <span className="text-slate-400">(no response)</span>
                ) : (
                  formatAnswer(q, answers[q.id])
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
