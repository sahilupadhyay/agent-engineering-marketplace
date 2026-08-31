# api-http

Default-off glob-scoped rules and a review skill. REST and JSON HTTP API discipline complementing OpenAPI documentation review.

## Recommended tier

Set **Default Off** in Dashboard → Plugins. Enable when this stack matches your repository.

## Rule

`010-http-api-discipline.mdc` — glob-scoped rule (no `alwaysApply`).

## Skill

`http-api-review` — Use when designing or reviewing REST endpoints, handlers, or JSON contracts.

## Context budget

Default-off tier allows **zero** always-applied rule bytes.

## Eval suite

Deterministic cases live in `evals/suites/api-http/` in the marketplace repo.
