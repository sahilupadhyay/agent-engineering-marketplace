# data-mysql

Default-off glob-scoped rules and a review skill for MySQL SQL. Globs are narrowed so generic `.sql` trees are not claimed by default. Enable this plugin or `data-postgres`, not both.

## Recommended tier

Set **Default Off** in Dashboard → Plugins. Enable when the repository uses MySQL schemas under `mysql/` paths or `*mysql*.sql` files.

## Rule

`010-mysql-safety.mdc` — glob-scoped rule (no `alwaysApply`). Narrow globs: `mysql/` trees and `*mysql*.sql`.
## Skill

`mysql-review` — Use when changing MySQL schema, queries, or migrations.
## Overlap with `data-postgres`

Enable **one** SQL plugin per consumer repo. Parameterized queries still belong
in the matching backend plugin.
## Context budget

Default-off tier allows **zero** always-applied rule bytes. This plugin ships no
`alwaysApply: true` rules.

## Eval suite

Deterministic cases live in `evals/suites/data-mysql/` in the marketplace repo.
