# testing

Default-on testing discipline for Cursor sessions: when to test, proportionality,
and the verification ladder.

## Recommended tier

Set **Default On** in Dashboard → Plugins. See [docs/tiers.md](../../docs/tiers.md).

## Rules

| File | Summary |
| --- | --- |
| `010-when-to-test.mdc` | When to add, update, or run tests. |
| `020-test-proportionality.mdc` | Match test effort to change risk and scope. |
| `030-verification-ladder.mdc` | Syntax → typecheck → lint → tests → build before done. |

**Ownership:** **engineering-core** `040-verification` points here for the ordered ladder when both plugins are enabled.

## Skill

`write-focused-test` — Use when adding or updating tests for a behavior change.

## Command

`/verify` — Walk the verification ladder and report what ran (read-only unless user asks to fix failures).

## Context budget

Combined always-applied rule bodies must stay within **2048** UTF-8 bytes.

## Eval suite

Deterministic cases live in `evals/suites/testing/` in the marketplace repo.
