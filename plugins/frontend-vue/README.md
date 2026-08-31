# frontend-vue

Default-off glob-scoped rules for Vue single-file components. Do not merge React or Angular guidance into this plugin.

## Recommended tier

Set **Default Off** in Dashboard → Plugins. Enable when the repository ships `.vue` files.

## Rule

`010-vue-sfc-discipline.mdc` — glob-scoped rule (no `alwaysApply`). Applies to `.vue` files.

## Skill

`vue-review` — load when the task matches the skill description.
## Context budget

Default-off tier allows **zero** always-applied rule bytes. This plugin ships no
`alwaysApply: true` rules.

## Eval suite

Deterministic cases live in `evals/suites/frontend-vue/` in the marketplace repo.
