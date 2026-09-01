# Mode: Copy-Paste Goal

When `state.md` carries runnable `## Next Slices`, the standing goal
`/leitstand run <session-dir>` (see `references/run.md`) replaces bespoke goals —
use this mode when a tailored goal for an external or parallel agent is needed,
or no runnable plan exists yet.

Produce one recommended copy-pasteable goal prompt. Use when the user needs to
set or update the current main agent's own goal, when a handover needs its
closing goal, or when the recommended next move truly belongs in a separate
Leitstand-Session. As a direct mode (`/leitstand goal`), regenerate the goal
from the CURRENT session state — read the active log first; do not restart the
workflow.

Do not hand orchestration back to the user with "open a new chat for this" or
"here are goals for the subagents." Pick the recommended path, keep
orchestration in the current Leitstand whenever it is in scope, and make the
base goal a goal for the current main agent unless the work clearly needs a new
Leitstand.

## Rules

- Provide exactly one full base goal by default.
- State whether the goal is for the current main agent or for a new separate
  Leitstand-Session.
- Make the base goal self-contained; it must not rely on the surrounding chat.
- Include the relevant `state.md` path first, then the Leitstand log or
  handover path when one exists.
- Include the active runtime's recommended model and effort with a short reason.
- State success criteria, constraints, verification, and stop condition.
- Keep the base goal compact, normally 80-160 words.
- If optional scope exists, list it under `Optional Stretch Goals` as appendable
  fragments, not separate full prompts. Stretch goals must be additive.
- If options are mutually exclusive and materially change the outcome, recommend
  one option as the base goal and list the others under `Alternative
  Adjustments`, each as a short replacement instruction.
- Provide multiple full copy-paste goals only when the user explicitly asks for
  alternatives or when the options cannot be represented as additive stretch
  goals or replacement adjustments.

## Shape

```text
Copy-Paste Goal

Recommended runtime: <model> at <effort> — <short reason>.

Recommendation: <one sentence naming the path to take and why>

Target: <current main agent|new separate Leitstand-Session>

<base goal text>

Optional Stretch Goals

- Append if wanted: <additive optional scope>

Alternative Adjustments

- Replace `<base phrase>` with `<alternative phrase>` if <condition>.
```

Goal text pattern:

```text
Use the Leitstand workflow in the current chat unless this explicitly says to start a new Leitstand-Session. Goal: <specific outcome>. Context: read <state.md> first, then <files/logs/handover>. Success: <observable result>. Constraints: <scope limits and quality bar>. Verify: <commands/checks/evidence>. Stop when: <clear completion condition or blocker condition>.
```

## Runtime Recommendation

Use the active provider overlay as the only source for model names and accepted
effort values. Choose the lowest tier that preserves the task's judgment, risk,
and verification needs:

- short, known, low-risk work → the provider's efficient worker tier
- normal bounded implementation/research → the provider's balanced baseline
- architecture, ambiguous debugging, prompt/skill changes, or cross-file work →
  the provider's capability-first tier
- security, data integrity, deep review, or unclear production failures →
  escalate only as far as the active provider exposes and the failure cost earns

For split work, recommend runtime settings per subgoal only when those settings
differ materially.

## Example (grounded handover)

```text
Copy-Paste Goal

Recommended runtime: use the active provider's capability-first model at high effort — requires source comparison, implementation judgment, and verification.

Recommendation: Take the Reichweite alignment path first; defer Warenverfügbarkeit and engine-review work.

Target: current main agent

Use the Leitstand workflow in the current chat unless this explicitly says to start a new Leitstand-Session. Goal: Align the SLO Reichweite calculation with the Qlik reference and determine whether the code-2 vs. code-20 difference is material. Context: read the current handover and leitstand/.../leitstand.jsonl first. Success: documented comparison, implemented fix if needed, and verified cockpit impact. Constraints: do not touch Warenverfügbarkeit or engine-review work. Verify with the existing SLO validator and a focused before/after data sample. Stop when the Reichweite delta is explained and the verified slice is ready for integration.

Optional Stretch Goals

- Append if wanted: Also write a short follow-up note that lists which Warenverfügbarkeit checks should run next, without implementing them.
- Append if wanted: If the Reichweite delta is caused by a shared calculation invariant, surface the smallest follow-up refactor candidate with file references.
```
