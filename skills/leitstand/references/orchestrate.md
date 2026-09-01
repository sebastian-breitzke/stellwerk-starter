# Mode: Orchestrate

Force a visible orchestration checkpoint for the ACTIVE session and act on it.
Use at the start of broad work, or mid-session via `/leitstand orchestrate`
when delegation has drifted and the main thread is absorbing context-heavy work
itself. Do not restart the Leitstand workflow.

## Checkpoint

Run and log it as a `decision`, `loop_design`, or `subagent` event:

- active Leitstand log path
- active `state.md` path and whether it is current
- owned area and current workmode
- success criteria and stop condition
- subagent decision: delegate now, or one sentence why not
- routing decision for every delegation: context transfer, model, effort, and why that tier fits
- context-budget decision: what stays in the main thread, what moves to a worker,
  and what must be externalized into `state.md`
- main-thread critical path
- next checkpoint trigger: subagent result, commit, verification gate, context
  risk, or blocker

Delegation is the default when the goal contains waves, file ownership slices,
3+ components, broad reading, independent review passes, or likely
context-compression risk. Not delegating in that shape requires a one-sentence
rationale in the Leitstand log.

## Good Subagent Jobs

- read-heavy exploration; independent research strands
- focused implementation slices with clear ownership
- security, correctness, test-gap, or architecture review
- log/test/build triage
- PR/comment/CI monitoring loops
- before/after verification evidence gathering
- alternate-solution scouting before a major decision

Avoid subagents when the task is tiny, highly sequential, write-conflict-prone,
requires immediate shared judgment on every step, or is faster to handle
directly. Do not spawn subagents as ceremony; spawn them to preserve
main-thread context and improve throughput.

A fresh worker still pays the runtime's base prompt, tool, and skill-catalog
cost. Delegate only when isolation, parallelism, or avoided noisy context earns
that startup cost. Combine adjacent read-only checks into one bounded worker
when they use the same evidence and can return one compact summary.

Rule of thumb: if the main agent would need to read many files, logs, search
results, review comments, or test outputs — or the work can return as a compact
evidence summary plus changed files — delegate. If a subagent's output would be
harder to review than doing the work directly, keep it local and narrow.

## Spawning

1. Give each agent one bounded job, owned files/area, stop condition, and
   output shape.
2. Choose context before model:
   - independent exploration, triage, tests, and review use fresh/clean context
   - pass bounded recent context only when those turns are directly required
   - inherit full history only for a true continuation, never as an implicit default
   - use the active provider overlay's native mechanism; do not rely on an
     omitted runtime default
3. Select the cheapest model and effort that satisfy scope, judgment, risk, and
   verification. Lower-cost workers must be narrow, low-ambiguity, and cheaply
   verifiable; keep critical-path synthesis and final judgment on the active
   provider's capability-first tier.
4. Require a dedicated worktree for writing subagents whenever the runtime
   exposes that control; otherwise state the limitation and keep file ownership
   explicit. Read-only reviewers must inspect the exact target diff/state. Do
   not isolate them in a worktree created from a base that omits the changes.
5. Ask subagents to return: summary, files changed/read, verification result,
   blockers, recommended next action, and a compact `State Delta`.
6. Verify before integrating: run your own smallest check of the delta's core
   claim (a test, a file read, a command) — reading the report alone is not
   review. Subagents never write to `leitstand/` themselves; only the
   main agent writes the store.
7. Fix small issues directly or send targeted follow-up instructions.
8. Log context mode, model, effort, delegation, and result as `subagent`; append `state_update` when the
   delta changes current state.
9. After a result has been consumed and no follow-up is planned, release the
   completed worker's runtime slot. A completed worker is not reusable capacity
   merely because its result was returned.

## Worker Slot Lifecycle

Treat native subagent capacity as finite runtime state.

- Keep a completed worker available only while a concrete follow-up is planned.
- Once its result has been reviewed and integrated, release that worker and any
  completed descendants whose results have also been consumed.
- Before starting a new spawn wave, release all consumed completed workers and
  descendants from earlier waves.
- Never release a running worker, a worker whose result has not been consumed,
  or a worker with a named follow-up still pending.

Provider overlays define the runtime-specific release tool. The shared
Leitstand contract names the lifecycle requirement, not one provider's command.

Do not ask the user to set goals for subagents. The main agent translates the
current session goal into subagent prompts and keeps those agents on course.

Subagent prompt shape:

```text
You own <scope>. Context: this is a <fresh|bounded|full-history> worker; use only <sources>. Work in your own worktree/branch if the runtime exposes that control; otherwise state that limitation before editing. Do not edit outside <owned area>. Goal: <outcome>. Success: <criteria>. Verify with <command/check>. Stop when <condition>. Return only: summary, files changed/read, verification result, blockers, recommended next action, State Delta (decisions, files read/changed, evidence, blockers, next).
```

## Mid-Session Re-Focus

When invoked as a direct mode on a running session:

1. Read the active log; list delegation candidates currently handled inline.
2. State the checkpoint (above) in chat.
3. Release consumed completed workers and descendants from prior waves.
4. Spawn the subagents that should own the candidates.
5. Backfill missing `subagent` events for delegations already done but unlogged.
