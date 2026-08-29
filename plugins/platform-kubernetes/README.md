# platform-kubernetes

Default-off glob-scoped rules and a review skill for Helm, k8s/, and Kustomize overlays. Globs avoid matching every YAML file in the repo.

## Recommended tier

Set **Default Off** in Dashboard → Plugins. Enable when the repository has Helm charts, `k8s/` / `kubernetes/` trees, or Kustomize.

## Rule

`010-k8s-workload-safety.mdc` — glob-scoped rule (no `alwaysApply`).
## Skill

`k8s-manifest-review` — Use when changing Deployments, NetworkPolicies, or Helm values.
## Destructive kubectl

`kubectl delete` and `helm uninstall` may already be gated by `cloud-aws`
(`dangerous-aws-command.sh`) or `security-core`. This plugin does **not**
duplicate those hooks. Enable `platform-kubernetes` for glob rules; keep
cloud/security plugins for CLI confirmation when those are installed.
## Context budget

Default-off tier allows **zero** always-applied rule bytes. This plugin ships no
`alwaysApply: true` rules.

## Eval suite

Deterministic cases live in `evals/suites/platform-kubernetes/` in the marketplace repo.
