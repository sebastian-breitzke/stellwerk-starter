---
name: functional-writing
description: Draft, rewrite, review, and structure functional prose in German or English — documentation, READMEs, specs, concepts, ADRs, runbooks, procedures, troubleshooting, tickets, acceptance criteria, handovers, status reports, decision records. Also for schreiben, formulieren, überarbeiten, strukturieren, dokumentieren of such artifacts. Not for casual answers, brainstorming without a durable artifact, creative or marketing copy, or code work where prose is incidental.
---

# Functional Writing

## Goal

Create text that lets the intended reader understand, decide, or act correctly
on the first careful read.

Semantic fidelity outranks completeness, fluency, structure, and style. Prefer
an incomplete or explicitly ambiguous artifact to a plausible addition.

## Operation Mode

Select one mode from the user's request:

- **Draft:** Create a new artifact from supplied facts or notes.
- **Rewrite:** Improve wording while preserving sections, order, statement
  types, and modality. Do not turn prose into a procedure or add new structural
  relationships unless the user asks.
- **Restructure:** Change information architecture while preserving semantics.
  Use the semantic-fidelity ledger before finalizing.
- **Review:** Identify problems and propose concrete corrections without
  rewriting unaffected content.

Route explicit wording deterministically:

- `rewrite`, `überarbeiten`, `klarer schreiben`, and `kürzen` select Rewrite
  when an existing artifact is supplied.
- Creating an artifact from facts, notes, or requirements selects Draft.
- `formulieren` is context-dependent: use Rewrite when the requested result is
  an improved version of the same artifact. Use Draft when supplied material
  becomes a different target artifact. Use Restructure when the request
  explicitly changes the information architecture.
- `restructure`, `reorganize`, `strukturieren`, `neu gliedern`, and `in Schritte
  umwandeln` select Restructure.
- A target audience, technical context, or request for clarity does not by
  itself authorize Restructure.
- In Rewrite mode, do not add headings, lists, numbered steps, or procedure
  blocks that are not present in the source.

## Invariants

- Preserve meaning, facts, values, labels, scope, sequence, causality, modality,
  safety information, and legal requirements.
- Do not create a prerequisite, relationship, requirement, warning, or expected
  result that the source does not establish.
- Keep each statement's force unchanged: a fact stays a fact, a limit does not
  become an instruction, `should` does not become `must`, and a possibility does
  not become a commitment.
- Keep one operational thought or action in each sentence or step.
- Make the actor, action, object, condition, and result explicit when they matter.
- Use one stable term for each concept. Prefer supplied product and project
  terminology over stylistic variation.
- Prefer concrete verbs. Use passive voice only when the actor is unknown,
  irrelevant, or intentionally omitted.
- When the source establishes their relationship, put a necessary condition
  before its action and a warning before the hazardous action.
- Keep sentences easy to parse, but do not enforce arbitrary word limits.
- Mark material ambiguity instead of resolving it through invention.

## Semantic Anchor

After preserving source semantics, use an STE-inspired functional-writing
mindset for clarity and consistency. Apply the useful ideas of controlled
technical language, not its compliance model, dictionary, fixed sentence
limits, or preference for converting prose into imperative procedures.

## Workflow

1. Select the operation mode.
2. Identify the reader, requested artifact, language, and intended outcome.
3. For Draft or Restructure, identify the dominant text function: instruction,
   description, reference, warning, troubleshooting, decision, status, or
   handover.
4. Load `references/text-functions.md` for Draft or Restructure of a
   multi-section artifact or mixed document.
5. Load `references/language-guidance.md` for technical prose, controlled-language
   requests, translations, or language-specific rewriting.
6. Extract immutable facts, protected labels, supplied terminology, and unclear
   relationships before rewriting.
7. When the artifact describes a repository or software system, verify real
   symbols, paths, commands, flags, defaults, examples, and counts against the
   repository or supplied source. Treat the repository and its codebase as the
   vocabulary authority; do not make plausible technical details up.
