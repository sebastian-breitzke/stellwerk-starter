# Work Policy Blueprint: Verification

Done requires proof.

Verification is part of the work, not an afterthought at the end.

## Rule

Do not claim done, fixed, working, ready, or shipped without evidence.

Evidence can be:

- a test run
- a build or parser check
- direct script execution
- rendered UI inspection
- source-backed review
- final document read-through

## Match The Check To The Risk

- Code change: run targeted tests or direct execution.
- Bug fix: reproduce the failure before and after when feasible.
- Prompt or skill change: read the final instruction and run a small scenario.
- UI change: render the affected surface.
- Docs-only change: read the final document.
- Data or destructive change: dry-run or use a representative copy first.

## Report

State:

- what was checked
- what passed
- what remains unverified
- why any stronger check was not run

Do not convert incomplete verification into confidence language.
