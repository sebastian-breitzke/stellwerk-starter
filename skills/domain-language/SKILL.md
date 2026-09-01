---
name: domain-language
description: >
  Keep the conversation, documents, and code aligned with the repository's
  established domain language. Use when terms drift, a domain model or glossary
  is discussed, a new term is introduced, or an agreed term should update the
  canonical documentation. Not for general planning pressure (challenge) or
  prose work without terminology decisions (functional-writing).
---

# Domain Language

Course-keeping, not glossary production.

## Ground First

Find the repository's language authority: its canonical docs, context file,
glossary, ADRs, and existing code identifiers. Use its established terms and
spelling. Do not invent a synonym merely to make the prose smoother.

## Behaviors

1. Speak the repository's language in plans, questions, tickets, and code.
2. When the user describes something with an established name, offer it briefly:
   "In this repo it is called **X**."
3. When a new term appears, ask once before adopting it: "Is **X** new, or do
   you mean existing **A**, **B**, or **C**?"
4. Before a decision becomes code or documentation, run a terminology check:
   are the terms unambiguous and consistent with code?
5. When a term is resolved, update the canonical document in the same slice.

Do not make the user search the repository for you. Inspect first.

## Canonical Documentation

Record only the useful minimum:

- canonical term
- one-sentence meaning
- aliases to avoid
- a material cardinality or ambiguity, when one exists

Do not bulk-generate a glossary. If the repository has no language convention,
start the smallest useful `## Language` section when the first term is actually
resolved.

## Report Shape

```text
Terms Resolved
- <term>: <meaning>

Ambiguities
- <term>: <what remains open>

Document Changes
- <path>: <change>

Next Question
- <only when needed>
```
