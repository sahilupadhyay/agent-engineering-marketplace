# Plugin roles

One page describing every marketplace plugin: tier, single responsibility, assets,
and what each plugin **does not** cover.

**Tiers:** `required` and `default-on` plugins use always-on rules within byte
budgets ([tiers.md](tiers.md)). `default-off` plugins use glob-scoped rules and/or
skills-only patterns.

## Core (every session)

| Plugin | Tier | Responsibility | Rules | Skills | Hooks |
| --- | --- | --- | ---: | ---: | ---: |
| `engineering-core` | Required | Task intake, evidence before change, minimal diff, context efficiency | 7 | 2 (`task-intake-playbook`, `config-change-review`) | — |
| `security-core` | Required | Secrets, auth, input trust, destructive ops, supply chain | 5 | 2 (`confirm-destructive-op`, `secret-exposure-response`) | 3 (`protect-shell`, `protect-read`, `secret-scan`) |

**Non-goals:** Stack-specific guidance (use stack plugins). Deep verification ladder (use `testing`).

## Workflow and quality (default on)

| Plugin | Tier | Responsibility | Rules | Skills | Hooks |
| --- | --- | --- | ---: | ---: | ---: |
| `git-workflow` | Default On | Commit identity, branch/PR conventions, review commands | 2 | 1 (`resolve-review-feedback`, gh API + verify ladder) | — |
| `code-quality` | Default On | Scope discipline, readability, refactor only when needed | 3 | 1 (`scope-and-style-review`) | — |
| `testing` | Default On | When to test, proportionality, verification ladder | 3 | 1 (`write-focused-test`); command `/verify` | — |
| `session-closeout` | Default On | Agent-mode closeout table (skills, confidence, quality, security, performance) | 1 | — (rule sufficient; README documents non-goals) | — |

**Non-goals:** Stack test patterns (use stack + `testing` together). Git hooks for destructive shell (use `security-core`).

## Efficiency

| Plugin | Tier | Responsibility | Rules | Skills | Hooks |
| --- | --- | --- | ---: | ---: | ---: |
| `cost-efficiency` | Default Off | Model selection and task triage for minimal capable model | 1 | 1 (`task-triage`) | — |

**Non-goals:** Correctness trade-offs; always use the simplest model that can complete the task reliably.

## Backend

| Plugin | Tier | Globs (summary) | Skill | Responsibility |
| --- | --- | --- | --- | --- |
| `backend-node` | Default Off | `**/*.{ts,js,mjs,cjs}` in server paths | `node-service-review` | Node/TS service discipline |
| `backend-python` | Default Off | `**/*.py` | `python-service-review` | Python service discipline |
| `backend-java` | Default Off | `**/*.java` | `java-service-review` | Java service discipline |
| `backend-go` | Default Off | `**/*.go` | `go-service-review` | Go service discipline |

**Non-goals:** One plugin per language, not per framework variant. Deep framework playbooks belong in skills (future).

## Frontend

| Plugin | Tier | Globs (summary) | Skill | Responsibility |
| --- | --- | --- | --- | --- |
| `frontend-react` | Default Off | `**/*.{tsx,jsx}` | `react-review` | React component and hook discipline |
| `frontend-htmlcss` | Default Off | `**/*.{html,css,scss}` | `markup-review` | Markup, a11y, design tokens |
| `frontend-javascript` | Default Off | `**/*.{js,ts,mjs,cjs}` (client) | `js-client-review` | Typed client boundaries |
| `frontend-angular` | Default Off | `**/*.{ts,html}` in Angular trees | `angular-review` | Angular component discipline |
| `frontend-vue` | Default Off | `**/*.vue` | `vue-review` | Vue SFC discipline |

**Non-goals:** Replacing your design system. Core Web Vitals deep dives (future skill).

## Data

| Plugin | Tier | Globs (summary) | Responsibility |
| --- | --- | --- | --- |
| `data-postgres` | Default Off | Postgres-flavored paths (`.pgsql`, `postgres/`, `*postgres*.sql`) | Postgres safety; skill `postgres-review` |
| `data-mysql` | Default Off | MySQL-flavored SQL/migrations | MySQL safety; skill `mysql-review` |
| `data-dynamodb` | Default Off | DynamoDB/IaC patterns | Access patterns; skill `dynamodb-review` |
| `data-redis` | Default Off | Redis config/scripts | Cache/TTL discipline; skill `redis-review` |
| `data-databricks` | Default Off | Notebooks, jobs, `databricks.yml` | Workspace safety; skill `databricks-job-review` |

**Non-goals:** Enable **both** `data-postgres` and `data-mysql` on repos with generic `**/*.sql`—pick one dialect. Generic DB review (future `engineering-playbooks`).

## Cloud and platform

| Plugin | Tier | Responsibility | Rules | Skills | Hooks |
| --- | --- | --- | ---: | ---: | ---: |
| `cloud-aws` | Default Off | AWS, Terraform, CloudFormation safety and reviews | 4 | 4 | 2 |
| `platform-docker` | Default Off | Dockerfile and Compose safety | 1 | 1 (`docker-review`) | — |
| `platform-kubernetes` | Default Off | K8s/Helm workload safety | 1 | 1 (`k8s-manifest-review`) | 1 |

