---
name: redis-review
description: Use when changing Redis keys, TTLs, eviction, or Redis Lua scripts.
---

# Redis review

## Scope

Redis-named config, Lua, and application cache helpers the user identifies.

## Workflow

1. **Map keys** — prefix, cardinality, and owners.
2. **Check TTL** — every new cache key has expiry or an explicit durable reason.
3. **Forbid KEYS** — no `KEYS *` in request paths.
4. **Memory** — eviction policy matches existing `maxmemory-policy` if set.
5. **Report** — key design, hot keys, and secret-handling gaps.

Do not treat Redis as the system of record unless the repo already does.
