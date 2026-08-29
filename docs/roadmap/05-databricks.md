# Workstream 05 — Databricks

**Tier:** `default-off`.

Do not copy handbook `481-databricks.mdc`. Author a short glob rule + skill.

## `data-databricks`

- Globs: `["**/*.py", "**/*.sql", "**/databricks.yml", "**/*.ipynb"]` is too broad. Prefer `["**/databricks.yml", "**/*.ipynb", "**/notebooks/**"]` plus `["**/*dlt*"]` if needed.
- Rule `010-databricks-safety.mdc`: Unity Catalog / workspace match the repo; no `SELECT *` in production jobs without limit; don't commit tokens; cluster policy honesty.
- Skill `databricks-job-review`: Use when changing jobs, DLT, or notebooks.

## MCP

Skills-only. Databricks MCP if the user connected it.

## Parallel safety

Single plugin. Coordinator: marketplace + detect-stack (`databricks.yml`, `databricks.yml`).
