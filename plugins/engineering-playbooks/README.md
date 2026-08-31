# engineering-playbooks

Default-off **skills-only** playbooks for debugging, review, architecture, and
incidents. No always-on rules — load skills when the task matches.

## Recommended tier

Set **Default Off** in Dashboard → Plugins. Enable when you want generic
engineering playbooks beyond core rules.

## Skills

`debug-incident` — Use when investigating bugs, test failures, or unexpected runtime behavior.
`code-review` — Use when reviewing a pull request, diff, or patch for correctness and risk.
`performance-review` — Use when assessing latency, throughput, memory, or cost of a change.
`data-access-review` — Use when reviewing database queries, migrations, or ORM access patterns.
`api-design` — Use when designing or changing HTTP/JSON APIs, routes, or contracts.
`threat-model` — Use when assessing security threats for a feature, service, or integration.
`architecture-intake` — Use when starting a multi-component feature and need a structured architecture pass.
`resilience-review` — Use when reviewing retries, timeouts, circuit breakers, or failure handling.
`incident-triage` — Use when responding to production incidents, alerts, or customer-impacting outages.
`github-ci` — Use when designing or troubleshooting GitHub Actions workflows and CI pipelines.
`elicitation` — Use when requirements are ambiguous and you need structured questions before building.

## Not included

Commit/PR workflow is covered by **git-workflow** commands and rules — do not
duplicate here.

## Context budget

Zero always-applied rule bytes (skills only).

## Eval suite

Deterministic cases live in `evals/suites/engineering-playbooks/` in the marketplace repo.

## Related plugins

- **git-workflow** — commit/PR commands (no duplicate commit-and-pr skill here)
- **testing** — verification ladder and `write-focused-test`
- **atlassian-confluence** / **jira-workflow** — Atlassian MCP workflows
