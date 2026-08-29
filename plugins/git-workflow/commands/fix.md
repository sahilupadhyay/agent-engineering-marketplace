---
name: fix
description: Investigate a defect, implement the smallest safe fix, add regression coverage, and verify with focused tests.
---

# Fix

Investigate before modifying.

Workflow:

1. Reproduce.
2. Identify root cause.
3. Inspect relevant tests.
4. Implement the smallest safe fix.
5. Add regression coverage.
6. Run focused tests.
7. Run typecheck/lint where appropriate.
8. Review git diff.

Do not perform unrelated refactoring.
