/**
 * Documentation checks for marketplace-listed plugins.
 */

import fs from "node:fs";
import path from "node:path";
import { fileExists, relPath } from "./manifest.mjs";

/**
 * @param {string} pluginDir
 * @returns {string[]}
 */
export function checkPluginReadme(pluginDir) {
  /** @type {string[]} */
  const errors = [];
  const readmePath = path.join(pluginDir, "README.md");

  if (!fileExists(readmePath)) {
    errors.push(`${relPath(pluginDir, readmePath)}: missing README.md`);
  }

  return errors;
}

/**
 * @param {string} pluginDir
 * @param {Record<string, unknown>} pluginJson
 * @returns {string[]}
 */
export function checkPluginLogoAssets(pluginDir, pluginJson) {
  /** @type {string[]} */
  const errors = [];

  for (const field of ["logo", "logoDark"]) {
    const value = pluginJson[field];
    if (typeof value !== "string" || value.length === 0) {
      continue;
    }
    if (value.startsWith("http://") || value.startsWith("https://")) {
      continue;
    }
    if (value.includes("..")) {
      errors.push(
        `${relPath(pluginDir, path.join(pluginDir, ".cursor-plugin/plugin.json"))}: ${field} must stay inside the plugin directory (Cursor sparse-checkout excludes parent paths); use assets/logo.svg`,
      );
      continue;
    }
    const assetPath = path.join(pluginDir, value);
    if (!fileExists(assetPath)) {
      errors.push(`${relPath(pluginDir, assetPath)}: missing ${field} asset`);
    }
  }

  return errors;
}
