---
name: azure-review
description: Use when reviewing Azure Bicep, ARM, or az CLI changes.
---

# Azure review

1. **Scope** — subscription, region, and RG match intent.
2. **Identity** — least privilege; no secrets in templates.
3. **Network** — NSG rules and private endpoints reviewed.
4. **Destroy** — flag az group delete and destructive ARM ops.
5. **Report** — blast radius and rollback plan.
