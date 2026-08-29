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

test("detectStack returns empty recommendations for empty fixture", () => {
  const report = detectStack(path.join(FIXTURES, "empty"));
  assert.deepEqual(report.recommended, []);
});
