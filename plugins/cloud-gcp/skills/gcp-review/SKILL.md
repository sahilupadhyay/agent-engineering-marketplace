---
name: gcp-review
description: Use when reviewing GCP Terraform, Deployment Manager, or gcloud changes.
---

# GCP review

1. **Project** — correct project and region.
2. **IAM** — least privilege; no allUsers on sensitive buckets.
3. **Keys** — prefer workload identity over JSON keys.
4. **Destroy** — flag gcloud deletes and terraform destroy scope.
5. **Report** — data residency and rollback.
