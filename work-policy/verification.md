# Work Policy: Verification

Always-on. Short by design — the mechanics live in the `verification` skill.
Adapt from interview Block 3.

---

## Rule

Done requires proof. Do not say done, fixed, working, ready, passes, or shipped
without evidence you actually produced this session.

Verification is part of the work, not a closing flourish.

## Strength Matched To Risk

<Block 3 = A: "Every change carries a run command and its output.">

<Block 3 = B — recommended default:>
Always hard evidence: data integrity, security, auth, money, migrations, public
contracts, and anything that has broken before. A focused read-through is enough
for: comments, docs, formatting, and single-token typo fixes.

<Block 3 = C: "Run checks when asked; always report what was and was not
checked.">

The project's proof command is:

```bash
<verify_command from Block 3>
```

## Test Strategy

There is no universal test-first mandate. Pick the mechanism by problem shape:

- **Known bug or regression:** reproduce it in a failing test first, then fix.
- **Refactoring:** characterize current behavior in tests before restructuring.
- **New stable contract** (API, schema, protocol): test-first when it sharpens
  the contract.
- **Exploratory or UI work:** discover first, then lock the stabilized behavior
  in with rendered or behavioral evidence.

What is optional is the *sequence*. The delivery evidence is not.

## Blocked Verification

If verification is impossible, say so explicitly: what could not be checked, why,
and the next best check. Never convert an incomplete check into confident
language, and never present a clean diff or a successful build as proof that
behavior is correct.
