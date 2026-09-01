---
name: leitstand
description: Orchestrate meaningful changes through durable Leitstand sessions with raw-input logs, state, subagents, reviews, and integration. Use `start` for a fresh feature or architecture session that begins with planning and stops before implementation. Also use automatically when the user says Leitstand/Orchestrator/Agent of Agents, provides substantial context or a long dictation, requests delivery with dependent steps, multiple components, regression-relevant behavior or contracts, architecture decisions, non-trivial verification, coordination, repeated follow-up, or a handoff, or wants to close out or wrap up a running session (Abschluss/Retro). Direct modes handover, goal, orchestrate, state, log, run, abschluss. Not for trivial questions, confirmations, narrow read-only lookups, or one-step reversible edits; ordinary planning without delivery ownership goes to dev-challenge.
argument-hint: "[start <objective>|handover|goal|orchestrate|state|log|run|abschluss|resume|<objective>]"
_organized: true
---

# Leitstand

## Purpose

Act as the main agent for a Leitstand-Session: clarify the real goal, preserve the user's raw input, challenge the plan, orchestrate native subagents where useful, integrate verified slices quickly, and close only when the work is production-ready or explicitly narrowed.

The main agent owns the whole thread. The user gives direction and corrections;
the main agent owns orchestration and execution follow-through inside the
Leitstand session. Subagents produce inputs; they do not need their own
Leitstand goals, do not lower the quality bar, and do not replace review.

Do not push coordination back to the user. Recommend a new chat only when the work is outside the current Leitstand-Session and genuinely needs a separate Leitstand with its own goal, log, and integration path. For work inside the current session, continue orchestrating it yourself or spawn native subagents with bounded prompts.

## Session Start

When the invocation argument starts with `start`, treat it as an explicit
request to begin a durable feature- or architecture-design session. `start` is
not a Direct Mode: Direct Modes operate on an active session, while `start`
establishes the session that later modes use.

Use this contract:

1. Require a concrete feature, problem, or outcome after `start`. If it is
   missing, ask for that one brief and stop.
2. Treat `start` as new-session intent. If the active session already owns the
   same objective, continue it in planning instead of creating a duplicate. If
   the objective is materially different, create or select its own session.
3. Preserve the complete input as `user_input_raw`, scaffold the session,
   resolve the workmode, and refresh `state.md` before broad synthesis.
4. Run Intake and Brainstorming first. Activate `dev-challenge` as the planning
   owner while Leitstand retains the durable goal, decisions, state, and next
   checkpoint.
5. For user interviews or decision-tree clarification, use `dev-challenge`'s
   frontier grilling exactly: ask every currently decidable question in one
   round, include a recommended answer, fetch discoverable facts instead of
   asking the user, and preserve substantial answers as raw input.
6. Produce a recommended target shape, explicit trade-offs, open decisions,
   and the verification direction. When the target shape changes a structural
   boundary, run `dev-review` in Pre-Implementation mode and log the accepted
   shape as a `decision`.
7. Stop before implementation. Do not modify product or runtime code during
   `start`; read-only discovery needed to answer factual planning questions is
   allowed. End at a human checkpoint and name `leitstand run` as the next
   transition after the direction is accepted.

Do not create another phase model, interview mechanic, plan artifact, or
implementation workflow for `start`.

## Direct Modes

When the invocation argument starts with one of these keywords, run ONLY that
mode against the active session. Read only the named reference (plus any
reference it explicitly names), execute its procedure, and return to normal
flow. Do not restart intake, do not re-mirror,
do not create a new Leitstand log if one exists for this session.

| Argument | Mode | Reference |
|----------|------|-----------|
| `handover` | Produce a self-contained handover artifact (Auftrag / Quellen / Ziel-Basis) for a new chat, Codex session, or parallel agent | `references/handover.md` |
| `goal` | Regenerate the one copy-paste goal from the current session state | `references/goal.md` |
| `orchestrate` | Force the orchestration checkpoint: delegation decision, spawn subagents, backfill `subagent` events | `references/orchestrate.md` |
| `state` | Refresh the compact current-state artifact used for Codex resume, compaction, and worker fan-out | `references/state.md` |
| `log` | Log hygiene: scaffold if missing, backfill missing events, run the audit, fix gaps | `references/log-hygiene.md` |
| `run` | Execute the standing plan: pull the next runnable slice from `state.md`, orchestrate, verify, log, repeat until blocked or empty | `references/run.md` |
| `abschluss` (also `close`) | Close out the session: verify the Abschluss-Checkliste (persistiert/committed/merged/pushed/deployed/aufgeräumt/verifiziert), offer a retro, surface next activities, then close or hand over mid-work | `references/abschluss.md` |
| `resume` | Re-enter an existing session and continue from its decision state | (procedure below) |

