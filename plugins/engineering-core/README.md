# engineering-core

Required always-on engineering discipline: task intake, evidence, minimal change,
verification pointer, context efficiency, and human escalation.

## Recommended tier

Set **Required** in Dashboard → Plugins.

## Skill

`config-change-review` — Use when changing CI/CD, Docker, Terraform, Kubernetes,
Helm, env files, or dependency manifests. Includes intake step before editing.

## Rules

See `rules/` for always-on guidance. Verification ladder detail lives in **testing**.

## Context budget

Combined always-applied rule bodies must stay within **4096** UTF-8 bytes.

## Eval suite

Deterministic cases live in `evals/suites/engineering-core/` in the marketplace repo.
