@AGENTS.md

## Git — sólo en la PC de Nico

Esta regla aplica **únicamente** si el proyecto está abierto en la carpeta
`D:\Downloads\GILD\GitHub\COTA` (la PC de Nico, que usa GitHub Desktop). En
cualquier otro lugar (por ejemplo, claude.ai/code), seguí el flujo de
publicación de `AGENTS.md`: rama nueva + Pull Request.

- En esa carpeta, Claude NO ejecuta comandos de git que escriban (commit, add, checkout, pull, merge, revert, reset, push, cambio de rama). Dejan archivos `.git/index.lock` / `.git/HEAD.lock` que bloquean GitHub Desktop.
- Solo lectura está permitido: `git status`, `git log`, `git diff`, `git show`.
- Flujo: Claude edita los archivos → Nico commitea y pushea desde GitHub Desktop.
