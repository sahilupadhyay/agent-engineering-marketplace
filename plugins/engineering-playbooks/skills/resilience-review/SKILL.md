---
name: resilience-review
description: Use when reviewing retries, timeouts, circuit breakers, or failure handling.
---

# Resilience review

## Check
1. **Timeouts** — client and server; match dependency SLOs.
2. **Retries** — idempotent only; jitter and max attempts.
3. **Circuit breaking** — fail fast when dependencies are unhealthy.
4. **Graceful degradation** — partial responses vs hard failures.
5. **Observability** — errors visible in logs/metrics/traces.

## Output
- Failure scenarios table: trigger, user impact, mitigation, gap.
