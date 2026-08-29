---
name: pr-summary
description: Summarize the current branch diff into a pull-request description without opening a PR unless asked.
---

# PR summary

Prepare a pull-request summary for the current branch changes.

Workflow:

1. Review `git status` and the full diff against the base branch.
2. Summarize the behavior change in plain language.
3. List tests run and results.
4. Call out migrations, infrastructure changes, and breaking changes.
5. Note risks, rollout considerations, and follow-up work.

Do not create commits or open the PR unless explicitly requested.
