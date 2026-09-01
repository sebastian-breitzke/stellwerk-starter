---
name: dev-discipline
description: "Concrete mechanics for test-first implementation, root-cause debugging, and evidence-before-done. Use automatically during implementation or bug-fix work when writing or updating tests, investigating failing/unexpected behavior, fixing review findings, or before claiming done/fixed/works/passes/ready/verified. Load only the needed reference: tdd for behavior/tests, debug for bugs, verify before completion."
allowed-tools: Read, Grep, Glob, Bash
_organized: true
---

# Dev Discipline

This skill is the **mechanics layer**. It does not restate policy.

- Policy (why, what): `work-mode/verification-policy.md`, `work-mode/planning-and-orchestration.md`, `work-mode/coding-policy.md`
- Orchestration (when, order): `dev-implement`
- Mechanics (how): this skill

If you need to know whether to do something, read policy. If you need to know in what order, read `dev-implement`. Read this skill when you need the concrete steps.

## When to load a reference

- Writing a new feature or behavior change → read `references/tdd.md`
- Bug, failing test, unexpected behavior → read `references/debug.md`
- About to claim "done", "works", "passes", "fixed" → read `references/verify.md`

Load one reference when the situation calls. Do not preload all three.

## Auto-Trigger Contract

Use this skill whenever implementation work crosses one of these gates:

- New behavior, changed behavior, or new tests are being written.
- A bug report, failing test, runtime error, review finding, or unexpected behavior is being fixed.
- The task touches backend/frontend code and needs proof before completion.
- The final response would say done, fixed, works, passes, ready, verified, ship, or merge-ready.

This skill supplies mechanics only. If the task needs orchestration across planning, implementation, testing, review, and finalize, use `dev-implement` first and load the matching `dev-discipline` reference at the relevant gate.

## Skill Handoffs

When this skill is active:

- If the task is more than a local mechanic and needs planning, sequencing, tests, review, or a commit → load `dev-implement`.
- If debugging reveals an architecture or canonical-path problem → load `dev-review` before implementing another patch.
- If verification involves a browser-visible UI surface → load `dev-ui` and verify the rendered surface, not only the build.
- If the changed behavior is driven by prompt, skill, MCP, or tool-use instructions → load `prompt-creation-review`.
- If review is requested after the implementation → load `dev-code-review`; keep this skill for verification mechanics, not review judgment.

## Hard Stops

Stop and say why if:
- You cannot describe the root cause of a bug but have a fix ready
- You want to claim "done" without a concrete verification command run
- You are writing tests that depend on implementation internals
- Three fix attempts did not work — step back, the architecture is suspect

## Related

- `work-mode/verification-policy.md`
- `work-mode/planning-and-orchestration.md`
- `dev-implement`
- `dev-review`