8. For Draft or Restructure, select the smallest structure that fits the text
   function. For Rewrite, preserve the source structure unless asked otherwise.
9. Draft, rewrite, restructure, or review the artifact.
10. Before finalizing, make an internal source-to-output ledger. For each material
   output claim, identify the source statement that establishes it with the same
   force. Include facts, instructions, prerequisites, warnings, decisions,
   status claims, reference values, troubleshooting causes, and expected
   results. Do not output the ledger.
11. Compare the result with the source. Check for changed facts, invented
   relationships, lost constraints, and accidental changes in modality.
12. Load and run `unslop` as the final validation pass. If writing on the
    user's behalf and a private tone profile exists, apply `tone-of-voice`
    before Unslop. Unslop may remove language
    slop but may not change the approved semantics, structure, terminology, or
    voice.

## Semantic Fidelity Examples

- Source: `The pressure limit is 4.5 bar.` Keep: `The pressure limit is
  4.5 bar.` Do not write: `Make sure that the pressure does not exceed 4.5 bar.`
- Source: `The operator should check the indicator.` Keep `should`. Do not
  convert the statement to an imperative command.
- Source: `The procedure should be repeated.` Keep: `The procedure should be
  repeated.` Do not write: `Repeat the procedure.`
- Source: a warning names the `main coolant supply isolation valve`, but a
  procedure names only `the valve` and their identity is unknown. Keep the
  warning separate. Do not attach it to that procedure.

## Structure

Apply these rules during Draft or Restructure. During Rewrite, retain the source
structure unless the user explicitly requests structural changes.

- Front-load the purpose, result, decision, or required action.
- Use descriptive headings that answer reader questions.
- Use numbered steps for sequences, bullets for independent items, and tables
  for stable mappings or comparisons.
- Keep one topic per paragraph or section.
- Separate instructions, explanations, warnings, references, and examples when
  combining them would blur their function.
- Prefer a verified mechanism, value, example, or observable result over a
  generic claim about quality, capability, or importance.
- Preserve required frontmatter, schemas, links, code, commands, identifiers,
  and file paths.

## Voice Composition

When writing on the user's behalf, also use their private tone profile after the
functional pass.

Apply this precedence:

1. factual accuracy, safety, and legal meaning
2. project terminology and protected labels
3. text function and reader outcome
4. clarity and structure
5. personal voice

Use the user's established directness, structure, and preference for evidence.
Do not let fragments, ellipses, humor, metaphors, or sharp language weaken
technical precision.

## Output

- Return the requested artifact directly in its requested format.
- Do not add a terminology table, change log, or uncertainty section unless the
  user asks for one or it materially affects safe use of the text.
- For a review, return findings first and give a concrete rewrite for each
  actionable finding.
- Keep material unresolved ambiguity brief and adjacent to the affected text.

## Hard Stops

- Do not claim or imply ASD-STE100 compliance.
- Do not infer chronology, causality, ownership, or scope from textual proximity.
- Do not promote descriptive or reference information into a procedure merely
  because it appears near procedural text.
- Do not attach a warning or condition to an action when the source leaves their
  relationship unresolved.
- Do not infer the acceptance criterion for a required check from a separate
  limit or reference value.
- In Rewrite mode, do not convert prose into steps, warnings into procedure
  blocks, or reference facts into checks unless the user requests that
  structural transformation.
- Do not combine independent actions or procedures into one sequence.
- Do not translate or rename product names, labels, commands, identifiers, or
  technical terms without supplied terminology.
- Do not simplify away safety, compliance, tolerances, prerequisites, or
  acceptance conditions.

## Done When

Every material output claim has a source statement with the same force. The
reader can identify what the text is for and the information applicable to its
function: known facts, current status, required action, decision, or remaining
uncertainty. Do not require a category that the artifact does not need.
