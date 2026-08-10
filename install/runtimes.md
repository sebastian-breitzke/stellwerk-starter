# Runtimes

Where the four layers actually land, per runtime.

**Verify before you write.** Agent runtimes move their config paths between
versions. Treat the table below as where to look first, not as ground truth:
check that the directory exists, check the runtime's current documentation if it
does not, and tell the user when you had to deviate. Never invent a path.

## Detection And Placement

| Runtime | Detect | Always-on layer | Skill layer | Subagents |
|---------|--------|-----------------|-------------|-----------|
| Claude Code | `~/.claude/` | `~/.claude/CLAUDE.md` (global), `./CLAUDE.md` (repo) | `~/.claude/skills/<name>/SKILL.md`, `./.claude/skills/…` | `~/.claude/agents/*.md` |
| Codex CLI | `~/.codex/` | `~/.codex/AGENTS.md` (global), `./AGENTS.md` (repo) | one file per skill next to the instructions, referenced by name | via CLI, no per-skill definition file |
| GitHub Copilot | `.github/copilot-instructions.md`, `~/.copilot/` | `.github/copilot-instructions.md` | path-scoped instruction files where supported | none |
| Gemini CLI | `~/.gemini/` | `~/.gemini/GEMINI.md` (global), `./GEMINI.md` (repo) | referenced documents; index the descriptions in the main file | none |
| Cursor | `.cursor/` | `.cursor/rules/*.mdc` | one rule file per skill with its own trigger description | none |
| Anything else | ask | the one file it always reads | referenced documents | assume none |

`AGENTS.md` is the closest thing to a cross-runtime convention. When a runtime
is unknown, write `AGENTS.md` in the repo root and point the runtime's own
instructions file at it with one line.

## Capability Mapping

Ask three questions about the runtime, then map:

**1. Does it load instructions conditionally (skills, rules with triggers)?**

- Yes → install skills as separate files. The `description` is the router.
- No → put a one-line trigger for each workflow in the always-on file, keep the
  body in a referenced document, and instruct: *"When the task matches, read
  `<path>` and follow it."* Tell the user the tradeoff: it costs a read, and the
  agent may skip the read under pressure.

**2. Does it have subagents?**

- Yes → the `leitstand` delegation section applies as written. Give each worker
  a bounded prompt with owned scope, stop condition, and output shape.
- No → delegation becomes sequencing in one thread. Keep the phase discipline,
  drop the fan-out, and lean harder on `state.md` so context compaction does not
  eat the session.

**3. Does it have hooks or lifecycle events?**

- Yes → a stop-hook or post-tool hook can enforce the verification gate
  mechanically instead of by instruction. Suggest it; do not install it unasked.
- No → the gate stays a policy line, which is weaker. Say so once.

## Multi-Runtime Users

If the user runs more than one runtime, do not maintain parallel copies by hand.
Pick one:

- **Single source, symlinks.** Keep the real files in one directory and symlink
  each runtime's expected path to it. Simplest, breaks if a runtime rejects
  symlinks.
- **Single source, deploy script.** Keep sources in one repo and copy them out
  per target with a small script. This is what the runtime this starter came
  from does; it is worth the ~50 lines once a second runtime appears.
- **One runtime, on purpose.** Entirely reasonable. Suggest it if the second
  runtime is barely used.

Provider-specific behavior — model names, effort settings, thinking controls,
tool quirks — belongs in a per-runtime overlay file, never in a shared skill.
A shared skill that names one provider's models stops being shared.

## Placement Rules

- The always-on file is a budget, not a bucket. Under 200 lines, and every line
  must change behavior in most sessions.
- Repo-scoped instructions beat global ones for anything repo-specific: build
  commands, test commands, deploy paths, domain vocabulary.
- Global instructions hold identity, voice, and universal policy only.
- Never write the same rule at both scopes. When they conflict, the agent
  follows the wrong one at the worst moment.
