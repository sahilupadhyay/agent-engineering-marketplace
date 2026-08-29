# Workstream 04 — Observability (Coralogix, Heap)

**Tier:** `default-off`. **Skills-only** unless a glob rule is needed for dashboard JSON.

**No `mcp.json`.** User connects Coralogix / analytics MCP or APIs in Cursor settings ([mcp-governance.md](../mcp-governance.md)).

## `obs-coralogix`

- Skill `coralogix-telemetry`: Use when querying logs, traces, or alerts in Coralogix.
- Instruct agent to use **already-connected** MCP tools; no invented query language if the tool schema is present.
- Rule optional: glob `["**/*coralogix*", "**/*alert*.json"]` — only if you have a 10-line "don't log PII / secrets" principle.

## `obs-heap`

- Skill `heap-analytics`: Use when adding or changing Heap events, properties, or identity.
- Rule: don't send secrets or raw PII as event properties; match existing event names.

## Out of scope

Datadog, Grafana, generic OpenTelemetry — later plugins. Don't hide them inside Coralogix.

## Parallel safety

Two plugin dirs. Coordinator: marketplace only.
