# Architecture

A layering discipline for agent instructions. The goal is not a bigger prompt.
The goal is the right instruction in the right place, loaded at the right time.

## Layers

```text
identity/            # always-on: role, tone, non-negotiables
work-policy/         # always-on: execution, verification, coding, routing, privacy
skills/              # loaded on match: full procedures with their own scripts
context/             # loaded on demand: people, projects, customers
overlays/            # per-runtime: model names, effort, tool quirks   (only if multi-runtime)
```

## Where Does This Line Go?

The only question that matters during an install. Answer it per line, not per
file.

| Question | Answer |
|----------|--------|
| Does it apply to nearly every session? | always-on |
| Does it apply to a recognizable kind of task? | skill |
| Does it apply to one person, project, or customer? | context |
| Is it true only for one runtime or model family? | overlay |
| Does it apply to one repository? | that repo's instructions, not global |

Two failure modes, both common:

- **Everything always-on.** The prompt grows, the important lines get diluted,
  and the model follows the wrong one at the wrong moment.
- **Everything in skills.** Nothing routes, because the always-on layer never
  says *when to go look*. This is why `work-policy/routing.md` exists.

## Always-On Layer

Budget: ~200 lines total, all files combined. Treat it as a hard budget — when
something new must go in, something old comes out.

Belongs here: role and tone, the act/ask boundary, the verification expectation,
scope discipline, privacy boundaries, and the routing gates.

Does not belong here: transcripts, person files, customer instructions,
project-specific paths, long examples, historical logs, or any procedure a
competent agent only needs occasionally.

## Skill Layer

One directory per skill. `SKILL.md` carries frontmatter whose `description` is
the routing contract; `references/` carries detail loaded on demand; `scripts/`
carries anything mechanical.

Good skills: session orchestration, research, meeting recap, planning challenge,
implementation, discipline, code review, architecture review, document writing,
prompt design.

Bad skills: one-off project notes, private relationship context, a single
customer workaround, secrets, or long raw examples that belong in docs.

Full authoring rules: `skills/README.md`.

## Context Layer

Conditional by definition. Loaded only when the task needs it: person
preferences, project guidance, customer background, prior decisions, research
notes.

Every context file needs an owner and a trigger. If nobody can say when it
should load, it does not belong in a runtime — it belongs in a document.

## Overlay Layer

Only once a second runtime exists. Provider-specific behavior — model names,
effort values, thinking controls, subagent mechanics, tool quirks — goes here,
never into a shared skill. A shared skill that names one provider's models has
stopped being shared.

## Session Logs

Worth it when work spans multiple turns, workers, or context windows. Structure:
raw input, goal and success criteria, workmode, decisions and reversals,
blockers and friction, delegated work, verification evidence, completion.

Two artifacts with different jobs, and the split is the point:

- **`session.jsonl`** — append-only audit trail. Raw input stored verbatim
  *before* summarizing.
- **`state.md`** — compact working memory. What a fresh chat or worker reads
  instead of replaying the conversation.

That split is what survives context compaction. One file trying to be both is
either too long to load or too lossy to trust.

Never put sensitive raw logs in a repo that leaves the machine.

## Deployment

With one runtime, edit the files in place; there is nothing to deploy.

With several, keep one source directory and either symlink or copy out per
target with a small script. Assembly per target is: identity, work policy, that
runtime's overlay, shared skills, that runtime's skills, tools and hooks.

Context is never assembled into a prompt. It is loaded deliberately, by a skill
or by an explicit need.
