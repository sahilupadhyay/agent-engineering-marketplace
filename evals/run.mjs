#!/usr/bin/env node
/**
 * Zero-dependency deterministic eval runner.
 * Usage: node evals/run.mjs [--root <dir>] [--suite <plugin-name>] [--verbose]
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parseFrontmatter } from "../scripts/lib/frontmatter.mjs";
import {
  listMarketplacePluginNames,
  readJsonFile,
  relPath,
} from "../scripts/lib/manifest.mjs";
import { validateAgainstSchemaFile } from "../scripts/lib/schema.mjs";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const EVAL_SCHEMA = path.join(REPO_ROOT, "schemas", "eval-case.schema.json");

/**
 * @param {string[]} argv
 */
function parseArgs(argv) {
  let root = REPO_ROOT;
  /** @type {string | null} */
  let suite = null;
  let verbose = false;
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--root" && argv[i + 1]) {
      root = path.resolve(argv[i + 1]);
      i += 1;
    } else if (argv[i] === "--suite" && argv[i + 1]) {
      suite = argv[i + 1];
      i += 1;
    } else if (argv[i] === "--verbose") {
      verbose = true;
    }
  }
  return { root, suite, verbose };
}

/**
 * @param {string} dir
 * @returns {string[]}
 */
function listEvalCaseFiles(dir) {
  /** @type {string[]} */
  const files = [];
  const suitesDir = path.join(dir, "evals", "suites");
  if (!fs.existsSync(suitesDir)) {
    return files;
  }
  for (const pluginEntry of fs.readdirSync(suitesDir, { withFileTypes: true })) {
    if (!pluginEntry.isDirectory()) {
      continue;
    }
    const suiteDir = path.join(suitesDir, pluginEntry.name);
    for (const file of fs.readdirSync(suiteDir)) {
      if (file.endsWith(".eval.json")) {
        files.push(path.join(suiteDir, file));
      }
    }
  }
  return files.sort();
}

/**
 * @param {string} content
 * @param {string} section
 * @returns {string}
 */
function sectionText(content, section) {
  if (section === "full") {
    return content;
  }
  if (!content.startsWith("---\n")) {
    return section === "body" ? content : "";
  }
  const parsed = parseFrontmatter(content);
  if (!parsed.ok) {
    return "";
  }
  if (section === "body") {
    return parsed.body;
  }
  return Object.entries(parsed.frontmatter)
    .map(([key, value]) => `${key}: ${String(value)}`)
    .join("\n");
}

/**
 * @param {string} pluginDir
 * @param {string} relFile
 * @param {string} section
 * @returns {{ text: string, label: string } | null}
 */
function readPluginFileSection(pluginDir, relFile, section) {
  const filePath = path.resolve(pluginDir, relFile);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const content = fs.readFileSync(filePath, "utf8");
  return { text: sectionText(content, section), label: relPath(pluginDir, filePath) };
}

/**
 * @param {string} pluginDir
 * @param {Record<string, unknown>} target
 * @returns {Array<{ text: string, label: string }>}
 */
function resolveTargets(pluginDir, target) {
  const section = typeof target.section === "string" ? target.section : "body";

  if (typeof target.file === "string") {
    const file = readPluginFileSection(pluginDir, target.file, section);
    return file ? [file] : [];
  }

  if (target.allSkills === true) {
    const skillsDir = path.join(pluginDir, "skills");
    /** @type {Array<{ text: string, label: string }>} */
    const items = [];
    if (!fs.existsSync(skillsDir)) {
      return items;
    }
    for (const entry of fs.readdirSync(skillsDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) {
        continue;
      }
      const rel = `skills/${entry.name}/SKILL.md`;
      const file = readPluginFileSection(pluginDir, rel, section);
      if (file) {
        items.push(file);
      }
    }
    return items;
  }

  if (target.allRules === true) {
    const rulesDir = path.join(pluginDir, "rules");
    /** @type {Array<{ text: string, label: string }>} */
    const items = [];
    if (!fs.existsSync(rulesDir)) {
      return items;
    }
    for (const file of fs.readdirSync(rulesDir)) {
      if (!file.endsWith(".mdc")) {
        continue;
      }
      const rel = `rules/${file}`;
      const item = readPluginFileSection(pluginDir, rel, section);
      if (item) {
        items.push(item);
      }
    }
    return items;
  }

  return [];
}

/**
 * @param {string} text
 * @param {Record<string, unknown>} assert
 * @returns {string | null}
 */
function runAssertion(text, assert) {
  const type = assert.type;
  if (type === "regex" || type === "notRegex") {
    const flags = typeof assert.flags === "string" ? assert.flags : "";
    const re = new RegExp(/** @type {string} */ (assert.pattern), flags);
    const matches = re.test(text);
    if (type === "regex" && !matches) {
      return `regex did not match pattern ${assert.pattern}`;
    }
    if (type === "notRegex" && matches) {
      return `notRegex matched pattern ${assert.pattern}`;
    }
    return null;
  }

  if (type === "contains") {
    const value = /** @type {string} */ (assert.value);
    const haystack = assert.ignoreCase ? text.toLowerCase() : text;
    const needle = assert.ignoreCase ? value.toLowerCase() : value;
    if (!haystack.includes(needle)) {
      return `text does not contain "${value}"`;
    }
    return null;
  }

  if (type === "notContains") {
    const value = /** @type {string} */ (assert.value);
    if (text.includes(value)) {
      return `text contains forbidden value "${value}"`;
    }
    return null;
  }

  if (type === "pathsExist") {
    return null;
  }

  return `unsupported assertion type ${type}`;
}

/**
 * @param {string} captured
 * @returns {boolean}
 */
