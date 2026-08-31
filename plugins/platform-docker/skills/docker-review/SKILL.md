---
name: docker-review
description: Use when changing Dockerfiles, Compose files, or container build args.
---

# Docker review

## Review
1. **User** — non-root when repo pattern allows.
2. **Pins** — base image tags/digests; reproducible builds.
3. **Secrets** — build-args and env; no literals in Dockerfile.
4. **Layers** — cache-friendly ordering.
5. **Report** — scan and run commands.
