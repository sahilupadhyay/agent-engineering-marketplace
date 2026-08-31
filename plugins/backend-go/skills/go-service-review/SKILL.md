---
name: go-service-review
description: Use when changing Go packages, HTTP handlers, or module dependencies.
---

# Go service review

## Review
1. **Errors** — wrap with %w; no silent ignores.
2. **Context** — pass context.Context through I/O.
3. **Modules** — go.mod consistent; no duplicate HTTP clients.
4. **Layout** — match cmd/internal or flat structure.
5. **Report** — go test scope and race detector if used.
