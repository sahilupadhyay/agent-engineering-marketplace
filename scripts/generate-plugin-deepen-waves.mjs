#!/usr/bin/env node
/**
 * One-shot generator for plugin deepen waves 2–6 (master plan).
 * Run from repo root: node scripts/generate-plugin-deepen-waves.mjs
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

/** @param {string} plugin @param {string} id @param {string} file @param {object} assert */
function writeEval(plugin, id, file, section, assert) {
  const dir = path.join(root, "evals/suites", plugin);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, `${id}.eval.json`),
    `${JSON.stringify(
      {
        id,
        plugin,
        claim: `${id} content check.`,
        activation: "unknown",
        target: { file, section },
        assert,
      },
      null,
      2,
    )}\n`,
  );
}

/**
 * @param {string} plugin
 * @param {string} name
 * @param {string} description
 * @param {string} body
 */
function writeSkill(plugin, name, description, body) {
  const skillPath = path.join(root, "plugins", plugin, "skills", name, "SKILL.md");
  fs.mkdirSync(path.dirname(skillPath), { recursive: true });
  fs.writeFileSync(
    skillPath,
    `---
name: ${name}
description: ${description}
---

${body}
`,
  );
  writeEval(plugin, `${name}-use-when`, `skills/${name}/SKILL.md`, "frontmatter", {
    type: "contains",
    value: "Use when",
    ignoreCase: true,
  });
}

