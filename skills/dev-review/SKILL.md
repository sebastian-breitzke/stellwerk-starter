---
name: dev-review
description: >
  Architecture and approach review: does this plan or implementation fit the
  system, the canonical path, and the size of the problem? Use when asked
  whether an approach is right, whether something is over- or under-engineered,
  before committing to a design, or when a change introduces a new boundary,
  contract, or dependency. Line-level defects belong in code-review; opening up
  a decision that is still forming belongs in challenge.
allowed-tools: Read, Grep, Glob, Bash
---

# Dev Review

Judge fit, not taste. The question is whether this belongs in *this* system, at
*this* size, on the path the team is actually walking.

## Lenses

Apply only what is relevant:

- **Architecture fit** — does it follow the direction the system is already
  going, or does it fork it?
- **Canonical path** — one current way, or a second parallel way created here?
- **Size** — is the machinery proportional to the problem? Would a senior
  engineer call this overbuilt?
- **Boundaries** — what new coupling, dependency, or contract appears, and who
  now has to maintain it?
- **Failure and operations** — when this breaks at 3am, is it diagnosable? Who
  owns it?
- **Data and security** — new trust boundaries, new stores, new retention.
- **Test discipline** — is the risk actually covered, or is coverage decorative?
- **Reversibility** — how expensive is it to undo in three months?

## Right-Sizing

The most common finding is not "this is wrong" but "this is three times bigger
than the problem". Ask:

- What breaks if we do the obvious simple thing instead?
- Which of these abstractions has a second caller today?
- Which flexibility here was requested, and which was imagined?
- Is this solving the problem, or the problem's most general form?

Conversely, do not right-size away from the non-negotiables. Data integrity,
security, correctness for money and permissions, and compliance do not get the
cheap version.

## Output Contract

```text
Decision: <proceed | proceed with changes | revise>

Findings
- <the issue> — <the consequence in this system>

Recommended changes
- <concrete change, not a principle>

Accepted risks
- <what we are knowingly living with, and the trigger to revisit>

Next step
- <the single next action>
```

Findings first. No reassurance before blockers. A finding without a consequence
is an opinion.

## Decline Patterns

Recommend `revise` when the work keeps old and new paths alive without a bounded
migration, adds abstraction with no current payoff, copies a known-bad legacy
pattern, has a fuzzy migration path, claims quality without evidence, or puts
data, security, or compliance at risk.

## Gotchas

- "We might need it later" is not a payoff. Ask for the second caller.
- A design that reads well and has no failure story has not been reviewed yet.
