/**
 * Within-plugin shingle Jaccard duplicate detection with pairing waivers.
 * Threshold may be tuned via fixture calibration in later PRs.
 */

import fs from "node:fs";
import path from "node:path";
import { parseFrontmatter } from "./frontmatter.mjs";
import { relPath } from "./manifest.mjs";

/** @type {number} */
export const SIMILARITY_THRESHOLD = 0.5;
const SHINGLE_SIZE = 5;

/**
 * @param {string} text
 * @returns {string}
 */
export function normalizeForShingles(text) {
  let normalized = text.toLowerCase();
  normalized = normalized.replace(/^#+\s+/gm, "");
  normalized = normalized.replace(/\s+/g, " ").trim();
  return normalized;
}

/**
 * @param {string} text
 * @param {number} k
 * @returns {Set<string>}
 */
export function shingleSet(text, k = SHINGLE_SIZE) {
  const normalized = normalizeForShingles(text);
  const words = normalized.split(/\s+/).filter(Boolean);
  const shingles = new Set();
  if (words.length < k) {
    return shingles;
  }
  for (let i = 0; i <= words.length - k; i += 1) {
    shingles.add(words.slice(i, i + k).join(" "));
  }
  return shingles;
}

/**
 * @param {Set<string>} setA
 * @param {Set<string>} setB
 * @returns {number}
 */
export function jaccardSimilarity(setA, setB) {
  if (setA.size === 0 || setB.size === 0) {
    return 0;
  }
  let intersection = 0;
  for (const item of setA) {
    if (setB.has(item)) {
      intersection += 1;
    }
  }
  const union = setA.size + setB.size - intersection;
  if (union === 0) {
    return 0;
  }
  return intersection / union;
}

/**
 * @param {string} pluginDir
 * @returns {Array<{ id: string, relPath: string, kind: "rule" | "skill", text: string }>}
 */
export function collectPluginTexts(pluginDir) {
  /** @type {Array<{ id: string, relPath: string, kind: "rule" | "skill", text: string }>} */
  const items = [];

  const rulesDir = path.join(pluginDir, "rules");
  if (fs.existsSync(rulesDir)) {
    for (const file of fs.readdirSync(rulesDir)) {
      if (!file.endsWith(".mdc")) {
        continue;
      }
      const filePath = path.join(rulesDir, file);
      const content = fs.readFileSync(filePath, "utf8");
      const parsed = parseFrontmatter(content);
      if (!parsed.ok) {
        continue;
      }
      const relative = relPath(pluginDir, filePath);
      items.push({
        id: relative,
        relPath: relative,
        kind: "rule",
        text: parsed.body,
      });
    }
  }

  const skillsDir = path.join(pluginDir, "skills");
  if (fs.existsSync(skillsDir)) {
    for (const entry of fs.readdirSync(skillsDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) {
        continue;
      }
      const skillFile = path.join(skillsDir, entry.name, "SKILL.md");
      if (!fs.existsSync(skillFile)) {
        continue;
      }
      const content = fs.readFileSync(skillFile, "utf8");
      const parsed = parseFrontmatter(content);
      if (!parsed.ok) {
        continue;
      }
      const relative = relPath(pluginDir, skillFile);
      items.push({
        id: relative,
        relPath: relative,
        kind: "skill",
        text: parsed.body,
      });
    }
  }

  return items;
}

/**
 * @param {string} pluginDir
 * @param {string} skillRef
 * @returns {string}
 */
function normalizeSkillPath(pluginDir, skillRef) {
  let normalized = skillRef.replace(/\\/g, "/");
  if (!normalized.endsWith("/SKILL.md") && !normalized.endsWith("SKILL.md")) {
    if (!normalized.endsWith("/")) {
      normalized += "/";
    }
    normalized += "SKILL.md";
  }
  return path.resolve(pluginDir, normalized);
}

/**
 * @param {string} pluginDir
 * @param {Record<string, unknown>} pluginMeta
 * @returns {Set<string>}
 */
function buildPairingWaivers(pluginDir, pluginMeta) {
  const waivers = new Set();
  if (!Array.isArray(pluginMeta.pairings)) {
    return waivers;
  }
  for (const pair of pluginMeta.pairings) {
    if (!pair || typeof pair !== "object") {
      continue;
    }
    const rule =
      typeof pair.rule === "string" ? path.resolve(pluginDir, pair.rule) : null;
    const skill =
      typeof pair.skill === "string"
        ? normalizeSkillPath(pluginDir, pair.skill)
        : null;
    if (!rule || !skill) {
      continue;
    }
    waivers.add(`${rule}|${skill}`);
    waivers.add(`${skill}|${rule}`);
  }
  return waivers;
}

/**
 * @param {string} pluginDir
 * @param {{ relPath: string, kind: string }} a
 * @param {{ relPath: string, kind: string }} b
 * @param {Set<string>} waivers
 * @returns {boolean}
 */
function isWaivedPair(pluginDir, a, b, waivers) {
  if (a.kind === b.kind) {
    return false;
  }
  const pathA = path.resolve(pluginDir, a.relPath);
  const pathB = path.resolve(pluginDir, b.relPath);
  return waivers.has(`${pathA}|${pathB}`);
}

/**
 * @param {string} pluginDir
 * @param {Record<string, unknown>} pluginMeta
 * @returns {string[]}
 */
export function checkPluginSimilarity(pluginDir, pluginMeta) {
  /** @type {string[]} */
  const errors = [];
  const items = collectPluginTexts(pluginDir);
  const waivers = buildPairingWaivers(pluginDir, pluginMeta);
  const thresholdPct = Math.round(SIMILARITY_THRESHOLD * 100);

  for (let i = 0; i < items.length; i += 1) {
    const shinglesA = shingleSet(items[i].text);
    for (let j = i + 1; j < items.length; j += 1) {
      if (isWaivedPair(pluginDir, items[i], items[j], waivers)) {
        continue;
      }
      const shinglesB = shingleSet(items[j].text);
      const jaccard = jaccardSimilarity(shinglesA, shinglesB);
      if (jaccard >= SIMILARITY_THRESHOLD) {
        const pct = Math.round(jaccard * 100);
        errors.push(
          `${items[i].relPath} and ${items[j].relPath}: content similarity ${pct}% exceeds ${thresholdPct}% (declare pairing in plugin-meta.json if intentional)`,
        );
      }
    }
  }

  return errors;
}
