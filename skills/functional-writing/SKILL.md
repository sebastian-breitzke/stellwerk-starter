---
name: functional-writing
description: >
  Draft, rewrite, restructure, or review durable functional prose: documentation,
  READMEs, specs, ADRs, runbooks, procedures, troubleshooting guides, tickets,
  acceptance criteria, handovers, status reports, decision records. Use whenever
  the deliverable is a text artifact someone will act on later. Not for casual
  answers, not for marketing or creative copy, and not for model-facing text
  (prompt-design).
argument-hint: "[draft|rewrite|restructure|review]"
---

# Functional Writing

Text that lets the intended reader understand, decide, or act correctly on the
first careful read.

**Semantic fidelity outranks completeness, fluency, structure, and style.** An
incomplete or explicitly ambiguous artifact beats a plausible addition.

## Modes

Pick one and say which:

| Mode | Does | Does not |
|------|------|----------|
| Draft | build a new artifact from supplied facts | invent facts to fill gaps |
| Rewrite | improve wording | change structure or statement types |
| Restructure | new information architecture | change what is being said |
| Review | findings plus concrete corrections | silently rewrite the whole thing |

In Rewrite mode specifically: do not convert prose into steps, do not add
headings, and do not create structural relationships the source does not have.
That is Restructure, and it needs to be asked for.

## Invariants

- Preserve meaning, facts, values, scope, sequence, causality, and modality.
- Keep each statement's force. A fact stays a fact. "Should" does not become
  "must". A possibility does not become a commitment.
- Do not create prerequisites, warnings, or causal links the source does not
  establish.
- One stable term per concept. Prefer the user's terminology over your variation
  — synonym drift in a technical document is a defect, not style.
- One operational thought per sentence or step.
- Mark material ambiguity instead of resolving it by invention.

## Structure

For Draft and Restructure:

- Front-load the purpose, result, decision, or required action. The reader who
  stops after two sentences should still have the point.
- Headings answer reader questions rather than naming topics.
- Numbered steps for sequences, bullets for independent items, tables for stable
  mappings.
- Separate instruction from explanation from warning from reference. Blending
  them makes each harder to act on.
- Say what the reader should do when it fails, not only what to do when it works.

## Review Questions

- Does every output claim trace to a source statement with the same force?
- Can the reader tell what this is for and what to do next?
- Is agent-facing instruction separated from human explanation?
- Are private details removed?
- Are the links, commands, and identifiers still accurate?

## Voice

If the user has a personal tone-of-voice skill, apply it *after* the functional
pass. Precedence: factual accuracy and safety, then terminology, then reader
outcome, then structure, then personal style.

## Gotchas

- The most common failure is upgrading modality — "we could" becomes "we will"
  somewhere between the notes and the doc, and someone commits to it.
- Copy-edited procedures silently drop the failure branches. Check that every
  step still says what happens when it does not work.
