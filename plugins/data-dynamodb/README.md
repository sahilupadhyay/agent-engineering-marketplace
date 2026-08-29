# data-dynamodb

Default-off glob-scoped rules and a review skill for DynamoDB table definitions. Globs are name-scoped to avoid matching all Terraform.

## Recommended tier

Set **Default Off** in Dashboard → Plugins. Enable when the repository defines DynamoDB tables or access patterns.

## Rule

`010-dynamodb-access.mdc` — glob-scoped rule (no `alwaysApply`). Globs: `*dynamodb*` and `tables*.json`.
## Skill

`dynamodb-review` — Use when changing DynamoDB keys, GSIs, or query patterns.
## Context budget

Default-off tier allows **zero** always-applied rule bytes. This plugin ships no
`alwaysApply: true` rules.

## Eval suite

Deterministic cases live in `evals/suites/data-dynamodb/` in the marketplace repo.
