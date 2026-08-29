# Deterministic evals

Evals prove **authored content** matches checkable policy claims. They do not
measure whether Cursor activated a rule or skill in a session.

## Evals vs validator

| Layer | Tool | Question |
| --- | --- | --- |
| Structural | `node scripts/validate.mjs` | Is the plugin valid JSON, frontmatter, budget, duplicates, orphans? |
| Semantic | `node evals/run.mjs` | Does authored text state the policy we claim? |

Run both before opening a plugin pull request:

```bash
node scripts/validate.mjs && node evals/run.mjs && node --test
```

## Writing a case

One `*.eval.json` file per case under `evals/suites/<plugin-name>/`. Each file
must validate against [schemas/eval-case.schema.json](../schemas/eval-case.schema.json).

Required fields: `id`, `plugin`, `claim`, `activation` (always `"unknown"`),
`target`, and `assert`.

`claim` must describe something checkable without a model. `assert` must be
deterministic (`regex`, `contains`, `notContains`, `notRegex`, or `pathsExist`).

## Assertion types

- **regex** / **notRegex** — `pattern` plus optional `flags` (`i`, `m`, `s`).
- **contains** / **notContains** — substring match; `ignoreCase` optional on contains.
- **pathsExist** — scan target text for backtick paths and relative markdown links;
  resolve under the plugin directory (default) or repo root when `root: "repo"`.

## Honest limits

Cursor does not expose whether a rule or skill activated in a session.
`activation` is always `unknown` in eval cases. Evals prove authored markdown,
not runtime behavior. Claiming measured activation would be the hallucination
this marketplace exists to prevent.

## Merge gate

From PR 7 onward, every marketplace plugin must have
`evals/suites/<plugin-name>/` with at least one `*.eval.json`. CI runs
`node evals/run.mjs` on every pull request. Plugin content changes that break a
claim fail CI — update eval cases when you change governed prose.

## Out of scope

Model-backed lift tests, API keys, and network calls are not part of Milestone 1
eval CI.
