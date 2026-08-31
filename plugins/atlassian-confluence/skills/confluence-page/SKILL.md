---
name: confluence-page
description: Use when creating or updating Confluence pages from Jira keys, design notes, or repo documentation.
---

# Confluence page

## Preconditions

Use Atlassian MCP tools the user already connected in Cursor. This plugin does
not ship `mcp.json`. If no Atlassian MCP is available, ask the user to connect
one before drafting or publishing remote pages.

When `cloudId` is unknown, call `getAccessibleAtlassianResources` first.

## Discover

Before creating a page, search for an existing match:

1. `search` (Rovo) or `searchConfluenceUsingCql` for title, label, or text in the
   target space.
2. `getConfluenceSpaces` and `getPagesInConfluenceSpace` to confirm space key,
   parent page, and hierarchy.

Prefer **update existing** over a duplicate. If a close match exists, propose
updating it instead of `createConfluencePage`.

## Read

For updates, fetch the current page:

1. `getConfluencePage` for title, body, labels, and version.
2. `getConfluencePageDescendants` when restructuring or moving sections.

When the user names a Jira key, fetch that issue via MCP for summary and links
only — do not run full Jira triage (see **jira-workflow**).

## Draft

1. Confirm space, parent page, and title with the user.
2. Pull source material they named (Jira issue, design notes, repo docs).
3. Summarize structure in prose first; convert to page body after they confirm
   headings and scope.

## Format

Default `contentFormat: html` for `createConfluencePage` and
`updateConfluencePage`.

- Use standard HTML: headings, paragraphs, lists, tables, links, code blocks.
- Confluence panels and status use `data-type` attributes (not CSS classes).
- Respect ADF nesting: no self-nesting panels, expands, tables, or blockquotes.
- Use `markdown` only when the user asks for a plain draft.

## Write

1. State planned action: create vs update, space, parent, title, version.
2. `updateConfluencePage` when a suitable page exists; `createConfluencePage`
   only when no match fits.
3. Do not publish, move, or delete pages without explicit user intent.

## Comments

- Footer notes: `createConfluenceFooterComment` for review feedback.
- Inline comments: only after `getConfluencePage` and an exact text match.
  Do not guess `inlineCommentProperties`.

## Safety

- Never paste secrets, tokens, or private URLs into page body or comments.
- Link Jira keys in the page when the source was a ticket.
- Do not overwrite large pages without showing a short diff summary first.

## Respond

Return a short summary: page ID or link, create vs update, what changed, and
any open questions for the user.
