---
name: verify
description: Walk the verification ladder for this repo and report what ran and the outcome.
---

# Verify

Follow the **verification ladder** below before claiming done. Run project checks in
this order when available:

1. Syntax / parse
2. Typecheck
3. Lint
4. Focused tests for the change
5. Build or package step

Stop at the first failure; fix and rerun from that step. Skip steps the project
does not define. Report each step you ran and the result.

Do not modify source files unless the user asked you to fix failures.
