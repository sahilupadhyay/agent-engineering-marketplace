# Workstream 06 — Atlassian and SonarQube

**Tier:** `default-off`. Skills-only for SaaS. No bundled MCP.

## Expand `jira-workflow`

- Keep `jira-triage`.
- Add skill `jira-comment-pr` only if it doesn't duplicate triage: Use when linking a PR to a Jira key.

**Serialize** with any other Jira edits.

## `atlassian-confluence` (new)

- Skill `confluence-page`: Use when creating or updating Confluence pages from Jira or design docs.
- Point to user-connected Atlassian MCP.

## `quality-sonarqube`

- Globs: `["**/sonar-project.properties", "**/*sonar*.yml"]`
- Rule `010-sonar-quality-gate.mdc`: don't weaken gates to greenwash; don't commit tokens; treat new issues on changed lines first.
- Skill `sonar-issue-triage`: Use when a quality gate failed on a PR.

## Parallel safety

`atlassian-confluence` and `quality-sonarqube` are independent. Jira expansion is sequential with `jira-workflow` owners.
