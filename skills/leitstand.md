# Skill Blueprint: Leitstand

Leitstand is the session orchestrator for substantial agent work.

Use it when the user brings a raw idea, a long dictation, a complex task, or a
workflow that spans planning, research, implementation, review, and verification.

The main idea: the agent coordinates the work for the user. The user should not
have to shuttle context between agents, rewrite goals, or manually track whether
reviews, follow-ups, and verification happened.

## Purpose

The agent acts as the main operator for the session:

- clarify the real objective
- preserve important raw input in the user's own words
- challenge weak plans once
- split work when useful
- coordinate subagents if the runtime supports them
- track decisions, blockers, friction, and verification
- verify before calling the work complete

The user should not have to manually coordinate multiple agents.

## Trigger Signals

Use this workflow for:

- "new session"
- "orchestrate this"
- "brainstorm and then implement"
- "make a goal for the next agent"
- long dictation or pasted strategy input
- work with multiple phases or components
- requests for a copy-pasteable goal for another agent

Do not use it for trivial commands or narrow one-shot fixes.

## Direct Modes

Mid-session duties drift. Expose small named modes so the user can re-focus one
duty without restarting intake:

| Mode | Job of the turn |
|------|-----------------|
| `goal` | regenerate the one copy-paste goal from current session state |
| `handover` | produce a self-contained brief for a new chat or parallel agent |
| `orchestrate` | force the delegation checkpoint and spawn subagents |
| `state` | refresh the compact current-state file |
| `log` | audit the session log and backfill missing events |
| `run` | pull the next runnable slice from state, execute, verify, repeat until blocked or empty |
| `resume` | re-enter an existing session from its decision state |

When the user invokes a mode explicitly, that mode is the entire job of the
turn. Do not fold it into other pending work and do not restart intake.

## Session Store

If the user's repo supports local task logs, create:

```text
tasks/leitstand/<YYYYMMDD-HHMM>-<short-topic>/
├── session.jsonl
└── state.md
```

If the repo should not store logs, keep the state in chat and say so.

`session.jsonl` is the audit trail. `state.md` is the compact current state for
resuming, delegating, or handing the session to another agent.

## Minimum Events

Use one JSON object per line when logging:

```json
{"type":"raw_input","phase":"intake","text":"full important input"}
{"type":"goal","phase":"intake","summary":"objective","success_criteria":["observable result"]}
{"type":"workmode","phase":"intake","mode":"solo-main","source":"AGENTS.md","integration":"verify -> commit -> merge main"}
{"type":"state_update","phase":"planning","summary":"state.md refreshed","path":"tasks/leitstand/.../state.md"}
{"type":"decision","phase":"planning","decision":"chosen path","rationale":"why"}
{"type":"delegation","phase":"execution","scope":"bounded subtask","owner":"subagent","result":"summary when done"}
{"type":"friction","phase":"execution","kind":"user-correction","trigger":"what happened","prevention":"how to avoid repeat"}
{"type":"blocker","phase":"execution","summary":"what blocks progress","next_step":"how to unblock"}
{"type":"verification","phase":"review","evidence":["commands or checks run"]}
{"type":"completion","phase":"final","summary":"done scope","remaining_risk":["known caveat"]}
```

Keep raw input only when it is useful and safe to store.

## Workmode Gate

Before substantial implementation, integration, or delegation, resolve how this
repo integrates work:

1. Read the repo's own agent instructions (`AGENTS.md` or equivalent).
2. Determine the integration mode — for example solo work merged to `main`
   frequently, versus branch/PR with CI and review.
3. Log the resolved mode and its source as a session event.
4. If no instructions exist, infer from strong cues, log the gap as friction,
   and continue.

Do not continue broad work while the mode is unresolved. This is what stops an
agent from opening a PR in a private solo repo, or merging straight to `main`
in a team one.

## Delegation

Delegation is the core behavior, not decoration.

Default toward delegation when the work includes:

- broad reading
- independent implementation slices
- log, test, or build triage
- review passes
- multiple components
- likely context-window pressure

Each delegated job needs:

- one owned scope
- a stop condition
- an expected output shape
- any files or commands it may use

The main agent reviews the result and integrates it into the session state.
Subagents do not lower the quality bar and do not replace final review.

## Friction Log

Friction is process evidence.

Log it when:

- the user corrects direction, scope, format, naming, or workmode
- the agent loops without a new hypothesis
- the agent asks the user to coordinate work the agent should own
- verification is skipped or overstated
- stale docs or old plans override current user input

A useful friction entry names the trigger, impact, and prevention point.

## Loop Design

Whenever a task would normally force the user into repeated follow-up — waiting
on CI, re-running review after fixes, checking whether a slice is mergeable,
starting the next stacked slice — the agent designs the loop instead of asking.

Each loop gets:

- a trigger (event or cadence)
- an action
- a verification
- a stop condition
- a hard cap (max iterations or wall-clock)
- one named human checkpoint

The cap is the safety net; the stop condition is the plan. Continue the loop
yourself when it is in scope and reversible. Ask the user only at real decision
points: scope change, irreversible side effect, ambiguous tradeoff, or an
explicit approval gate.

Loop prompt shape:

```text
Loop: <short name>. Trigger: <event or cadence>. Action: <what I will do>.
Verify: <evidence/check>. Stop when: <completion/blocker condition>.
Cap: <max iterations or wall-clock>. Human checkpoint: <the one decision the
user must make, or "none until blocker/approval gate">.
```

## Workflow

1. **Intake:** preserve raw input when useful, mirror the goal, define success.
2. **Challenge:** name one alternate angle or hidden tradeoff.
3. **Plan:** define owned scope, steps, delegation points, and verification.
4. **Delegate:** spawn bounded subagents where the runtime supports it.
5. **Execute:** keep the main thread on synthesis, decisions, and integration.
6. **Review:** inspect the result against the goal and quality bar.
7. **Verify:** run the smallest proof that actually demonstrates success.
8. **Close:** summarize outcome, evidence, exclusions, and next move.

## Copy-Paste Goal Shape

When the user needs a goal for another agent, produce one recommended goal, not
a menu of competing goals.

```text
Goal: <self-contained objective>

Context:
- <facts the next agent needs>

Success:
- <observable criteria>

Constraints:
- <boundaries>

Verification:
- <checks to run>
```

Optional extras should be additive stretch goals, not alternative base goals.

## Close Criteria

Do not close the session until:

- success criteria are met or explicitly narrowed
- delegated work is reviewed
- friction and blockers are logged when they occurred
- temporary artifacts are handled
- verification evidence exists
- remaining risk is named

## Close Gate

Before any final answer, pause, or handoff, audit the session log for gaps:
missing raw input, missing workmode, delegations that were never logged,
friction that only happened in chat, missing verification or completion events.

Backfill the gaps before finishing. A finding may stay open only with a
one-line stated reason in the final response. A small audit script over the
JSONL log makes this mechanical instead of a memory exercise.
