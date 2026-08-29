# Workstream 08 — Docker and Kubernetes

**Tier:** `default-off`. Separate plugins so a frontend repo can skip K8s.

## `platform-docker`

- Globs: `["**/Dockerfile*", "**/docker-compose*.{yml,yaml}", "**/.dockerignore"]`
- Rule `010-docker-image-safety.mdc`: non-root user when the project already does; pin tags or digest if the repo pins; no secrets in `ENV`; don't `docker build --network=host` without ask.
- Optional hook matcher for `docker system prune` / `docker rmi` — only if not already covered by protect-shell; prefer skill first.

## `platform-kubernetes`

- Globs: `["**/helm/**", "**/k8s/**", "**/kubernetes/**", "**/*.{yaml,yml}"]` is too wide. Use `["**/helm/**", "**/k8s/**", "**/kubernetes/**", "**/*kustomization.yaml"]`.
- Rule `010-k8s-workload-safety.mdc`: no privileged unless existing; resource requests if the cluster requires them; don't apply to prod context without confirmation.
- Skill `k8s-manifest-review`: Use when changing Deployments, NetworkPolicies, or Helm values.
- Hook: `kubectl delete` already asked in `cloud-aws` dangerous hook — **do not duplicate** if cloud-aws is installed. README: enable kubernetes plugin for glob rules; destructive kubectl may already be gated by cloud-aws **or** security-core. If neither is installed, add `hooks/dangerous-k8s-command.sh` here.

## Parallel safety

Two plugin dirs. **Do not** both edit `tests/hooks.test.mjs` in parallel — if K8s needs a hook, do it after Docker or in a follow-up PR.

## Detect-stack (coordinator)

`Dockerfile` → `platform-docker`; `helm/` or `k8s/` → `platform-kubernetes`.
