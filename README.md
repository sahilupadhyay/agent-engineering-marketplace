# Agent Engineering Marketplace

Cursor **multi-plugin** marketplace for a small, high-signal engineering stack.
The differentiator is a *planned* machine-enforced quality contract (context
budgets, single-responsibility skills, duplicate detection, tested hooks,
deterministic evals)—not a large pile of rules.

## Status

**Milestone 1 is in progress.** This repository ships a **local structural
validator** (`scripts/validate.mjs`) but no plugins, marketplace manifest, or
CI yet. It is **not installable** as a Cursor marketplace. After clone (Node
20+):

```bash
node scripts/validate.mjs && node --test
```

Context budgets, duplicate detection, and GitHub Actions arrive in later pull
requests.

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
