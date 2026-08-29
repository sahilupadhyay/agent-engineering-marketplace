import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HOOKS_ROOT = path.join(REPO_ROOT, "plugins", "security-core", "hooks");
const CLOUD_AWS_HOOKS_ROOT = path.join(REPO_ROOT, "plugins", "cloud-aws", "hooks");

function runHook(scriptName, stdin, env = {}, hooksRoot = HOOKS_ROOT) {
  const script = path.join(hooksRoot, scriptName);
  const result = spawnSync("sh", [script], {
    input: stdin,
    encoding: "utf8",
    env: { ...process.env, ...env },
  });
  const line = (result.stdout || "").trim().split("\n").pop() || "";
  const payload = line ? JSON.parse(line) : {};
  return { ...result, payload };
}

test("protect-shell allows ls", () => {
  const r = runHook("protect-shell.sh", '{"command":"ls -la"}');
  assert.equal(r.payload.permission, "allow");
  assert.equal(r.status, 0);
});

test("protect-shell allows rm node_modules", () => {
  const r = runHook("protect-shell.sh", '{"command":"rm -rf node_modules"}');
  assert.equal(r.payload.permission, "allow");
});

test("protect-shell asks on rm src", () => {
  const r = runHook("protect-shell.sh", '{"command":"rm -rf src"}');
  assert.equal(r.payload.permission, "ask");
});

test("protect-shell asks on git reset hard", () => {
  const r = runHook("protect-shell.sh", '{"command":"git reset --hard HEAD"}');
  assert.equal(r.payload.permission, "ask");
});

test("protect-shell asks on git push force", () => {
  const r = runHook("protect-shell.sh", '{"command":"git push --force origin main"}');
  assert.equal(r.payload.permission, "ask");
});

test("protect-shell allows force-with-lease", () => {
  const r = runHook("protect-shell.sh", '{"command":"git push --force-with-lease origin main"}');
  assert.equal(r.payload.permission, "allow");
});

test("protect-shell denies rm root", () => {
  const r = runHook("protect-shell.sh", '{"command":"rm -rf /"}');
  assert.equal(r.payload.permission, "deny");
  assert.equal(r.status, 2);
});

test("protect-shell denies rm home", () => {
  const r = runHook("protect-shell.sh", '{"command":"rm -rf ~"}');
  assert.equal(r.payload.permission, "deny");
});

test("protect-shell asks on invalid json", () => {
  const r = runHook("protect-shell.sh", "not json");
  assert.equal(r.payload.permission, "ask");
});

test("protect-shell allows empty object", () => {
  const r = runHook("protect-shell.sh", "{}");
  assert.equal(r.payload.permission, "allow");
});

test("protect-read allows readme", () => {
  const r = runHook("protect-read.sh", '{"file_path":"README.md"}');
  assert.equal(r.payload.permission, "allow");
});

test("protect-read allows env example", () => {
  const r = runHook("protect-read.sh", '{"file_path":".env.example"}');
  assert.equal(r.payload.permission, "allow");
});

test("protect-read denies dotenv", () => {
  const r = runHook("protect-read.sh", '{"file_path":".env"}');
  assert.equal(r.payload.permission, "deny");
  assert.equal(r.status, 2);
});

test("protect-read denies id_rsa", () => {
  const r = runHook("protect-read.sh", '{"file_path":"id_rsa"}');
  assert.equal(r.payload.permission, "deny");
});

test("protect-read denies aws credentials path", () => {
  const r = runHook("protect-read.sh", '{"file_path":"home/.aws/credentials"}');
  assert.equal(r.payload.permission, "deny");
});

test("secret-scan allows clean write", () => {
  const r = runHook(
    "secret-scan.sh",
    '{"tool_name":"Write","tool_input":{"contents":"hello world"},"path":"foo.txt"}',
  );
  assert.equal(r.payload.permission, "allow");
});

test("secret-scan denies github token write", () => {
  const token = "ghp_" + "FAKE00000000000000000000000000000000";
  const r = runHook(
    "secret-scan.sh",
    `{"tool_name":"Write","contents":"token ${token}","path":"bad.txt"}`,
  );
  assert.equal(r.payload.permission, "deny");
  assert.equal(r.status, 2);
});

test("secret-scan allows placeholder token", () => {
  const token = "ghp_" + "FAKE00000000000000000000000000000000";
  const r = runHook(
    "secret-scan.sh",
    `{"tool_name":"Write","tool_input":{"contents":"YOUR_API_KEY ${token} EXAMPLE"},"path":"ok.txt"}`,
  );
  assert.equal(r.payload.permission, "allow");
});

test("secret-scan denies staged secret on git commit", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "hook-git-"));
  const secret = "sk_live_" + "FAKE00000000000000000000000000000000";
  fs.writeFileSync(path.join(tmpDir, "leak.txt"), secret);
  spawnSync("git", ["init"], { cwd: tmpDir });
  spawnSync("git", ["add", "leak.txt"], { cwd: tmpDir });
  const r = runHook(
    "secret-scan.sh",
    `{"command":"git commit -m test","cwd":"${tmpDir}"}`,
  );
  fs.rmSync(tmpDir, { recursive: true, force: true });
  assert.equal(r.payload.permission, "deny");
});

test("dangerous-aws-command allows describe", () => {
  const r = runHook(
    "dangerous-aws-command.sh",
    '{"command":"aws ec2 describe-instances"}',
    {},
    CLOUD_AWS_HOOKS_ROOT,
  );
  assert.equal(r.payload.permission, "allow");
});

test("dangerous-aws-command asks on kubectl delete", () => {
  const r = runHook(
    "dangerous-aws-command.sh",
    '{"command":"kubectl delete namespace prod"}',
    {},
    CLOUD_AWS_HOOKS_ROOT,
  );
  assert.equal(r.payload.permission, "ask");
});

test("dangerous-aws-command asks on helm uninstall", () => {
  const r = runHook(
    "dangerous-aws-command.sh",
    '{"command":"helm uninstall my-release -n prod"}',
    {},
    CLOUD_AWS_HOOKS_ROOT,
  );
  assert.equal(r.payload.permission, "ask");
});

test("dangerous-aws-command asks on eks delete-cluster", () => {
  const r = runHook(
    "dangerous-aws-command.sh",
    '{"command":"aws eks delete-cluster --name prod"}',
    {},
    CLOUD_AWS_HOOKS_ROOT,
  );
  assert.equal(r.payload.permission, "ask");
});

test("dangerous-aws-command asks on redshift delete-cluster", () => {
  const r = runHook(
    "dangerous-aws-command.sh",
    '{"command":"aws redshift delete-cluster --cluster-identifier prod"}',
    {},
    CLOUD_AWS_HOOKS_ROOT,
  );
  assert.equal(r.payload.permission, "ask");
});

test("dangerous-aws-command asks on rds delete-db-cluster", () => {
  const r = runHook(
    "dangerous-aws-command.sh",
    '{"command":"aws rds delete-db-cluster --db-cluster-identifier prod"}',
    {},
    CLOUD_AWS_HOOKS_ROOT,
  );
  assert.equal(r.payload.permission, "ask");
});
