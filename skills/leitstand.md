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
{"type":"state_update","phase":"planning","summary":"state.md refreshed","path":"tasks/leitstand/.../state.md"}
{"type":"decision","phase":"planning","decision":"chosen path","rationale":"why"}
{"type":"delegation","phase":"execution","scope":"bounded subtask","owner":"subagent","result":"summary when done"}
{"type":"friction","phase":"execution","kind":"user-correction","trigger":"what happened","prevention":"how to avoid repeat"}
{"type":"blocker","phase":"execution","summary":"what blocks progress","next_step":"how to unblock"}
{"type":"verification","phase":"review","evidence":["commands or checks run"]}
{"type":"completion","phase":"final","summary":"done scope","remaining_risk":["known caveat"]}
```

Keep raw input only when it is useful and safe to store.

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
