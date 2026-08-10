---
name: implementation
description: >
  Disciplined change slices with planning, coding, test, and verification gates.
  Use when implementing a feature, fixing a bug, migrating a code path, applying
  review findings, or preparing a commit — especially multi-file changes and
  anything with regression risk. Not for trivial single-file edits, not for
  architecture decisions (dev-review), and not for judging an existing diff
  (code-review).
argument-hint: "[description] [--no-tests]"
---

# Implementation

Run the work in phases. The gates are what make the difference; skipping one is
how a two-hour task becomes a two-day task.

## 1. Orient

- Read the repo's own agent instructions before touching anything.
- Check repo status. Note pre-existing dirty work and leave it alone.
- State the owned area in one line.
- Find the **current healthy pattern** for what you are about to write — and if
  the nearest neighbor is legacy or a workaround, do not copy it.

## 2. Plan

For anything beyond a one-liner, name: owned scope, ordered steps, the
verification per step, and the completion criterion. Keep it in the session
state file if one is active — not in a new plan document.

## 3. Root Cause, For Bugs

Do not patch the symptom you can see.

1. Reproduce it. If you cannot reproduce it, you cannot claim to have fixed it.
2. Form one hypothesis and name what evidence would falsify it.
3. Test the hypothesis with the cheapest probe: a log line, a focused test, a
   direct call.
4. Fix the cause. If the cause is out of scope, say so explicitly rather than
   patching around it.

Two failed hypotheses in a row means stop and re-read the actual code path
instead of trying a third guess.

## 4. Change

- Smallest complete change that fixes the root cause.
- One canonical path — no parallel legacy branch, no compatibility shim, no
  fallback, unless it was explicitly requested.
- Every changed line traces to the request. No drive-by refactors, no
  reformatting, no comment cleanup in code you did not otherwise touch.
- Match the local style, even where you would do it differently.

## 5. Verify

Load the `verification` skill. Run the check that matches the change, read the
output, and keep the evidence for the summary.

## 6. Close

- Remove scratch files, debug logging, and abandoned branches you created.
- Summarize: what changed, what was verified with the evidence, what remains.
- Surface unrelated findings as one-line observations with file and line — do
  not fix them here.

## Completion Criteria

The slice is done only when the requested behavior exists, unrelated scope is
untouched, verification ran or a blocker is explicit, and the user can see what
changed and what remains.

"Nice-to-have leftovers" are unfinished work unless the user de-scoped them.

## Gotchas

- The change that "should be trivial" in an unfamiliar codebase is where the
  local convention bites. Read two neighbors before writing the third.
- A test you had to weaken to make pass is a failed change, not a passed test.
