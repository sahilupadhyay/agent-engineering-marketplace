---
name: code-review
description: Use when reviewing a pull request, diff, or patch for correctness and risk.
---

# Code review

## Scope
- Read the change description and diff holistically before nitpicks.

## Checklist
1. **Correctness** — logic, edge cases, error handling.
2. **Security** — auth, input validation, secrets, injection.
3. **Tests** — behavior covered; no silent weakening of assertions.
4. **API** — breaking changes called out; migrations noted.
5. **Ops** — logging, metrics, config, rollback implications.

## Output
- Blockers, should-fix, and nits with file references.
- Do not rewrite the author's style unless it hides bugs.
