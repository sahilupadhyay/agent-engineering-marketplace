---
name: secret-exposure-response
description: Use when a secret may have been committed, logged, pasted into chat, or written to an untrusted file.
---

# Secret exposure response

## Stop

Do not echo the secret again in chat, commits, or Confluence/Jira fields.

## Assess

1. **What** leaked — token type, scope, and where (git history, log file, PR comment).
2. **Exposure** — public repo, shared channel, or local only.
3. **Validity** — assume active until rotated.

## Remediate

1. **Rotate** the credential with the owning service (GitHub, AWS, Stripe, etc.).
2. **Remove** from tracked files; use env vars or the project's secret mechanism.
3. **Scrub history** only when the user explicitly requests and understands force-push risk.
4. **Scan** — run `node scripts/secret-scan-repo.mjs` or project hooks after fix.

## Report

Summarize exposure, rotation status, files cleaned, and what the user must do manually.
Do not paste redacted secrets in full — use type and last-four if needed for identification.
