# Agent Instructions For Stellwerk Starter

This repository is reference material. Do not install it blindly and do not copy
all files into the user's always-on prompt.

## Your Job

1. Read this file first.
2. Read `README.md`, `architecture.md`, and `privacy-and-sharing.md`.
3. Inspect the user's current agent/runtime setup.
4. Explain the model in that runtime's terms.
5. Recommend the smallest useful first slice.
6. Implement only what the user selects.
7. Verify the adapted setup with one real workflow.

## Core Model

Extract the boundaries, not the exact wording:

- **Always-on identity:** short role, tone, and non-negotiables.
- **Work policy:** how the agent acts, asks, verifies, and handles risk.
- **Skills:** deeper procedures loaded only when relevant.
- **Session orchestration:** a main-agent workflow for longer work.
- **Private context:** stored deliberately and loaded only when needed.

Preserve those boundaries. Do not flatten everything into one giant prompt.

## First Report To The User

Before implementing, return exactly:

1. `What This Is`
2. `What I Found In Your Setup`
3. `Recommended First Slice`
4. `What I Will Not Import`
5. `Verification Plan`

Answer these questions in that report:

- Which runtime are we adapting for?
- Where do agent instructions live?
- Does the runtime support skills, commands, tools, subagents, or hooks?
- Where should session logs live, if anywhere?
- Which workflows does the user actually need now?

If an answer is discoverable from files, inspect the files instead of asking.

## Safe Default Slice

When the user has no strong preference, recommend this order:

1. `identity`: concise role and tone
2. `work-policy`: execution, verification, privacy
3. `leitstand`: larger-session orchestration
4. `verification`: proof before done
5. one optional workflow: `research` or `meeting-recap`

Only add `prompt-design`, `doc-writing`, or `person-context` when the user needs
those workflows now.

## Adaptation Rules

- Keep always-on prompts short.
- Prefer skill files over bloating global instructions.
- Keep personal context out of the repo unless the user explicitly wants it.
- Store secrets in the user's existing secret manager, never in prompt files.
- Do not create customer- or company-specific workflows unless requested.
- Do not preserve both old and new paths unless there is a real migration need.
- If the runtime lacks a concept such as "skills", map each blueprint to the
  nearest native mechanism and explain the tradeoff.
- After changes, run the smallest check that proves the setup works.

## Hard Privacy Boundary

Do not import:

- another person's identity text
- private biographies or family context
- stakeholder/person libraries
- customer names or company workflows
- secrets, vault keys, hostnames, bot names, SSH aliases, or token names
- meeting transcripts, raw dictations, or historical session logs

Use placeholders and fictional examples where needed.
