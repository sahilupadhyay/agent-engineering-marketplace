---
name: aws-cost-review
description: Use when changing instance classes, NAT gateways, or idle AWS resources that affect infrastructure spend.
---

# AWS cost review

## Scope

Instance types, NAT gateways, idle load balancers, unattached EBS, and
always-on non-prod stacks. This is **not** model-selection guidance; do not
use it in place of `cost-efficiency`.

## Workflow

1. **Name the resources** — instance class, NAT, or idle service in the diff.
2. **Compare to existing** — same family already used in the env, or a silent upsize.
3. **NAT and data transfer** — extra NAT or cross-AZ traffic the chart does not need.
4. **Idle** — unused IPs, empty clusters, or forgotten non-prod that runs 24/7.
5. **Report** — cheaper equivalent that matches existing modules, or confirm the cost is intended.

Do not recommend deleting production capacity without user confirmation.
