#!/usr/bin/env node
// Audit session logs for the gaps that actually cost you later.
//
// Usage:
//   node audit-session-logs.mjs                 # audits ./tasks/sessions
//   node audit-session-logs.mjs <session-dir>   # audits one session
//   node audit-session-logs.mjs <root> [<root>] # audits several roots
//
// Prints a JSON summary. Exit code is always 0 — this reports, it does not gate.
// No dependencies. Node 18+.

import fs from "node:fs";
import path from "node:path";

const roots = process.argv.slice(2);
if (roots.length === 0) roots.push(path.resolve(process.cwd(), "tasks/sessions"));

// Words that mean the user was pushing back. Adapt to the user's own language.
const frictionSignal =
  /frustrat|annoy|again|already (said|told)|not what i|wrong|broken|doesn'?t work|why (did|are) you|stop doing|i keep|immer wieder|schon gesagt|nicht was ich|funktioniert nicht|falsch/i;

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && entry.name === "session.jsonl") out.push(full);
  }
  return out;
}

function readEvents(file) {
  return fs
    .readFileSync(file, "utf8")
    .split(/\n/)
    .filter(Boolean)
    .map((line, index) => {
      try {
        return JSON.parse(line);
      } catch (error) {
        return { type: "parse_error", line: index + 1, error: error.message };
      }
    });
}

const workEventTypes = new Set(["decision", "subagent", "state_update", "loop_design"]);

// Count items opened with one status and closed with another. Events carry no
// correlation id, so a closing event settles an arbitrary open one.
function openCount(events, types, openStatus, closeStatus) {
  let open = 0;
  for (const event of events) {
    if (!types.has(event.type)) continue;
    if (openStatus.has(event.status)) open += 1;
    else if (closeStatus.has(event.status)) open = Math.max(0, open - 1);
  }
  return open;
}

// A session that integrates verified slices as it goes is mid-flight, not
// finished. Open work = unfinished workers or blockers anywhere, or work events
// logged after the last integration.
function hasOpenWork(events) {
  const lastIntegration = events.map((e) => e.type).lastIndexOf("integration");
  if (lastIntegration === -1) return false;
  const openWorkers = openCount(events, new Set(["subagent"]), new Set(["running"]), new Set(["done"]));
  const openBlockers = openCount(
    events,
    new Set(["blocker"]),
    new Set(["active", "open"]),
    new Set(["resolved", "done", "closed"])
  );
  if (openWorkers > 0 || openBlockers > 0) return true;
  return events.slice(lastIntegration + 1).some((e) => workEventTypes.has(e.type));
}

const files = new Map();
for (const root of roots) {
  const stat = fs.existsSync(root) ? fs.statSync(root) : null;
  const found =
    stat && stat.isDirectory() && fs.existsSync(path.join(root, "session.jsonl"))
      ? [path.join(root, "session.jsonl")]
      : walk(root);
  for (const file of found) if (!files.has(file)) files.set(file, root);
}

const sessions = [];
const eventTypes = new Map();

for (const file of [...files.keys()].sort()) {
  const events = readEvents(file);
  for (const event of events) eventTypes.set(event.type, (eventTypes.get(event.type) ?? 0) + 1);

  const raws = events.filter((e) => e.type === "user_input_raw");
  const frictions = events.filter((e) => e.type === "friction");
  const workers = events.filter((e) => e.type === "subagent").length;
  const loopDesign = events.filter((e) => e.type === "loop_design").length;
  const integration = events.filter((e) => e.type === "integration").length;
  const stateUpdate = events.filter((e) => e.type === "state_update").length;
  const hasState = fs.existsSync(path.join(path.dirname(file), "state.md"));

  sessions.push({
    rel: path.relative(process.cwd(), file),
    events: events.length,
    raw: raws.length,
    goal: events.filter((e) => e.type === "goal").length,
    workmode: events.filter((e) => e.type === "workmode").length,
    friction: frictions.length,
    rawSignalNoFriction:
      raws.some((e) => frictionSignal.test(String(e.text ?? ""))) && frictions.length === 0,
    workers,
    loopDesign,
    integration,
    stateUpdate,
    hasState,
    contextRisk: events.length >= 25 || workers > 0 || loopDesign > 0 || integration > 0,
    openWork: hasOpenWork(events),
    completion: events.filter((e) => e.type === "completion").length,
    parseErrors: events.filter((e) => e.type === "parse_error").length,
  });
}

const list = (predicate) => sessions.filter(predicate).map((s) => s.rel);

console.log(
  JSON.stringify(
    {
      roots,
      sessions: sessions.length,
      eventTypes: Object.fromEntries([...eventTypes.entries()].sort((a, b) => b[1] - a[1])),
      findings: {
        parseErrors: list((s) => s.parseErrors > 0),
        missingRawInput: list((s) => s.raw === 0),
        missingGoal: list((s) => s.goal === 0),
        missingWorkmode: list((s) => s.workmode === 0),
        rawSignalWithoutFriction: list((s) => s.rawSignalNoFriction),
        missingCompletionAfterIntegration: list(
          (s) => s.integration > 0 && s.completion === 0 && !s.openWork
        ),
        missingStateForContextRisk: list((s) => s.contextRisk && !s.hasState),
        stateUpdateWithoutStateFile: list((s) => s.stateUpdate > 0 && !s.hasState),
        stateFileWithoutUpdateEvent: list((s) => s.hasState && s.stateUpdate === 0),
        highScopeWithoutDelegation: list((s) => s.events >= 25 && s.workers === 0),
        highScopeWithoutLoopDesign: list((s) => s.events >= 25 && s.loopDesign === 0),
      },
    },
    null,
    2
  )
);