**`cloud-aws` skills:** `aws-review`, `infrastructure-review`, `deployment-check`, `aws-cost-review`.

**`cloud-aws` hooks:** `dangerous-aws-command.sh` (extended AWS API deletes only).

**`platform-kubernetes` hooks:** `dangerous-k8s-command.sh` (`kubectl delete`, `helm uninstall`/`delete`).

**Non-goals:** Azure/GCP/Terraform-as-platform (future plugins). Bundled MCP or AWS credentials.

## Integrations (skills-only)

| Plugin | Tier | Skill | Requires |
| --- | --- | --- | --- |
| `jira-workflow` | Default Off | `jira-triage`, `jira-comment-pr` | User-connected Atlassian MCP |
| `atlassian-confluence` | Default Off | `confluence-page` | User-connected Atlassian MCP; search-before-create, update-over-duplicate, HTML default |
| `diagram-workflow` | Default Off | `architecture-diagram` | User-connected diagram MCP (e.g. Lucid) |
| `api-docs` | Default Off | `openapi-review` | OpenAPI/spec files in repo |
| `obs-coralogix` | Default Off | `coralogix-telemetry` | User-connected Coralogix MCP |
| `obs-heap` | Default Off | `heap-analytics` | Heap project context |
| `quality-sonarqube` | Default Off | `sonar-issue-triage` | SonarQube gate config in repo |

**Non-goals:** Bundled MCP servers ([mcp-governance.md](mcp-governance.md)). Vendor credentials in plugin files.

**`atlassian-confluence` skill behavior:** discover existing pages before create;
prefer `updateConfluencePage` over duplicates; default `contentFormat: html` for
writes. Jira triage stays in **jira-workflow**.

## Language and platform gaps (default off)

| Plugin | Tier | Responsibility |
| --- | --- | --- |
| `lang-rust` | Default Off | Rust errors, unsafe, Cargo layout; skill `rust-review` |
| `lang-bash` | Default Off | Shell quoting and errexit; skill `shell-script-review` |
| `cloud-azure` | Default Off | Azure/Bicep safety; skill `azure-review` |
| `cloud-gcp` | Default Off | GCP project/IAM safety; skill `gcp-review` |
| `platform-terraform` | Default Off | Vendor-neutral Terraform plan/state; skill `terraform-review` |
| `platform-github-actions` | Default Off | Workflow pins and permissions; skill `gha-workflow-review` |
| `obs-telemetry` | Default Off | Generic logs/metrics/traces; skill `telemetry-review` |
| `api-http` | Default Off | REST/JSON handler discipline; skill `http-api-review` (complements `api-docs`) |

**Non-goals:** Duplicating `cloud-aws` AWS-specific depth in Azure/GCP plugins. OpenAPI spec review stays in `api-docs`.

## Engineering playbooks (skills only)

| Plugin | Tier | Skills |
| --- | --- | --- |
| `engineering-playbooks` | Default Off | `debug-incident`, `code-review`, `performance-review`, `data-access-review`, `api-design`, `threat-model`, `architecture-intake`, `resilience-review`, `incident-triage`, `github-ci`, `elicitation` |

**Non-goals:** Commit/PR workflow (use **git-workflow**). Org-specific or proprietary playbooks.

## Destructive-operation ownership

| Layer | Owner | Covers |
| --- | --- | --- |
| Rule | `security-core` `040-destructive-ops` | Agent must confirm before destructive ops |
| Hook | `security-core` `protect-shell.sh` | rm, git destructive, SQL DROP/TRUNCATE/DELETE-without-WHERE, Redis FLUSHALL/FLUSHDB, `aws s3 rm`, `find -delete`, common AWS deletes, terraform destroy |
| Hook | `cloud-aws` `dangerous-aws-command.sh` | Extended AWS API deletes (EKS cluster, ElastiCache, Route53, …) |
| Hook | `platform-kubernetes` `dangerous-k8s-command.sh` | `kubectl delete`, `helm uninstall`/`delete` |

Do **not** add a separate destructive-ops plugin; extend `security-core` hooks instead.

## Verification ownership

| Plugin | Rule | Role |
| --- | --- | --- |
| `engineering-core` | `040-verification` | One paragraph: inspect diff, run focused checks, report |
| `testing` | `030-verification-ladder` | Ordered ladder: syntax → typecheck → lint → tests → build |

`engineering-core` stays minimal; `testing` owns the detailed ladder when both are enabled.

## Marketplace non-goals (entire catalog)

- **Not** a monolithic always-on rule tree for every stack
- **Not** bundled MCP servers or org-specific Frodo/GP payroll skills
- **Not** guaranteed zero hallucinations (evals are content assertions, not live model tests)
- **Not** auto-installing stack plugins (`detect-stack.mjs` recommends only)
- **Not** one web framework plugin per language—pick the framework plugin you use
