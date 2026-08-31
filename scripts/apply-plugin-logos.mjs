#!/usr/bin/env node
/**
 * Set shared brand logos on marketplace plugin manifests.
 * Usage: node scripts/apply-plugin-logos.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { readJsonFile } from "./lib/manifest.mjs";

const root = process.cwd();
const LOGO = "../../assets/brand/logo.svg";
const LOGO_DARK = "../../assets/brand/logo-dark.svg";

const marketPath = path.join(root, ".cursor-plugin/marketplace.json");
const market = readJsonFile(marketPath);
let pluginJsonCount = 0;

for (const entry of market.plugins) {
  entry.logo = LOGO;
  entry.logoDark = LOGO_DARK;

  const pluginJsonPath = path.join(
    root,
    "plugins",
    entry.name,
    ".cursor-plugin/plugin.json",
  );
  if (!fs.existsSync(pluginJsonPath)) {
    console.warn("missing", pluginJsonPath);
    continue;
  }
  const pluginJson = readJsonFile(pluginJsonPath);
  pluginJson.logo = LOGO;
  pluginJson.logoDark = LOGO_DARK;
  fs.writeFileSync(pluginJsonPath, `${JSON.stringify(pluginJson, null, 2)}\n`);
  pluginJsonCount += 1;
}

fs.writeFileSync(marketPath, `${JSON.stringify(market, null, 2)}\n`);
console.log(`Set logo paths on marketplace.json and ${pluginJsonCount} plugin.json files.`);
