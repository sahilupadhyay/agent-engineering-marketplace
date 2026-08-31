---
name: heap-analytics
description: Use when defining Heap events, properties, identity, or analytics contracts.
---

# Heap analytics review

## Preconditions
User-connected Heap context or MCP when available.

## Review
1. **Events** — naming convention matches project.
2. **Properties** — never send secrets or raw PII as **event properties**; use
   hashed or opaque identifiers instead.
3. **Identity** — stable user id strategy.
4. **Report** — gaps vs product questions.
