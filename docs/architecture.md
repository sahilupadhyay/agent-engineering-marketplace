# Architecture

The Agent Engineering Marketplace is a **multi-plugin Cursor repository**. Each
plugin installs independently so developers load only what their stack needs.

## Marketplace layers

```
                    GitHub
                      │
                      ▼
       ┌─────────────────────────────┐
       │ Agent Engineering Marketplace│
       └──────────────┬──────────────┘
                      │
          ┌───────────┼────────────┐
          ▼           ▼            ▼
       Core         Stack       Platform
          │           │            │
          ▼           ▼            ▼
    Engineering    Python       AWS
    Security       Node         Docker
    Quality        Go           K8s
    Testing        React        Terraform
    Git workflow   Java
                      │
                      ▼
              Minimal Context
                      │
                      ▼
                Task Analysis
                      │
             ┌────────┼────────┐
             ▼        ▼        ▼
           Simple   Normal   Critical
             │        │        │
             ▼        ▼        ▼
          Efficient  Balanced  Strong
             │        │        │
             └────────┼────────┘
                      ▼
                 Implementation
                      │
                      ▼
                 Verification
                      │
             ┌────────┴────────┐
             ▼                 ▼
          Verified        Human required
             │                 │
             ▼                 ▼
       Commit/PR          Stop + Ask
             │
             ▼
       Evidence-backed summary
```

**Core** plugins apply to every session. **Stack** plugins activate by glob or
user choice for a language or framework. **Platform** plugins cover cloud,
CI/CD, and deployment tooling.

## Plugin catalog

Forty plugins are listed in
[`.cursor-plugin/marketplace.json`](../.cursor-plugin/marketplace.json).
Responsibilities and non-goals: [plugin-roles.md](plugin-roles.md). Recommended
tiers live in each plugin's `plugin-meta.json` ([tiers.md](tiers.md)).

Do not fold stack-specific guidance into Required plugins—keep cores small and
enable matching default-off plugins per repository.

## Quality harness

Every plugin change passes the same machine-enforced contract:

1. **Structural validator** — [`scripts/validate.mjs`](../scripts/validate.mjs):
   manifests, frontmatter, single-responsibility rules, budget, duplicate
   detection, orphans.
2. **Deterministic evals** — [`evals/run.mjs`](../evals/run.mjs): content
   assertions on rules, skills, and commands (not live model behavior).
3. **CI** — [`.github/workflows/validate.yml`](../.github/workflows/validate.yml):
   validate, tests, evals, shellcheck on hooks, repo secret scan.

See [evals.md](evals.md) for honest limits on what evals can prove.

## Design constraints

- **Per-plugin install** — never one monolithic plugin for all stacks.
- **Zero runtime npm dependencies** — Node 20+ only for tooling.
- **Skills over bundled MCP servers** for integrations unless governance
  requirements change (see [mcp-governance.md](mcp-governance.md)).
- **Recommended tiers are documentation**, not enforced Cursor dashboard settings.
