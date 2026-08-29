# backend-node

Default-off glob-scoped rules for Node and TypeScript server code. Load only when
teams work on Express, Fastify, Nest, or similar backends.

## Recommended tier

Set **Default Off** in Dashboard → Plugins. Enable when the repository uses Node
for APIs, services, or server-side logic.

## Rule

`010-node-server-discipline.mdc` — glob-scoped rule (no `alwaysApply`). Applies to
server routes, controllers, and Node/TS backend files.

## Context budget

Default-off tier allows **zero** always-applied rule bytes. This plugin ships no
`alwaysApply: true` rules.

## Eval suite

Deterministic cases live in `evals/suites/backend-node/` in the marketplace repo.
