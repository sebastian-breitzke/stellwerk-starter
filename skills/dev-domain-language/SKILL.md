---
name: dev-domain-language
description: Keep agent and user speaking the repo's established domain language. Ground in the canonical docs, prefer existing terms, actively suggest the repo's words, check new terms (neu oder bestehend?), and run terminology check rounds at phase transitions. Use when the user mentions ubiquitous language, domain model, DDD, glossary, domain terms, CONTEXT.md, when terminology drifts or conflicts with code, or when a discussion should update the canonical domain doc. Not for general planning pressure (dev-challenge) and not for document reshaping without domain-term work (functional-writing).
argument-hint: "[topic|term|check]"
_organized: true
---

# Domain Language

Course-keeping, not glossary production. The job is that everyone in the
conversation — agent **and** user — speaks the repository's established
language, and that new language gets sorted the moment it appears. The user
should gravitate to the right words because they keep hearing them, not
because they read documents.

## Ground First

Before talking domain, find the repository's canonical documentation — in
whatever form this repo keeps it: a canonical doc set, `CONTEXT.md`, ADRs, a
glossary. Repo-local AX/AGENTS guidance names it; otherwise search for it. The
canonical docs plus the code's own identifiers are the language authority.
Do not invent terms where the repo already has them.

In German prose, keep established English product, engineering, domain, and
workflow terminology in English when that is the repository's canonical or
natural term. Keep its canonical spelling; do not invent German translations
for terms such as `Slice`, `Skill`, `State`, `Review`, `Worktree`, `Branch`,
`Commit`, `Workflow`, or `No-Regression Check`. This is terminology fidelity,
not a rule to replace ordinary German with English.

## Course-Keeping Behaviors

1. **Speak the repo's tone yourself.** Use the established terms in answers,
   plans, questions, tickets, and prototypes — enforcement by example.
2. **Suggest actively.** When the user circumscribes something that has a
   name, offer it: "im Repo heißt das **X**." Short, immediate, no lecture.
3. **Check new terms.** When the user or the agent introduces a term the
   canonical language does not know, ask before adopting it: "Neuer Begriff
   **X** — ist das etwas Neues oder meinst du bestehendes **A**/**B**/**C**?"
   Inside a grilling session this becomes a frontier question
   (`dev-challenge` `references/grilling.md`).
4. **Run check rounds at phase transitions.** Before decisions become tickets,
   documents, or implementation: are the terms in play the repo's terms? Are
   there ambiguities? Does the code contradict the discussion ("your code
   cancels whole Orders, but we just said partial cancellation exists —
   which is right?")?
5. **Warn on drift — gute Reibung.** One short, factual interjection the
   moment a wrong or ambiguous word is used. No moralizing, no repetition
   after the user decides.

## Updating The Canonical Doc

- When a term is genuinely resolved, update the canonical doc inline — in the
  moment, not batched at the end.
- Never bulk-generate glossaries or term lists. Generated bulk buries the
  terms that matter and misses the ones that were never truly clarified.
- Record: canonical term, one-sentence definition of what it *is* (not what
  code does with it), aliases to avoid, known cardinality, unresolved
  ambiguity marked plainly.

If the repo has no convention at all, start the smallest useful one
(`CONTEXT.md` with a `## Language` section) when the first term is resolved —
not before.

## Decision Notes

Do not default to ADR, PAD, RFC, or decision-document formats. Offer one only
when all are true:

- The decision is hard to reverse.
- The reason would be surprising without context.
- There was a real trade-off, not an obvious path.
- Future agents or reviewers would likely re-open the same debate without the note.

Otherwise the resolved term in the canonical doc is enough.

## Good Distinction Questions

- "Do you mean the business party or the login identity?"
- "Can one shipment produce multiple invoices, or exactly one?"
- "If this is cancelled after export, does the domain call that cancellation, reversal, or correction?"

Never ask the user for exploration the agent can do (where something is
implemented, which files to read) — inspect instead.

## Output Contract

When reporting back after a session or check round, return:

1. `Terms Resolved`
2. `Ambiguities`
3. `Document Changes`
4. `Next Question` when the session should continue

Omit `Next Question` when the language is settled enough for the current task.

## Related

- `dev-challenge` — frontier grilling mechanic this skill hooks into.
- `dev-review` — module-interface fit and architecture review after a plan exists.
