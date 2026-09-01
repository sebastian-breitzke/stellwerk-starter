#!/usr/bin/env node
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const roots = process.argv.slice(2);
const canonicalRoot = path.resolve(process.cwd(), "leitstand");
const legacyRoot = path.resolve(process.cwd(), "tasks/leitstand");
if (roots.length === 0) {
  roots.push(canonicalRoot);
}

const frictionSignal =
  /kotz|frust|hässlich|soulless|slop|schock|kaputt|falsch|geht auch nicht|funktioniert.*nicht|zum kotzen|ich krieg|ich muss selber|warum benutzt|folgst du|leitstand flow|adherence|immer wieder|schon gesagt/i;

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && entry.name === "leitstand.jsonl") out.push(full);
  }
  return out;
}

function readEvents(file) {
  const lines = fs.readFileSync(file, "utf8").split(/\n/).filter(Boolean);
  return lines.map((line, index) => {
    try {
      return JSON.parse(line);
    } catch (error) {
      return { type: "parse_error", line: index + 1, error: error.message };
    }
  });
}

const STALE_MS = 24 * 60 * 60 * 1000;

const subagentTypes = new Set(["subagent", "subagent_review"]);
const workEventTypes = new Set([
  "decision",
  "subagent",
  "subagent_review",
  "state_update",
  "loop_design"
]);

// Count items that open with one status and close with another. Events carry no
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
// finished. Open work means unfinished subagents or blockers anywhere in the
// session, or work events logged after the last integration.
function hasOpenWork(events) {
  const lastIntegration = events.map((event) => event.type).lastIndexOf("integration");
  if (lastIntegration === -1) return false;

  const openSubagents = openCount(
    events,
    subagentTypes,
    new Set(["running"]),
    new Set(["done"])
  );
  const openBlockers = openCount(
    events,
    new Set(["blocker"]),
    new Set(["active", "open"]),
    new Set(["resolved", "done", "closed"])
  );
  // Open decisions (for example a pending retro answer) are open work wherever
  // they sit in the log, not only after the last integration.
  const openDecisions = openCount(
    events,
    new Set(["decision"]),
    new Set(["open"]),
    new Set(["resolved", "superseded", "closed", "done"])
  );
  if (openSubagents > 0 || openBlockers > 0 || openDecisions > 0) return true;

  return events.slice(lastIntegration + 1).some((event) => workEventTypes.has(event.type));
}

function lastEventTs(events) {
  let max = null;
  for (const event of events) {
    const parsed = Date.parse(event.ts ?? "");
    if (!Number.isNaN(parsed) && (max === null || parsed > max)) max = parsed;
  }
  return max;
}

// Repo activity = newest commit time, or "now" for a dirty tracked tree.
// Without git evidence the session cannot be judged stale (no false positives
// from unreadable repos).
function latestRepoActivityTs(dir) {
  const git = (args) =>
    execSync(`git ${args}`, { cwd: dir, stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  try {
    if (git("status --porcelain --untracked-files=no") !== "") return Date.now();
    const parsed = Date.parse(git("log -1 --format=%cI"));
    return Number.isNaN(parsed) ? null : parsed;
  } catch {
    return null;
  }
}

const byRel = new Map();
for (const root of roots) {
  for (const file of walk(root)) {
    const rel = path.relative(root, file);
    if (!byRel.has(rel)) byRel.set(rel, file);
  }
}

const sessions = [];
const eventTypes = new Map();
for (const [rel, file] of [...byRel.entries()].sort()) {
  const events = readEvents(file);
  for (const event of events) {
    eventTypes.set(event.type, (eventTypes.get(event.type) ?? 0) + 1);
  }
  const raws = events.filter((event) => event.type === "user_input_raw" || event.type === "sebastian_input_raw");
  const frictions = events.filter((event) => event.type === "friction");
  const rawSignals = raws.filter((event) => frictionSignal.test(String(event.text ?? "")));
  const subagent = events.filter((event) => event.type === "subagent" || event.type === "subagent_review").length;
  const loopDesign = events.filter((event) => event.type === "loop_design").length;
  const integration = events.filter((event) => event.type === "integration").length;
  const stateUpdate = events.filter((event) => event.type === "state_update").length;
  const statePath = path.join(path.dirname(file), "state.md");
  const hasState = fs.existsSync(statePath);
  const compactedRaw = raws.filter(
    (event) => event.source === "chat_compacted_summary" || /compaction/i.test(String(event.note ?? ""))
  ).length;
  const contextRisk =
    events.length >= 25 || subagent > 0 || loopDesign > 0 || integration > 0 || compactedRaw > 0;
  const completion = events.filter((event) => event.type === "completion").length;
  // Stale = session not closed, no events for STALE_MS, while the repo shows
  // newer commits or a dirty tracked tree — work happened but was not logged.
  const lastTs = lastEventTs(events);
  const repoActivity = completion === 0 && lastTs !== null && Date.now() - lastTs > STALE_MS
    ? latestRepoActivityTs(path.dirname(file))
    : null;
  const stale = repoActivity !== null && repoActivity > lastTs;
  sessions.push({
    rel,
    file,
    events: events.length,
    raw: raws.length,
    compactedRaw,
    goal: events.filter((event) => event.type === "goal" || event.type === "goal_proposal").length,
    workmode: events.filter((event) => event.type === "workmode").length,
    friction: frictions.length,
    rawSignalNoFriction: rawSignals.length > 0 && frictions.length === 0,
    subagent,
    loopDesign,
    integration,
    stateUpdate,
    hasState,
    contextRisk,
    openWork: hasOpenWork(events),
    stale,
    completion,
    parseErrors: events.filter((event) => event.type === "parse_error").length
  });
}

function list(predicate) {
  return sessions.filter(predicate).map((session) => session.rel);
}

const summary = {
  roots,
  migration: fs.existsSync(legacyRoot)
    ? {
        legacyRoot,
        action: "Run: git mv tasks/leitstand leitstand"
      }
    : null,
  sessions: sessions.length,
  eventTypes: Object.fromEntries([...eventTypes.entries()].sort((a, b) => b[1] - a[1])),
  adherence: {
    missingRaw: list((session) => session.raw === 0),
    missingGoal: list((session) => session.goal === 0),
    missingWorkmode: list((session) => session.workmode === 0),
    missingCompletionAfterIntegration: list(
      (session) => session.integration > 0 && session.completion === 0 && !session.openWork
    ),
    staleActiveSessions: list((session) => session.stale),
    rawSignalWithoutFriction: list((session) => session.rawSignalNoFriction),
    compactedRaw: list((session) => session.compactedRaw > 0),
    missingStateForContextRisk: list((session) => session.contextRisk && !session.hasState),
    stateUpdateWithoutState: list((session) => session.stateUpdate > 0 && !session.hasState),
    stateWithoutUpdateEvent: list((session) => session.hasState && session.stateUpdate === 0),
    highScopeWithoutSubagent: sessions
      .filter((session) => session.events >= 25 && session.subagent === 0)
      .map((session) => session.rel),
    highScopeWithoutLoopDesign: sessions
      .filter((session) => session.events >= 25 && session.loopDesign === 0)
      .map((session) => session.rel)
  }
};

console.log(JSON.stringify(summary, null, 2));
