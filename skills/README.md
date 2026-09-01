# Writing Skills That Actually Fire

Read this before installing or writing any skill. It is short, and it is the
difference between a skill library and a folder of documents nobody loads.

## The Shape

One directory per skill:

```text
<skill-name>/
├── SKILL.md            # frontmatter + the procedure
├── references/*.md     # detail loaded only when SKILL.md sends you there
├── scripts/*           # executable helpers
└── evals/evals.json    # the routing contract (optional, cheap, worth it)
```

`SKILL.md` frontmatter:

```yaml
---
name: leitstand
description: <one paragraph — see below; this is the router>
argument-hint: "[mode|<objective>]"      # if the runtime supports invocation args
allowed-tools: Read, Grep, Glob, Bash    # if the runtime supports narrowing tools
---
```

Runtimes differ in which keys they honor. Keep `name` and `description` always;
drop the rest when the runtime ignores them rather than leaving inert metadata
that implies a capability the runtime does not have.

## The Description Is The Product

The agent decides whether to load a skill from its `description` alone — usually
without the body in context. A perfect procedure behind a vague description
never runs.

Write it in three parts:

1. **What it does**, in one clause.
2. **When to use it** — the concrete situations *and the user's actual phrasing*,
   including dictated and non-English variants if that is how they talk.
3. **When not to use it** — the near-misses, and where those belong instead.

```yaml
# weak — matches everything and nothing
description: Helps with code review.

# strong
description: >
  Line-level code review with hard decline gates. Use after implementation, when
  the user asks to review a diff, PR, branch, or file, when pasted findings need
  judging, or before merge confidence. Architecture fit belongs in dev-review;
  verification mechanics belong in discipline. This skill declines, it does
  not negotiate.
```

The "not for" clause does as much work as the trigger list. Skills that fire on
unrelated turns burn context on every single one.

## Body Rules

- **Procedure, not philosophy.** If a line does not change what the agent does
  next, delete it.
- **Contracts beat prose.** Name the output shape explicitly — sections, order,
  and what must never appear.
- **Gates, not suggestions.** "Do not continue until X" beats "consider X".
- **One job per skill.** When a skill grows a second personality, split it and
  cross-reference.
- **Push detail into `references/`.** SKILL.md stays the map; references hold the
  territory. Say exactly when to read each one.
- **Reference files carry no `name`/`description` frontmatter.** A reference that
  looks like a skill gets indexed as one and fires out of context.
- **Scripts over instructions** for anything mechanical. A twelve-step "create
  this folder structure" section is a script that has not been written yet.

## Gotchas

When a correction repeats, it becomes a `## Gotchas` entry in the skill that
should have prevented it — not a note in a session log nobody rereads:

```markdown
## Gotchas

- Reading only the diff hides a caller that still passes the old shape. Grep for
  call sites before judging a signature change.
```

This is how the library gets sharper instead of just bigger.

## Evals: The Routing Contract

The observed failure class is routing drift, not broken bodies — and it shifts
under you every time the underlying model changes. Freeze the contract:

```json
{
  "version": 1,
  "skill": "leitstand",
  "cases": [
    {"id": "long-dictation", "prompt": "<a real dictated request, verbatim>", "expect": "trigger"},
    {"id": "multi-step-build", "prompt": "<a real multi-component request>", "expect": "trigger"},
    {"id": "single-lookup", "prompt": "was macht Zeile 40 hier?", "expect": "no-trigger"},
    {"id": "plain-planning", "prompt": "was hältst du von dem Ansatz?", "expect": "no-trigger"}
  ]
}
```

Five should-trigger and two or three near-miss cases per skill is enough. Use
the user's real phrasing, including their dictation quirks — synthetic prompts
prove nothing about a runtime that will only ever see the real ones.

Grade on a structured skill or tool event, not on how the answer reads. An
answer that merely sounds like the skill is `behavioral-only`, not a pass.
Before re-tuning for a new model generation, capture the baseline on the old
model first, then change one variable at a time.

## Day Two

The library improves through friction, not through planning:

1. Something goes wrong.
2. Ask: did the right skill fail, or did the wrong skill load?
3. Wrong skill loaded, or none did → fix a `description`.
4. Right skill, wrong output → fix the body, add a `## Gotchas` line.
5. Neither fits → that is a new skill. Write the description first.

Nine mediocre skills are worse than three sharp ones. Add on evidence, not on
imagined future need.

## Development Set

These skills are deliberately separate. Bundle them in the Starter so a user
can add the one their work actually calls for; do not install all of them by
default.

| Work | Skill |
|---|---|
| Long-running, multi-step work | `leitstand` |
| Planning pressure | `challenge` |
| Change orchestration | `implementation` |
| Tests, debugging, and proof | `discipline` |
| Architecture fit | `dev-review` |
| Line-level shippability | `code-review` |
| Canonical domain terms | `domain-language` |
| Product UI work | `ui` |
| Requested GitHub PR loop | `github-pr` |
| Commit and PR prose | `change-notes` |

The handoffs are intentional: `implementation` sequences delivery;
`discipline` supplies evidence; `dev-review` judges design; `code-review`
judges a finished diff. Do not collapse those jobs into a single broad skill.
