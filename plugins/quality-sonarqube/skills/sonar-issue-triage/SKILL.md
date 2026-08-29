---
name: sonar-issue-triage
description: Use when a SonarQube quality gate failed on a PR.
---

# Sonar issue triage

## Scope

Failed quality gates on the current PR. Prefer issues on changed lines.

## Workflow

1. List new issues (bug, vuln, smell) tied to the diff.
2. Classify: fix now, false positive with evidence, or defer with owner.
3. Do not recommend lowering the gate to pass.
4. Fix the smallest code change; skip drive-by refactors.
5. Summarize remaining debt that is out of scope.

Do not commit scanner tokens while reproducing the analysis.
