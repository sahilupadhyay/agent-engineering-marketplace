# Contributing

This document is the quality contract for this repository until a machine
validator exists. Read it before opening a pull request.

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

## Hard rules for every later PR

- No third-party runtime dependencies.
- No competitor product names or prior-art repository names in committed files.
- Claims about Cursor behavior must cite a current docs URL.
- Do not add `plugins/` or `.cursor-plugin/marketplace.json` until the
  designated plugin pull requests.
- Skills must not use `alwaysApply`, `globs`, or `priority` (dead config).

## Pull request checklist

Match the items in [`.github/pull_request_template.md`](.github/pull_request_template.md):

- CHANGELOG updated
- no new runtime dependencies
- no competitor or prior-art names in committed files
- no secrets
- Cursor behavior claims cite a current docs URL
- no `plugins/` or marketplace manifest unless this is a designated plugin PR

## Planned layout

Milestone 1 will add Cursor plugins (`engineering-core`, `security-core`,
`git-workflow`), a marketplace manifest, and a local validator. Those files
are not in the tree yet. Do not add them in a drive-by PR.

## Security and conduct

- Security reports: [SECURITY.md](SECURITY.md)
- Conduct: [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
