---
_organized: true
---

# Phase 0: Context and Planning

Use this phase to decide what to build, where it belongs, and whether the repo state is safe to start from.

## Do

1. Load the task source:
   - referenced spec
   - inline description
   - otherwise current chat context
2. Find the touched area:
   - related code
   - related tests
   - naming and structural conventions
3. Identify the healthy target pattern.
4. Run the git gate:
   - detect base branch from `origin/HEAD`, fall back to `main`, then `master`
   - `git fetch --all --prune --quiet`
   - if starting fresh: in `team-pr` create the worktree from `origin/<base>`; in `solo-main` start from the current local integration lane when it intentionally holds verified local slices ahead of remote
   - if already in a task branch/worktree, verify `origin/<base>` is contained in `HEAD`
5. Build a concrete todo list:

```text
- [in_progress] P0: Understand requirements
- [pending] P0: Identify related code
- [pending] P0: Verify git base state
- [pending] P0: Create implementation plan
- [pending] P0: Setup worktree or confirm current checkout mode
- [pending] P1: Implement [specific task]
- [pending] P2: Write behavioral tests
- [pending] P3: Review
- [pending] P4: Finalize
```

6. Ask only the questions that materially change the solution.

## Stop Immediately If

- the task branch is stale against the current remote base branch
- files you need to edit are dirty and owned by someone else
- branch ancestry is unclear
- the only nearby implementation is a bad pattern and no healthy target is obvious

When stopping, tell the user:
- what is wrong
- why continuing would be sloppy or risky
- the concrete recovery options

## Validation Gate

Before Phase 1:
- requirements are clear
- related code and tests are identified
- healthy target pattern is identified
- todo list is specific
- verification command/check for the slice identified (machine-readable pass/fail) — defined before implementation, not bolted on at Phase 4
- git gate passed
- worktree ready unless already in one or `--main`

## Output

Return:
- short task summary
- P1 todo list
- chosen pattern
- git/worktree status
- open questions or blocker options, if any
