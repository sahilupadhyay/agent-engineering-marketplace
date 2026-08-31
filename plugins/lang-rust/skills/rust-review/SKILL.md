---
name: rust-review
description: Use when changing Rust crates, async services, or Cargo dependencies.
---

# Rust review

## Review
1. **Errors** — Result and ? in library paths; document unwrap in tests only.
2. **Unsafe** — minimal scope with safety comments.
3. **Deps** — workspace versions; no duplicate HTTP stacks.
4. **Tests** — cover public API and error paths.
5. **Report** — MSRV and breaking changes.
