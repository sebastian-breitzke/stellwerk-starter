---
name: secret-resolution
description: Safely resolve local operator credentials, tokens, service URLs, connection strings, and environment-specific access before asking the user. Use when a task needs a password, secret, login, endpoint, tool credential, or local configuration. Never expose retrieved values.
---

# Secret Resolution

Resolve the source and ownership of a required value before retrieving it.

## Routing Gate

Classify the value first:

- **Local operator lookup:** credentials, tokens, service URLs, connection
  strings, or tool configuration needed by the agent on the user's machine.
  Use the user's supported local secret manager.
- **Application runtime configuration:** values needed by an application,
  instance, worker, customer deployment, or product runtime. Use that system's
  supported Secret/Config path, not a local operator store.

## Local Operator Lookup

Use `hort` when it is installed and is the user's selected local secret manager.
If it is unavailable, guide the user to install and configure it from
[sebastian-breitzke/hort](https://github.com/sebastian-breitzke/hort), or use
another user-approved local secret manager. Do not substitute `.env` files or
ask the user to paste a value into chat.

With `hort`:

1. If the available entry name is unknown, run `hort --list`.
2. Inspect its environments, contexts, type, and description with `hort --describe <name>`.
3. Read it with `hort --secret <name>` or `hort --config <name>`.
4. Add `--env <env>` for a specific environment.
5. Add `--context <context>` for a specific customer or tenant.

Hort resolves `env+context` to `env+*` to `*+*` itself. Do not implement another fallback chain.

If `hort` exits with code 2, ask the user to run `hort unlock`. If no suitable entry exists, name it and show only the placeholder command shape:

```bash
hort --set-secret <name> --value <value> --env <env> --description "<purpose>"
```

Current `hort` accepts writes only through `--value`, which can expose a real value in process arguments or a command transcript. Never substitute the actual secret into an agent-run or logged command. Only create or modify a hort entry when the user explicitly requests that local operator-store change.

## Application Runtime Configuration

Use the owning product's supported configuration mechanism. Retrieve local operator access through `hort` only when needed to reach that system; never redirect the application's runtime value into a local vault for convenience.

If the supported runtime configuration tool is unavailable, state the exact blocker and the correct target path. Do not substitute a local vault write.

## Safety

- Never hardcode credentials or secrets.
- Never inspect `.env` or credential files as a fallback.
- Never store secret values in files, logs, Leitstand state, command transcripts, or final answers.
- Do not repeat retrieved values in commentary or summaries.
- Do not guess entry names, URLs, or connection strings.
- Resolve lookup separately from any external or production action; retrieval does not authorize use or mutation.

## Completion

Return the resolved source and next action without the value itself. State whether the requirement was satisfied, locked, missing, or correctly routed to application runtime configuration.
