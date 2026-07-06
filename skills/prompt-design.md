# Skill Blueprint: Prompt Design

Prompt Design is for writing or reviewing instructions that steer model
behavior.

Use it for:

- system prompts
- agent instructions
- skill files
- tool contracts
- subagent prompts
- review prompts
- structured output instructions

## Purpose

Create prompts that are small, explicit, grounded, and testable.

## Checklist

Before finalizing a prompt, check:

- task is stated in one sentence
- success criteria are observable
- output format is explicit
- sources and grounding are clear
- tool-use rules are clear
- high-risk actions require approval
- examples help rather than narrow the task accidentally
- provider-specific notes are separated from the base prompt

## Layering

Use different prompt shapes for different jobs:

- **base prompt:** durable behavior and boundaries
- **subagent prompt:** narrow scope, stop condition, output shape
- **checkpoint prompt:** state, blocker, next verification
- **review prompt:** what to inspect and what counts as a finding

Do not hide a second style inside subagent prompts. Use the same discipline at
every layer.

## Output Shape For Reviews

```text
Goal

Prompt Quality Assessment

Risks Or Mismatches

Revised Prompt

Why These Changes
```

## Anti-Patterns

- vague goals such as "help improve this"
- long global prompts that should be skills
- undocumented tool assumptions
- missing completion criteria
- examples that teach the wrong output
- instructions that conflict across layers
