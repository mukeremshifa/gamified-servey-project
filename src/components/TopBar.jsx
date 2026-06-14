import { motion } from 'framer-motion';
import { getLevelInfo } from '../lib/leveling.js';

export default function TopBar({ currentIndex, total, xp }) {
  const { level, progress } = getLevelInfo(xp);
  const safeTotal = Math.max(1, total || 1);
  const step = Math.min(currentIndex + 1, safeTotal);
  const pct = Math.min(1, step / safeTotal);

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-slate-950/50 backdrop-blur">
      <div className="mx-auto flex w-full max-w-4xl items-center gap-4 px-4 py-4">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span>
              Question <span className="font-semibold text-slate-100">{step}</span> of{' '}
              <span className="font-semibold text-slate-100">{safeTotal}</span>
            </span>
            <span className="hidden sm:inline">Participation XP • Neutral feedback</span>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-white/80"
              initial={false}
              animate={{ width: `${pct * 100}%` }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex flex-col items-end leading-tight">
            <div className="text-[11px] text-slate-300">XP</div>
            <div className="text-sm font-semibold">{xp}</div>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm">
              {level}
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <div className="text-[11px] text-slate-300">Level</div>
              <div className="text-sm font-semibold">{Math.round(progress * 100)}%</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
