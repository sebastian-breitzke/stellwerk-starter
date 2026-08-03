# Architecture

Stellwerk-style runtime structure is a layering discipline for agent
instructions.

The goal is not to make the prompt bigger. The goal is to put the right
instruction in the right place.

## Layers

```text
identity/
  role.md
  tone.md

work-policy/
  execution.md
  verification.md
  privacy.md
  change-workflow.md

skills/
  leitstand.md
  research.md
  meeting-recap.md
  challenge.md
  dev-review.md
  verification.md
  prompt-design.md
  functional-writing.md
  person-context.md

context/
  private or conditional context, not always-on
```

## Always-On Layer

Keep this small.

Use it for:

- role and tone
- how the agent should act by default
- safety and privacy boundaries
- verification expectation
- when to ask versus when to proceed

Do not use it for:

- transcripts
- detailed person files
- customer instructions
- project-specific deployment paths
- long examples
- historical logs

## Skill Layer

Use skills for repeatable workflows.

Good skill candidates:

- session orchestration
- research
- meeting recap
- planning challenge
- code review
- verification
- document writing
- prompt and instruction design
- person-context curation

Bad skill candidates:

- one-off project notes
- private relationship context
- a single customer workaround
- secrets or credentials
- long raw examples that belong in docs

## Context Layer

Context is conditional. Load it only when the current task needs it.

Examples:

- person-specific communication preferences
- project-specific repo guidance
- customer background
- prior decisions
- research notes

Private context should have an owner and a reason. If nobody can explain when it
should load, it does not belong in a reusable runtime.

## Session Logs

A session log is useful when work spans multiple turns, subagents, or context
windows.

Keep it structured:

- raw user input when it matters
- goal and success criteria
- decisions and revisions
- blockers and friction
- delegated work
- verification evidence
- completion state

Do not put sensitive raw logs into a public starter repo.
