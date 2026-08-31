# platform-terraform

Default-off glob-scoped rules and a review skill. Vendor-neutral Terraform safety for plan-before-apply and state discipline.

## Recommended tier

Set **Default Off** in Dashboard → Plugins. Enable when this stack matches your repository.

## Rule

`010-terraform-safety.mdc` — glob-scoped rule (no `alwaysApply`).

## Skill

`terraform-review` — Use when reviewing Terraform modules, variables, or backend config.

## Context budget

Default-off tier allows **zero** always-applied rule bytes.

## Eval suite

Deterministic cases live in `evals/suites/platform-terraform/` in the marketplace repo.
