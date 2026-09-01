---
name: github-pr
description: >
  Follow up a GitHub pull request: inspect real PR state, compare it with local
  work, triage review threads, and close the loop after an explicit go. Use only
  for requested PR follow-up, review-comment handling, CI/review polling, or
  thread resolution. Not for private solo work that integrates directly to main.
argument-hint: "[pr-number|branch]"
---

# GitHub Pull Request Follow-Up

This skill is for a repository that actually uses a PR workflow. Do not create
PR ceremony for a solo repository that deliberately integrates verified work to
`main`.

## Assess Before Acting

Use GitHub as the source of truth, then compare it with the local branch. Check:

- PR number, URL, draft state, mergeability, check state, and unresolved threads
- whether local HEAD matches or is ahead of the PR head
- whether the branch is dirty, conflicted, or stale against its base
- whether the title still describes the effective change

Classify each review item as `should_do`, `could_do`, `stale_or_wrong`, or
`irrelevant`. Human comments outweigh bots when they conflict. A valid comment
already fixed locally needs an answer, not a second implementation.

## Recommendation Gate

Before editing code, pushing, replying, renaming, or resolving a thread, return:

```text
PR Status
Local vs GitHub
Title Fit
Review Triage
Recommended Moves
Need Go
```

`Need Go` is explicit whenever the next move writes externally.

## After Go

1. Make agreed changes locally.
2. Verify them using `discipline`.
3. Re-check title fit.
4. Push only when the user approved the external update.
5. Refresh the PR state.
6. Reply to addressed threads; resolve only threads actually closed.
7. Refresh once more and report threads resolved, replied, still open, checks,
   and final title.

## Gotchas

- Review comments describe an older diff until local and GitHub state are compared.
- Never resolve a thread merely because its suggestion sounded plausible.
- Failing checks and merge conflicts outrank comment-level polish.
