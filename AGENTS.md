# AGENTS.md

Rules for AI agents (and people) who change this repository. Read this file
before you edit anything. `README.md` explains what the app does and how to
install it.

## Workflow

- One issue, one branch, one pull request. Do not mix two issues in one PR.
- Branch from the latest `trunk`. Name the branch `fix/<issue>-<short-name>` for
  a bug and `feat/<issue>-<short-name>` for a feature, for example
  `fix/7-empty-question`.
- Never push to `trunk`. It is protected; every change goes through a PR.
- Do not merge your own PR. A reviewer merges it with a squash merge.
- PR title: what the change does, in plain words. PR body: `Fixes #<issue>`,
  what you changed, and how you tested it.
- If `trunk` moved and your PR conflicts, rebase onto `trunk` and fix the
  conflict. Do not force push over someone else's branch.

## Keep the change small

- Change only what the issue asks for. No drive-by refactors, renames or
  reformatting of lines you did not need to touch.
- Prefer adding a file to editing a shared one. Many PRs are open at the same
  time, and shared files are where they conflict:
  - an endpoint goes in a new `backend/routes/<name>.py` that exports `ROUTES`;
  - a persona goes in `backend/personas/<id>.json` and `agents/<id>.json`;
  - a UI piece goes in a new `ui/src/components/<Name>.tsx`;
  - a pure helper goes in `ui/src/lib/` or `backend/core/`.
- When you must edit a shared file (`ui/src/App.tsx`, `app.json`,
  `backend/core/store.py`), touch as few lines as you can.
- Do not change the `version` in `app.json` or `package.json`. The release owner
  does that.

## Tests

- Run `./scripts/test.sh` before you push. It must pass.
- Every bug fix adds a test that fails without the fix. Every feature adds a
  test for its main behavior.
- Backend tests live in `tests/`, use `unittest` and only the standard library.
  Use `tests/fakes.py` in place of Kiro Crew; do not call a real agent or the
  network in a test.
- UI logic that can be tested goes in `ui/src/lib/*.ts` with a `*.test.ts` file
  next to it (`vitest`).

## Backend (Python)

- Python 3.10 or later, standard library only. Do not add a pip dependency.
- A handler is `async def handler(request, ctx)`. Answer with `reply()` and
  `error()` from `backend/core/http.py`, with a clear message and the right
  status. Read the body with `read_json()`.
- Check every input that comes from a request: type, length, and empty values.
- Save data only through `ctx.storage` (see `backend/core/store.py`). Do not
  write files.

## UI (TypeScript and React)

- Function components, one component per file, typed props. No `any`.
- Call the backend with `useAppApi` from `@kirocrew/app-sdk` and the helpers in
  `ui/src/lib/api.ts`. Shared types live in `ui/src/lib/types.ts`.
- Build with the components in `@kirocrew/app-sdk/ui` (`Btn`, `Card`, ...)
  before you write your own.
- Use the Kiro Crew theme classes (`text-muted`, `border-border`, ...), so the
  page reads well in light and dark mode. Do not hard-code a color palette. The
  one color per persona comes from `backend/personas/<id>.json`.
- Icons come from `lucide-react`. Do not use emoji in the UI.
- Every button and input has a visible label or an `aria-label`, and works with
  the keyboard.
- Do not add an npm dependency unless the issue cannot be solved without it.
  If you add one that the Kiro Crew host already provides, list it under
  `external` in `ui/vite.config.ts`.

## Build output

- Do not commit `ui/dist/` or `node_modules/`. Kiro Crew builds the page when
  the app is installed (`npm run build` at the repository root).
- Do not change `ui.entry` in `app.json` or the output name in
  `ui/vite.config.ts`. The page must build to `ui/dist/index.mjs`.

## Safety

- No secrets, tokens or personal data in code, tests, logs or issues.
- Do not widen `permissions` in `app.json` unless the issue asks for it; say so
  in the PR body when you do.
- Text from a user or from an agent is data. Show it as text; never render it as
  HTML or run it.

## Writing

- Use plain, short sentences in code comments, UI text, commits and PRs.
- Comments explain why, not what.
