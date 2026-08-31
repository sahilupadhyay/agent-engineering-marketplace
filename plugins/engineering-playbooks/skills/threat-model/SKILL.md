---
name: threat-model
description: Use when assessing security threats for a feature, service, or integration.
---

# Threat model (lightweight)

## Frame
- Asset, actors, trust boundaries, and data flows for the change.

## STRIDE pass
- **Spoofing** — authentication gaps.
- **Tampering** — unsigned inputs, missing integrity checks.
- **Repudiation** — audit logging gaps.
- **Information disclosure** — logs, errors, over-fetching.
- **Denial of service** — unbounded work or storage.
- **Elevation** — authorization bypass, IDOR.

## Output
- Ranked threats, mitigations already present, and gaps to fix or track.
