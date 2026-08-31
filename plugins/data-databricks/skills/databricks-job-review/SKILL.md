---
name: databricks-job-review
description: Use when changing Databricks jobs, notebooks, or workspace config.
---

# Databricks job review

## Review
1. **Scope** — job vs notebook vs cluster config.
2. **Secrets** — Databricks secrets scope; nothing in notebook plaintext.
3. **Cost** — cluster size and autoscale bounds.
4. **Idempotency** — safe reruns and backfill.
5. **Report** — verify job run commands.
