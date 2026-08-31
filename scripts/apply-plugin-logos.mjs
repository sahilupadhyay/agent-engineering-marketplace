#!/usr/bin/env node
/**
 * Copy shared brand logos into each plugin and set manifest paths.
 * Logos must live under the plugin directory — Cursor sparse-checkout only
 * fetches installed plugin folders, not repo-root assets.
 * Usage: node scripts/apply-plugin-logos.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { readJsonFile } from "./lib/manifest.mjs";

const root = process.cwd();
const brandDir = path.join(root, "assets/brand");
const sourceLight = path.join(brandDir, "logo.svg");
const sourceDark = path.join(brandDir, "logo-dark.svg");
const LOGO = "assets/logo.svg";
const LOGO_DARK = "assets/logo-dark.svg";

if (!fs.existsSync(sourceLight) || !fs.existsSync(sourceDark)) {
  console.error("Missing assets/brand/logo.svg or logo-dark.svg");
  process.exit(1);
}

const marketPath = path.join(root, ".cursor-plugin/marketplace.json");
const market = readJsonFile(marketPath);
let pluginJsonCount = 0;

for (const entry of market.plugins) {
  entry.logo = LOGO;
  entry.logoDark = LOGO_DARK;

  const pluginDir = path.join(root, "plugins", entry.name);
  const pluginJsonPath = path.join(pluginDir, ".cursor-plugin/plugin.json");
  if (!fs.existsSync(pluginJsonPath)) {
    console.warn("missing", pluginJsonPath);
    continue;
  }

  const assetsDir = path.join(pluginDir, "assets");
  fs.mkdirSync(assetsDir, { recursive: true });
  fs.copyFileSync(sourceLight, path.join(assetsDir, "logo.svg"));
  fs.copyFileSync(sourceDark, path.join(assetsDir, "logo-dark.svg"));

  const pluginJson = readJsonFile(pluginJsonPath);
  pluginJson.logo = LOGO;
  pluginJson.logoDark = LOGO_DARK;
  fs.writeFileSync(pluginJsonPath, `${JSON.stringify(pluginJson, null, 2)}\n`);
  pluginJsonCount += 1;
}

fs.writeFileSync(marketPath, `${JSON.stringify(market, null, 2)}\n`);
console.log(
  `Copied brand logos into ${pluginJsonCount} plugins and updated manifests.`,
);
