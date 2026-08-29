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
`validate`, `node --test`, `node evals/run.mjs`, shellcheck, and repo secret scan
on every pull request and on pushes to `main`.

Five plugins ship in `.cursor-plugin/marketplace.json`:

| Plugin | Recommended tier | Status |
| --- | --- | --- |
| `engineering-core` | Required | Shipped |
| `security-core` | Required | Shipped |
| `git-workflow` | Default On | Shipped |
| `code-quality` | Default On | Shipped |
| `testing` | Default On | Shipped |
| `cost-efficiency` | Default Off | Shipped |
| Stack / cloud plugins | Default Off | Milestone 3+ |

**Recommended installation today:** Engineering Core, Security Core, Git Workflow,
Code Quality, Testing.

**Optional (coming):** AWS, Docker,
Kubernetes, Python, React, Terraform, and other stack plugins.

The repository remains **private** until a maintainer runs the pre-public
checklist in [docs/installation.md](docs/installation.md) and flips visibility in
GitHub settings.

After clone (Node 20+):

```bash
node scripts/validate.mjs && node evals/run.mjs && node --test && node scripts/secret-scan-repo.mjs
./scripts/link-local.sh   # optional local smoke test
```

See [docs/evals.md](docs/evals.md) and [docs/installation.md](docs/installation.md).

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
- [Eval harness](docs/evals.md)
- [Authoring contract](docs/authoring.md)
- [Recommended tiers](docs/tiers.md)
- [Contributing](CONTRIBUTING.md)
- [Security](SECURITY.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [License](LICENSE)
- [Changelog](CHANGELOG.md)
