---
name: java-service-review
description: Use when changing Java services, controllers, repositories, or Spring components.
---

# Java service review

## Review
1. **Exceptions** — no printStackTrace; use project exception types.
2. **Transactions** — scope and rollback boundaries.
3. **Queries** — parameterized; no string-built SQL.
4. **Layers** — respect controller/service/repository layout in the repo.
5. **Report** — test and build commands run.
