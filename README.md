# Agent Engineering Marketplace

Cursor **multi-plugin** marketplace for a small, high-signal engineering stack.
The differentiator is a *planned* machine-enforced quality contract (context
budgets, single-responsibility skills, duplicate detection, tested hooks,
deterministic evals)—not a large pile of rules.

## Status

**Milestone 1 is in progress.** GitHub Actions runs `validate`, `node --test`,
shellcheck (when hook scripts exist), and repo secret scan on every pull request
and on pushes to `main`. The validator enforces structural checks, context
budgets, and duplicate detection locally. This repository still has no production
plugins or marketplace manifest and is **not installable** as a Cursor marketplace.
After clone (Node 20+):

```bash
node scripts/validate.mjs && node --test && node scripts/secret-scan-repo.mjs
```

Deterministic eval harness CI arrives in PR 7.

## Why plugins, not a flat skill tree

Plugins install independently so a stack loads only what it needs.

Cursor **Required**, **Default On**, and **Default Off** are team-dashboard
settings. This repository cannot ship those fields. See the
[Cursor plugins reference](https://cursor.com/docs/reference/plugins).
Recommended tiers are documented in [docs/tiers.md](docs/tiers.md) as
`plugin-meta.json` metadata, not as enforced Cursor settings.

## Milestone 1 destination (not in this tree)

Coming in later pull requests, not present today:

- Plugins: `engineering-core`, `security-core`, `git-workflow`
- Runtime: Node 20+, zero third-party runtime dependencies

Authoring rules and planned layout are in [docs/authoring.md](docs/authoring.md)
and [CONTRIBUTING.md](CONTRIBUTING.md). Do not treat those as a checked-in
directory listing.

## How to use today

Clone the repo and read the contributing docs. Team-marketplace import and
publishing at [cursor.com/marketplace/publish](https://cursor.com/marketplace/publish)
come after Milestone 1.

## Links

- [Authoring contract](docs/authoring.md)
- [Recommended tiers](docs/tiers.md)
- [Contributing](CONTRIBUTING.md)
- [Security](SECURITY.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [License](LICENSE)
- [Changelog](CHANGELOG.md)
