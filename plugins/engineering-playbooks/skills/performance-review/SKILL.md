---
name: performance-review
description: Use when assessing latency, throughput, memory, or cost of a change.
---

# Performance review

## Baseline
- Identify hot paths touched by the change.
- Check existing benchmarks or profiling notes in the repo.

## Review
1. **Algorithm** — complexity and unnecessary work in loops/IO.
2. **IO** — N+1 queries, chatty RPC, unbounded pagination.
3. **Memory** — unbounded caches, large allocations in request path.
4. **Concurrency** — lock contention, missing backpressure.
5. **Cost** — cloud spend drivers if infra changed.

## Recommend
- Measure before optimizing; propose smallest high-impact fixes.
- Flag missing indexes, missing timeouts, and missing limits.
