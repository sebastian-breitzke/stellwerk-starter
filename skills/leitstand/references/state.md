# Mode: State

Refresh the compact working-memory artifact for the **active** session. Do not
restart intake and do not create a second session.

`session.jsonl` is the audit trail. `state.md` is the current operating state
for resume, compaction, fresh worker threads, and human scanning.

## Procedure

1. Ensure the active session exists. If not, scaffold it first and note the late
   scaffold in the log.
2. Read the current goal, workmode, decisions, blockers, subagent results,
   verification evidence, and integration state from the log and the repo.
3. Write or refresh `state.md` in the session directory.
4. Append a `state_update` event with `path`, `reason`, and `summary`.

## When To Refresh

- after intake and goal confirmation
- after a decision changes direction
- after a subagent returns useful evidence
- after verification, integration, or a blocker
- before compaction, resume, handover, or close

## Contract

Under ~1200 words. No transcript. Use file paths, commands, commits, and
explicit uncertainty instead of chat narrative.

```md
# Session State: <short title>

## Current Goal
<one sentence outcome plus success criteria>

## Current Phase
<intake|planning|implementation|review|integration|blocked|complete> — <why>

## Read First
<the files, docs, or evidence a fresh agent must read before doing anything>

## Decisions
<current decisions only; keep a superseded one only when it prevents a trap>

## Active Workstreams
<owner, branch/worktree, owned area, stop condition>

## Evidence
<verification commands, commits, tests, logs; mark unverified items as unverified>

## Open Risks / Blockers
<real uncertainty, conflicts, missing access, stale assumptions>

## Next Slices
<ordered backlog. Each entry: outcome — done criterion — verification.
The first entry is the next action. A required human decision is its own entry.
A slice without a done criterion is not runnable.>

## Out Of Scope
<explicit exclusions, so a fresh worker does not expand the job>
```

## State Delta

Workers return a patch, not a document:

```text
State Delta:
- decisions:
- files read/changed:
- evidence:
- blockers:
- next:
```

Review the delta before folding it into `state.md`. If it contradicts current
state, log a `decision` or `blocker` — never silently overwrite. No secrets, no
transcripts, no raw command dumps.

## Anti-Patterns

- using `state.md` as a second transcript
- updating it only at the end, after the compaction risk has already accumulated
- making the user shuttle worker output between chats by hand
