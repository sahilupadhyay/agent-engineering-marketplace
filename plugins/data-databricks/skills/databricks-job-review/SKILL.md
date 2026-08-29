---
name: databricks-job-review
description: Use when changing Databricks jobs, DLT pipelines, or notebooks.
---

# Databricks job review

## Preconditions

If the user connected a Databricks MCP, use those tools. This plugin does not
ship `mcp.json`. Otherwise review `databricks.yml`, notebooks, and DLT files
in the workspace.

## Workflow

1. **Map the job** — cluster, schedule, catalogs, and outputs.
2. **Check Unity Catalog** — grants and volume paths match existing jobs.
3. **Check SQL** — no unbounded `SELECT *` on large tables.
4. **Check secrets** — no tokens in notebooks or bundle YAML.
5. **Summarize** — blast radius, cluster policy, and required approvals.

Do not start clusters or run jobs against production without confirmation.
