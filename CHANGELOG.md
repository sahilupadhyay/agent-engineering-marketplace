# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- Repository governance: community health files, editor hygiene, and GitHub
  issue/PR templates.
- Authoring contract: [docs/authoring.md](docs/authoring.md),
  [docs/tiers.md](docs/tiers.md), and JSON Schemas under [schemas/](schemas/).
- Structural validator: [scripts/validate.mjs](scripts/validate.mjs) with
  `node --test` fixtures under [tests/](tests/).
- Context budget enforcement keyed off `plugin-meta.json` tier and optional
  `contextBudget`.
- Shingle-similarity duplicate detection with `pairings` waivers for rule+skill
  overlap.
- GitHub Actions workflow (`validate`, tests, shellcheck, secret scan).
- `scripts/secret-scan-repo.mjs` for local and CI secret scanning.
