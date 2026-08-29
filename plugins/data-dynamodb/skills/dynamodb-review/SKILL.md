---
name: dynamodb-review
description: Use when changing DynamoDB tables, keys, GSIs, or application query patterns.
---

# DynamoDB review

## Scope

Table JSON/IaC whose names include dynamodb, plus application access code the
user points at. IAM and AWS account rules stay in `cloud-aws`.

## Workflow

1. **List access patterns** — partition key, sort key, and filters.
2. **Check GSIs** — projection, key overlap, and write amplification.
3. **Reject Scan** — unless a documented admin/offline job already uses it.
4. **Capacity** — on-demand vs provisioned; autoscaling if present.
5. **Summarize** — key design, hot partitions, and required IAM.

Do not recommend a relational redesign in-task unless asked.
