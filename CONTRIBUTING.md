# Contributing

Read this before opening a pull request. Structural authoring rules, context
budgets, duplicate detection, and marketplace README requirements are enforced
locally by `node scripts/validate.mjs`.
CI runs the same checks on every pull request. Run them locally before pushing:

```bash
node scripts/validate.mjs && node evals/run.mjs && node --test && node scripts/secret-scan-repo.mjs
```

## Branching

Cut work from an updated `main`:

```bash
git checkout main && git pull --ff-only origin main
git checkout -b feat/<nn>-<slug>
```

Use `feat/<nn>-<slug>` (two-digit sequence, kebab-case slug). One concern per
pull request.

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/) in prose only.
There is no commitlint, husky, or other hook that enforces this.

Format: `feat|fix|docs|test|ci|chore: <subject>` (scope optional). Keep the
subject at or under 72 characters.

Examples:

- `docs: rewrite README for honest milestone status`
- `docs: add repository governance files`

## License

Contributions are accepted under the existing MIT [LICENSE](LICENSE).

## Authoring contract

Plugin, rule, skill, command, and hook requirements live in
[docs/authoring.md](docs/authoring.md). Recommended tiers and context budgets
live in [docs/tiers.md](docs/tiers.md). JSON Schemas under [schemas/](schemas/)
encode the same contract. Run `node scripts/validate.mjs` before opening a PR
that adds or changes plugin content. Budget, similarity, and CI are enforced once
PR 5 merges.

## Required status checks

For repository admins after PR 5 merges:

1. Open **Settings → Branches** → branch protection rule for `main`
2. Enable **Require status checks to pass before merging**
3. Require check: **`Validate / validate`**
4. Enable **Require branches to be up to date before merging** (recommended)

Status checks appear only after the workflow has run at least once on a pull request.

Plugin pull requests must include or update eval cases under
`evals/suites/<plugin-name>/`. See [docs/evals.md](docs/evals.md).

## Hard rules for every later PR

- No third-party runtime dependencies.
- No competitor product names or prior-art repository names in committed files.
- Claims about Cursor behavior must cite a current docs URL.
- Do not add `plugins/` or `.cursor-plugin/marketplace.json` unless this is a
  designated plugin pull request. Follow `plugins/engineering-core/` as the
  reference layout.
- Skills must not use `alwaysApply`, `globs`, or `priority` (dead config). See
  [docs/authoring.md](docs/authoring.md).
- Match tier and budget rules in [docs/tiers.md](docs/tiers.md) when adding
  `plugin-meta.json`.
- Every marketplace-listed plugin must include a `README.md` at the plugin root.

## MCP plugins

No plugin in this repository ships `mcp.json` today. Before adding one, read
[docs/mcp-governance.md](docs/mcp-governance.md) and complete this checklist in
the pull request description:

- [ ] Skill-only workflow is insufficient (explain why)
- [ ] Server source is pinned and team-approved
- [ ] No secrets or credentials in committed files
- [ ] Plugin README documents connection, data flows, and disable path
- [ ] Eval suite updated; hooks added if MCP execution is risky
- [ ] `SECURITY.md` updated when credentials or PII are involved

## Pull request checklist

Match the items in [`.github/pull_request_template.md`](.github/pull_request_template.md):

- CHANGELOG updated
- no new runtime dependencies
- no competitor or prior-art names in committed files
- no secrets
- Cursor behavior claims cite a current docs URL
- no `plugins/` or marketplace manifest unless this is a designated plugin PR

## Planned layout

Milestone 1 adds Cursor plugins (`engineering-core`, `security-core`,
`git-workflow`) and a marketplace manifest. `engineering-core` and the root
manifest are in the tree; follow that layout for new plugins.

## Security and conduct

- Security reports: [SECURITY.md](SECURITY.md)
- Conduct: [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
