# security-core

Stack-agnostic always-on security principles for Cursor sessions.

## Recommended tier

Set **Required** in Dashboard → Plugins → Required.

## Rules

| File | Summary |
| --- | --- |
| `010-secrets.mdc` | Secret handling and credential file reads. |
| `020-auth-transport.mdc` | Auth, TLS, and authorization weakening forbidden. |
| `030-input-trust.mdc` | Untrusted input and parameterized queries. |
| `040-destructive-ops.mdc` | Confirm destructive git, cloud, and filesystem ops. |
| `050-supply-chain.mdc` | Dependency and install hygiene. |

## Skills

| Skill | Use when |
| --- | --- |
| `confirm-destructive-op` | Before destructive commands covered by hooks or rule 040 |
| `secret-exposure-response` | A secret may have leaked into git, logs, or chat |

## Hooks

| Hook | Event | Enforces |
| --- | --- | --- |
| `protect-shell.sh` | `beforeShellExecution` | rm, git destructive, SQL DROP/DELETE, Redis flush, AWS deletes, find -delete |
| `protect-read.sh` | `beforeReadFile` / `beforeTabFileRead` | Deny `.env`, keys, credentials paths |
| `secret-scan.sh` | `preToolUse` Write/StrReplace; git commit/push | Deny known secret patterns in writes and staged commits |

Rules state policy; hooks enforce when installed. See `hooks/hooks.json`.

Extended AWS/k8s deletes: **cloud-aws** `dangerous-aws-command.sh`, **platform-kubernetes** `dangerous-k8s-command.sh`.

## Context budget

Combined always-applied rule bodies must stay within **4096** UTF-8 bytes.

## Eval suite

Deterministic cases live in `evals/suites/security-core/` in the marketplace repo.
