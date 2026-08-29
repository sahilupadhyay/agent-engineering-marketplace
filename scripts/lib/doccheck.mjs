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
