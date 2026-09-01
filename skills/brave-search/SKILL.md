---
name: brave-search
description: "Brave Search retrieval primitive using the bundled CLI wrapper. Invoke directly only when the user names Brave/brave-search or when a research workflow needs Brave-first search results; use research for synthesis."
argument-hint: "<query> [--json] [--limit N]"
_organized: true
---

# /brave:search - Brave Search API

**Purpose:** Narrow retrieval primitive using Brave Search API via bundled CLI wrapper.

This skill does not own synthesis. Use `research` for source policy, evidence
quality, caveats, and final answers.

Stop after retrieval. Return search results, raw JSON, or a retrieval failure
note; do not write recommendations, comparisons, research conclusions, or final
answers from this skill.

## When to Use

Use Brave directly when:

- the user explicitly asks for Brave or `brave-search`
- a workflow or `research` step needs Brave-first retrieval
- an operator-heavy query benefits from the CLI and local history

Prefer Brave as the retrieval primitive for:
- technical searches
- operator-heavy queries
- documentation and API lookups
- research pipelines that benefit from local history and clean output

Do not use this skill as a substitute for `research` when the task requires
source-backed synthesis, comparison, decision support, or a written report.

Within a `research` workflow, use native web search as fallback when:
- Brave is unavailable
- Brave is rate-limited
- the current runtime cannot execute the bundled CLI

## Usage

```text
/brave:search "your query"
/brave:search "site:github.com react hooks"
/brave:search "Model Context Protocol" --json
/brave:search "python tutorials" --limit 5
```

Additional flags: `--freshness pd|pw|pm|py`, `--country DE`, `--search-lang de`, `--extra-snippets`, `--no-history`; run `--help` for all.

Queries are capped at 400 chars / 50 words (script-enforced).

## Setup Gate

- Brave Search requires an API key. Resolve it through the user's approved
  local secret manager before retrieval.
- When the user uses `hort`, the expected entry is `brave-api-key`; otherwise
  ask them to configure an equivalent local secret-manager entry. Do not ask
  for, print, or persist the key in chat, files, commands, or logs.
- If no approved local secret manager is configured, stop and guide the user to
  set one up first. `secret-resolution` documents the portable `hort` route and
  its installation instructions.

## Command

```bash
BRAVE_API_KEY=$(hort --secret brave-api-key) \
  python3 <skill-dir>/scripts/brave_search.py "<query>" --limit 10
```

`<skill-dir>` is this skill's directory in the active deployment.

Use the script from this skill's deployed directory. If it is not installed,
install this skill into the user's runtime before retrying; do not guess a
machine-specific source checkout path.

## Output

Default:
```text
Found N web results for: <query>

1. [Title]
   URL: <url>
   <description snippet>
```

`--json`:
- return raw parsed JSON for programmatic use

Search history defaults to `~/.local/state/brave-search/` and can be redirected
with `--history-dir`. It is retrieval audit material, not a research folder or
final report.

Brave snippets are candidate-source signals, not full-page evidence. A research
workflow should open or fetch decisive sources before citing detailed claims.

## Operators

| Operator | Example |
|----------|---------|
| `site:` | `site:github.com react` |
| `filetype:` | `filetype:pdf machine learning` |
| `intitle:` | `intitle:tutorial python` |
| `inurl:` | `inurl:blog web3` |
| `-` | `python -django` |
| `"exact"` | `"model context protocol"` |
| `OR` | `react OR vue` |

## Error Handling

If the API key is missing:
- state that the user's local secret-manager entry for the Brave API key is
  missing or unavailable; guide setup before retrying
- do not silently degrade to an unauthenticated request

If rate-limited or the CLI fails:
- return a clear retrieval failure note
- in a `research` workflow, let that workflow fall back to native web search

## Notes

- This skill is the search primitive.
- Use `/research` for synthesis-heavy tasks; `research` should route searches through this primitive first.
