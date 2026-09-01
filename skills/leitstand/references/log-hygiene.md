# Mode: Log Hygiene

Bring the ACTIVE session's Leitstand log up to standard, mid-session or before
close. Do not restart the Leitstand workflow.

## Procedure

1. Locate the active log under `leitstand/`. If none exists for this
   session, scaffold it now with `scripts/leitstand-scaffold.mjs` and backdate
   nothing — use current timestamps and note the late scaffold.
2. Walk the session history and backfill missing events:
   - `user_input_raw` for any substantial O-Ton not yet stored (verbatim,
     never summarized)
   - `goal` if the objective was never logged or has changed
   - `workmode` if absent (read repo AX; this is the most common gap)
   - `friction` for every correction/frustration moment that has no event —
     check against `references/friction-taxonomy.md`
   - `subagent` for delegations that ran unlogged
   - `state_update` when `state.md` exists but no update event records why it is current
   - `decision` for direction choices only visible in chat
   - `state.md` for context-risk sessions before compaction, resume, handover, or close
3. Run the audit on the active session directory:

   ```bash
   node <skill-base>/scripts/audit-leitstand-logs.mjs <path-to-session-dir>
   ```

4. Fix every reported gap that applies, then re-run until clean or every
   remaining finding is explicitly accepted with a one-line reason.
5. **O-Ton-Nachlese** (close gate only, before a `completion` event): read every
   `user_input_raw` event and hold it against the logged decisions. Report
   three things: ideas that were dictated but never
   decided or built (verlorene Ideen), contradictions between dictations over
   time, and intent that drifted between raw input and outcome. Log real
   findings as `decision` or `blocker`, or hand them to the user as an explicit
   list. Raw input is the user's design intent — losing it silently is the
   failure this step exists to prevent.
6. Report in chat: events appended, findings fixed, findings accepted,
   Nachlese findings when the close gate ran.

## Notes

- Backfilled events get current timestamps plus a `note` field naming what they
  refer to. Do not fake historical timestamps.
- `subagent_review` and `goal_proposal` are accepted legacy aliases in old logs;
  do not write them in new events.
- Integrating verified slices mid-session is normal and does not demand a
  `completion` event. The audit reports a missing completion only when the
  session carries no open work: no `subagent` still `running`, no unresolved
  `blocker`, and no `decision`/`subagent`/`state_update`/`loop_design` after the
  last `integration`. Close open subagents with a `done` event and blockers with
  a `resolved` event, otherwise the finding stays silent for the whole session.
- This mode is also the close gate: run it before `completion` on any session
  with an active log.
