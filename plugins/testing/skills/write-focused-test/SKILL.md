---
name: write-focused-test
description: Use when adding or updating tests for a code change, or when the verification ladder requires tests before claiming done.
---

# Write focused test

## Preconditions

Read **testing** rules (`010-when-to-test`, `020-test-proportionality`) and the
**engineering-core** verification rule. Match the project's existing test
framework and directory layout — do not introduce a new runner.

## Scope

1. Identify behavior that changed (not implementation details).
2. Prefer one focused test per behavior over broad snapshot suites.
3. Skip tests for trivial renames or comment-only diffs unless rules require otherwise.

## Author

1. **Locate patterns** — find similar tests in the repo; copy structure and helpers.
2. **Name clearly** — test name states input and expected outcome.
3. **Arrange–act–assert** — minimal setup; no unrelated fixtures.
4. **Mock at boundaries** — I/O, network, clock; not internal private methods.
5. **High-risk paths** — auth, payments, migrations: add regression coverage when touched.

## Run

Follow the verification ladder (`030-verification-ladder`): run focused tests for
the change, then broader suites only when proportionality rules say so.

## Report

State which tests were added or updated, what you ran, and pass/fail outcome.
If the repo has no test framework, say so and document manual verification instead.
