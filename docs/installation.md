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

## Publish to Cursor Marketplace

Official publish flow: [cursor.com/marketplace/publish](https://cursor.com/marketplace/publish)

## Pre-public checklist

Before flipping repository visibility to public:

1. CI green on `main` (`Validate / validate` workflow).
2. Run locally:

   ```bash
   node scripts/validate.mjs && node evals/run.mjs && node --test && node scripts/secret-scan-repo.mjs
   ```

3. Review `git grep` for accidental secrets; hook and test fixtures must use
   obviously fake tokens only.
4. Read rules, skills, and commands for personal emails or internal credentials.
5. Confirm `v1.0.0` tag exists and manifest versions match ([release.md](release.md)).

## After going public

In GitHub **Settings → General → Danger Zone**, change visibility to **Public**.
Then, in order:

1. Apply branch protection:

   ```bash
   node scripts/setup-branch-protection.mjs
   ```

2. Enable secret scanning and private vulnerability reporting under **Settings →
   Security**.
3. Submit to the Cursor marketplace ([marketplace-submit.md](marketplace-submit.md)).
