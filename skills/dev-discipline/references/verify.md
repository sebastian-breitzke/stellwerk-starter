---
_organized: true
---
# Verify Mechanics

Concrete steps for producing real evidence before claiming done. Policy lives in `work-mode/verification-policy.md`. This file is the how.

## The Gate

Before writing the words "done", "fixed", "passes", "works", or "ready":

1. Choose the verification method that matches the change
2. Run it
3. Read the full output, not only the final line
4. Quote the decisive part of the output in your response
5. State what is verified and what remains unverified

Skipping any step turns "done" into a guess.

For non-trivial slices, make the final evidence audit independent of the
implementer's self-assessment. Use a clean-context verifier only when task risk,
evidence volume, or reviewer independence earns the extra agent; otherwise run
the focused checks directly and inspect their complete output.

## Verification Methods by Change Type

- Logic change in code → run the relevant test suite or targeted tests
- Bug fix → fail-then-pass the new regression test, then full relevant suite
- Build or CI config change → run the build locally or reproduce the CI step
- UI change → render it, navigate the affected flow, open each popover, menu,
  overlay, and dialog the change touches once, confirm no console errors —
  resting-state checks miss the failures that live inside closed Aufschläge
- Data migration → dry-run against a representative copy, confirm counts and shape
- Infra or deploy change → apply to a non-prod target first, confirm health checks
- Docs-only or typo → read the rendered output, skip test runs

Pick the cheapest method that actually proves the thing.

## Banned Phrasings Without Evidence

These words imply certainty. Do not use them unless you have fresh output to back them:

- "should work"
- "should pass"
- "probably fine"
- "I believe"
- "I think this is correct"
- "looks right"
- "in theory"

Replace with either the concrete evidence or an explicit "not verified because ...".

## What Counts as Evidence

Good evidence:
- command run, exit code, last relevant lines of output
- test file, test case name, pass or fail status
- rendered page screenshot or DOM inspection result
- deploy health check response
- reproduced failing case turning green after the fix

Weak evidence that is not enough on its own:
- "it compiles"
- "no obvious errors"
- "the diff looks clean"
- "similar code elsewhere works"

## When Verification Is Blocked

If the change cannot be verified locally or the verification tool is unavailable:

- say so explicitly
- name the blocker
- propose the closest alternative that can run now
- state what verification will run at the next feasible point

Do not silently ship partial verification as full verification.

## Report Shape

Return:
- what was run
- result
- quoted decisive output
- what remains unverified
- next verification step if applicable

## Canonical Pitfalls

- Running the wrong subset of tests and claiming "tests pass"
- Relying on the IDE marker only, not a real run
- Reading only the summary line of a long output and missing a warning or a skipped test
- Claiming a UI change works because the server started, without actually rendering the page
