# backend-go

Default-off glob-scoped rules for Go services and modules.

## Recommended tier

Set **Default Off** in Dashboard → Plugins. Enable when the repository has `.go` files or `go.mod`.

## Rule

`010-go-service-discipline.mdc` — glob-scoped rule (no `alwaysApply`). Applies to `.go` files and `go.mod`.
## Context budget

Default-off tier allows **zero** always-applied rule bytes. This plugin ships no
`alwaysApply: true` rules.

## Eval suite

Deterministic cases live in `evals/suites/backend-go/` in the marketplace repo.
