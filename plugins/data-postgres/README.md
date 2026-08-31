# data-postgres

Default-off glob-scoped rules and a review skill for PostgreSQL SQL and migrations. Enable this plugin or `data-mysql`, not both, when generic `.sql` files could match either dialect.

## Recommended tier

Set **Default Off** in Dashboard → Plugins. Enable when the repository uses PostgreSQL schemas or migrations.

## Rule

`010-postgres-safety.mdc` — glob-scoped rule (no `alwaysApply`). Applies to `.pgsql`, `postgres/` trees, and `*postgres*.sql` (not generic `.sql`).
## Skill

`postgres-review` — Use when changing Postgres schema, queries, or migrations.
## Overlap with `data-mysql`

Generic `**/*.sql` can match both dialects. Enable **one** SQL plugin per
consumer repo. Parameterized queries still belong in the backend plugin
(`backend-python`, `backend-java`, `backend-node`); this plugin does not
replace those rules.
## Context budget

Default-off tier allows **zero** always-applied rule bytes. This plugin ships no
`alwaysApply: true` rules.

## Eval suite

Deterministic cases live in `evals/suites/data-postgres/` in the marketplace repo.
