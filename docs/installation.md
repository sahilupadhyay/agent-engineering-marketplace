# Installation

## Team marketplace import

After the repository is **public**, add it in Cursor Dashboard → Plugins → Team
Marketplaces using the Git URL:

`https://github.com/sahilupadhyay/agent-engineering-marketplace`

Map `plugin-meta.json` tiers to dashboard settings per [tiers.md](tiers.md):

| `plugin-meta.json` tier | Dashboard setting |
| --- | --- |
| `required` | Required |
| `default-on` | Default On |
| `default-off` | Default Off |

## Local development symlink

```bash
./scripts/link-local.sh
```

This links the repo into `~/.cursor/plugins/local/agent-engineering-marketplace`.
Restart Cursor or reload plugins, then add the local marketplace in Settings →
Plugins.

## Stack detection (recommend only)

From a project directory (or pass `--root`), detect manifest files and suggest
optional stack plugins. The script **never** installs plugins — it prints JSON for
you to act on in Cursor Settings → Plugins.

```bash
node /path/to/agent-engineering-marketplace/scripts/detect-stack.mjs --root .
node scripts/detect-stack.mjs --root . --pretty
```

Example output fields:

| Field | Meaning |
| --- | --- |
| `signals` | Manifest files found (`package.json`, `pyproject.toml`, …) |
| `recommended` | Marketplace plugin names that may fit (for example `frontend-react`) |
| `policy` | Reminder to prompt the user; no auto-install |

Integration plugins are **skills-only**; connect MCP servers in Cursor settings
([mcp-governance.md](mcp-governance.md)).

## Marketplace submission

See [marketplace-submit.md](marketplace-submit.md). Maintainer steps: [PLAN.md](../PLAN.md).
