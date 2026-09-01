---
name: unslop
description: Validate and conservatively clean human-facing prose by removing AI preambles, puffery, vague attribution, filler, jargon, and formulaic patterns without changing facts, structure, modality, uncertainty, warnings, terminology, or voice. Use when the user explicitly asks to unslop or de-slop a draft, or as the final validation handoff from a writing skill. Not for generating a first draft, adding personality or opinions, or rewriting code and literal material.
---

# Unslop

Act as a validator, not an author. Remove detectable language slop with the
smallest safe edit.

## Workflow

1. Identify the content and voice owners. Functional Writing owns meaning and
   structure; a voice skill owns personal style. Do not overrule either.
2. Protect facts, relationships, modality or force, uncertainty, caveats,
   warnings, commitments, terminology, headings, and requested structure.
3. Treat quotes, O-Ton, code, commands, identifiers, paths, URLs, citations,
   and supplied labels as literal material. Do not rewrite them.
4. Read `references/patterns.md` and scan only for the listed patterns.
5. Make the smallest local edits that remove real slop. Preserve deliberate
   repetition, rhythm, fragments, humor, sharpness, and domain language.
6. Compare the result with the input. Revert any edit that changes meaning,
   evidence, voice, responsibility, or confidence.

## Output

- When invoked on a draft, return only the cleaned draft unless the user asks
  for findings.
- When another writing skill hands off to Unslop, return the validated artifact
  to that skill without adding another section or commentary.
- When no safe edit is needed, return the input unchanged.

## Hard Stops

- Do not invent facts, examples, opinions, transitions, warmth, or personality.
- Do not apply global punctuation bans, fixed sentence-length limits, forced
  variety, or a generic conversational style.
- Do not remove uncertainty, warnings, exceptions, repetition that carries
  emphasis, or precise technical terms merely to make prose smoother.
- Do not reorganize the artifact unless the owning writing skill or user
  explicitly authorized restructuring.
