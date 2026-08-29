#!/usr/bin/env node
/**
 * Zero-dependency marketplace validator (structural checks only).
 * Usage: node scripts/validate.mjs [--root <dir>]
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  fileExists,
  listPluginDirs,
  marketplacePath,
  readJsonFile,
  resolveFromRoot,
  sourcePathFromEntry,
} from "./lib/manifest.mjs";
import { checkPluginBudget } from "./lib/budget.mjs";
import { checkPluginReadme } from "./lib/doccheck.mjs";
import { lintPlugin } from "./lib/lint.mjs";
import { checkPluginSimilarity } from "./lib/similarity.mjs";
import { validateAgainstSchemaFile } from "./lib/schema.mjs";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SCHEMA_DIR = path.join(REPO_ROOT, "schemas");

/**
 * @param {string[]} argv
 */
function parseArgs(argv) {
  let root = REPO_ROOT;
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--root" && argv[i + 1]) {
      root = path.resolve(argv[i + 1]);
      i += 1;
    }
  }
  return { root };
}

/**
 * @param {string} root
 * @returns {string[]}
 */
export function validateRoot(root) {
  /** @type {string[]} */
  const errors = [];

  const marketPath = marketplacePath(root);
  const pluginDirs = listPluginDirs(root);

  if (!marketPath && pluginDirs.length === 0) {
    console.log("No marketplace manifest or plugins to validate.");
    return errors;
  }

  if (marketPath) {
    errors.push(...validateMarketplace(root, marketPath));
  }

  const seen = new Set(pluginDirs.map((dir) => path.resolve(dir)));
  const marketplacePluginDirs = new Set();

  if (marketPath) {
    const market = readJsonFile(marketPath);
    const plugins = Array.isArray(market.plugins) ? market.plugins : [];
    for (const entry of plugins) {
      const source = sourcePathFromEntry(entry?.source);
      if (!source) {
        errors.push(`${marketPath}: plugin entry missing source path`);
        continue;
      }
      const pluginDir = resolveFromRoot(root, source);
      if (!fs.existsSync(pluginDir)) {
        errors.push(`${marketPath}: missing plugin source directory ${source}`);
        continue;
      }
      const resolved = path.resolve(pluginDir);
      seen.add(resolved);
      marketplacePluginDirs.add(resolved);
    }
  }

  for (const pluginDir of seen) {
    if (!fs.existsSync(pluginDir)) {
      continue;
    }
    const pluginJsonPath = path.join(pluginDir, ".cursor-plugin", "plugin.json");
    if (fileExists(pluginJsonPath)) {
      const pluginJson = readJsonFile(pluginJsonPath);
      errors.push(
        ...validateAgainstSchemaFile(
          path.join(SCHEMA_DIR, "plugin.schema.json"),
          pluginJson,
          path.relative(root, pluginJsonPath) || pluginJsonPath,
        ),
      );
    }

    const pluginMetaPath = path.join(pluginDir, "plugin-meta.json");
    /** @type {Record<string, unknown> | null} */
    let pluginMeta = null;
    if (fileExists(pluginMetaPath)) {
      pluginMeta = readJsonFile(pluginMetaPath);
      errors.push(
        ...validateAgainstSchemaFile(
          path.join(SCHEMA_DIR, "plugin-meta.schema.json"),
          pluginMeta,
          path.relative(root, pluginMetaPath) || pluginMetaPath,
        ),
      );
    }

    const lintResult = lintPlugin(pluginDir, SCHEMA_DIR);
    errors.push(...lintResult.errors);

    if (marketplacePluginDirs.has(path.resolve(pluginDir))) {
      errors.push(...checkPluginReadme(pluginDir));
    }

    if (pluginMeta) {
      errors.push(...checkPluginBudget(pluginDir, pluginMeta));
      errors.push(...checkPluginSimilarity(pluginDir, pluginMeta));
    }
  }

  return errors;
}

/**
 * @param {string} root
 * @param {string} marketPath
 */
function validateMarketplace(root, marketPath) {
  const market = readJsonFile(marketPath);
  const label = path.relative(root, marketPath) || marketPath;
  const errors = validateAgainstSchemaFile(
    path.join(SCHEMA_DIR, "marketplace.schema.json"),
    market,
    label,
  );

  const plugins = Array.isArray(market.plugins) ? market.plugins : [];
  for (const entry of plugins) {
    const source = sourcePathFromEntry(entry?.source);
    if (source && !fs.existsSync(resolveFromRoot(root, source))) {
      errors.push(`${label}: missing plugin source directory ${source}`);
    }
  }

  return errors;
}

function main() {
  const { root } = parseArgs(process.argv.slice(2));
  const errors = validateRoot(root);

  for (const error of errors) {
    console.error(`error: ${error}`);
  }

  if (errors.length > 0) {
    process.exit(1);
  }

  console.log("Validation passed.");
  process.exit(0);
}

const isMain =
  process.argv[1] &&
  pathToFileURL(path.resolve(process.argv[1])).href === pathToFileURL(fileURLToPath(import.meta.url)).href;

if (isMain) {
  main();
}
