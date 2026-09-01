---
name: dev-code-review
description: "Line-level code review with hard decline gates. Use automatically after implementation, when the user asks for a code review of a specific diff, PR, branch, or file (review/re-review/self-review), when pasted findings need judging, or before merge/ship confidence. Architecture fit lives in dev-review. Verification mechanics live in dev-discipline. This skill declines, it does not negotiate."
argument-hint: "[pr-number|branch|file-list]"
allowed-tools: Read, Grep, Glob, Bash
_organized: true
---

# Code Review

Review the code, not the intention. Decline freely.

## Layering

- Policy (what good means): `work-mode/quality-bar.md`, `work-mode/coding-policy.md`
- Architecture review (does the design fit?): `dev-review`
- Implementation self-discipline (TDD, debug, verify): `dev-discipline`
- Shippability judgment (this skill): line-level code review with decline gates

Do not use this skill to re-litigate the design. Use `dev-review` for that. Do not use this skill to run verification. Use `dev-discipline/references/verify.md` for that. This skill judges the code that already exists.

## Core Rules

- Decline by default when a decline trigger fires. Do not bargain.
- Findings first, no preamble.
- One quality bar: would a strong staff engineer ship this code tomorrow.
- AI-generated code does not get a lower bar. The bar is the same.
- "It works" is not shippable. Shippable means correct, clear, maintainable, and not leaving traps.
- Ignore author effort. Review the artifact, not the journey.
- Report every issue found, including uncertain ones, coverage first. The severity tiers in the output contract do the filtering — do not pre-filter findings away.

## Decline Triggers

Any of these fires → verdict is `Decline` and the code must change before merge.

### Correctness

- Error path on an I/O boundary (network, disk, process, DB) is unhandled or silently swallowed
- `try`/`except` with a bare pass, a log-only branch, or a generic `Exception` that hides real failures
- Off-by-one, wrong comparator, or inverted boolean in a control path
- A promise that the code cannot keep (e.g. function named `is_valid` that returns true for invalid input)
- Concurrency without the required locking, atomicity, or idempotency
- Data-mutation where an immutable copy was expected, or vice versa
- SQL, shell, or HTML strings built with concatenation where injection is plausible
- Untrusted input flowing into an LLM/prompt call without sanitation — injection class

### Safety

- Secret, token, or credential introduced into code, logs, config, or commit
- `--no-verify`, skipped hooks, or disabled CI checks without a documented reason
- Coverage thresholds, lint rules, or CI checks weakened or skipped — treat like `--no-verify`: an escape hatch, not a fix
- New dependency that does not exist in the real registry (phantom package) — verify before accepting
- Permission, access, or auth boundary weakened or removed
- Destructive path (delete, drop, reset, rm) without a reversible guard or explicit opt-in

### Clarity

- Dead code, commented-out code, or "keep for reference" blocks shipped
- TODO, FIXME, or XXX left in the delivered diff without a tracking reference
- Magic numbers or magic strings in a public API surface
- Names that contradict behavior (`get_x` with side effects, `is_x` that mutates, `temporary` that persists)
- Function doing three things that are not connected

### Maintainability

- Copy-paste of an existing helper or utility instead of reuse
- New abstraction layer, wrapper, or indirection with no current caller that needs it
- Feature flag, config toggle, or compatibility branch added for a scenario that does not exist
- Dual-path architecture kept alive when one path is enough
- Public interface changed without a migration or deprecation note
- Shallow module introduced where the interface is nearly as complex as the implementation
- Caller rules duplicated instead of being concentrated behind the module interface

### Tests

- Test that would pass against an empty implementation
- Test that asserts on internals (private method, exact log string, implementation detail)
- Test that mocks owned internal modules instead of verifying behavior through the public interface
- Test that depends on wall-clock time, network, filesystem state, or test-order without explicit setup
- New behavior shipped with no test at all on a path that would have been testable
- Disabled, skipped, or deleted test without a stated reason
- Tests rewritten to codify the new broken behavior — subtler than deletion; compare assertions against the requirement, not against the code

### Style That Actually Matters

- Violates the canonical pattern in the touched area
- Introduces a third way of doing something the codebase already does two ways of
- Inline formatting drift that will cause churn on every future edit

## When A Decline Trigger Is Actually Okay

Only when ALL of these hold:

