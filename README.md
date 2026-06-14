# 🎮 Survey Quest — a gamified survey prototype

Survey Quest turns an ordinary questionnaire into a short, game-like experience.
You earn XP, level up, unlock badges, and get a confetti finish — all while
answering a normal survey. It is a **frontend-only React prototype** (state lives
in the browser via `localStorage`).

> **Design principle:** XP is awarded for **participation only — never for *which*
> option you choose.** Acknowledgements are deliberately neutral ("Noted!",
> "Recorded.") and the optional AI "fun facts" never reference your answer. This
> keeps the game layer engaging without biasing the responses you collect.

---

## ✨ Features

- **Five question types** — multiple choice, yes/no, star rating, free text, and slider.
- **XP + levels** — flat XP per question plus a completion bonus, surfaced in a live top bar.
- **Badges** — first answer, question-type variety, level-up, and finisher.
- **Neutral feedback toasts** — randomized, answer-agnostic acknowledgements.
- **AI fun facts (optional)** — a short, neutral fact about survey design after each
  question, generated on the dev server and gracefully falling back to built-in facts.
- **Resume support** — progress, answers, and XP persist across refreshes via `localStorage`.
- **Polished UX** — Framer Motion transitions, a confetti completion screen, and a response recap.

## 🧱 Tech stack

| Area | Choice |
| --- | --- |
| Framework | React 19 |
| Build tool | Vite 7 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion, canvas-confetti |
| Lint/format | ESLint 9, Prettier |

---

## 🚀 Quick start (local dev)

Requires **Node.js 20+** (developed on Node 22).

```bash
npm install      # install dependencies
npm run dev      # start the Vite dev server (http://localhost:5173)
```

Other scripts:

```bash
npm run build    # produce the production bundle in dist/
npm run preview  # serve the built bundle locally
npm run lint     # run ESLint
```

### Optional: enable AI-generated fun facts

The fun-fact endpoint runs inside the Vite **dev** server only. To enable it,
create a `.env.local` file with an OpenAI key:

```bash
OPENAI_API_KEY=sk-...        # required to call the API
OPENAI_MODEL=gpt-4.1-mini    # optional, this is the default
```

Without a key (or in any production/Docker build), the app automatically uses the
built-in fallback facts — no configuration required.

---

## 🐳 Build & run with Docker

The image is a two-stage build: Node compiles the static bundle, then nginx serves
it. No API keys or environment variables are required.

```bash
# 1. Build the image (tagged "survey-quest")
docker build -t survey-quest .

# 2. Run it, mapping container port 80 to localhost:8080
docker run --rm -p 8080:80 survey-quest
```

Then open **http://localhost:8080**.

To use a different host port, change the left side of the mapping, e.g.
`-p 3000:80` then visit `http://localhost:3000`. Press `Ctrl+C` to stop (the
`--rm` flag removes the container on exit).

> The container serves the production build, which uses the built-in fun facts.
> The live AI fun-fact endpoint is a dev-server feature and is intentionally not
> part of the production image.

---

## 📁 Project structure

```
src/
  App.jsx                  # Flow control: XP, persistence, toasts, completion
  data/survey.js           # The survey definition (questions + XP + topics)
  lib/
    leveling.js            # XP -> level math and badge rules
    neutralFeedback.js     # Answer-agnostic acknowledgements
    funFactProvider.js     # Fetch AI fun fact, fall back to local
    funFacts.js            # Built-in fun facts by topic/type
  components/
    TopBar.jsx             # Progress bar + level/XP
    RenderQuestion.jsx     # Maps question.type -> the right card
    FloatingToast.jsx      # "+XP earned" toast
    FunFactToast.jsx       # Fun-fact toast
    CompletionScreen.jsx   # Results, badges, confetti, recap
    questions/             # One card per question type (+ shared QuestionShell)
vite.config.js             # Vite + Tailwind + dev-only fun-fact API
Dockerfile                 # Multi-stage build -> nginx
nginx.conf                 # SPA fallback + asset caching
```

---

## 🗺️ Roadmap ideas

- Persist responses to a real backend (currently `localStorage` only).
- Adaptive/branching questions that still keep rewards participation-based.
- Milestone celebrations, animated XP count-up, and a `prefers-reduced-motion` path.
- Optional skip handling and an estimated-time-remaining indicator to cut drop-off.
