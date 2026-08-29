# diagram-workflow

Skills-only integration plugin for architecture and diagram tasks. Instructs the
agent to use MCP tools the user already connected in Cursor — **no bundled
`mcp.json`** in this plugin.

See [docs/mcp-governance.md](../../docs/mcp-governance.md) for when marketplace
plugins may ship MCP server configuration.

## Recommended tier

Set **Default Off** in Dashboard → Plugins. Enable when the team uses Lucid,
Figma, or other diagram MCP integrations in Cursor.

## Skill

`architecture-diagram` — Use when creating or updating architecture diagrams,
system flows, sequence diagrams, or visual design artifacts via connected
diagram MCP tools.

## Skills-only posture

This plugin ships **skills only** (no rules, commands, hooks, or `mcp.json`).
Connect diagram MCP servers once in **Cursor Settings → MCP**; the skill routes
the agent to those tools at runtime.

## Context budget

Default-off tier allows **zero** always-applied rule bytes. This plugin ships no
rules.

## Eval suite

Deterministic cases live in `evals/suites/diagram-workflow/` in the marketplace repo.
