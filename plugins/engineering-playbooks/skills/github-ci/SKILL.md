---
name: github-ci
description: Use when designing or troubleshooting GitHub Actions workflows and CI pipelines.
---

# GitHub CI

## Review
1. Pin actions; least-privilege permissions.
2. Cache keys and matrix size (cost and time).
3. Secrets scope; no fork PR exfiltration paths.
4. Required checks align with merge policy.

## Troubleshoot
- Reproduce failing job locally when possible.
- Read first failing step; avoid rerunning blindly.

## Output
- Workflow diagram in prose, risks, and concrete YAML fixes.
