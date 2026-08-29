---
name: deployment-check
description: Use when validating deployments, rollouts, Helm releases, or post-deploy health after AWS or Kubernetes changes.
---

# Deployment check

## Scope

Applies after infrastructure apply, stack updates, ECS/EKS rollouts, Lambda
deployments, or Helm/Kubernetes releases.

## Workflow

1. **Confirm deploy target** — cluster, namespace, stack, region, and revision/tag.
2. **Run readiness checks** — use project commands (`kubectl get`, service health,
   smoke tests, synthetic monitors).
3. **Verify observability** — logs, metrics, and alarms show expected behavior.
4. **Check rollback path** — previous image/tag, stack version, or Helm revision.
5. **Report verification** — commands run, pass/fail, and unresolved risks.

Do not claim deployment success without evidence from checks the repository supports.
