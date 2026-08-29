/**
 * Plugin and marketplace discovery helpers.
 */

import fs from "node:fs";
import path from "node:path";

/**
 * @param {string} root
 * @returns {string | null}
 */
export function marketplacePath(root) {
  const candidate = path.join(root, ".cursor-plugin", "marketplace.json");
  return fs.existsSync(candidate) ? candidate : null;
}

/**
 * @param {string} root
 * @returns {string[]}
 */
export function listPluginDirs(root) {
  const pluginsDir = path.join(root, "plugins");
  if (!fs.existsSync(pluginsDir)) {
    return [];
  }
  return fs
    .readdirSync(pluginsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(pluginsDir, entry.name));
}

/**
 * @param {unknown} source
 * @returns {string | null}
 */
export function sourcePathFromEntry(source) {
  if (typeof source === "string") {
    return source;
  }
  if (source && typeof source === "object" && typeof source.path === "string") {
    return source.path;
  }
  return null;
}

/**
 * @param {string} root
 * @param {string} relativePath
 * @returns {string}
 */
export function resolveFromRoot(root, relativePath) {
  return path.resolve(root, relativePath);
}

/**
 * @param {string} filePath
 * @returns {unknown}
 */
export function readJsonFile(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

/**
 * @param {string} filePath
 * @returns {boolean}
 */
export function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

/**
 * @param {string} dir
 * @param {string} globLike
 * @returns {string[]}
 */
export function listFiles(dir, predicate) {
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs.readdirSync(dir).filter(predicate).map((name) => path.join(dir, name));
}

/**
 * @param {string} pluginDir
 * @returns {string}
 */
export function relPath(pluginDir, filePath) {
  return path.relative(pluginDir, filePath).split(path.sep).join("/");
}
