---
name: scope-and-style-review
description: Use when reviewing a diff for scope creep, readability, or unnecessary refactors before merge.
---

# Scope and style review

## Preconditions

Apply **code-quality** always-on rules. For full security or correctness review,
use **engineering-playbooks** `code-review` or **git-workflow** `/review`.

## Scope check

1. List files changed vs the stated task.
2. Flag drive-by refactors, renames, or formatting outside touched logic.
3. Recommend splitting unrelated changes into a separate PR.

## Readability check

1. Match existing naming, imports, and file layout.
2. Flag unclear names, deep nesting, or comments that restate obvious code.
3. Prefer the smallest change that preserves team style.

## Refactor check

1. Refactor only when requested or required for correctness.
2. If refactor is mixed with feature work, suggest separating commits or PRs.

## Report

Return: in-scope summary, out-of-scope items (if any), and readability nits by severity.
Do not rewrite code unless the user asked for fixes.
