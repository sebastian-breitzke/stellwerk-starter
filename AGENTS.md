# Agent Instructions: Install This Runtime For Your User

You are reading the entry point of Stellwerk Starter. Your user pointed you here
because they want a working agent runtime — identity, work policy, and skills —
installed into their own environment and tuned to how they actually work.

Your job is not to summarize this repository. Your job is to run the install.

## Contract

**Task:** Interview the user, write a profile, generate their runtime files from
the templates here, and prove the result works.

**Success:** The user's runtime has an always-on layer under 200 lines, a small
initial skill set that triggers on the right prompts, and one verification run
whose output you showed them. The full Development skill set remains available
as an extension, not an automatic install.

**Never:** copy this repo wholesale into an always-on prompt; import any private
context from anyone else's setup; write a secret into any file.

## Read Order

Read these before Phase 2. Do not read the whole repo first.

1. This file.
2. `install/procedure.md` — the six phases, in order.
3. `install/runtimes.md` — where files go for the user's specific runtime.
4. `install/interview.md` — the question set.

Read on demand, not upfront:

- `install/verify.md` before Phase 5.
- `skills/README.md` before you write any skill file.
- an individual `skills/<name>/SKILL.md` when you install that skill. The
  Development set is listed in `skills/README.md`.
- `architecture.md` when the user asks why the layers exist.
- `privacy-and-sharing.md` when the user wants to share their runtime.

## The Model You Are Installing

Four layers, each with a different job. Keeping them separate is the whole point.

| Layer | Loaded | Holds | Budget |
|-------|--------|-------|--------|
| Identity | always | role, tone, non-negotiables | ~40 lines |
| Work policy | always | act/ask boundary, verification, scope, routing | ~120 lines |
| Skills | on match | full procedures, output contracts, scripts | unbounded |
| Context | on demand | person, project, customer specifics | unbounded |

The always-on layer is a routing table, not a manual. Everything a competent
agent only needs sometimes belongs in a skill. The single most common failure
when adapting this material is flattening all four layers into one long prompt.

## Rules That Bind You During The Install

- **Detect before you ask.** Anything discoverable from the filesystem, config
  files, or `git` is not an interview question. Interview questions are about
  taste and policy, which files cannot tell you.
- **Ask in one batch.** One round of grouped questions with recommended
  defaults, not a twenty-turn interrogation. If the user answers "just pick
  sensible defaults", take the recommended option in every block and continue.
- **Adapt, do not transcribe.** Every template here is written for a generic
  user. Rewrite the wording so it matches the user's language, stack, and
  workflow. A skill that still says `<your-repo>` after install is not installed.
- **One canonical path.** If the user already has agent instructions, migrate
  them into the new layering. Do not leave the old file live alongside the new
  one and do not build a compatibility shim.
- **Show the diff.** Before writing outside a scratch directory, list the exact
  file paths you will create or modify. Existing instruction files get backed up
  or shown as a diff first — never silently overwritten.
- **Stop and ask** before installing outside the user's home or repo, before any
  `git push`, and before touching anything already tracked by another tool.

## Hard Privacy Boundary

This repo deliberately contains no real person's context. Keep it that way, and
keep the user's context out of anything shareable.

Never import or generate from someone else's setup:

- personal biography, family, health, or private preferences
- stakeholder or person libraries
- customer names, company workflows, internal infrastructure paths
- secrets, vault keys, hostnames, bot handles, SSH aliases, token names
- meeting transcripts, raw dictations, or historical session logs

Secrets go in the user's existing secret manager. If a skill needs a credential,
it names the entry to look up — never the value.

## What To Return At The End

End the install with exactly these sections:

```text
Installed
- <path>: <what it does>

Verified
- <check>: <result>

Your Runtime In One Minute
- <how the user triggers each installed skill>

Not Installed
- <skill>: <why, and when to add it>

Next
- <the one thing to do after the first real task>
```

Now open `install/procedure.md` and start at Phase 0.
