#!/usr/bin/env node
// Scaffold a session: creates <root>/<ts>-<slug>/session.jsonl, writes the
// initial events, and creates the initial state.md in one call.
//
// Usage:
//   node session-scaffold.mjs --slug <short-slug> \
//     [--root tasks/sessions] \
//     [--input-file <path> | --input "<raw text>"] \
//     [--goal "<one-sentence goal>"] \
//     [--mode solo-main|team-pr --mode-source <AGENTS.md|inferred>] \
//     [--integration "<integration rule>"]
//
// Raw input may also be piped via stdin. Prints the created session directory.
//
// No dependencies. Node 18+.

import fs from "node:fs";
import path from "node:path";

function arg(name) {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] !== undefined ? process.argv[i + 1] : undefined;
}

const slug = arg("slug");
if (!slug || !/^[a-z][a-z0-9-]*$/.test(slug)) {
  console.error("Required: --slug <short-lowercase-slug> (starts with a-z; a-z, 0-9, dashes)");
  process.exit(1);
}

const root = arg("root") ?? path.resolve(process.cwd(), "tasks/sessions");

function localIso(d = new Date()) {
  const tz = -d.getTimezoneOffset();
  const sign = tz >= 0 ? "+" : "-";
  const pad = (n) => String(Math.abs(n)).padStart(2, "0");
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
    `T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}` +
    `${sign}${pad(Math.floor(Math.abs(tz) / 60))}:${pad(Math.abs(tz) % 60)}`
  );
}

const stamp = localIso();
const dirStamp = stamp.slice(0, 19).replace(/[-:T]/g, "").replace(/^(\d{8})(\d{6})$/, "$1-$2");
const sessionDir = path.join(root, `${dirStamp}-${slug}`);

if (fs.existsSync(sessionDir)) {
  console.error(`Session dir already exists: ${sessionDir}`);
  process.exit(1);
}

let rawText = arg("input");
const inputFile = arg("input-file");
if (!rawText && inputFile) rawText = fs.readFileSync(inputFile, "utf8");
if (!rawText && !process.stdin.isTTY) {
  try {
    rawText = fs.readFileSync(0, "utf8");
  } catch {
    rawText = undefined;
  }
}

const events = [];
if (rawText && rawText.trim()) {
  events.push({
    ts: stamp,
    type: "user_input_raw",
    phase: "intake",
    source: "chat",
    text: rawText.replace(/\r\n/g, "\n").trimEnd(),
  });
}

const goal = arg("goal");
if (goal) {
  events.push({ ts: stamp, type: "goal", phase: "intake", status: "proposed", summary: goal });
}

const mode = arg("mode");
if (mode) {
  if (!["solo-main", "team-pr"].includes(mode)) {
    console.error(`Unknown --mode: ${mode} (expected solo-main or team-pr)`);
    process.exit(1);
  }
  events.push({
    ts: stamp,
    type: "workmode",
    phase: "intake",
    mode,
    source: arg("mode-source") ?? "inferred",
    integration:
      arg("integration") ??
      (mode === "solo-main"
        ? "worktree -> verify -> commit -> merge main"
        : "branch -> PR -> CI/review -> merge on approval"),
  });
}

if (events.length === 0) {
  console.error("Nothing to write: provide raw input (stdin/--input/--input-file), --goal, or --mode.");
  process.exit(1);
}

function stateMarkdown() {
  const title = slug.replace(/-/g, " ");
  const workmode = mode ? `${mode} (${arg("mode-source") ?? "inferred"})` : "Not resolved yet.";
  const inputNote =
    rawText && rawText.trim()
      ? "Raw user input is preserved verbatim in session.jsonl."
      : "No raw input captured yet.";

  return `# Session State: ${title}

## Current Goal
${goal ?? "Not set yet."}

## Current Phase
intake — session scaffolded.

## Read First
- session.jsonl
- repo-local agent instructions (AGENTS.md, CLAUDE.md, or equivalent)

## Decisions
- None yet.

## Active Workstreams
- Main agent: clarify direction and define the first runnable slices.

## Evidence
- ${inputNote}
- Workmode: ${workmode}

## Open Risks / Blockers
- None logged yet.

## Next Slices
- 1. Confirm the goal and fill this backlog — done: every slice has an outcome, a done criterion, and a verification — verify: \`run\` mode accepts the top slice.

## Out Of Scope
- Not defined yet.
`;
}

fs.mkdirSync(sessionDir, { recursive: true });
fs.writeFileSync(path.join(sessionDir, "state.md"), stateMarkdown());
events.push({
  ts: stamp,
  type: "state_update",
  phase: "intake",
  path: "state.md",
  reason: "scaffold",
  summary: "Created initial session state from scaffold inputs.",
});
fs.writeFileSync(
  path.join(sessionDir, "session.jsonl"),
  events.map((e) => JSON.stringify(e)).join("\n") + "\n"
);

console.log(sessionDir);
