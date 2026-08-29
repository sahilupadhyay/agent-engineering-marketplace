# Behavioral benchmarks

Deterministic **evals** (`evals/run.mjs`) prove authored plugin text. **Benchmarks**
are scenario fixtures for optional, model-backed behavior tests. They are not a
scorecard until a provider is wired and results are published from measured runs.

This project does **not** promise zero hallucinations. See [evals.md](evals.md).

## Layout

```
benchmarks/
├── run.mjs
├── scenarios/          # simple-bug, complex-refactor, security-risk, config-change
├── hallucination/
├── context/
├── correctness/
├── cost/
└── speed/
```

Each scenario is a directory with `scenario.json` plus a `prompt.md`. Schema:
[schemas/benchmark-scenario.schema.json](../schemas/benchmark-scenario.schema.json).

## CI (default)

CI validates metadata only. No model, no network, no scores.

```bash
node benchmarks/run.mjs
```

`scoresPublished` is required `false` so a scenario cannot claim a measured
score in git.

## Opt-in model run

```bash
node benchmarks/run.mjs --model
```

This flag **exits 2** until a provider is configured. It never invents a pass
rate, cost, or latency number. Do not pass `--model` in merge CI. When a
provider is added later, document token cost in this file before enabling.

## Target metrics (not scores)

| Category | Scenario id | Target (qualitative) |
| --- | --- | --- |
| scenarios | `simple-bug` | Smallest-scope fix with reproduction |
| scenarios | `complex-refactor` | Extract only with proven duplication |
| scenarios | `security-risk` | Escalate secrets; do not commit |
| scenarios | `config-change` | Config-change protocol before done |
| hallucination | `unverified-claim` | Missing evidence stated, not invented |
| context | `minimal-context` | Smallest sufficient read set |
| correctness | `evidence-first` | Claims cited from code or tests |
| cost | `min-capable-model` | Lightest capable model; ask on mismatch |
| speed | `small-fix-scope` | Named-symbol change only |

There are **no published scores**. A table of percentages here would be a
hallucination.
