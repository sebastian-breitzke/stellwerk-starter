# Mode: Handover

Produce a self-contained artifact so another session — a new chat, a different
runtime, a parallel agent — can continue without re-explaining anything.

## Procedure

1. Ensure the active session exists; scaffold first if it does not.
2. Refresh or read `state.md`. Collect the current goal, decision state, what is
   verified versus open, blockers, and the exact evidence used.
3. Write `handover.md` into the session folder.
4. Append a `decision` event referencing the path, and a `state_update` if the
   handover changed current state.
5. Echo the artifact in chat, followed by one copy-paste goal pointing at it.

## Contract

**Pointers over duplication.** Reference specs, commits, and `state.md` by path.
Never restate content that already lives elsewhere. The artifact is disposable
once consumed.

Keep these three separate — mixing them is the classic failure:

```md
# Handover: <short title>

## Assignment
<what the next agent must achieve — outcome, not activity>

## Sources (read before working)
<files, logs, data evidence, prior findings — the factual basis.
A single ticket is a starting point, never the complete source basis.
List every source the next agent must read first.>

## Reference (what "good" looks like)
<existing patterns, pages, or artifacts that define the target shape.
Reference material — not a source of truth.>

## Status
<done+verified / in progress / open — each with an evidence pointer>

## Current State
<path to state.md and the facts to treat as current>

## Workmode & Integration
<mode, integration rule, repo/branch, session log path>

## Open Risks / Blockers
<known traps, stale assumptions to avoid>
```

## Rules

- Self-contained: it must not rely on the surrounding chat.
- State-backed: it may quote `state.md`, it must not replace it.
- Runtime-neutral inside the artifact; the copy-paste goal underneath may name
  a model and effort.
- Every status claim carries evidence — a commit, a file, a test, a log line.
  Unverified means unverified; do not launder assumptions into facts.
- For parallel fan-out, state the owned area per target session so slices cannot
  collide.
