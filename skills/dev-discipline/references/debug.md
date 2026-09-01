---
_organized: true
---
# Debug Mechanics

Concrete four-phase gate for bug investigation. Policy for why root cause matters lives in `work-mode/execution-policy.md` (Follow-Through: "For bug reports, diagnose and fix the root cause when evidence is discoverable"). This file is the how.

## The Four Phases

Run them in order. Do not skip to phase 4.

### Phase 1 — Investigate

Gather evidence before theorizing.

Do:
- reproduce the failure locally or confirm the exact failing CI run
- capture the error, stack trace, log excerpt, or diff in the failure you will rely on
- note the first commit, deploy, or config change where the failure started if discoverable
- note what still works — the boundary matters

Gate before phase 2:
- failure is reliably reproducible or the exact failure evidence is captured
- scope of failure is known

If you cannot reproduce, phase 2 is guessing. Say so and ask for a reproducer before proceeding.

### Phase 2 — Pattern

Step back from the single instance.

Do:
- ask whether this is a one-off or a class of bug
- look for the same pattern elsewhere in the code, logs, or incident history
- check related tests that should have caught this and did not
- identify what guarantee or invariant was violated

Gate before phase 3:
- you can name the violated invariant or assumption
- you know whether this is local or systemic

### Phase 3 — Hypothesis

Now you can theorize.

Do:
- state one concrete hypothesis for the root cause in one sentence
- predict what evidence would confirm or deny it
- gather that evidence — logs, a targeted test, a bisect, an inspection of the relevant code path

If the evidence disagrees with the hypothesis, form a new one. Do not massage the hypothesis to fit.

A fix found elsewhere (upstream PR, changelog, Stack Overflow) is a hypothesis input, not a confirmed root cause — it still needs fresh local evidence before Phase 4.

Gate before phase 4:
- one hypothesis is confirmed by fresh evidence
- you can state the root cause in one sentence, not just the symptom

### Phase 4 — Implement

Only now fix.

Do:
- write or update the test that would have caught the bug, confirm it fails against the current code
- implement the smallest change that makes that test green and does not break the rest of the suite
- re-run the full relevant test suite
- if the bug is systemic, surface the other spots but do not silently fan out the fix — propose scope
- any modification to existing test files or assertions during a bug fix is its own explicitly justified diff, reviewed as a separate gate — never folded silently into the fix

Gate before calling it done:
- the new or updated test fails on the old code and passes on the new code
- the full relevant test suite is green
- the root cause is stated in the commit message or PR description

## Hard Stops

- Three fix attempts and the bug persists → step back, the hypothesis or the architecture is wrong. Recovery from a stuck loop is a fresh context with distilled state (new subagent/session fed the evidence summary), not more instructions in the exhausted one
- Fix works but you cannot explain why → you have a cargo-cult patch, not a fix
- Fix only works in your local env → environment drift, investigate instead of shipping

## Canonical Pitfalls

- Jumping to phase 4 because the fix "feels obvious"
- Treating a reproducible error message as the root cause when it is only a symptom
- Adding defensive code everywhere instead of fixing the single responsible call site
- Disabling the failing test instead of fixing the bug

## Output When Done

Report:
- root cause in one sentence
- evidence that confirmed it
- the change made
- tests that now cover the regression
- any related spots deliberately left untouched and why
