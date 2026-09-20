# Decision log

Append-only. Newest last. Each entry says what was decided, what evidence
supported it, and what would reverse it. Read this before undoing something that
looks arbitrary — it usually is not.

Status values: **Active** · **Deferred** · **Superseded**

---

## D-001 — The durable layer lives in this repository
**2026-09-20 · Active**

Web sessions run in an isolated container that is reclaimed after inactivity.
`$HOME` is `/root`; `~/.hermes`, `~/.claude/skills`, and `~/.local/bin` do not
survive it. Verified: a fresh container started with no `node_modules` and no
user-level MCP servers, skills, or plugins configured.

So the durable operating system is **Markdown and CI in Git**, not software
installed into a container. Runtime tools are reconstituted per machine from
documented commands; they are never where knowledge lives. This is principle 4
applied to the actual environment rather than to an assumed laptop.

*Reverses if:* work moves primarily to a persistent machine, at which point the
user-level installs in D-002/D-003/D-006 become worth doing once.

---

## D-002 — Hermes Agent is not installed in cloud sessions
**2026-09-20 · Deferred**

Inspected `NousResearch/hermes-agent` at `efc947d`. It is real, active, and
installs via `curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash`,
which pulls uv, Python 3.11, Node, ripgrep and ffmpeg into `~/.hermes`.

Not installed here, for three reasons that all point the same way: the install
target is wiped (D-001); Hermes's surfaces are a TUI and a messaging gateway
(Telegram/Discord/Slack), neither of which a headless cloud session can use; and
it needs a model-provider key that is not present. Against the admission rule in
`docs/OPERATING.md`, question 1 has no answer today.

Hermes remains the right runtime **on a persistent machine** — that is where the
updated architecture puts it, and the install is one documented command when the
user wants it.

*Reverses if:* the user wants an always-on agent reachable from Telegram or a
VPS. Then: install, `hermes doctor`, `hermes model`, and D-003 lands on top.

---

## D-003 — Jev arrives as `ask-jev-skill`, not the full `hermes-jev-skills` pack
**2026-09-20 · Active (chosen), Deferred (installation)**

Both were inspected in full.

`kerpopule/hermes-jev-skills` at `29e64b5` is a capable package: nine skills, a
`jev` CLI on PATH, a Hermes plugin that edits `plugins.enabled` in every
profile's `config.yaml`, a routing dashboard, and routing pools in
`~/.hermes/jev/routing.json`. Its offline test suite was run here: **769 tests,
OK, 4 skipped, 13.8s.** The software is sound.

`shantanugoel/ask-jev-skill` at `72313d3` is one `SKILL.md` and two stdlib-only
Python scripts, 284 KB, against a single endpoint (`api.typesafe.ai/v1/systemone`).
It does exactly the bounded-decision job: typed Choice / Score / Noul answers with
calibrated confidence, explicit `act` / `escalate` verdicts, a 0.6 default gate and
0.85 for destructive work. Uninstall is `rm -rf` the directory or `ASKJEV_DISABLED=1`.

**Chosen: `ask-jev-skill`.** It covers the current requirement — cheap bounded
typed decisions, with escalation to a frontier model when uncertain — at a
fraction of the footprint. The wider pack's extra capabilities (model routing,
memory filtering, compaction, skill selection, browser decision support, handoffs)
each answer a problem this workspace does not currently have: one repository, no
multi-model routing in play, no retrieval corpus to filter, no session-handoff
pain observed. Adopting them now would be buying architecture ahead of need.

It also fits Hermes natively rather than beside it. Hermes ships a skills hub —
`hermes skills install <url>` with a GitHub/URL source, a `--name` override, an
advisory security scan, and a write-approval gate (`/skills pending|approve|reject`),
confirmed in `hermes_cli/skills_hub.py` and `hermes_cli/commands.py`. And
`ask-jev-skill`'s documented install path, `skills/autonomous-ai-agents/askjev`,
is an existing category in Hermes's own skills tree. No parallel installer, no
second routing layer.

Verified here without credentials, since both paths are the safety-relevant ones:

```
ASKJEV_DISABLED=1  -> {"disabled": true, "reason": "ASKJEV_DISABLED is set"}        exit 2
no TYPESAFE_API_KEY -> {"disabled": true, "reason": "TYPESAFE_API_KEY is missing"}  exit 2
```

Both fail closed with no network call. A missing key degrades the system to
"decide it yourself", which is the correct failure mode.

Installation waits on Hermes (D-002) and a TypeSafe key. **Jev model routing and
shadow mode are explicitly not part of this system** — there is no routing
problem to solve, so there is nothing for shadow mode to observe.

*Reverses if:* a real routing, retrieval-filtering, or compaction cost shows up
with numbers behind it. Then install the pack — it is a capability pack, and
adding it later costs nothing that was saved by waiting.

---

## D-004 — `next build` is the typecheck; CI runs no standalone `tsc`
**2026-09-20 · Active**

Measured on a clean checkout: `npx tsc --noEmit` fails with
`app/layout.tsx(59,50): error TS2304: Cannot find name 'LayoutProps'`, because
Next 16 generates that global into `.next/types` during the build. After
`npm run build`, the same command exits 0.

