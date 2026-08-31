---
name: redis-review
description: Use when changing Redis keys, TTLs, eviction, or cache scripts.
---

# Redis review

## Review
1. **Keys** — prefix, cardinality, owners.
2. **TTL** — every cache key expires unless durable by design.
3. **No KEYS** — in request paths.
4. **Memory** — eviction policy alignment.
5. **Report** — hot keys and secret handling.
