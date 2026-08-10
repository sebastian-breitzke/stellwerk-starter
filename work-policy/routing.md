# Work Policy: Routing

Always-on, and short. This is the layer that makes a skill system work at all:
it tells the agent *when to go look for a procedure* instead of improvising one.

Without it, skills sit on disk and never fire. Install this whenever more than
two skills exist.

---

## Skill Gate

Before non-trivial work, select and read the smallest set of matching skills and
the references they require. Read the skill before starting, not after the first
mistake.

- Match on the task shape, not on the user's exact words.
- Read the smallest useful set. Two skills is common, five is a smell.
- A skill's own "Not for …" clause is binding: if it excludes this task, do not
  load it just because a keyword matched.

## Orchestration Gate

Start a durable session (the `leitstand` skill) when the work is a **meaningful
change**: several dependent steps, multiple components, regression-relevant
behavior or contract changes, architecture decisions, non-trivial verification,
coordination across agents, repeated follow-up, or a handoff.

Keep these direct — no session, no ceremony:

- trivial questions and confirmations
- narrow read-only lookups
- one-step reversible edits

Once a session is active, keep related slices inside it. Do not open a competing
orchestration track for a sub-task of work you are already running.

## Delegation

Delegating to a subagent is a scoped decision, not a ritual. Delegate when the
work has real isolation value — broad reading, an independent implementation
slice, a review pass, triage of long tool output — and the startup cost of a
fresh context is smaller than the context it saves.

Each delegated job gets one owned scope, a stop condition, an expected output
shape, and the files or commands it may use. Review the result before
integrating it. Subagents produce inputs; they never own the goal, never lower
the quality bar, and never replace final review.

<Add here if the runtime exposes model or effort selection per subagent:
which tier for cheap mechanical work, which for review and final judgment.
Keep provider-specific model names in a per-runtime overlay, not in this file.>

## Plan Ownership

Use the active session's state file for durable task tracking. Do not stand up a
second plan system beside it.
