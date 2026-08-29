# Performance and efficiency

This marketplace optimizes for **correct results with minimal context and
cost**, not raw speed of token generation.

## Context efficiency

The `engineering-core` rule `050-context-efficiency.mdc` enforces:

- Search before reading whole files.
- Read symbols, not 300+ line dumps.
- Skip `node_modules`, venvs, build output, and generated code unless required.
- Prefer `rg`, `fd`, `jq`, and `head` over full command output.

Broader guidance:

- Install **stack plugins only when needed** (see [architecture.md](architecture.md)).
- Keep **Required** tier byte budgets tight — see [tiers.md](tiers.md) and
  `plugin-meta.json` `contextBudget`.
- Use **skills and commands** for procedural work; keep always-on rules
  single-purpose.

## Model and cost efficiency

Milestone 2 adds a **`cost-efficiency`** plugin (Default Off tier) with:

- Minimum capable model for the task.
- Never sacrifice correctness for cost.
- Never use an expensive model when a cheaper one suffices.

Until that plugin ships, apply principle 4 from [philosophy.md](philosophy.md)
manually: pick the simplest model that can complete the task reliably.

This marketplace does **not** ship a hook that reads Cursor's selected model —
there is no verified stable API for that today.

## Verification vs speed

The `engineering-core` verification rule requires evidence before claiming done.
Running focused tests beats skipping validation to "move faster."

See [evals.md](evals.md): deterministic evals catch authoring regressions; they
do not measure live agent latency or token usage.

## Related rules

| Topic | Location |
| --- | --- |
| Context efficiency | `plugins/engineering-core/rules/050-context-efficiency.mdc` |
| Evidence hierarchy | `plugins/engineering-core/rules/020-evidence-hierarchy.mdc` |
| Verification | `plugins/engineering-core/rules/040-verification.mdc` |
| Cost efficiency (planned) | `cost-efficiency` plugin — Milestone 2 |
