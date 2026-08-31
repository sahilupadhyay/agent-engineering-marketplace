# obs-telemetry

Default-off glob-scoped rules and a review skill. Generic logs, metrics, and traces discipline plus a telemetry review skill.

## Recommended tier

Set **Default Off** in Dashboard → Plugins. Enable when this stack matches your repository.

## Rule

`010-telemetry-discipline.mdc` — glob-scoped rule (no `alwaysApply`).

## Skill

`telemetry-review` — Use when designing logs, metrics, traces, or OpenTelemetry instrumentation.

## Context budget

Default-off tier allows **zero** always-applied rule bytes.

## Eval suite

Deterministic cases live in `evals/suites/obs-telemetry/` in the marketplace repo.
