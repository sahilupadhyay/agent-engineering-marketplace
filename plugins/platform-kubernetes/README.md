# platform-kubernetes

Default-off glob-scoped rules and a review skill for Helm, k8s/, and Kustomize overlays. Globs avoid matching every YAML file in the repo.

## Recommended tier

Set **Default Off** in Dashboard → Plugins. Enable when the repository has Helm charts, `k8s/` / `kubernetes/` trees, or Kustomize.

## Rule

`010-k8s-workload-safety.mdc` — glob-scoped rule (no `alwaysApply`).
## Skill

`k8s-manifest-review` — Use when changing Deployments, NetworkPolicies, or Helm values.

## Hooks

`dangerous-k8s-command.sh` asks before `kubectl delete` and `helm
uninstall`/`delete`. This plugin owns Kubernetes CLI confirmations; **cloud-aws**
covers extended AWS API deletes only. Install **security-core** for baseline
shell protection (`rm`, git destructive, SQL DROP, common AWS deletes).
## Context budget

Default-off tier allows **zero** always-applied rule bytes. This plugin ships no
`alwaysApply: true` rules.

## Eval suite

Deterministic cases live in `evals/suites/platform-kubernetes/` in the marketplace repo.
