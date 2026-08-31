# lang-bash

Default-off glob-scoped rules and a review skill. Glob-scoped shell script safety for quoting, errexit, and reviewable diffs.

## Recommended tier

Set **Default Off** in Dashboard → Plugins. Enable when this stack matches your repository.

## Rule

`010-shell-script-safety.mdc` — glob-scoped rule (no `alwaysApply`).

## Skill

`shell-script-review` — Use when adding or changing shell scripts, CI helpers, or hook wrappers.

## Context budget

Default-off tier allows **zero** always-applied rule bytes.

## Eval suite

Deterministic cases live in `evals/suites/lang-bash/` in the marketplace repo.
