---
name: gha-workflow-review
description: Use when adding or changing GitHub Actions workflows or reusable workflows.
---

# GitHub Actions review

## Review
1. **Pins** — action SHAs or repo pins.
2. **Permissions** — least-privilege `permissions:` block.
3. **Secrets** — minimal scope; no echo in logs.
4. **Fork PRs** — untrusted input and pull_request_target risks.
5. **Report** — supply-chain and exfiltration risks.
