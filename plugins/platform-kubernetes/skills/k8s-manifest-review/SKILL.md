---
name: k8s-manifest-review
description: Use when changing Deployments, NetworkPolicies, Helm values, or Kustomize overlays.
---

# Kubernetes manifest review

## Review
1. **Resources** — requests/limits; no privileged unless existing.
2. **Probes** — liveness/readiness defined.
3. **Secrets** — mounts vs env; no plaintext in manifests.
4. **Prod apply** — confirm context before kubectl/helm to production.
5. **Report** — link **platform-kubernetes** hook for destructive CLI.
