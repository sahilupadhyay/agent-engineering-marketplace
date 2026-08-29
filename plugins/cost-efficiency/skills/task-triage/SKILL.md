---
name: task-triage
description: Use when the selected model and task complexity appear mismatched, or when the user asks which model tier fits the work.
---

# Task triage

## Assess complexity

Classify the request:

- **Light** — one file, obvious fix, docs/config, rename, Q&A
- **Mid** — multi-file, unfamiliar code, integration, non-trivial debug
- **Heavy** — architecture, production risk, security-critical, unclear root cause

## Compare to selection

If the user's selected model is heavier than needed, recommend switching down
and wait for confirmation before substantive work.

If the selected model is lighter than the task requires, recommend switching up
before deep implementation.

## Respond

State recommended tier, current selection (if known), one-line reason, and a
chooser when they differ. Do not proceed on a mismatched heavy model until the
user confirms.

## Correctness guard

Never downgrade model choice when correctness, security, or production risk is
in play. Cost savings must not skip investigation or verification.
