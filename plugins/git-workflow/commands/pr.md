---
name: pr
description: Prepare a pull-request summary from the current branch diff; do not open a PR unless asked.
---

# PR

Prepare a pull request summary for the current changes.

Workflow:

1. Review git status and full diff.
2. Summarize the behavior change.
3. List tests run and results.
4. Call out migrations, infrastructure changes, and breaking changes.
5. Note risks, rollout considerations, and follow-up work.

Do not create commits or open the PR unless explicitly requested.
