---
_organized: true
---
# Anthropic Claude Prompt Guidance

Source basis:
- https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
- https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5
- https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5
- https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5
- https://platform.claude.com/docs/en/build-with-claude/effort
- https://platform.claude.com/docs/en/about-claude/models/choosing-a-model
- https://code.claude.com/docs/en/sub-agents

Use this file for current Claude 5 prompt and Claude Code orchestration work.
Opus 4.8 remains relevant as a legacy migration baseline and explicit Fable
refusal fallback, not as the default current coding target.

## Shared Claude Stance

- Be clear and direct. Explain why a constraint matters when that helps it
  generalize.
- Use XML sections when instructions, examples, context, and input data would
  otherwise blur together.
- Use examples only when format or behavior is fragile; do not add them by
  habit.
- Newer Claude models follow scope literally. State boundaries and the intended
  completion state.
- Put long source context before the specific query.
- Tune prompt, tools, effort, and output contract instead of sampling folklore.

## Model Routing

- Fable 5: highest available capability, ambiguous or very long-running agents,
  difficult research, and broad orchestration.
- Opus 5: complex agentic coding, architecture, deep review, enterprise work,
  and taste-critical UI/copy.
- Sonnet 5: everyday coding, focused research/review, and bounded subagents where
  speed matters.
- Haiku 4.5: short, low-risk, cheaply verifiable subagent work only.

Evaluate with real tasks. Do not infer model quality from family name or route
all work to the most expensive tier.

## Claude Code Subagents

- A named subagent starts with fresh isolated conversation context. It receives
  its delegation prompt, agent definition, applicable CLAUDE.md files, and its
  own selected model context window.
- A fork inherits full parent conversation, system prompt, tools, model, and
  prompt cache. Use it only when the task depends on that history.
- Current Claude Code accepts per-subagent model selection and per-subagent
  `effort`. Omitted values inherit.
- In Claude Code v2.1.198 and later, extended-thinking on/off is inherited from
  the parent and has no independent per-subagent switch. Earlier versions
  disable extended thinking in subagents.
- Runtime versions matter. Verify the installed CLI supports a field before
  making it part of a required workflow, and report a rejected or ignored field
  instead of claiming it applied.

## Effort And Thinking

Claude 5 models covered here default to `high` effort. Effort affects thinking, tool
calls, and total response work; it does not reliably control visible length.

- `low`: short, tightly scoped, latency/cost-sensitive work
- `medium`: bounded work with a balanced cost/quality target
- `high`: complex reasoning and normal quality-first coding/agent work
- `xhigh`: demanding long-horizon coding or agentic work where the gain matters
- `max`: exceptional tasks only after evaluation; it may overthink

Use adaptive thinking on current Claude 5 models. Do not use manual
`budget_tokens` on models that reject fixed budgets. Prompt explicitly for
visible brevity when needed.

## Model-Specific Adjustments

### Fable 5

- Start at `high`; lower effort can still outperform prior models. Reserve
  `xhigh` or `max` for capability-sensitive long runs.
- Remove old step-by-step scaffolding that does not protect a real invariant.
- Require progress claims to match tool evidence, but avoid redundant
  self-review loops.
- Fable may return `stop_reason: refusal` for offensive cyber, biology/life
  sciences, or reasoning-extraction categories. If the product needs fallback,
  configure it explicitly; do not describe fallback as automatic.

### Opus 5

- Start at `high`; use `low` and `medium` liberally where evals hold, and
  `xhigh` for demanding coding/agentic work.
- Opus 5 already self-corrects and verifies strongly. Keep Stellwerk's concrete
  evidence gate, but remove duplicate instructions that force a verifier or
  repeated final verification for every non-trivial task.
- Constrain narrow scope explicitly. Opus 5 can expand a task when the boundary
  is vague.
- Ask review agents to report all findings with evidence; filter severity in a
  separate judgment pass.

### Sonnet 5

- Start at `high`, step down for routine bounded work, and use `xhigh` or `max`
  only for the hardest coding/agentic cases.
- Be explicit about tool triggers and response length. Leave enough output room
  for thinking and tool use at higher effort.

## Review Findings

Flag prompts that:

- omit task scope or assume the model will generalize an unstated rule
- fork full history for an independent worker
- promise an independently configurable subagent thinking switch
- force multiple redundant verifier/self-review passes
- compensate for low effort with prompt bulk
- request hidden reasoning or raw chain-of-thought
- imply Fable fallback is universal or automatic
- rely on a model or field the installed Claude Code runtime does not expose

## Compact Shape

```text
<task><outcome></task>
<success_criteria><observable done conditions></success_criteria>
<constraints><scope, evidence, and side-effect limits></constraints>
<context><only required material and paths></context>
<output><exact return shape></output>
<stop><done, ask, or blocker condition></stop>
```
