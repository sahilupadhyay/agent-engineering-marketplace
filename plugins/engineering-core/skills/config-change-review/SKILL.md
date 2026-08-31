---
name: config-change-review
description: Use when changing CI/CD, Docker, Terraform, CloudFormation, Kubernetes, Helm, env files, or dependency manifests.
---

# Config change review

## Detect scope

Applies when paths include `.github/`, Dockerfiles, `docker-compose`, CI/CD
pipelines, Terraform, CloudFormation, Kubernetes, Helm, environment files, or
dependency manifests (`package.json`, `pyproject.toml`, `go.mod`, `pom.xml`,
`Cargo.toml`, and similar).

## Workflow

1. **Intake** — run **task-intake-playbook** or restate the task; list unknowns before editing.
2. **Change** — list every file touched and what system it configures.
3. **Identify system affected** — CI, container runtime, cloud infra, secrets, or deps.
4. **Validate syntax** — run or inspect the relevant linter/parser; do not guess.
5. **Validate references** — names, paths, secrets, and image tags must resolve.
6. **Validate tests/build** — run focused checks the project already uses.
7. **Determine deployment impact** — what breaks if this ships unchanged?
8. **Report what was verified** — cite commands run and outcomes; mark gaps explicitly.

For general code changes (not config), load **task-intake-playbook** and follow
**engineering-core** evidence and minimal-change rules before claiming done.

Escalate with the human escalation rule when production impact is unclear.
