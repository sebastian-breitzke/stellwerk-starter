---
name: dev-implement
description: Development orchestrator with planning, coding, test, review, and verification gates. Use automatically when implementing changes, fixing review findings, debugging product behavior, migrating a code path, or preparing a commit/PR — especially non-trivial features, multi-file changes, AI/harness/MCP work, UI work, bug reports, and implement/fix/make-it-work requests. Not for trivial single-file edits and not for pure review or planning requests.
argument-hint: "[spec-id|description] [--main|--pr|--skip-tests] [--web]"
_organized: true
---

# Development Orchestrator

Run the work in phases. Do not skip gates.

## Shared Foundation

- Apply `work-mode/quality-bar.md`
- Apply `work-mode/coding-policy.md`
- Apply `smb-pragmatism`
- Runtime/provider-specific execution constraints come from the active provider overlay.

Do not restate those files inside this skill. Use them.

## Core Rules

- No shortcuts. If the clean path is blocked, say why and stop.
- One current implementation path after the change. No fallback architecture unless explicitly requested.
- Keep the skill orchestration here. Keep phase detail in `resources/phase*.md`.
- Prefer concrete verification over confidence theater.
- If a Leitstand session is active, this skill executes one concrete implementation slice inside that session. Do not create a second session-level orchestration track.
- If no Leitstand session is active and the task crosses the Leitstand gate — a handed-over work package (order zip, `PROMPT.md`, another agent's task prompt, a design-implement or MCP-import brief) or a meaningful change — load `leitstand` and scaffold the session before the first edit, not retroactively at closeout.

## Layering

This skill orchestrates. It does not hold mechanics.

- Policy: `work-mode/verification-policy.md`, `work-mode/planning-and-orchestration.md`, `work-mode/coding-policy.md`
- Leitstand: session intake, raw-input log, cross-slice direction, subagent coordination, copy-paste goals, and final closeout
- Planning challenge: `dev-challenge` for planning turns and design-tree pressure
- Domain language: `dev-domain-language` when terms or discussion-to-document flow matter
- Architecture review/deepening: `dev-review` when module shape, adapters, cleanup, or refactor scope matter
- Mechanics: `dev-discipline` with references for tdd, debug, verify
  - Phase 2 testing → pick the mechanism per `work-mode/verification-policy.md` (Test Strategy); load `dev-discipline/references/tdd.md` when working test-first
  - Phase 4 finalize → load `dev-discipline/references/verify.md` before claiming done
  - Any phase hitting a real bug → load `dev-discipline/references/debug.md`
- UI surface quality: `dev-ui` when `--web` or UI work is in scope, called in phase 1 and phase 3

Do not duplicate mechanics inside phase files. Reference them.

## Skill Handoffs

When this skill is active, explicitly pull the adjacent skill at the first matching gate:

- Prompt, skill, MCP, tool contract, system prompt, or model-facing instruction changes → `prompt-creation-review`.
- UI, route, component, renderer, screenshot, interaction surface, or browser-visible behavior changes → `dev-ui`.
- Bug report, failing test, runtime error, review finding, or unexpected behavior → `dev-discipline/references/debug.md`.
- New behavior or tests → `work-mode/verification-policy.md` (Test Strategy) for the mechanism; `dev-discipline/references/tdd.md` when working test-first.
- Before saying done, fixed, ready, verified, or merge-ready → `dev-discipline/references/verify.md`.
- Architecture shape, adapter, orchestration, cleanup, or canonical-path question → `dev-review`; apply its deepening lens when module boundaries are involved.
- After implementation and before final confidence → `dev-code-review`.

## Pre-Flight

Parse:
- active Leitstand decision, inline description, current chat context, or explicit reference
- Workmode from repo-local AX/AGENTS when present; otherwise infer from the task
- git mode: `solo-main`, `team-pr`, explicit `--main`, or explicit `--pr`
- `--skip-tests` only for prototypes or explicit exceptions: skips Phase 2; Phase 3/4 gates drop the test-rerun requirement but keep review and verification
- `--web` or inferred web/UI mode

Determine context source in this order:
1. current user O-Ton or active Leitstand decision state
2. repo-local AX/AGENTS Workmode and current canonical docs
3. current chat context or inline description
4. explicit referenced spec or plan, only as evidence and only when not stale

Do not create a spec for ordinary implementation. If old specs conflict with
current O-Ton, Leitstand state, canon, or AX, treat the spec as stale and surface
the conflict instead of following it.

## Workmode Gate

Before Git work, read Workmode from repo-local AX/AGENTS when available.

`solo-main`:
- use a worktree for non-trivial slices
- verify and commit coherent slices
- merge verified slices back to `main` frequently
- pull or merge current `main` regularly during longer runs
- resolve ordinary conflicts without ceremony
- escalate only real direction conflicts, data-loss risk, external side effects,
  or user-authored dirty work in the owned area

`team-pr`:
- work on a branch/PR
- poll CI and review comments when in a review loop
- triage comments as valid, stale/wrong, optional, or out of scope
- fix valid comments and push again
- merge only when the user asks or repo policy explicitly allows it

If Workmode is missing:
- company/PR/CI/review cues -> infer `team-pr`
- user-owned private repo cues -> infer `solo-main`
- surface the missing Workmode as an AX gap; do not block safe progress

## Git Gate

Before planning a new task or creating a worktree:
1. Detect the repo base branch from `origin/HEAD`; fall back to `main`, then `master`.
2. Run `git fetch --all --prune --quiet`.
3. In `team-pr`, start fresh worktrees from the current remote base branch.
   In `solo-main`, start from the current local integration lane when it is ahead
   and intentionally holds verified local slices.
4. If already inside a task worktree, verify it already contains the current `origin/<base>`.

Hard stop if any of this is false:
- local base branch is behind remote and cannot be safely updated for integration
- current task branch does not include the current remote base branch
- dirty state in the files you need to edit belongs to someone else
- branch ancestry is unclear

When the git gate fails, stop before implementation and tell the user exactly what is wrong plus concrete options:
- update local base branch, then create a fresh worktree
- rebase current task branch onto `origin/<base>`
- merge `origin/<base>` into the current task branch
- create a new worktree from current base and cherry-pick the existing commits

Do not quietly continue on a stale branch.
Do not treat unrelated dirty files in another checkout as a blocker.

## Pattern Gate

During planning, identify the current healthy pattern in the touched area.

Hard stop if:
- the nearest implementation is legacy, workaround-driven, or inconsistent
- there is no clear healthy pattern to follow
- the required migration is larger than the requested task

When this gate fails, stop and tell the user:
- what pattern is unhealthy
- why copying it is wrong
- the available options to proceed

## Phase Flow

### Phase 0: Context and Planning

Do:
1. read the relevant context
2. identify related code and tests
3. decide the healthy target pattern
4. build a concrete todo list
5. set up the worktree after the git gate passes unless already in one or `--main`
6. raise only real open questions

Gate before Phase 1:
- requirements understood
- related code identified
- healthy target pattern identified
- todo list created
- git gate passed
- worktree ready unless already in one or `--main`

See: `resources/phase0-context.md`

### Phase 1: Implementation

Do:
1. work through P1 todos in order
2. follow the healthy pattern, not the nearest bad one
3. keep the canonical path clean
4. stop on blockers instead of guessing

Gate before Phase 2:
- P1 todos complete
- code runs or compiles at a basic level
- no obvious hacks or duplicate paths
- changed code is worth shipping

See: `resources/phase1-implement.md`

### Phase 2: Testing

Pick the test mechanism by problem shape and risk per `work-mode/verification-policy.md` (Test Strategy). The gate is delivery evidence, not a fixed sequence.

Testing must be implementation-blind. Mechanism: write the tests from requirements and interfaces, not from the implementation diff, or delegate test-writing to a clean-context subagent that gets only requirements and interfaces. Do not fork or resume the implementation conversation for this role.

When implementation is delegated to a subagent or Codex, commit the tests before handing over; assertion changes after that point are visible diffs that need justification.

Gate before Phase 3:
- tests were written from requirements and interfaces
- tests do not depend on implementation details
- tests pass
- critical paths and required delivery evidence are covered

See: `resources/phase2-test.md`

### Phase 3: Review

Review must be context-blind. Mechanism: run the review in a clean-context subagent that gets the diff and requirements, not the implementation conversation. Use the provider overlay's native clean-context mechanism; never rely on an omitted fork default.

Two review lanes, both applied:
- Architecture fit → `dev-review` (post-implementation mode)
- Line-level shippability → `dev-code-review` (hard decline gates)

For structural changes, architecture review includes a deepening check: shallow modules, weak interfaces, duplicated caller knowledge, and whether tests cross the intended interface.

Gate before Phase 4:
- architecture review passed or issues were fixed
- code review verdict is `Ship` or `Ship with fixes` with all must-fixes applied
- affected tests were re-run
- code is PR-ready

See: `resources/phase3-review.md`

### Phase 4: Finalize

Do:
1. update docs if needed
2. run verification that matches the change
3. commit the verified slice
4. integrate to `main` frequently in private solo mode, or create/update the PR in `--pr` mode
5. return a short factual summary

Gate before complete:
- verification done
- docs updated if needed
- private mode: committed slice is merged to `main` unless integration is blocked
- `--pr` mode: PR created or updated
- final summary ready

See: `resources/phase4-finalize.md`

## Git Modes

Default follows Workmode.

`solo-main`:
```bash
git worktree add ../<repo>-wt-<short-name> -b <short-name> main
cd ../<repo>-wt-<short-name>
```

`team-pr`:
```bash
git worktree add ../<repo>-wt-<short-name> -b <short-name> origin/<base>
cd ../<repo>-wt-<short-name>
```

`--main`:
- work in the current checkout only when explicitly requested or when the repo rules require it

`--pr`:
- use company/PR mode for GitHub review follow-up, CI repair, or explicit PR requests
- create a branch when needed
- push and open/update a PR only after scope and verification are clear

## Failure Handling

If a gate fails:
1. say what failed
2. say why it matters
3. give the user concrete recovery options
4. proceed only after the path is clean again

## Related Commands

- `dev-challenge`
- `/dev:review`
- `functional-writing`

## Anti-Patterns

- starting feature work from a stale branch
- copying legacy or workaround patterns because they are nearby
- skipping planning, testing, or review gates
- letting tests see implementation details
- letting review inherit implementation rationale
- shipping shortcuts as architecture
