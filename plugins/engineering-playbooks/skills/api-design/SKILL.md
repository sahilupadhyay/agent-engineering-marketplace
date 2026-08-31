---
name: api-design
description: Use when designing or changing HTTP/JSON APIs, routes, or contracts.
---

# API design

## Principles
- Stable resource names; predictable status codes and error envelopes.
- Validate at the boundary; fail closed on auth failures.

## Workflow
1. Document method, path, request/response shapes.
2. Prefer additive JSON fields; version breaking changes.
3. Pagination, filtering, and idempotency for mutating operations.
4. Rate limits and timeouts on outbound dependencies.

## Deliver
- Contract summary, compatibility notes, and OpenAPI follow-ups.
- Use api-docs / api-http plugins when specs or handlers change.
