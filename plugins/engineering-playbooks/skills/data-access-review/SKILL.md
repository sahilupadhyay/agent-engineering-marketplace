---
name: data-access-review
description: Use when reviewing database queries, migrations, or ORM access patterns.
---

# Data access review

## Scope
- Schema migrations, queries, indexes, and transaction boundaries.

## Review
1. **Safety** — parameterized queries; no string-built SQL.
2. **Migrations** — reversible or documented; lock impact considered.
3. **Indexes** — match filters and sort; avoid table scans on hot paths.
4. **Transactions** — scope minimal; idempotency where retries exist.
5. **Secrets** — no credentials in SQL or seed data.

## Output
- Access-pattern risks, migration blast radius, and test gaps.
- Enable a data-* stack plugin when dialect-specific rules apply.
