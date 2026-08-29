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

## After going public

In GitHub **Settings → General → Danger Zone**, change visibility to **Public**.
Enable secret scanning and private vulnerability reporting under **Settings →
Security**.
