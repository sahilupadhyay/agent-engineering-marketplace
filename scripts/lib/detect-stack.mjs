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

const VUE_DEPS = ["vue", "nuxt", "nuxt3", "@vue/runtime-dom"];

const ANGULAR_DEPS = ["@angular/core"];

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
    if (hasDependency(deps, VUE_DEPS)) {
      signals.push({ file: "package.json", kind: "vue", detail: "vue dependency" });
    }
    if (hasDependency(deps, ANGULAR_DEPS)) {
      signals.push({ file: "package.json", kind: "angular", detail: "@angular/core dependency" });
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
 * @param {string} root
 * @param {string} dirName
 * @param {string} kind
 * @returns {StackSignal[]}
 */
function readMarkerDir(root, dirName, kind) {
  const dirPath = path.join(root, dirName);
  if (!fs.existsSync(dirPath)) {
    return [];
  }
  try {
    if (fs.statSync(dirPath).isDirectory()) {
      return [{ file: `${dirName}/`, kind }];
    }
  } catch {
    return [];
  }
  return [];
}

/**
 * @param {StackSignal[]} signals
 * @returns {string[]}
 */
export function recommendPlugins(signals) {
  /** @type {Set<string>} */
  const recommended = new Set();
  const kinds = new Set(signals.map((signal) => signal.kind));
  const frontendKinds = kinds.has("react") || kinds.has("vue") || kinds.has("angular");

  if (kinds.has("react")) {
    recommended.add("frontend-react");
  }
  if (kinds.has("vue")) {
    recommended.add("frontend-vue");
  }
  if (kinds.has("angular")) {
    recommended.add("frontend-angular");
  }
  if (kinds.has("node-backend")) {
    recommended.add("backend-node");
  }
  if (kinds.has("python")) {
    recommended.add("backend-python");
  }
  if (kinds.has("node") && !frontendKinds && !kinds.has("node-backend")) {
    recommended.add("backend-node");
  }
  if (kinds.has("go")) {
    recommended.add("backend-go");
  }
  if (kinds.has("java")) {
    recommended.add("backend-java");
  }
  if (kinds.has("docker")) {
    recommended.add("platform-docker");
  }
  if (kinds.has("kubernetes")) {
    recommended.add("platform-kubernetes");
  }
  if (kinds.has("databricks")) {
    recommended.add("data-databricks");
  }
  if (kinds.has("rust")) {
    recommended.add("lang-rust");
  }
  if (kinds.has("shell")) {
    recommended.add("lang-bash");
  }
  if (kinds.has("azure")) {
    recommended.add("cloud-azure");
  }
  if (kinds.has("gcp")) {
    recommended.add("cloud-gcp");
  }
  if (kinds.has("terraform")) {
    recommended.add("platform-terraform");
  }
  if (kinds.has("github-actions")) {
    recommended.add("platform-github-actions");
  }
  if (kinds.has("telemetry")) {
    recommended.add("obs-telemetry");
  }
  if (kinds.has("http-api")) {
    recommended.add("api-http");
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
    ...readMarkerFile(resolved, "build.gradle", "java"),
    ...readMarkerFile(resolved, "build.gradle.kts", "java"),
    ...readMarkerFile(resolved, "Cargo.toml", "rust"),
    ...readMarkerFile(resolved, "Dockerfile", "docker"),
    ...readMarkerFile(resolved, "databricks.yml", "databricks"),
    ...readMarkerDir(resolved, ".github/workflows", "github-actions"),
    ...readMarkerDir(resolved, "terraform", "terraform"),
    ...readMarkerDir(resolved, "otel", "telemetry"),
    ...readMarkerDir(resolved, "opentelemetry", "telemetry"),
    ...readMarkerFile(resolved, "main.bicep", "azure"),
    ...readMarkerDir(resolved, "azure", "azure"),
    ...readMarkerDir(resolved, "gcp", "gcp"),
    ...readMarkerDir(resolved, "scripts", "shell"),
    ...readMarkerFile(resolved, "main.tf", "terraform"),
    ...readMarkerDir(resolved, "helm", "kubernetes"),
    ...readMarkerDir(resolved, "k8s", "kubernetes"),
    ...readMarkerDir(resolved, "kubernetes", "kubernetes"),
  ];

  return {
    root: resolved,
    signals,
    recommended: recommendPlugins(signals),
    policy:
      "Recommend only. Never auto-install plugins. Prompt the user to enable matches in Cursor Settings → Plugins.",
  };
}
