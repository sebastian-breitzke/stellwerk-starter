---
_organized: true
---
# OpenAI GPT-5.6 Prompt Guidance

Source basis:
- https://developers.openai.com/api/docs/guides/latest-model?model=gpt-5.6
- https://developers.openai.com/api/docs/guides/prompt-guidance-gpt-5p6
- https://developers.openai.com/api/docs/guides/upgrading-to-gpt-5p6-sol

Use this file for GPT-5.6 Sol, Terra, and Luna API/Codex prompt surfaces. Check
the active runtime schema separately: API capabilities and Codex subagent
controls are related but not interchangeable.

## Core Stance

GPT-5.6 works best with a lean, outcome-first contract:

- goal and user-visible outcome
- success criteria and stopping condition
- true safety, evidence, permission, and scope constraints
- relevant tools and prerequisite retrieval
- required output shape

State each rule once. Remove repeated scaffolding, examples, and tool text that
do not change behavior. OpenAI reports directional internal coding-agent gains
from leaner prompts, but validate Stellwerk changes on representative work.

## Model And Context Routing

- Sol is the flagship tier for the hardest coding, architecture, synthesis,
  ambiguous debugging, final review, and taste-critical UI.
- Terra balances capability and cost for everyday bounded work.
- Luna is for efficient high-volume work only where the runtime exposes it and
  the task contract tolerates that tier.
- A Codex full-history fork inherits parent model and effort. Use clean or
  bounded context when selecting a different model or effort.
- Independent workers should receive only the facts and paths they need. Long
  sessions amplify repeated prompt, tool, and history tokens.

## Prompt Rules

1. Describe the destination before the procedure. Prescribe steps only when
   order protects correctness, safety, or an external workflow.
2. Keep autonomy and approval boundaries in one place. Let read-only discovery,
   in-scope edits, and local validation proceed; stop before destructive,
   external, costly, or scope-expanding actions.
3. Put tool-specific inputs, side effects, return fields, and failure behavior
   in tool descriptions. Keep global prompts for cross-cutting invariants.
4. Expose only relevant tools. Parallelize independent retrieval, then
   synthesize before acting.
5. Give research a retrieval budget. Search again only for a missing required
   fact, source, date, comparison, or explicit exhaustiveness requirement.
6. Use sparse phase-based progress updates. Do not narrate routine tool calls.
7. Preserve Responses API reasoning items, tool-call items, outputs, IDs, and
   assistant phase values when replaying state. Do not rebuild state from
   visible assistant text alone.
8. Compact after milestones, not every turn. Preserve goal, decisions,
   completed actions, evidence, blockers, and next action.

## Effort And Verbosity

GPT-5.6 supports `none`, `low`, `medium`, `high`, `xhigh`, and `max`; omitted
effort defaults to `medium` in the API.

- Preserve the previous effective effort for the first migration run, then test
  the same setting and one lower.
- Use `low` for latency-sensitive, straightforward work; `medium` as the normal
  balanced baseline; `high` or `xhigh` only where evals show a gain; reserve
  `max` for genuinely hard quality-first workloads.
- Fix missing success criteria, dependencies, tool routing, or verification
  before increasing effort.
- Effort controls reasoning work. Use `text.verbosity` plus explicit output
  requirements for visible response length.

Do not blindly replace every old model with Sol. Map flagship roles to Sol,
balanced worker roles to Terra, and high-volume roles to Luna where available.

## Frontend And Visual Work

Provide product context, existing design tokens/components, responsive and
state constraints, and a render/inspection gate. Do not use Terra merely
because a visual edit is small when the result still requires taste or visual
judgment; keep that judgment on Sol.

## Review Findings

Flag prompts that:

- repeat the same rule or carry older-model scaffolding without evidence
- omit success criteria, side-effect boundaries, or a stop condition
- leave fork/context transfer implicit
- route ambiguous or taste-critical work to a cheaper worker
- use higher effort to compensate for an unclear task
- keep searching after enough evidence exists
- lose reasoning/tool items or phase values across Responses turns
- claim a model, effort, or feature that the active runtime does not expose

## Compact Shape

```text
Goal: <outcome>
Success: <observable completion criteria>
Constraints: <true invariants and side-effect limits>
Context: <only required evidence and paths>
Tools: <routing and prerequisite rules>
Output: <exact shape and useful length>
Stop: <done, retry, ask, or blocker condition>
```
