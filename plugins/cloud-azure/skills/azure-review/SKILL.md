---
name: azure-review
description: Use when reviewing Azure Bicep, ARM, or az CLI infrastructure changes.
---

# Azure review

## Preconditions
Confirm subscription, resource group, and region.

## Review
1. **Identity** — managed identities over long-lived secrets.
2. **Network** — NSG rules; no open management CIDR without approval.
3. **Destroy** — flag az group delete and destructive ARM ops.
4. **Report** — blast radius and rollback.
