# Release policy

This monorepo ships multiple Cursor plugins from one marketplace manifest.
Versioning follows [Semantic Versioning 2.0.0](https://semver.org/) with a
**stable channel only** until `v1.0.0`.

## Version fields

| Location | Purpose |
| --- | --- |
| `.cursor-plugin/marketplace.json` → `metadata.version` | Marketplace bundle version |
| Each plugin entry → `version` | Per-plugin semver in the catalog |
| `plugins/*/.cursor-plugin/plugin.json` → `version` | Cursor plugin manifest semver |
| Git tag `vX.Y.Z` | Monorepo release anchor |

Keep marketplace, plugin manifest, and tag versions aligned when cutting a
release. Patch bumps may change one plugin only; still tag the monorepo.

## CHANGELOG

[CHANGELOG.md](../CHANGELOG.md) uses [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

1. Accumulate changes under `## [Unreleased]`.
2. Before tagging, rename `## [Unreleased]` to `## [X.Y.Z]` with date.
3. Add a fresh empty `## [Unreleased]` section at the top.

Release notes for tag `vX.Y.Z` are extracted by `scripts/release-notes.mjs` from
the matching `## [X.Y.Z]` section.

## Cutting a stable release

Prerequisites: `main` green, CHANGELOG section ready, versions bumped in
manifests.

```bash
git checkout main && git pull --ff-only origin main
# edit CHANGELOG + marketplace.json + plugin.json versions
node scripts/validate.mjs && node --test && node evals/run.mjs
git commit -am "chore: release v0.2.0"
git tag -a v0.2.0 -m "v0.2.0"
git push origin main && git push origin v0.2.0
```

Pushing `v*.*.*` triggers [`.github/workflows/release.yml`](../.github/workflows/release.yml),
which creates a GitHub Release with notes from CHANGELOG.

## Release channels

Until **v1.0.0**, only the **stable** channel is published (tags on `main`).
Beta or experimental channels are deferred; document future split in
CONTRIBUTING when v1.0 criteria are met (see Milestone 4 plan).

## GitHub labels

Canonical label definitions live in [`.github/labels.json`](../.github/labels.json).
Repository admins sync them after clone or label changes:

```bash
node scripts/sync-github-labels.mjs
```

Requires [GitHub CLI](https://cli.github.com/) authenticated with label admin
access.
