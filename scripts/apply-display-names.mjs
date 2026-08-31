#!/usr/bin/env node
/**
 * Set displayName on marketplace plugin manifests.
 * Usage: node scripts/apply-display-names.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { readJsonFile } from "./lib/manifest.mjs";

const root = process.cwd();

/** @param {string} slug */
function displayNameFromSlug(slug) {
  /** @type {Record<string, string>} */
  const words = {
    api: "API",
    aws: "AWS",
    gcp: "GCP",
    http: "HTTP",
    htmlcss: "HTML & CSS",
    javascript: "JavaScript",
    mysql: "MySQL",
    jira: "Jira",
    github: "GitHub",
    sonarqube: "SonarQube",
    dynamodb: "DynamoDB",
    postgres: "Postgres",
    databricks: "Databricks",
    terraform: "Terraform",
    vue: "Vue",
    rust: "Rust",
    coralogix: "Coralogix",
    heap: "Heap",
  };
  return slug
    .split("-")
    .map((part) => words[part] ?? part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

const marketPath = path.join(root, ".cursor-plugin/marketplace.json");
const market = readJsonFile(marketPath);
let pluginJsonCount = 0;

for (const entry of market.plugins) {
  const displayName = displayNameFromSlug(entry.name);
  entry.displayName = displayName;

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
  pluginJson.displayName = displayName;
  fs.writeFileSync(pluginJsonPath, `${JSON.stringify(pluginJson, null, 2)}\n`);
  pluginJsonCount += 1;
}

fs.writeFileSync(marketPath, `${JSON.stringify(market, null, 2)}\n`);
console.log(`Set displayName on marketplace.json and ${pluginJsonCount} plugin.json files.`);
