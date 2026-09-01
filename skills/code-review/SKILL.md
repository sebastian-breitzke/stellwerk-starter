---
name: code-review
description: >
  Line-level code review with hard decline gates. Use after implementation,
  when the user asks to review a diff, PR, branch, commit, or file, when a
  self-review is requested, when pasted review findings need judging, or before
  merge confidence. Architecture and approach fit belong in dev-review;
  verification mechanics belong in discipline. This skill declines; it does
  not negotiate.
argument-hint: "[pr-number|branch|file-list]"
allowed-tools: Read, Grep, Glob, Bash
---

# Code Review

Review the code, not the intention. Decline freely.

## Before Reviewing

Get the actual diff — `git diff <base>...<head>`, the PR diff, the working
changes. Then, before judging any signature or behavior change, **grep for the
call sites.** A diff shows what changed; it hides who depended on it.

## Lenses

Apply the ones that fit. Do not perform all of them on a two-line change.

- **Correctness** — does it do what it claims, including on the edge cases the
  author did not mention?
- **Regression surface** — what existing behavior does this touch? Who calls it?
- **Data integrity** — can this lose, duplicate, or corrupt data? Is it
  idempotent where it needs to be?
- **Security** — input trust boundaries, authz on the new path, injection,
  secrets in code or logs, and what the error messages leak.
- **Concurrency** — races, unbounded retries, non-atomic read-modify-write.
- **Efficiency** — N+1 queries, per-item round trips, work re-done per iteration.
- **Test discipline** — do the tests assert behavior, or do they mirror the
  implementation and pass no matter what?
- **Scope** — is anything in this diff unrelated to its stated purpose?
- **Failure modes** — what happens when the dependency is down, the input is
  empty, the list is enormous?

## Output Contract

```text
Verdict: <ship | ship with changes | revise>

Must fix
- <file:line> — <the defect> — <the concrete failure it causes>

Should fix
- <file:line> — <issue> — <why it matters>

Noted
- <smaller things, one line each>

Not reviewed
- <what you did not look at, and why>
```

Findings first. No reassurance before blockers. Every finding names a file and
line and a concrete failure — "this could be cleaner" is not a finding.

## Decline Gates

Return `revise` when the change:

- keeps an old and a new path alive with no bounded migration plan
- adds abstraction with no current payoff
- copies a known-bad legacy pattern
- claims quality with no verification evidence
- puts secrets, customer data, or compliance at risk
- widens a permission, a scope, or a trust boundary without saying so
- mixes an unrelated refactor into a behavior change, making both unreviewable

Do not soften a `revise` because the author is nearly done. That is when it is
cheapest to fix.

## Judging Pasted Findings

When the user pastes findings from another reviewer or tool, judge each one:
`confirmed` (with the failure it causes), `false positive` (with why), or
`unclear — needs X to decide`. Do not accept a list wholesale, and do not
dismiss one because it came from a bot.

## Gotchas

- A diff that only adds code still changes behavior if it registers a handler,
  a hook, or a migration.
- "The tests pass" is the author's claim, not evidence, until you have seen
  which tests exist and what they assert.
