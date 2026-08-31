---
name: jira-comment-pr
description: Use when linking a GitHub pull request to a Jira issue key or posting a PR URL as a Jira comment.
---

# Jira comment with PR link

## Preconditions

User-connected Atlassian MCP. No bundled `mcp.json`. Issue triage, transitions, and
field edits → **jira-triage** skill; this skill covers PR linkage and comments only.

## Workflow

1. Confirm the **issue key** and PR number or URL from the user.
2. Verify the PR with `gh pr view` — title, state, and URL are accurate.
3. Draft a short comment: summary of change, test evidence, link to the PR; no
   secrets, tokens, or internal-only URLs in the comment body.
4. Post with `addCommentToJiraIssue` after the user confirms the draft.
5. When the user asks to link development work, call `getJiraIssueRemoteIssueLinks`
   first to avoid duplicates; create remote links only when MCP tools support it and
   the user confirms.

## Non-goals

- Do not transition, reassign, or close issues here.
- Do not open or merge pull requests (**git-workflow** owns PR workflow).
