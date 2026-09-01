import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const scaffold = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "leitstand-scaffold.mjs"
);

test("refuses a legacy tasks/leitstand root and gives the git mv migration", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "leitstand-scaffold-"));
  fs.mkdirSync(path.join(root, "tasks", "leitstand"), { recursive: true });

  assert.throws(
    () =>
      execFileSync(process.execPath, [scaffold, "--slug", "migration-test", "--goal", "fixture"], {
        cwd: root,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"]
      }),
    (error) =>
      error.status === 3 && String(error.stderr).includes("git mv tasks/leitstand leitstand")
  );
});
