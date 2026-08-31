---
name: js-client-review
description: Use when changing client-side JavaScript or TypeScript outside React/Vue/Angular SFCs.
---

# JS client review

## Review
1. **Types** — boundaries typed when repo uses TypeScript.
2. **No eval** — no dynamic code execution on untrusted input.
3. **Modules** — match bundler and import style.
4. **DOM XSS** — sanitize HTML insertion.
5. **Report** — overlap with **backend-node** if isomorphic code.
