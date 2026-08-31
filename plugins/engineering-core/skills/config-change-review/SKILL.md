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

1. **Intake** — restate the task; list unknowns before editing (pairs with **engineering-core** task-intake rules).
2. **Change** — list every file touched and what system it configures.
2. **Identify system affected** — CI, container runtime, cloud infra, secrets, or deps.
3. **Validate syntax** — run or inspect the relevant linter/parser; do not guess.
4. **Validate references** — names, paths, secrets, and image tags must resolve.
5. **Validate tests/build** — run focused checks the project already uses.
6. **Determine deployment impact** — what breaks if this ships unchanged?
7. **Report what was verified** — cite commands run and outcomes; mark gaps explicitly.

For general code changes (not config), follow **engineering-core** evidence and
minimal-change rules before claiming done.

Escalate with the human escalation rule when production impact is unclear.
