# Mode: Goal

Produce **one** recommended copy-pasteable goal prompt from the current session
state.

Use when the user needs to set the current agent's own goal, when a handover
needs its closing goal, or when the next move genuinely belongs in a separate
session. If `state.md` already carries runnable `## Next Slices`, prefer the
standing `run` goal (`references/run.md`) — a bespoke goal is for external or
parallel agents, or for when no runnable plan exists yet.

## Rules

- Exactly one full base goal. Not a menu.
- Say who it is for: the current agent, or a new separate session.
- Self-contained. It must not depend on the surrounding chat.
- Point at `state.md` first, then the log or handover.
- Name success criteria, constraints, verification, and the stop condition.
- 80–160 words.
- Optional scope goes under `Optional Stretch Goals` as **additive** fragments,
  never as a competing goal.
- Mutually exclusive options: recommend one as the base goal, list the others as
  short replacement instructions under `Alternative Adjustments`.
- Never hand orchestration back with "open a new chat for this" when the work
  belongs in the current session.

## Shape

```text
Copy-Paste Goal

Recommended runtime: <model tier> at <effort> — <one-clause reason>.

Recommendation: <the path to take and why, one sentence>

Target: <current agent | new separate session>

<base goal text>

Optional Stretch Goals
- Append if wanted: <additive scope>

Alternative Adjustments
- Replace `<base phrase>` with `<alternative>` if <condition>.
```

Base goal pattern:

```text
Goal: <specific outcome>. Context: read <state.md> first, then <files/logs>.
Success: <observable result>. Constraints: <scope limits and quality bar>.
Verify: <commands/checks>. Stop when: <completion or blocker condition>.
```

## Runtime Recommendation

Take model names and valid effort values from the runtime's own overlay — never
from memory, and never from this file. Pick the lowest tier that preserves the
task's judgment, risk, and verification needs:

- short, known, low-risk work → the efficient worker tier
- normal bounded implementation or research → the balanced tier
- architecture, ambiguous debugging, prompt and skill changes, cross-file work →
  the capability-first tier
- security, data integrity, deep review, unclear production failures → escalate
  only as far as the runtime exposes and the failure cost earns

Recommend per-subgoal settings only when they actually differ.
