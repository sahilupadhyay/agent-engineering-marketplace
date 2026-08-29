# Cursor Marketplace submission

Official publish flow: [cursor.com/marketplace/publish](https://cursor.com/marketplace/publish)

This repository stays **private** until a maintainer completes the
[installation.md](installation.md) pre-public checklist. Submission is blocked
until the Git URL is publicly cloneable.

## v1.0 criteria (from plan §33 / §36)

- [x] Automated plugin validation (`scripts/validate.mjs`, evals, secret scan)
- [x] Plugin README gate
- [x] Docs: architecture, philosophy, installation, benchmarks
- [x] Benchmark **suite present** (metadata only; model run opt-in)
- [ ] Repository **public**
- [ ] Tagged stable release (`v1.0.0` per [release.md](release.md))
- [ ] Submit at cursor.com/marketplace/publish with the public Git URL

Do not submit while the repo is private. Do not fabricate marketplace listing
metrics.

## After public flip

1. Confirm `https://github.com/sahilupadhyay/agent-engineering-marketplace` clones without auth.
2. Tag `v1.0.0` when CHANGELOG and plugin versions match.
3. Submit the marketplace using the publish URL above.
4. Record the listing URL in README (no invented install counts).
