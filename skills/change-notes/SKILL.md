---
name: change-notes
description: >
  Write commit messages, commit bodies, pull-request descriptions, and change
  summaries that explain the outcome before the implementation. Use when
  drafting or rewriting a commit note, PR description, or human-readable change
  summary. Not for release-note publishing or code review.
argument-hint: "[commit|pr] [scope]"
---

# Change Notes

Read the actual diff, commits, or PR before writing. Conversation memory alone
is not enough evidence.

## Rules

- Start with what changed in plain language.
- Say why it matters when the reason is knowable.
- Put technical background after the reader understands the outcome.
- Follow an established repository style when one exists.
- Use no hype, filler, or file-by-file narration unless it clarifies the change.

## Commit Shape

```text
<concise subject naming the change>

<plain-language summary>

Why:
- <reason>

Technical background:
- <only the context that helps>
```

Omit empty sections. A small commit usually needs only a subject; a structural
change needs the why.

## PR Shape

```markdown
## What changed

<plain-language summary>

## Why it matters

- <impact>

## Technical background

- <relevant implementation context>

## Validation

- <actual check and result>
```

## Check

Before returning, a teammate who did not read the diff must be able to answer:
what changed, why it exists, and what important technical constraint applies.
