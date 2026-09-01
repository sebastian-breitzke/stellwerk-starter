---
_organized: true
---
# Text Functions

Load this reference when creating or restructuring a multi-section artifact or a
document that mixes different information types.

## Select The Dominant Function

Choose one dominant function for each section. Do not mix functions merely
because the source material arrived in one paragraph.

### Instruction

Use for procedures, runbooks, setup, maintenance, and task-oriented help.

Choose the instructional form from the reader's job. One document may contain
different forms in different sections when the source genuinely serves more
than one reader need.

#### Tutorial

Use for a guided learning path that helps the reader gain initial competence.

- Give one coherent path through a representative case.
- Explain only what the learner needs at that point.
- State visible expected results only when the source or verified system
  establishes them.
- Keep alternatives and edge cases out of the main learning path.

#### How-to

Use for a reader who already has context and needs to complete one task.

- State the outcome and sourced prerequisites first.
- Start with the common case and its shortest complete path.
- Put variants, exceptions, and recovery after the common case.
- Use task-oriented headings and descriptive link text that names the target or
  action instead of `here`, `this`, or a raw URL.

#### Procedure

Use for an operational sequence where order, responsibility, safety, or
repeatability matters.

- State sourced prerequisites before the steps.
- Put real warnings before the hazardous step.
- Use one action per numbered step.
- Put a necessary condition before its action.
- Give an expected result only when the source establishes it.
- Keep `should`, `may`, and optional actions at their supplied strength. Do not
  turn them into imperative commands.
- Keep a stated limit or reference value outside the procedure unless the source
  explicitly binds it to a step or acceptance check.
- Keep independent tasks in separate procedures.

### Description Or Explanation

Use to explain what something is, how it behaves, or why it exists.

- Start with the subject and its purpose.
- Move from general behavior to relevant details and constraints.
- Keep one topic per paragraph.
- Distinguish known behavior from assumptions and interpretation.

### Reference

Use for exact lookup: APIs, parameters, commands, schemas, mappings, and
tolerances.

- Use a stable repeated structure.
- Prefer tables for comparable fields or values.
- Preserve syntax, spelling, units, defaults, identifiers, and examples.
- Separate normative values from commentary.

### Warning

Use only for a real hazard or material operational risk.

- State the hazard.
- State the consequence when known.
- State the avoidance action.
- Attach the warning to a procedure only when the source establishes which
  action creates the hazard.
- Do not invent severity, probability, or legal language.

### Troubleshooting

Use for diagnosis and corrective action.

- Start with the observable symptom.
- State applicable conditions.
- Name a cause only when evidence establishes it.
- Give one corrective action per step.
- State how to verify recovery when the source provides a check.

### Decision Or ADR

Use to record a decision and its consequences.

- State the decision first.
- Give the context and constraints that made it necessary.
- Separate evidence from judgment.
- Include consequences and rejected alternatives only when established.

### Status Or Handover

Use to transfer current operational understanding.

- State the result or current state first.
- Give decisive evidence.
- Name current risk or blocker.
- State the next action and owner when known.
- Do not convert a proposal into a commitment.

## Document-Level Structure

- Make the purpose and, when applicable, current status and next action
  discoverable within one minute.
- Use descriptive headings, not generic buckets such as `Overview` or `Details`.
- Use one section for one reader question.
- Use lists for sequences or independent items, not as a substitute for
  explanation.
- Keep examples visibly separate from requirements and normative statements.
- Keep list items parallel when they perform the same function.
- Use task headings for actions and concept headings for explanations or
  reference material.
- Use the smallest structure that preserves the reader's path through the text.
