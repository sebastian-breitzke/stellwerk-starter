---
name: prompt-creation-review
description: Create, review, and maintain prompts, system prompts, skills, agent instructions, MCP/tool contracts, structured-output contracts, and provider overlays for OpenAI, Anthropic, and Gemini. Use automatically when writing or changing any model-facing text, including subagent, review, thinking, or checkpoint prompts. Not for human-facing prose (functional-writing) and not for code changes without model-facing text.
argument-hint: "<prompt or task>"
allowed-tools: Read, Grep, Glob
_organized: true
---

# Prompt Creation and Review

**Purpose:** Build prompts that stay small, explicit, and provider-aware, including the prompts used for subagents, intermediate reasoning steps, and self-prompted transitions.

## Shared Contract

- Keep the shared method provider-neutral.
- Apply provider overlays only where current docs materially differ.
- When a task needs a prompt for a subagent, a review pass, or an intermediate thought step, reuse the same prompt rules, do not invent a second hidden style.
- Prefer the smallest prompt that passes the task.
- Do not invent undocumented model behavior.

## Workflow

1. Identify the target provider and model family.
2. Identify the prompt job:
   - create from scratch
   - review an existing prompt
   - migrate between providers
   - tighten tool use or agent behavior
   - improve structured output, grounding, or verbosity
   - design prompts for subagents, intermediate steps, or self-prompting
3. Read the shared checklist.
4. Read the provider overlay(s) that apply.
5. Decide whether the prompt is:
   - **base prompt**
   - **subagent prompt**
   - **review prompt**
   - **intermediate reasoning / checkpoint prompt**
6. Apply the provider rules to the exact prompt type, not only to the outer task.
7. When reviewing, return:
   - what is already good
   - concrete risks or mismatches
   - exact edits
   - revised prompt
8. When portability matters, write a provider-neutral base prompt first, then add overlays.

## Prompt Layering Rules

Use the same prompt discipline at every layer:

- **Base prompt:** core task, output contract, grounding, completion criteria.
- **Subagent prompt:** narrower scope, explicit role, explicit stop condition, explicit output shape.
- **Checkpoint prompt:** what was done, what is blocked, what to verify next.
- **Review prompt:** what to inspect, what counts as a finding, what evidence is required.

If the model is "thinking" or prompting itself, treat that as an internal subtask and keep the same rules:
- no vague goals
- no missing completion criteria
- no hidden assumptions
- no undocumented tool expectations

For every subagent prompt, also decide context transfer, model, and effort. A
fresh worker needs a self-contained prompt; a history fork needs a concrete
reason to inherit that history. Never leave the choice implicit in a runtime
whose default is full-history inheritance.

## Output Pattern

For prompt reviews:
1. Goal
2. Prompt quality assessment
3. Provider-specific risks
4. Revised prompt
5. Why these changes

For new prompts:
1. Recommended prompt
2. Provider notes
3. Optional variants

## Shared Checklist

Read `references/shared-checklist.md`.

## Provider Overlays

Read only what applies:
- `references/openai-gpt-5.6.md`
- `references/anthropic-claude.md`
- `references/google-gemini.md`

## Rules for Stellwerk

- This skill should also be used when Stellwerk itself needs prompt snippets for subagents, staged execution, or self-check steps.
- If a prompt is going to be embedded into another prompt, keep it short and contract-heavy.
- If the prompt will be reused across turns, make the output contract and completion criteria explicit.
- If the prompt is provider-specific, say so in the prompt itself.
- If a prompt contains a checkpoint or thinking step, ensure it cannot be mistaken for the final answer.

## Skill Handoffs

When this skill is active:

- If the prompt, skill, MCP, or tool contract is implemented in product/backend/frontend code → load `dev-implement`.
- If the prompt controls user-visible blocks, renderers, conversation surfaces, or UI output behavior → load `dev-ui`.
- If the prompt change is intended to fix a bug or review finding → load `dev-discipline/references/debug.md` first, then verify with `dev-discipline/references/verify.md`.
- If the prompt introduces a new architecture boundary, harness contract, model-facing API, or canonical path → load `dev-review`.
- If the finished change needs a shippability pass → load `dev-code-review`.

## Deliverable Quality Bar

A good result:
- reflects the current official docs only
- distinguishes universal guidance from provider-specific guidance
- includes exact wording changes when reviewing
- stays practical for real prompts
- covers subagent, checkpoint, and self-prompting use cases without adding hidden prompt folklore
