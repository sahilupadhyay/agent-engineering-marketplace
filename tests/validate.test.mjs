import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { validateRoot } from "../scripts/validate.mjs";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FIXTURES = path.join(REPO_ROOT, "tests", "fixtures");
const VALIDATE = path.join(REPO_ROOT, "scripts", "validate.mjs");

function runValidate(root) {
  return spawnSync(process.execPath, [VALIDATE, "--root", root], {
    encoding: "utf8",
  });
}

test("validateRoot pass-empty returns no errors", () => {
  const errors = validateRoot(path.join(FIXTURES, "pass-empty"));
  assert.equal(errors.length, 0);
});

test("validateRoot pass-plugin returns no errors", () => {
  const errors = validateRoot(path.join(FIXTURES, "pass-plugin"));
  assert.equal(errors.length, 0);
});

test("validateRoot pass-paired-rule-skill returns no errors", () => {
  const errors = validateRoot(path.join(FIXTURES, "pass-paired-rule-skill"));
  assert.equal(errors.length, 0);
});

test("CLI exits 0 on repo root with marketplace and engineering-core", () => {
  const result = runValidate(REPO_ROOT);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Validation passed/);
});

test("CLI pass-plugin fixture exits 0", () => {
  const result = runValidate(path.join(FIXTURES, "pass-plugin"));
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Validation passed/);
});

test("CLI pass-paired-rule-skill fixture exits 0", () => {
  const result = runValidate(path.join(FIXTURES, "pass-paired-rule-skill"));
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Validation passed/);
});

const failCases = [
  {
    name: "fail-dead-skill",
    needle: "dead frontmatter key",
  },
  {
    name: "fail-two-headings",
    needle: "exactly one top-level heading",
  },
  {
    name: "fail-rule-too-long",
    needle: "exceeds 60 lines",
  },
  {
    name: "fail-bad-rule-name",
    needle: "filename must match",
  },
  {
    name: "fail-orphan-hook",
    needle: "orphan hook script",
  },
  {
    name: "fail-extra-plugin-key",
    needle: "installMode",
  },
  {
    name: "fail-marketplace-missing-source",
    needle: "missing plugin source directory",
  },
  {
    name: "fail-budget-exceeded",
    needle: "exceed budget",
  },
  {
    name: "fail-default-off-always-apply",
    needle: "alwaysApply: true forbidden for default-off",
  },
  {
    name: "fail-duplicate-rules",
    needle: "content similarity",
  },
  {
    name: "fail-missing-readme",
    needle: "missing README.md",
  },
];

for (const failCase of failCases) {
  test(`validateRoot ${failCase.name} reports failure`, () => {
    const errors = validateRoot(path.join(FIXTURES, failCase.name));
    assert.ok(errors.length > 0);
    assert.match(errors.join("\n"), new RegExp(failCase.needle, "i"));
  });

  test(`CLI ${failCase.name} exits 1`, () => {
    const result = runValidate(path.join(FIXTURES, failCase.name));
    assert.equal(result.status, 1);
    assert.match(result.stderr, new RegExp(failCase.needle, "i"));
  });
}
