---
name: prompt-design
description: >
  Write and review model-facing text: system prompts, agent instructions, skill
  files, tool and MCP contracts, subagent prompts, structured-output contracts,
  and review prompts. Use whenever the artifact being written is read by a model
  rather than by a person — including the prompts this runtime uses on itself.
  Not for human-facing prose (functional-writing) and not for code changes with
  no model-facing text.
---

# Prompt Design

Prompts are contracts. Small, explicit, grounded, testable.

## Layers, Same Discipline

| Layer | Must contain |
|-------|--------------|
| Base prompt | role, durable behavior, boundaries, output contract |
| Skill | trigger conditions in the description, procedure, output shape, gates |
| Subagent prompt | one scope, stop condition, output shape, allowed sources |
| Checkpoint prompt | what is done, what is blocked, what to verify next |
| Review prompt | what to inspect, what counts as a finding, what evidence is required |

Do not invent a looser second style for "just an internal prompt". A vague
subagent prompt fails in exactly the same way as a vague system prompt, only
less visibly.

## Checklist

Before finalizing:

- The task is one sentence. Vague verbs — help, improve, handle, manage — are
  replaced or followed by concrete requirements.
- Success is observable. Someone else could tell whether it was met.
- The output format is explicit: sections, order, and what must never appear.
- Grounding is stated: which sources may be used, whether general knowledge is
  allowed, what to do when information is missing.
- Tool and action rules are stated: when to use tools, what requires approval,
  what counts as irreversible.
- Instructions, context, examples, and input data are visibly separated.
- Examples earn their place. An example that narrows the task accidentally is
  worse than no example.
- Constraints are stated positively where possible. Long walls of prohibitions
  get partially ignored.
- No undocumented model behavior is relied on.
- Nothing contradicts another layer.
- It is no longer than it needs to be.

## Subagent Prompts

For every worker prompt, three decisions must be explicit, never implicit:

1. **Context transfer** — fresh, bounded, or full history. In a runtime that
   inherits by default, saying nothing is a decision you did not make.
2. **Model tier** — the cheapest that carries the judgment and risk involved.
3. **Effort** — where the runtime exposes it.

Plus: owned scope, forbidden area, stop condition, and the exact return shape.

## Review Output

```text
Goal
<what this prompt is supposed to achieve>

Assessment
<what already works — briefly>

Risks and mismatches
<concrete failure modes, each tied to a line>

Revised prompt
<the full replacement, ready to paste>

Why these changes
<one line per material change>
```

Return the revised prompt in full. A list of suggested edits shifts the assembly
work onto the reader and loses half the improvements.

## Anti-Patterns

- goals like "help improve this"
- long global prompts holding what should be a skill
- undocumented tool assumptions
- missing completion criteria
- examples that teach the wrong output shape
- instructions that conflict across layers
- a checkpoint or thinking prompt that can be mistaken for the final answer

## Gotchas

- Model-facing text degrades silently. Nothing errors when a prompt stops
  triggering — the behavior just quietly gets worse. Keep trigger cases beside
  the prompt (`skills/README.md`) and re-run them when the model changes.
