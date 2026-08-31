---
name: terraform-review
description: Use when reviewing Terraform modules, variables, or backend config.
---

# Terraform review

## Review
1. **Plan** — summarize create/destroy/replace before apply.
2. **State** — remote backend; no committed state files.
3. **Secrets** — sensitive variables; no literals in tfvars.
4. **Modules** — version pins and blast radius.
5. **Report** — irreversible changes; link **cloud-aws** for AWS-specific depth.
