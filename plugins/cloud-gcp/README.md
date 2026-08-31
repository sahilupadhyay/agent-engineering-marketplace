# cloud-gcp

Default-off glob-scoped rules and a review skill. Glob-scoped GCP guidance for projects, IAM, and Terraform google provider files.

## Recommended tier

Set **Default Off** in Dashboard → Plugins. Enable when this stack matches your repository.

## Rule

`010-gcp-safety.mdc` — glob-scoped rule (no `alwaysApply`).

## Skill

`gcp-review` — Use when reviewing GCP Terraform, Deployment Manager, or gcloud changes.

## Context budget

Default-off tier allows **zero** always-applied rule bytes.

## Eval suite

Deterministic cases live in `evals/suites/cloud-gcp/` in the marketplace repo.
