# Phase Reference: Execution And Loops

Read this when entering Phase 4 (Implementation Or Research) or Phase 5 (Loop
Design) of the full workflow, and when `run` mode executes slices. It carries
the execution duties and loop mechanics; the orchestration checkpoint itself
lives in `orchestrate.md`.

## Execution Duties

Do:

- Create a concrete checklist with verification criteria.
- Before implementing a slice that changes the structural shape of a module, public interface, shared state, or workflow boundary, run `dev-review` in Pre-Implementation mode and log the chosen target shape as a `decision`. Skip this gate only when the slice leaves those boundaries and contracts unchanged and mechanically applies an established local pattern.
- For a slice subject to this gate that crosses an interface or boundary, its verification must name the affected surfaces, the key safety assumption and supporting evidence, and one concrete no-regression check. If the assumption or check lacks evidence, keep the slice open and record what remains unverified.
- Apply the active Workmode. In `solo-main`, integrate verified chunks to `main`
  frequently. In `team-pr`, run the PR/CI/review loop.
- Protect the main thread's context budget. Keep the main agent focused on synthesis, decisions, review, integration, and user-facing direction.
- Delegate context-heavy exploration, broad file reading, log/test triage, independent implementation slices, and review passes to native subagents when the runtime supports them.
- Before doing substantial read-heavy work directly, decide whether a subagent can own it with a bounded prompt. If yes, delegate. If no, keep the direct pass narrow and say why.
- After each decision, subagent result, verification gate, integration, context-risk handoff, or before compaction, refresh `state.md` and append a `state_update` event.
- Use tools to discover missing local context instead of asking for hand-holding.
- Keep one current implementation path. Do not create compatibility layers or fallback architecture unless explicitly requested.
- Commit coherent, verified slices when the repository workflow calls for commits.
- Treat "nice-to-have" leftovers as unfinished work unless the user explicitly de-scopes them.

No hidden paint patches behind the sofa: scratch experiments, temporary files, partial refactors, abandoned branches, and test scaffolding must either be removed, integrated cleanly, or explicitly logged as out of scope before completion.

## Loop Design

When a task would normally require the user to run repeated follow-up steps, design the loop and own it inside the Leitstand-Session.

Look for manual loops such as:

- waiting for review comments, CI, logs, or monitor output
- copy-pasting feedback between agents
- re-running review after fixes
- checking whether a PR or slice is ready to merge
- starting the next stacked implementation slice after integration
- repeating status, blocker, or readiness checks

Do:

- Name the loop briefly: trigger, action, verification, stop condition, and human checkpoint.
- Give every loop a hard cap (max iterations or wall-clock) alongside the semantic stop condition; the cap is the safety net, not the plan.
- Keep the loop specific to the current task; do not invent a generic framework.
- Use native tools, subagents, worktrees, timers, or thread primitives when the runtime exposes them.
- Continue the loop yourself when it is in scope and reversible.
- Ask the user only at real decision points: scope change, irreversible/external side effect, ambiguous tradeoff, or explicit approval gate.
- Log meaningful loops as `loop_design`, and log each completed iteration only when it changes state, reveals a blocker, or produces an integration/review decision.

Avoid:

- asking the user to shuttle review comments, status, or subagent outputs by hand
- spinning up a new Leitstand when a loop belongs inside the current one
- letting an unbounded loop run without a stop condition or human checkpoint

Loop prompt shape:

```text
Loop: <short name>. Trigger: <event or cadence>. Action: <what I will do>. Verify: <evidence/check>. Stop when: <completion/blocker condition>. Cap: <max iterations or wall-clock>. Human checkpoint: <only the decision the user must make, or "none until blocker/approval gate">.
```
