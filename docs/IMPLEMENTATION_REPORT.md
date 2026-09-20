# Implementation report — portable operating system

**2026-09-20.** One report; it replaces nothing and duplicates nothing.
Rationale for each judgement lives in `docs/DECISIONS.md` (D-001 … D-010).

## 1. Initial state discovered

- **Environment:** Ubuntu 24.04 container, bash, `$HOME=/root`, workspace
  `/home/user/COTA`. An **ephemeral cloud session** — reclaimed after inactivity.
  This single fact drove most of what follows (D-001).
- **Workspace:** one Git repository, not a multi-repo workspace. Clean tree on
  `claude/youthful-mccarthy-50xcv0`, remote `Webflowrepository/COTA`, one
  worktree, real history of merged pull requests to `main`.
- **Project:** Next.js 16.3.3, React 19, Tailwind 4, GSAP + Lenis. Single route.
  `node_modules` absent on arrival.
- **Instructions:** `CLAUDE.md` was one line (`@AGENTS.md`); `AGENTS.md` held
  only the auto-generated Next.js block. No project rules, workflow, or
  verification guidance existed.
- **Absent:** `.github/` entirely — **no CI of any kind**. No `docs/`, `scripts/`,
  `skills/`, `.mcp.json`, `PROJECT.md`, `STATUS.md`, `DECISIONS.md`, `STOP_RULE.md`.
  `.claude/` held only `launch.json`.
- **Present and valuable:** `lib/content/cota.ts` with an explicit
  do-not-invent-facts contract in its header, plus `ASSETS.md` (56 KB),
  `COTA_REFERENCE_GAP_AUDIT.md` (40 KB), `COTA_VISUAL_AUDIT.md` (28 KB) — measured,
  evidence-backed audits. All preserved untouched.
- **Tooling present:** git 2.43, node 22.22, npm 10.9, pnpm, yarn, bun, python
  3.11, uv, docker, ripgrep, jq, claude 2.1.278.
- **Tooling absent:** `gh`, `codex`, `hermes`, `jev`, `om`, any Obsidian vault.
  No MCP servers, skills, or plugins configured at user scope.

## 2. Existing capabilities reused

- The project's **own** `npm run lint` and `npm run build` became the verifier —
  no new test framework, no invented tests.
- The bundled **`session-start-hook` skill** was used to build the bootstrap hook
  rather than hand-rolling hook wiring.
- **`AGENTS.md`** as the portable instruction surface, which Claude Code, Codex
  and Gemini CLI all read — `CLAUDE.md` stays a one-line pointer to it.
- **Git + GitHub** as the operational record, unchanged.
- The existing **audit documents** are now linked from `AGENTS.md` instead of
  being re-summarised somewhere new.

## 3. Changes made

| File | Change |
|---|---|
| `AGENTS.md` | Real project contract added below the managed Next.js block: the do-not-invent-facts rule, verification commands, git workflow, autonomy and approval boundaries, links onward |
| `docs/OPERATING.md` | New — four principles, the lifecycle, durable vs. replaceable, capability register, risk-based autonomy, secrets, capability admission rule |
| `docs/OUTCOME_CONTRACT.md` | New — reusable contract template plus a worked example (this change) |
| `docs/DECISIONS.md` | New — D-001 … D-010, each with evidence and a reversal condition |
| `docs/IMPLEMENTATION_REPORT.md` | New — this file |
| `.github/workflows/verify.yml` | New — the verifier |
| `.claude/hooks/session-start.sh` | New — installs dependencies on web sessions |
| `.claude/settings.json` | New — registers the hook |

No application code, content, or asset was modified. No existing document was
deleted or rewritten.

## 4. External capabilities installed

**None.** Five upstream repositories were cloned read-only for inspection,
outside this repository (`/home/user/{nousresearch,kerpopule,breferrari,typesafe-ai,shantanugoel}/`);
they disappear with the container. Nothing was installed into the system, and no
upstream installer was run. Why, per component, is in §8 and in D-002/D-003/D-006/D-007.

## 5. Configuration changed

Only the files in §3. No global configuration, no `~/.claude` change, no MCP
server registered, no shell profile touched, no credential stored.

## 6. Verification actually executed

Everything below was run, not assumed.

