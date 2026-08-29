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

## Context budget

Combined always-applied rule bodies must stay within **4096** UTF-8 bytes. See [docs/tiers.md](../../docs/tiers.md).

## Hooks

Mechanical enforcement hooks arrive in PR 9. Rules state policy; hooks enforce when installed.

## Eval suite

Deterministic cases live in `evals/suites/security-core/` in the marketplace repo.
