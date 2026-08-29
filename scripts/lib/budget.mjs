/**
 * Per-plugin always-applied rule byte budget checks.
 */

import fs from "node:fs";
import path from "node:path";
import { parseFrontmatter } from "./frontmatter.mjs";
import { relPath } from "./manifest.mjs";

const TIER_DEFAULT_BUDGET = {
  required: 4096,
  "default-on": 2048,
  "default-off": 0,
};

/**
 * @param {string} pluginDir
 * @param {Record<string, unknown>} pluginMeta
 * @returns {string[]}
 */
export function checkPluginBudget(pluginDir, pluginMeta) {
  /** @type {string[]} */
  const errors = [];
  const tier = typeof pluginMeta.tier === "string" ? pluginMeta.tier : "";
  const tierDefault = TIER_DEFAULT_BUDGET[tier];
  const effectiveCap =
    typeof pluginMeta.contextBudget === "number"
      ? pluginMeta.contextBudget
      : tierDefault ?? 0;

  const rulesDir = path.join(pluginDir, "rules");
  if (!fs.existsSync(rulesDir)) {
    if (tier === "default-off") {
      return errors;
    }
    return errors;
  }

  let totalBytes = 0;
  let hasDefaultOffViolation = false;

  for (const file of fs.readdirSync(rulesDir)) {
    if (!file.endsWith(".mdc")) {
      continue;
    }
    const filePath = path.join(rulesDir, file);
    const label = relPath(pluginDir, filePath);
    const content = fs.readFileSync(filePath, "utf8");
    const parsed = parseFrontmatter(content);
    if (!parsed.ok) {
      continue;
    }

    if (parsed.frontmatter.alwaysApply !== true) {
      continue;
    }

    if (tier === "default-off") {
      errors.push(`${label}: alwaysApply: true forbidden for default-off tier`);
      hasDefaultOffViolation = true;
      continue;
    }

    totalBytes += Buffer.byteLength(parsed.body, "utf8");
  }

  if (!hasDefaultOffViolation && totalBytes > effectiveCap) {
    const metaLabel = relPath(pluginDir, path.join(pluginDir, "plugin-meta.json"));
    errors.push(
      `${metaLabel}: always-applied rule bytes ${totalBytes} exceed budget ${effectiveCap} (tier ${tier})`,
    );
  }

  return errors;
}
