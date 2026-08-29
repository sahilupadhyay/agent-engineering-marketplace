# cloud-aws

Default-off glob-scoped rules, skills, and hooks for AWS infrastructure work.
Load when teams edit Terraform, CloudFormation, CDK, or AWS CLI automation.

## Recommended tier

Set **Default Off** in Dashboard → Plugins. Enable when the repository uses AWS
for infrastructure, deployments, or operations.

## Rules

| File | Summary |
| --- | --- |
| `010-aws-safety.mdc` | Account, region, and resource safety for AWS changes. |
| `020-iam-safety.mdc` | Least-privilege IAM and access-control review. |
| `030-deployment-validation.mdc` | Plan-before-apply and post-deploy verification. |

All rules are glob-scoped (no `alwaysApply`). Globs target Terraform,
CloudFormation, CDK, and AWS CLI paths.

## Skills

| Skill | Trigger |
| --- | --- |
| `aws-review` | Reviewing AWS resources, CLI, or service configuration. |
| `infrastructure-review` | Reviewing IaC before apply. |
| `deployment-check` | Validating rollouts and post-deploy health. |

## Hooks

`dangerous-aws-command.sh` asks before destructive `kubectl delete`, `helm
uninstall`/`delete`, and AWS delete patterns beyond `security-core`
`protect-shell` coverage. Install alongside **security-core** for baseline
shell protection.

## Context budget

Default-off tier allows **zero** always-applied rule bytes. This plugin ships no
`alwaysApply: true` rules.

## Eval suite

Deterministic cases live in `evals/suites/cloud-aws/` in the marketplace repo.
