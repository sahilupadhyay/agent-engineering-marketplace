# obs-heap

Skills-only plugin for Heap event instrumentation. **No bundled `mcp.json`.** Put PII and naming rules in the skill, not an always-on rule.

## Recommended tier

Set **Default Off** in Dashboard → Plugins. Enable when the team adds or changes Heap events.

## Skill

`heap-analytics` — Use when adding or changing Heap events, properties, or identity.
## Skills-only posture

This plugin ships **skills only** (no rules, commands, hooks, or `mcp.json`).
Connect related MCP servers in **Cursor Settings → MCP**; the skill routes the agent to those tools at runtime.
## Context budget

Default-off tier allows **zero** always-applied rule bytes. This plugin ships no
`alwaysApply: true` rules.

## Eval suite

Deterministic cases live in `evals/suites/obs-heap/` in the marketplace repo.
