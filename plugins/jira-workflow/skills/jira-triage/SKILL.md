---
name: jira-triage
description: Use when triaging Jira issues, searching tickets, updating issue fields, adding comments, or running workflow transitions.
---

# Jira triage

## Preconditions

Use Jira MCP tools the user already connected in Cursor (for example Atlassian).
This plugin does not ship `mcp.json` or bundled servers. If no Jira MCP is
available, ask the user to connect one before proceeding.

## MCP tools (when connected)

Use `getJiraIssue`, `searchJiraIssuesUsingJql`, `editJiraIssue`, `transitionJiraIssue`, and `addCommentToJiraIssue` as appropriate. Use `search` (Rovo) for broad discovery unless the user specifies JQL.

## Gather context

1. Confirm the issue key or search criteria from the user request.
2. Fetch the issue (summary, status, assignee, priority, labels, linked work).
3. Read recent comments and subtasks when triage depends on history.

## Triage

Classify each item:

- **Action now** — clear fix, blocked work, or production impact
- **Needs info** — missing repro, acceptance criteria, or owner
- **Defer** — low priority, duplicate, or out of scope

Surface blockers, dependencies, and sprint/epic alignment.

## Act with least privilege

- Prefer read and comment before field edits or transitions.
- Do not transition, reassign, or close without explicit user intent.
- Never paste secrets, tokens, or internal URLs into issue fields.

## Update

When the user asks to update:

1. State the planned field or transition change.
2. Apply via MCP only after confirmation for destructive or workflow moves.
3. Summarize what changed and link the issue key.

## Respond

Return a short triage summary: current state, recommended next step, and any
questions for the user or reporter.

PR linkage only (comment with PR URL, remote dev links) → **jira-comment-pr** skill.
