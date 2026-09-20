<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# COTA — agent instructions

Single-page marketing site for COTA S.A. (Argentine paper and chemicals
manufacturer). Next.js 16 + React 19 + Tailwind 4 + GSAP/Lenis. Spanish-language
content. One route: `/`.

## The rule that matters most

`lib/content/cota.ts` is the single source of truth for COTA facts, and its
header states the constraint: **do not add certifications, clients, countries,
technical specs, or sustainability/leadership claims that are not confirmed by
cota.com.ar or the client brief.** Fields that are genuinely unknown are `null`
with a comment saying so. Leave them `null`. Inventing a number here is the most
expensive mistake available in this repo — it ships as a factual claim by a real
company.

The same applies to media: do not reference an image or video that does not
exist in `public/` or `videos/`. See `ASSETS.md` for what is real and what is
still pending.

## Verify before you claim done

```bash
npm install        # the SessionStart hook already did this on web sessions
npm run lint       # eslint
npm run build      # compiles AND typechecks — this is the real gate
```

`npm run build` is the typecheck. Do not run `npx tsc --noEmit` on a clean
checkout and report the failure as a bug: `LayoutProps` and friends are
generated into `.next/types` by the build, so standalone `tsc` fails until a
build has run.

CI runs exactly these checks on every push (`.github/workflows/verify.yml`).
Green CI is the evidence that work is done. A claim of "done" without it is a
claim, not evidence.

## Git workflow

One task, one branch, one pull request. Never push to `main`; never enable
auto-merge. Human approval merges. Commit messages describe the outcome, in the
language the surrounding history uses.

## Autonomy

Act without asking on anything reversible and verifiable: code, styles, content
edits backed by a confirmed source, docs, tests, CI config.

Stop and ask before: deleting user content or audit documents, changing
production/deploy infrastructure, publishing anything externally, merging to
`main`, rotating credentials, adding a paid dependency, or making a factual
claim you cannot source.

## Going deeper

- `ASSETS.md` — real vs. pending media, and site architecture history.
- `COTA_VISUAL_AUDIT.md`, `COTA_REFERENCE_GAP_AUDIT.md` — measured visual audits.
  Findings marked RESOLVED are done; the rest were deliberately left.
