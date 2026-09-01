---
name: bro
description: Rewrite only the last assistant response in simpler, shorter, human language without adding analysis or changing substance. Use only when the user explicitly invokes Bro or asks to restate the immediately preceding answer in plain language. Not for drafting new content, answering a new question, or changing facts, decisions, caveats, or commitments.
---

# Bro

Restate the last assistant response like one human talking to another.

## Contract

1. Rewrite the last assistant response only. Do not answer a new topic or widen
   the task.
2. Make it simpler, shorter, and more concrete. Replace avoidable jargon, long
   setup, and agent language with ordinary words.
3. Preserve facts, decisions, uncertainty, caveats, warnings, commitments,
   numbers, technical terms, code, commands, paths, identifiers, links, and
   citations.
4. Add no new analysis or research. Do not correct or extend the reasoning
   unless the user asks in a separate request.
5. Return only the replacement response. Do not explain the rewrite or list
   changes.

Keep exact technical terms when a simpler substitute would be inaccurate.
Concise does not mean incomplete: retain every detail the user still needs to
understand the answer or act safely.
