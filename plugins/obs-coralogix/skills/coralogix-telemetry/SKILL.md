---
name: coralogix-telemetry
description: Use when querying Coralogix logs, metrics, or traces via user-connected MCP tools.
---

# Coralogix telemetry

## Preconditions
Use Coralogix MCP tools the user **already connected** — no bundled mcp.json. Generic
telemetry patterns → **obs-telemetry**.

## Workflow
1. Confirm time range, application, and environment with user.
2. Search logs before summarizing with MCP tools — do not invent a query language or
   events the tools did not return.
3. Redact secrets and tokens from queries and summaries.
4. Correlate traces to errors when MCP supports it.
5. Report findings with query filters used.

## Safety
Read-only unless user explicitly asks to change alerts or dashboards.
