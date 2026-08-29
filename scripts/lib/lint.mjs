/**
 * Content lint rules for rules, skills, commands, and hooks.
 */

import fs from "node:fs";
import path from "node:path";
import {
  countBodyLines,
  countTopLevelHeadings,
  deadSkillFrontmatterErrors,
  parseFrontmatter,
} from "./frontmatter.mjs";
import { validateAgainstSchemaFile } from "./schema.mjs";
import { fileExists, relPath } from "./manifest.mjs";

const RULE_NAME_PATTERN = /^[0-9]{3}-[a-z0-9-]+\.mdc$/;
const MAX_RULE_BODY_LINES = 60;
const COMMAND_EXTENSIONS = [".md", ".mdc", ".markdown", ".txt"];

/**
 * @typedef {{ errors: string[], warnings: string[] }} LintResult
 */

/**
 * @param {string} pluginDir
 * @param {string} schemaDir
 * @returns {LintResult}
 */
export function lintPlugin(pluginDir, schemaDir) {
  /** @type {string[]} */
  const errors = [];
  /** @type {string[]} */
  const warnings = [];

  const pluginJsonPath = path.join(pluginDir, ".cursor-plugin", "plugin.json");
  const pluginMetaPath = path.join(pluginDir, "plugin-meta.json");

  if (!fs.existsSync(pluginJsonPath)) {
    errors.push(`${pluginDir}: missing .cursor-plugin/plugin.json`);
    return { errors, warnings };
  }

  if (!fs.existsSync(pluginMetaPath)) {
    errors.push(`${relPath(pluginDir, pluginMetaPath)}: missing plugin-meta.json`);
  }

  lintRules(pluginDir, schemaDir, errors);
  lintSkills(pluginDir, schemaDir, errors);
  lintCommands(pluginDir, schemaDir, errors);
  lintHooks(pluginDir, schemaDir, errors);
  lintPairings(pluginDir, pluginMetaPath, errors);

  return { errors, warnings };
}

/**
 * @param {string} pluginDir
 * @param {string} schemaDir
 * @param {string[]} errors
 */
function lintRules(pluginDir, schemaDir, errors) {
  const rulesDir = path.join(pluginDir, "rules");
  if (!fs.existsSync(rulesDir)) {
    return;
  }

  for (const file of fs.readdirSync(rulesDir)) {
    if (!file.endsWith(".mdc")) {
      continue;
    }
    const filePath = path.join(rulesDir, file);
    const label = relPath(pluginDir, filePath);

    if (!RULE_NAME_PATTERN.test(file)) {
      errors.push(
        `${label}: rule filename must match /^[0-9]{3}-[a-z0-9-]+\\.mdc$/`,
      );
    }

    const content = fs.readFileSync(filePath, "utf8");
    const parsed = parseFrontmatter(content);
    if (!parsed.ok) {
      errors.push(`${label}: ${parsed.error}`);
      continue;
    }

    errors.push(
      ...validateAgainstSchemaFile(
        path.join(schemaDir, "rule.schema.json"),
        parsed.frontmatter,
        label,
      ),
    );

    const headings = countTopLevelHeadings(parsed.body);
    if (headings !== 1) {
      errors.push(`${label}: expected exactly one top-level heading, found ${headings}`);
    }

    const lines = countBodyLines(parsed.body);
    if (lines > MAX_RULE_BODY_LINES) {
      errors.push(`${label}: rule body exceeds ${MAX_RULE_BODY_LINES} lines (${lines})`);
    }
  }
}

/**
 * @param {string} pluginDir
 * @param {string} schemaDir
 * @param {string[]} errors
 */
function lintSkills(pluginDir, schemaDir, errors) {
  const skillsDir = path.join(pluginDir, "skills");
  if (!fs.existsSync(skillsDir)) {
    return;
  }

  for (const entry of fs.readdirSync(skillsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue;
    }
    const skillFile = path.join(skillsDir, entry.name, "SKILL.md");
    if (!fs.existsSync(skillFile)) {
      errors.push(`${relPath(pluginDir, skillFile)}: missing SKILL.md`);
      continue;
    }

    const label = relPath(pluginDir, skillFile);
    const content = fs.readFileSync(skillFile, "utf8");
    const parsed = parseFrontmatter(content);
    if (!parsed.ok) {
      errors.push(`${label}: ${parsed.error}`);
      continue;
    }

    errors.push(...deadSkillFrontmatterErrors(parsed.frontmatter, label));
    errors.push(
      ...validateAgainstSchemaFile(
        path.join(schemaDir, "skill.schema.json"),
        parsed.frontmatter,
        label,
      ),
    );

    const description = parsed.frontmatter.description;
    if (typeof description !== "string" || !/use when/i.test(description)) {
      errors.push(`${label}: skill description must contain "Use when"`);
    }
  }
}

