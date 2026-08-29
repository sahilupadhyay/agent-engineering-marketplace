import fs from "node:fs";
import path from "node:path";

/** @typedef {{ file: string, kind: string, detail?: string }} StackSignal */

const NODE_BACKEND_DEPS = [
  "express",
  "fastify",
  "koa",
  "hono",
  "@nestjs/core",
  "nestjs",
  "fastify",
  "connect",
  "restify",
];

const REACT_DEPS = [
  "react",
  "react-dom",
  "next",
  "@remix-run/react",
  "react-native",
  "preact",
];

/**
 * @param {Record<string, string> | undefined} deps
 * @param {string[]} names
 */
function hasDependency(deps, names) {
  if (!deps) {
    return false;
  }
  return names.some((name) => Object.prototype.hasOwnProperty.call(deps, name));
}

/**
 * @param {string} root
 * @returns {StackSignal[]}
 */
function readPackageJson(root) {
  const filePath = path.join(root, "package.json");
  if (!fs.existsSync(filePath)) {
    return [];
  }

  /** @type {StackSignal[]} */
  const signals = [{ file: "package.json", kind: "node" }];

  try {
    const pkg = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const deps = {
      ...(pkg.dependencies ?? {}),
      ...(pkg.devDependencies ?? {}),
    };

    if (hasDependency(deps, REACT_DEPS)) {
      signals.push({ file: "package.json", kind: "react", detail: "react dependency" });
    }
    if (hasDependency(deps, NODE_BACKEND_DEPS)) {
      signals.push({ file: "package.json", kind: "node-backend", detail: "server framework dependency" });
    }
  } catch {
    signals.push({ file: "package.json", kind: "invalid-json" });
  }

  return signals;
}

/**
 * @param {string} root
 * @returns {StackSignal[]}
 */
function readPythonManifests(root) {
  /** @type {StackSignal[]} */
  const signals = [];
  const pyproject = path.join(root, "pyproject.toml");
  const requirements = path.join(root, "requirements.txt");

  if (fs.existsSync(pyproject)) {
    signals.push({ file: "pyproject.toml", kind: "python" });
  }
  if (fs.existsSync(requirements)) {
    signals.push({ file: "requirements.txt", kind: "python" });
  }

  return signals;
}

/**
 * @param {string} root
 * @param {string} fileName
 * @param {string} kind
 * @returns {StackSignal[]}
 */
function readMarkerFile(root, fileName, kind) {
  const filePath = path.join(root, fileName);
  return fs.existsSync(filePath) ? [{ file: fileName, kind }] : [];
}

/**
 * @param {StackSignal[]} signals
 * @returns {string[]}
 */
export function recommendPlugins(signals) {
  /** @type {Set<string>} */
  const recommended = new Set();
  const kinds = new Set(signals.map((signal) => signal.kind));

  if (kinds.has("react")) {
    recommended.add("frontend-react");
  }
  if (kinds.has("node-backend")) {
    recommended.add("backend-node");
  }
  if (kinds.has("python")) {
    recommended.add("backend-python");
  }
  if (kinds.has("node") && !kinds.has("react") && !kinds.has("node-backend")) {
    recommended.add("backend-node");
  }

  return [...recommended].sort();
}

/**
 * @param {string} root
 * @returns {{
 *   root: string,
 *   signals: StackSignal[],
 *   recommended: string[],
 *   policy: string,
 * }}
 */
export function detectStack(root) {
  const resolved = path.resolve(root);
  const signals = [
    ...readPackageJson(resolved),
    ...readPythonManifests(resolved),
    ...readMarkerFile(resolved, "go.mod", "go"),
    ...readMarkerFile(resolved, "pom.xml", "java"),
    ...readMarkerFile(resolved, "Cargo.toml", "rust"),
  ];

  return {
    root: resolved,
    signals,
    recommended: recommendPlugins(signals),
    policy:
      "Recommend only. Never auto-install plugins. Prompt the user to enable matches in Cursor Settings → Plugins.",
  };
}
