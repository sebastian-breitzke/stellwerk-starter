---
name: leitstand
description: >
  Orchestrate meaningful work through a durable session with a raw-input log,
  compact state, bounded delegation, review, and verified integration. Use when
  the user gives a long dictation or substantial context, says "orchestrate
  this", "new session", "let's do this properly", or asks for work with
  dependent steps, multiple components, contract or regression-relevant changes,
  architecture decisions, non-trivial verification, repeated follow-up, or a
  handoff to another agent or chat. Modes goal, handover, state, log, run,
  resume. Not for trivial questions, confirmations, read-only lookups, or
  one-step reversible edits; planning without delivery ownership belongs in
  challenge.
argument-hint: "[goal|handover|state|log|run|resume|<objective>]"
---

# Leitstand

*Leitstand* is a control room: the place where you see the whole operation and
direct it. This skill is the main agent's control room for work too big to hold
in one turn.

## Purpose

You own the session. The user gives direction and corrections; you own goal,
sequencing, delegation, verification, and integration.

Do not hand coordination back to the user. Recommend a fresh session only when
the work is genuinely outside this one and needs its own goal and log.

## Modes

When the argument starts with one of these, that mode is the **entire job of the
turn**. Read only the named reference. Do not restart intake, do not re-mirror,
do not create a second session.

| Argument | Job | Reference |
|----------|-----|-----------|
| `goal` | regenerate the one copy-paste goal from current state | `references/goal.md` |
| `handover` | produce a self-contained brief for a new chat or parallel agent | `references/handover.md` |
| `state` | refresh the compact state file | `references/state.md` |
| `log` | audit the log, backfill missing events | `references/log-hygiene.md` |
| `run` | pull the next runnable slice from state, execute, verify, repeat | `references/run.md` |
| `resume` | re-enter an existing session from its decision state | below |
| `orchestrate` | force the delegation checkpoint | `references/orchestrate.md` |

`resume`: read `session.jsonl` and `state.md`, reconstruct open goals, last
checkpoint, and pending verification, append a `workmode` event if it is
missing, then continue from the last decision point and say what you resumed.

Anything else — an objective, a dictation, no argument — runs the full workflow.

## Session Store

Create one folder per session in the working repo:

```text
<session-root>/<YYYYMMDD-HHMMSS>-<short-slug>/
├── session.jsonl     # append-only audit trail
├── state.md          # compact current state
└── handover.md       # only when a handover was produced
```

Scaffold it in one call, at intake, before heavy synthesis:

```bash
printf '%s' "<the user's full unedited input>" | node <skill-dir>/scripts/session-scaffold.mjs \
  --slug <short-slug> --goal "<one sentence>" --mode <solo-main|team-pr> --mode-source <AGENTS.md|inferred>
```

The two files have different jobs, and the split is what survives context
compaction. `session.jsonl` is the audit trail — append-only, raw input stored
verbatim before any summarizing. `state.md` is working memory — the compact
current state a fresh chat, a resumed session, or a worker reads *instead of*
replaying the conversation. Contract: `references/state.md`.

If the repo must not store logs, keep state in chat and say so once.

## Events

One JSON object per line. Never replace a raw-input event with a summary.

```json
{"ts":"2026-01-15T09:00:00+01:00","type":"user_input_raw","phase":"intake","source":"chat","text":"full unedited input"}
{"ts":"…","type":"goal","phase":"intake","status":"proposed","summary":"one-sentence goal","success_criteria":["observable outcome"]}
{"ts":"…","type":"workmode","phase":"intake","mode":"solo-main","source":"AGENTS.md","integration":"worktree -> verify -> commit -> merge main"}
{"ts":"…","type":"decision","phase":"planning","status":"active","decision":"chosen path","rationale":"why"}
{"ts":"…","type":"agent_insight","phase":"execution","summary":"non-obvious finding"}
{"ts":"…","type":"subagent","phase":"execution","scope":"bounded job","status":"done","result":"compact summary","review":"accepted"}
{"ts":"…","type":"friction","phase":"execution","kind":"user-correction","trigger":"what happened","prevention_point":"skill|policy|docs|tooling"}
{"ts":"…","type":"blocker","phase":"execution","status":"active","summary":"what blocks progress","next_step":"how to unblock"}
{"ts":"…","type":"loop_design","phase":"execution","trigger":"…","action":"…","stop":"…","cap":"…"}
{"ts":"…","type":"state_update","phase":"planning","path":"state.md","reason":"after decision","summary":"what changed"}
{"ts":"…","type":"integration","phase":"integration","summary":"merged slice","evidence":["command: result"]}
{"ts":"…","type":"completion","phase":"final","summary":"delivered scope","remaining_risk":["known caveat"]}
```

Store raw input only when it is useful and safe to store.

## Authority Chain

When instructions conflict:

1. the user's current words in this thread, or a `user_input_raw` event
2. the current session's decision state
3. current canonical docs and repo-local agent instructions
4. current implementation code
5. old specs, old plans, stale generated docs — **no authority** unless current
   state explicitly reactivates them

