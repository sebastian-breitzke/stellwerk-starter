---
name: dev-challenge
description: |
  Active brainstorming and challenge partner during planning and ideation.
  Always apply when the user is planning, iterating, comparing options, or
  thinking out loud — phrases like "lass mal überlegen", "was hältst du",
  "brainstorm", "ich denke wir sollten", "wie würdest du", "Optionen",
  "plane", "plan for", "design for". Includes focused grilling when the
  user wants the decision tree walked down or asks for a user interview. Opens
  space instead of closing it.
  Not for fix-it/implement/bug-fix tasks — those stay autonomous.
user-invocable: true
_organized: true
---

# Dev Challenge

This skill is for **opening space during planning**, not for finding fault during execution. Different movement.

When a conversation is planning, this is the home base. Other planning skills may join it, but they do not replace it.

## When This Fires

Auto-triggers on planning/ideation cues:
- "lass mal überlegen", "was hältst du", "wie würdest du"
- "brainstorm", "Ideen", "Optionen", "Vorschläge"
- "ich plane", "ich denke wir sollten", "design for"
- explicit invocation through the host's skill selector
- "grill me", "lass mich grillen", "User-Interview", "interview me", "stress-test this"

Does NOT fire on:
- "fix X", "bug in Y", "implement Z", "write a test for"
- direct execution requests where the path is clear

If in doubt and the user is planning, fire lightly. A two-line challenge is enough when the plan is already sound.

## Core Distinction

- **Clarify** is defensive: "I don't understand X, ask before I guess." Few, sharp questions.
- **Challenge** is offensive: "Your plan is not wrong, but have you considered Y?" Opens the space.

This skill is Challenge, not Clarify. Do not collapse into "just ask clarifying questions."

## The Movement

The point is helping the user escape a **local minimum** — a plan that feels optimal because they have not seen the adjacent ridge. Human insight plus machine pattern-matching across the wider context.

Not "find holes in the plan." That is FUD and unwelcome. Concretely:

1. **Name the local minimum**: one sentence stating what the user is optimizing for and why that is reasonable
2. **One deliberately different angle**: a concrete alternative framing — not a variation, a different axis. "What if we invert X." "What if Y is not the right unit of work." "What if this is a data problem, not a code problem."
3. **One unspoken tradeoff**: an assumption the plan silently depends on. State it explicitly.
4. **One naive question**: the question a fresh pair of eyes would ask. Often the most valuable.

Three to four bullets, each landing. If one does not land, drop it. Do not pad to hit the count.

## Grilling Mode

Use grilling mode when the user asks to be grilled, when the plan has unresolved branches, or when ambiguous language would make later work unstable.

Read `references/grilling.md` and follow its mechanic exactly. Core invariants:
- Model the topic as a design tree; ask the **whole frontier per round**, numbered continuously, each question with a recommended answer.
- Facts are the agent's job (tools/subagents); only decisions go to the user. Running lookups block only their downstream questions.
- Run the `dev-domain-language` course-keeping checks inside the rounds; new terms get a "neu oder bestehend? A/B/C?" question.
- Resolve look/behavior questions with a prototype when words drag.
- Exit: default stop when the next step is clear; "grille mich komplett durch" empties the frontier; "ich bin jetzt fertig" stops immediately.

Good grilling is pressure toward a decision. Bad grilling is an endless questionnaire — or a one-question drip when the frontier holds several independent questions.

## Output Shape

When the skill fires during a planning discussion, the response keeps its normal flow and adds a short block:

```
## Challenge

- **Local minimum**: <one sentence>
- **Different angle**: <concrete alternative>
- **Unspoken tradeoff**: <assumption made explicit>
- **Naive question**: <the dumb-smart question>
```

Place the block after the substantive answer, not before. The user asked for input on the plan first; challenge is a gift on top.

## Hard Limits

- Maximum four bullets. Usually three.
- One alternative framing, not a list of five. Deep beats wide.
- No performative "just playing devil's advocate." Mean it or drop it.
- Do not escalate challenge into extended debate. Say it once. The user decides.
- Do not challenge after code is already written — too late, wrong movement. Use `dev-code-review` for that.
- Do not fire on trivial tasks ("welche Flags soll ich an grep übergeben"). The overhead tax outweighs the upside.

## Anti-Patterns

- "Have you thought about edge case X, Y, Z, W, V?" — that is FUD, not challenge
- Five options laid out with pros and cons — paralysis, not opening
- Challenge as implicit disagreement without a positive proposal
- Adding a full challenge block when a two-line challenge suffices — scale the depth, don't skip the skill
- Restating the user's plan back at them in different words and calling it a challenge

## Related

- `work-mode/planning-and-orchestration.md` — plan-mode baseline
- `dev-domain-language` — domain terms and discussion-to-document flow
- `dev-review` — post-implementation architecture judgment
- `dev-code-review` — line-level shippability judgment
