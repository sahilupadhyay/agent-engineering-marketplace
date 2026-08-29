# Agent Engineering Marketplace

Cursor **multi-plugin** marketplace for a small, high-signal engineering stack.
The differentiator is a *planned* machine-enforced quality contract (context
budgets, single-responsibility skills, duplicate detection, tested hooks,
deterministic evals)—not a large pile of rules.

## Status

**Milestone 1 is in progress.** This repository does not yet ship plugins, a
marketplace manifest, a validator, or CI. It is **not installable**. There is
nothing to `git clone && node …` until those files exist.

## Why plugins, not a flat skill tree

Plugins install independently so a stack loads only what it needs.

Cursor **Required**, **Default On**, and **Default Off** are team-dashboard
settings. This repository cannot ship those fields. See the
[Cursor plugins reference](https://cursor.com/docs/reference/plugins).
Recommended tiers will appear later as metadata (`plugin-meta.json`), not as
enforced Cursor settings.

## Milestone 1 destination (not in this tree)

Coming in later pull requests, not present today:

- Plugins: `engineering-core`, `security-core`, `git-workflow`
- Runtime: Node 20+, zero third-party runtime dependencies

Planned layout is described in [CONTRIBUTING.md](CONTRIBUTING.md). Do not treat
that as a checked-in directory listing.

## How to use today

Clone the repo and read the contributing docs. Team-marketplace import and
publishing at [cursor.com/marketplace/publish](https://cursor.com/marketplace/publish)
come after Milestone 1.

## Links

- [Contributing](CONTRIBUTING.md)
- [Security](SECURITY.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [License](LICENSE)
- [Changelog](CHANGELOG.md)
