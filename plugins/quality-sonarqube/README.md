# quality-sonarqube

Default-off glob-scoped rules and a triage skill for SonarQube project config and PR quality gates. **No bundled `mcp.json`.**

## Recommended tier

Set **Default Off** in Dashboard → Plugins. Enable when the repository uses SonarQube or `sonar-project.properties`.

## Rule

`010-sonar-quality-gate.mdc` — glob-scoped rule (no `alwaysApply`).
## Skill

`sonar-issue-triage` — Use when a quality gate failed on a PR.
## Context budget

Default-off tier allows **zero** always-applied rule bytes. This plugin ships no
`alwaysApply: true` rules.

## Eval suite

Deterministic cases live in `evals/suites/quality-sonarqube/` in the marketplace repo.
