# Mode: State

Refresh the compact working-memory artifact for the ACTIVE Leitstand session.
This mode runs against the active session; do not restart intake and do not
create a second session when one already exists.

`leitstand.jsonl` is the audit trail. `state.md` is the current operating state
for Codex resume, compaction, fresh worker threads, and human scanning.

## Procedure

1. Ensure the active Leitstand log exists. If not, scaffold it first
   (`scripts/leitstand-scaffold.mjs`) and note the late scaffold in the log.
2. Read the current goal, workmode, decisions, blockers, subagent results,
   verification evidence, and integration state from the active log and the
   current repo evidence.
3. Write or refresh `state.md` in the active session directory.
4. Append a `state_update` event with `path`, `reason`, and `summary`.
5. If the owning repo AX explicitly declares a project-state file, mirror only
   durable project facts there. Keep the session-local `state.md` as the source
   for current session state.

## When To Refresh

- after intake and goal confirmation
- after a decision changes the direction
- after a subagent returns useful evidence
- after verification, integration, or a blocker
- before compaction, resume, handover, close, or a context-risk pause

## Artifact Contract

Keep `state.md` compact, normally under 1200 words. Do not paste transcript.
Use file paths, commands, commits, logs, and explicit uncertainty instead of
chat narrative.

```md
# Leitstand State: <short title>

## Current Goal
<one sentence outcome plus success criteria>

## Current Phase
<intake|planning|implementation|review|integration|blocked|complete> - <why>

## Read First
<AX, repo docs, source files, handover, or evidence a fresh agent must read before work>

## Decisions
<current decisions only; include superseded decisions only if they prevent a trap>

## Active Workstreams
<owner, worktree/branch if known, owned area, stop condition>

## Evidence
<verification commands, commits, tests, logs, DB/source evidence; mark unverified items>

## Open Risks / Blockers
<real uncertainty, conflicts, missing access, stale assumptions>

## Next Slices
<ordered backlog; each entry: outcome — done criterion — verification. The first
entry is the next action. Include a required human checkpoint as its own entry.
A slice without a done criterion is not runnable — `run` mode sharpens it via
the orchestration checkpoint before executing.>

## Out Of Scope
<explicit exclusions so a fresh worker does not expand the job>
```

## State Delta Contract

Subagents and worker threads return a compact delta that the main agent can
integrate into `state.md`:

```text
State Delta:
- decisions:
- files read/changed:
- evidence:
- blockers:
- next:
```

Rules:

- State deltas are not handovers. They are patches to the current state.
- The main agent reviews the delta before updating `state.md`.
- If a delta contradicts current state, log a `decision` or `blocker`; do not
  silently overwrite the prior state.
- Do not put secrets, raw credentials, full transcripts, or noisy command output
  into `state.md`.

## Anti-Patterns

- using `state.md` as a second transcript
- treating `handover.md` as the only context-preservation mechanism
- making the user shuttle subagent outputs between chats by hand
- updating state only at the end, after compaction risk has already accumulated
