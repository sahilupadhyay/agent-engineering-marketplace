import fs from "node:fs";
import path from "node:path";
import { validateAgainstSchemaFile } from "./schema.mjs";

const CATEGORY_DIRS = [
  "scenarios",
  "hallucination",
  "context",
  "correctness",
  "cost",
  "speed",
];

/**
 * @param {string} benchmarksRoot
 * @returns {string[]}
 */
export function listScenarioFiles(benchmarksRoot) {
  /** @type {string[]} */
  const files = [];
  if (!fs.existsSync(benchmarksRoot)) {
    return files;
  }

  for (const category of CATEGORY_DIRS) {
    const categoryDir = path.join(benchmarksRoot, category);
    if (!fs.existsSync(categoryDir)) {
      continue;
    }
    collectScenarioFiles(categoryDir, files);
  }

  return files.sort();
}

/**
 * @param {string} dir
 * @param {string[]} files
 */
function collectScenarioFiles(dir, files) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectScenarioFiles(full, files);
    } else if (entry.isFile() && entry.name === "scenario.json") {
      files.push(full);
    }
  }
}

/**
 * @param {string} root repo root
 * @param {string} schemaPath
 * @returns {string[]}
 */
export function validateBenchmarkRoot(root, schemaPath) {
  const benchmarksRoot = path.join(root, "benchmarks");
  const files = listScenarioFiles(benchmarksRoot);
  /** @type {string[]} */
  const errors = [];

  if (files.length === 0) {
    errors.push("benchmarks/: no scenario.json files found");
    return errors;
  }

  /** @type {Set<string>} */
  const ids = new Set();

  for (const file of files) {
    const rel = path.relative(root, file);
    let data;
    try {
      data = JSON.parse(fs.readFileSync(file, "utf8"));
    } catch (err) {
      errors.push(`${rel}: invalid JSON (${err.message})`);
      continue;
    }

    errors.push(...validateAgainstSchemaFile(schemaPath, data, rel));

    if (data && typeof data === "object" && !Array.isArray(data)) {
      const scenario = /** @type {Record<string, unknown>} */ (data);
      if (typeof scenario.id === "string") {
        if (ids.has(scenario.id)) {
          errors.push(`${rel}: duplicate scenario id "${scenario.id}"`);
        }
        ids.add(scenario.id);
      }

      if (typeof scenario.promptFile === "string") {
        const promptPath = path.join(path.dirname(file), scenario.promptFile);
        if (!fs.existsSync(promptPath)) {
          errors.push(`${rel}: missing prompt file ${scenario.promptFile}`);
        }
      }

      if (scenario.scoresPublished !== false) {
        errors.push(`${rel}: scoresPublished must be false`);
      }
    }
  }

  return errors;
}
