# Mode: Orchestrate

Force a visible delegation checkpoint and act on it. Use at the start of broad
work, or mid-session when the main thread has quietly absorbed context-heavy
work it should have delegated.

Skip this file entirely if the runtime has no subagents — keep the phases and
`state.md`, which matter more.

## Checkpoint

State it in chat and log it as a `decision` or `subagent` event:

- session log path and whether `state.md` is current
- owned area and active workmode
- success criteria and stop condition
- delegate now, or one sentence why not
- per delegation: context transfer (fresh / bounded / full history), model tier,
  effort, and why that tier fits
- context budget: what stays in the main thread, what moves out, what gets
  externalized into `state.md`
- next checkpoint trigger: worker result, commit, verification gate, or blocker

Delegation is the default when the work has independent slices, three or more
components, broad reading, separate review passes, or context-compaction risk.
Not delegating in that shape needs a logged one-sentence rationale.

## Good Worker Jobs

- read-heavy exploration and independent research strands
- focused implementation slices with clear file ownership
- correctness, security, test-gap, or architecture review passes
- log, test, and build triage
- before/after evidence gathering
- scouting an alternate solution before a big decision

## Bad Worker Jobs

Tiny tasks, tightly sequential work, write-conflict-prone edits, anything
needing shared judgment at every step, and anything whose output would be harder
to review than doing it yourself.

A fresh worker still pays the runtime's base prompt, tool, and skill-catalog
cost. Delegate when isolation, parallelism, or avoided noise earns that startup
cost — not as ceremony. Combine adjacent read-only checks into one worker when
they share evidence and can return one summary.

## Spawning

1. One bounded job per worker: owned files, stop condition, output shape.
2. **Choose context before model.** Independent exploration, triage, and review
   get a fresh context. Pass bounded recent context only when those specific
   turns are required. Inherit full history only for a true continuation — never
   as an implicit default in a runtime that inherits by default.
3. Pick the cheapest model and effort that still satisfy the judgment, risk, and
   verification the job carries. Narrow, low-ambiguity, cheaply verifiable work
   goes to a cheap tier; critical-path synthesis and final judgment do not.
4. Writers get their own worktree or branch when the runtime exposes that;
   otherwise state the limitation and keep file ownership explicit. Read-only
   reviewers must inspect the exact target state — do not isolate a reviewer in
   a worktree whose base omits the changes under review.
5. **Verify before integrating.** Run your own smallest check of the delta's
   central claim. Reading the report is not review.
6. Workers never write to the session store. Only the main agent does.
7. Log context mode, model, effort, scope, and result as a `subagent` event.

Prompt shape:

```text
You own <scope>. Context: you are a <fresh|bounded|full-history> worker; use only <sources>.
Do not edit outside <owned area>. Goal: <outcome>. Success: <criteria>.
Verify with <command/check>. Stop when <condition>.
Return only: summary, files changed/read, verification result, blockers,
recommended next action, and a State Delta (decisions, files, evidence, blockers, next).
```

Never ask the user to write goals for the workers. Translating the session goal
into worker prompts is your job.

## Mid-Session Re-Focus

1. Read the log; list delegation candidates currently handled inline.
2. State the checkpoint in chat.
3. Spawn workers for those candidates.
4. Backfill `subagent` events for delegations that already ran unlogged.
