---
name: check-actions
description: Inspect GitHub Actions workflow runs and check status for the current branch or PR without changing CI configuration.
---

# Check Actions

Inspect CI status for the current branch or open pull request.

Workflow:

1. Identify the current branch and any open PR (`gh pr view` when applicable).
2. List recent workflow runs with `gh run list` filtered to this branch.
3. Summarize failing checks with `gh pr checks` or `gh run view` for failed jobs.
4. Link each failure to the likely code area when inferable from logs.
5. Suggest the smallest next debugging step per failure.

Do not modify workflow files, re-run workflows, or push commits unless asked.
