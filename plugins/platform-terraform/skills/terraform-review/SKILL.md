---
name: terraform-review
description: Use when reviewing Terraform modules, variables, or backend config.
---

# Terraform review

1. **Plan** — summarize create/destroy/replace counts.
2. **State** — remote backend; no local state in repo.
3. **Secrets** — variables marked sensitive; no literals in tfvars.
4. **Modules** — version pins and blast radius.
5. **Report** — irreversible changes and drift risk.
