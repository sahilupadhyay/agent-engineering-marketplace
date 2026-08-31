---
name: task-triage
description: Use when choosing model tier or Cursor mode, or when the current model looks too weak or too strong for the query.
---

# Task triage

Classify the query, recommend a change only on mismatch, and hold until the
user confirms. You cannot switch the picker or Cursor mode.

## Classify

- **Simple** — single file, config, docs → Light model; Ask if read-only.
- **Normal** — multi-file, familiar patterns → Mid model; Agent if writing.
- **Critical** — security, prod, unclear architecture → Heavy model; Plan if
  design trade-offs are still open.

Do not sacrifice correctness for cost. Escalate the model when verification
fails twice.

## Hold

On mismatch, stop before tools or edits. Reply with:

- **Current:** model tier and mode you are running as
- **Recommended:** Light / Mid / Heavy, and Ask / Agent / Plan
- **Why:** one sentence
- **Required decision:** switch, stay, or change mode

Wait for an explicit preference. Do not start the query in the meantime.

If current model and mode already match, skip the hold and execute.

## After confirmation

- **Stay** — execute here; one-sentence risk note if still mismatched.
- **Switch** — stop; wait for the next message on the new model or mode.
- **Change mode** — stop; wait until the user is in Agent, Ask, or Plan.

## Report

Recommended tier and mode, why, and what would trigger a later escalation.
