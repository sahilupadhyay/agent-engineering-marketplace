# frontend-htmlcss

Default-off glob-scoped rules and a review skill for HTML, CSS, and related stylesheets. Load when teams edit markup or layout without needing a SPA plugin.

## Recommended tier

Set **Default Off** in Dashboard → Plugins. Enable when the repository ships HTML, CSS, SCSS, Sass, or Less.

## Rule

`010-markup-accessibility.mdc` — glob-scoped rule (no `alwaysApply`). Applies to `.html`, `.css`, `.scss`, `.sass`, and `.less` files.
## Skill

`markup-review` — Use when diagnosing accessibility or layout bugs in HTML/CSS.
## Context budget

Default-off tier allows **zero** always-applied rule bytes. This plugin ships no
`alwaysApply: true` rules.

## Eval suite

Deterministic cases live in `evals/suites/frontend-htmlcss/` in the marketplace repo.
