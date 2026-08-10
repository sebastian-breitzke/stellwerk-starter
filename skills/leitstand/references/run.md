# Mode: Run

Execute the standing plan of the active session.

This mode exists so the goal prompt can be generic — every specific lives in the
session artifacts, not in the prompt:

```text
leitstand run <session-dir>
```

With no directory given, use the single active session. With several active,
ask which one instead of guessing.

## Preconditions

1. The session directory exists with `session.jsonl` and `state.md`. If not,
   this is intake, not run: scaffold, report, stop.
2. `state.md` has `## Next Slices` with at least one **runnable** slice —
   outcome plus done criterion plus verification. If the top slice has no done
   criterion, do not execute it: run the orchestration checkpoint to sharpen it,
   update `state.md`, then proceed.

## Loop, Per Slice

1. Pull the top runnable slice.
2. Run the orchestration checkpoint. This is a gate, not a suggestion: decide
   the delegation split before touching code. A short self-contained slice may
   run single-threaded — log the decision either way.
3. Execute under the session's workmode.
4. Verify with the slice's own stated verification. No evidence → not done; the
   slice stays in `Next Slices` with the blocker recorded.
5. Append the events: `decision`, `subagent`, `integration` as applicable.
6. Update `state.md`: move the slice out, record evidence, refresh blockers.
7. Take the next slice.

Slice boundaries are the reset points. With `state.md` fresh, a new session or
worker re-enters cheaply — prefer a deliberate reset there over riding one
session into auto-compaction.

## Stop Conditions

Stop and report. Never keep executing silently when:

- `## Next Slices` is empty → propose close, or a new planning pass.
- The top slice is blocked on the user → say exactly what you need.
- New evidence or a friction event invalidates the plan → re-plan, do not push
  through.
- Context risk before compaction → refresh `state.md`, then continue or hand over.
- A slice's verification failed twice → stop, log friction, escalate.

## Output Per Turn

Which slices ran, the evidence per slice, confirmation that `state.md` was
refreshed with its path, and what runs next or what blocks.
