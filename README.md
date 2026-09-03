# Stellwerk Starter

Stellwerk Starter is a public source library for building an agent runtime you
own. It is not a preconfigured assistant, a SaaS product, or a prompt to paste
into every chat.

It gives you a working model for four separate layers:

```text
identity/       who the agent is and how it communicates
work-policy/    act/ask, scope, verification, and privacy rules
skills/         conditional workflows with their own contracts and scripts
context/        your private people, projects, customers, and decisions
```

The separation is the point. Identity and policy are always on. Skills load
only when their task matches. Context stays private and is loaded only when it
is actually needed.

## Start Here

Get a local Starter checkout, then create an empty folder for your own runtime
repository:

```bash
git clone https://github.com/sebastian-breitzke/stellwerk-starter.git
mkdir my-skill-library
cd my-skill-library
```

Start a new Claude, Codex, or equivalent agent session in that empty folder and
point it at the Starter checkout with this prompt:

```text
I want to build my own agent skill library in this repository.
Read <path-to-stellwerk-starter>/AGENTS.md, then follow
<path-to-stellwerk-starter>/onboarding/BUILD-YOUR-SKILL-LIBRARY.md.
Treat the Starter as source material. Build and explain my own source
repository, deployment path, and initial skill set. Do not copy private
context from the Starter.
```

The agent will inspect the empty repository and your local runtime, ask one
focused round of questions, propose the exact files it will create, and then
build and verify the result. It stops before writing outside the chosen
repository or before any other meaningful external action.

For the full agent workflow, read
[Build your Skill Library](onboarding/BUILD-YOUR-SKILL-LIBRARY.md).

## What You Are Getting

You are getting portable, working source material and a way to make it yours.
You are not getting another person's identity, private context, secrets, or
machine paths.

| Part | What it gives you | What you make your own |
|---|---|---|
| Identity templates | Role, tone, and non-negotiables | Your voice and working relationship |
| Work policy | Safe act/ask boundary, verification, scope, privacy | Your authority, repositories, and quality bar |
| Skill packages | Complete task workflows, including references and scripts | The packages you select and any domain-specific extensions |
| Deployment model | One source repository with runtime-specific assembly | Your target runtimes and deploy script |
| Context boundary | A clear place for private knowledge | Your people, projects, customers, and decisions |

## Skill Packages

Start small. A sharp library with three skills that route reliably beats a
folder of twenty that never fire.

| Package | Use it for | Why it is separate |
|---|---|---|
| Operating core | `leitstand`, `ax-review`, `bro`, `smb-pragmatism` | Durable work, agent experience, and clear operating decisions |
| Development | `dev-challenge`, `dev-implement`, `dev-discipline`, `dev-review`, `dev-code-review`, `dev-domain-language`, `dev-ui`, `dev-github-pr`, `dev-change-notes` | Planning, implementation, proof, review, UI, language, and PR work are different jobs |
| Writing and prompt design | `functional-writing`, `prompt-creation-review`, `unslop`, `tone-of-voice` | Durable human prose and model-facing contracts need different quality gates |
| Research and media | `brave-search`, `research`, `transcription`, `youtube-research` | Retrieval, synthesis, transcription, and video analysis have different prerequisites and evidence rules |
| Collaboration | `meeting-recap` | Shareable meeting facts stay separate from private working notes |
| Local setup | `secret-resolution` | Credentials stay in a local secret manager, never in prompts or repositories |

The complete package map and each skill's purpose live in
[skills/README.md](skills/README.md).

## Build a Source Repository, Not a Pile of Copies

Your own repository becomes the source of truth. The Starter is the reference
you selectively import from.

Keep that source repository private by default. If you later share it, private
context belongs outside the repository or in ignored local files — a folder
named `context/` does not create a privacy boundary by itself.

The agent will guide you through this sequence:

1. Detect the runtime, existing instructions, repository state, and available
   local secret manager.
2. Create or confirm your own Git repository and its source layout.
3. Choose a small initial package set and copy complete skill directories — not
   only `SKILL.md`, but also their `references/`, `scripts/`, `agents/`, and
   `evals/` when present.
4. Write your private identity and policy. Do not import anyone else's.
5. Create a deploy script when you use more than one runtime. It assembles the
   selected source layers into each runtime's native location.
6. Configure secret routing, verify the runtime, and run one small real task.

Do not hand-maintain copies in several runtime folders. One source repository
plus a small deploy script is the canonical path once you use more than one
runtime.

## Secrets Stay Local

Skills can name a credential they need. They must never ask you to paste its
value into chat or store it in a repository.

We recommend [hort](https://github.com/sebastian-breitzke/hort) as a local
secret and configuration manager. Install and configure it before enabling a
skill that needs a key, such as Brave Search or OpenRouter transcription. The
agent should use your approved local secret manager and retain only entry names,
never values.

## Before You Share Anything

The method is public. Your operating context is not.

Never publish personal profiles, stakeholder notes, customer data, local paths,
hostnames, transcripts, session logs, token names, or secret values. Read
[privacy-and-sharing.md](privacy-and-sharing.md) before sharing your own
library.

## Deeper Reference

- [Agent entry point](AGENTS.md) — the instruction an agent follows
- [Build your Skill Library](onboarding/BUILD-YOUR-SKILL-LIBRARY.md) — the
  step-by-step agent workflow
- [Architecture](architecture.md) — why the layers stay separate
- [Skill packages](skills/README.md) — what each package does
- [Runtime placement](install/runtimes.md) — likely locations per agent runtime
