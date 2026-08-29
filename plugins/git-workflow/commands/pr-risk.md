---
name: pr-risk
description: Assess pull-request risk from the current diff; report severity-ranked rollout concerns without modifying files.
---

# PR risk

Assess risk for the current branch diff. Do not modify files.

Check:

1. Production blast radius
2. Data loss or migration risk
3. Auth, authorization, and secrets exposure
4. Backward compatibility and API breaks
5. Rollback difficulty
6. Missing tests or observability
7. Dependency and supply-chain changes
8. Performance and capacity impact

Report only actionable risks.

Severity:

P0 Critical — block merge without mitigation
P1 High — needs explicit plan before merge
P2 Medium — acceptable with documented follow-up
P3 Low — informational
