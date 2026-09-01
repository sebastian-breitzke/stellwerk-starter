---
_organized: true
---
# Google Gemini prompt guidance

Source basis:
- Google Gemini API prompting guidance: https://ai.google.dev/gemini-api/docs/prompting-strategies
- Google "What's new in Gemini 3.5": https://ai.google.dev/gemini-api/docs/interactions/whats-new-gemini-3.5

Use this file for current Gemini prompting.

## Core stance

Google's current Gemini guidance emphasizes:
- removing sampling parameters from configs entirely
- careful handling of grounding versus deduction
- split-step verification for uncertain capabilities or unknown information
- placing behavioral constraints, personas, and format rules in the system instruction or at the very beginning
- cautious use of personas
- explicit grounding rules
- putting the actual question after the long context

## What to do

### 1. Do not set sampling parameters
Current guidance is to remove `temperature`, `top_p`, and `top_k` from configs entirely.
Setting them is no longer recommended at all; do not lower temperature for reasoning tasks.

### 2. Distinguish deduction from outside knowledge
Tell Gemini:
- use the provided context for calculations and deductions
- do not introduce outside knowledge

### 3. Use split-step verification for uncertain knowledge or capability
Pattern:
1. verify availability or capability with high confidence
2. if not verified, return a sentinel like `No Info` and stop
3. only then answer

### 4. Put constraints first, question after long context
Behavioral constraints, persona/role definitions, and output-format requirements go in the system instruction or at the very beginning of the prompt — not last (prompting-strategies guidance updated 2026-06-10).
The rule that survives for long context: put the source material first and the specific question or instruction after it.
Structure prompts as:
- system instruction or opening block: persona, behavioral constraints, output format
- context/source material
- specific question or task instruction after the context

### 5. Use personas carefully
Gemini can adhere so strongly to persona that it may ignore other instructions.
Use persona only when it helps and keep it non-conflicting.

### 6. Maintain grounding explicitly
If the supplied context is the only allowed truth source, say that explicitly.

### 7. Put the actual question after long context
For books, codebases, long documents, or long transcripts, place the question or specific instruction at the end, after the context.

### 8. Steer verbosity explicitly
Gemini 3 is less verbose by default.
If you need a chattier or more conversational answer, ask for it explicitly.

## Parameter guidance from current docs

### thinking_level
`thinking_level` is the canonical reasoning control across Gemini 3.x:
- values: `minimal | low | medium | high`
- replaces `thinking_budget`
- Gemini 3.5 Flash default dropped from `high` to `medium`
- OpenAI-compat `reasoning_effort` maps to it

For lower latency, use `low` plus system instructions like think silently.

### sampling
Remove `temperature`, `top_p`, and `top_k` from configs entirely.
Current guidance no longer recommends setting them at all.

## Integration notes

- The Interactions API is GA and the recommended integration path.
- `FunctionResponse` must carry matching `id` and `name`.

Against tool-overuse, lower `thinking_level` first, then give an explicit
limited action budget ("at most N tool calls").

## Good prompt moves for Gemini
- Put the question after the context.
- Put behavioral, persona, and format constraints in the system instruction or at the very beginning.
- Avoid blanket "do not infer" language.
- Use split-step verification when capability is uncertain.
- Be explicit when provided context is the only source of truth.
- Keep persona narrow and non-conflicting.

## Common review findings
- Prompt puts the question before a massive context block.
- Prompt buries persona, behavioral, or format constraints at the end instead of the system instruction or opening block.
- Prompt sets `temperature`, `top_p`, or `top_k` based on outdated generic advice.
- Prompt says "do not infer" and accidentally suppresses deduction.
- Prompt assumes grounding without saying the provided context is authoritative.
- Prompt uses persona that conflicts with extraction or fidelity goals.

## Rewrite pattern for Gemini

Use this skeleton when helpful:

```text
[System instruction or opening block: persona, behavioral constraints, grounding rules, output format, length]

[Context / source material]

[Actual question or requested transformation]
```

For uncertain-knowledge tasks, use:

```text
First verify with high confidence whether the required information or capability is available.
If not verified, output `No Info` and stop.
If verified, continue.
```
