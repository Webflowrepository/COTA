# Operating principles

How work is done here, independent of which tools are current. Short on purpose.
If a rule below stops earning its keep, delete it.

## Four principles

1. **Constrain outcomes, not cognition.** Say what the result must be, what
   evidence proves it, where the boundaries are, and when to escalate. Do not
   script how a capable model should think.
2. **Do not overengineer.** No abstraction, service, database, orchestrator,
   scheduler, router, or framework without a current problem that demands it.
   Deleting architecture beats adding it.
3. **Use existing capabilities before building.** If something already installed
   solves ~80% of the real requirement, use it. Check before you build.
4. **Tools are replaceable; durable context is not.** Markdown, Git, plain files
   and documented decisions outlive any runtime. No agent's hidden memory is
   ever the source of truth.

## The lifecycle

```
OUTCOME  ->  EXECUTION  ->  EVIDENCE  ->  LEARNING
```

- **Outcome** — what must be true when this is done. `docs/OUTCOME_CONTRACT.md`
  for anything non-trivial.
- **Execution** — one task, one branch, one pull request.
- **Evidence** — a green CI run, a measured number, a screenshot, a diff. Not an
  assertion. "It should work" is not evidence.
- **Learning** — only when evidence actually taught something. Record it in
  `docs/DECISIONS.md`. Do not manufacture an insight per run; most runs have none.

## Durable vs. replaceable

Durable, and therefore in Git as plain Markdown: this file, the outcome contract,
the decision log, `AGENTS.md`, `ASSETS.md`, the audits, and the code.

Replaceable, and therefore never the source of truth: every runtime, model,
agent memory, index, and vendor below.

## Capability register — role, then current tool

Roles are stable. The tools filling them are not. Replacing one should mean
editing one row, not rewriting the system.

| Role | Currently | Status |
|---|---|---|
| Operational record | Git + GitHub (`Webflowrepository/COTA`) | **Active** |
| Verification | `npm run lint`, `npm run build`, via `.github/workflows/verify.yml` | **Active** |
| High-cognition implementation | Claude Code (Codex interoperable via this file's sibling `AGENTS.md`) | **Active** |
| Session bootstrap | `.claude/hooks/session-start.sh` | **Active** |
| Agent runtime | Hermes Agent | Not installed — see D-002 |
| Bounded typed decisions | Jev, via `shantanugoel/ask-jev-skill` | Chosen, not installed — see D-003 |
| Portable durable context | Obsidian Mind vault | Blocked on one decision — see D-006 |
| Routing / memory filtering / compaction | `kerpopule/hermes-jev-skills` | Optional pack, no current need — see D-003 |

## Risk-based autonomy

High autonomy where work is reversible, cheap to undo, and verified. Stronger
safeguards where it is irreversible, externally published, financial,
credential-related, production-destructive, or hard to verify. Do not add
ceremony to low-risk work; do not remove safeguards from high-consequence work.
The concrete list for this repo is in `AGENTS.md`.

## Secrets

Never commit keys, tokens, cookies, or credentials; never echo them into a
report or a chat. `.env*` is gitignored. Each tool uses its own expected store
(`$HERMES_HOME/.env` for Hermes and the Jev skill; the OS keychain where offered).
If a step needs a secret, do everything else first and leave exactly one manual
step.

## Admitting a new capability

Answer all five, in writing, in `docs/DECISIONS.md`:

1. What current problem does this solve?
2. Can something already here solve it?
3. Does it materially improve quality, speed, cost, traceability, verification,
   reuse, or accumulated learning?
4. What new dependency does it introduce?
5. Can it be removed later without losing durable context?

Weak answers mean no. "The spec mentioned it" is not an answer.
