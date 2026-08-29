# Workstream 03 — Database plugins

**Tier:** `default-off`. Skills for playbooks; short glob rules for SQL/IaC files.

## Plugins (one each — do not merge)

| Plugin | Globs | Rule focus |
| --- | --- | --- |
| `data-postgres` | `["**/*.{sql,pgsql}", "**/migrations/**"]` | Transactions, `IF EXISTS` on drops, no superuser in app roles |
| `data-mysql` | `["**/*.sql"]` overlapping postgres — **narrow**: `["**/mysql/**", "**/*mysql*.sql"]` or document "enable one SQL plugin" | Charset/collation, no `LOCK TABLES` without need |
| `data-dynamodb` | `["**/*.{tf,json,yml,yaml,ts,py}"]` too wide — use `["**/*dynamodb*", "**/tables*.json"]` plus skill | Keys, GSIs, no Scan in hot paths, capacity honesty |
| `data-redis` | `["**/*redis*", "**/*.{lua,conf}"]` | TTL on cache keys, no unbounded `KEYS`, don't store secrets in Redis |

If globs collide (generic `**/*.sql`), prefer **skills** (`postgres-review`, `mysql-review`) with Use when, and one shared `data-sql-safety.mdc` **only if** a single `data-sql` plugin is added instead of two. **Decision:** ship four plugins; postgres and mysql READMEs tell consumers to enable one.

## Skills

Each plugin: one `SKILL.md` with Use when (schema change, query review, migration).

## Security

Parameterized queries belong in backend plugins too — database plugins must not contradict `backend-python` / `backend-java`. Cross-link in README, don't duplicate long OWASP essays.

## Parallel safety

Four independent plugin directories. Coordinator: marketplace + detect-stack (`*.sql` does not auto-install both postgres and mysql).
