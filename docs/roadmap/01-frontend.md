# Workstream 01 — Frontend plugins

**Tier:** `default-off` for all. **No `alwaysApply`.** Globs must be a **single-line JSON array**.

Do not copy handbook `260-frontend.mdc` or `225-javascript-typescript.mdc`.

## Plugins

### `frontend-htmlcss` (new)

- Globs: `["**/*.{html,css,scss,sass,less}"]`
- Rule `010-markup-accessibility.mdc`: semantic HTML, no inline secrets, prefer existing design tokens, don't invent CSS architecture.
- Optional skill `markup-review` with **Use when** for a11y / layout bugs.

### `frontend-javascript` (new)

- Globs: `["**/*.{js,mjs,cjs,ts}"]` — **exclude** backend-only if too broad; prefer `["**/src/**/*.{js,ts,mjs}"]` plus `**/*.{tsx,jsx}` left to React plugin.
- Safer globs: `["**/*.{js,mjs,cjs}", "**/*.ts", "!**/server/**"]` — if validator does not support negative globs, use positive `["**/public/**/*.{js,ts}", "**/client/**/*.{js,ts}", "**/src/**/*.{js,ts}"]` and document.
- Rule: no `eval`, typed boundaries, don't add a bundler the repo doesn't use.

### `frontend-react` (expand existing)

- Keep `010-react-component-discipline.mdc`.
- Add `020-react-hooks-data.mdc` only if it does not duplicate 010 (single responsibility).
- Do not merge Angular/Vue into this plugin.

### `frontend-angular` (new)

- Globs: `["**/*.{ts,html,scss}", "**/angular.json"]` — keep glob list tight: `["**/*.component.ts", "**/*.component.html", "**/angular.json"]`
- Rule: standalone vs NgModule match the repo; no new state library; RxJS unsubscribe / `takeUntilDestroyed`.

### `frontend-vue` (new)

- Globs: `["**/*.{vue,ts}"]` or `["**/*.vue"]`
- Rule: Composition API vs Options API match the repo; no new Pinia if Vuex exists.

## Evals (per plugin)

- `tier-default-off.eval.json`
- `rules-no-dead-paths.eval.json`
- One regex eval on a distinctive phrase in the new rule

## Parallel safety

Only touch `plugins/frontend-*` and `evals/suites/frontend-*`. Coordinator updates marketplace + detect-stack (`vue`, `angular`, `react` already).

## Detect-stack (coordinator later)

Recommend `frontend-vue` on `vue` dependency, `frontend-angular` on `@angular/core`, `frontend-htmlcss` when `*.html`/`*.css` exist without a SPA framework.
