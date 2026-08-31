---
name: resolve-review-feedback
description: Use when addressing pull-request review comments, request-changes feedback, or CI failures on an open PR.
---

# Resolve review feedback

## Preconditions

Use **git-workflow** rules for commit identity and branch scope. Destructive git
commands require **security-core** confirmation.

## Gather feedback

1. `gh pr view` — title, body, checks summary.
2. `gh api` — unresolved review comments and threads.
3. `gh pr checks` — failing CI jobs and logs.

Read unresolved threads only; skip already-resolved items.

## Triage

Classify each item:

- **Must-fix** — correctness, security, broken CI
- **Nit** — style; fix only if quick or user asked
- **Question** — ask before changing behavior

Ask the user when intent is unclear.

## Implement

Make the smallest safe change per item. No drive-by refactors. One concern per commit
when possible.

## Verify

Run focused tests and the **testing** verification ladder for touched areas.
Use `/verify` or **testing** `write-focused-test` skill when adding tests.

## Respond

Reply concisely per thread: fixed, won't fix with reason, or follow-up question.
Mark resolved when appropriate.

## Push

Use a normal commit unless amend preconditions hold and the user asked. Re-request
review when all must-fix items are addressed.
