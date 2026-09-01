---
name: discipline
description: >
  Test, debug, and verify changes with evidence. Use when a feature or stable
  contract needs tests, a bug or failing check must be diagnosed, or before
  claiming done, fixed, ready, or shipped. Not for planning or sequencing work
  (implementation), architecture fit (dev-review), or judging an existing diff
  (code-review).
allowed-tools: Read, Grep, Glob, Bash
---

# Development Discipline

This is the mechanics layer: test behavior, diagnose causes, and produce proof.

## Test

- A known bug: reproduce it in a failing test or focused check before fixing it.
- A refactor: characterize the behavior to preserve before restructuring.
- A new stable contract: use test-first when it makes the interface clearer.
- Exploratory or visual work: discover the shape, then lock it in with a
  behavioral or rendered check.

Tests verify behavior through public interfaces. Do not assert private methods,
exact log wording, or other implementation details.

## Debug

1. Reproduce the observed failure.
2. State one falsifiable hypothesis about its cause.
3. Use the cheapest probe that can disprove it.
4. Fix the cause, not the nearest symptom.

After two failed hypotheses, stop guessing and trace the full path again. If
the root cause exposes a wrong boundary or canonical path, return to
`dev-review` before adding another patch.

## Verify

Before saying a change is done, fixed, working, ready, or shipped:

1. Choose the smallest check that proves the requested result.
2. Run it and read the complete output.
3. Report the decisive output or observation.
4. Name anything that remains unverified and the next useful check.

| Change | Minimum useful evidence |
|---|---|
| Code logic | focused test or direct execution with real input |
| Bug fix | failure reproduced, then pass reproduced |
| API or contract | request against the running interface |
| UI | rendered affected surface, including opened overlays |
| Prompt or skill | final instruction read plus one realistic routing case |
| Docs | final rendered artifact read |

## Report Shape

```text
Verified
- <check>: <result>

Evidence
- <decisive output or observation>

Not verified
- <gap>: <why and next check>
```

## Gotchas

- A test that already passed before the change does not prove a bug fix.
- A green exit code for the wrong test subset is not evidence.
- A UI is not verified until the affected interaction is open, not merely until
  the page loads.
