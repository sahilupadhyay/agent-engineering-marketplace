---
name: aws-review
description: Use when reviewing AWS resource changes, CLI commands, service configuration, or account-level impact.
---

# AWS review

## Scope

Applies when editing Terraform, CloudFormation, CDK, AWS CLI scripts, or files
under infrastructure paths that provision or mutate AWS resources.

## Workflow

1. **Identify resources** — list services, regions, and environments touched.
2. **Classify risk** — read-only vs mutating vs destructive; prod vs non-prod.
3. **Check conventions** — naming, tags, encryption, logging, and modules match the repo.
4. **Verify dependencies** — VPCs, IAM roles, KMS keys, and state backends resolve.
5. **Recommend safer alternatives** — prefer change sets, targeted applies, and rollbacks.
6. **Report gaps** — cite what was inspected; escalate when prod impact is unclear.

Confirm with the user before destructive or production-impacting AWS operations.
