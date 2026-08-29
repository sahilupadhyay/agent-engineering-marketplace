# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- `git-workflow` commands `/pr-summary`, `/pr-risk`, and `/check-actions` with
  eval cases for each (Milestone 2).
- `code-quality` plugin (default-on tier): scope discipline, readability, and
  refactor-when-needed rules with eval suite (Milestone 2, m2-code-quality).
- `config-change-review` skill and glob-scoped `070-config-change-trigger.mdc` with
  pairing and eval cases (Milestone 2, §24).
- `engineering-core` rule `060-human-escalation.mdc` with eval cases for banner,
  severity levels, and no-auto-proceed (Milestone 2, §23).
- Documentation pack: [docs/architecture.md](docs/architecture.md),
  [docs/philosophy.md](docs/philosophy.md), [docs/performance.md](docs/performance.md);
  README tagline, install matrix, and philosophy links (Milestone 2).
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
- First plugin: `engineering-core` with five always-on rules decomposed from core
  engineering discipline.
- Root `.cursor-plugin/marketplace.json` listing `engineering-core`.
- Deterministic eval harness (`evals/run.mjs`), `schemas/eval-case.schema.json`,
  and eval suites for `engineering-core` and `security-core`.
- `security-core` plugin (five always-on security rules) and marketplace entry.
- Security-core POSIX hooks (`protect-shell`, `protect-read`, `secret-scan`) with
  fixture tests in `tests/hooks.test.mjs`.
- `git-workflow` plugin (default-on tier): commit identity, branch/PR rules,
  review/pr/fix commands, and `resolve-review-feedback` skill.
- `scripts/link-local.sh` for local marketplace symlink testing.
- [docs/installation.md](docs/installation.md) with team import and public-flip checklist.
