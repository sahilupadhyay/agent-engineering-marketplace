import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SCAN = path.join(REPO_ROOT, "scripts", "secret-scan-repo.mjs");
const FIXTURES = path.join(REPO_ROOT, "tests", "fixtures", "secret-scan");

function runScan(root) {
  return spawnSync(process.execPath, [SCAN, "--root", root], {
    encoding: "utf8",
  });
}

function withCopiedFixture(filename) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "secret-scan-"));
  fs.copyFileSync(path.join(FIXTURES, filename), path.join(tmpDir, filename));
  return tmpDir;
}

test("secret scan clean fixture exits 0", () => {
  const tmpDir = withCopiedFixture("clean.md");
  const result = runScan(tmpDir);
  fs.rmSync(tmpDir, { recursive: true, force: true });
  assert.equal(result.status, 0);
});

test("secret scan fake-aws-key fixture exits 1", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "secret-scan-"));
  const fakeKey = "AKIA" + "ABCD1234EFGH5678";
  fs.writeFileSync(
    path.join(tmpDir, "fake-aws-key.md"),
    `# Fake AWS key fixture\n\nThis file contains ${fakeKey} for testing detection.\n`,
  );
  const result = runScan(tmpDir);
  fs.rmSync(tmpDir, { recursive: true, force: true });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /aws-access-key/i);
});

test("secret scan placeholder-key fixture exits 0", () => {
  const tmpDir = withCopiedFixture("placeholder-key.md");
  const result = runScan(tmpDir);
  fs.rmSync(tmpDir, { recursive: true, force: true });
  assert.equal(result.status, 0);
});

test("secret scan repo root exits 0", () => {
  const result = runScan(REPO_ROOT);
  assert.equal(result.status, 0);
});
