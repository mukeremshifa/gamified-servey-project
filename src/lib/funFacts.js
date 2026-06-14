

const FACTS_BY_TOPIC = {
  survey_design: {
    title: 'Fun fact',
    text: 'Surveys often start with simpler questions to help people “warm up” and reduce drop-off.',
  },
  binary_questions: {
    title: 'Fun fact',
    text: 'Yes/No questions are quick, but designers often pair them with follow-ups to learn the “why”.',
  },
  likert_scales: {
    title: 'Fun fact',
    text: 'Rating scales are popular because they’re easy to answer and easy to compare across users.',
  },
  open_ended: {
    title: 'Fun fact',
    text: 'Open-text answers are harder to analyze, but they can reveal ideas that options can’t predict.',
  },
  sliders: {
    title: 'Fun fact',
    text: 'Sliders can feel “lighter” than typing, so teams often use them for quick estimates.',
  },
  prioritization: {
    title: 'Fun fact',
    text: 'When people pick just one option, it forces trade-offs and helps teams see priorities more clearly.',
  },
  commitment: {
    title: 'Fun fact',
    text: 'A small “commitment” question can help teams learn whether people want guidance or autonomy.',
  },
  recommendation: {
    title: 'Fun fact',
    text: 'Recommendation questions are common because they summarize a user’s overall feeling in one number.',
  },
};

const FALLBACK_BY_TYPE = {
  mcq: { title: 'Fun fact', text: 'Multiple-choice is fast to answer and makes results easy to segment later.' },
  binary: { title: 'Fun fact', text: 'Binary questions are great for quick decisions, but they intentionally keep nuance low.' },
  rating: { title: 'Fun fact', text: 'Ratings work best when the scale meaning is clearly labeled (like 1 = low, 5 = high).' },
  text: { title: 'Fun fact', text: 'Short prompts tend to get higher completion than long-form writing in surveys.' },
  slider: { title: 'Fun fact', text: 'Sliders are often used when an exact number is less important than an approximate range.' },
};

export function getLocalFunFact(question) {
  const topic = question.funFactTopic;
  if (topic && FACTS_BY_TOPIC[topic]) return FACTS_BY_TOPIC[topic];
  return FALLBACK_BY_TYPE[question.type] ?? { title: 'Fun fact', text: 'Thanks for participating!' };
}