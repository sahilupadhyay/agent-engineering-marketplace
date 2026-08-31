# Maintainer plan

Internal status and roadmap. Consumer docs ([README.md](README.md), plugin READMEs)
describe **capabilities only**—not milestone tracking.

## Completed

### Milestone 1 — Core marketplace

- Required plugins: `engineering-core`, `security-core`
- Default-on plugins: `git-workflow`, `code-quality`, `testing`
- Root `.cursor-plugin/marketplace.json`, validator, eval harness, CI
- Zero third-party runtime dependencies (Node 20+ tooling only)

### Milestone 2 — Governance and quality

- MCP governance (skills-only integrations, no bundled MCP servers)
- Secret scan, shellcheck on hooks, duplicate detection, context budgets
- Release policy, marketplace submission checklist

### Milestone 3 — Catalog expansion (31 plugins)

- Default-off stack plugins: frontend (HTML/CSS, JS/TS, React, Angular, Vue),
  backend (Node, Python, Java, Go), data (Postgres, MySQL, DynamoDB, Redis,
  Databricks), cloud/containers (`cloud-aws`, `platform-docker`,
  `platform-kubernetes`), integrations (Jira, Confluence, diagrams, API docs,
  Coralogix, Heap, SonarQube)
- `session-closeout` default-on plugin
- `scripts/detect-stack.mjs` (recommend only)
- Behavioral benchmark harness (metadata validation in CI)

## In progress — Production readiness (sequenced PRs)

| PR | Scope | Status |
| --- | --- | --- |
| A | Capability-only README/docs, `PLAN.md`, `docs/plugin-roles.md` | Complete (PR #28) |
| B | Dedupe verification/SQL/k8s hooks; non-goals in plugin-roles | Complete (PR #29) |
| C | Extend `security-core` protect-shell (DB/cache/S3 deletes); tests | Complete (PR #30) |
| D | Handbook-gap plugins (8 plugins) | Complete (PR #32) |
| E | `engineering-playbooks` default-off (11 generic skills) | Complete (PR #31) |
| Confluence deepen | `atlassian-confluence` skill + evals | Complete (PR #33) |
| Plugin deepen | Waves 1–6 skills, evals, `/verify` | Complete (PR #34) |
| Optional deepen | `task-intake-playbook`, `jira-comment-pr` | Complete (PR #35) |

### Milestone 4 — v1.0.0 release and publication

- [x] 40 plugins, 245 eval cases, CI merge gate green
- [x] CHANGELOG `[1.0.0]` section and manifest versions at `1.0.0`
- [x] `v1.0.0` tag and GitHub Release
- [ ] Repository **public** (Settings → General → Danger Zone)
- [ ] GitHub secret scanning + private vulnerability reporting enabled
- [ ] Submit at [cursor.com/marketplace/publish](https://cursor.com/marketplace/publish)
- [ ] Record marketplace listing URL in README (no invented install counts)

## Quality flags (known)

- **Thin stack rules** (~18 lines): intake discipline by design; deepen via skills, not fat always-on rules.
- **Overlap (PR B):** `engineering-core` verification vs `testing` ladder; postgres/mysql SQL globs; k8s hooks in `cloud-aws` vs `platform-kubernetes`.
- **Local rules not shipped:** advisor persona, Frodo skill-discovery (too opinionated / org-specific).
- **Local skills gaps:** debugging, code-review, performance, generic database (addressed in **engineering-playbooks** PR E).

## Future (post v1)

From [agent-engineering-handbook](https://github.com/d-padmanabhan/agent-engineering-handbook) and gap analysis—**original wording only**:

- Optional later: Cloudflare, Okta, Kafka, Snowflake, Ansible
- Authz model (PBAC/RBAC) skill
- Eventing/outbox, contract tests (Pact), feature flags / SLO skills
- Migration expand/contract skill
- Core Web Vitals skill on frontend plugins

## Roadmap workstream detail

Historical workstream specs (frontend, backend, databases, observability, AWS,
containers) live under [docs/roadmap/](docs/roadmap/). Treat them as authoring
references for maintainers, not consumer-facing product docs.
