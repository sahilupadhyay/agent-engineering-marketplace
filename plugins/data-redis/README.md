# data-redis

Default-off glob-scoped rules and a review skill for Redis config and Redis-named scripts. Globs avoid matching unrelated `.conf` files.

## Recommended tier

Set **Default Off** in Dashboard → Plugins. Enable when the repository uses Redis for cache, queues, or sessions.

## Rule

`010-redis-cache.mdc` — glob-scoped rule (no `alwaysApply`). Globs: `*redis*` plus Redis-named lua/conf.
## Skill

`redis-review` — Use when changing Redis keys, TTLs, or Lua scripts.
## Context budget

Default-off tier allows **zero** always-applied rule bytes. This plugin ships no
`alwaysApply: true` rules.

## Eval suite

Deterministic cases live in `evals/suites/data-redis/` in the marketplace repo.
