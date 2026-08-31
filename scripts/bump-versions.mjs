#!/usr/bin/env node
/**
 * Bump marketplace and all plugin manifest versions in sync.
 * Usage: node scripts/bump-versions.mjs 1.0.0
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const version = process.argv[2];
if (!version || !/^\d+\.\d+\.\d+$/.test(version)) {
  console.error("Usage: node scripts/bump-versions.mjs <semver>");
  process.exit(1);
}

const marketplacePath = path.join(root, ".cursor-plugin/marketplace.json");
const marketplace = JSON.parse(fs.readFileSync(marketplacePath, "utf8"));
marketplace.metadata.version = version;
for (const plugin of marketplace.plugins) {
  plugin.version = version;
}
fs.writeFileSync(marketplacePath, `${JSON.stringify(marketplace, null, 2)}\n`);

let pluginJsonCount = 0;
for (const entry of fs.readdirSync(path.join(root, "plugins"), { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const pluginJsonPath = path.join(root, "plugins", entry.name, ".cursor-plugin/plugin.json");
  if (!fs.existsSync(pluginJsonPath)) continue;
  const pluginJson = JSON.parse(fs.readFileSync(pluginJsonPath, "utf8"));
  pluginJson.version = version;
  fs.writeFileSync(pluginJsonPath, `${JSON.stringify(pluginJson, null, 2)}\n`);
  pluginJsonCount += 1;
}

console.log(`Bumped marketplace.json and ${pluginJsonCount} plugin.json files to ${version}.`);
