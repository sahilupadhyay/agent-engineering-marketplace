# git-workflow

Default-on git identity safety, branch/PR conventions, review commands, and review-feedback skill.

## Recommended tier

Set **Default On** in Dashboard → Plugins.

## Rules

| File | Summary |
| --- | --- |
| `010-commit-identity.mdc` | Commit author safety; conventional commits; no git config changes. |
| `020-branch-pr.mdc` | One concern per PR; branch naming; no force-push without confirmation. |

Destructive git commands are gated by **security-core** hooks.

## Commands

| Command | Purpose |
| --- | --- |
| `/review` | Diff review without edits |
| `/pr` | PR summary without opening unless asked |
| `/pr-summary` | Branch diff to PR description draft |
| `/pr-risk` | Severity-ranked rollout risk assessment |
| `/check-actions` | GitHub Actions status for branch or PR |
| `/fix` | Defect investigation and minimal fix |

## Skill

`resolve-review-feedback` — Triage PR comments and CI failures; verify with **testing** ladder.

**Overlap:** Full code review depth → **engineering-playbooks** `code-review`.

## Context budget

Combined always-applied rule bodies must stay within **2048** UTF-8 bytes.

## Eval suite

Deterministic cases live in `evals/suites/git-workflow/` in the marketplace repo.
