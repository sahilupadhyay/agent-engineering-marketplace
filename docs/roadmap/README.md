# Catalog expansion roadmap

Executable workstreams so **other teams** can install this repo as a Cursor
**multi-plugin marketplace** (rules, skills, commands, hooks) without loading
every stack at once.

Reference compared: [agent-engineering-handbook](https://github.com/d-padmanabhan/agent-engineering-handbook)
(MIT, rules + skills + commands + MCP + hooks as a **single tree**).

**Do not copy that repository's rule text.** Author original, short, glob-scoped
plugins. Handbook `alwaysApply` cores (workflow, git, security, zero-trust) are
already covered in spirit by `engineering-core`, `security-core`, and
`git-workflow`.

## Alignment (honest)

| Handbook idea | This marketplace | Gap |
| --- | --- | --- |
| Multi-stack coverage | Per-plugin install + tiers | Need more **default-off** stack plugins |
| Always-on core | Required + Default On plugins with **byte budgets** | Keep cores small; never symlink a 50-rule tree |
| Skills + evals | `evals/run.mjs` deterministic | Keep; no Python eval runner |
| Bundled MCP server | **Rejected** ([mcp-governance.md](../mcp-governance.md)) | Integrations = skills-only |
| Docker / K8s / Go / Java / Vue / Angular | Missing or thin | Workstreams below |
| Postgres / SQL | Missing as plugins | `data-postgres`, `data-sql` |
| Databricks | Missing | `data-databricks` |
| Coralogix / Heap / SonarQube | Missing | Observability / quality plugins |
| Session audit / closeout | **Shipped** `session-closeout` | User also has `~/.cursor/rules/17-session-closeout.mdc` |

**Product constraint:** a marketplace for others fails if Default Off plugins
are `alwaysApply: true`. One plugin per concern. One PR per plugin (or tight
family) to avoid marketplace.json wars.

## Parallel execution contract

Each workstream agent **may only add**:

- `plugins/<plugin-name>/` (plugin.json, plugin-meta.json, README, rules and/or skills, optional hooks)
- `evals/suites/<plugin-name>/*.eval.json`

**Must not edit** in the same PR as another parallel agent:

- `.cursor-plugin/marketplace.json`
- `README.md`
- `CHANGELOG.md`
- `scripts/lib/detect-stack.mjs`

After plugins land, a **coordinator PR** adds marketplace entries, README
rows, CHANGELOG, and detect-stack signals.

Shared authoring: [authoring.md](../authoring.md), [tiers.md](../tiers.md).
Validate: `node scripts/validate.mjs && node --test && node evals/run.mjs`.

## Workstream index

| Plan | Plugins to add | File |
| --- | --- | --- |
| Frontend | `frontend-htmlcss`, `frontend-javascript`, expand `frontend-react`, `frontend-angular`, `frontend-vue` | [01-frontend.md](01-frontend.md) |
| Backend | expand `backend-node` / `backend-python`, add `backend-java`, `backend-go` | [02-backend.md](02-backend.md) |
| Databases | `data-postgres`, `data-mysql`, `data-dynamodb`, `data-redis` | [03-databases.md](03-databases.md) |
| Observability | `obs-coralogix`, `obs-heap` | [04-observability.md](04-observability.md) |
| Data platforms | `data-databricks` | [05-databricks.md](05-databricks.md) |
| Atlassian / quality | expand `jira-workflow`, add `atlassian-confluence`, `quality-sonarqube` | [06-atlassian-sonarqube.md](06-atlassian-sonarqube.md) |
| AWS | expand `cloud-aws` (do not rename) | [07-aws.md](07-aws.md) |
| Containers | `platform-docker`, `platform-kubernetes` | [08-docker-kubernetes.md](08-docker-kubernetes.md) |

## Install story for other teams (after public flip)

1. Add marketplace Git URL in Cursor **Settings → Plugins → Team Marketplaces**.
2. Map `plugin-meta.json` tiers to dashboard Required / Default On / Default Off.
3. Enable stack plugins that match the consumer repo (`scripts/detect-stack.mjs`
   **recommends only**).
4. Connect MCP servers in Cursor settings for Jira, Coralogix, Databricks, etc.
   Do not expect `mcp.json` inside these plugins.
