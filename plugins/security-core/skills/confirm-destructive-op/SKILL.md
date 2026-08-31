---
name: confirm-destructive-op
description: Use when the user or task requires a destructive git, database, cloud, or filesystem operation covered by security-core hooks.
---

# Confirm destructive operation

## Preconditions

Read **security-core** rule `040-destructive-ops`. Hooks in `protect-shell.sh`
may ask or deny before execution — do not bypass hooks.

## Checklist

Before proposing or running a destructive command, confirm with the user:

1. **What** will be deleted, dropped, truncated, or overwritten?
2. **Scope** — environment (prod vs dev), account, region, database, or path.
3. **Reversibility** — backup, rollback, or recovery plan if available.
4. **Safer alternative** — rename, soft-delete, or dry-run when the tool supports it.

## Examples requiring confirmation

- `git reset --hard`, `git push --force`, broad `rm -rf`, `find -delete`
- SQL `DROP`, `TRUNCATE`, `DELETE` without `WHERE`
- Redis `FLUSHALL` / `FLUSHDB`
- `terraform destroy`, `aws s3 rm`, destructive `kubectl delete`

## After approval

Run the command only after explicit user intent. Report what ran and verify outcome.
