# Verify

An install you did not verify is a set of files, not a runtime. Three checks.
All of them are cheap. Run all three and show the real output.

---

## Check 1 — Structure

Mechanical. Run it, do not eyeball it.

```bash
# adjust paths to the install target from the profile
find <install-root> -name '*.md' | sort
wc -l <always-on-file>
grep -rnE '<[^>]{1,80}>' <install-root> --include='*.md'   # surviving placeholders and variants
grep -rniE 'password|api[_-]?key|secret|token|BEGIN [A-Z ]*PRIVATE KEY' <install-root>
```

Pass conditions:

- every file from the plan exists, nothing extra
- always-on layer is inside its budget (~200 lines total)
- zero surviving `<placeholder>` strings
- zero secret hits (entry *names* are fine; values are not)
- no leftover old instruction file competing with the new one

---

## Check 2 — Routing

This is the check that matters. The observed failure mode of skill systems is
not broken procedures — it is skills that never fire, or fire on the wrong turn.

For each installed skill, take its `evals.json` if it has one, or write two
prompts on the spot:

- one **should-trigger** prompt in the user's own phrasing
- one **near-miss** prompt that must *not* trigger it

Then run them in a fresh session and record what actually happened.

```text
Skill: leitstand
  should trigger: "ich hab hier eine größere Sache, lass uns das ordentlich aufziehen"  -> fired? <yes/no>
  must not fire:  "was macht Zeile 40 in dieser Datei?"                                  -> fired? <yes/no>
```

Rules for grading:

- **Evidence, not vibes.** A skill counts as fired only if the runtime shows a
  skill/tool event. An answer that merely *sounds* like the skill is not proof —
  mark it `behavioral-only` and do not treat it as a pass.
- A near-miss that fires is a worse defect than a trigger that misses. It burns
  context on every unrelated turn.
- **The fix is almost always the `description`, not the body.** Add the missing
  trigger phrase, or add the explicit "Not for …" clause. Re-run.
- One run is a smoke test. If the user cares about a skill, run it three times
  before believing the result.

---

## Check 3 — One Real Task

Pick something small and real from the user's actual work — a bug, a doc, a
review of an existing diff. Run it through the new setup end to end.

Watch for:

- Did the right skill load without being named?
- Did the agent stop where the autonomy answer (Block 2) says it should?
- Did it produce verification evidence per Block 3?
- Did it follow the integration mode from Block 4?
- Did the voice match Block 7 — including the "stop doing" line?

Any mismatch is an install defect. Fix it now, while the context is fresh, and
record the fix in the profile's change log.

---

## Reporting Verification

```text
Verified
- structure: <N files, always-on <N> lines, 0 placeholders, 0 secret hits>
- routing: <N/N skills fired on trigger, N/N stayed quiet on near-miss>
- real task: <what ran, what the output showed>

Not verified
- <what you could not check, and why>
```

Do not convert a partial check into confident language. "Routing verified for
three of five skills" is a fine thing to say; "routing verified" when you tested
three is not.
