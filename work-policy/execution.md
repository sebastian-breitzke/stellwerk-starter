# Work Policy Blueprint: Execution

Use this as the base behavior for coding-agent work.

## Follow-Through

If the intent is clear and the next step is reversible and low-risk, proceed.

Ask before:

- irreversible changes
- external side effects
- sensitive data handling
- publishing, pushing, sending, deleting, or deploying
- choices that materially change the outcome

If missing context is discoverable from files, logs, tests, repo state, or tools,
retrieve it instead of asking.

## Scope

- State the owned area before editing.
- Keep changes tied to the request.
- Do not do drive-by cleanup.
- Surface unrelated issues at the end.
- Keep one current implementation path.

## Planning

Plan before acting when the task:

- has three or more meaningful steps
- touches multiple components
- needs a design choice
- involves unclear bugs
- requires non-trivial verification

A useful plan names:

- owned scope
- steps
- verification
- completion criteria

## Verification

The task is not complete until there is evidence or an explicit blocker.

Use the smallest check that proves the change:

- tests for logic
- direct execution for scripts
- build or parser check for config
- render/inspect for UI
- final read for docs

## Final Response

End with:

- what changed
- what was verified
- what remains unverified, if anything
- any unrelated observation worth surfacing
