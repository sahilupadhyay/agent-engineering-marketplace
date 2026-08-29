---
name: heap-analytics
description: Use when adding or changing Heap events, properties, or identity.
---

# Heap analytics

## Scope

Client or server code that tracks Heap events. Do not hide other product
analytics tools inside this skill.

## Workflow

1. **Match existing names** — reuse event and property names already in the repo.
2. **No secrets or raw PII** as event properties (passwords, tokens, full
   account numbers, government IDs). Hash or omit.
3. **Identity** — follow the project's identify vs anonymous pattern; do not
   invent a second user id scheme.
4. **Report** — events added, properties, and privacy gaps.

Ask before sending new production traffic to Heap.