`resume` procedure:

1. Read the active session's log (`leitstand.jsonl` and `state.md` when present).
2. Reconstruct the decision state: open goals, last checkpoint, pending verification; append the missing `workmode` event if absent.
3. Continue from the last decision point and state what was resumed.

Anything else (an objective, a dictation, or no argument) starts or continues
the full workflow below. These modes exist because mid-session duties drift:
when the user invokes one explicitly, that feature is the entire job of the
turn — do not fold it into other pending work.

## Trigger Discipline

Start this workflow when the user gives substantial context or a long dictation; explicitly says `Leitstand`, `Orchestrator`, `Agent of Agents`, or `neue Leitstand-Session`; or requests a meaningful change that needs durable decisions, multiple dependent steps, several components, regression-relevant behavior or contract changes, non-trivial verification, coordination, repeated follow-up, or a handoff.

A handed-over work package triggers this workflow on its own: an order zip, a `PROMPT.md` or another agent's task prompt, a bundle with reference material. Start the session while reading the package in and persist its brief one-to-one as raw input before working it, not retroactively at closeout. A brief that reads like a ready-to-execute spec is still a handoff, not a slice.

Do not start it merely for `brainstorm`, `review`, `Ziel`, or ordinary planning language. `dev-challenge` owns planning unless the work also crosses the meaningful-change threshold. Explicit `start` overrides this negative trigger and creates or resumes the durable planning session described above.

Do not restart the workflow for small confirmations such as "ja", "weiter", "Option A", "passt", or "mach so". Treat those as phase movement inside the current Leitstand-Session.

If the user switches topics materially, create or select a new Leitstand log
before continuing. Do not treat implementation slices, research branches,
reviews, or subagent jobs inside the active objective as new Leitstand-Sessions.

## Friction Interrupt And Capture

Friction capture is not an optional reflection step. It interrupts normal flow.

When the user expresses frustration, corrects direction/scope/workmode, asks why the
Leitstand flow was not followed, or points out repeated agent failure, the next action is:

1. Stop the current execution lane.
2. Create or select the active Leitstand log.
3. Persist the friction as a local `friction` event before analysis, defense,
   further implementation, or a new plan.
4. Then respond with the captured failure class and the next prevention point.

Do not wait until final closeout. Do not only say that friction should be logged. If the log
cannot be written, state the exact blocker and include the complete JSONL event in the response
so it can be persisted later.

This interrupt also fires when the failure is inside this skill itself. In that case set
`prevention_point` to `skill` unless a more concrete `doctor`, `reminder`, `AX`, or
`provider-overlay` fix is clear.

Friction is first-class evidence; the point is not emotional logging but the
prevention point that saves the user time next time. Capture it when the user
corrects direction, location, format, workmode, naming, or scope; signals
repetition ("again", "zum x-ten Mal", "immer wieder", "nicht X sondern Y",
"eigentlich"); or uses strong quality/frustration language ("slop", "hässlich",
"kaputt", "geht auch nicht", "funktioniert nicht", "zum Kotzen") about agent
output, UI, process, or product quality. Capture it equally when the agent
retries a failing path without a new hypothesis, follows stale specs or docs
over current O-Ton/state/AX/code, works in the wrong system or repo, makes
the user do coordination work, claims done without evidence, or repeats a
UI/test/review anti-pattern. Kinds, required fields, and prevention points:
`references/friction-taxonomy.md`.

## Leitstand Store

For every Leitstand-Session, create a folder in the current worktree:

```text
leitstand/<YYYYMMDD-HHMMSS>-<short-slug>/
├── leitstand.jsonl
├── state.md
└── handover.md (when a handover was produced)
```

