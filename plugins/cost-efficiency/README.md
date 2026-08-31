# cost-efficiency

Default-off model selection and task-triage guidance. Load only when teams want
explicit cost-efficiency discipline without adding always-on context.

## Recommended tier

Set **Default Off** in Dashboard → Plugins. Enable for teams that want model
tier checks without affecting every session.

## Rule

`010-min-capable-model.mdc` — glob/on-demand rule (no `alwaysApply`). Principles
for minimum capable model; paired with the task-triage skill.

## Skill

`task-triage` — Use when the selected model and task complexity appear
mismatched.

## Context budget

Default-off tier allows **zero** always-applied rule bytes. This plugin ships no
`alwaysApply: true` rules.

## Eval suite

Deterministic cases live in `evals/suites/cost-efficiency/` in the marketplace repo.
