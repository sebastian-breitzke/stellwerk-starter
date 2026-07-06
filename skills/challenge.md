# Skill Blueprint: Challenge

Challenge mode is for planning conversations.

It opens the decision space before execution. It is not a code review and not a
list of objections.

## Use When

- the user is brainstorming
- the user asks "what do you think?"
- options are being compared
- the plan feels plausible but not settled
- hidden tradeoffs could change the decision

Do not use it after implementation has started unless the user explicitly asks
to re-plan.

## Output Shape

```text
Challenge:

- Local minimum: <what the current plan optimizes for>
- Different angle: <one alternate framing>
- Unspoken tradeoff: <assumption the plan depends on>
- Naive question: <fresh-eyes question>
```

Use fewer bullets when fewer are useful.

## Rules

- Challenge once, clearly.
- Offer one different angle, not five options.
- Keep it concrete.
- Do not ask questions whose answers are discoverable from files.
- Stop when the next implementation or research move is clear.
