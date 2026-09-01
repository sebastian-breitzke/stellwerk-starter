# Mode: Handover

Produce a self-contained handover artifact so another session (new Claude chat,
Codex session, or a parallel agent) can continue the work without re-explaining
context. This mode runs against the ACTIVE session; do not restart the Leitstand
workflow.

## Procedure

1. Ensure the active Leitstand log exists. If not, scaffold it first
   (`scripts/leitstand-scaffold.mjs`) and note the late scaffold in the log.
2. Refresh or read `state.md` first. Then collect grounding from the active
   session: current goal, decision state, verified vs. open work, blockers, and
   the exact file/DB/log evidence used.
3. Write the artifact to the active session folder as `handover.md`.
4. Append a `decision` event referencing the handover path, and a `state_update`
   event if the handover changed current state.
5. Echo the full artifact in chat, followed by one copy-paste goal
   (see `references/goal.md`) that points at the artifact.

## Artifact Contract

Pointers over duplication is a hard rule: reference specs, ADRs, commits, and
`state.md` by path — never restate content that already lives elsewhere. The
artifact is disposable once consumed.

`handover.md` must separate these sections explicitly — Auftrag, Quelle, and
Ziel-Basis are different things and mixing them is a known failure:

```md
# Handover: <short title>

## Auftrag
<what the next agent must do — outcome, not activity>

## Quellen (Ist-Stand, gelesen bevor gearbeitet wird)
<files, logs, DB evidence, prior findings — the factual basis. A single issue
file is a Startauftrag, never the complete Quellenbasis. List every source the
next agent must read first.>

## Ziel-Basis (Stil-/Strukturreferenz)
<existing target pages, patterns, or artifacts that define what "good" looks
like — reference material, not sources of truth>

## Stand
<done+verified / in progress / open, each with evidence pointer>

## Aktueller State
<path to state.md and the exact state facts the next agent should treat as current>

## Workmode & Integration
<mode, integration rule, repo/worktree, log path: leitstand/<session>/leitstand.jsonl>

## Offene Risiken / Blocker
<known traps, stale assumptions to avoid>
```

Rules:

- Self-contained: the artifact must not rely on the surrounding chat.
- State-backed: use `state.md` as the compact current-state basis. The handover
  may quote or summarize state facts, but it must not replace `state.md`.
- Runtime-neutral: no Claude- or Codex-specific phrasing inside the artifact;
  the copy-paste goal underneath may name runtime and effort.
- Ground every "Stand" claim in evidence (commit, file, test, log line).
  If something is unverified, say so — do not launder assumptions into facts.
- For parallel fan-out (several sessions on one objective), state the owned
  area per target session so the slices cannot collide.
