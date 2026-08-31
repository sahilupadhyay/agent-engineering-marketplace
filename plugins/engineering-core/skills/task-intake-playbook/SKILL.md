---
name: task-intake-playbook
description: Use when starting investigation or implementation on a non-trivial task before editing files.
---

# Task intake playbook

## Preconditions

Pairs with **engineering-core** task-intake and evidence rules. Config or infra
paths → load **config-change-review** after intake instead of skipping straight to
edits.

## Workflow

1. **Restate** — user goal, constraints, and done criteria in one paragraph.
2. **Locate** — find the existing implementation and patterns; search before reading
   whole files.
3. **Callers and tests** — inspect callers when relevant; identify tests to extend.
4. **Unknowns** — list gaps explicitly; do not start editing when investigation is
   incomplete.
5. **Plan** — smallest change surface; note verification steps from **testing**.
6. **Report** — what you found, what you will change, and what you will verify.

Never assume files, APIs, env vars, or cloud resources exist. State uncertainty;
do not fabricate. Escalate when production impact is unclear.