`<skill-base>` = the directory containing this SKILL.md in the active deployment.

Create it with the scaffold script in one call — it writes the folder, initial
`state.md`, initial `user_input_raw`, `goal`, `workmode`, and
`state_update` events, then prints the session directory:

```bash
printf '%s' "<full unedited O-Ton>" | node <skill-base>/scripts/leitstand-scaffold.mjs \
  --slug <short-slug> --goal "<one-sentence goal>" --mode <solo-main|team-pr> --mode-source <AX.md|inferred>
```

Scaffold at intake before heavy synthesis. If the workmode is not yet known,
scaffold without `--mode` and append the `workmode` event as soon as it is
resolved. Use the local timezone. Keep the slug short, lowercase, and
descriptive.

Append JSONL events as the work progresses. Each line must be one complete JSON object. Never replace the raw-input event with a summary.

Create and refresh `state.md` as the compact working memory for the active
session. The JSONL log is the audit trail; `state.md` is the current operating
state that a fresh Codex thread, resumed session, or worker can read first
without replaying the whole chat. Read `references/state.md` for the contract.

Minimum event fields:

```json
{"ts":"2026-06-19T08:00:00+02:00","type":"user_input_raw","phase":"intake","source":"chat","text":"full unedited input"}
{"ts":"2026-06-19T08:05:00+02:00","type":"goal","phase":"intake","status":"proposed","summary":"one-sentence goal","success_criteria":["observable outcome"]}
{"ts":"2026-06-19T08:07:00+02:00","type":"workmode","phase":"intake","mode":"solo-main","source":"AX.md","integration":"worktree -> verify -> commit -> merge main"}
{"ts":"2026-06-19T08:10:00+02:00","type":"decision","phase":"implementation","status":"active","decision":"what was decided","rationale":"why"}
```

Use these event types when they occur:

- `user_input_raw`: long original input, pasted text, or substantial new impulse, stored one-to-one.
- `goal`: current objective, proposed or confirmed.
- `workmode`: active repo workflow such as `solo-main` or `team-pr`, source, and integration expectations.
- `decision`: chosen direction, including reversals with `status: "revised"` and `supersedes`.
- `agent_insight`: non-obvious finding from exploration, research, or implementation.
- `blocker`: real obstacle, repeated friction, missing access, conflict, or unclear policy.
- `friction`: structured frustration event, correction pattern, or avoidable process drag.
- `delight`: explicit positive signal from the user worth preserving for future calibration.
- `loop_design`: manual follow-up loop identified, automation boundary, trigger, stop condition, hard cap, and human checkpoint.
- `subagent`: delegated work scope, worktree/branch when known, result, and review status.
- `state_update`: `state.md` was created or refreshed, including path, reason, and the facts changed.
- `integration`: merge, commit, verification, and remote-sync outcome.
- `retro`: close-phase retrospective: what worked, what dragged, and follow-up activity candidates derived from friction and delight evidence.
- `completion`: final scope, exclusions, verification evidence, and remaining risk.

For long dictations, write the `user_input_raw` event before doing heavy
synthesis. Then mirror the input in chat.

## Store Location And Migration

`leitstand/` at the repository root is the only canonical session store. Before
scaffolding, resuming, auditing, or handing over a session:

1. Use `leitstand/` when it exists or when no store exists yet.
2. If `tasks/leitstand/` exists, or sessions are found under another root, stop
   before creating a second store. Name the existing location and offer this
   exact tracked migration:

   ```bash
   git mv <old-session-root> leitstand
   ```

3. Run the log audit after the move and update any repo-local references in the
   same slice. Do not silently copy, merge, or leave two live session roots.

An untracked session can be moved into `leitstand/` before it is first added;
use `git mv` for every tracked migration.

For adherence reviews, run `node <skill-base>/scripts/audit-leitstand-logs.mjs <session-dir>` first. Treat
missing raw input, missing workmode, integration without completion while no work is open, raw friction signals without
`friction`, stale active sessions (no events for a day while the repo moved on),
context-risk sessions without `state.md`, `state_update` events without a state file,
and high-scope sessions without subagents or loop design as findings to inspect.

## Authority Chain

