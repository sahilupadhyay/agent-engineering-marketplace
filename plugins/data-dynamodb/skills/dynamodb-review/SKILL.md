---
name: dynamodb-review
description: Use when changing DynamoDB keys, GSIs, access patterns, or table IaC.
---

# DynamoDB review

## Review
1. **Keys** — partition/sort design for access patterns.
2. **GSI** — projection and hot partition risk.
3. **No scans** — avoid Scan on hot paths.
4. **TTL** — explicit when used for expiry.
5. **Report** — capacity/cost implications.
