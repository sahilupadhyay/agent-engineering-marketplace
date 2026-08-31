---
name: http-api-review
description: Use when designing or reviewing REST endpoints, handlers, or JSON contracts.
---

# HTTP API review

## Preconditions
OpenAPI/spec work → **api-docs**. Handler code → this skill.

## Contract
Methods, paths, status codes, error envelope matching the repo.

## Validation
Sanitize at boundary; fail closed on auth failures.

## Auth
Authentication vs authorization per route.

## Compatibility
Additive JSON fields; version breaking changes explicitly.

## Safety
No stack traces or secrets in error JSON.

## Report
Gaps vs **api-docs** OpenAPI files if any.
