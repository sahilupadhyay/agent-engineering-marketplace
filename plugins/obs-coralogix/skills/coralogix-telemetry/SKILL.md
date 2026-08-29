---
name: coralogix-telemetry
description: Use when querying logs, traces, or alerts in Coralogix.
---

# Coralogix telemetry

## Preconditions

Use Coralogix MCP tools the user already connected in Cursor. This plugin does
not ship `mcp.json` or a query dialect of its own. If no Coralogix MCP is
available, ask the user to connect one before inventing queries.

When a tool schema is present, follow that schema. Do not invent a query
language the connected tool does not document.

## Workflow

1. Confirm time range, application, and environment from the user request.
2. Prefer the connected tool's search or alert APIs over guessed Lucene.
3. Redact secrets and personal data from pasted log lines in the reply.
4. Summarize findings: error rate, exemplar traces, and open alerts.

Do not change production alert thresholds without explicit user intent.
