import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { runEvals } from "../evals/run.mjs";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FIXTURES = path.join(REPO_ROOT, "tests", "fixtures");
const RUN = path.join(REPO_ROOT, "evals", "run.mjs");

function runEvalCli(root) {
  return spawnSync(process.execPath, [RUN, "--root", root], {
    encoding: "utf8",
  });
}

test("runEvals eval-pass fixture returns no errors", () => {
  const errors = runEvals(path.join(FIXTURES, "eval-pass"));
  assert.equal(errors.length, 0);
});

test("runEvals eval-fail-regex reports failure", () => {
  const errors = runEvals(path.join(FIXTURES, "eval-fail-regex"));
  assert.ok(errors.length > 0);
  assert.match(errors.join("\n"), /fail-regex/i);
});

test("runEvals eval-fail-dead-path reports dead path", () => {
  const errors = runEvals(path.join(FIXTURES, "eval-fail-dead-path"));
  assert.ok(errors.length > 0);
  assert.match(errors.join("\n"), /dead path reference/i);
});

test("runEvals eval-fail-schema reports schema error", () => {
  const errors = runEvals(path.join(FIXTURES, "eval-fail-schema"));
  assert.ok(errors.length > 0);
  assert.match(errors.join("\n"), /activation|schema/i);
});

test("CLI repo root evals exit 0", () => {
  const result = runEvalCli(REPO_ROOT);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Evals passed/);
});
