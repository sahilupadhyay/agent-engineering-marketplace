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

## What you get

Forty plugins install independently from
[`.cursor-plugin/marketplace.json`](.cursor-plugin/marketplace.json). Each plugin
has one concern: rules (always-on or glob-scoped), optional skills (lazy-loaded),
optional hooks (pre-execution confirmations), and optional commands.

| Tier | Plugins | Behavior |
| --- | --- | --- |
| **Required** | `engineering-core`, `security-core` | Always-on rules for every session; security hooks on shell/git reads |
| **Default On** | `git-workflow`, `code-quality`, `testing`, `session-closeout` | Small always-on rules; verification ladder and Agent-mode closeout |
| **Default Off** | Stack, data, cloud, integration plugins | Glob-scoped rules and/or skills; enable only what matches your repo |

Recommended dashboard mapping: [docs/tiers.md](docs/tiers.md). Cursor team settings
use Required / Default On / Default Off; this repo documents recommended tiers in
each plugin's `plugin-meta.json`.

**Plugin catalog and responsibilities:** [docs/plugin-roles.md](docs/plugin-roles.md).

## Installation

**Team marketplace:** add the Git URL in Cursor **Settings → Plugins → Team
Marketplaces**, then map tiers per [docs/installation.md](docs/installation.md).

**Local development:**

```bash
./scripts/link-local.sh   # symlinks into ~/.cursor/plugins/local/
```

**Stack detection (recommend only, never auto-install):**

```bash
node scripts/detect-stack.mjs --root . --pretty
```

Enable optional stack plugins that match your repository. For SQL, enable **one**
of `data-postgres` or `data-mysql` when dialect-specific guidance is needed.
Integration plugins (`jira-workflow`, `obs-coralogix`, …) are **skills-only**;
connect MCP servers in Cursor settings ([docs/mcp-governance.md](docs/mcp-governance.md)).

## Validation

After clone (Node 20+):

```bash
node scripts/validate.mjs && node evals/run.mjs && node --test && node scripts/secret-scan-repo.mjs && node benchmarks/run.mjs
```

CI runs the same checks on every pull request. See [docs/evals.md](docs/evals.md),
[docs/benchmarks.md](docs/benchmarks.md), and [CONTRIBUTING.md](CONTRIBUTING.md).

## Why plugins, not a flat skill tree

Plugins install independently so a stack loads only what it needs. Always-on rules
stay within byte budgets ([docs/tiers.md](docs/tiers.md)); detailed playbooks live
in skills that load on demand.

## Links

- [Plugin roles](docs/plugin-roles.md)
- [Architecture](docs/architecture.md)
- [Philosophy](docs/philosophy.md)
- [Performance and efficiency](docs/performance.md)
- [Installation](docs/installation.md)
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
