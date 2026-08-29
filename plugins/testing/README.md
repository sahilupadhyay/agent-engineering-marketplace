# testing

Default-on testing discipline for Cursor sessions: when to test, proportionality,
and the verification ladder (§9).

## Recommended tier

Set **Default On** in Dashboard → Plugins. The `tier` field in
`plugin-meta.json` is documentation only; install mode is a team-dashboard
setting.

## Rules

| File | Summary |
| --- | --- |
| `010-when-to-test.mdc` | When to add, update, or run tests. |
| `020-test-proportionality.mdc` | Match test effort to change risk and scope. |
| `030-verification-ladder.mdc` | Syntax → typecheck → lint → tests → build before done. |

## Context budget

Combined always-applied rule bodies must stay within **2048** UTF-8 bytes
(`contextBudget` in `plugin-meta.json`). See [docs/tiers.md](../../docs/tiers.md).

## Eval suite

See `evals/suites/testing/` in the marketplace repo for deterministic
content checks.
