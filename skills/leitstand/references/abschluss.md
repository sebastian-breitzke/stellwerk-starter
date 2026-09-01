# Mode: Abschluss

Close out the ACTIVE Leitstand session deliberately: verify the closing
checklist, offer a retro, surface next activities, then close the session or
hand it over. This mode runs against the active session; do not restart the
workflow.

Run it when the user invokes `abschluss` or `close`, when the stated success
criteria appear met, when `run` mode empties `## Next Slices`, or when
the user signals the session should end ("machen wir zu", "das war's",
"reicht für heute", "wrap up"). Mid-work is a valid entry: the exit is then a
handover, not a forced completion.

If no active session with a log exists, say so and stop. Scaffold via `log`
mode only when the chat carries substantial unpersisted work.

## 1. Abschluss-Checkliste

Verify every item yourself with commands and file evidence. Do not ask
the user anything that git, the repo, or AX can answer. Fix in-scope gaps
directly under the active workmode; surface only policy-gated decisions and
genuinely blocked items.

| Item | Check |
|---|---|
| Persistiert | Close gate from `log-hygiene.md` ran: audit clean or findings accepted with reason, O-Ton-Nachlese done, `state.md` current. |
| Committed | `git status --porcelain` clean in every touched worktree; no unfinished work only living in chat. |
| Merged | Workmode rule applied: `solo-main` has verified slices merged to local `main`; `team-pr` has branch/PR, CI, and review state named. |
| Pushed | Only per repo policy and workmode. When policy says no push or ask, report the sync state; do not push and do not nag. |
| Deployed | Only when the owning repo defines a deploy step: run it for the verified slice and verify the deployed target content, not just the exit code. |
| Aufgeräumt | Scratch files, temporary branches, abandoned experiments, and consumed worktrees are removed or intentionally filed. Name leftover worktrees as cleanup candidates; never remove the worktree the session is running in. |
| Verifiziert | Every success criterion has evidence; unverified claims are named as open, never laundered into done. |

Then fork:

- Everything green and no open work: continue with the retro offer toward
  close.
- Open work remains that this session will not finish: mid-session exit. Run
  `handover.md` for the open remainder — the checklist above still applies to
  everything already done — then continue with the retro offer. Do not force a
  `completion` event; the handover carries the open work.

## 2. Retro Offer

Ask exactly once, in the same message as the checklist report: short retro, or
close directly? Include the already-visible next activities in that same
message so even "close directly" happens on full information. Policy-gated
checklist decisions (for example push: ask) join this one message instead of
becoming separate questions.

After delivering the report, append a `decision` event with `status: "open"`
naming the pending retro answer. The wait for the user's answer is open work;
logging it keeps close-gate audits accurate instead of reporting a missing
`completion` on a deliberately open session.

## 3. Retro (When Accepted)

Mine the session log; do not free-associate:

- Every `friction` event yields the smallest prevention and one follow-up
  activity candidate, using the `friction-taxonomy.md` prevention points
  (`AX`, `doctor`, `reminder`, `skill`, `provider-overlay`, `code`, `docs`).
- `delight` events, loops, and delegations that worked get one line each.
- Corrections visible only in chat are backfilled as `friction` first
  (log-hygiene), then mined.

Persist one `retro` event:

```json
{"ts":"2026-06-19T18:00:00+02:00","type":"retro","phase":"close","went_well":["subagent split kept main context small"],"dragged":["deploy target verified late"],"followups":[{"activity":"add deploy-verify doctor to owning repo","prevention_point":"doctor","target":"<owning repo>","source":"friction:verification-miss"}]}
```

Follow-up activities are candidates, not new scope. Do not execute prevention
changes inside the Abschluss; they go onto the next-activities list.

## 4. Next Activities

Collect what is already visible from: retro follow-ups, explicit exclusions
and de-scoped leftovers, remaining `## Next Slices`, blockers that revealed
work, `agent_insight` events, and observations made during the session.

Present a compact ranked list, normally at most seven entries, one line each:

```text
<activity> — <where it lives: direct fix | new Leitstand | AX/doctor/reminder patch in <repo>> — <source>
```

The user reacts to this list; picking none is a valid reaction. When the
recommended top pick is a real choice rather than immediate execution, offer
one copy-paste goal for it per `goal.md`. Do not generate goals for every
item.

## 5. Close

Close only when:

- the stated success criteria are met, or the open remainder is handed over,
- verification evidence exists,
- temporary artifacts are cleaned up or intentionally filed,
- subagent work has been reviewed,
- `state.md` reflects the final state, or the handover references it,
- integration status is known,
- explicit exclusions are logged.

Then append the `completion` event (final scope, exclusions, verification
evidence, remaining risk), refresh `state.md` — phase `complete`, or the
handover pointer for a mid-session exit — and append the `state_update` event.

Final message: checklist result with evidence, retro outcome or "declined",
the next-activities list, and the explicit statement that the session is
closed or handed over.
