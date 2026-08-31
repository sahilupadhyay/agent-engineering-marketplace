---
name: incident-triage
description: Use when responding to production incidents, alerts, or customer-impacting outages.
---

# Incident triage

## First actions
- Confirm impact, scope, and start time.
- Stabilize: stop bleeding (rollback, flag, scale) before root cause.

## Investigate
1. Recent deploys, config, and dependency changes.
2. Dashboards, logs, traces for the failing path.
3. Communicate status briefly and factually.

## Close
- Root cause, fix, verification, and follow-up items (tests, runbooks).
- Blameless summary; link to tracking ticket if applicable.
