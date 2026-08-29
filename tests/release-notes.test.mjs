import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { extractReleaseNotes } from "../scripts/lib/release-notes.mjs";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const RELEASE_NOTES = path.join(REPO_ROOT, "scripts", "release-notes.mjs");

const SAMPLE = `# Changelog

## [Unreleased]

### Added

- pending

## [0.2.0] - 2026-08-29

### Added

- first release item

### Fixed

- bug fix

## [0.1.0] - 2026-08-01

### Added

- initial
`;

test("extractReleaseNotes returns section body without header", () => {
  const body = extractReleaseNotes(SAMPLE, "0.2.0");
  assert.match(body, /first release item/);
  assert.match(body, /bug fix/);
  assert.doesNotMatch(body, /pending/);
});

test("extractReleaseNotes throws when section missing", () => {
  assert.throws(() => extractReleaseNotes(SAMPLE, "9.9.9"), /no section/);
});

test("CLI release-notes exits 1 for missing version section", () => {
  const result = spawnSync(process.execPath, [RELEASE_NOTES, "9.9.9"], {
    encoding: "utf8",
    cwd: REPO_ROOT,
  });
  assert.equal(result.status, 1);
});

test("CLI release-notes rejects invalid semver argument", () => {
  const result = spawnSync(process.execPath, [RELEASE_NOTES, "not-a-version"], {
    encoding: "utf8",
    cwd: REPO_ROOT,
  });
  assert.equal(result.status, 1);
});
