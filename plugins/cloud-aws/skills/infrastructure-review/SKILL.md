---
name: infrastructure-review
description: Use when reviewing Terraform, CloudFormation, or CDK before apply.
---

# infrastructure review

## Preconditions
User-connected AWS context. Optional AWS Knowledge MCP for docs — no bundled mcp.json.
Destructive CLI gated by **security-core** and **cloud-aws** hooks.

## Workflow
1. Discover: read `terraform plan`, `cdk diff`, or CloudFormation **change-set** output.
2. Review destroy flags, IAM, networking.
3. Require plan-before-apply — never apply without a reviewed plan or diff.
4. Report irreversible changes..

## Report
Commands run, risks, and rollback plan.
