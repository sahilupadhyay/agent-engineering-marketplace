---
name: debug-incident
description: Use when investigating bugs, test failures, or unexpected runtime behavior.
---

# Debug incident

## Intake
- Capture expected vs actual behavior and reproduction steps.
- Identify scope: one file, one service, or cross-cutting.

## Investigate
1. Reproduce with the smallest command or test case.
2. Read errors and stack traces before changing code.
3. Form a hypothesis; change one variable at a time.
4. Add logging or breakpoints only where evidence is missing.

## Fix
- Prefer minimal fixes aligned with existing patterns.
- Add or adjust a focused test when behavior is regressing.

## Close
- State root cause, fix, and what you ran to verify.
