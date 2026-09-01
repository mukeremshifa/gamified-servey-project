import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

export default function FloatingToast({ toast, onClear, theme }) {
  const isLight = theme === 'light';

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => onClear?.(), 1400);
    return () => window.clearTimeout(t);
  }, [toast, onClear]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-start justify-center pt-4">
      <AnimatePresence>
        {toast ? (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.99 }}
            transition={{ type: 'spring', stiffness: 520, damping: 32 }}
            className={
              'rounded-2xl border px-4 py-3 shadow-lg backdrop-blur ' +
              (isLight ? 'border-slate-200 bg-white/85 text-slate-900' : 'border-white/10 bg-slate-950/70 text-white')
            }
          >
            <div className="flex items-center gap-3">
              <div className={'flex h-9 w-9 items-center justify-center rounded-xl text-sm font-semibold ' + (isLight ? 'bg-slate-200' : 'bg-white/10')}>
                +{toast.xpDelta}
              </div>
              <div className="flex flex-col">
                <div className={'text-xs font-semibold ' + (isLight ? 'text-slate-900' : 'text-white')}>XP earned</div>
                <div className={'text-xs ' + (isLight ? 'text-slate-700' : 'text-slate-200')}>{toast.message}</div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
