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

The **`cost-efficiency`** plugin (Default On tier, always-applied rule) instructs
the agent to:

- Classify each query (Light / Mid / Heavy, and Ask / Agent / Plan).
- Hold tools until the user confirms stay, upgrade, downgrade, or a mode change.
- Never sacrifice correctness for cost.

This marketplace does **not** ship a hook that reads or changes Cursor's
selected model — there is no verified stable API for that today. The running
model infers mismatch from the task and must wait for the user to switch.

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
| Cost efficiency | `plugins/cost-efficiency/rules/010-min-capable-model.mdc` |
