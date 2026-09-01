import { motion } from 'framer-motion';
import { getLevelInfo } from '../lib/leveling.js';

export default function TopBar({ currentIndex, total, xp, theme, onToggleTheme }) {
  const { level, progress } = getLevelInfo(xp);
  const safeTotal = Math.max(1, total || 1);
  const step = Math.min(currentIndex + 1, safeTotal);
  const pct = Math.min(1, step / safeTotal);

  const isLight = theme === 'light';

  return (
    <header
      className={
        'sticky top-0 z-40 border-b backdrop-blur ' +
        (isLight ? 'border-slate-200 bg-white/70' : 'border-white/5 bg-slate-950/50')
      }
    >
      <div className="mx-auto flex w-full max-w-4xl items-center gap-4 px-4 py-4">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className={'flex items-center justify-between text-xs ' + (isLight ? 'text-slate-600' : 'text-slate-300')}>
            <span>
              Question <span className={'font-semibold ' + (isLight ? 'text-slate-900' : 'text-slate-100')}>{step}</span> of{' '}
              <span className={'font-semibold ' + (isLight ? 'text-slate-900' : 'text-slate-100')}>{safeTotal}</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onToggleTheme}
                className={
                  'rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] transition ' +
                  (isLight
                    ? 'border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200'
                    : 'border-white/10 bg-white/10 text-slate-200 hover:bg-white/15')
                }
              >
                {isLight ? 'Dark' : 'Light'}
              </button>
              <span className="hidden sm:inline">Participation XP • Neutral feedback</span>
            </div>
          </div>

          <div className={'h-2 w-full overflow-hidden rounded-full ' + (isLight ? 'bg-slate-200' : 'bg-white/10')}>
            <motion.div
              className={'h-full rounded-full ' + (isLight ? 'bg-slate-900' : 'bg-white/80')}
              initial={false}
              animate={{ width: `${pct * 100}%` }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className={'hidden sm:flex flex-col items-end leading-tight ' + (isLight ? 'text-slate-600' : 'text-slate-300')}>
            <div className="text-[11px]">XP</div>
            <div className="text-sm font-semibold">{xp}</div>
          </div>

          <div className={'flex items-center gap-2 rounded-full px-3 py-2 ' + (isLight ? 'bg-slate-100' : 'bg-white/10')}>
            <div className={'flex h-8 w-8 items-center justify-center rounded-full text-sm ' + (isLight ? 'bg-slate-200' : 'bg-white/10')}>
              {level}
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <div className={'text-[11px] ' + (isLight ? 'text-slate-600' : 'text-slate-300')}>Level</div>
              <div className={'text-sm font-semibold ' + (isLight ? 'text-slate-900' : 'text-slate-100')}>{Math.round(progress * 100)}%</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
