# session-closeout

Default-on plugin. One always-on rule: after Agent-mode work, report skills used,
confidence, a 1–5 quality self-score, security gaps, performance notes, and
possible vulnerabilities.

Scores are **self-assessed for this session**, not measured benchmarks. See
[docs/evals.md](../../docs/evals.md) and [docs/benchmarks.md](../../docs/benchmarks.md).

## Recommended tier

Set **Default On** in Dashboard → Plugins. See [docs/tiers.md](../../docs/tiers.md).

## Rule

`010-session-closeout.mdc` — always-on closeout table after Agent-mode tasks.

**Non-goals:** No skill (rule is sufficient). Do not invent benchmark scores.

## Context budget

Combined always-applied rule bodies must stay within **2048** UTF-8 bytes.

## Eval suite

Deterministic cases live in `evals/suites/session-closeout/` in the marketplace repo.
