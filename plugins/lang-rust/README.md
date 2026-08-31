# lang-rust

Default-off glob-scoped rules and a review skill. Glob-scoped Rust guidance for errors, unsafe, and Cargo layout.

## Recommended tier

Set **Default Off** in Dashboard → Plugins. Enable when this stack matches your repository.

## Rule

`010-rust-service-discipline.mdc` — glob-scoped rule (no `alwaysApply`).

## Skill

`rust-review` — Use when changing Rust crates, async services, or Cargo dependencies.

## Context budget

Default-off tier allows **zero** always-applied rule bytes.

## Eval suite

Deterministic cases live in `evals/suites/lang-rust/` in the marketplace repo.
