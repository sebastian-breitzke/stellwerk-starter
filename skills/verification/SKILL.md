---
name: verification
description: >
  Proof-before-done mechanics: choose the check that matches the change, run it,
  read the output, report the decisive evidence. Use before claiming done,
  fixed, working, ready, passes, verified, or shipped; when a fix needs a
  before/after reproduction; and when deciding whether a test is worth writing
  first. Not for choosing an architecture (dev-review) and not for judging
  someone else's diff (code-review).
allowed-tools: Read, Grep, Glob, Bash
---

# Verification

The policy is one line — done requires proof. This skill is the mechanics.

## Gate

Before saying done, fixed, ready, works, passes, or shipped:

1. Choose a check that matches the change.
2. Run it, or state precisely why it cannot run.
3. **Read the output.** A green exit code on the wrong test subset is not proof.
4. Report the decisive evidence, not the fact that you ran something.
5. State what remains unverified.

## Check By Change Type

| Change | Minimum useful check |
|--------|----------------------|
| Code logic | targeted tests, or direct execution with real input |
| Bug fix | reproduce the failure, fix, reproduce the pass |
| Build or config | local build, or the parser/validator for that format |
| Schema or migration | dry run plus row-count and shape checks on a copy |
| API or contract | a request against the running thing, not a reading of the handler |
| UI | render the affected surface and look at it |
| Docs | read the final rendered output |
| Prompt or skill | read the final assembled instruction and run one real scenario |
| Deletion | prove nothing else references it — grep before, run after |

## Test Strategy

Pick by problem shape, not by doctrine:

- **Known bug:** failing test first. It is the only way to know your fix fixed
  *that*.
- **Refactor:** characterize existing behavior in tests before restructuring.
- **New stable contract:** test-first when it sharpens the contract.
- **Exploratory or UI work:** build first, then lock the stabilized behavior in.

When detection itself is in doubt, revert the fix and watch the test fail. That
is a test of the test — useful when it matters, not a ritual for every change.

## Report Shape

```text
Verified
- <command>: <result, with the number or line that matters>

Evidence
- <the decisive output or observation>

Not verified
- <gap>: <why, and the next best check>
```

## Anti-Patterns

- "should work", "this should fix it", "the change looks correct"
- treating a clean diff, a successful build, or a passing type check as proof of
  behavior
- running the whole suite to avoid finding out whether the relevant test exists
- ignoring skipped tests and warnings in the output you just produced
- claiming a UI works without rendering it
- verifying the happy path only, when the bug was in an edge case

## Gotchas

- A test that passes before your change also passes after it. If you did not see
  it fail, you have not verified the fix — you have verified the test compiles.
- Caching lies. Stale build output and cached test results have both certified
  broken code as passing. Force a clean run when the result surprises you.
