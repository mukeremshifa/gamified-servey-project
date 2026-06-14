const FEEDBACK = [
  'Noted!',
  'Thanks!',
  'Got it!',
  'Recorded.',
  'Appreciate it!',
  'All set.',
];

export function getNeutralFeedback() {
  const idx = Math.floor(Math.random() * FEEDBACK.length);
  return FEEDBACK[idx];
}
