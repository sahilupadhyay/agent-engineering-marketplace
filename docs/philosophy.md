# Philosophy

This project follows seven principles:

1. Correctness over speed.
2. Evidence over assumptions.
3. Minimal context over maximum context.
4. Minimal capable model over maximum model.
5. Deterministic automation over probabilistic instructions.
6. Human approval for consequential decisions.
7. Explicit verification over "looks correct."

The most important idea behind the marketplace:

> **Don't make the agent think more. Make the agent need to think less.**

Good tooling should remove unnecessary work from the agent rather than simply
giving it more capabilities.

## How principles map to plugins

| Principle | Primary enforcement |
| --- | --- |
| Correctness, evidence, verification | `engineering-core` rules |
| Minimal context | `engineering-core` context-efficiency rule |
| Minimal capable model | `cost-efficiency` plugin (Default On, always-applied router) |
| Deterministic automation | Validator, eval harness, CI |
| Human approval | `engineering-core` escalation rule (`060-human-escalation.mdc`) |
| Security and supply chain | `security-core` rules and hooks |

See [architecture.md](architecture.md) for the full marketplace layout.
