# Authoring contract

This document defines how to author plugins, rules, skills, commands, and
hooks for this marketplace. JSON Schemas under [schemas/](../schemas/) encode
the same contract. Structural validation, budgets, duplicate detection, and CI are
enforced; see [CONTRIBUTING.md](../CONTRIBUTING.md).

Every claim about Cursor behavior below cites current documentation. If Cursor
changes, update the doc URL—not guesswork.

## Plugin layout

Reference plugin: `plugins/engineering-core/`. Each plugin follows this layout:

```text
plugins/<plugin-name>/
├── .cursor-plugin/
│   └── plugin.json          # Cursor manifest (documented fields only)
├── plugin-meta.json         # tier, contextBudget, stackTags, pairings
├── rules/*.mdc
├── skills/<name>/SKILL.md
├── commands/*.md
├── hooks/hooks.json
├── hooks/*.sh
└── README.md
```

Multi-plugin repos also ship `.cursor-plugin/marketplace.json` at the repository
root ([plugins reference](https://cursor.com/docs/reference/plugins)).

Add new plugins only in designated plugin pull requests; follow
`plugins/engineering-core/` as the reference layout.

## Manifests

### `marketplace.json`

Required: `name`, `owner.name`, `plugins[]`. Each entry requires `name` and
`source` (directory path or object with `path`). Schema:
[schemas/marketplace.schema.json](../schemas/marketplace.schema.json).

### `plugin.json`

Required: `name` (kebab-case). Optional fields are limited to those documented
by Cursor (description, version, author, component path overrides, variables,
and similar). Schema:
[schemas/plugin.schema.json](../schemas/plugin.schema.json).

Do **not** add `tier`, `installMode`, or other undocumented keys. Cursor
manifests reject unknown properties; put extra metadata in `plugin-meta.json`.

### `plugin-meta.json`

Repository-only metadata beside `plugin.json`. Required: `tier`
(`required` | `default-on` | `default-off`). See [tiers.md](tiers.md). Schema:
[schemas/plugin-meta.schema.json](../schemas/plugin-meta.schema.json).

## Rules

- File extension: `.mdc` under `rules/`.
- Filename: numeric prefix for stable load order, for example
  `010-task-intake.mdc`, `020-evidence.mdc`.
- **Single responsibility:** one top-level `#` heading per file; keep
  always-applied text short (budgets in [tiers.md](tiers.md)).
- Frontmatter schema: [schemas/rule.schema.json](../schemas/rule.schema.json).
  Required: `description`. Optional: `alwaysApply` (boolean), `globs` (string
  or array).

Rules with `alwaysApply: true` count toward the plugin’s context budget. Rules
on `default-off` plugins must not set `alwaysApply: true`.

## Skills

Skills are **on-demand only**. The agent loads them when selected or when the
user types `/skill-name` ([plugins reference](https://cursor.com/docs/reference/plugins)).

- One skill per directory: `skills/<name>/SKILL.md`.
- Frontmatter schema: [schemas/skill.schema.json](../schemas/skill.schema.json).
  Required: `name`, `description`.
- `description` must include a **Use when** trigger phrase so selection is
  unambiguous.
- Long playbooks belong in `skills/<name>/references/`, not in the rule layer.

### Forbidden skill frontmatter (dead config)

Do **not** put `alwaysApply`, `globs`, or `priority` in skill frontmatter. They
are not part of the skill schema and are silently ignored by Cursor—misleading
dead configuration. The future validator rejects them in pull request 3.

## Rule + skill pairing

When both a short principle and a long playbook are needed:

1. Put principles in a rule (budgeted, `alwaysApply` or glob-scoped).
2. Put the playbook in a skill (on demand).
3. Declare the pair in `plugin-meta.json` `pairings` so duplicate detection
   (pull request 4) does not flag intentional overlap.

## Commands

Agent-executable command files under `commands/`. Extensions: `.md`, `.mdc`,
`.markdown`, or `.txt` ([plugins reference](https://cursor.com/docs/reference/plugins)).

Frontmatter schema: [schemas/command.schema.json](../schemas/command.schema.json).
Required: `name`, `description`. Commands are not a substitute for always-on
rules.

## Hooks

Wire automation in `hooks/hooks.json` using Cursor’s **camelCase** event names
inside `{"version": 1, "hooks": {...}}`. Schema:
[schemas/hooks.schema.json](../schemas/hooks.schema.json).

This is **not** the Claude-format `hooks.json` some installed plugins also
ship. Use the Cursor event list from the
[plugins reference](https://cursor.com/docs/reference/plugins) (for example
`beforeShellExecution`, `beforeReadFile`, `preToolUse`, `afterFileEdit`,
`sessionStart`, `stop`).

Hook scripts:

- Prefer POSIX `sh` with `#!/bin/sh`.
- Do not require Python or other runtimes; optional escalation to `python3` or
  `gitleaks` when present on the host is acceptable.
- Every `command` path in `hooks.json` must resolve to an existing script
  (orphan detection arrives in pull request 3).
- Hook stdin/stdout behavior and fixture tests arrive with security hooks in
  pull request 9.

## Component discovery

When `plugin.json` does not override paths, Cursor discovers components from
default folders: `rules/`, `skills/*/SKILL.md`, `commands/`, `hooks/hooks.json`,
`mcp.json` ([plugins reference](https://cursor.com/docs/reference/plugins)).

## Schemas in this repository

| Schema | Purpose |
| --- | --- |
| [marketplace.schema.json](../schemas/marketplace.schema.json) | Root marketplace manifest |
| [plugin.schema.json](../schemas/plugin.schema.json) | Per-plugin Cursor manifest |
| [plugin-meta.schema.json](../schemas/plugin-meta.schema.json) | Tier, budget, pairings |
| [rule.schema.json](../schemas/rule.schema.json) | Rule YAML frontmatter |
| [skill.schema.json](../schemas/skill.schema.json) | Skill YAML frontmatter |
| [command.schema.json](../schemas/command.schema.json) | Command YAML frontmatter |
| [hooks.schema.json](../schemas/hooks.schema.json) | Cursor `hooks/hooks.json` |

Eval-case schema is intentionally **not** included here; it ships in pull
request 7 with the eval harness.

## Forbidden in every pull request

- Third-party runtime dependencies (no npm packages for validation in this repo).
- Competitor product names or prior-art repository names in committed files.
- Undocumented Cursor manifest fields (especially fake install-mode keys).
- Secrets or credentials in rules, skills, hooks, or fixtures.
- Claims about Cursor behavior without a current docs URL.

## Enforcement timeline

| Check | Pull request |
| --- | --- |
| Schema validation, frontmatter lint, orphan paths | 3 (`feat/03-validator-core`) |
| Context budgets, duplicate detection, pairing waivers | Enforced locally by `node scripts/validate.mjs` |
| CI merge gate | Enforced by GitHub Actions (`Validate / validate`) once PR 5 merges |
| Deterministic eval cases | 7 (`feat/07-eval-harness`) |

Structural validation, context budgets, duplicate detection, and CI run today.
Deterministic eval cases arrive in PR 7. Reviewers also use
[CONTRIBUTING.md](../CONTRIBUTING.md) and
[.github/pull_request_template.md](../.github/pull_request_template.md).
