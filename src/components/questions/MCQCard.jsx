import QuestionShell from './QuestionShell.jsx';

export default function MCQCard({ question, value, onAnswer, theme }) {
  const isLight = theme === 'light';

  return (
    <QuestionShell question={question} theme={theme}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {question.options?.map((opt) => {
          const selected = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onAnswer(opt)}
              aria-pressed={selected}
              className={
                'group w-full rounded-2xl border px-4 py-4 text-left transition ' +
                (selected
                  ? isLight
                    ? 'border-slate-300 bg-slate-100'
                    : 'border-white/30 bg-white/10'
                  : isLight
                    ? 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100'
                    : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10')
              }
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className={'text-sm font-semibold ' + (isLight ? 'text-slate-900' : 'text-slate-100')}>{opt}</div>
                </div>
                <div
                  className={
                    'flex h-8 w-8 items-center justify-center rounded-xl border text-sm transition ' +
                    (selected
                      ? isLight
                        ? 'border-slate-300 bg-slate-200'
                        : 'border-white/30 bg-white/10'
                      : isLight
                        ? 'border-slate-200 bg-slate-100 opacity-0 group-hover:opacity-100'
                        : 'border-white/10 bg-white/5 opacity-0 group-hover:opacity-100')
                  }
                  aria-hidden
                >
                  {selected ? '✓' : '→'}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </QuestionShell>
  );
}
