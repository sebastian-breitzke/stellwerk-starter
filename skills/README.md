# Skill Packages

Skills are conditional task contracts. Each lives in its own directory so the
agent can load the procedure, references, scripts, and evals only when the task
matches. A Skill directory is one unit: do not copy only its `SKILL.md`.

Choose packages from the work the user actually does. Start with two or three
Skills, run real work, and add the next package when evidence says it is useful.

## Operating Core

| Skill | Job | Add it when |
|---|---|---|
| `leitstand` | Keep substantial work durable through raw input, state, decisions, delegation, and verification | Work crosses turns, components, or agents |
| `ax-review` | Review a repository's agent experience and operating guidance | The runtime itself needs a health check |
| `bro` | Make a requested response shorter without adding analysis | The user wants a tighter version of existing content |
| `smb-pragmatism` | Keep architecture and scope right-sized | The user makes build-versus-buy or complexity decisions |

## Development Foundation

| Skill | Job | Add it when |
|---|---|---|
| `dev-challenge` | Pressure-test a plan before implementation | Planning or design choices need a second angle |
| `dev-implement` | Orchestrate a meaningful delivery Slice | Changes span planning, implementation, proof, and review |
| `dev-discipline` | Test, debug, and produce evidence | The user builds or repairs software |
| `dev-review` | Judge architecture and design fit | An approach needs a go/no-go decision |
| `dev-code-review` | Judge a finished diff line by line | A change needs shippability review |
| `dev-domain-language` | Keep product, code, and documentation terms aligned | The repository has an established domain language |
| `dev-ui` | Guard product-honest UI work | The user changes or reviews visible UI |
| `dev-github-pr` | Run an explicit GitHub PR follow-up loop | Team PR work needs review or CI handling |
| `dev-change-notes` | Write commit and PR prose | Changes need human-readable summaries |

## Writing and Prompt Contracts

| Skill | Job | Add it when |
|---|---|---|
| `functional-writing` | Create durable operational and technical prose | The user writes docs, specs, runbooks, or decisions |
| `prompt-creation-review` | Design and review prompts, Skills, and tool contracts | The user changes model-facing instructions |
| `unslop` | Remove filler without changing facts or intent | The user wants a conservative prose cleanup |
| `tone-of-voice` | Build a private writing-voice profile | The agent should write consistently in the user's own voice |

## Research, Media, and Meetings

| Skill | Job | Add it when |
|---|---|---|
| `brave-search` | Retrieve web results through Brave Search | The user has a Brave API key in a local secret manager |
| `research` | Produce source-backed synthesis | Decisions need current or cited evidence |
| `transcription` | Turn local media into plain-text transcripts | The user has local media and an approved transcription setup |
| `youtube-research` | Analyze YouTube sources | Video captions or evidence matter |
| `meeting-recap` | Separate shareable recap from private working notes | Calls need decisions and follow-up extracted |

`brave-search` and `transcription` are setup-gated. Configure their credentials
in an approved local secret manager before enabling them. `research` works with
native web retrieval when Brave is unavailable.

## Local Secret Routing

| Skill | Job | Add it when |
|---|---|---|
| `secret-resolution` | Resolve local operator credentials without exposing values | Any selected Skill needs a token, key, endpoint, or local configuration |

We recommend [hort](https://github.com/sebastian-breitzke/hort) when the user
does not already have an approved local secret manager. It stores local values;
the Skill library contains only entry names and routing rules.

## Copy and Adapt Rules

1. Copy a selected Skill's complete directory.
2. Keep its portable safety and verification rules intact.
3. Adapt its `description` to the user's vocabulary only when routing would
   otherwise be wrong.
4. Replace user-specific placeholders, paths, and commands with verified local
   facts.
5. Do not copy another person's identity, private context, customer systems,
   vault data, or session history.
