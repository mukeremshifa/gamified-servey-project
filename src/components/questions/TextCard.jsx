import QuestionShell from './QuestionShell.jsx';

export default function TextCard({ question, value, onAnswer }) {
  const max = question.maxChars ?? 240;
  const text = typeof value === 'string' ? value : '';

  return (
    <QuestionShell question={question}>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <textarea
          value={text}
          onChange={(e) => onAnswer(e.target.value)}
          maxLength={max}
          rows={5}
          placeholder={question.placeholder ?? 'Type your answer…'}
          className="w-full resize-none rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 outline-none ring-0 transition focus:border-white/20"
        />
        <div className="mt-2 flex items-center justify-between text-xs text-slate-300">
          <span className="truncate">Your answer is saved automatically.</span>
          <span>
            {text.length}/{max}
          </span>
        </div>
      </div>
    </QuestionShell>
  );
}