const configs = [
  // Wave 2
  {
    plugin: "backend-node",
    skill: "node-service-review",
    desc: "Use when changing Node or TypeScript server routes, middleware, services, or API handlers.",
    body: `# Node service review

## Preconditions
Match existing framework (Express, Fastify, Nest, etc.). Cross-link **api-http** for route contracts.

## Review
1. **Async/errors** — errors propagated; no unhandled rejections in request path.
2. **Validation** — input at boundary; typed handlers where the repo uses TypeScript.
3. **Middleware order** — auth, parsing, routes; no duplicate body parsers.
4. **Observability** — structured logs; correlation IDs if the repo uses them.
5. **Report** — risks, tests to run, and framework-specific gaps.`,
    evalExtra: ["node-async-errors", "skills/node-service-review/SKILL.md", "body", { type: "regex", pattern: "Async", flags: "i" }],
  },
  {
    plugin: "backend-python",
    skill: "python-service-review",
    desc: "Use when changing Python services, APIs, ORM models, or application modules.",
    body: `# Python service review

## Preconditions
Detect framework (FastAPI, Django, Flask). Link **data-postgres** / **data-mysql** when SQL changes.

## Review
1. **Validation** — pydantic/serializers at boundary.
2. **SQL** — parameterized queries only.
3. **Async** — match sync vs async style already in the module.
4. **Deps** — pin versions consistent with pyproject/requirements.
5. **Report** — test commands and migration impact.`,
    evalExtra: ["python-parameterized", "skills/python-service-review/SKILL.md", "body", { type: "regex", pattern: "parameterized", flags: "i" }],
  },
  {
    plugin: "backend-java",
    skill: "java-service-review",
    desc: "Use when changing Java services, controllers, repositories, or Spring components.",
    body: `# Java service review

## Review
1. **Exceptions** — no printStackTrace; use project exception types.
2. **Transactions** — scope and rollback boundaries.
3. **Queries** — parameterized; no string-built SQL.
4. **Layers** — respect controller/service/repository layout in the repo.
5. **Report** — test and build commands run.`,
    evalExtra: ["java-no-print-stacktrace", "skills/java-service-review/SKILL.md", "body", { type: "regex", pattern: "printStackTrace", flags: "i" }],
  },
  {
    plugin: "backend-go",
    skill: "go-service-review",
    desc: "Use when changing Go packages, HTTP handlers, or module dependencies.",
    body: `# Go service review

## Review
1. **Errors** — wrap with %w; no silent ignores.
2. **Context** — pass context.Context through I/O.
3. **Modules** — go.mod consistent; no duplicate HTTP clients.
4. **Layout** — match cmd/internal or flat structure.
5. **Report** — go test scope and race detector if used.`,
    evalExtra: ["go-wrap-errors", "skills/go-service-review/SKILL.md", "body", { type: "regex", pattern: "%w", flags: "i" }],
  },
  {
    plugin: "lang-rust",
    skill: "rust-review",
    desc: "Use when changing Rust crates, async services, or Cargo dependencies.",
    body: `# Rust review

## Review
1. **Errors** — Result and ? in library paths; document unwrap in tests only.
2. **Unsafe** — minimal scope with safety comments.
3. **Deps** — workspace versions; no duplicate HTTP stacks.
4. **Tests** — cover public API and error paths.
5. **Report** — MSRV and breaking changes.`,
    evalExtra: ["rust-result-errors", "skills/rust-review/SKILL.md", "body", { type: "regex", pattern: "Result", flags: "i" }],
  },
  {
    plugin: "lang-bash",
    skill: "shell-script-review",
    desc: "Use when adding or changing shell scripts, CI helpers, or hook wrappers.",
    body: `# Shell script review

## Review
1. **Quoting** — quote expansions; arrays for lists.
2. **Failure** — set -euo pipefail when repo style allows.
3. **Secrets** — env vars only; no literals.
4. **Portability** — note bash-only features.
5. **Report** — injection risks and shellcheck gaps.`,
    evalExtra: ["shell-quote-vars", "skills/shell-script-review/SKILL.md", "body", { type: "regex", pattern: "Quoting", flags: "i" }],
  },
  {
    plugin: "cost-efficiency",
    skill: "task-triage",
    desc: "Use when choosing model tier or scoping task complexity before implementation.",
    body: `# Task triage

## Classify
- **Simple** — single file, config, docs → minimal capable model.
- **Normal** — multi-file, familiar patterns → balanced model.
- **Critical** — security, prod, unclear architecture → strongest reliable model.

## Rules
Do not sacrifice correctness for cost. Escalate model when verification fails twice.

## Report
Recommended tier and why; what would trigger escalation.`,
    evalExtra: ["triage-min-capable-model", "skills/task-triage/SKILL.md", "body", { type: "regex", pattern: "correctness", flags: "i" }],
  },
  {
    plugin: "api-http",
    skill: "http-api-review",
    desc: "Use when designing or reviewing REST endpoints, handlers, or JSON contracts.",
    body: `# HTTP API review

## Preconditions
OpenAPI/spec work → **api-docs**. Handler code → this skill.

## Contract
Methods, paths, status codes, error envelope matching the repo.

## Validation
Sanitize at boundary; fail closed on auth failures.

## Auth
Authentication vs authorization per route.

## Compatibility
Additive JSON fields; version breaking changes explicitly.

## Safety
No stack traces or secrets in error JSON.

## Report
Gaps vs **api-docs** OpenAPI files if any.`,
    evalExtra: ["http-fail-closed", "skills/http-api-review/SKILL.md", "body", { type: "regex", pattern: "fail closed", flags: "i" }],
  },
  // Wave 3
  {
    plugin: "frontend-react",
    skill: "react-review",
    desc: "Use when changing React components, hooks, or client state in TSX/JSX files.",
    body: `# React review

## Review
1. **Hooks** — rules of hooks; stable deps; cleanup on unmount.
2. **State** — colocate; avoid fetch-in-render.
3. **Design system** — reuse existing components/tokens.
4. **A11y** — labels, focus, keyboard for interactive UI.
5. **Report** — test gaps; link **frontend-javascript** for non-TSX client code.`,
    evalExtra: ["react-no-fetch-in-render", "skills/react-review/SKILL.md", "body", { type: "regex", pattern: "fetch-in-render", flags: "i" }],
  },
  {
    plugin: "frontend-javascript",
    skill: "js-client-review",
    desc: "Use when changing client-side JavaScript or TypeScript outside React/Vue/Angular SFCs.",
    body: `# JS client review

## Review
1. **Types** — boundaries typed when repo uses TypeScript.
2. **No eval** — no dynamic code execution on untrusted input.
3. **Modules** — match bundler and import style.
4. **DOM XSS** — sanitize HTML insertion.
5. **Report** — overlap with **backend-node** if isomorphic code.`,
    evalExtra: ["js-no-eval", "skills/js-client-review/SKILL.md", "body", { type: "regex", pattern: "eval", flags: "i" }],
  },
  {
    plugin: "frontend-htmlcss",
    skill: "markup-review",
    desc: "Use when changing HTML, CSS, or accessibility of static or server-rendered markup.",
    body: `# Markup review

## Review
1. **Semantic HTML** — headings, landmarks, buttons vs divs.
2. **Forms** — labels, errors, keyboard traps.
3. **Tokens** — existing design variables; no new CSS architecture.
4. **Responsive** — breakpoints match project patterns.
5. **Report** — a11y gaps; SPA work → **frontend-react**.`,
    evalExtra: ["markup-keyboard-traps", "skills/markup-review/SKILL.md", "body", { type: "regex", pattern: "keyboard", flags: "i" }],
  },
  {
    plugin: "frontend-angular",
    skill: "angular-review",
    desc: "Use when changing Angular components, modules, services, or RxJS subscriptions.",
    body: `# Angular review

## Review
1. **Subscriptions** — takeUntilDestroyed or project pattern.
2. **Modules/standalone** — match existing bootstrap style.
3. **Templates** — strict typing; avoid logic-heavy templates.
4. **Change detection** — OnPush when perf-sensitive.
5. **Report** — test and lint commands.`,
    evalExtra: ["angular-take-until-destroyed", "skills/angular-review/SKILL.md", "body", { type: "regex", pattern: "takeUntil", flags: "i" }],
  },
  {
    plugin: "frontend-vue",
    skill: "vue-review",
    desc: "Use when changing Vue SFCs, Composition API setup, or Pinia/Vuex stores.",
    body: `# Vue review

## Review
1. **API style** — Composition vs Options per repo convention.
2. **Reactivity** — ref/reactive boundaries; no stale closures.
3. **Stores** — existing Pinia/Vuex patterns.
4. **Templates** — v-for keys; accessible controls.
5. **Report** — test scope for changed SFCs.`,
    evalExtra: ["vue-composition-api", "skills/vue-review/SKILL.md", "body", { type: "regex", pattern: "Composition", flags: "i" }],
  },
  // Wave 4
  {
    plugin: "data-postgres",
    skill: "postgres-review",
    desc: "Use when changing PostgreSQL schema, reviewing queries, or adding migrations.",
    body: `# Postgres review

## Scope
Postgres-flavored paths only. Enable **one** of postgres/mysql plugins.

## Workflow
1. **Name the change** — table, index, or query.
2. **Locking** — concurrent indexes where repo uses them; long ALTER risk.
3. **Data loss** — drops, type changes, NOT NULL backfill.
4. **RLS** — row-level security if the repo uses it.
5. **Roles** — least privilege; no superuser for app.
6. **Summarize** — migration order, rollback, verify queries.`,
    evalExtra: ["postgres-concurrent-index", "skills/postgres-review/SKILL.md", "body", { type: "regex", pattern: "concurrent", flags: "i" }],
  },
  {
    plugin: "data-mysql",
    skill: "mysql-review",
    desc: "Use when changing MySQL schema, reviewing queries, or adding migrations.",
    body: `# MySQL review

## Workflow
1. **Charset/collation** — utf8mb4 consistent.
2. **Online DDL** — prefer when repo supports; note lock impact.
3. **Rollback** — document reverse migration when feasible.
4. **Indexes** — match query filters; avoid redundant indexes.
5. **Summarize** — deployment order and verify queries.`,
    evalExtra: ["mysql-online-ddl", "skills/mysql-review/SKILL.md", "body", { type: "regex", pattern: "Online DDL", flags: "i" }],
  },
  {
    plugin: "data-dynamodb",
    skill: "dynamodb-review",
    desc: "Use when changing DynamoDB keys, GSIs, access patterns, or table IaC.",
    body: `# DynamoDB review

## Review
1. **Keys** — partition/sort design for access patterns.
2. **GSI** — projection and hot partition risk.
3. **No scans** — avoid Scan on hot paths.
4. **TTL** — explicit when used for expiry.
5. **Report** — capacity/cost implications.`,
    evalExtra: ["dynamodb-no-scan-hot-path", "skills/dynamodb-review/SKILL.md", "body", { type: "regex", pattern: "Scan", flags: "i" }],
  },
  {
    plugin: "data-redis",
    skill: "redis-review",
    desc: "Use when changing Redis keys, TTLs, eviction, or cache scripts.",
    body: `# Redis review

## Review
1. **Keys** — prefix, cardinality, owners.
2. **TTL** — every cache key expires unless durable by design.
3. **No KEYS** — in request paths.
4. **Memory** — eviction policy alignment.
5. **Report** — hot keys and secret handling.`,
    evalExtra: ["redis-no-keys-star", "skills/redis-review/SKILL.md", "body", { type: "regex", pattern: "KEYS", flags: "i" }],
  },
  {
    plugin: "data-databricks",
    skill: "databricks-job-review",
    desc: "Use when changing Databricks jobs, notebooks, or workspace config.",
    body: `# Databricks job review

## Review
1. **Scope** — job vs notebook vs cluster config.
2. **Secrets** — Databricks secrets scope; nothing in notebook plaintext.
3. **Cost** — cluster size and autoscale bounds.
4. **Idempotency** — safe reruns and backfill.
5. **Report** — verify job run commands.`,
    evalExtra: ["databricks-no-secrets-notebook", "skills/databricks-job-review/SKILL.md", "body", { type: "regex", pattern: "Secrets", flags: "i" }],
  },
  // Wave 5 - cloud-aws handled separately (4 skills)
  {
    plugin: "cloud-azure",
    skill: "azure-review",
    desc: "Use when reviewing Azure Bicep, ARM, or az CLI infrastructure changes.",
    body: `# Azure review

## Preconditions
Confirm subscription, resource group, and region.

## Review
1. **Identity** — managed identities over long-lived secrets.
2. **Network** — NSG rules; no open management CIDR without approval.
3. **Destroy** — flag az group delete and destructive ARM ops.
4. **Report** — blast radius and rollback.`,
    evalExtra: ["azure-managed-identity", "skills/azure-review/SKILL.md", "body", { type: "regex", pattern: "managed ident", flags: "i" }],
  },
  {
    plugin: "cloud-gcp",
    skill: "gcp-review",
    desc: "Use when reviewing GCP Terraform, Deployment Manager, or gcloud changes.",
    body: `# GCP review

## Review
1. **Project/region** — correct target.
2. **IAM** — least privilege; no allUsers on sensitive buckets.
3. **Keys** — workload identity over JSON keys.
4. **Destroy** — scope of gcloud/terraform deletes.
5. **Report** — data residency notes.`,
    evalExtra: ["gcp-workload-identity", "skills/gcp-review/SKILL.md", "body", { type: "regex", pattern: "workload identity", flags: "i" }],
  },
  {
    plugin: "platform-terraform",
    skill: "terraform-review",
    desc: "Use when reviewing Terraform modules, variables, or backend config.",
    body: `# Terraform review

## Review
1. **Plan** — summarize create/destroy/replace before apply.
2. **State** — remote backend; no committed state files.
3. **Secrets** — sensitive variables; no literals in tfvars.
4. **Modules** — version pins and blast radius.
5. **Report** — irreversible changes; link **cloud-aws** for AWS-specific depth.`,
    evalExtra: ["terraform-plan-summary", "skills/terraform-review/SKILL.md", "body", { type: "regex", pattern: "Plan", flags: "i" }],
  },
  {
    plugin: "platform-docker",
    skill: "docker-review",
    desc: "Use when changing Dockerfiles, Compose files, or container build args.",
    body: `# Docker review

## Review
1. **User** — non-root when repo pattern allows.
2. **Pins** — base image tags/digests; reproducible builds.
3. **Secrets** — build-args and env; no literals in Dockerfile.
4. **Layers** — cache-friendly ordering.
5. **Report** — scan and run commands.`,
    evalExtra: ["docker-non-root", "skills/docker-review/SKILL.md", "body", { type: "regex", pattern: "non-root", flags: "i" }],
  },
  {
    plugin: "platform-kubernetes",
    skill: "k8s-manifest-review",
    desc: "Use when changing Deployments, NetworkPolicies, Helm values, or Kustomize overlays.",
    body: `# Kubernetes manifest review

## Review
1. **Resources** — requests/limits; no privileged unless existing.
2. **Probes** — liveness/readiness defined.
3. **Secrets** — mounts vs env; no plaintext in manifests.
4. **Prod apply** — confirm context before kubectl/helm to production.
5. **Report** — link **platform-kubernetes** hook for destructive CLI.`,
    evalExtra: ["k8s-no-privileged-default", "skills/k8s-manifest-review/SKILL.md", "body", { type: "regex", pattern: "privileged", flags: "i" }],
  },
  {
    plugin: "platform-github-actions",
    skill: "gha-workflow-review",
    desc: "Use when adding or changing GitHub Actions workflows or reusable workflows.",
    body: `# GitHub Actions review

## Review
1. **Pins** — action SHAs or repo pins.
2. **Permissions** — least-privilege \`permissions:\` block.
3. **Secrets** — minimal scope; no echo in logs.
4. **Fork PRs** — untrusted input and pull_request_target risks.
5. **Report** — supply-chain and exfiltration risks.`,
    evalExtra: ["gha-least-privilege-perms", "skills/gha-workflow-review/SKILL.md", "body", { type: "regex", pattern: "least-privilege", flags: "i" }],
  },
  {
    plugin: "obs-telemetry",
    skill: "telemetry-review",
    desc: "Use when designing logs, metrics, traces, or OpenTelemetry instrumentation.",
    body: `# Telemetry review

## Review
1. **Logs** — structured fields; redact secrets/PII.
2. **Metrics** — naming, units, cardinality limits.
3. **Traces** — propagation on outbound calls.
4. **SLOs** — tie signals to error budgets when defined.
5. **Report** — blind spots and cost drivers; vendor tools → obs-coralogix/heap.`,
    evalExtra: ["telemetry-no-secrets-logs", "skills/telemetry-review/SKILL.md", "body", { type: "regex", pattern: "redact", flags: "i" }],
  },
  // Wave 6
  {
    plugin: "api-docs",
    skill: "openapi-review",
    desc: "Use when reviewing or authoring OpenAPI, Swagger, or AsyncAPI specification files.",
    body: `# OpenAPI review

## Discover
Find existing spec files before proposing new ones.

## Read
Version, servers, securitySchemes, breaking vs additive changes.

## Review
1. **Examples** — no real secrets in examples.
2. **Errors** — consistent error schema.
3. **Compatibility** — document breaking field removals.
4. **Implementation** — compare handlers via **api-http** when asked.

## Report
Spec gaps and suggested follow-ups.`,
    evalExtra: ["openapi-no-secrets-examples", "skills/openapi-review/SKILL.md", "body", { type: "regex", pattern: "secrets", flags: "i" }],
  },
  {
    plugin: "diagram-workflow",
    skill: "architecture-diagram",
    desc: "Use when creating or updating architecture diagrams via user-connected MCP tools.",
    body: `# Architecture diagram

## Preconditions
User-connected diagram MCP (e.g. Lucid). No bundled mcp.json.

## Workflow
1. Confirm audience and scope with user.
2. Draft components and flows in prose first.
3. Create/update diagram via MCP only after approval.
4. Label trust boundaries and data stores.
5. Report link and what changed.`,
    evalExtra: ["diagram-trust-boundaries", "skills/architecture-diagram/SKILL.md", "body", { type: "regex", pattern: "trust bound", flags: "i" }],
  },
  {
    plugin: "obs-heap",
    skill: "heap-analytics",
    desc: "Use when defining Heap events, properties, identity, or analytics contracts.",
    body: `# Heap analytics review

## Preconditions
User-connected Heap context or MCP when available.

## Review
1. **Events** — naming convention matches project.
2. **Properties** — no PII/secrets in event payloads.
3. **Identity** — stable user id strategy.
4. **Report** — gaps vs product questions.`,
    evalExtra: ["heap-no-pii", "skills/heap-analytics/SKILL.md", "body", { type: "regex", pattern: "PII", flags: "i" }],
  },
  {
    plugin: "quality-sonarqube",
    skill: "sonar-issue-triage",
    desc: "Use when a SonarQube quality gate failed or new issues appear on changed lines.",
    body: `# Sonar issue triage

## Triage
1. **Changed lines first** — ignore legacy debt unless asked.
2. **Severity** — blocker/critical before minor.
3. **No greenwash** — do not weaken gates to pass.

## Fix
Smallest change per issue; run local analysis if available.

## Report
Issues fixed, deferred, or need human policy decision.`,
    evalExtra: ["sonar-changed-lines-first", "skills/sonar-issue-triage/SKILL.md", "body", { type: "regex", pattern: "Changed lines", flags: "i" }],
  },
];

