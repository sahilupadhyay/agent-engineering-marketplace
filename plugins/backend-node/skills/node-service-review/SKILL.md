---
name: node-service-review
description: Use when changing Node or TypeScript server routes, middleware, services, or API handlers.
---

# Node service review

## Preconditions
Match existing framework (Express, Fastify, Nest, etc.). Cross-link **api-http** for route contracts.

## Review
1. **Async/errors** — errors propagated; no unhandled rejections in request path.
2. **Validation** — input at boundary; typed handlers where the repo uses TypeScript.
3. **Middleware order** — auth, parsing, routes; no duplicate body parsers.
4. **Observability** — structured logs; correlation IDs if the repo uses them.
5. **Report** — risks, tests to run, and framework-specific gaps.
