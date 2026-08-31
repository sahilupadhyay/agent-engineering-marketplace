# atlassian-confluence

Skills-only integration plugin for Confluence pages. Instructs the agent to use
Atlassian MCP tools the user already connected — **no bundled `mcp.json`**.

## Recommended tier

Set **Default Off** in Dashboard → Plugins. Enable when the team creates or
updates Confluence pages and has connected Atlassian MCP.

## Skill

`confluence-page` — Use when creating or updating Confluence pages from Jira
keys, design notes, or repo documentation.

Workflow phases:

1. **Discover** — `search` / `searchConfluenceUsingCql`; prefer update over duplicate
2. **Read** — `getConfluencePage` before edits
3. **Draft** — confirm structure with the user
4. **Write** — `updateConfluencePage` or `createConfluencePage` with `contentFormat: html` by default

Use `markdown` content format only when the user asks for a plain draft.

## Skills-only posture

This plugin ships **skills only** (no rules, commands, hooks, or `mcp.json`).
Connect related MCP servers in **Cursor Settings → MCP**; the skill routes the
agent to those tools at runtime.

## Context budget

Default-off tier allows **zero** always-applied rule bytes. This plugin ships no
`alwaysApply: true` rules.

## Eval suite

Deterministic cases live in `evals/suites/atlassian-confluence/` in the marketplace repo.
