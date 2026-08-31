# frontend-react

Default-off glob-scoped rules for React and TSX UI code. Load only when teams
work on React, Next.js, or similar frontends.

## Recommended tier

Set **Default Off** in Dashboard → Plugins. Enable when the repository ships
React components or hooks.

## Rule

`010-react-component-discipline.mdc` — glob-scoped rule (no `alwaysApply`). Applies
to `.tsx` and `.jsx` files.


## Skill

`react-review` — load when the task matches the skill description.
## Context budget

Default-off tier allows **zero** always-applied rule bytes. This plugin ships no
`alwaysApply: true` rules.

## Eval suite

Deterministic cases live in `evals/suites/frontend-react/` in the marketplace repo.
