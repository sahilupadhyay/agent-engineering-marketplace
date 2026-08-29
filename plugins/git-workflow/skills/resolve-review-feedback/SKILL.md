---
name: resolve-review-feedback
description: Use when addressing pull-request review comments, request-changes feedback, or CI failures on an open PR.
---

# Resolve review feedback

## Gather feedback

Use `gh pr view`, `gh api` for review comments, and `gh pr checks` for CI status. Read unresolved threads only.

## Triage

Classify each item: must-fix, nit, or question. Ask the user when intent is unclear.

## Implement

Make the smallest safe change per item. No drive-by refactors. Respect commit-identity amend rules.

## Verify

Run focused tests and validation for touched areas.

## Respond

Reply concisely per thread (fixed, won't fix with reason, or question). Mark resolved when appropriate.

## Push

Use a normal commit unless amend preconditions hold and the user asked. Re-request review when needed.
