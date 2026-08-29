#!/usr/bin/env node
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { releaseNotesFromFile } from "./lib/release-notes.mjs";

const version = process.argv[2];
if (!version || !/^\d+\.\d+\.\d+$/.test(version)) {
  console.error("usage: node scripts/release-notes.mjs <semver> (e.g. 0.2.0)");
  process.exit(1);
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

try {
  process.stdout.write(`${releaseNotesFromFile(root, version)}\n`);
} catch (err) {
  console.error(`error: ${err.message}`);
  process.exit(1);
}
