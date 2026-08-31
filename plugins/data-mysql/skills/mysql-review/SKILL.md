---
name: mysql-review
description: Use when changing MySQL schema, reviewing queries, or adding migrations.
---

# MySQL review

## Workflow
1. **Charset/collation** — utf8mb4 consistent.
2. **Online DDL** — prefer when repo supports; note lock impact.
3. **Rollback** — document reverse migration when feasible.
4. **Indexes** — match query filters; avoid redundant indexes.
5. **Summarize** — deployment order and verify queries.
