# Debate Room

A [Kiro Crew](https://github.com/kirodotdev/KiroCrew) app for technical decisions.

Write a question such as "Postgres or DynamoDB for a 2-person startup?" and click
**Debate**. Three agents start at once, each with one point of view:
**Security**, **Cost** and **Delivery speed**. Their chats run side by side, and
you can type into any one of them to add a fact ("the client only has 2 ops
people"); that agent picks it up and continues. Click **Decide** and a **Judge**
agent reads all three chats and writes a decision record: the choice, why, and
the risks. Past decisions are saved and listed.

## Requirements

- Kiro Crew 0.13 or later, signed in to Kiro (the agents need it).
- Node.js 22 and npm, to build the page.
- Python 3.10 or later, for the backend tests.

## Install

```bash
cd ui && npm ci && npm run build && cd ..   # builds ui/dist/index.mjs
kirocrew app install "$PWD"
kirocrew app enable debate-room
```

Enable asks you to trust the app, because its backend is Python that runs inside
the Kiro Crew gateway. In the dashboard: App Store, find Debate Room, Enable, and
accept the trust prompt. The app then shows in the sidebar.

After you change the code, rebuild the page and run
`kirocrew app update debate-room --source "$PWD"`.

## Dev mode

`kirocrew app dev debate-room` serves the page with no caching and reloads it
when files change, so you only need `npm run build` (or `npx vite build --watch`
in `ui/`) between edits. Turn it off with `kirocrew app dev debate-room --off`.

## Tests

One command runs everything:

```bash
./scripts/test.sh
```

That runs the backend unit tests (`python3 -m unittest discover -s tests -t .`,
standard library only) and then, when npm is installed, the UI checks
(`cd ui && npm run check`: `tsc`, `vitest` and the production build).

## Code layout

Each feature lives in its own file, and the backend finds new pieces by itself,
so most changes add a file instead of editing a shared one.

```
app.json                  manifest: agents, backend hooks, page, permissions
agents/*.json             one agent per persona, plus the Judge
backend/
  api.py                  route registry: loads every backend/routes/*.py
  routes/*.py             one module per endpoint group; each exports ROUTES
  personas/*.json         persona registry: id, label, focus, colour, agent, order
  core/                   shared helpers: store, prompts, decision parsing, http
tests/                    backend unit tests (unittest); tests/fakes.py fakes Kiro Crew
ui/src/
  App.tsx                 the page: wires the components together
  components/*.tsx        one component per file
  lib/*.ts                API client, types and small pure helpers (+ *.test.ts)
scripts/test.sh           runs all checks
```

### Adding things

- **An endpoint**: add `backend/routes/<name>.py` with a `ROUTES` list of
  `Route(method, path, handler)`. Paths are relative to `/api/apps/debate-room/`.
  A handler is `async def handler(request, ctx)`.
- **A persona**: add `backend/personas/<id>.json` and `agents/<id>.json`, and list
  the agent file in `app.json` under `agents`.
- **A UI piece**: add `ui/src/components/<Name>.tsx` and mount it where it belongs.

## How it works

- The page asks the backend for a debate plan (`POST /debates`), then creates one
  chat session per persona through the Kiro Crew chat API and sends each its
  opening prompt. Each chat is shown with the App SDK's `ChatEmbed`.
- **Decide** reads the three transcripts, sends them to
  `POST /debates/{id}/decide`, and the backend runs the Judge with `ctx.turns`.
  The decision is saved with `ctx.storage`.

## License

MIT
