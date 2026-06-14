import QuestionShell from './QuestionShell.jsx';

export default function RatingCard({ question, value, onAnswer }) {
  const scale = question.scale ?? 5;

  return (
    <QuestionShell question={question}>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs text-slate-300">Low</div>
          <div className="text-xs text-slate-300">High</div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          {Array.from({ length: scale }, (_, i) => i + 1).map((n) => {
            const selected = typeof value === 'number' && value >= n;
            return (
              <button
                key={n}
                type="button"
                onClick={() => onAnswer(n)}
                className={
                  'flex h-12 w-12 items-center justify-center rounded-2xl border text-xl transition ' +
                  (typeof value === 'number' && value === n
                    ? 'border-white/30 bg-white/10'
                    : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10')
                }
                aria-label={`${n} of ${scale}`}
              >
                <span className={selected ? 'opacity-100' : 'opacity-30'} aria-hidden>
                  ★
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-3 text-center text-xs text-slate-300">
          {typeof value === 'number' ? (
            <span>
              Selected: <span className="font-semibold text-slate-100">{value}</span>
            </span>
          ) : (
            <span>Select a rating to continue.</span>
          )}
        </div>
      </div>
    </QuestionShell>
  );
}
