import QuestionShell from './QuestionShell.jsx';

export default function BinaryCard({ question, value, onAnswer, theme }) {
  const isLight = theme === 'light';
  const left = question.leftLabel ?? 'No';
  const right = question.rightLabel ?? 'Yes';

  return (
    <QuestionShell question={question} theme={theme}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onAnswer(false)}
          aria-pressed={value === false}
          className={
            'w-full rounded-2xl border px-4 py-5 text-left transition ' +
            (value === false
              ? isLight
                ? 'border-slate-300 bg-slate-100'
                : 'border-white/30 bg-white/10'
              : isLight
                ? 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100'
                : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10')
          }
        >
          <div className={'text-sm font-semibold ' + (isLight ? 'text-slate-900' : 'text-white')}>{left}</div>
        </button>

        <button
          type="button"
          onClick={() => onAnswer(true)}
          aria-pressed={value === true}
          className={
            'w-full rounded-2xl border px-4 py-5 text-left transition ' +
            (value === true
              ? isLight
                ? 'border-slate-300 bg-slate-100'
                : 'border-white/30 bg-white/10'
              : isLight
                ? 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100'
                : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10')
          }
        >
          <div className={'text-sm font-semibold ' + (isLight ? 'text-slate-900' : 'text-white')}>{right}</div>
        </button>
      </div>
    </QuestionShell>
  );
}
