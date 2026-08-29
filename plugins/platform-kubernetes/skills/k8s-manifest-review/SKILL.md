---
name: k8s-manifest-review
description: Use when changing Deployments, NetworkPolicies, or Helm values.
---

# Kubernetes manifest review

## Scope

Helm values, manifests under `k8s/` or `kubernetes/`, and Kustomize
overlays. Destructive CLI confirmation may already live in `cloud-aws`.

## Workflow

1. **Map workloads** — Deployment/StatefulSet, probes, and replicas.
2. **Check privilege** — no new privileged or hostNetwork unless existing.
3. **Check NetworkPolicy** — ingress/egress matches existing policy style.
4. **Check values** — image tags, resources, and secrets refs.
5. **Report** — apply target (context/cluster) and required confirmation.

Do not apply to production without the user naming the context.
