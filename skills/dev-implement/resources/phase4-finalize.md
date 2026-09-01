---
_organized: true
---

# Phase 4: Finalize

Finish with real verification and a clean handoff.

## Do

1. Update docs if the change affects documented behavior.
2. Run the verification that matches the change:
   - relevant tests at minimum
   - full suite or build when risk or repo norms require it
3. Commit the verified slice.
4. In private solo mode, merge the slice to `main` frequently.
5. In company/PR mode, create or update the PR.

Private integration rules:
- Update `main` before integrating when safe.
- Rebase the task branch onto current `main` when needed.
- Merge only after verification passed in the task worktree.
- If `main` is dirty, conflicts touch another owner, or integration is unsafe, leave the slice committed and report the blocker.

PR rules:
- Use PR flow only for company/PR mode or explicit user requests.
- If the user asked for a PR, create it.
- If the branch is not on origin, push it.
- If a PR already exists, return that one instead of creating a duplicate.
- Return the actual PR URL, not a compare link.

6. Return a short summary:
   - what changed
   - how it was verified
   - commit and integration or PR status
   - any remaining note the reviewer or user should know

## Validation Gate

Before completion:
- verification is done
- docs are updated if needed
- private mode: committed and merged to `main`, or a concrete integration blocker is reported
- company/PR mode: PR exists or the PR blocker is reported
- summary is accurate and concrete

## Cleanup

- Remove worktrees only after the branch is no longer needed.
- Do not delete branches or clean up git state unless that action is actually part of the task.