`next build` runs TypeScript over the project itself ("Running TypeScript ..." in
its log), so a second `tsc` step in CI would be redundant on a good day and
confusing on a bad one. CI runs lint and build only.

*Reverses if:* files outside the build graph need checking, in which case add
`tsc --noEmit` **after** the build step, never before.

---

## D-005 — Dependencies install at session start, on web only
**2026-09-20 · Active**

Fresh cloud containers arrive with no `node_modules`, so lint and build are
unavailable on the first turn — observed directly at the start of this session.
`.claude/hooks/session-start.sh` runs `npm install` when `$CLAUDE_CODE_REMOTE`
is `true` and exits 0 silently otherwise, so local machines keep their own setup.

Synchronous, not async: it costs ~11s at session start and removes the race
where an agent runs a linter that is not installed yet. Verified both branches
by deleting `node_modules` and running the hook (373 packages restored, exit 0)
and by running it with the variable unset (exit 0, no action).

*Reverses if:* startup latency matters more than the race. Add
`echo '{"async": true, "asyncTimeout": 300000}'` as the hook's first line.

---

## D-006 — Obsidian Mind is blocked on one decision: where the vault lives
**2026-09-20 · Deferred — needs the user**

Inspected `breferrari/obsidian-mind` v8.4.0. It is mature and a good fit for the
portable-memory role: a plain Markdown vault, Git-native, with hooks for Claude
Code, Codex and Gemini, and an `om` MCP server that makes it readable from any
other repository.

Not created, because every available location is wrong without an instruction.
Inside COTA it would make one product repo the owner of cross-project memory,
which the architecture explicitly rejects. In the container it evaporates (D-001).
The correct home is **its own Git repository** — and creating a new repository in
the user's GitHub account is an outward-facing act that is theirs to authorise,
not a reversible local setup step.

Everything that does not depend on that choice is done: the template is verified,
and the exact commands are in `docs/IMPLEMENTATION_REPORT.md`.

*Unblocks when:* the user names a repository for the vault.

---

## D-007 — The TypeSafe Claude Code plugin is not installed
**2026-09-20 · Deferred**

`typesafe-ai/skills` v0.5.7 installs via
`claude plugin marketplace add typesafe-ai/skills` and teaches an agent to design
typed TypeSafe workflows. Worth noting that **Jev is TypeSafe's decision model** —
same vendor, same `console.typesafe.ai` key. These are one dependency, not two.

`ask-jev-skill` already carries the operational knowledge for calling Jev
correctly (when to use it, confidence gates, the escalate path, the pitfalls).
The plugin adds value when *designing new* typed decision workflows, which is not
a current activity. Installing both now would mean two copies of the same
vendor's guidance, and the plugin goes into the ephemeral `~/.claude` anyway.

*Reverses if:* typed decisions become something built regularly rather than
called occasionally.

---

## D-008 — QMD semantic search is not installed
**2026-09-20 · Deferred, deliberately**

Obsidian Mind works on Markdown, Git and grep without it; QMD adds a global npm
package, a local embedding model and a SQLite index. With no vault yet (D-006)
there is nothing to index. Retrieval quality is not a problem until there is a
corpus large enough to have one.

This is a decision, not an unfinished task. Revisit when grep in the vault
actually starts failing to find things.

---

## D-009 — `jev-align` is not adopted
**2026-09-20 · Deferred**

It calibrates Jev against real labelled examples. There is no such dataset, and
manufacturing examples to justify a tool inverts the point. Revisit only if a
real corpus of judged decisions accumulates.

---

## D-010 — CI is not tightened beyond what the project already enforces
**2026-09-20 · Active**

`npm run lint` currently reports one warning (an unused `eslint-disable` in
`app/layout.tsx:68`) and zero errors, so it passes. CI does not run with
`--max-warnings 0`, and the warning was not fixed: application code was out of
scope for this change, and a verifier that arrives red teaches people to ignore it.

Verification should grow from observed failures, not from anticipated ones. When
a class of regression actually happens twice — responsive breakage, an invented
asset, a broken link — add the check that catches it then.

*Reverses if:* lint warnings start accumulating. Then fix them and add
`--max-warnings 0` in the same change.

---

## D-011 — The verifier runs on every push, not on pull requests
**2026-09-20 · Active**

First written as `on: [pull_request, push to main]`. Pushing the branch produced
no run at all — the workflow would not have executed until someone opened a pull
request, leaving work-in-progress branches unverified and the verifier itself
unproven. A verifier that has never run is a configuration file, not evidence.

Changed to `on: push` for every branch. GitHub surfaces a same-repo branch's push
run on the pull request, so a separate `pull_request` trigger would only duplicate
every run. `workflow_dispatch` is kept for manual re-runs.

Evidence: run #1 succeeded in 46s on `claude/youthful-mccarthy-50xcv0` —
checkout, node 22, `npm ci`, lint, build.

*Reverses if:* outside contributors start opening pull requests from forks, which
`on: push` does not cover. Add `pull_request` then, and accept the duplication.
