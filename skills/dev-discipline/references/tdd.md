---
_organized: true
---
# TDD Mechanics

Concrete steps for test-first work. Policy for when to work test-first lives in `work-mode/verification-policy.md` (Test Strategy) — use this file once test-first is the chosen mechanism.

## The Loop

1. Write one failing test that describes the next behavior
2. Run the test suite, confirm this specific test fails for the expected reason
3. Write the minimum code that makes the test pass
4. Run the test suite, confirm green
5. Refactor without changing observable behavior, re-run suite after each step

Never batch steps. Never write code before step 1.

TDD here means vertical tracer bullets, not horizontal test batches:

```text
Correct:
RED -> GREEN for behavior 1
RED -> GREEN for behavior 2
RED -> GREEN for behavior 3

Wrong:
RED for test 1, test 2, test 3
GREEN for implementation 1, implementation 2, implementation 3
```

Writing all tests first usually tests imagined behavior and prematurely locks in the shape of the implementation. One test, one behavior, one implementation step.

When handing implementation to a subagent or Codex, commit the tests first: any later assertion-weakening becomes a visible diff instead of a silent edit.

## Test Philosophy

Good tests verify behavior through the public interface. They describe what the caller or user can observe, not how the implementation happens internally.

Prefer integration-style tests that exercise real code paths through stable entry points. A test should survive internal refactors. If renaming a private helper or changing internal call order breaks the test while behavior is unchanged, the test is coupled to implementation.

The interface is the test surface. If you need to test past the interface, the module shape is probably wrong.

## Step-by-step Detail

### Step 1 — Write the failing test

- One test at a time
- Test the public surface, not internals
- Write the test in terms of the interface the caller sees
- Name the behavior, not the implementation step
- If you cannot write the test, the requirement is not yet concrete enough — stop and clarify

### Step 2 — Watch it fail

- Run the test suite before writing any production code
- Confirm the error message matches what you expect
- If it fails for the wrong reason (import error, typo, unrelated break), fix that first

If a test passes immediately, it is testing nothing. Delete it or fix it.

### Step 3 — Minimal code to pass

- Write only what the test requires
- Do not anticipate the next test
- Do not add features, guards, or polish that no test asks for

### Step 4 — Confirm green

- Run the full relevant test suite, not just the new test
- If anything else breaks, you coupled something you should not have — stop and fix

### Step 5 — Refactor

- Only when green
- Keep the test suite running after each structural change
- Never refactor with a red suite

After the behavior is green, look for whether the code wants a deeper module: smaller interface, more behavior hidden behind it, less repeated caller knowledge.

## Mocking Rule

Mock at system boundaries only:

- third-party APIs
- time and randomness
- filesystem or process boundaries when no local substitute is practical
- databases only when a real test database or local substitute is not practical

Do not mock your own modules just to make a unit test easy. That usually tests collaboration shape instead of behavior and makes refactors expensive.

When a boundary must be mocked, prefer a narrow domain-specific interface over a generic fetcher or catch-all client. Each mock should return one specific shape without conditional logic.

## Canonical Pitfalls

- Writing the test after the code — not TDD, not useful
- Tests that assert on private state, implementation-internal method calls, or exact log strings — fragile, couple tests to internals
- Tests that assert internal collaborator call counts or call order when the behavior is observable another way
- Tests that verify persistence by bypassing the public interface when the behavior can be verified through retrieval or visible output
- Horizontal slicing: writing a batch of tests before implementing the first vertical behavior
- Tests that share setup mutably between runs — flaky suite, trust dies
- One giant "integration" test that fails in ten ways — useless as a signal

## When TDD Is Not The Right Tool

- Prototyping to find the shape of a solution
- Pure data migration scripts that run once
- Trivial one-liners or typo fixes
- Changes where the test harness does not exist and creating one is the larger task

State this explicitly when skipping TDD. Do not pretend.

## Output When Done

Report:
- test files created or changed
- behaviors now covered
- what is still untested and why