## Workmode Gate

Hard gate before substantial implementation, integration, review loops, or
delegation:

1. Read the repo's own agent instructions.
2. Determine how work integrates here: solo work merged to `main` frequently,
   versus branch/PR with CI and review.
3. Log a `workmode` event with mode, source, and integration rule.
4. If no instructions exist, infer from strong cues — company repo, PR
   templates, branch protection, `CODEOWNERS` → team PR; private single-author
   repo → solo main — and log the gap as `friction`, then continue.

Do not run broad work while the log has no `workmode` event. This gate is what
stops an agent from opening a PR in a solo repo, or pushing straight to `main`
in a team one.

## Phases

A state machine, not a waterfall. Move back and sideways when the conversation
demands it.

**1. Intake.** Store the raw input. Scaffold the session. Mirror the understood
intent in two lines: goal, success criteria, current phase, proposed next move.
Skip the mirror for acknowledgements and option picks.

**2. Challenge.** Name *one* alternate angle or hidden tradeoff before building.
Once, concretely. Not a questionnaire. (Detail: the `challenge` skill.)

**3. Plan.** Owned scope, ordered slices, delegation points, verification,
completion criteria. Each slice gets an outcome, a done criterion, and a check.

**4. Delegate.** Run the checkpoint in `references/orchestrate.md`. Delegation
is the default when the work has independent slices, broad reading, separate
review passes, or context-compaction risk — and not delegating in that shape
needs a one-sentence rationale in the log.

**5. Execute.** Keep the main thread on synthesis, decisions, integration, and
direction. Push context-heavy reading and triage outward. Refresh `state.md`
after every decision, subagent result, verification gate, and integration.

**6. Review.** Architecture fit for new boundaries and contracts; line-level
review for implementation. Fix must-fix findings now — do not convert them into
"later" notes. If a finding changes the plan, log it.

**7. Verify.** Run the smallest check that actually proves success, and show the
output.

**8. Close.** Integrate, then close per the gate below.

## Friction Is Evidence

Friction capture interrupts normal flow. When the user corrects direction, scope,
naming, or workmode; signals repetition ("I already said", "again", "not X but
Y"); uses strong frustration language about the output; or points out that the
process was skipped — stop the current lane, append a `friction` event **first**,
then respond with the failure class and the prevention point.

Also log it when: you retry a failing path without a new hypothesis, you follow
stale docs over the user's current words, you use the wrong repo or environment,
you claim done without evidence, or you make the user coordinate work you should
have owned.

The point is not emotional bookkeeping. It is finding the prevention point — the
skill, policy, or tool change that saves the user from saying it a third time.
Detail: `references/friction-taxonomy.md`.

## Loops

When a task would push the user into repeated follow-up — waiting on CI, re-running
review after fixes, checking whether a slice is mergeable, starting the next
stacked slice — design the loop and own it:

```text
Loop: <name>. Trigger: <event or cadence>. Action: <what you will do>.
Verify: <evidence>. Stop when: <completion or blocker>. Cap: <max iterations
or wall-clock>. Human checkpoint: <the one decision the user must make, or
"none until blocker">.
```

The cap is the safety net; the stop condition is the plan. Continue the loop
yourself while it is in scope and reversible. Ask only at real decision points:
scope change, irreversible side effect, ambiguous tradeoff, approval gate.

## Close Gate

Before any final answer, pause, handoff, or compaction — in any phase — audit
the log:

```bash
node <skill-dir>/scripts/audit-session-logs.mjs <session-dir>
```

Backfill what it reports: missing raw input, missing workmode, delegations that
only happened in chat, friction that never got logged, missing verification or
completion. A finding may stay open only with a one-line stated reason in the
final response.

Close only when success criteria are met or explicitly narrowed, delegated work
is reviewed, verification evidence exists, temporary artifacts are cleaned up or
filed, integration status is known, and remaining risk is named.

## Final Response Shape

- what was done
- where the artifacts are
- what was verified, with evidence
- what is intentionally out of scope or blocked
- one recommended copy-paste goal when the next move is a choice rather than
  immediate execution

Never paste the whole session log into the answer unless asked.

## Gotchas

- Scaffolding late loses the raw input. The user's original wording is the
  highest-signal artifact in the session and the first casualty of summarizing.
- A session with no `workmode` event integrates work the wrong way exactly once,
  and it is always expensive.
- `state.md` that is only refreshed at the end is decoration. Its whole job is
  being current *before* the context is lost.

## Adapting This Skill

- Rename it. "Leitstand" is a German control room; use whatever word the user
  will actually type.
- Cut `orchestrate` and the delegation section if the runtime has no subagents —
  keep the phases and the state file, which matter more.
- Cut the mode table down to what the user will use. `goal`, `state`, and
  `handover` earn their place fastest.
- The event list is a menu. Six event types used consistently beat twelve used
  occasionally.
- The scripts need Node 18+ and have no dependencies. Without Node, write the
  two files by hand from the shapes above — the discipline is the point, the
  scripts only remove the typing.
