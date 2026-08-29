# Workstream 07 — AWS (expand `cloud-aws`)

**Do not create a second AWS plugin.** Extend `plugins/cloud-aws/` only.

**Tier remains `default-off`.** No `alwaysApply`.

## Existing (keep)

- Rules: aws-safety, iam-safety, deployment-validation
- Skills: aws-review, infrastructure-review, deployment-check
- Hook: `dangerous-aws-command.sh`

## Add (small, split files)

- Rule `040-aws-networking.mdc` (globs: `**/*.tf`, `**/*vpc*`, `**/*sg*`): no `0.0.0.0/0` on SSH/RDP without justification.
- Skill `aws-cost-review`: Use when changing instance classes, NAT, or idle resources — **do not duplicate** `cost-efficiency` model-selection.

## Hooks

Extend `dangerous-aws-command.sh` only for **new** destructive families not already in the script or `security-core` protect-shell. Add tests in `tests/hooks.test.mjs`.

## Parallel safety

**Single agent.** Do not parallelize AWS with another writer on `plugins/cloud-aws` or `tests/hooks.test.mjs`.
