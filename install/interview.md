# Interview

Eight blocks. Ask them in **one message**, grouped, each with your recommended
default marked. The user should be able to answer with eight letters, or with
"defaults are fine".

Rules:

- Skip any block you already answered in Phase 1 detection — state your finding
  instead and let the user correct it.
- Do not add blocks. If something else matters, it is a Phase 4 detail, not a
  question.
- Recommend, do not survey. Every block below has a default for a reason; say
  which one you recommend for *this* user based on what you detected.

---

## Block 1 — Scope

Where should this runtime live?

- **A. Global** — every project this user's agent touches. *(recommend when they work across many repos)*
- **B. This repo only** — checked in, shared with whoever clones it. *(recommend for a team repo)*
- **C. Both** — thin global identity, repo-specific work policy and skills.

Records: `scope`, `install_paths`.

---

## Block 2 — Autonomy

How far should the agent go before checking in?

- **A. Ask before any file change.** Safe, slow. For high-stakes or regulated work.
- **B. Act on reversible things, ask before irreversible ones.** *(recommended default)* Edits, tests, and reads proceed; pushes, deploys, deletions, messages, and schema changes stop for approval.
- **C. Act until blocked.** Only stop at a real blocker or an external side effect. For solo work in disposable branches.

Records: `autonomy`. Drives `work-policy/execution.md`.

---

## Block 3 — Verification strictness

What counts as "done"?

- **A. Evidence for everything.** Every change carries a run command and its output. Slower turns, near-zero false "done".
- **B. Evidence matched to risk.** *(recommended default)* Logic, data, security, and contracts always get a real check; typo fixes and docs get a read-through.
- **C. Evidence on request.** The agent reports what it did and runs checks when asked.

Also ask, as one line: **what is the command that proves a change works here?**
(`npm test`, `pytest -q`, `go test ./...`, `dotnet test`, a build, a lint.) You
detected candidates in Phase 1 — offer them.

Records: `verification_plan`, `verify_command`. Drives
`work-policy/verification.md` and the `dev-discipline` skill.

---

## Block 4 — Integration mode

How does finished work get in?

- **A. Solo main.** Work in a worktree or branch, verify, commit, merge to local `main` often. No PR, no push unless asked. *(recommend for private/solo repos)*
- **B. Branch and PR.** Everything goes through a PR with CI and review; merge only on approval. *(recommend when you detected branch protection, `CODEOWNERS`, or a team remote)*
- **C. Direct to main.** Small repos, single author, no ceremony.

Records: `workmode`. Drives `work-policy/coding.md` and the leitstand workmode gate.

---

## Block 5 — Session memory

Long tasks lose their thread across context compaction. Do you want a durable
session log?

- **A. Full session store.** *(recommended default when the user runs multi-hour or multi-agent tasks)* Append-only `session.jsonl` plus a compact `state.md`, with scaffold and audit scripts. Survives compaction and hands off cleanly to a fresh chat.
- **B. State file only.** One `state.md` per task, no event log. Lighter, still survives compaction.
- **C. None.** Everything stays in chat.

If A or B: **committed or gitignored?** Default gitignored.

Records: `session_store`, `session_root`, `session_tracked`. Drives the
`leitstand` skill.

---

## Block 6 — Workflows

Which of these does the user actually do in a normal week? Install two or three
now, not nine. More can be added any time in two minutes.

- `leitstand` — orchestrate long, multi-step work; keep goal, decisions, and delegation straight *(the core of this starter — recommend unless the user only does one-shot tasks)*
- `dev-discipline` — test, debug, and prove changes *(recommend always; it is small)*
- `dev-implement` — disciplined change slices
- `dev-code-review` — line-level review with hard decline gates
- `dev-review` — architecture and approach fit
- `dev-challenge` — pressure-test a plan before building it
- `dev-domain-language` — keep product and code terminology aligned
- `ui` — product-specific UI development and review
- `dev-github-pr` — requested PR follow-up and review-thread triage *(team PR work only)*
- `change-notes` — human-readable commit and PR descriptions
- `research` — source-backed answers instead of confident memory
- `meeting-recap` — transcripts to decisions, actions, and follow-up
- `prompt-creation-review` — writing and reviewing prompts, skills, and tool contracts
- `functional-writing` — durable docs, specs, runbooks, decision records
- `person-context` — durable collaboration preferences for people they work with

Records: `skills`.

---

## Block 7 — Voice

How should the agent talk?

- **Language:** the language of their messages, or an explicit choice. Mixed is fine — say so if it is.
- **Register:** *(pick one)*
  - **Direct partner** *(recommended default)* — first sentence is the answer, evidence before adjectives, disagrees when the plan is weak.
  - **Neutral professional** — factual, no pushback unless asked.
  - **Terse** — minimum words, no framing, no summaries.
- **One thing the agent should stop doing.** Free text. This is where preambles, over-explaining, emoji, apologizing, and "Great question!" go to die.

Records: `language`, `register`, `stop_doing`. Drives `identity/role-and-tone.md`.

---

## Block 8 — Boundaries

Two short questions:

- **Secrets:** which manager do you use? *(you may have detected `op`, `pass`, `bw`, `gopass`, `vault`)* — the runtime will reference entry names, never values.
- **Off limits:** anything the agent must never touch or must always ask about first? Production, customer data, infra repos, a specific directory, a payment or messaging integration.

Records: `secret_manager`, `never_touch`. Drives `work-policy/privacy.md`.

---

## After The Answers

Write the profile, show the plan, get the go. Do not start writing files from
inside the interview turn.

## Anti-Patterns

- Asking which runtime they use when `~/.claude/` exists.
- Asking twenty questions across twenty turns.
- Offering nine skills as equals with no recommendation.
- Accepting "make it good" as an answer to Block 3 — push once for the actual
  command; a verification policy with no command in it is decoration.
- Treating the answers as suggestions. The profile is a contract; if you deviate
  in Phase 4, say so and why.
