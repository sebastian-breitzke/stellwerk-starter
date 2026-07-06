# Skill Blueprint: Implementation

Implementation mode is for concrete code or document changes after the path is
clear.

## Workflow

1. Inspect local guidance and repo status.
2. Define owned scope.
3. Identify the current healthy pattern.
4. Make the smallest complete change.
5. Verify with a relevant check.
6. Review the result.
7. Summarize outcome and remaining risk.

## Rules

- Prefer the repo's current healthy patterns.
- Do not preserve duplicate paths unless explicitly required.
- Do not add configurability for imagined future cases.
- Do not silently change unrelated files.
- Surface unrelated problems instead of fixing them in the same slice.
- Ask only when the next step is irreversible, sensitive, or materially changes
  the outcome.

## Completion Criteria

The slice is complete only when:

- requested behavior exists
- unrelated scope stayed untouched
- verification ran or a blocker is explicit
- the user can see what changed and what remains
