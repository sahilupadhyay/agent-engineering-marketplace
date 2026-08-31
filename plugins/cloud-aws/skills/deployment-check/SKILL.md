---
name: deployment-check
description: Use when validating a deployment or rollout on AWS.
---

# deployment check

## Preconditions
User-connected AWS context. Optional AWS Knowledge MCP for docs — no bundled mcp.json.
Destructive CLI gated by **security-core** and **cloud-aws** hooks.

## Workflow
1. Run health checks the project defines.
2. Verify rollback path.
3. Report evidence collected..

## Report
Commands run, risks, and rollback plan.
