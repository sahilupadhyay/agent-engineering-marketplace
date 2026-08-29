# MCP governance

This marketplace ships **rules, skills, commands, and hooks** first. Model Context
Protocol (MCP) server configuration is optional and tightly gated.

## Default posture

1. **No bundled MCP servers** in marketplace plugins unless every inclusion
   requirement below is satisfied and reviewed.
2. **Integration plugins** (Jira, diagrams, API docs, etc.) ship **skills only**.
   They instruct the agent to use MCP tools the user already connected in Cursor —
   not servers shipped inside the plugin repo.
3. **Phase 2 pattern** (see [architecture.md](architecture.md)): present MCP tools
   at runtime; do not commit `mcp.json` unless the plugin truly needs a curated
   default server list for a team marketplace.

Cursor discovers optional `mcp.json` per plugin when present. See the
[plugins reference](https://cursor.com/docs/reference/plugins).

## When `mcp.json` is allowed

A pull request may add or change `mcp.json` only when **all** of the following
hold:

| Requirement | Rationale |
| --- | --- |
| Skill-only workflow is insufficient | User-connected MCP cannot express the workflow |
| Server is team-approved | Security and procurement signed off |
| No secrets in repo | Credentials come from env or Cursor MCP auth, never committed |
| Read-only or least-privilege default | Dangerous tools require explicit user action |
| Documented in plugin README | Operators know what connects and why |
| Eval cases cover skill triggers | Deterministic harness still passes |
| Hooks if execution is risky | e.g. extend `protect-shell` patterns for destructive MCP side effects |

Reject proposals that duplicate a server the user can add once in **Cursor Settings
→ MCP**.

## Security review checklist

Before merge, confirm:

- [ ] Server source URL or package is pinned and auditable
- [ ] Plugin README lists data flows (what leaves the workspace)
- [ ] No broad filesystem or shell tools without hook guards
- [ ] `SECURITY.md` updated if the server handles credentials or PII
- [ ] Maintainer can disable the plugin without breaking Required-tier plugins

## Contribution workflow

1. Open a **plugin proposal** issue tagged `mcp` and `security`.
2. Complete the MCP checklist in [CONTRIBUTING.md](../CONTRIBUTING.md).
3. Land rules/skills/evals first; add `mcp.json` in the same PR or a follow-up
   only after checklist sign-off.

## Related docs

- [authoring.md](authoring.md) — component discovery and forbidden patterns
- [architecture.md](architecture.md) — Core / Stack / Platform layers
- [tiers.md](tiers.md) — context budgets; MCP-heavy plugins stay Default Off
