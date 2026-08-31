---
name: python-service-review
description: Use when changing Python services, APIs, ORM models, or application modules.
---

# Python service review

## Preconditions
Detect framework (FastAPI, Django, Flask). Link **data-postgres** / **data-mysql** when SQL changes.

## Review
1. **Validation** — pydantic/serializers at boundary.
2. **SQL** — parameterized queries only.
3. **Async** — match sync vs async style already in the module.
4. **Deps** — pin versions consistent with pyproject/requirements.
5. **Report** — test commands and migration impact.
