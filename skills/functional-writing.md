# Skill Blueprint: Functional Writing

Functional Writing is for durable technical, operational, or decision-oriented
text: documentation, READMEs, specs, runbooks, procedures, tickets, handovers,
status reports, decision records.

## Purpose

Create text that lets the intended reader understand, decide, or act correctly
on the first careful read.

Semantic fidelity outranks completeness, fluency, structure, and style. Prefer
an incomplete or explicitly ambiguous artifact to a plausible addition.

## Operation Modes

Select one mode from the request:

| Mode | Use For |
|------|---------|
| Draft | new artifact from supplied facts or notes |
| Rewrite | better wording, same structure and statement types |
| Restructure | new information architecture, same semantics |
| Review | findings plus concrete corrections, no full rewrite |

In Rewrite mode, do not convert prose into steps, add headings, or invent
structural relationships the source does not have.

## Invariants

- Preserve meaning, facts, values, scope, sequence, causality, and modality.
- Keep each statement's force: a fact stays a fact, `should` does not become
  `must`, a possibility does not become a commitment.
- Do not create prerequisites, warnings, or relationships the source does not
  establish.
- Use one stable term per concept; prefer supplied terminology over variation.
- Keep one operational thought per sentence or step.
- Mark material ambiguity instead of resolving it through invention.

## Structure Rules

Apply during Draft or Restructure:

- Front-load the purpose, result, decision, or required action.
- Use descriptive headings that answer reader questions.
- Numbered steps for sequences, bullets for independent items, tables for
  stable mappings.
- Separate instructions, explanations, warnings, and references when mixing
  them would blur their function.

## Personal Voice

If the user has a personal tone-of-voice skill, apply it only after the
functional pass. Precedence: factual accuracy and safety, then terminology,
then text function and reader outcome, then structure, then personal style.

## Review Questions

- Does every material output claim trace to a source statement with the same
  force?
- Can the reader identify what the text is for and what to do next?
- Is agent-facing instruction separated from human explanation?
- Are private details removed?
- Are links, commands, and identifiers still accurate?
