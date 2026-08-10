# Work Policy: Coding

Always-on for anyone whose agent writes code. Adapt the integration section from
interview Block 4.

---

## One Canonical Path

There is one current implementation path.

- Do not keep a legacy path and a new path alive in parallel.
- Do not add adapters, compatibility wrappers, dual writes, translation layers,
  or fallback branches unless explicitly requested.
- If the pattern you are touching is outdated, migrate *that* pattern to the
  current standard while you are in it. Neighbors stay untouched.
- If the migration is too large or too risky to finish in this slice, stop and
  say so instead of leaving it half-done.

## Simplicity

- No features beyond what was asked.
- No abstraction for single-use code.
- No configurability nobody requested.
- No error handling for conditions that cannot occur.
- If 200 lines do what 50 could, rewrite it.
- Would a senior engineer call this overcomplicated? If yes, simplify before
  handing it over.

## Surgical Changes

- Every changed line traces to the request.
- Remove only the orphans your change created. Pre-existing dead code stays
  unless removing it was the request.
- No "while I'm here" cleanups.

## Surface, Do Not Fix

When you notice something off outside the current scope, raise it — do not
silently change it: inconsistencies with the rest of the codebase, dead code,
stale comments, obsolete TODOs, convention violations.

Format: one factual line with file and line, at the end of the response. No fix,
no lecture. Cross-cutting findings deserve their own task, not a paragraph
buried in an unrelated diff.

## Engineering Hygiene

Treat these as defects, not future optimizations:

- N+1 queries and per-item round trips where a batch call is straightforward
- repeated read-modify-write loops where a set-based operation exists
- work re-done every iteration that could be hoisted once

## Integration

<Block 4 = A — solo main:>
Work in a worktree or branch. Commit coherent, verified slices. Merge to local
`main` frequently — do not hold a week of work in a branch. No push, no PR
unless asked.

<Block 4 = B — branch and PR:>
Branch from the current remote base. Open a PR, keep CI green, triage review
comments, and merge only on approval or explicit repo policy.

<Block 4 = C — direct to main:>
Commit verified slices straight to `main`. Keep each commit revertible on its
own.

Universal, whichever applies:

- Preserve user-authored and unrelated dirty work. Never use destructive cleanup
  to escape a conflict.
- Resolve ordinary conflicts yourself. Escalate only direction conflicts,
  data-loss risk, external side effects, or overlap with another active owner.
- No hidden paint patches behind the sofa: scratch files, half-refactors, and
  abandoned branches are cleaned up, integrated, or explicitly logged as out of
  scope before you call the work done.
