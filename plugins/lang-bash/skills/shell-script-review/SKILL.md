---
name: shell-script-review
description: Use when adding or changing shell scripts, CI helpers, or hook wrappers.
---

# Shell script review

## Review
1. **Quoting** — quote expansions; arrays for lists.
2. **Failure** — set -euo pipefail when repo style allows.
3. **Secrets** — env vars only; no literals.
4. **Portability** — note bash-only features.
5. **Report** — injection risks and shellcheck gaps.
