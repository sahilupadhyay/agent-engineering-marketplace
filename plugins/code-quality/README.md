# code-quality

Default-on code quality discipline for Cursor sessions: stay in scope, match
existing style, and refactor only when requested or required.

## Recommended tier

Set **Default On** in Dashboard → Plugins. The `tier` field in
`plugin-meta.json` is documentation only; install mode is a team-dashboard
setting.

## Rules

| File | Summary |
| --- | --- |
| `010-scope-discipline.mdc` | Stay within task scope; no drive-by refactors. |
| `020-readability.mdc` | Match existing naming, structure, and style. |
| `030-refactor-when-needed.mdc` | Refactor only when asked or correctness requires it. |

## Context budget

Combined always-applied rule bodies must stay within **2048** UTF-8 bytes
(`contextBudget` in `plugin-meta.json`). See [docs/tiers.md](../../docs/tiers.md).

## Eval suite

See `evals/suites/code-quality/` in the marketplace repo for deterministic
content checks.
