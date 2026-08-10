---
name: person-context
description: >
  Load and curate durable collaboration context for named people the user works
  with: role, working surface, communication style, decision criteria, and how
  to write with or for them. Use when a task names a known colleague,
  stakeholder, or customer contact, or when preparing to write to or about them.
  Not when a name appears only incidentally in a path, a commit, or a log, and
  never as a dossier or a performance record.
---

# Person Context

Durable collaboration preferences. Not a dossier, not a meeting archive.

## One Library, Not One File Per Person

Keep a single conditional context file — for example
`context/people.md` — with one short section per person. Do **not** create a
skill per person: a dozen near-identical skill descriptions poison routing for
every other skill in the library.

This file is **conditional context**, never always-on. It loads when a task
names someone, and not otherwise.

## Store Only

- role and the surface where you actually collaborate
- preferred level of detail — the one-liner person versus the full-context person
- communication style and channel
- decision criteria: what makes them say yes
- recurring concerns in their work
- how the user writes with or for them

Two to six lines per person. If it does not change how you would write the next
message, it does not belong.

## Never Store

Gossip, private leverage, health or diagnoses, HR-style performance judgments,
one-off moods, transcripts, or chronological event logs.

The test: *would you be comfortable if this person read this section?* If not,
it is not collaboration context — it is a liability.

## Update Rule

Meeting recaps and conversations may **propose** candidates. Persistence requires
explicit approval, every time.

```text
Person Context To Review
- <Person>: durable? — <the signal, in one line>
```

When a stored line turns out to be wrong or stale, delete it. An outdated
communication preference is worse than none — it produces confident,
specifically wrong behavior.

## Privacy

Private by default. Never goes into a public repo, a customer repo, a shared
starter, or a screenshot. When sharing any runtime artifact, this file is the
first thing to remove.

## Gotchas

- Never infer someone's pronouns from their name. If they are not stated, use
  they/them.
- A preference recorded once from a single interaction is a sample of one. Wait
  for it to repeat before writing it down as durable.
