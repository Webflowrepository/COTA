#!/bin/bash
# Makes `npm run lint` and `npm run build` usable from the first turn of a
# Claude Code on the web session, where the container starts with no node_modules.
# Local sessions are left alone — they already have their own install.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$(dirname "$0")/../..}"
npm install --no-audit --no-fund
