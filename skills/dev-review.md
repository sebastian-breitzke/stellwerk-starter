# Skill Blueprint: Dev Review

Dev Review judges whether a plan or implementation fits the system.

It is broader than code review: architecture, workflow, test discipline,
security, UI, and operational fit can all matter.

## Review Lenses

Apply only the relevant lenses:

- architecture fit
- simplicity and scope
- canonical path
- test discipline
- security and data integrity
- UI or workflow quality
- operational ownership
- maintainability

## Decision Values

Use one of:

- `Proceed`
- `Proceed with changes`
- `Revise`

## Output Contract

```text
Decision

Main Concerns

Recommended Changes

Accepted Risks

Next Step
```

Findings first. No reassurance before blockers.

## Decline Patterns

Recommend revision when the work:

- keeps old and new paths alive without a bounded reason
- adds abstraction without a current payoff
- copies a known-bad legacy pattern
- has a fuzzy migration path
- claims quality without verification evidence
- puts secrets, customer data, or compliance at risk
