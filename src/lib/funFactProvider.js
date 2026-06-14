import { getLocalFunFact } from './funFacts.js';

const ENDPOINT = '/api/funfact';

export async function getFunFact(question) {
  if (!question) return null;

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // question-only payload (no answer)
      body: JSON.stringify({
        questionId: question.id,
        type: question.type,
        prompt: question.prompt,
        topic: question.funFactTopic ?? null,
      }),
    });

    if (!res.ok) throw new Error(`API ${res.status}`);
    const data = await res.json();

    if (!data || typeof data.text !== 'string') throw new Error('Bad payload');

    return { title: data.title ?? 'Fun fact', text: data.text };
  } catch {
    // fallback (so the app still works if API fails)
    return getLocalFunFact(question);
  }
}
/*import { getLocalFunFact } from './funFacts.js';


const PROVIDER = import.meta.env.VITE_FUN_FACT_PROVIDER ?? 'local';
const ENDPOINT = import.meta.env.VITE_FUN_FACT_ENDPOINT ?? '/api/funfact';

export async function getFunFact(question) {
  if (!question) return null;

  if (PROVIDER !== 'api') {
    return getLocalFunFact(question);
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // We intentionally send ONLY question context (not the user's chosen answer)
      // to avoid any possibility of bias.
      body: JSON.stringify({
        questionId: question.id,
        type: question.type,
        prompt: question.prompt,
        topic: question.funFactTopic ?? null,
      }),
    });

    if (!res.ok) throw new Error(`Fun fact endpoint error: ${res.status}`);
    const data = await res.json();
    if (!data || typeof data.text !== 'string') throw new Error('Invalid fun fact payload');

    return {
      title: typeof data.title === 'string' ? data.title : 'Fun fact',
      text: data.text,
    };
  } catch {
    // Fail gracefully to local facts.
    return getLocalFunFact(question);
  }
} */