---
name: postgres-review
description: Use when changing PostgreSQL schema, reviewing queries, or adding migrations.
---

# Postgres review

## Scope
Postgres-flavored paths only. Enable **one** of postgres/mysql plugins.

## Workflow
1. **Name the change** — table, index, or query.
2. **Locking** — concurrent indexes where repo uses them; long ALTER risk.
3. **Data loss** — drops, type changes, NOT NULL backfill.
4. **RLS** — row-level security if the repo uses it.
5. **Roles** — least privilege; no superuser for app.
6. **Summarize** — migration order, rollback, verify queries.
