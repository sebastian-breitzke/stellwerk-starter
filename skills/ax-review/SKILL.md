---
name: ax-review
description: "User-invoked AX Review for repo-local agentic experience: Workmode, authority chain, doctor scripts, stale guidance, reminder coverage, and Leitstand fit. Use when the user asks for AX Review, Agentic Experience Review, repo guidance review, or to check whether a repo is ready for reliable agent work. Not for architecture or design review (dev-review) and not for line-level code review (dev-code-review)."
user-invocable: true
argument-hint: "[repo-path]"
allowed-tools: Read, Grep, Glob, Bash
_organized: true
---

# AX Review

Review whether a repository gives agents the right operating contract.

This is not architecture review and not line-level code review. It reviews the
repo's agentic experience: what the agent should trust, how it should work, and
what executable checks help it stay on course.

## Review Scope

Inspect, when present:

- `AX.md`
- `AGENTS.md`
- `CLAUDE.md`, `GEMINI.md`, `.cursor/rules`, `.github/copilot-instructions.md`
- `README.md`
- `docs/` or canonical docs that claim current behavior
- `scripts/doctor*`, `scripts/check*`, validation scripts, lint/test wrappers
- Leitstand logs or current handoff when the repo is inside an active session

Do not treat old specs as authority. Old specs are evidence at most. If old
specs conflict with current O-Ton, Leitstand decision state, canonical docs, or
AX, mark them as stale guidance risk.

## Required AX Checks

Check for:

- **Workmode:** `solo-main` or `team-pr`, with integration, deploy, and review-loop rules.
- **Authority chain:** current O-Ton, Leitstand state, canon/AX, code, stale specs.
- **Doctor commands:** repo-local executable checks that report repo invariants with compact, useful output.
- **Reminder coverage:** repo-local anti-pattern reminders that are not reliably machine-checkable.
- **Friction capture:** recurring user corrections, wrong-system work, stale guidance,
  looping, and handoff-bounce patterns have a prevention point.
- **Environment boundaries:** local vs server, dev/demo/prod, explicit production gates.
- **Personal vs product storage:** product facts belong in product repos; relationship/person context belongs in the user's private context.
- **Stale guidance handling:** old plans/specs are archived, superseded, or explicitly marked non-authoritative.
- **Leitstand fit:** long-running work has a place for raw input, decisions, friction, evidence, and handoff.

## Doctor Output Standard

Doctor commands are concrete repo-local checks. Do not recommend adding a
product, customer, or company doctor to global Stellwerk. If the reviewed repo
cannot be edited, report the missing doctor as an AX gap for that repo.

Good doctor output is compact and agent-useful:

```text
RULE: <stable rule id>
WHY: <one-sentence intent>
COUNT: <number>
SAMPLE:
- <file:line>
- <file:line>
NEXT: <concrete next action>
```

Do not recommend doctor scripts for fuzzy UX judgment that cannot be checked
cheaply. Put those into reminders or review lenses instead.

Good doctor candidates:

- forbidden hard-coded colors instead of design tokens
- stale local Docker URLs after server deployment migration
- forbidden imports or deprecated helper use
- missing required metadata/frontmatter
- invalid canonical doc structure

Good reminder candidates:

- independent scroll panes for left-list/right-detail layouts
- modal overflow behavior
- known UX traps
- repeated user corrections that require judgment

When Leitstand logs contain `friction` events, check that each event names a
concrete trigger, violated expectation, impact, prevention point, and next
prevention. If a repo has repeated friction but no AX/doctor/reminder response,
flag that as an AX gap.

Interpret `prevention_point: "AX"`, `"doctor"`, or `"reminder"` as belonging to
the owning repo. Recommend a global Stellwerk skill or provider overlay only when
the repeated failure is genuinely cross-repo or provider-specific.

## Output Contract

Return exactly:

1. `Verdict`
2. `Workmode`
3. `Authority And Staleness`
4. `Doctor Coverage`
5. `Reminder Coverage`
6. `Friction Risks`
7. `Recommended Patch`

`Verdict` is one of:

- `Ready`
- `Ready with gaps`
- `Not ready`

Report every gap found — coverage first, no pre-filtering by severity. Keep each
finding short: concrete missing sections, stale paths, and script names over
broad advice.

## Hand Offs

- Architecture shape concerns -> `dev-review`
- Implementation changes -> `dev-implement`
- Prompt/skill/tool-contract changes -> `prompt-creation-review`
- UI reminder taxonomy -> `dev-ui`
- Long-running correction program -> `leitstand`
