# cost-efficiency

Default-on model and mode router. Every user message is classified; on mismatch
the agent holds tools until you confirm stay, upgrade, downgrade, or Ask/Agent/Plan.

## Recommended tier

Set **Default On** in Dashboard → Plugins. See [docs/tiers.md](../../docs/tiers.md).

This plugin cannot switch Cursor's model picker or pause a request at the
platform layer. The always-on rule classifies the query and holds tools until
you confirm. You do not need `/model-router` on each message.

## Rule

`010-min-capable-model.mdc` — always-on hold-until-confirm router for model tier
and Cursor mode; paired with the task-triage skill.

## Skill

`task-triage` — Use when the selected model or Cursor mode and task complexity
appear mismatched.

## Command

`/model-router` — optional explicit re-run of the same check. The always-on rule
already runs on every message.

## Context budget

Combined always-applied rule bodies must stay within **2048** UTF-8 bytes.

## Eval suite

Deterministic cases live in `evals/suites/cost-efficiency/` in the marketplace repo.
