---
_organized: true
---
# GitHub PR Commands

Concrete commands for the dev-github-pr flow. Load this when executing the GitHub side after the recommendation gate is approved.

## Snapshot

```bash
git fetch --all --prune --quiet
```

Then run `<skill-dir>/scripts/gh_pr_snapshot.py [pr-number|branch] [--repo owner/repo] [--compact]` — resolve `<skill-dir>` from this skill's own directory in the active deployment.

The snapshot consolidates:
- PR status and metadata
- review decision and latest reviews
- open and resolved review threads
- check-run summary
- local branch, dirty state, conflicts, relation of local `HEAD` to PR head SHA

Refresh the snapshot if it is older than 5 minutes during active work or right before posting replies.

## Fallback PR Discovery

Use when the snapshot says no PR exists but the user clearly pasted PR review text:

```bash
gh pr list --state open --limit 50 --json number,title,headRefName,url,reviewDecision
gh pr status
```

Match by current branch, PR number, or pasted title. Only stop the PR workflow after this fallback still finds nothing.

## Create PR

```bash
git push -u origin HEAD
gh pr create --title "..." --body "..."
```

After creation, re-run the snapshot and continue the normal workflow.

## Update PR Title

```bash
gh pr edit {pr} --title 'New accurate title'
```

## Reply to a Review Comment

```bash
gh api repos/{owner}/{repo}/pulls/{pr}/comments/{comment_id}/replies \
  -f body='Addressed in the latest commit.'
```

## Resolve a Review Thread

```bash
gh api graphql \
  -F threadId='THREAD_ID' \
  -f query='mutation($threadId: ID!) { resolveReviewThread(input: {threadId: $threadId}) { thread { isResolved } } }'
```

Do not resolve when the code is not changed, the concern was intentionally declined, or the thread is still the best place to track an open decision.

## Re-Request Copilot Review

The reviewer login GitHub actually exposes for Copilot is `copilot-pull-request-reviewer`, not `copilot`.

```bash
gh pr edit {pr} --add-reviewer copilot-pull-request-reviewer
```

## Verify a Copilot Review Request

`gh pr view --json reviewRequests` can miss bot reviewers. Prefer GraphQL:

```bash
gh api graphql -f query='
  query { repository(owner:"OWNER", name:"REPO") {
    pullRequest(number:PR) {
      reviewRequests(first:20) {
        nodes { requestedReviewer {
          __typename
          ... on User { login }
          ... on Bot { login }
        } }
      }
    }
  } }'
```

## Local vs GitHub Interpretation

- `exact_match`: local and GitHub see the same code
- `local_ahead_of_pr`: local work exists that GitHub cannot have reviewed yet
- `local_behind_pr`: GitHub has newer branch state than local
- `diverged_from_pr`: the local branch and PR branch have drifted apart and need a careful read
- `pr_head_missing_locally`: compare with caution, fetch or inspect branch history first
