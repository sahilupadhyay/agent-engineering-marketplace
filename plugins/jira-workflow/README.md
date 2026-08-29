# jira-workflow

Skills-only integration plugin for Jira issue triage and workflow tasks. Instructs
the agent to use MCP tools the user already connected in Cursor — **no bundled
`mcp.json`** in this plugin.

See [docs/mcp-governance.md](../../docs/mcp-governance.md) for when marketplace
plugins may ship MCP server configuration.

## Recommended tier

Set **Default Off** in Dashboard → Plugins. Enable when the team uses Jira and
has connected an Atlassian or Jira MCP in Cursor settings.

## Skill

`jira-triage` — Use when triaging Jira issues, searching tickets, updating fields,
adding comments, or running workflow transitions.

## Skills-only posture

This plugin ships **skills only** (no rules, commands, hooks, or `mcp.json`).
Connect Jira/Atlassian MCP once in **Cursor Settings → MCP**; the skill routes
the agent to those tools at runtime.

## Context budget

Default-off tier allows **zero** always-applied rule bytes. This plugin ships no
rules.

## Eval suite

Deterministic cases live in `evals/suites/jira-workflow/` in the marketplace repo.
