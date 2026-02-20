export default function QuestionShell({ question, children }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          {question.title ? (
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              {question.title}
            </div>
          ) : null}
          <h2 className="mt-2 text-xl font-semibold leading-snug sm:text-2xl">{question.prompt}</h2>
          {question.helper ? (
            <p className="mt-2 text-sm text-slate-300">{question.helper}</p>
          ) : null}
        </div>
        {typeof question.xp === 'number' ? (
          <div className="hidden shrink-0 rounded-2xl bg-white/10 px-3 py-2 text-xs text-slate-200 sm:block">
            +{question.xp} XP
          </div>
        ) : null}
      </div>

      <div className="mt-6">{children}</div>
    </section>
  );
}
