# cloud-azure

Default-off glob-scoped rules and a review skill. Glob-scoped Azure and Bicep guidance with an infrastructure review skill.

## Recommended tier

Set **Default Off** in Dashboard → Plugins. Enable when this stack matches your repository.

## Rule

`010-azure-safety.mdc` — glob-scoped rule (no `alwaysApply`).

## Skill

`azure-review` — Use when reviewing Azure Bicep, ARM, or az CLI changes.

## Context budget

Default-off tier allows **zero** always-applied rule bytes.

## Eval suite

Deterministic cases live in `evals/suites/cloud-azure/` in the marketplace repo.
