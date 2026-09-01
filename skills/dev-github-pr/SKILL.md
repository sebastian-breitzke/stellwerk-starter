---
name: dev-github-pr
description: "Manual GitHub pull request follow-up and review triage for company/PR-mode work. Use only when the user explicitly asks for GitHub PR follow-up, PR review triage, review-comment handling, CI/review polling, resolving threads, or a PR preview loop. Do not use this skill to turn private solo work into PR workflow."
argument-hint: "[pr-number|branch] [--repo owner/repo]"
allowed-tools: Read, Grep, Glob, Bash, Edit, Write
_organized: true
---

# GitHub PR Follow-Up

**Purpose:** Check the real GitHub PR state first, compare it with the local repo state, verify that the PR title still fits the current change, classify review input, propose the next move, then after explicit go execute changes and close the loop on GitHub.

This is a company/PR-mode skill. It is not the default path for private solo work, where verified
worktree slices are merged back to `main` without PR ceremony.

## Layering

- Decision flow: this SKILL.md
- Concrete commands (snapshot, reply, resolve, Copilot quirks): `references/commands.md`
- Snapshot tool: `<skill-dir>/scripts/gh_pr_snapshot.py`

Load `references/commands.md` only when executing the GitHub side after the recommendation gate.

## Defaults

- Start with GitHub truth, not memory.
- If no PR exists, say so explicitly and stop the PR-specific workflow.
- Treat the local repo as potentially ahead of GitHub until proven otherwise.
- Treat PR title fit as a required check, not polish.
- If the user asked for a PR and none exists, create it instead of only pointing to GitHub.
- Do not start editing code or answering comments before presenting an assessment.
- After a user go, respond on GitHub and resolve only the threads that are actually addressed.
- If the user pastes raw GitHub review output or Copilot review UI text, treat it as a PR follow-up trigger by default, not as a local-only review request.

## Execution Flow

### 1. Discover The PR

Do:
1. Detect whether a PR exists for the current branch or the user-provided selector.
2. If a PR exists, capture PR number, URL, draft state, mergeability, review decision, unresolved thread count, and failing checks.
3. If no PR exists and the user asked for one, create it.
4. Check whether the current PR title still matches the actual scope and intent of the branch.
5. If no PR exists and the user did not ask for one, say that clearly and continue with normal local work instead of pretending there is a PR.

For snapshot, fallback discovery, and PR creation commands, see `references/commands.md`.

### 2. Compare GitHub With Local

Always evaluate:
- whether local `HEAD` matches the PR head SHA
- whether local `HEAD` is ahead of the PR head
- whether the branch is dirty or has unresolved merge conflicts
- whether GitHub comments refer to code that has already changed locally
- whether the PR branch itself is stale against base or only GitHub's view is stale
- whether the PR title still matches the effective change after local commits and review-driven edits

Title-fit rules:
- If the title is narrower than the actual change, flag it.
- If the title is now misleading because review work changed scope, flag it.
- If the title describes implementation detail but the PR has become about a user-visible fix, propose a clearer title.
- If the title still fits, say that explicitly so the user does not have to wonder.

For the local-vs-GitHub interpretation codes, see `references/commands.md`.

### 3. Triage Review Input

For each open review thread or relevant review comment, classify it as:
- `should_do`: valid and worth implementing now
- `could_do`: reasonable but optional or style-level
- `stale_or_wrong`: already addressed locally, based on outdated diff, or factually off
- `irrelevant`: not useful for the current PR outcome

Apply these rules:
- Human comments beat bot comments when they conflict.
- Copilot or other bot comments are hints, not authority.
- Outdated or resolved threads are context, not active work.
- A comment that is valid on GitHub but already fixed locally should be answered, not re-implemented.
- Merge conflicts are a first-class finding. Do not bury them under comment-level discussion.
- If the user pasted GitHub review excerpts, classify those excerpts inside the PR workflow first; do not answer them as plain local review text unless the user explicitly asks for that.

## Recommendation Gate

Before editing or replying, return a short assessment with:

1. `PR Status`
2. `Local vs GitHub`
3. `Title Fit`
4. `Review Triage`
5. `Recommended Moves`
6. `Need Go`

`Recommended Moves` should be explicit:
- what to implement now
- what to skip
- what to answer without code change
- whether to rename the PR, with the suggested replacement title if needed
- whether to refresh GitHub again before acting

## After Go

Do this in order:
1. implement the agreed changes locally
2. run lightweight verification appropriate to the repo (see `dev-discipline/references/verify.md` for mechanics)
3. re-check whether the PR title still matches the final diff
4. update the PR title if needed
5. push when GitHub needs the updated commit
6. refresh the PR snapshot
7. reply to each addressed review comment or thread
8. resolve only the threads that are actually closed
9. refresh once more and confirm remaining open items

End with: threads resolved / replied / still open, checks state, and the final PR title.

For the exact reply, resolve, and Copilot commands, see `references/commands.md`.

## Reply Style

- be short, factual, and specific
- mention whether it was changed, intentionally not changed, or already fixed locally
- include the reason when declining a suggestion

## Best Practices

- Refresh GitHub before the first recommendation and again if more than 5 minutes passed.
- Batch related fixes before replying. Do not create review ping-pong for each tiny edit.
- Separate signal from noise: humans, bots, stale diffs, and already-resolved threads are not the same class.
- Re-check the PR title after meaningful scope drift. Review-driven changes often invalidate the original title.
- Verify locally before writing "fixed".
- If the local branch is ahead of the PR, frame GitHub review comments against the newer local reality instead of blindly obeying the older diff.
- If checks are failing, include them in the assessment even when review comments look harmless.
- If merge conflicts exist, decide conflict strategy before touching individual review comments.
- After replying, verify the actual remaining open thread count instead of assuming GitHub is in sync.

## Anti-Patterns

- trusting GitHub review comments without comparing against local changes
- responding to comments before deciding what is actually valid
- resolving threads without a real answer or code change
- leaving a stale PR title in place after the scope changed
- ignoring failing checks while focusing only on comments
- treating Copilot feedback like required review input
- assuming the current branch has a PR without checking

## Related

- `dev-change-notes` for PR title and body style
- `dev-discipline/references/verify.md` for post-change verification mechanics
- `/dev:implement` when a review comment requires real implementation work