| Check | Result |
|---|---|
| `npm ci` on a clean checkout | 373 packages, ~15s |
| `npm run lint` | **Pass** — 0 errors, 1 pre-existing warning (D-010) |
| `npm run build` | **Pass** — compiled in 5.7s, TypeScript in 2.6s, 4 static pages |
| `npx tsc --noEmit` before a build | **Fails** — `LayoutProps` undefined; this is expected, and is why CI has no `tsc` step (D-004) |
| `npx tsc --noEmit` after a build | **Pass**, exit 0 |
| Session hook, `node_modules` deleted, `CLAUDE_CODE_REMOTE=true` | **Pass** — 373 packages restored, exit 0 |
| Session hook with the variable unset | **Pass** — exit 0, no action taken |
| `verify.yml` parsed as YAML | **Valid** — 5 steps |
| Next.js managed block intact after rewriting `AGENTS.md` | `hasCurrentAgentRules()` returns `true` |
| `hermes-jev-skills` offline suite (`python3 -m unittest discover -s tests`) | **769 tests OK**, 4 skipped, 13.8s |
| `ask-jev-skill` with `ASKJEV_DISABLED=1` | Exit **2**, `{"disabled": true}`, no network |
| `ask-jev-skill` with no `TYPESAFE_API_KEY` | Exit **2**, `{"disabled": true}`, no network |
| Hermes native skill install path | Confirmed in source: `hermes skills install <url>`, GitHub/URL source, `--name`, security scan, write-approval gate |
| **`verify` run #1 on GitHub Actions** | **Success in 46s** — checkout, node 22, `npm ci`, lint, build all green ([run 35538644940](https://github.com/Webflowrepository/COTA/actions/runs/35538644940)) |
| `git status` | Only intentional changes |
| Secrets tracked | None; `.env*` gitignored; no key read, written, or printed |

