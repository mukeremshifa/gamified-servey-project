import QuestionShell from './QuestionShell.jsx';

export default function TextCard({ question, value, onAnswer, theme }) {
  const isLight = theme === 'light';
  const max = question.maxChars ?? 240;
  const text = typeof value === 'string' ? value : '';

  return (
    <QuestionShell question={question} theme={theme}>
      <div className={'rounded-2xl border p-5 ' + (isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-white/5')}>
        <textarea
          value={text}
          onChange={(e) => onAnswer(e.target.value)}
          maxLength={max}
          rows={5}
          placeholder={question.placeholder ?? 'Type your answer…'}
          className={
            'w-full resize-none rounded-2xl border px-4 py-3 text-sm outline-none ring-0 transition ' +
            (isLight
              ? 'border-slate-200 bg-white text-slate-900 placeholder:text-slate-500 focus:border-slate-300'
              : 'border-white/10 bg-slate-950/40 text-slate-100 placeholder:text-slate-400 focus:border-white/20')
          }
        />
        <div className={'mt-2 flex items-center justify-between text-xs ' + (isLight ? 'text-slate-600' : 'text-slate-300')}>
          <span className="truncate">Your answer is saved automatically.</span>
          <span>
            {text.length}/{max}
          </span>
        </div>
      </div>
    </QuestionShell>
  );
}
