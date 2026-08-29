---
name: mysql-review
description: Use when changing MySQL schema, reviewing queries, or adding MySQL migrations.
---

# MySQL review

## Scope

Files under `mysql/` and `*mysql*.sql`. Enable this plugin instead of
`data-postgres` when the dialect is MySQL.

## Workflow

1. **Identify objects** — tables, indexes, and procedures touched.
2. **Check charset/collation** — utf8mb4 unless the repo standard differs.
3. **Check locks** — `LOCK TABLES` only when already required.
4. **Check online DDL** — ALGORITHM/LOCK clauses if the project uses them.
5. **Report** — migration risk, rollback, and query plan concerns.

Keep parameterized queries in the backend plugin; this skill reviews SQL shape.
