---
name: postgres-review
description: Use when changing PostgreSQL schema, reviewing queries, or adding migrations.
---

# Postgres review

## Scope

SQL files, `migrations/`, and Postgres-specific DDL. Cross-check backend
code for parameterized queries; do not contradict `backend-python` or
`backend-java`.

## Workflow

1. **Name the change** — table, index, or query the user asked to modify.
2. **Check locking** — long `ALTER` on large tables; prefer concurrent indexes if the repo uses them.
3. **Check data loss** — drops, type changes, and NOT NULL without backfill.
4. **Check roles** — grants stay least-privilege; no superuser for the app.
5. **Summarize** — migration order, rollback, and queries to re-run.

Enable this plugin instead of `data-mysql` when the dialect is Postgres.
