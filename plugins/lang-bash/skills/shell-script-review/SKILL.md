---
name: shell-script-review
description: Use when adding or changing shell scripts, CI helpers, or hook wrappers.
---

# Shell script review

1. **Quoting** — every expansion quoted; arrays for lists.
2. **Failure** — set -euo pipefail when repo style allows.
3. **Secrets** — no literals; use env or secret manager patterns.
4. **Portability** — note bash-only features.
5. **Report** — injection risks and missing error handling.
