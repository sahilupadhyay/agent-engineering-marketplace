# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- Capability-only consumer docs: rewritten [README.md](README.md),
  [docs/plugin-roles.md](docs/plugin-roles.md), and maintainer [PLAN.md](PLAN.md);
  status language removed from [docs/architecture.md](docs/architecture.md) and
  [docs/roadmap/README.md](docs/roadmap/README.md).
- Catalog expansion: default-off stack plugins `frontend-htmlcss`,
  `frontend-javascript`, `frontend-angular`, `frontend-vue`, `backend-java`,
  `backend-go`, `data-postgres`, `data-mysql`, `data-dynamodb`, `data-redis`,
  `data-databricks`, `obs-coralogix`, `obs-heap`, `atlassian-confluence`,
  `quality-sonarqube`, `platform-docker`, and `platform-kubernetes`, each with
  README and eval suite (tier, dead paths, content regex).
- `cloud-aws` networking rule (`040-aws-networking.mdc`), `aws-cost-review`
  skill, and additional destructive AWS command families in
  `dangerous-aws-command.sh`.
- `scripts/detect-stack.mjs` recommendations for Vue, Angular, Go, Java,
  Dockerfile, Helm/k8s, and `databricks.yml` (recommend only, never auto-install).
- `session-closeout` plugin (default-on): Agent-mode closeout table for skills,
  confidence, quality, security, and performance (self-assessed, not measured).
- Catalog expansion roadmap under [docs/roadmap/](docs/roadmap/README.md)
  (frontend, backend, data, observability, platform plugins as default-off).
- Behavioral benchmark harness (`benchmarks/run.mjs`): scenario fixtures and
  metadata validation in CI; `--model` is opt-in and unwired so scores cannot
  be fabricated (Milestone 4, §20–21). See [docs/benchmarks.md](docs/benchmarks.md).
- Marketplace submission checklist ([docs/marketplace-submit.md](docs/marketplace-submit.md));
  listing remains blocked until the repository is public (Milestone 4, §36).
- Integration plugins `jira-workflow`, `diagram-workflow`, and `api-docs` (default-off
  tier, skills-only, no bundled `mcp.json`, eval suites) (Milestone 3, §11).
- `cloud-aws` plugin (default-off tier, glob-scoped rules, deployment skills,
  destructive AWS/kubectl/helm hook, eval suite) (Milestone 3, §16).
- Stack plugins `backend-node`, `backend-python`, and `frontend-react` (default-off
  tier, glob-scoped rules, eval suites) (Milestone 3, §18).
- Stack detection script (`scripts/detect-stack.mjs`) recommending optional plugins
  from manifest files; documented in [docs/installation.md](docs/installation.md)
  (Milestone 3, §17).
- GitHub issue label set (`.github/labels.json`) and `scripts/sync-github-labels.mjs`
  (Milestone 2, §29).
- Release policy ([docs/release.md](docs/release.md)), `scripts/release-notes.mjs`, and
  tag-triggered `.github/workflows/release.yml` (Milestone 2, §30–31).
- MCP governance policy ([docs/mcp-governance.md](docs/mcp-governance.md)) and
  CONTRIBUTING checklist for future `mcp.json` plugins (Milestone 2, §32).
- Validator README gate: marketplace-listed plugins must ship `README.md`
  (`scripts/lib/doccheck.mjs`, fixture `fail-missing-readme`).
- `testing` plugin (default-on tier): when-to-test, test proportionality, and
  verification ladder rules with eval suite (Milestone 2, §4, §9).
- `cost-efficiency` plugin (default-off tier): min-capable-model rule, task-triage
  skill, and eval suite (Milestone 2, §10).
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
