# api-docs

Skills-only integration plugin for OpenAPI and API documentation review. Instructs
the agent to use MCP tools the user already connected in Cursor when helpful —
**no bundled `mcp.json`** in this plugin.

See [docs/mcp-governance.md](../../docs/mcp-governance.md) for when marketplace
plugins may ship MCP server configuration.

## Recommended tier

Set **Default Off** in Dashboard → Plugins. Enable when the team maintains
OpenAPI specs or published API documentation.

## Skill

`openapi-review` — Use when reviewing OpenAPI specs, API contracts, endpoint
documentation, or validating published API docs against implementation.

## Skills-only posture

This plugin ships **skills only** (no rules, commands, hooks, or `mcp.json`).
Optional API or docs MCP servers are configured in **Cursor Settings → MCP**;
the skill routes the agent to those tools or to workspace files at runtime.

## Context budget

Default-off tier allows **zero** always-applied rule bytes. This plugin ships no
rules.

## Eval suite

Deterministic cases live in `evals/suites/api-docs/` in the marketplace repo.
