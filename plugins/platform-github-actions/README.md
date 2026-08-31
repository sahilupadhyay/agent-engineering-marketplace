# platform-github-actions

Default-off glob-scoped rules and a review skill. Glob-scoped GitHub Actions workflow safety and review skill.

## Recommended tier

Set **Default Off** in Dashboard → Plugins. Enable when this stack matches your repository.

## Rule

`010-gha-workflow-safety.mdc` — glob-scoped rule (no `alwaysApply`).

## Skill

`gha-workflow-review` — Use when adding or changing GitHub Actions workflows or reusable workflows.

## Context budget

Default-off tier allows **zero** always-applied rule bytes.

## Eval suite

Deterministic cases live in `evals/suites/platform-github-actions/` in the marketplace repo.
