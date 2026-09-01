import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

export default function FunFactToast({ toast, onClear, theme }) {
  const isLight = theme === 'light';

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => onClear?.(), 2600);
    return () => window.clearTimeout(t);
  }, [toast, onClear]);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 flex items-start justify-center pt-20">
      <AnimatePresence>
        {toast ? (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -8, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.99 }}
            transition={{ type: 'spring', stiffness: 420, damping: 34 }}
            className={
              'max-w-xl rounded-2xl border px-4 py-3 shadow-lg backdrop-blur ' +
              (isLight ? 'border-slate-200 bg-white/90 text-slate-900' : 'border-white/10 bg-white/5 text-white')
            }
          >
            <div className="flex items-start gap-3">
              <div className={'mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl text-sm ' + (isLight ? 'bg-slate-200' : 'bg-white/10')} aria-hidden>
                i
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <div className={'text-xs font-semibold ' + (isLight ? 'text-slate-900' : 'text-white')}>{toast.title ?? 'Fun fact'}</div>
                  {/*<div className="text-[11px] text-slate-300">(about the previous question)</div>*/}
                </div>
                <div className={'mt-1 text-xs ' + (isLight ? 'text-slate-700' : 'text-slate-200')}>{toast.text}</div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}