@AGENTS.md

## Git — regla fija

- Claude NO ejecuta comandos de git que escriban (commit, add, checkout, pull, merge, revert, reset, push, cambio de rama). Dejan archivos `.git/index.lock` / `.git/HEAD.lock` que bloquean GitHub Desktop.
- Solo lectura está permitido: `git status`, `git log`, `git diff`, `git show`.
- Flujo: Claude edita los archivos → Nico commitea y pushea desde GitHub Desktop.
