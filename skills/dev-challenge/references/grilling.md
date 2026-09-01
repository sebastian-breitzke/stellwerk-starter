# Frontier Grilling

Shared interview primitive. `dev-challenge` runs it as grilling mode;
`dev-domain-language` hooks its term checks into it; `leitstand` uses it for
intake, brainstorming, and Vorhaben mapping. One mechanic, no per-skill forks.

## Mechanic

Model the topic as a **design tree**: every decision branches into the
decisions that hang off it. The **frontier** is every question whose
prerequisites are already settled — askable now without guessing at answers
not yet given.

Work in **rounds**:

1. Ask the entire current frontier in one round. Do not drip questions one at
   a time.
2. Number questions continuously across rounds (Q1..Qn, numbers never reused),
   so any answer can reference them ("Q7: ja").
3. Format every question exactly like this:

```text
❓ **Q<n>** – **<Titel>**: <question body; offer options A/B/C when they exist>
➡️ <your recommended answer, with a one-line reason>
```

4. After the user answers, recompute the tree: settled decisions push the
   frontier outward and unblock dependent questions. A question whose answer
   depends on another question still open in this round belongs to a later
   round.
5. Mirror newly settled decisions in one compact block before the next round.

## Facts Are Your Job

Decisions belong to the user; facts belong to the agent. If a frontier
question can be answered from the environment — files, code, docs, logs,
retrieval — fetch it with tools or a subagent instead of asking. A running
lookup does not block the round: only the questions downstream of it wait;
ask the rest of the frontier now.

## Domain Course-Keeping Hook

Run the `dev-domain-language` checks inside the rounds: prefer the repo's
established terms in your own questions, and when the user or you introduce a
term the canonical language does not know, add a frontier question in the next
round: "Neuer Begriff **X** — ist das etwas Neues oder meinst du bestehendes
**A**/**B**/**C**?"

## Artifact Pull

When a frontier question is about how something should look or behave and
words start dragging, resolve it with an artifact instead of more text: offer
or produce a prototype (HTML mockup, variants, breakpoints) and let the user
react. A question may be resolved by an artifact, not only by an answer.

## Human In The Loop

Never answer your own frontier questions. Recommended answers are offers; the
user decides. If the runtime persists O-Ton (Leitstand session), store
substantial answers as raw input before synthesizing them.

## Exit Rules

- **Default:** stop when the next implementation or document step is clear.
  Name the remaining open branches in one line instead of asking them.
- **Explicit full depth** ("grille mich komplett durch" or equivalent):
  continue until the frontier is empty — every branch visited, nothing
  silently assumed.
- **Explicit stop** ("ich bin jetzt fertig" or equivalent): stop immediately;
  log open branches as open, do not sneak in final questions.

## Anti-Patterns

- One question per message when the frontier holds several independent ones.
- Asking the user for anything the agent can look up.
- Continuing past a clear next step without an explicit full-depth ask.
- Re-asking settled decisions in later rounds.
- Answering your own questions to keep momentum.
