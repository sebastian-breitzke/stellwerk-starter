---
_organized: true
---
# Leitstand Friction Taxonomy

Use this reference when creating, reviewing, or mining `friction` events.

## Rule

Friction is useful only when it names the repeatable failure and the smallest
prevention point.

Do not write diary entries. Do not only record mood. Record what happened, what
expectation it violated, why it cost the user attention, and where the fix
belongs.

## Required Fields

Each `friction` event should include:

- `kind`: one stable taxonomy value.
- `trigger`: the concrete phrase, event, failed command, wrong file, or repeated
  behavior that exposed the friction.
- `violated_expectation`: the rule, preference, repo AX, workmode, or current
  decision the agent missed.
- `impact`: why this cost matters, especially user time, wrong-system work,
  stale context, or false confidence.
- `prevention_point`: one of `session`, `AX`, `doctor`, `reminder`, `skill`,
  `provider-overlay`, `code`, `docs`, `unknown`.
- `next_prevention`: the smallest useful next change.

`AX`, `doctor`, and `reminder` prevention points mean the owning repo should be
patched. Global Stellwerk defines the mechanism, not concrete product, customer,
company, or instance rules.

Optional fields:

- `evidence`: file path, command output summary, quote fragment, or log id.
- `recurrence`: `first`, `repeat`, or `systemic`.
- `candidate_rule`: compact rule text when the prevention point is `doctor` or
  `reminder`.

## Kinds

| Kind | Use When | Good Prevention |
|---|---|---|
| `stale-guidance` | Old specs, docs, plans, or generated notes override current O-Ton, AX, canon, or code. | Mark stale source, update AX/canon, or remove old instruction. |
| `wrong-system` | Agent uses local Docker, wrong server, wrong repo, wrong config store, wrong runtime, or wrong deployment target. | Repo-local AX environment boundary or doctor check. |
| `looping` | Agent repeats a failing command, search, deploy path, or hypothesis without learning. | Stop rule, blocker event, or debug invariant. |
| `missing-ax` | Workmode, deploy path, authority chain, or environment boundary is absent in repo guidance. | Owning repo AX patch. |
| `user-correction` | The user says "nein", "nicht X sondern Y", "eigentlich", names a location fix, or corrects format/scope. | Session adaptation now; persistent fix only if reusable. |
| `handoff-bounce` | Agent asks the user to shuttle work, open chats, coordinate subagents, poll reviews, or rerun loops that Leitstand should own. | Leitstand skill or loop design. |
| `context-bloat` | Main thread spends context on broad worker detail instead of synthesis, decisions, review, and integration. | Subagent delegation or narrower read pass. |
| `ui-pattern-repeat` | The user repeats a UX preference such as independent panes for list/detail layouts. | Repo-local reminder or UI review lens, not a doctor unless scriptable. |
| `workmode-mismatch` | Agent uses PR ceremony in solo-main work or pushes/merges incorrectly for team-pr work. | AX workmode or dev workflow skill. |
| `verification-miss` | Agent claims ready without proof, misses preview/deploy checks, or trusts generated copies as source. | Verification policy, skill gate, or doctor. |
| `overbuilt` | Agent creates specs, abstractions, compatibility layers, or ceremony for a small task. | Skill/work-mode guardrail. |
| `slop-output` | Output is generic, shallow, over-carded UI, implementation-mirroring tests, or text that looks generated rather than useful. | Review lens or reminder. |
| `doctor-candidate` | The friction is cheaply scriptable with compact output. | Doctor script. |
| `reminder-candidate` | The friction requires human judgment but should be named when trigger words appear. | Reminder catalog or review lens. |

## Doctor vs Reminder

Use a repo-local doctor script or command when a machine can cheaply find the
problem:

- hard-coded colors instead of design tokens
- stale localhost or Docker endpoint after a server migration
- forbidden imports or deprecated helpers
- missing required frontmatter
- invalid Page-Language or canonical structure

Use a repo-local reminder when the issue needs judgment:

- left-list/right-detail layouts need independent scroll panes
- modal overflow quality
- tests assert implementation instead of behavior
- UI feels card-grid or AI-generated
- a pattern is bad only in a specific product context

## Event Example

```json
{"ts":"2026-06-20T09:00:00+02:00","type":"friction","phase":"follow-up-fix","status":"active","kind":"context-bloat","trigger":"main agent in a Leitstand session read broad worker detail directly","violated_expectation":"main thread should preserve context for synthesis, decisions, review, and integration","impact":"orchestration context was spent on detail that a subagent could summarize","prevention_point":"skill","next_prevention":"Make subagent delegation the default for context-heavy exploration and verification."}
```
