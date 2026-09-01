# Mode: Run

Execute the standing plan of the ACTIVE Leitstand session. This mode exists so
the goal can be generic — "fahre den Leitstand-Plan durch" — because every
specific lives in the session artifacts, not in the prompt.

Standing goal (copy-paste, identical for every session):

```text
/leitstand run leitstand/<session-dir>
```

(`$leitstand run …` in Codex.) When no session dir is given, use the single
active session; if several are active, ask which one instead of guessing.

## Preconditions

1. The session dir exists with `leitstand.jsonl` and `state.md`. If not,
   scaffold via `log` mode, then split: cold work — nothing executed yet, no
   plan to reconstruct — is intake, so report and stop. Work already in flight
   with a clearly scoped remainder is not: write the remainder into
   `## Next Slices` with its verification, note the late scaffold, and continue
   the loop.
2. `state.md` has a `## Next Slices` section with at least one runnable slice.
   Runnable = outcome + done criterion + verification. If the top slice lacks a
   done criterion, do not execute it — run the orchestration checkpoint
   (`references/orchestrate.md`) to sharpen it, update `state.md`, then proceed.
3. Legacy `state.md` without `## Next Slices` (old `## Next Checkpoint` shape):
   run `state` mode first to upgrade the artifact, then continue.

## Loop — per slice

1. Pull the top runnable slice from `## Next Slices`.
2. Orchestration checkpoint (`references/orchestrate.md`) — a gate, not a
   suggestion: decide the delegation split before touching code. Broad reading,
   independent implementation slices, review passes, and evidence gathering run
   as subagents; the main context stays the decision maker and integrator.
   A short self-contained slice may run single-threaded — log the decision
   either way (`subagent` or `decision` event).
3. Execute the slice under the session workmode (worktree discipline,
   `dev-implement`/`dev-discipline` gates apply unchanged; execution duties:
   `references/execution.md`).
4. Verify with the slice's stated verification. No evidence → not done; the
   slice stays in `Next Slices` with the blocker recorded.
5. Append the events to `leitstand.jsonl` (`decision`, `subagent`,
   `integration` as applicable; verification evidence lands in `integration`).
6. Update `state.md`: move the slice out of `Next Slices`, record evidence,
   refresh blockers and workstreams.
7. Take the next slice. Slice boundaries are the reset points: with `state.md`
   fresh, a new session or subagent re-enters cheaply — prefer a deliberate
   reset there over riding one session into auto-compaction.

## Stop Conditions

Stop the loop and report — never keep executing silently — when:

- `## Next Slices` is empty → run the Abschluss procedure
  (`references/abschluss.md`) or propose a new planning pass.
- The top slice is blocked on the user → state exactly what is needed.
- A friction event or new evidence invalidates the plan → Friction Interrupt
  applies; re-plan instead of pushing through.
- Context risk before compaction → refresh `state.md` (`state` mode), then
  continue or hand over.
- A slice's verification failed twice → stop, log the friction event, escalate.

## Output

Per run turn: which slices were executed, the evidence per slice, confirmation
that `state.md` was refreshed (path), and what runs next or what blocks.
