# data-databricks

Default-off glob-scoped rules and a review skill for Databricks asset bundles, notebooks, and DLT-named files. **No bundled `mcp.json`.**

## Recommended tier

Set **Default Off** in Dashboard → Plugins. Enable when the repository uses Databricks jobs, notebooks, or `databricks.yml`.

## Rule

`010-databricks-safety.mdc` — glob-scoped rule (no `alwaysApply`). Tight globs, not all `*.py`.
## Skill

`databricks-job-review` — Use when changing jobs, DLT, or notebooks.
## Context budget

Default-off tier allows **zero** always-applied rule bytes. This plugin ships no
`alwaysApply: true` rules.

## Eval suite

Deterministic cases live in `evals/suites/data-databricks/` in the marketplace repo.