for (const cfg of configs) {
  writeSkill(cfg.plugin, cfg.skill, cfg.desc, cfg.body);
  if (cfg.evalExtra) {
    const [id, file, section, assert] = cfg.evalExtra;
    writeEval(cfg.plugin, id, file, section, assert);
  }
}

// cloud-aws: deepen four skills
const awsSkills = [
  ["aws-review", "Use when reviewing AWS resources, CLI commands, or service configuration.", "Confirm account and region. Review least-privilege IAM, encryption, and public exposure. Report blast radius."],
  ["infrastructure-review", "Use when reviewing Terraform, CloudFormation, or CDK before apply.", "Discover: read plan/diff. Review destroy flags, IAM, networking. Require plan-before-apply. Report irreversible changes."],
  ["deployment-check", "Use when validating a deployment or rollout on AWS.", "Run health checks the project defines. Verify rollback path. Report evidence collected."],
  ["aws-cost-review", "Use when reviewing AWS cost drivers in infrastructure changes.", "Flag idle resources, oversized instances, NAT costs. Not model selection (see cost-efficiency)."],
];
for (const [name, desc, extra] of awsSkills) {
  writeSkill(
    "cloud-aws",
    name,
    desc,
    `# ${name.replace(/-/g, " ")}

## Preconditions
User-connected AWS context. Optional AWS Knowledge MCP for docs — no bundled mcp.json.
Destructive CLI gated by **security-core** and **cloud-aws** hooks.

## Workflow
${extra.split(". ").filter(Boolean).map((s, i) => `${i + 1}. ${s.trim()}.`).join("\n")}

## Report
Commands run, risks, and rollback plan.`,
  );
}

