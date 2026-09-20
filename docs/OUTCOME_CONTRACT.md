# Outcome contract

Copy the block below into the issue, pull request, or prompt that starts a
non-trivial task. It constrains the **result**, not the reasoning. A coding task,
a research task, and a content task all use the same shape — none of them get a
procedure unless the procedure is genuinely the point.

Skip it for small reversible work. A one-line fix does not need a contract.

```markdown
## Outcome
<What is true when this is done. One or two sentences, in the user's terms,
 not in implementation terms.>

## Deliverable
<The artifact. A file, a route, a PR, a document, a number.>

## Constraints
<Hard boundaries: what must not change, what must not be invented, budgets,
 the sources facts may come from.>

## Evidence standard
<What will be shown to prove the outcome. Name it before starting.
 e.g. "green `verify` run on the PR" / "screenshots at 1440x900 and 390x844
 with measured geometry" / "the failing case reproduced, then passing".>

## Verification
<The exact commands or checks a reviewer can re-run.>

## Autonomy
<What may be done without asking.>

## Approval required
<What must stop and ask.>

## Stop conditions
<When to stop and report instead of pushing on: blocked on a credential,
 the premise turned out false, the fix needs a decision above this task's pay
 grade, the evidence standard cannot be met.>
```

## Worked example — the change that created this file

```markdown
## Outcome
Every pull request to COTA is automatically checked against the project's own
lint and build, so "done" stops being a claim and starts being a link.

## Deliverable
`.github/workflows/verify.yml` plus a session bootstrap hook.

## Constraints
Use only checks the project already owns. Invent no tests. Do not modify
application code. Must be green on arrival.

## Evidence standard
`npm run lint` and `npm run build` observed passing locally on a clean
checkout, then a green `verify` run on the pull request.

## Verification
`npm ci && npm run lint && npm run build`

## Autonomy
Add and edit CI config, hooks, and documentation freely.

## Approval required
Merging to `main`. Any change to application code or content.

## Stop conditions
The build is already red on `main` — report that instead of papering over it.
```