- The exception is stated explicitly in the review output
- The reason is concrete, not "for now" or "later"
- A tracked follow-up exists when the debt is real
- The change is smaller than the cost of the cleanup

If any of those is missing, the decline stands.

## Comments And Suppressions

Apply this lens whenever the diff adds, changes, removes, or works around a
comment, annotation, lint disable, type suppression, test skip, or CI escape.
Classify the result through the normal severity tiers; this lens does not make
every comment a Decline trigger.

- A comment that only narrates obvious code is normally a Should-Fix: remove it
  or replace it with clearer code.
- A comment that explains an avoidable workaround is a Must-Fix when the
  workaround ships in the diff. Fix the root cause through `dev-implement`, then
  remove the comment.
- A comment that states an internal constraint should be encoded in the
  strongest practical surface: type, test, runtime check, API contract, or CI.
  Keep the comment until that encoding is verified.
- A precise comment that records an unchangeable external reason, protocol
  quirk, legal rule, or counterintuitive invariant should remain when code
  alone cannot express why the shape is necessary.
- An obsolete or unjustified suppression is a Must-Fix. When still required,
  keep it as narrow as possible and require a precise adjacent reason.

Do not delete a potentially valid constraint comment until it is proven obsolete or encoded elsewhere.

Deleting an ambiguous comment is not a cleanup. If its claim cannot be verified,
report the uncertainty and leave the code unchanged.

## Review Depth

- Trivial diff (one-liner, typo, doc fix): fast pass, each output section kept to one line or "none"
- Routine change (CRUD, small feature, bug fix): full decline-trigger sweep
- Structural change (new module, cross-cutting refactor, interface change): full sweep plus canonical-path check
- Security, auth, billing, data-integrity, or persistence change: full sweep plus explicit threat sketch
- Diffs touching CI config, coverage settings, lint rules, or test skips get security-tier depth — the gate itself is the agent's cheapest path to green

Do not go deeper than the change deserves. Do not go shallower than the blast radius demands.

## What To Read

- The diff (line-level)
- The touched files in full when the diff touches any non-trivial control flow
- The tests that should have caught a regression in this area
- The nearest canonical example of the pattern being used
- The commit message or PR description — only to understand intent, not to lower the bar

## Hard Stops

Stop and say so if:
- The diff is too large to review well in one pass — ask for a split
- The change needs architecture review first — punt to `dev-review`
- Critical context is missing (no spec, no issue, no clear goal) — ask before judging
- The author is still iterating — review is premature

## Output Contract

Return exactly, in this order:

1. `Verdict` — one of: `Ship`, `Ship with fixes`, `Decline`
2. `Must-Fix` — every blocker, one bullet each, with the file and line when applicable
3. `Should-Fix` — quality issues that are not blockers but should not slip
4. `Nice-to-Have` — optional improvements, state them briefly, no moralizing
5. `Risks` — things left as-is that the author and maintainer should be aware of
6. `Verified` — what was checked, what was not, and why

Do not pad. Do not soften. Do not open with "overall this looks good" before listing four blockers.

If the verdict is `Decline`, state the single most important reason in one sentence at the top of `Must-Fix`. The rest of the list follows.

## Anti-Patterns

- Performative agreement: "Great work overall, just a few small things" followed by ten must-fixes
- Stacking nice-to-haves to soften a decline
- Asking the author to justify instead of declining
- Rewriting the code in the review instead of pointing at the problem
- Focusing on style bike-sheds while ignoring a correctness blocker
- Re-running architecture arguments inside a code review

## Related

- `dev-review` for architecture and design fit
- `dev-discipline` for implementation-side self-checks
- `dev-github-pr` for the PR-state plumbing when the review lands as GitHub comments
- `work-mode/quality-bar.md`, `work-mode/coding-policy.md` for the underlying policy

## Skill Handoffs

When this skill is active:

- If the finding is architectural, canonical-path, adapter, or module-shape related → hand off to `dev-review`.
- If a finding needs a fix → hand off to `dev-implement`; use `dev-discipline/references/debug.md` for root cause before patching.
- If a finding concerns prompt, skill, MCP, tool-use, or model-facing output contracts → hand off to `prompt-creation-review`.
- If a finding concerns rendered UI, block/message renderers, screenshots, or interaction quality → hand off to `dev-ui`.
- Before final completion after fixes → use `dev-discipline/references/verify.md`.
