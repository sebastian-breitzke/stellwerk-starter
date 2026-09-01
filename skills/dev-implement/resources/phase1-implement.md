---
_organized: true
---

# Phase 1: Implementation

Write the code that matches the Phase 0 plan. Do not improvise architecture mid-flight.

## Do

1. Work through P1 todos one by one.
2. Follow the healthy target pattern from Phase 0.
3. Keep one canonical path after the change.
4. Verify basic correctness as you go:
   - compile
   - run the narrow relevant check
   - inspect the changed behavior
5. Make small obvious quality fixes in touched code when they are low-risk.

## Stop Immediately If

- you would need a workaround layer, fallback path, or dual implementation
- the nearby code turns out to be legacy and there is no clear healthy replacement
- a requirement or architecture decision is missing
- you cannot make the change testable without a broader refactor than the task allows

When stopping, explain the blocker and give options instead of patching around it.

## Validation Gate

Before Phase 2:
- all planned implementation todos are done
- changed code runs or compiles at a basic level
- naming and structure are clean enough to ship
- no obvious hacks, TODO debt, or duplicate paths were introduced

## Output

Return:
- files changed
- short implementation summary
- deviations from the original plan, if any
- anything Phase 2 must pay attention to
