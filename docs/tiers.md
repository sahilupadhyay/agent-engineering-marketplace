# Recommended tiers

This document defines **recommended** install tiers for plugins in this
marketplace. It is prose and JSON Schema until pull requests 3 and 4 add a
machine validator and CI. Until then, reviewers enforce this contract manually.

## Dashboard settings vs repository metadata

Cursor **Required**, **Default On**, and **Default Off** are team-admin
installation modes configured in Dashboard → Plugins. They are **not** fields
you can put in `marketplace.json` or `plugin.json`. See the
[Cursor plugins docs](https://cursor.com/docs/plugins) and
[plugins reference](https://cursor.com/docs/reference/plugins).

This repository records a **recommendation** only, in each plugin’s
`plugin-meta.json` (not inside `.cursor-plugin/plugin.json`). Team admins map
that recommendation to dashboard settings when they import the marketplace.

## Tier definitions

Use exactly these values (also used in the
[plugin proposal issue form](../.github/ISSUE_TEMPLATE/plugin-proposal.yml)):

### `required`

- May ship rules with `alwaysApply: true`.
- Combined always-applied rule bytes for the plugin must stay **under 4096**.
- Use for small, stack-agnostic guidance every session should load (for example
  evidence hierarchy, minimal change discipline).

### `default-on`

- May ship rules with `alwaysApply: true`.
- Combined always-applied rule bytes must stay **under 2048**.
- Use for workflow helpers most developers want without forcing uninstall
  (for example git and PR conventions).

### `default-off`

- **Zero** rules with `alwaysApply: true`.
- Deliver guidance with glob-scoped rules, skills, or commands only.
- Use for stack-specific plugins (React, AWS, Python, and similar) so a
  frontend developer does not load backend-only always-on context.

## `contextBudget`

Optional field in `plugin-meta.json`. Integer byte cap on always-applied rule
content for that plugin. Defaults to the tier maximum above when omitted. Must
not exceed the tier cap. For `default-off`, the cap is **0** (no always-applied
bytes).

The future validator sums the body bytes of every rule with
`alwaysApply: true` in the plugin and compares the total to `contextBudget` or
the tier default. That check lands in pull request 4; it is **not** enforced
yet.

## `stackTags`

Optional string array in `plugin-meta.json` (for example `node`, `react`,
`aws`). Used for documentation and future stack-detection tooling. Not a Cursor
manifest field.

## Rule and skill pairings

When a domain needs both always-on principles and a long playbook, split them:

- **Rule** — short principles, budgeted, `alwaysApply` or glob-scoped.
- **Skill** — playbook loaded on demand when the agent selects it or the user
  invokes `/skill-name`.

A skill cannot be always-on: the skill frontmatter schema has no `alwaysApply`
field ([plugins reference](https://cursor.com/docs/reference/plugins)).

Paired rule and skill files legitimately share vocabulary. Declare each pair in
`plugin-meta.json`:

```json
{
  "tier": "required",
  "pairings": [
    {
      "rule": "rules/010-task-intake.mdc",
      "skill": "skills/task-intake/SKILL.md"
    }
  ]
}
```

The duplicate detector in pull request 4 treats declared pairs as expected
overlap. Undeclared overlap between rules or skills still fails CI once that
check exists.

## Why tiers exist

Multiple stacks benefit from the same marketplace without every consumer
loading every always-on rule at once. Tiers plus per-plugin install boundaries
are the mechanical answer to selective context loading—without inventing
manifest fields Cursor does not support.

## Schema

Encode `plugin-meta.json` with
[schemas/plugin-meta.schema.json](../schemas/plugin-meta.schema.json).
