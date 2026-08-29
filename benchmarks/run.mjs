#!/usr/bin/env node
/**
 * Benchmark harness. Default: validate scenario metadata (CI-safe, no model).
 * Opt-in: --model refuses to invent scores and exits 2 until a provider is wired.
 * Usage: node benchmarks/run.mjs [--root <dir>] [--model]
 */
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { listScenarioFiles, validateBenchmarkRoot } from "../scripts/lib/benchmarks.mjs";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SCHEMA = path.join(REPO_ROOT, "schemas", "benchmark-scenario.schema.json");

/**
 * @param {string[]} argv
 */
function parseArgs(argv) {
  let root = REPO_ROOT;
  let model = false;
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--root" && argv[i + 1]) {
      root = path.resolve(argv[i + 1]);
      i += 1;
    } else if (argv[i] === "--model") {
      model = true;
    }
  }
  return { root, model };
}

/**
 * @param {string} root
 * @param {boolean} model
 * @returns {number}
 */
export function runBenchmarks(root, model) {
  if (model) {
    const count = listScenarioFiles(path.join(root, "benchmarks")).length;
    console.error(
      `error: --model is opt-in and not wired to a provider (${count} scenarios).`,
    );
    console.error(
      "This harness never fabricates scores. Do not pass --model in CI. See docs/benchmarks.md.",
    );
    return 2;
  }

  const errors = validateBenchmarkRoot(root, SCHEMA);
  if (errors.length > 0) {
    for (const err of errors) {
      console.error(err);
    }
    return 1;
  }

  const files = listScenarioFiles(path.join(root, "benchmarks"));
  console.log(`Benchmark metadata valid (${files.length} scenarios).`);
  return 0;
}

const isMain = process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;
if (isMain) {
  const { root, model } = parseArgs(process.argv.slice(2));
  process.exit(runBenchmarks(root, model));
}