Use this order when instructions conflict:

1. The user's current O-Ton in the active thread or `user_input_raw`.
2. Current Leitstand decision state.
3. Current canonical docs and repo-local AX.
4. Current implementation code.
5. Old specs, old plans, and stale generated docs have no authority unless the
   current AX or Leitstand state explicitly reactivates them.

Do not create new specs for ordinary work. Long-running work belongs in
Leitstand; small implementation work belongs in `dev-implement`; normative
product truth belongs in current canonical docs and repo-local AX.

## Workmode Resolution

Hard gate before substantial implementation, integration, review loops, or subagent
orchestration:

1. Read the repo-local `AX.md`, `AGENTS.md`, or equivalent instructions.
2. Locate the required `Workmode` section.
3. Log a `workmode` event with mode, source, and integration rule.
4. If no Workmode exists, infer only from strong cues and log `friction` with
   `kind: "missing-ax"` instead of blocking normal progress.

Do not continue broad work while the active Leitstand log lacks a `workmode` event. For a resumed
or inherited session, append the missing `workmode` event before the next implementation,
integration, review, or delegation step.

Default inference:

- company repo, PR, CI, or GitHub review -> `team-pr`
- user-owned private repo -> `solo-main`

`solo-main` means worktrees are fine, but verified slices should be committed
and merged to `main` frequently. Normal conflicts are the agent's job. Escalate
only direction conflicts, data-loss risk, external side effects, or user-authored
dirty work in the owned area. Escalating a blocker that sits in another active
owner's area means appending it to that session's `state.md` under
`## Open Risks / Blockers` with evidence and fix direction — append, never
rewrite their state — and then watching that lane yourself. A task chip or a
question to the user is not escalation but the coordination handback this skill
forbids.

`team-pr` means branch/PR, CI/review polling, review triage, valid-comment fixes,
and merge only when the user asks or repo policy explicitly allows it.

Do not expose `solo-main-loop` or `pr-review-loop` as separate user-facing flows.
They are internal Leitstand workmode implementations.

## Phase Model

Phases are a state machine, not a waterfall. Move forward, back, or sideways when the conversation demands it.

### 1. Intake And Mirror

When the user gives a long or substantial input:

1. Store the raw input in the Leitstand log.
2. Create or refresh `state.md` with the goal, current phase, authority
   sources, and next checkpoint.
3. Mirror the understood intent concisely.
4. Define the proposed goal and success criteria.
5. Name the current phase.
6. Ask for confirmation only when the next move materially changes outcome, commits to implementation, or creates external side effects.

Good mirror shape:

```text
Verstanden: Ziel ist <goal>. Erfolg heißt <criteria>. Ich sehe gerade <phase>. Mein Vorschlag: <next move>. Soll ich das so umsetzen?
```

Skip the mirror for small acknowledgements, option selections, or "continue" messages.

### 2. Brainstorming And Challenge

Use this phase to open the decision space before implementation.

Do:

- Extract implicit assumptions and domain language from the user's input.
- For interview-style clarification, run the frontier grilling mechanic from the deployed `dev-challenge` skill's `references/grilling.md`: whole frontier per round, recommendations included, facts fetched instead of asked.
- Apply the available challenge skill or pattern. Challenge the local minimum once: different angle, unspoken tradeoff, naive question.
- Keep the challenge short and useful; do not turn it into an endless questionnaire.
- Log decisions once a direction is chosen.

Exit when the next implementation or research move is clear enough to execute.

### 3. Copy-Paste Goal

Provide one recommended copy-pasteable goal prompt when the user needs to set
or update the current main agent's own goal, when a handover closes, or when
the recommended next move truly belongs in a separate Leitstand-Session.

Read `references/goal.md` and follow its rules, shape, and runtime recommendation
exactly. Core invariants: exactly one self-contained base goal, target named
(current main agent vs. new Leitstand-Session), effort recommendation for the
relevant runtimes, optional scope only as additive stretch goals, and never
hand orchestration back to the user for work that belongs in this session.

### 4. Implementation Or Research

Own the execution path. Read `references/execution.md` and apply its execution
duties: context-budget protection, delegation-first reading, integration
cadence, `state.md` refresh points, one current implementation path, and the
no-hidden-paint-patches cleanup rule.