/**
 * @param {string} pluginDir
 * @param {string} schemaDir
 * @param {string[]} errors
 */
function lintCommands(pluginDir, schemaDir, errors) {
  const commandsDir = path.join(pluginDir, "commands");
  if (!fs.existsSync(commandsDir)) {
    return;
  }

  for (const file of fs.readdirSync(commandsDir)) {
    const ext = path.extname(file);
    if (!COMMAND_EXTENSIONS.includes(ext)) {
      continue;
    }
    const filePath = path.join(commandsDir, file);
    const label = relPath(pluginDir, filePath);
    const content = fs.readFileSync(filePath, "utf8");

    if (!content.startsWith("---\n")) {
      errors.push(`${label}: command file must start with YAML frontmatter fence`);
      continue;
    }

    const parsed = parseFrontmatter(content);
    if (!parsed.ok) {
      errors.push(`${label}: ${parsed.error}`);
      continue;
    }

    errors.push(
      ...validateAgainstSchemaFile(
        path.join(schemaDir, "command.schema.json"),
        parsed.frontmatter,
        label,
      ),
    );
  }
}

/**
 * @param {string} pluginDir
 * @param {string} schemaDir
 * @param {string[]} errors
 */
function lintHooks(pluginDir, schemaDir, errors) {
  const hooksFile = path.join(pluginDir, "hooks", "hooks.json");
  if (!fs.existsSync(hooksFile)) {
    return;
  }

  const label = relPath(pluginDir, hooksFile);
  const hooksData = JSON.parse(fs.readFileSync(hooksFile, "utf8"));
  errors.push(
    ...validateAgainstSchemaFile(
      path.join(schemaDir, "hooks.schema.json"),
      hooksData,
      label,
    ),
  );

  const hooks = hooksData.hooks;
  if (!hooks || typeof hooks !== "object") {
    return;
  }

  for (const [event, handlers] of Object.entries(hooks)) {
    if (!Array.isArray(handlers)) {
      continue;
    }
    for (const handler of handlers) {
      if (!handler || typeof handler !== "object" || typeof handler.command !== "string") {
        continue;
      }
      const scriptPath = path.resolve(pluginDir, handler.command);
      if (!fileExists(scriptPath)) {
        errors.push(
          `${label}: orphan hook script for event ${event}: ${handler.command}`,
        );
        continue;
      }
      if (scriptPath.endsWith(".sh")) {
        const firstLine = fs.readFileSync(scriptPath, "utf8").split("\n")[0] ?? "";
        if (!firstLine.startsWith("#!/bin/sh") && !firstLine.startsWith("#!/usr/bin/env sh")) {
          errors.push(
            `${relPath(pluginDir, scriptPath)}: hook script must start with #!/bin/sh`,
          );
        }
      }
    }
  }
}

/**
 * @param {string} pluginDir
 * @param {string} pluginMetaPath
 * @param {string[]} errors
 */
function lintPairings(pluginDir, pluginMetaPath, errors) {
  if (!fs.existsSync(pluginMetaPath)) {
    return;
  }
  const meta = JSON.parse(fs.readFileSync(pluginMetaPath, "utf8"));
  if (!Array.isArray(meta.pairings)) {
    return;
  }
  for (const pair of meta.pairings) {
    if (!pair || typeof pair !== "object") {
      continue;
    }
    if (typeof pair.rule === "string") {
      const rulePath = path.resolve(pluginDir, pair.rule);
      if (!fileExists(rulePath)) {
        errors.push(`${pluginMetaPath}: orphan pairing rule path ${pair.rule}`);
      }
    }
    if (typeof pair.skill === "string") {
      const skillPath = path.resolve(pluginDir, pair.skill);
      if (!fileExists(skillPath) && !fs.existsSync(skillPath)) {
        errors.push(`${pluginMetaPath}: orphan pairing skill path ${pair.skill}`);
      }
    }
  }
}
