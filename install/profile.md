# Profile

The interview answers become one file: `stellwerk-profile.md`, written at the
scope the user chose in Block 1.

It exists so that a later agent — or the same agent after a fresh context — can
re-install, upgrade, or extend the runtime without re-running the interview.
Every generated file traces back to a line here.

## Template

Copy this, fill every field, delete nothing. `unknown` is a valid value;
a missing field is not.

```markdown
# Stellwerk Profile

Generated: <YYYY-MM-DD> by <agent/runtime>
Source: stellwerk-starter <commit sha or "unpinned">

## Environment (detected)

- Runtimes: <claude-code | codex | copilot | gemini | cursor | other>
- Instruction files found: <paths, or "none">
- Repo: <path> (<git remote or "no remote">)
- Team signals: <branch protection | CODEOWNERS | CI | none>
- Languages: <list>
- Test command: <command, or "none found">
- Secret manager: <op | pass | bw | gopass | vault | none>

## Decisions (interview)

| Block | Answer | Consequence |
|-------|--------|-------------|
| 1 Scope | <A/B/C> | files at <paths> |
| 2 Autonomy | <A/B/C> | <act/ask boundary in one clause> |
| 3 Verification | <A/B/C>, command `<cmd>` | <what always needs evidence> |
| 4 Integration | <A/B/C> | <workmode name and integration rule> |
| 5 Session memory | <A/B/C>, <tracked/gitignored> | <log root or "none"> |
| 6 Workflows | <skill list> | <installed paths> |
| 7 Voice | <language>, <register> | stop doing: <text> |
| 8 Boundaries | <secret manager> | never touch: <list> |

## Installed

- <path> — <layer/skill> — adapted from <starter source file>

## Deliberately Not Installed

- <skill> — <reason> — add when <condition>

## Verification Run

- <check>: <result> (<date>)

## Change Log

- <YYYY-MM-DD>: <what changed and why>
```

## Rules

- **One profile per scope.** A global install and a repo install each get their
  own; the repo one may narrow the global one but must say so.
- **The profile is the contract.** If you deviate during install, edit the
  profile in the same turn and say why in the report.
- **No secrets, no personal context.** Entry names and manager names only. This
  file is likely to end up in a repo.
- **Re-install is a diff, not a rewrite.** On a later run, read the profile,
  ask only about what changed, and append to the change log.
