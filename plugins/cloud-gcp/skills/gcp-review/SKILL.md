---
name: gcp-review
description: Use when reviewing GCP Terraform, Deployment Manager, or gcloud changes.
---

# GCP review

## Review
1. **Project/region** — correct target.
2. **IAM** — least privilege; no allUsers on sensitive buckets.
3. **Keys** — workload identity over JSON keys.
4. **Destroy** — scope of gcloud/terraform deletes.
5. **Report** — data residency notes.