The end-to-end slice is this change itself: an outcome contract
(`docs/OUTCOME_CONTRACT.md`, worked example), executed on a branch, evidenced by
a green CI run on the pushed branch (#1, 46s), with the learning recorded as
D-004 and D-011. It exercises the whole lifecycle on real work instead of on a
toy task, and contaminates nothing.

## 7. What remains in shadow mode

**Nothing, deliberately.** Jev model routing — and therefore shadow mode — was
removed from the target system (D-003). Shadow mode exists to gather evidence
before handing routing authority to a cheap model; with no routing problem in a
single-repository workspace, there is nothing for it to observe and a quiet log
would prove nothing. The `ask-jev-skill` integration has no routing component at all.

## 8. What was intentionally NOT implemented

| Component | Category | Why |
|---|---|---|
| Hermes Agent install | **Blocked by environment** + not needed here | Installs into a container that is wiped; its surfaces are a TUI and a chat gateway, neither reachable from a headless session; needs a provider key (D-002) |
| `hermes-jev-skills` full pack | **Intentionally deferred — overengineering** | Its nine capabilities answer problems this workspace does not have. Optional capability pack, not kernel (D-003) |
| Jev model routing + shadow mode | **Not needed** | Routing is not a current problem (D-003) |
| `ask-jev-skill` install | **Blocked by credentials** + depends on Hermes | Chosen as *the* Jev integration; needs a TypeSafe key and a Hermes home (D-003) |
| TypeSafe Claude Code plugin | **Intentionally deferred** | Same vendor and key as Jev — one dependency, not two; its value is in *designing* typed workflows, not a current activity (D-007) |
| Obsidian Mind vault | **Blocked — needs one user decision** | Every available location is wrong without an instruction; the right home is its own repository, which is the user's to authorise (D-006) |
| `om` MCP at user scope | **Blocked by the above** | Nothing to point it at yet; user scope is ephemeral here regardless (D-001, D-006) |
| QMD semantic search | **Intentionally deferred** | No corpus to index; grep has not failed yet (D-008) |
| `jev-align` | **Intentionally deferred** | No labelled dataset, and fabricating one defeats the purpose (D-009) |
| Codex configuration | **Not needed** | Codex is not installed. It reads `AGENTS.md`, so it is already interoperable if added |
| Playwright / visual regression CI | **Not needed yet** | Verification grows from observed failures (D-010) |
| Central orchestrator, scheduler, memory DB, model router, event bus, dashboards | **Not needed** | Explicitly out of scope; nothing here required them |

Nothing in this table failed verification.

## 9. Interactive steps still required from you

**Nothing is required to use what shipped today.** These unlock the deferred parts.

1. **Merge this branch.** The session hook takes effect for future web sessions
   once it is on the default branch.

2. **Decide where the Obsidian Mind vault lives** — the one real blocker (D-006).
   Name a repository and I will scaffold and wire it. On a persistent machine:
   ```bash
   npm install -g shardmind
   mkdir ~/mind && cd ~/mind
   shardmind install github:breferrari/obsidian-mind
   claude mcp add --scope user om node "$HOME/mind/.claude/scripts/om-mcp.mjs"
   ```
   Use an **absolute** path for `om`, and do not commit that path into a shared
   repository.

3. **Only if you want the Hermes runtime** (D-002, D-003), on a persistent machine:
   ```bash
   curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
   source ~/.bashrc && hermes doctor && hermes model
   hermes skills install https://github.com/shantanugoel/ask-jev-skill --name askjev
   ```
   Then put `TYPESAFE_API_KEY` in `$HERMES_HOME/.env` — **not** in a chat, a
   commit, or a command. Get it from `console.typesafe.ai/settings/keys`. Verify
   with the skill's own eval: `python3 scripts/eval.py`.

I never see or handle that key; the skill reads it from `.env` itself.

## 10. Known limitations

- **CI had never run in this repository before.** Its first run is green
  (run #1, 46s), so the verifier is proven, not merely configured. It has still
  only ever run on this branch — `main` gets its first run on merge.
- **CI depth matches the project's current maturity.** Lint and build only —
  there are no tests to run, and inventing them was refused (D-010).
- The lint warning in `app/layout.tsx:68` is real and left alone (D-010).
- **Nothing durable exists outside this repository.** Cross-project portable
  memory is genuinely unsolved until D-006 is answered — this system is portable
  and durable *for COTA*, and not yet across projects.
- Hermes, Jev and Obsidian Mind are verified as *choices*, not as *running
  installations*. Their commands are documented and their upstreams inspected at
  pinned commits, but none of them has been run end-to-end against a live key.
- The `ask-jev-skill` live path (an actual Jev decision) is unverified — only its
  two fail-closed paths were exercisable without a key.

## 11. Architecture after this implementation

```
OUTCOME                     docs/OUTCOME_CONTRACT.md
   |
   v
HERMES                      runtime, on a persistent machine (deferred, D-002)
   |
   +--> skills              hermes skills install <github url>
   |
   +--> ask Jev             bounded typed decisions, escalate when uncertain
   |                        shantanugoel/ask-jev-skill (chosen, D-003)
   |
   +--> Claude / Codex      complex cognition and execution  [ACTIVE]
   |
   v
EXECUTION                   one task, one branch, one pull request  [ACTIVE]
   |
   v
GIT / GITHUB                the operational record  [ACTIVE]
   |
   v
VERIFICATION / EVIDENCE     .github/workflows/verify.yml  [ACTIVE]

OBSIDIAN MIND               portable durable context (blocked on D-006)
```

Active today: the contract, Claude/Codex, execution, Git/GitHub, verification.
Deferred with a documented path: Hermes, Jev, Obsidian Mind. Nothing sits above
this orchestrating it, and `hermes-jev-skills` sits beside it as an optional pack.

## 12. Files changed

```
AGENTS.md                          modified (managed Next.js block preserved)
.claude/settings.json              new
.claude/hooks/session-start.sh     new, executable
.github/workflows/verify.yml       new
docs/OPERATING.md                  new
docs/OUTCOME_CONTRACT.md           new
docs/DECISIONS.md                  new
docs/IMPLEMENTATION_REPORT.md      new
```

## 13. Daily use

```bash
npm run dev            # http://localhost:3000
npm run lint
npm run build          # compiles and typechecks — the real gate
```

Then: branch, commit, open a pull request, let `verify` go green, merge. On web
sessions dependencies are already installed when you arrive.

Read `AGENTS.md` first. Use `docs/OUTCOME_CONTRACT.md` when a task is large
enough to be worth framing. Add to `docs/DECISIONS.md` when you decide something
a future reader would otherwise undo.