function looksLikePath(captured) {
  if (!captured || captured.startsWith("#")) {
    return false;
  }
  if (/^(https?:|mailto:)/i.test(captured)) {
    return false;
  }
  if (/\s/.test(captured) || captured.includes("*")) {
    return false;
  }
  if (captured.startsWith(".") && !captured.startsWith("./")) {
    return false;
  }
  if (/^(references|rules|skills|commands|hooks)\//i.test(captured)) {
    return true;
  }
  if (captured.includes("/")) {
    return true;
  }
  return /^[a-zA-Z0-9_][a-zA-Z0-9_.-]*\.[a-z0-9]{1,8}$/i.test(captured);
}

/**
 * @param {string} text
 * @param {string} pluginDir
 * @param {string} repoRoot
 * @param {Record<string, unknown>} assert
 * @returns {string[]}
 */
function checkPathsExist(text, pluginDir, repoRoot, assert) {
  const rootKind = assert.root === "repo" ? "repo" : "plugin";
  const base = rootKind === "repo" ? repoRoot : pluginDir;
  /** @type {string[]} */
  const dead = [];

  const backtickRe = /`([^`\n]+)`/g;
  let match;
  while ((match = backtickRe.exec(text)) !== null) {
    const captured = match[1].trim();
    if (!looksLikePath(captured)) {
      continue;
    }
    const resolved = path.resolve(base, captured);
    if (!fs.existsSync(resolved)) {
      dead.push(captured);
    }
  }

  const linkRe = /\[[^\]]*\]\(([^)]+)\)/g;
  while ((match = linkRe.exec(text)) !== null) {
    const captured = match[1].trim();
    if (!looksLikePath(captured)) {
      continue;
    }
    const resolved = path.resolve(base, captured);
    if (!fs.existsSync(resolved)) {
      dead.push(captured);
    }
  }

  return dead;
}

/**
 * @param {string} root
 * @param {{ suite?: string | null, verbose?: boolean }} options
 * @returns {string[]}
 */
export function runEvals(root, options = {}) {
  const suiteFilter = options.suite ?? null;
  const verbose = options.verbose ?? false;
  /** @type {string[]} */
  const errors = [];

  const marketplacePlugins = listMarketplacePluginNames(root);
  for (const pluginName of marketplacePlugins) {
    if (suiteFilter && pluginName !== suiteFilter) {
      continue;
    }
    const suiteDir = path.join(root, "evals", "suites", pluginName);
    if (!fs.existsSync(suiteDir)) {
      errors.push(`error: missing eval suite directory for marketplace plugin ${pluginName}`);
      continue;
    }
    const caseFiles = fs
      .readdirSync(suiteDir)
      .filter((name) => name.endsWith(".eval.json"));
    if (caseFiles.length === 0) {
      errors.push(`error: eval suite for ${pluginName} has no *.eval.json cases`);
    }
  }

  const evalFiles = listEvalCaseFiles(root).filter((filePath) => {
    if (!suiteFilter) {
      return true;
    }
    return filePath.includes(`${path.sep}suites${path.sep}${suiteFilter}${path.sep}`);
  });

  let passed = 0;

  for (const casePath of evalFiles) {
    const caseData = readJsonFile(casePath);
    const schemaLabel = path.relative(root, casePath) || casePath;
    const schemaErrors = validateAgainstSchemaFile(EVAL_SCHEMA, caseData, schemaLabel);
    if (schemaErrors.length > 0) {
      for (const err of schemaErrors) {
        errors.push(`error: eval schema ${err}`);
      }
      continue;
    }

    const id = /** @type {string} */ (caseData.id);
    const plugin = /** @type {string} */ (caseData.plugin);
    const pluginDir = path.join(root, "plugins", plugin);
    if (!fs.existsSync(pluginDir)) {
      errors.push(`error: eval ${id} (${plugin}): plugin directory missing`);
      continue;
    }

    const targets = resolveTargets(pluginDir, /** @type {Record<string, unknown>} */ (caseData.target));
    if (targets.length === 0 && typeof caseData.target?.file === "string") {
      errors.push(
        `error: eval ${id} (${plugin}): target file missing ${caseData.target.file}`,
      );
      continue;
    }

    const assert = /** @type {Record<string, unknown>} */ (caseData.assert);
    let caseFailed = false;

    for (const target of targets) {
      if (assert.type === "pathsExist") {
        const dead = checkPathsExist(target.text, pluginDir, root, assert);
        for (const deadPath of dead) {
          errors.push(
            `error: eval ${id}: dead path reference "${deadPath}" in ${target.label}`,
          );
          caseFailed = true;
        }
        continue;
      }

      const assertError = runAssertion(target.text, assert);
      if (assertError) {
        errors.push(
          `error: eval ${id} (${plugin}) in ${target.label}: ${assertError}`,
        );
        caseFailed = true;
      }
    }

    if (!caseFailed && verbose) {
      console.log(`ok: eval ${id} — ${caseData.claim}`);
    }
    if (!caseFailed) {
      passed += 1;
    }
  }

  if (errors.length === 0) {
    console.log(`Evals passed (${passed} cases).`);
  }

  return errors;
}

function main() {
  const { root, suite, verbose } = parseArgs(process.argv.slice(2));
  const errors = runEvals(root, { suite, verbose });

  for (const error of errors) {
    console.error(error.startsWith("error:") ? error : `error: ${error}`);
  }

  if (errors.length > 0) {
    process.exit(1);
  }

  process.exit(0);
}

const isMain =
  process.argv[1] &&
  pathToFileURL(path.resolve(process.argv[1])).href === pathToFileURL(fileURLToPath(import.meta.url)).href;

if (isMain) {
  main();
}
