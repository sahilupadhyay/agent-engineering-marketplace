---
name: gha-workflow-review
description: Use when adding or changing GitHub Actions workflows or reusable workflows.
---

# GitHub Actions review

1. **Pins** — action versions immutable where repo requires.
2. **Secrets** — minimal scope; no secret in logs.
3. **Forks** — pull_request_target and untrusted input risks.
4. **Permissions** — default-deny elevated scopes.
5. **Report** — supply-chain and exfiltration risks.
