import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

function funFactApi() {
  return {
    name: 'fun-fact-api',
    configureServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), '');
      const apiKey = env.OPENAI_API_KEY;
      const model = env.OPENAI_MODEL || 'gpt-4.1-mini';

      async function readJson(req) {
        return await new Promise((resolve, reject) => {
          let data = '';
          req.on('data', (chunk) => (data += chunk));
          req.on('end', () => {
            try {
              resolve(data ? JSON.parse(data) : {});
            } catch (e) {
              reject(e);
            }
          });
          req.on('error', reject);
        });
      }

      server.middlewares.use('/api/funfact', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        if (!apiKey) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Missing OPENAI_API_KEY in .env.local' }));
          return;
        }

        let body;
        try {
          body = await readJson(req);
        } catch {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Invalid JSON body' }));
          return;
        }

        const { prompt, type, topic } = body ?? {};
        const safePrompt = typeof prompt === 'string' ? prompt.slice(0, 300) : '';
        const safeType = typeof type === 'string' ? type.slice(0, 40) : '';
        const safeTopic = typeof topic === 'string' ? topic.slice(0, 60) : '';

        const system = [
          'You generate ONE neutral fun fact related to survey design/user research.',
          'Rules:',
          '- Do NOT reference the user’s chosen answer.',
          '- Do NOT give advice or persuasion (“you should”, “try to”).',
          '- Keep it 10–25 words, one sentence.',
          '- Output MUST match the JSON schema exactly.',
        ].join('\n');

        const user = `Question prompt: ${safePrompt}\nQuestion type: ${safeType}\nTopic: ${safeTopic || 'none'}`;

        try {
          const openaiRes = await fetch('https://api.openai.com/v1/responses', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model,
              input: [
                { role: 'system', content: system },
                { role: 'user', content: user },
              ],
              max_output_tokens: 120,
              temperature: 0.7,
              text: {
                format: {
                  type: 'json_schema',
                  name: 'fun_fact',
                  strict: true,
                  schema: {
                    type: 'object',
                    additionalProperties: false,
                    required: ['title', 'text'],
                    properties: {
                      title: { type: 'string' },
                      text: { type: 'string' },
                    },
                  },
                },
              },
            }),
          });

          const data = await openaiRes.json();

          if (!openaiRes.ok) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'OpenAI error', details: data }));
            return;
          }

          const msg = data?.output?.find((x) => x?.type === 'message');
          const outText = msg?.content?.find((c) => c?.type === 'output_text')?.text;

          const parsed = outText ? JSON.parse(outText) : null;

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(parsed ?? { title: 'Fun fact', text: 'Surveys often use short questions to reduce drop-off.' }));
        } catch (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Server exception', details: String(err) }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), funFactApi()],
});