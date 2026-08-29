import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { validateBenchmarkRoot } from "../scripts/lib/benchmarks.mjs";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SCHEMA = path.join(REPO_ROOT, "schemas", "benchmark-scenario.schema.json");
const RUNNER = path.join(REPO_ROOT, "benchmarks", "run.mjs");
const FIXTURES = path.join(REPO_ROOT, "tests", "fixtures");

test("validateBenchmarkRoot accepts repo scenarios", () => {
  const errors = validateBenchmarkRoot(REPO_ROOT, SCHEMA);
  assert.equal(errors.length, 0);
});

test("validateBenchmarkRoot reports missing prompt", () => {
  const errors = validateBenchmarkRoot(
    path.join(FIXTURES, "fail-benchmark-missing-prompt"),
    SCHEMA,
  );
  assert.ok(errors.some((err) => /missing prompt file/.test(err)));
});

test("CLI benchmarks exit 0 on repo root", () => {
  const result = spawnSync(process.execPath, [RUNNER], {
    encoding: "utf8",
    cwd: REPO_ROOT,
  });
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Benchmark metadata valid/);
});

test("CLI --model exits 2 and does not print scores", () => {
  const result = spawnSync(process.execPath, [RUNNER, "--model"], {
    encoding: "utf8",
    cwd: REPO_ROOT,
  });
  assert.equal(result.status, 2);
  assert.match(result.stderr, /not wired to a provider/);
  assert.doesNotMatch(result.stdout + result.stderr, /\bscore\s*[:=]\s*\d/i);
});
