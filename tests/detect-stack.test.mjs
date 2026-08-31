import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { detectStack, recommendPlugins } from "../scripts/lib/detect-stack.mjs";

const FIXTURES = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "fixtures", "detect-stack");

test("recommendPlugins maps react signal to frontend-react", () => {
  assert.deepEqual(
    recommendPlugins([{ file: "package.json", kind: "react" }]),
    ["frontend-react"],
  );
});

test("recommendPlugins maps vue and angular without auto-installing others", () => {
  assert.deepEqual(
    recommendPlugins([{ file: "package.json", kind: "vue" }]),
    ["frontend-vue"],
  );
  assert.deepEqual(
    recommendPlugins([{ file: "package.json", kind: "angular" }]),
    ["frontend-angular"],
  );
});

test("recommendPlugins maps go, java, docker, kubernetes, databricks", () => {
  assert.deepEqual(recommendPlugins([{ file: "go.mod", kind: "go" }]), ["backend-go"]);
  assert.deepEqual(recommendPlugins([{ file: "pom.xml", kind: "java" }]), ["backend-java"]);
  assert.deepEqual(recommendPlugins([{ file: "Dockerfile", kind: "docker" }]), ["platform-docker"]);
  assert.deepEqual(recommendPlugins([{ file: "helm/", kind: "kubernetes" }]), ["platform-kubernetes"]);
  assert.deepEqual(
    recommendPlugins([{ file: "databricks.yml", kind: "databricks" }]),
    ["data-databricks"],
  );
});

test("detectStack recommends frontend-react for react fixture", () => {
  const report = detectStack(path.join(FIXTURES, "react-app"));
  assert.deepEqual(report.recommended, ["frontend-react"]);
  assert.match(report.policy, /Never auto-install/);
});

test("detectStack recommends backend-node for express fixture", () => {
  const report = detectStack(path.join(FIXTURES, "express-app"));
  assert.deepEqual(report.recommended, ["backend-node"]);
});

test("detectStack recommends backend-python for pyproject fixture", () => {
  const report = detectStack(path.join(FIXTURES, "python-app"));
  assert.deepEqual(report.recommended, ["backend-python"]);
});

test("detectStack recommends frontend-vue for vue fixture", () => {
  const report = detectStack(path.join(FIXTURES, "vue-app"));
  assert.deepEqual(report.recommended, ["frontend-vue"]);
});

test("detectStack recommends frontend-angular for angular fixture", () => {
  const report = detectStack(path.join(FIXTURES, "angular-app"));
  assert.deepEqual(report.recommended, ["frontend-angular"]);
});

test("detectStack recommends backend-go for go.mod fixture", () => {
  const report = detectStack(path.join(FIXTURES, "go-app"));
  assert.deepEqual(report.recommended, ["backend-go"]);
});

test("detectStack recommends backend-java for pom.xml fixture", () => {
  const report = detectStack(path.join(FIXTURES, "java-app"));
  assert.deepEqual(report.recommended, ["backend-java"]);
});

test("detectStack recommends platform-docker for Dockerfile fixture", () => {
  const report = detectStack(path.join(FIXTURES, "docker-app"));
  assert.deepEqual(report.recommended, ["platform-docker"]);
});

test("detectStack recommends platform-kubernetes for helm fixture", () => {
  const report = detectStack(path.join(FIXTURES, "k8s-app"));
  assert.deepEqual(report.recommended, ["platform-kubernetes"]);
});

test("detectStack recommends data-databricks for databricks.yml fixture", () => {
  const report = detectStack(path.join(FIXTURES, "databricks-app"));
  assert.deepEqual(report.recommended, ["data-databricks"]);
});

test("recommendPlugins maps handbook-gap stack signals", () => {
  assert.deepEqual(recommendPlugins([{ file: "Cargo.toml", kind: "rust" }]), ["lang-rust"]);
  assert.deepEqual(recommendPlugins([{ file: "scripts/", kind: "shell" }]), ["lang-bash"]);
  assert.deepEqual(recommendPlugins([{ file: "azure/", kind: "azure" }]), ["cloud-azure"]);
  assert.deepEqual(recommendPlugins([{ file: "gcp/", kind: "gcp" }]), ["cloud-gcp"]);
  assert.deepEqual(recommendPlugins([{ file: "main.tf", kind: "terraform" }]), ["platform-terraform"]);
  assert.deepEqual(
    recommendPlugins([{ file: ".github/workflows/", kind: "github-actions" }]),
    ["platform-github-actions"],
  );
  assert.deepEqual(recommendPlugins([{ file: "otel/", kind: "telemetry" }]), ["obs-telemetry"]);
  assert.deepEqual(recommendPlugins([{ file: "routes/", kind: "http-api" }]), ["api-http"]);
});

test("detectStack returns empty recommendations for empty fixture", () => {
  const report = detectStack(path.join(FIXTURES, "empty"));
  assert.deepEqual(report.recommended, []);
});

test("detectStack policy is recommend-only", () => {
  const report = detectStack(path.join(FIXTURES, "empty"));
  assert.match(report.policy, /Recommend only/);
  assert.match(report.policy, /Never auto-install/);
});
