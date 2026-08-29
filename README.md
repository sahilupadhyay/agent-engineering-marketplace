# Agent Engineering Marketplace

**A production-grade, cost-efficient developer agent toolkit for Cursor and
compatible AI coding agents.**

Cursor **multi-plugin** marketplace for a small, high-signal engineering stack.
Machine-enforced quality: context budgets, duplicate detection, tested hooks,
and deterministic evals—not a large pile of rules.

This project does **not** promise zero hallucinations. Evals and hooks reduce
risk; they cannot guarantee perfect agent behavior. See [docs/evals.md](docs/evals.md).

## Philosophy

Seven principles drive every plugin. Read [docs/philosophy.md](docs/philosophy.md).

## Status

**Milestone 1 complete** (pending public visibility flip). GitHub Actions runs
`validate`, `node --test`, `node evals/run.mjs`, `node benchmarks/run.mjs`,
shellcheck, and repo secret scan on every pull request and on pushes to `main`.

Thirty-one plugins ship in `.cursor-plugin/marketplace.json`:

| Plugin | Recommended tier | Status |
| --- | --- | --- |
| `engineering-core` | Required | Shipped |
| `security-core` | Required | Shipped |
| `git-workflow` | Default On | Shipped |
| `code-quality` | Default On | Shipped |
| `testing` | Default On | Shipped |
| `session-closeout` | Default On | Shipped |
| `cost-efficiency` | Default Off | Shipped |
| `backend-node` | Default Off | Shipped |
| `backend-python` | Default Off | Shipped |
| `backend-java` | Default Off | Shipped |
| `backend-go` | Default Off | Shipped |
| `frontend-react` | Default Off | Shipped |
| `frontend-htmlcss` | Default Off | Shipped |
| `frontend-javascript` | Default Off | Shipped |
| `frontend-angular` | Default Off | Shipped |
| `frontend-vue` | Default Off | Shipped |
| `data-postgres` | Default Off | Shipped |
| `data-mysql` | Default Off | Shipped |
| `data-dynamodb` | Default Off | Shipped |
| `data-redis` | Default Off | Shipped |
| `data-databricks` | Default Off | Shipped |
| `jira-workflow` | Default Off | Shipped (skills-only) |
| `atlassian-confluence` | Default Off | Shipped (skills-only) |
| `diagram-workflow` | Default Off | Shipped (skills-only) |
| `api-docs` | Default Off | Shipped (skills-only) |
| `obs-coralogix` | Default Off | Shipped (skills-only) |
| `obs-heap` | Default Off | Shipped (skills-only) |
| `quality-sonarqube` | Default Off | Shipped |
| `cloud-aws` | Default Off | Shipped |
| `platform-docker` | Default Off | Shipped |
| `platform-kubernetes` | Default Off | Shipped |

**Recommended installation today:** Engineering Core, Security Core, Git Workflow,
Code Quality, Testing, Session Closeout.

**Optional stack plugins:** Enable backend, frontend, data, or platform plugins
that match the repository (see `scripts/detect-stack.mjs`). Detection
**recommends only** and never auto-installs. Enable one of `data-postgres` or
`data-mysql` when SQL files could match either dialect.

**Optional integration plugins (skills-only, no bundled MCP):** Enable
`jira-workflow`, `atlassian-confluence`, `diagram-workflow`, `api-docs`,
`obs-coralogix`, or `obs-heap` when you use those products. Connect MCP servers
in Cursor settings; see [docs/mcp-governance.md](docs/mcp-governance.md).

**Optional cloud and containers:** Enable `cloud-aws` for AWS IaC, `platform-docker`
for Dockerfiles, and `platform-kubernetes` for Helm/`k8s` trees.

The repository remains **private** until a maintainer runs the pre-public
checklist in [docs/installation.md](docs/installation.md) and flips visibility in
GitHub settings.

After clone (Node 20+):

```bash
node scripts/validate.mjs && node evals/run.mjs && node --test && node scripts/secret-scan-repo.mjs && node benchmarks/run.mjs
./scripts/link-local.sh   # optional local smoke test
```

See [docs/evals.md](docs/evals.md), [docs/benchmarks.md](docs/benchmarks.md),
and [docs/installation.md](docs/installation.md).

## Benchmark targets (no scores)

Qualitative targets live in [docs/benchmarks.md](docs/benchmarks.md). CI runs
`node benchmarks/run.mjs` (metadata only). There are **no published pass rates**.

## Why plugins, not a flat skill tree

Plugins install independently so a stack loads only what it needs.

Cursor **Required**, **Default On**, and **Default Off** are team-dashboard
settings. This repository cannot ship those fields. See the
[Cursor plugins reference](https://cursor.com/docs/reference/plugins).
Recommended tiers are documented in [docs/tiers.md](docs/tiers.md) as
`plugin-meta.json` metadata, not as enforced Cursor settings.

## Milestone 1 stack

- Plugins: `engineering-core`, `security-core`, `git-workflow`, `code-quality`
- Root `.cursor-plugin/marketplace.json`
- Runtime: Node 20+, zero third-party runtime dependencies

Authoring rules and layout are in [docs/authoring.md](docs/authoring.md) and
[CONTRIBUTING.md](CONTRIBUTING.md).

## How to use today

Clone the repo, run validation locally, or use `./scripts/link-local.sh` for
Cursor smoke testing. Team-marketplace import by URL works after the public flip.

## Links

- [Architecture](docs/architecture.md)
- [Philosophy](docs/philosophy.md)
- [Performance and efficiency](docs/performance.md)
- [Installation](docs/installation.md)
- [Catalog expansion roadmap](docs/roadmap/README.md)
- [Eval harness](docs/evals.md)
- [Behavioral benchmarks](docs/benchmarks.md)
- [Marketplace submission](docs/marketplace-submit.md)
- [Authoring contract](docs/authoring.md)
- [MCP governance](docs/mcp-governance.md)
- [Release policy](docs/release.md)
- [Recommended tiers](docs/tiers.md)
- [Contributing](CONTRIBUTING.md)
- [Security](SECURITY.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [License](LICENSE)
- [Changelog](CHANGELOG.md)
