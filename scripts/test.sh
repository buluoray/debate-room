#!/usr/bin/env bash
# Run every check: backend unit tests, then the UI type check, tests and build.
# The UI part is skipped (with a note) when npm is not on PATH.
set -euo pipefail
cd "$(dirname "$0")/.."

echo "== backend: python3 -m unittest"
python3 -m unittest discover -s tests -t . -v

if command -v npm >/dev/null 2>&1; then
  echo "== ui: npm run check (tsc, vitest, vite build)"
  cd ui
  [ -d node_modules ] || npm ci --no-audit --no-fund
  npm run check
else
  echo "== ui: skipped, npm not found on PATH"
fi
