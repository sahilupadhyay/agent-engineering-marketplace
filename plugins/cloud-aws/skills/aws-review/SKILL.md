---
name: aws-review
description: Use when reviewing AWS resources, CLI commands, or service configuration.
---

# aws review

## Preconditions
User-connected AWS context. Optional AWS Knowledge MCP for docs — no bundled mcp.json.
Destructive CLI gated by **security-core** and **cloud-aws** hooks.

## Workflow
1. Confirm account and region.
2. Review least-privilege IAM, encryption, and public exposure.
3. Report blast radius..

## Report
Commands run, risks, and rollback plan.
