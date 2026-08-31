# platform-docker

Default-off glob-scoped rules for Dockerfiles and Compose files. Kubernetes manifests belong in `platform-kubernetes`.

## Recommended tier

Set **Default Off** in Dashboard → Plugins. Enable when the repository ships a Dockerfile or Compose file.

## Rule

`010-docker-image-safety.mdc` — glob-scoped rule (no `alwaysApply`).
## Destructive Docker CLI

Prefer confirming `docker system prune` / `docker rmi` with the user in-session.
This plugin does not ship a hook; `security-core` already gates broad `rm -rf`.

## Skill

`docker-review` — load when the task matches the skill description.
## Context budget

Default-off tier allows **zero** always-applied rule bytes. This plugin ships no
`alwaysApply: true` rules.

## Eval suite

Deterministic cases live in `evals/suites/platform-docker/` in the marketplace repo.
