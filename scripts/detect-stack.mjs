#!/usr/bin/env node
/**
 * Detect stack signals and recommend marketplace plugins (stdout JSON).
 * Usage: node scripts/detect-stack.mjs [--root <dir>] [--pretty]
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { detectStack } from "./lib/detect-stack.mjs";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/**
 * @param {string[]} argv
 */
function parseArgs(argv) {
  let root = process.cwd();
  let pretty = false;

  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--root" && argv[i + 1]) {
      root = path.resolve(argv[i + 1]);
      i += 1;
    } else if (argv[i] === "--pretty") {
      pretty = true;
    } else if (argv[i] === "--help" || argv[i] === "-h") {
      console.log(`usage: node scripts/detect-stack.mjs [--root <dir>] [--pretty]

Detects stack manifest files and recommends optional marketplace plugins.
Default root is the current working directory.`);
      process.exit(0);
    }
  }

  if (root === REPO_ROOT) {
    // When run from repo root without --root, still analyze repo root (valid use).
  }

  return { root, pretty };
}

const { root, pretty } = parseArgs(process.argv.slice(2));
const report = detectStack(root);
const output = pretty ? `${JSON.stringify(report, null, 2)}\n` : `${JSON.stringify(report)}\n`;
process.stdout.write(output);
