# Install Procedure

Six phases. Run them in order. Do not skip Phase 1 (you will ask questions you
could have answered yourself) and do not skip Phase 5 (an unverified install is
not an install).

---

## Phase 0 — Orient

State to the user, in two or three sentences:

- what you are about to install (identity, work policy, skills, optional session log)
- that it lives in their own files and they can delete any of it
- that you will ask one round of questions first

Then continue. Do not wait for approval here; approval belongs at the end of
Phase 3, where the plan is concrete.

---

## Phase 1 — Detect

Find these yourself. Every answer you discover here is a question you must not
ask in Phase 2.

| Fact | How to find it |
|------|----------------|
| Runtime(s) in use | `install/runtimes.md` detection column — check for `~/.claude/`, `~/.codex/`, `~/.config/github-copilot/`, `~/.gemini/`, `.cursor/`, etc. |
| Existing agent instructions | `CLAUDE.md`, `AGENTS.md`, `.github/copilot-instructions.md`, `GEMINI.md`, `.cursorrules` in home and in the current repo |
| Existing skills or commands | `~/.claude/skills/`, `~/.claude/commands/`, `.claude/`, equivalents per runtime |
| Repo vs. global scope | is the working directory a git repo? does it have a remote? |
| Team or solo repo | remote org, branch protection, presence of PR templates, `CODEOWNERS`, CI config |
| Primary languages and test command | manifest files (`package.json`, `pyproject.toml`, `go.mod`, `*.csproj`, `Cargo.toml`) and their script sections |
| Secret manager | `op` (1Password), `pass`, `bw`, `gopass`, `vault`, or a project `.env.example` |
| Working language | the language of the user's own messages and their existing docs |

Report what you found in one compact block before asking anything. The user
correcting your detection is faster and more accurate than the user answering
questions about their own filesystem.

---

## Phase 2 — Interview

Run `install/interview.md`. One batched round. Eight blocks, each with a
recommended default.

Stop conditions:

- the user answers every block, or
- the user says "defaults are fine" — then take every recommendation, and
- always: if the user contradicts a detected fact, the user wins; note it.

---

## Phase 3 — Profile And Plan

Write `install/profile.md`'s template into the user's chosen scope as
`stellwerk-profile.md`. This file is the record of every decision and the input
for later re-installs and upgrades.

Then show the plan, concretely:

```text
Plan
- Write <path>            (identity, ~N lines)
- Write <path>            (work policy, ~N lines)
- Install skill <name>    -> <path>
- Install skill <name>    -> <path>
- Create <path>           (session log root)   [only if the user chose logging]
- Back up <existing file> -> <path>.bak        [only if something exists]

Verification after install: <the three checks from install/verify.md>
```

Get an explicit go before Phase 4. This is the only mandatory approval gate.

---

## Phase 4 — Install

Order matters: base layer first, then skills, so the skills have policy to lean on.

1. **Identity.** Start from `identity/role-and-tone.md`. Replace every
   placeholder with the user's actual answers. Cut any line that does not change
   behavior. Target 40 lines.
   Placeholder convention across all templates: `<…>` is something you must
   replace, and `<Block N = A: "…">` is a variant to keep only when the user
   picked that option — keep one, delete the siblings, drop the brackets. No
   angle bracket survives into an installed file.
2. **Work policy.** Start from `work-policy/`. Install `execution.md`,
   `verification.md`, and `routing.md` always. Install `coding.md` if the user
   writes code — almost always yes. Install `privacy.md` if they handle customer
   data, work in a company repo, or plan to share the runtime. Merge into a
   single file when the runtime supports only one instructions file; keep the
   section headings so the layers stay legible.
3. **Skills.** For each selected skill: copy the directory, then rewrite it.
   - Rewrite `description:` for this user's vocabulary — this is the routing
     contract and the highest-leverage line in the file (`skills/README.md`).
   - Replace every `<placeholder>` with real paths, commands, and terms.
   - Delete sections the user does not need. A shorter skill that fires reliably
     beats a complete one that never does.
   - Map to the runtime's native mechanism per `install/runtimes.md`. If the
     runtime has no skill concept, put the trigger line in the always-on file and
     the body in a referenced document, and tell the user the tradeoff.
4. **Session store.** If the user chose logging, create the log root and copy
   `skills/leitstand/scripts/`. Add the root to `.gitignore` unless the user
   wants sessions committed.
5. **Migration.** Fold any pre-existing instructions into the new layers, then
   delete or archive the old file. Do not leave two live sources of truth.

---

## Phase 5 — Verify

Run `install/verify.md`. Three checks, all cheap:

1. **Structure** — files exist where the plan said, always-on layer is under the
   budget, no placeholder survived, no secret is present.
2. **Routing** — for each installed skill, the trigger prompt selects it and the
   near-miss prompt does not.
3. **One real task** — run a small real piece of the user's work through the new
   setup and show the output.

Show the actual output. "Should work" is not a result.

---

## Phase 6 — Report And Hand Over

Return the report shape from `AGENTS.md`, then give the user the day-2 loop in
two sentences:

- When the agent does the wrong thing, the fix is usually the skill's
  `description`, not its body — the failure is routing, not procedure.
- When a correction repeats, add it as a `## Gotchas` line in the skill that
  should have prevented it.
