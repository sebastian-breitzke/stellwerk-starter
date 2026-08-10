# Friction Taxonomy

Use this when writing, reviewing, or mining `friction` events.

## Rule

Friction is useful only when it names the repeatable failure and the smallest
prevention point. Not a diary. Not a mood log. Record what happened, which
expectation it violated, what it cost, and where the fix belongs.

## Fields

- `kind` — one value from the table below
- `trigger` — the concrete phrase, failed command, wrong file, or repeated behavior
- `violated_expectation` — the rule, preference, repo instruction, or decision that was missed
- `impact` — why it cost the user attention, or produced false confidence
- `prevention_point` — `session` | `instructions` | `skill` | `tooling` | `docs` | `code` | `unknown`
- `next_prevention` — the smallest useful change

Optional: `evidence` (path, command output, log id), `recurrence`
(`first` | `repeat` | `systemic`), `candidate_rule` (compact rule text when the
fix is a check or a reminder).

## Kinds

| Kind | Use When | Typical Prevention |
|------|----------|--------------------|
| `stale-guidance` | Old specs, docs, or generated plans override the user's current words, current docs, or current code. | Mark the source stale, update the canonical doc, or delete it. |
| `wrong-system` | Wrong repo, wrong environment, wrong config store, wrong deploy target. | Repo-local environment boundary or a check script. |
| `looping` | The same failing command, search, or hypothesis is retried without learning. | An explicit stop rule and a logged blocker. |
| `missing-instructions` | Workmode, deploy path, authority chain, or environment boundary is simply absent from repo guidance. | Patch the owning repo's agent instructions. |
| `user-correction` | "no", "not X but Y", "actually", a location fix, a format or scope fix. | Adapt in-session; persist only if it generalizes. |
| `handoff-bounce` | The agent asks the user to shuttle work, open chats, coordinate workers, or poll a loop it should own. | The orchestration skill, or a loop design. |
| `context-bloat` | The main thread spends its context on worker-level detail instead of synthesis and decisions. | Delegate, or narrow the read pass. |
| `workmode-mismatch` | PR ceremony in a solo repo, or a push straight to `main` in a team one. | The workmode gate. |
| `verification-miss` | "Done" without proof, wrong test subset, or a generated artifact trusted as source. | Verification policy or a gate. |
| `overbuilt` | Specs, abstractions, or ceremony created for a small task. | A simplicity guardrail in the work policy. |
| `slop-output` | Generic, shallow, or obviously generated output; tests that mirror the implementation. | A review lens or a named anti-pattern. |
| `check-candidate` | The failure is cheaply detectable by a script with compact output. | Write the check. |
| `reminder-candidate` | The failure needs human judgment but should be named when trigger words appear. | A reminder in the relevant skill. |

## Check Versus Reminder

Write a **script** when a machine can find it cheaply: hard-coded values that
should be tokens, a stale endpoint after a migration, a forbidden import,
missing required frontmatter.

Write a **reminder** when it needs judgment: layout quality, tests asserting
implementation instead of behavior, output that feels generated, a pattern that
is only bad in this particular product context.

## Example

```json
{"ts":"2026-01-15T09:00:00+01:00","type":"friction","phase":"execution","kind":"context-bloat",
 "trigger":"main agent read 40 files of worker detail directly",
 "violated_expectation":"main thread preserves context for synthesis, decisions, and integration",
 "impact":"orchestration context spent on detail a worker could have summarized",
 "prevention_point":"skill","recurrence":"repeat",
 "next_prevention":"Make delegation the default for context-heavy exploration."}
```

## Harvesting

Once a week, read the friction events, cluster them by kind, and fix the top
cluster at its prevention point. That pass is the entire human layer of keeping
a skill library sharp — and it is also where the golden test cases come from,
because a repeated failure is by definition worth a regression case.
