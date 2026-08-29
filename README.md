# Agent Engineering Marketplace

Cursor **multi-plugin** marketplace for a small, high-signal engineering stack.
Machine-enforced quality: context budgets, duplicate detection, tested hooks,
and deterministic evals—not a large pile of rules.

## Status

**Milestone 1 complete** (pending public visibility flip). GitHub Actions runs
`validate`, `node --test`, `node evals/run.mjs`, shellcheck, and repo secret scan
on every pull request and on pushes to `main`.

Three plugins ship in `.cursor-plugin/marketplace.json`:

- `engineering-core` (Required tier)
- `security-core` (Required tier, with POSIX hooks)
- `git-workflow` (Default On tier)

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

- Plugins: `engineering-core`, `security-core`, `git-workflow`
- Root `.cursor-plugin/marketplace.json`
- Runtime: Node 20+, zero third-party runtime dependencies

Authoring rules and layout are in [docs/authoring.md](docs/authoring.md) and
[CONTRIBUTING.md](CONTRIBUTING.md).

## How to use today

Clone the repo, run validation locally, or use `./scripts/link-local.sh` for
Cursor smoke testing. Team-marketplace import by URL works after the public flip.

## Links

- [Installation](docs/installation.md)
- [Eval harness](docs/evals.md)
- [Authoring contract](docs/authoring.md)
- [Recommended tiers](docs/tiers.md)
- [Contributing](CONTRIBUTING.md)
- [Security](SECURITY.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [License](LICENSE)
- [Changelog](CHANGELOG.md)
