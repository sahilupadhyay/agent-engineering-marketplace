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
    Security       Node         GitHub
    Quality        Go           Docker
    Testing        React        K8s
    Git workflow   Java         Terraform
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

## Shipped today (Milestone 1)

| Plugin | Recommended tier | Role |
| --- | --- | --- |
| `engineering-core` | Required | Task intake, evidence, minimal change, verification, context efficiency |
| `security-core` | Required | Security rules + POSIX hooks |
| `git-workflow` | Default On | Commit identity, branch/PR rules, review commands |

Manifest: [`.cursor-plugin/marketplace.json`](../.cursor-plugin/marketplace.json).
Tier metadata lives in each plugin's `plugin-meta.json` (see [tiers.md](tiers.md)).

## Planned (Milestone 2+)

| Plugin | Tier | Milestone |
| --- | --- | --- |
| `code-quality` | Default On | 2 |
| `testing` | Default On | 2 |
| `cost-efficiency` | Default Off | 2 |
| Stack plugins (`backend-node`, `backend-python`, …) | Default Off | 3 |
| `cloud-aws` | Default Off | 3 |

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
  requirements change (see future [mcp-governance.md](mcp-governance.md)).
- **Recommended tiers are documentation**, not enforced Cursor dashboard settings.
