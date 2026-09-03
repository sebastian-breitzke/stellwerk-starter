# Agent Entry Point: Build a User-Owned Skill Library

This repository is public source material. The user should end with their own
agent-runtime repository, not a modified copy of this one.

## Read Order

1. Read [README.md](README.md) for the human-facing model and boundaries.
2. Read [onboarding/BUILD-YOUR-SKILL-LIBRARY.md](onboarding/BUILD-YOUR-SKILL-LIBRARY.md).
3. Follow that guide as the canonical onboarding workflow.

Do not treat `install/` as a second onboarding path. Those files are runtime
placement and verification references that the canonical guide loads on demand.

## Non-Negotiable Boundary

- Build in the user's chosen repository, never in this Starter checkout unless
  the user explicitly asks to improve the Starter itself.
- Treat this repository as a selective source: complete portable skill
  directories may be copied, while identity, context, runtime paths, and
  secrets must be created for the user.
- Do not copy personal context, customer material, session logs, hostnames,
  vault data, or secret values.
- Before creating or changing files outside the user's chosen repository, show
  the exact paths and ask.

The onboarding guide owns the remaining procedure, interview, deployment
design, and verification contract.
