---
name: meeting-recap
description: "Meeting Recap workflow for transcripts and rough notes: create a shareable recap, private working notes, action extraction, and explicit stakeholder-context review suggestions. Use when the user provides a meeting transcript, recording notes, or asks for a recap or private reflection. Not for agendas, live note-taking, or people-performance evaluation."
argument-hint: "<transcript-file|notes> [--mode=quick|standard|customer|partner] [--save]"
allowed-tools: Read, Write, Glob
_organized: true
---

# Meeting Recap

Turn meeting transcripts, rough notes, or recording-derived text into a useful
recap the user can share and separate private working notes for follow-up.

This skill is for independent work with customers, partners, vendors, and close
collaborators. It is not a politics, people-performance, or relationship-scoring
workflow.

## Purpose

Produce:

1. a shareable Meeting Recap
2. decisions, commitments, follow-ups, risks, and open questions
3. customer/partner context that affects next work
4. separate private working notes for the user when useful
5. optional stakeholder-context suggestions marked explicitly for review

## Shared Contract

- Extract what matters for future action, delivery, and communication.
- Separate shareable facts from private interpretation.
- Do not create political dossiers, HR-style evaluations, gossip files, or leverage notes.
- Do not score, rank, diagnose, or evaluate people.
- Do not store meeting history inside stakeholder context.
- Stakeholder context is only about communication and collaboration: what
  matters to the person, how they prefer to communicate, decision style,
  recurring concerns, and tone level.
- Stakeholder-context items are review suggestions only. Do not write them from
  this skill.
- Persistent stakeholder context belongs only in the user's established private
  context system, never in arbitrary customer or project repositories.

## Output Modes

Infer the smallest useful mode unless the user specifies one.

| Mode | Use for | Output |
|------|---------|--------|
| `quick` | short call, low stakes, quick extraction | short recap, decisions, actions |
| `standard` | normal customer/partner call or dense notes | full recap plus private working notes if useful |
| `customer` | customer conversation, sales/discovery/project steering | customer context, needs, commitments, risks, next steps |
| `partner` | partner/founder/vendor conversation | alignment, expectations, commitments, communication context |

## Shareable Recap

Include only sections supported by the transcript:

- context
- participants and roles when known
- key facts
- decisions
- commitments and action items
- open questions
- customer/partner needs
- risks or sensitivities
- next best move

Write in the meeting language unless the user asks otherwise.

The shareable recap must be safe to send to participants after a light human
pass. Leave out private interpretation, tactical concern, and stakeholder-context
proposals.

## Private Working Notes

Private working notes are optional and for the user only.

Use it for:
- what went well or badly in the conversation
- missed chances, weak framing, unclear commitments, or next tactical moves
- communication observations that help the user prepare the next conversation
- questions to clarify later

Do not use private working notes for personal judgments, labels, politics, or
venting.

## Stakeholder Context Suggestions

Suggest stakeholder-context review items only when the transcript contains
durable collaboration signal about a person.

Good stakeholder-context candidates:
- communication style and preferred level of detail
- what the person optimizes for
- decision criteria
- recurring concerns
- trust-building pattern
- topics or wording to avoid
- how to write for or to this person

Bad stakeholder-context candidates:
- one-off mood
- private gossip
- psychological diagnosis
- performance judgment
- chronological meeting recap
- anything that would feel like a dossier rather than collaboration memory

Default handling:
- Present suggestions under `Stakeholder Context To Review`.
- Phrase every item as a review candidate, not as truth.
- Name the user's established private context system when known.
- Do not write stakeholder-context files from this skill.
- If the user asks to persist suggestions, route the follow-up through their
  explicit stakeholder-context workflow. If none exists, keep them as review
  candidates and ask before creating a new durable store.

Suggestion shape:

```text
Stakeholder Context To Review:

- <Person>: prüfe, ob dauerhaft gilt: <communication/collaboration signal>
```

## Filing

Default: return the analysis in chat.

Save files only when:
- the user asks for a file,
- `--save` is present,
- or there is an obvious existing customer/partner folder and saving is useful.

When saving:
- use a sensible existing folder,
- do not create parallel folders for the same customer/partner,
- ask before creating a new folder,
- do not keep transcript copies unless asked.

Suggested saved shape:

```text
<context-folder>/<YY.MM.DD.meeting-name>.recap.md
<context-folder>/<YY.MM.DD.meeting-name>.private.md   # only if private working notes are useful
```

## Workflow

### Phase 0: Source And Context

Do:
1. confirm the transcript or notes exist
2. identify meeting date/title when available
3. identify participants and unresolved names
4. load relevant known stakeholder context if available
5. decide whether output should stay in chat or be saved

Gate:
- input exists
- participants are handled without invention
- storage path is clear or chat-only

### Phase 1: Extraction

Extract:
- factual context
- decisions
- commitments and owners
- open questions
- customer/partner needs
- risks, sensitivities, and constraints
- durable communication or collaboration signals

Gate:
- facts are separated from interpretation
- private observations are not mixed into the shareable recap

### Phase 2: Synthesis

Create the shareable Meeting Recap.

Rules:
- lead with what matters next
- group by decision/usefulness, not transcript order
- avoid "who said what" transcript theater
- keep quotes short and only when wording matters
- mark uncertainty explicitly

### Phase 3: Private Layer

Create private working notes only when useful.

Rules:
- keep it separate from the shareable recap
- focus on the user's next move, framing, commitments, and preparation
- no political dirt file
- no people scoring or personal evaluation

### Phase 4: Stakeholder Context Suggestions

Suggest stakeholder-context review items when durable signal exists.

Rules:
- propose concise review candidates in chat
- mark them as `prüfe, ob dauerhaft gilt`
- name the user's established private context system when known
- do not write stakeholder-context files from this skill
- include style/needs/communication context, not meeting history

## Final Response

Report briefly:
- meeting mode
- whether output stayed in chat or was saved
- decisions/actions found
- private working notes created or skipped
- stakeholder-context review suggestions created or skipped

## Error Handling

If a gate fails:
1. say what failed
2. use available context to recover when safe
3. ask one focused question only when needed
4. continue once the input, scope, or storage path is clear
