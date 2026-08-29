---
name: infrastructure-review
description: Use when reviewing Terraform, CloudFormation, CDK, or other infrastructure-as-code changes before apply.
---

# Infrastructure review

## Scope

Applies to `.tf`, `.tfvars`, CloudFormation templates, CDK stacks, and shared
infrastructure modules.

## Workflow

1. **Map the blast radius** — modules, workspaces, stacks, and environments affected.
2. **Run or inspect plan** — `terraform plan`, `cdk diff`, or change-set preview; do not guess.
3. **Review IAM and networking** — new roles, security groups, ingress, and cross-account trust.
4. **Check state and backends** — remote state keys, locks, and drift handling.
5. **Validate inputs** — variables, parameters, and secrets reference existing resources.
6. **Summarize findings** — blockers, warnings, and required pre-apply confirmations.

Do not recommend `apply` or `deploy` until plan output has been reviewed.