// jira-triage deepen - append MCP tool names section
const jiraPath = path.join(root, "plugins/jira-workflow/skills/jira-triage/SKILL.md");
let jira = fs.readFileSync(jiraPath, "utf8");
if (!jira.includes("searchJiraIssuesUsingJql")) {
  jira = jira.replace(
    "## Gather context",
    `## MCP tools (when connected)

Use \`getJiraIssue\`, \`searchJiraIssuesUsingJql\`, \`editJiraIssue\`, \`transitionJiraIssue\`, and \`addCommentToJiraIssue\` as appropriate. Use \`search\` (Rovo) for broad discovery unless the user specifies JQL.

## Gather context`,
  );
  fs.writeFileSync(jiraPath, jira);
  writeEval("jira-workflow", "jira-mcp-tool-names", "skills/jira-triage/SKILL.md", "body", {
    type: "regex",
    pattern: "getJiraIssue|searchJiraIssuesUsingJql",
    flags: "i",
  });
}

// obs-coralogix deepen
writeSkill(
  "obs-coralogix",
  "coralogix-telemetry",
  "Use when querying Coralogix logs, metrics, or traces via user-connected MCP tools.",
  `# Coralogix telemetry

## Preconditions
User-connected Coralogix MCP. No bundled mcp.json. Generic telemetry patterns → **obs-telemetry**.

## Workflow
1. Confirm time range, application, and environment with user.
2. Search logs before summarizing — do not invent events.
3. Redact secrets and tokens from queries and summaries.
4. Correlate traces to errors when MCP supports it.
5. Report findings with query filters used.

## Safety
Read-only unless user explicitly asks to change alerts or dashboards.`,
);
writeEval("obs-coralogix", "coralogix-search-before-summarize", "skills/coralogix-telemetry/SKILL.md", "body", {
  type: "regex",
  pattern: "Search logs before",
  flags: "i",
});

// engineering-playbooks README cross-links only
const pbReadme = path.join(root, "plugins/engineering-playbooks/README.md");
if (fs.existsSync(pbReadme)) {
  let pb = fs.readFileSync(pbReadme, "utf8");
  if (!pb.includes("Related plugins")) {
    pb += `\n## Related plugins\n\n- **git-workflow** — commit/PR commands (no duplicate commit-and-pr skill here)\n- **testing** — verification ladder and \`write-focused-test\`\n- **atlassian-confluence** / **jira-workflow** — Atlassian MCP workflows\n`;
    fs.writeFileSync(pbReadme, pb);
    writeEval("engineering-playbooks", "playbooks-related-plugins", "README.md", "body", {
      type: "regex",
      pattern: "Related plugins",
      flags: "i",
    });
  }
}

console.log("Generated/deepened", configs.length + awsSkills.length + 2, "plugin skills");