Before broad implementation or research, run the visible orchestration
checkpoint from `references/orchestrate.md`, refresh `state.md`, and log it as
a `decision`, `state_update`, `loop_design`, or `subagent` event. After applying
that reference's startup-cost and isolation-value test, delegation is the default when the goal
contains waves, file ownership slices, 3+ components, broad reading,
independent review passes, or likely context-compression risk; not delegating
in that shape requires a one-sentence rationale in the Leitstand log.

### 5. Loop Design

When a task would normally require the user to run repeated follow-up steps,
design the loop and own it inside the Leitstand-Session: trigger, action,
verification, stop condition, hard cap, and human checkpoint. Read
`references/execution.md` for loop candidates, design rules, anti-patterns, and
the loop prompt shape. Log meaningful loops as `loop_design`; never let an
unbounded loop run and never make the user shuttle status between agents.

### 6. Subagent Orchestration

Use native subagents when the runtime supports them and the work can be split
cleanly. Default toward delegation when the work would otherwise consume the
main thread with broad context, repeated tool output, or implementation detail
that can be summarized back.

Read `references/orchestrate.md` and follow its checkpoint, job selection,
and spawning rules exactly. Core invariants: one bounded job per agent with
owned area, stop condition, and output shape; each subagent returns a compact
`state_delta`; review subagent output before integrating it into `state.md`;
log every delegation as `subagent`; release consumed completed subagents and
their consumed completed descendants when no follow-up is planned and before a
new spawn wave; never ask the user to set goals for subagents.

### 7. Review And Fine-Tuning

Before calling work ready:

- Run an architecture-fit review when the change introduces orchestration, prompt contracts, new workflow boundaries, or integration behavior.
- Run a line-level shippability review for implementation changes.
- Fix must-fix findings. Do not convert must-fix issues into "later" notes.
- Rerun the smallest verification that proves the final state.
- Log meaningful review findings, fixes, and verification.
- If a review finding causes a code or plan change, log it as `friction`, `blocker`,
  or `agent_insight`; do not leave the correction only in chat.

### 8. Integration And Close

In private solo repositories, integrate verified slices back to `main` frequently when the active repo policy allows it. For company/PR mode, follow the PR workflow instead.

Intermediate integration is encouraged when the slice is coherent and verified. Do not hold everything until the final turn if another active thread or agent would benefit from the current state.

Remote writes are high-impact. Push to `origin` only when the active repo instructions, user request, and permission model allow it. If remote sync is expected but blocked, log the exact blocker.

Do not make the user ask whether everything is persisted, committed, merged, pushed, or deployed. When the stated success criteria appear met, when `run` mode empties the plan, or when the user signals the session should end — including mid-work — read `references/abschluss.md` and run the Abschluss procedure: closing checklist, retro offer, next activities, then close or handover. The close criteria live in that reference; do not close a session without it.

Close gate: before any final answer, pause, compaction, resume, or context-risk handoff — in any
phase, including before implementation — run the log-hygiene procedure
(`references/log-hygiene.md`) on the active session directory:

```bash
node <skill-base>/scripts/audit-leitstand-logs.mjs <leitstand/session-dir>
```

Backfill the gaps it reports — especially `workmode`, `friction` for corrections
that happened in chat, `subagent` for delegations, and `completion` — before
finalizing. Before a `completion` event, also run the O-Ton-Nachlese from
`references/log-hygiene.md`: every raw input held against decisions — verlorene
Ideen, Widersprüche, nie Entschiedenes. A finding may only
be left open with a one-line accepted reason in the final response.

## Provider Calibration

Keep this workflow provider-neutral. Before spawning, apply the active provider
overlay's model-routing contract for exact model names, context-transfer
mechanics, effort values, and thinking behavior. If the runtime does not expose
a required control, record the limitation instead of simulating it in prompt
text.

## Final Response Shape

Keep final answers short:

- what was done
- where the main artifacts are
- what was verified
- what remains intentionally out of scope or blocked
- one recommended copy-paste goal plus optional stretch add-ons when the next move is a choice rather than immediate execution

Do not paste the whole Leitstand log into the final answer unless the user asks for it.
