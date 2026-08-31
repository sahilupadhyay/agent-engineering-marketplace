---
name: rust-review
description: Use when changing Rust crates, async services, or Cargo dependencies.
---

# Rust review

1. **Errors** — no unwrap in libs; meaningful context on ? chains.
2. **Unsafe** — justify and minimize scope.
3. **Deps** — match workspace versions; no duplicate HTTP clients.
4. **Tests** — cover new public APIs and error paths.
5. **Report** — breaking changes, MSRV impact, and test gaps.
