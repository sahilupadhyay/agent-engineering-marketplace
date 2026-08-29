# Agent Engineering Marketplace

Cursor **multi-plugin** marketplace for a small, high-signal engineering stack.
The differentiator is a *planned* machine-enforced quality contract (context
budgets, single-responsibility skills, duplicate detection, tested hooks,
deterministic evals)—not a large pile of rules.

## Status

**Milestone 1 is in progress.** GitHub Actions runs `validate`, `node --test`,
shellcheck (when hook scripts exist), and repo secret scan on every pull request
and on pushes to `main`. The first plugin **`engineering-core`** ships with five
always-on rules and a root marketplace manifest. The repository is still
**private** and **not** published to the Cursor Marketplace. Deterministic eval
Deterministic eval suite ships in PR 7 (`evals/run.mjs`). After clone (Node 20+):

```bash
node scripts/validate.mjs && node evals/run.mjs && node --test && node scripts/secret-scan-repo.mjs

See [docs/evals.md](docs/evals.md) for semantic eval cases.

Coming in later pull requests: `security-core` (PR 8), `git-workflow` (PR 10).

## Why plugins, not a flat skill tree

Plugins install independently so a stack loads only what it needs.

Cursor **Required**, **Default On**, and **Default Off** are team-dashboard
settings. This repository cannot ship those fields. See the
[Cursor plugins reference](https://cursor.com/docs/reference/plugins).
Recommended tiers are documented in [docs/tiers.md](docs/tiers.md) as
`plugin-meta.json` metadata, not as enforced Cursor settings.

## Milestone 1 destination (partial)

Present today:

- Plugin: `engineering-core` (five always-on rules)
- Root `.cursor-plugin/marketplace.json`
- Runtime: Node 20+, zero third-party runtime dependencies

Still coming:

- Plugins: `security-core`, `git-workflow`
- Deterministic eval harness (PR 7)

Authoring rules and planned layout are in [docs/authoring.md](docs/authoring.md)
and [CONTRIBUTING.md](CONTRIBUTING.md). Do not treat those as a checked-in
directory listing.

## How to use today

Clone the repo and read the contributing docs. Team-marketplace import and
publishing at [cursor.com/marketplace/publish](https://cursor.com/marketplace/publish)
come after Milestone 1.

## Links

- [Eval harness](docs/evals.md)
- [Authoring contract](docs/authoring.md)
- [Recommended tiers](docs/tiers.md)
- [Contributing](CONTRIBUTING.md)
- [Security](SECURITY.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [License](LICENSE)
- [Changelog](CHANGELOG.md)
