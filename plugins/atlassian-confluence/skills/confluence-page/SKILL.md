---
name: confluence-page
description: Use when creating or updating Confluence pages from Jira or design docs.
---

# Confluence page

## Preconditions

Use Atlassian MCP tools the user already connected in Cursor. This plugin does
not ship `mcp.json`. If no Confluence MCP is available, ask the user to
connect one before drafting remote pages.

## Workflow

1. Confirm space, parent page, and title with the user.
2. Pull source material (Jira, design notes, or repo docs) they named.
3. Draft or update with the project's heading and label conventions.
4. Do not paste secrets, tokens, or private URLs into page body.
5. Prefer an update to an existing page over a duplicate.

Do not publish or move pages without explicit user intent.
