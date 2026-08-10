---
name: meeting-recap
description: >
  Turn a transcript, recording notes, or rough meeting notes into a shareable
  recap, extracted decisions and action items, and an optional private
  reflection. Use when the user provides meeting notes or a transcript, asks for
  a recap, follow-up, or protocol. Not for agendas, live note-taking, or
  anything resembling performance evaluation of the participants.
argument-hint: "[--quick|--standard|--customer|--partner]"
---

# Meeting Recap

Turn what was said into what happens next.

## Boundary

Separate shareable facts from private interpretation, and keep the second one
optional and clearly marked.

Never produce: gossip files, political dossiers, performance judgments,
psychological labels, or a chronological transcript archive by default.

## Modes

| Mode | For | Emphasis |
|------|-----|----------|
| Quick | a short call | facts, decisions, actions |
| Standard | a normal meeting | recap plus private reflection if useful |
| Customer | a customer or project call | needs, commitments, risks, next step |
| Partner | a vendor or partner call | alignment, expectations, follow-up |

## Shareable Recap

Include only the sections the input actually supports. An empty section is a
signal, not a hole to fill.

- context and purpose
- participants and roles
- key facts
- decisions — *what was decided*, not what was discussed
- commitments — who committed to what, in whose words
- action items with owner and date where stated
- open questions
- risks or sensitivities
- next best move

Write in the meeting's language unless asked otherwise.

## Fidelity Rules

- Do not upgrade a maybe into a commitment. "We'll look into it" is not "X will
  deliver Y".
- Do not assign an owner nobody named. Write "owner not named".
- Do not invent a date. "No date discussed" is the correct output.
- Where the transcript is ambiguous or inaudible, mark it — do not smooth it
  into plausible prose.
- Attribute decisions to the meeting, not to individuals, unless attribution was
  explicit and matters.

These rules exist because a recap gets forwarded. A confident invention becomes
someone's commitment.

## Private Reflection

A separate section, only when useful. Focus on: the next move, weak framing,
unclear commitments, missed follow-up, preparation for the next conversation.

Practical, not people-scoring.

## Person Context Candidates

Durable collaboration signal may be *suggested*, never persisted automatically:

```text
Person Context To Review
- <Person>: durable? — <communication or collaboration signal>
```

Approval is required before anything is written to a person-context file.

## Gotchas

- Transcripts attribute speech badly. Before quoting someone, check that the
  speaker labels are consistent across the surrounding turns.
