#!/usr/bin/env node
/**
 * Sync GitHub issue labels from .github/labels.json (requires gh CLI + repo admin).
 */
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const labelsPath = join(root, ".github", "labels.json");

/** @type {Array<{ name: string, color: string, description: string }>} */
const labels = JSON.parse(readFileSync(labelsPath, "utf8"));

if (!Array.isArray(labels) || labels.length === 0) {
  console.error("error: .github/labels.json must be a non-empty array");
  process.exit(1);
}

const gh = spawnSync("gh", ["--version"], { encoding: "utf8" });
if (gh.status !== 0) {
  console.error("error: gh CLI is required (https://cli.github.com/)");
  process.exit(1);
}

for (const label of labels) {
  if (!label.name || !label.color || !label.description) {
    console.error(`error: invalid label entry: ${JSON.stringify(label)}`);
    process.exit(1);
  }

  const result = spawnSync(
    "gh",
    [
      "label",
      "create",
      label.name,
      "--color",
      label.color,
      "--description",
      label.description,
      "--force",
    ],
    { stdio: "inherit" },
  );

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log(`Synced ${labels.length} labels from .github/labels.json`);
