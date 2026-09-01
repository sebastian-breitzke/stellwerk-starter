---
_organized: true
---
# Language Guidance

Load this reference for technical prose, controlled-language requests,
translations, or language-specific rewriting.

## Semantic Anchor

Use this internal framing:

```text
Write with STE-inspired clarity and consistency.

Use the underlying principles of controlled technical language, not formal
ASD-STE100 compliance. Preserve semantic meaning, facts, scope, sequence, and
causality. Use explicit actors and actions, stable terminology, concrete verbs,
and one operational thought per sentence or step. Preserve the force of each
source statement. Do not infer missing relationships or requirements.
```

This framing selects a useful writing pattern. It is not a compliance claim and
does not authorize reconstruction of an official dictionary.

## Shared Language Rules

- Preserve the source language unless the user requests translation.
- Keep product names, UI labels, commands, identifiers, paths, and code exact.
- Preserve differences between `must`, `should`, `may`, and factual statements.
- Preserve the difference between a description and an instruction. For
  example, `The pressure limit is 4.5 bar` remains a reference fact unless the
  source explicitly requires a check against that limit.
- Use pronouns only when their reference is unambiguous.
- Replace vague qualifiers with testable conditions when the source supplies
  those conditions. Otherwise flag the ambiguity.
- Use a consistent term for each concept.
- Keep numbers, units, ranges, tolerances, and negation unchanged.
- Prefer familiar words, but do not replace an exact technical term with a
  simpler inexact word.
- Treat the repository, code, canonical docs, and supplied terminology as the
  vocabulary authority. Verify exact symbols, paths, commands, flags, UI
  labels, defaults, and counts instead of normalizing them from memory.
- Keep established English product, engineering, domain, and workflow terms in
  English in German prose. Preserve canonical spelling such as `Slice`, `Skill`,
  `State`, `Review`, `Worktree`, `Branch`, `Commit`, `Workflow`, or
  `No-Regression Check`; do not translate or Germanize them unless the owning
  repository explicitly defines a German term.

## English

- Use an imperative verb only when the source already gives a command or
  mandatory instruction. Preserve supplied modal verbs in all other cases.
- Use explicit subjects in descriptions.
- Prefer concrete verbs over nominalizations and weak verb phrases.
- Avoid stacked multi-word nouns when a preposition or shorter established term
  makes the relationship clearer.
- Keep the project's established American or British English convention.
- Use active voice unless the actor is unknown, irrelevant, or intentionally
  omitted.

## German

- Choose and retain one instruction style: `Sie`, `du`, or infinitive.
- Prefer verbal constructions when nominal style hides the action or actor.
- Use active voice when it makes responsibility clearer.
- Break up long compounds only when a prepositional phrase or established short
  term improves clarity.
- Keep German compounds intact when they are established technical terms.
- Do not copy English sentence-length limits or grammar rules into German.
- Retain English product and UI labels unless supplied terminology defines a
  German form.
- Retain established English technical and workflow terms when they are the
  natural or canonical project language. Do not replace them with invented
  German compounds for stylistic consistency.

## Final Language Check

- Does each action have an unambiguous object?
- Can each condition be tested or observed?
- Does each repeated concept use the same term?
- Did the rewrite change modality or responsibility?
- Did a clearer sentence accidentally add a new relationship?
