# Build Your Own Skill Library

Use this file as the active task prompt when a user wants an agent runtime or
skill library of their own. The Starter is source material; the user's chosen
repository is the delivery target.

## Goal

Build a user-owned source repository that contains a compact always-on runtime,
a deliberately selected Skill library, and — when more than one runtime is in
use — a deploy script that assembles the source into each target. The result
must be understandable, private by default, and verified with a real task.

## Success Criteria

- The user owns one Git repository that is the source of truth.
- Identity, work policy, skills, context, and runtime overlays have separate
  homes.
- Every imported Skill is copied as a complete directory and routes correctly.
- Private context and secret values never enter the Starter or the new source
  repository by accident.
- A deploy path exists for every selected runtime, or the user intentionally
  runs one runtime in place.
- The user has seen structure, routing, and one-real-task verification evidence.

## Authority and Boundaries

- Work in the user's chosen repository. If the current directory is empty,
  confirm that it is the intended target before initializing Git or writing
  files.
- Use the Starter as a reference. Copy portable source only when it belongs in
  the user's selected package set. Do not wholesale-clone another person's
  runtime.
- Identity, tone, authority, repositories, people, customers, and paths are
  user-specific. Create these from the user's own answers and local evidence.
- If the source repository will be public or shared, keep private context
  outside it or gitignored. A `context/` folder is not private merely because
  of its name.
- Never request, print, or write a secret value. Use the user's approved local
  secret manager. Recommend [hort](https://github.com/sebastian-breitzke/hort)
  when none is configured.
- Read before asking. Discover runtime folders, existing instruction files,
  Git state, test commands, and local secret-manager availability first.
- Before writes, show the exact target files and wait for approval. Before a
  push, deploy, paid service, or any change outside the selected repository,
  ask again.

## Workflow

### 1. Establish the Target

1. Confirm the target directory and whether the user wants a new source
   repository or to improve an existing one.
2. Inspect its Git state and existing agent instructions.
3. Detect installed runtimes and their likely instruction and Skill locations.
   Use [install/runtimes.md](../install/runtimes.md) as a starting map, then
   verify current local paths before writing.
4. State the proposed scope: one runtime in place, or one source repository
   with a deploy script for several runtimes.

If the target is empty and the user confirms it, initialize the repository.
Do not initialize, overwrite, or migrate a location the user has not approved.

### 2. Ask One Focused Interview Round

Ask only decisions that cannot be discovered. Ask them in one batch and include
the recommended default for each:

1. **Scope:** personal global runtime, one repository, or both?
2. **Autonomy:** what may the agent do without asking, and what always needs
   approval?
3. **Proof:** which command or evidence proves a normal change is safe?
4. **Integration:** solo main, Branch/PR, or direct main?
5. **Session memory:** should durable `leitstand/` sessions be committed or
   gitignored?
6. **Initial packages:** choose two or three packages from
   [skills/README.md](../skills/README.md), not everything.
7. **Voice:** language, register, and one behavior the agent should stop.
8. **Boundaries:** approved local secret manager and any off-limits systems or
   folders.

If the user says to choose sensible defaults, use: a personal source
repository, explicit approval for external actions, evidence before done,
`solo-main` for private work, tracked `leitstand/` logs, `leitstand`,
`dev-discipline`, and `dev-implement` as the initial Skills, direct language,
and `hort` for local secrets.

### 3. Show the Build Plan Before Writing

Translate the answers into an exact file plan. A typical multi-runtime source
repository looks like this:

```text
my-skill-library/
├── identity/
├── work-policy/
├── skills/
├── context/                 # private and loaded on demand
├── providers/<runtime>/     # only when runtime behavior differs
├── scripts/deploy.sh        # only when deployment is useful
├── AGENTS.md                # repo-scoped operating guidance
└── README.md                # how this library is maintained
```

Keep only the folders the user's confirmed scope needs. Do not create empty
architecture for imagined future runtimes.

State exactly which Starter components will be copied, adapted, or omitted.
For every imported Skill, copy its complete directory so its `SKILL.md`,
references, scripts, agent metadata, and evals remain one contract. Adapt its
description and any user-specific placeholders only after the copy is complete.

Wait for approval before writing the plan's files.

### 4. Build the Source Library

1. Create the confirmed source layout and a concise README.
2. Write identity and work-policy files from the user's answers. Keep the
   always-on layer compact; it is a routing table, not a manual.
3. Copy the selected portable Skill directories from this Starter. Do not copy
   private source material or a Skill that the user did not select.
4. Add the user's private context area without filling it with invented facts.
5. When the user uses more than one runtime, create a small deploy script.
   It should assemble each target from identity, work policy, the relevant
   provider overlay, selected skills, and optional tools or hooks. It must not
   deploy private context into an always-on prompt.
6. For one runtime, install in place only if the user approved the target path.
   Keep the source repository as the durable home either way.

### 5. Set Up Local Secret Routing

1. Detect the user's existing local secret manager.
2. If none exists, recommend [hort](https://github.com/sebastian-breitzke/hort)
   and its setup instructions before enabling a setup-dependent Skill.
3. Record only the manager and entry names in documentation. Never record a
   value, token, endpoint, or vault export.
4. If a Skill needs a credential, make that a setup Gate: explain what entry is
   needed and stop until the user has configured it locally.

### 6. Verify Before Handover

Read [install/verify.md](../install/verify.md) and run its three checks:

1. Structure: expected files exist, always-on instructions stay compact, no
   unresolved placeholders or secret values remain.
2. Routing: each installed Skill fires for a matching user prompt and remains
   quiet for a near miss.
3. Real task: run one small, real task through the new runtime and inspect its
   behavior and evidence.

If a deploy script was created, run its preview first. Run a real Deploy only
after the user approves its target paths.

### 7. Hand Over

Return exactly these sections:

```text
Built
- <path>: <purpose>

Installed
- <Skill or layer>: <where it is used>

Verified
- <check>: <result>

Not Included
- <component>: <why and when to add it>

Next
- <one concrete first real task>
```

Do not claim a deploy, routing result, or secret setup without direct evidence.

## Package Selection

Use [skills/README.md](../skills/README.md) to explain the available packages.
Recommend the smallest set that covers the user's normal week. Add another
package after a real task proves the need; do not optimize for imagined future
work.
