import { useEffect, useMemo, useState } from 'react';
import QuestionShell from './QuestionShell.jsx';

export default function SliderCard({ question, value, onAnswer, theme }) {
  const isLight = theme === 'light';
  const defaultValue = useMemo(() => {
    if (typeof question.defaultValue === 'number') return question.defaultValue;
    if (typeof question.min === 'number' && typeof question.max === 'number') {
      return Math.round((question.min + question.max) / 2);
    }
    return 0;
  }, [question.defaultValue, question.min, question.max]);

  const [internal, setInternal] = useState(typeof value === 'number' ? value : defaultValue);

  useEffect(() => {
    if (typeof value === 'number') setInternal(value);
  }, [value]);

  const unit = question.unit ? ` ${question.unit}` : '';
  const touched = typeof value === 'number';

  return (
    <QuestionShell question={question} theme={theme}>
      <div className={'rounded-2xl border p-5 ' + (isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-white/5')}>
        <div className="flex items-center justify-between gap-3">
          <div className={'text-xs ' + (isLight ? 'text-slate-600' : 'text-slate-300')}>{question.leftLabel ?? question.min}</div>
          <div className={'rounded-xl px-3 py-1 text-sm font-semibold ' + (isLight ? 'bg-slate-200 text-slate-900' : 'bg-white/10 text-slate-100')}>
            {internal}
            {unit}
          </div>
          <div className={'text-xs ' + (isLight ? 'text-slate-600' : 'text-slate-300')}>{question.rightLabel ?? question.max}</div>
        </div>

        <input
          type="range"
          min={question.min}
          max={question.max}
          step={question.step ?? 1}
          value={internal}
          onChange={(e) => {
            const next = Number(e.target.value);
            setInternal(next);
            onAnswer(next);
          }}
          className={'mt-5 w-full ' + (isLight ? 'accent-slate-900' : 'accent-white')}
          aria-label="Slider"
        />

        {!touched ? (
          <div className={'mt-2 text-xs ' + (isLight ? 'text-slate-500' : 'text-slate-400')}>Move the slider to set your answer.</div>
        ) : (
          <div className={'mt-2 text-xs ' + (isLight ? 'text-slate-600' : 'text-slate-300')}>Saved.</div>
        )}
      </div>
    </QuestionShell>
  );
}
