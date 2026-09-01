---
_organized: true
---

# Phase 2: Testing

Test behavior, not internals.

## Rules

- Pick the test mechanism by problem shape and risk per
  `work-mode/verification-policy.md` (Test Strategy); the gate is evidence, not
  a fixed sequence.
- Keep testing implementation-blind.
- Use requirements, interfaces, and expected behavior as the source.
- Do not feed implementation files or design rationale into the test-writing step.

## Do

1. Extract:
   - public interfaces or entry points
   - expected inputs and outputs
   - error cases and edge cases from the task
2. Write behavioral tests in the repo's current style.
3. Run the relevant tests.
4. If needed, run broader verification that matches the risk of the change.

## Loop Back If

- tests expose an implementation bug
- the code is too coupled or hidden to test cleanly
- critical paths are still uncovered

If the issue is structural, go back to Phase 1 instead of weakening the tests.

## Validation Gate

Before Phase 3:
- tests are behavior-first
- tests do not depend on implementation details
- relevant tests pass
- critical paths and important failures are covered

## Output

Return:
- tests added or updated
- results
- any testability issues that forced a design change
