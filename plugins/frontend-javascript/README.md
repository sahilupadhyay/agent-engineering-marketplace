# frontend-javascript

Default-off glob-scoped rules for client JavaScript and TypeScript under public, client, and src trees. Enable beside a framework plugin when teams share vanilla JS/TS.

## Recommended tier

Set **Default Off** in Dashboard → Plugins. Enable when the repository has client scripts under `public/`, `client/`, or `src/`.

## Rule

`010-js-client-discipline.mdc` — glob-scoped rule (no `alwaysApply`). Positive globs only (no negative glob syntax).

## Skill

`js-client-review` — load when the task matches the skill description.
## Context budget

Default-off tier allows **zero** always-applied rule bytes. This plugin ships no
`alwaysApply: true` rules.

## Eval suite

Deterministic cases live in `evals/suites/frontend-javascript/` in the marketplace repo.
