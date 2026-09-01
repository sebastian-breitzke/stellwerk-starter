---
name: dev-change-notes
description: "Write commit messages, commit bodies, and PR descriptions: plain-English summary for normal humans first, then technical context. Use when drafting or rewriting a commit note, PR description, or change summary. Not for release-notes publishing and not a code review."
argument-hint: "[commit|pr] [scope]"
allowed-tools: Read, Grep, Glob, Bash
_organized: true
---

# /dev:change-notes - Human-Readable Change Notes

**Purpose:** Write commit notes and PR descriptions that start with a plain-English explanation of what changed and why, then add technical background and implementation detail where helpful.

## Core Rules

- Always write in English.
- Start for normal humans, not for developers deep in the code.
- Explain what changed before how it was implemented.
- Explain why it matters when the reason is knowable.
- No marketing tone, no hype, no filler, no "exciting" language.
- Keep structure easy to scan.

## Gather Evidence First

Read the actual change before writing: staged diff, branch diff against the base, or the commits in scope. Do not write notes from conversation memory alone.

## The Required Shape

Every note should follow this order:

1. plain-language summary
2. why it matters
3. technical background
4. implementation details if they help

If a section would be empty or meaningless, omit it. Do not pad.

## Plain-Language Rule

The opening must be understandable by a smart non-specialist teammate.

Good:
- "This change makes queued insights behave like published insights, so links and deep dives now work the same way before launch."
- "This change adds a dedicated UI skill, so frontend work now has the same guardrails that backend work already had."

Bad:
- "Refactors runtime assembly for multi-provider prompt composition."
- "Improves orchestration architecture for skill-layer convergence."

## Technical Detail Rule

Technical detail belongs after the human-readable explanation.

Use it to explain:
- affected systems or layers
- important constraints
- non-obvious trade-offs
- rollout or validation details

Do not dump file lists unless they help understanding.

## Commit Notes

### Subject Line

- Prefer the repository's existing commit style if one is obvious.
- Keep it concise and specific.
- The subject names the change. The body explains it.

### Commit Body Template

```text
[Plain-language summary]

Why:
- [Why this change exists]

Technical background:
- [System or layer affected]
- [Constraint, compatibility, or behavior change]

Implementation details:
- [Only if useful]
```

Rules:
- If the commit is tiny, keep the body short.
- If the commit is structural, the "why" section is mandatory.
- Do not write a body that only repeats the subject.

## PR Descriptions

### PR Template

```markdown
## What changed

[Plain-language summary in simple English]

## Why it matters

- [User-facing or team-facing impact]

## Technical background

- [Architecture, workflow, or system details]

## Implementation details

- [Only if useful]

## Validation

- [Tests, build, preview, manual verification]
```

Rules:
- The first section must work for someone who did not read the diff.
- Mention user-facing impact before implementation mechanics.
- Prefer grouped explanation over file-by-file narration.
- If there are blockers, risks, or follow-ups, add them explicitly rather than hinting.

## Release-Notes Friendliness

Write notes so they can be mined later for release notes.

That means:
- name the user-facing effect clearly
- separate impact from implementation
- avoid burying the real change in technical jargon

If a change has both a user-facing effect and a technical cleanup aspect, lead with the user-facing effect.

## Anti-Patterns

- starting with internal jargon
- writing like a changelog for developers only
- listing files without explaining the outcome
- marketing language or fake enthusiasm
- vague phrases like "improves things" or "various fixes"
- hiding the "why"

## Success Criteria

A good note should let a normal teammate answer three questions quickly:

1. What changed?
2. Why did we do it?
3. What is the important technical context?

Before returning the note, load and run `unslop` as a conservative final
validation. Remove filler, puffery, and formulaic phrasing without changing
facts, technical terms, scope, or the repository's established commit and PR
voice.
