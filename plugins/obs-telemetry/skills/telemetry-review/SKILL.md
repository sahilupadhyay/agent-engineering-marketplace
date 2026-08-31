---
name: telemetry-review
description: Use when designing logs, metrics, traces, or OpenTelemetry instrumentation.
---

# Telemetry review

## Review
1. **Logs** — structured fields; redact secrets/PII.
2. **Metrics** — naming, units, cardinality limits.
3. **Traces** — propagation on outbound calls.
4. **SLOs** — tie signals to error budgets when defined.
5. **Report** — blind spots and cost drivers; vendor tools → obs-coralogix/heap.
