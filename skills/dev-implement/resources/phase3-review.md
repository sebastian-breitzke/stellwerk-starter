---
_organized: true
---

# Phase 3: Review

Review the result without leaning on implementation history.

## Rules

- Keep review context-blind where possible.
- Review against requirements, changed code, and test evidence.
- Findings matter more than summaries.

## Check

- correctness and obvious bugs
- data integrity and security basics
- healthy pattern fit
- clarity of naming and structure
- unnecessary complexity
- accidental duplication or canonical-path drift
- missing tests for newly exposed risk

## Handle Results

- Minor issue: fix in place, rerun affected checks
- Significant issue: go back to Phase 1, then retest
- Missing coverage: go back to Phase 2

## Validation Gate

Before Phase 4:
- no critical or major issue remains
- affected verification has been rerun
- code is ready for peer review

## Output

Return:
- verdict
- findings with severity
- fixes made
- loops triggered, if any
