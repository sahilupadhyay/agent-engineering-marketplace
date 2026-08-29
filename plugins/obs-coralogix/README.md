# obs-coralogix

Skills-only integration plugin for Coralogix logs, traces, and alerts. Instructs the agent to use MCP tools the user already connected — **no bundled `mcp.json`**.

## Recommended tier

Set **Default Off** in Dashboard → Plugins. Enable when the team queries Coralogix and has connected a telemetry MCP in Cursor settings.

## Skill

`coralogix-telemetry` — Use when querying logs, traces, or alerts in Coralogix.
## Skills-only posture

This plugin ships **skills only** (no rules, commands, hooks, or `mcp.json`).
Connect related MCP servers in **Cursor Settings → MCP**; the skill routes the agent to those tools at runtime.
## Context budget

Default-off tier allows **zero** always-applied rule bytes. This plugin ships no
`alwaysApply: true` rules.

## Eval suite

Deterministic cases live in `evals/suites/obs-coralogix/` in the marketplace repo.
