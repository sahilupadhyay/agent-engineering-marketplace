#!/usr/bin/env node
/**
 * Zero-dependency repo-wide secret scan (CI and local).
 * Usage: node scripts/secret-scan-repo.mjs [--root <dir>]
 * Default --root is the repository root (parent of scripts/).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Shared with future secret-scan hook (PR 9). */
export const SECRET_PATTERNS = [
  { label: "aws-access-key", re: /\bAKIA[0-9A-Z]{16}\b/g },
  { label: "private-key", re: /-----BEGIN (?:RSA |OPENSSH |EC |DSA |ENCRYPTED )?PRIVATE KEY-----/g },
  {
    label: "github-token",
    re: /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{36,}\b/g,
  },
  { label: "github-pat", re: /\bgithub_pat_[A-Za-z0-9_]{20,}\b/g },
  { label: "slack-token", re: /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/g },
  { label: "stripe-live", re: /\bsk_live_[A-Za-z0-9]{16,}\b/g },
  {
    label: "aws-secret-assign",
    re: /aws_secret_access_key\s*[=:]\s*['"][A-Za-z0-9/+=]{40}['"]/gi,
  },
];

const PLACEHOLDER_RE = /EXAMPLE|PLACEHOLDER|YOUR[_A-Z]*KEY|REPLACE_ME|CHANGEME|xxx+/i;

const BINARY_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".ico",
  ".woff",
  ".woff2",
  ".pem",
]);

const MAX_FILE_BYTES = 512 * 1024;

/**
 * @param {string[]} argv
 */
function parseArgs(argv) {
  let root = REPO_ROOT;
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--root" && argv[i + 1]) {
      root = path.resolve(argv[i + 1]);
      i += 1;
    }
  }
  return { root };
}

/**
 * @param {string} dir
 * @returns {string[]}
 */
function listFilesRecursive(dir) {
  /** @type {string[]} */
  const files = [];
  if (!fs.existsSync(dir)) {
    return files;
  }
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") {
      continue;
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listFilesRecursive(full));
    } else if (entry.isFile()) {
      files.push(full);
    }
  }
  return files;
}

/**
 * @param {string} filePath
 * @returns {boolean}
 */
function shouldScanFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (BINARY_EXTENSIONS.has(ext)) {
    return false;
  }
  try {
    const stat = fs.statSync(filePath);
    if (stat.size > MAX_FILE_BYTES) {
      return false;
    }
  } catch {
    return false;
  }
  return true;
}

/**
 * @param {string} text
 * @returns {boolean}
 */
function looksLikeText(text) {
  return !text.includes("\0");
}

/**
 * @param {string} text
 * @param {number} index
 * @param {number} length
 * @returns {boolean}
 */
function isPlaceholderWindow(text, index, length) {
  const start = Math.max(0, index - 40);
  const end = Math.min(text.length, index + length + 40);
  const window = text.slice(start, end);
  return PLACEHOLDER_RE.test(window);
}

/**
 * @param {string} root
 * @returns {string[]}
 */
export function scanRoot(root) {
  /** @type {string[]} */
  const findings = [];
  const files = listFilesRecursive(root);

  for (const filePath of files) {
    if (!shouldScanFile(filePath)) {
      continue;
    }
    let content;
    try {
      content = fs.readFileSync(filePath, "utf8");
    } catch {
      continue;
    }
    if (!looksLikeText(content)) {
      continue;
    }

    const rel = path.relative(root, filePath) || filePath;
    const lines = content.split("\n");

    for (const { label, re } of SECRET_PATTERNS) {
      const pattern = new RegExp(re.source, re.flags);
      let match;
      while ((match = pattern.exec(content)) !== null) {
        if (isPlaceholderWindow(content, match.index, match[0].length)) {
          continue;
        }
        const lineNumber =
          content.slice(0, match.index).split("\n").length;
        const line = lines[lineNumber - 1] ?? "";
        const excerpt = line.trim().slice(0, 80);
        findings.push(`${rel}:${lineNumber}:${label}: ${excerpt}`);
        break;
      }
    }
  }

  return findings;
}

function main() {
  const { root } = parseArgs(process.argv.slice(2));
  const findings = scanRoot(root);

  for (const finding of findings) {
    console.error(finding);
  }

  if (findings.length > 0) {
    process.exit(1);
  }

  process.exit(0);
}

const isMain =
  process.argv[1] &&
  pathToFileURL(path.resolve(process.argv[1])).href === pathToFileURL(fileURLToPath(import.meta.url)).href;

if (isMain) {
  main();
}
