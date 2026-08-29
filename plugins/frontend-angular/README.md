# frontend-angular

Default-off glob-scoped rules for Angular components and workspace config. Do not enable this plugin for React or Vue repos.

## Recommended tier

Set **Default Off** in Dashboard → Plugins. Enable when the repository uses Angular (`angular.json` or `*.component.ts`).

## Rule

`010-angular-component-discipline.mdc` — glob-scoped rule (no `alwaysApply`). Tight globs: component TS/HTML and `angular.json`.
## Context budget

Default-off tier allows **zero** always-applied rule bytes. This plugin ships no
`alwaysApply: true` rules.

## Eval suite

Deterministic cases live in `evals/suites/frontend-angular/` in the marketplace repo.
