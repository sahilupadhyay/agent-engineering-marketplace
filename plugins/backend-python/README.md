# backend-python

Default-off glob-scoped rules for Python backend and service code. Load only when
teams work on FastAPI, Django, Flask, or similar Python stacks.

## Recommended tier

Set **Default Off** in Dashboard → Plugins. Enable when the repository ships
Python application or API code.

## Rule

`010-python-server-discipline.mdc` — glob-scoped rule (no `alwaysApply`). Applies
to Python modules under the project.

## Context budget

Default-off tier allows **zero** always-applied rule bytes. This plugin ships no
`alwaysApply: true` rules.

## Eval suite

Deterministic cases live in `evals/suites/backend-python/` in the marketplace repo.
