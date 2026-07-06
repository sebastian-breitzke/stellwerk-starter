# Skill Blueprint: Verification

Verification is the rule that "done" needs evidence.

## Gate

Before saying done, fixed, ready, works, or shipped:

1. Choose a check that matches the change.
2. Run it or explain why it cannot run.
3. Read the output.
4. Report the decisive evidence.
5. State what remains unverified.

## Verification By Change Type

| Change | Minimum Useful Check |
|--------|----------------------|
| Code logic | targeted tests or direct execution |
| Bug fix | reproduce before, pass after |
| Build/config | local build or equivalent parser check |
| UI | render and inspect affected surface |
| Docs | read rendered or final Markdown |
| Data migration | dry run and count/shape checks |
| Prompt/skill | read final prompt and run a small scenario |

## Report Shape

```text
Verified:
- <command/check>: <result>

Evidence:
- <decisive output or observation>

Not verified:
- <gap, if any>
```

## Anti-Patterns

- "should work" without a check
- relying on a clean diff as proof
- running the wrong test subset
- ignoring warnings or skipped tests
- claiming UI success without rendering the UI
