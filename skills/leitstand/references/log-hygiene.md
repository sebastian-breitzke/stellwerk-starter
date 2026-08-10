# Mode: Log

Bring the active session's log up to standard — mid-session, or as the close
gate. Do not restart the workflow.

## Procedure

1. Locate the active session. If none exists, scaffold it now. Backdate nothing:
   use current timestamps and note the late scaffold.
2. Walk the session history and backfill what is missing:
   - `user_input_raw` for substantial input not yet stored — verbatim, never summarized
   - `goal` if the objective was never logged, or has changed
   - `workmode` if absent — this is the most common gap
   - `friction` for every correction or frustration moment that only happened in
     chat (check against `friction-taxonomy.md`)
   - `subagent` for delegations that ran unlogged
   - `decision` for direction choices visible only in chat
   - `state_update` when `state.md` exists but nothing records why it is current
3. Run the audit:

   ```bash
   node <skill-dir>/scripts/audit-session-logs.mjs <session-dir>
   ```

4. Fix every reported gap, re-run until clean, or explicitly accept a finding
   with a one-line reason.
5. Report: events appended, findings fixed, findings accepted.

## Notes

- Backfilled events get current timestamps plus a `note` field naming what they
  refer to. Do not fake historical timestamps.
- Integrating verified slices mid-session is normal and does not require a
  `completion` event. The audit reports a missing completion only when nothing
  is still open: no `subagent` still `running`, no unresolved `blocker`, and no
  work events after the last `integration`. Close finished workers with a `done`
  status and blockers with `resolved`, or the finding stays silent all session.
- Run this before `completion` on any session that has a log.
