---
name: dev-review
description: "Consolidated DevReview for architecture, design, test discipline, UI/AX signals, simplify pressure, and review-lens routing. Use when the user asks for Review, DevReview, architecture or design review, or a findings-first judgment on whether an approach fits the current system and canonical path. Line-level diff review: dev-code-review; prompt and skill reviews: prompt-creation-review."
argument-hint: "[spec-id|area|diff]"
allowed-tools: Read, Grep, Glob, Bash
_organized: true
---

# DevReview

Review the shape of the work, not just the code.

## Shared Foundation

- Apply `work-mode/quality-bar.md`
- Apply `work-mode/coding-policy.md`
- Apply `smb-pragmatism`

Do not restate those files. Use them.

## Core Rules

- Findings first. No consultant fog.
- DevReview is the visible review entry point. Do not split normal reviews into
  separate user-facing architecture-deepening, UI-review, AX-review, or
  test-review buttons.
- Prefer current-system fit over greenfield elegance.
- Treat dual-path architecture, compatibility wrappers, and speculative complexity as suspect by default.
- Treat module depth as a first-class review concern. A separate architecture-deepening button is not needed.
- Treat test quality as discipline and gate, not as its own user flow.
- Surface UI, AX, and slop signals inside the DevReview result unless that
  adjacent specialty is the actual review target.
- If context is too thin for a reliable judgment, say so and name the missing context.

## Review Modes

Choose the mode from the user's request and the available evidence. Apply the
relevant lenses internally and ask only when the chosen lens would materially
change scope.

### Pre-Implementation

Use to review a plan before coding.

Focus on:
- architecture fit
- product and workflow design fit
- scale appropriateness
- hidden complexity
- simpler alternatives
- whether the proposed interfaces create deep modules or shallow pass-throughs

### General Health Check

Use to inspect an area without one specific proposal.

Focus on:
- pattern drift
- accumulating debt
- duplicated ways of doing the same thing
- repeated slop patterns in prompts, UI, tests, or agent workflow
- scale or security concerns
- deepening opportunities that would improve locality and leverage

### Post-Implementation

Use after implementation to judge whether the delivered shape matches the intended architecture.

Focus on:
- fit with the existing system
- accidental complexity
- canonical-path convergence
- what should become standard next
- whether the changed interface is the right test surface
- whether the verification and review gates were meaningful

## Review Lenses

Apply only the lenses relevant to the touched work:

- **Architecture:** module depth, orchestration, adapters, boundary shape,
  canonical path.
- **Design:** workflow fit, interface clarity, domain language, operational
  ownership, and whether the proposed shape solves the real current problem.
- **Test discipline:** behavior coverage, meaningful assertions, no tests that only
  mirror implementation, no fake confidence from over-mocking owned code. Keep
  this as a review gate; do not create a separate Test Review flow.
- **Simplify:** delete speculative abstractions, unused flexibility, unnecessary
  dependencies, and boilerplate without weakening correctness.
- **UI:** product-specific surface quality, interaction fit, visual consistency,
  and whether `dev-ui` should be pulled in for a UI-dominant review.
- **AX:** repo guidance, workmode, reminders, doctor checks, and agent workflow
  risks. Keep lightweight AX notes here; use `ax-review` only when the agent
  experience contract is the review target.
- **Slop avoidance:** reject generic output, shallow process theater, prompt bulk,
  implementation-mirroring tests, UI decoration without product value, and
  architecture that moves complexity around instead of reducing it.
- **Security/data integrity:** escalate the standard when auth, secrets,
  persistence, compliance, or customer data is in scope.

For line-level shippability after implementation, call `dev-code-review`
internally. Keep `dev-review` as the user's visible review entry point.

## Architecture Deepening Lens

Use this lens whenever the work introduces or changes module interfaces,
orchestration, adapters, cross-service behavior, cleanup, or refactor scope.

Look for:
- pass-through modules that add naming without hiding complexity
- helpers extracted only for testability while orchestration bugs stay in callers
- callers repeating ordering rules, validation rules, mapping rules, retries, or
  error interpretation
- interfaces that expose internal steps instead of domain-level operations
- adapters introduced before there are at least two real variants
- tests that reach past the interface because the module shape is wrong
- domain concepts that do not have a clear module home
- multiple local ways to express the same domain operation

Use the deletion test:
- if deleting the module makes complexity disappear, it was probably shallow indirection
- if deleting the module spreads complexity across callers, it was earning its place

## Review Checklist

Check:
- does this solve a real current problem
- is the chosen complexity justified
- can the current team maintain it
- does it move the system toward one canonical path
- is any migration bounded and explicit
- is there a simpler path with lower cost
- does the design fit the user workflow and domain language
- are security, data integrity, and operational concerns handled at the right level
- does the module shape hide complexity behind a useful interface
- does deleting a new module remove complexity or merely spread it back into callers
- do tests prove behavior at the right interface without mirroring implementation
- are UI or AX concerns small findings here, or do they dominate enough to hand off
- is the result free of generic slop and review-theater

## Hard Stops

Do not wave through an approach if:
- it preserves old and new paths without a bounded reason
- it introduces indirection or abstractions with no current payoff
- it copies legacy patterns just because they already exist
- the migration story is fuzzy
- the proof plan is only process, not evidence
- the output would create another review flow instead of improving DevReview

When stopping, say what is wrong, why it matters, and what cleaner options exist.

## Output Contract

Return exactly:

1. `Decision`
2. `Findings`
3. `Recommended Changes`
4. `Accepted Risks`
5. `Next Step`

In `Findings`: List every issue found with severity (critical / should-fix / nice-to-have) — coverage first, do not pre-filter to major items.

`Decision` should be one of:
- `Proceed`
- `Proceed with changes`
- `Revise`

If there are no major concerns, say that plainly.

## Success Criteria

After `/dev:review`, the user should have:
- a clear go or no-go judgment
- the real architectural risks
- a statement on canonical-path impact
- the relevant design, test-discipline, UI, AX, and slop concerns without a
  separate review flow
- a concrete next move

## Related Commands

- `dev-challenge`
- `/dev:implement`
- `/research`

## When To Hand Off

- Architecture and design concerns → stay here
- Line-level code quality, decline gates, file-by-file judgment after
  implementation → run `dev-code-review` internally
- Test discipline, TDD, debugging, and verification mechanics → `dev-discipline`
- Prompt, skill, MCP, tool-use instruction, or model-facing API contracts → `prompt-creation-review`
- UI surfaces, renderers, visual regressions, or interaction quality that dominate
  the review → `dev-ui`
- Repo-local agent operating contract, Workmode, doctor commands, or reminder
  taxonomy that dominates the review → `ax-review`
- Approved design moving into code → `dev-implement`
