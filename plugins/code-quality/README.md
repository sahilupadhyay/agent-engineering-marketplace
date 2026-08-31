# code-quality

Default-on code quality discipline: stay in scope, match existing style, and
refactor only when requested or required.

## Recommended tier

Set **Default On** in Dashboard → Plugins. See [docs/tiers.md](../../docs/tiers.md).

## Rules

| File | Summary |
| --- | --- |
| `010-scope-discipline.mdc` | Stay within task scope; no drive-by refactors. |
| `020-readability.mdc` | Match existing naming, structure, and style. |
| `030-refactor-when-needed.mdc` | Refactor only when asked or correctness requires it. |

**Overlap:** **engineering-core** covers evidence and minimal change; this plugin
covers scope/readability/refactor discipline. Full review: **engineering-playbooks** `code-review`.

## Skill

`scope-and-style-review` — Use when reviewing a diff for scope creep or readability before merge.

## Context budget

Combined always-applied rule bodies must stay within **2048** UTF-8 bytes.

## Eval suite

Deterministic cases live in `evals/suites/code-quality/` in the marketplace repo.
