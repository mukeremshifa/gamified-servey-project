export default function QuestionShell({ question, children, theme }) {
  const isLight = theme === 'light';

  return (
    <section className={'rounded-3xl border p-6 shadow-sm sm:p-8 ' + (isLight ? 'border-slate-200 bg-white/80' : 'border-white/10 bg-white/5')}>
      <div className="flex items-start justify-between gap-4">
        <div>
          {question.title ? (
            <div className={'text-xs font-semibold uppercase tracking-wider ' + (isLight ? 'text-slate-500' : 'text-slate-300')}>
              {question.title}
            </div>
          ) : null}
          <h2 className={'mt-2 text-xl font-semibold leading-snug sm:text-2xl ' + (isLight ? 'text-slate-900' : 'text-white')}>
            {question.prompt}
          </h2>
          {question.helper ? (
            <p className={'mt-2 text-sm ' + (isLight ? 'text-slate-600' : 'text-slate-300')}>{question.helper}</p>
          ) : null}
        </div>
        {typeof question.xp === 'number' ? (
          <div className={'hidden shrink-0 rounded-2xl px-3 py-2 text-xs sm:block ' + (isLight ? 'bg-slate-100 text-slate-700' : 'bg-white/10 text-slate-200')}>
            +{question.xp} XP
          </div>
        ) : null}
      </div>

      <div className="mt-6">{children}</div>
    </section>
  );
}
