---
name: openapi-review
description: Use when reviewing OpenAPI specs, API contracts, endpoint documentation, or validating published API docs against implementation.
---

# OpenAPI and API documentation review

## Preconditions

Prefer MCP tools the user connected for API docs (for example Context7 for
library docs, or team-specific API catalog MCP). This plugin does not ship
`mcp.json`. When no MCP applies, review files in the workspace directly.

## Locate sources

1. Find OpenAPI/Swagger files (`openapi.yaml`, `swagger.json`, generated specs).
2. Identify the implementing routes, handlers, or client SDKs in the repo.
3. Note the doc audience: public partners, internal consumers, or operators.

## Review checklist

| Area | Check |
| --- | --- |
| Completeness | All public endpoints documented; schemas for request/response bodies |
| Accuracy | Paths, methods, status codes, and enums match implementation |
| Security | Auth schemes documented; no example secrets; scoped operations |
| Errors | Consistent error model; required codes for client handling |
| Versioning | Deprecations, breaking changes, and version headers noted |
| Examples | Valid sample payloads; realistic field values |

## Compare implementation

Diff spec against code (route registration, DTOs, validation). Flag drift:
missing endpoints, wrong types, undocumented query params, or stale descriptions.

## Report

Structure findings by severity:

- **Must fix** — contract break, security gap, or wrong behavior
- **Should fix** — confusing docs, missing errors, incomplete schemas
- **Nice to have** — examples, descriptions, consistency

Propose minimal spec or code changes; do not drive-by refactor unrelated APIs.

## Deliver

Return an executive summary, finding list with file/line references when
available, and suggested next steps (spec fix, codegen, or publish pipeline).
