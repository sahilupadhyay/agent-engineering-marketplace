---
name: architecture-diagram
description: Use when creating or updating architecture diagrams, system flows, sequence diagrams, or visual design artifacts via connected diagram MCP tools.
---

# Architecture diagram workflow

## Preconditions

Use diagram MCP tools the user already connected in Cursor (for example Lucid,
Figma, or similar). This plugin does not ship `mcp.json` or bundled servers.
If no diagram MCP is available, offer ASCII or Mermaid in the chat and ask
whether to connect a diagram tool.

## Clarify intent

Before drawing:

1. Audience (engineering, security review, stakeholder)
2. Scope (single service, multi-system, deployment view)
3. Notation preference (C4, sequence, ERD, flowchart) if the user cares

## Discover existing artifacts

Search connected tools for existing diagrams or templates. Reuse shapes,
libraries, and linked docs instead of duplicating canvases.

## Build incrementally

1. Start with boundaries: actors, systems, data stores, external dependencies.
2. Add flows with labeled edges; avoid anonymous arrows.
3. Mark trust zones, auth boundaries, and async vs sync paths.
4. Keep labels short; put detail in a companion doc or legend.

## Quality checks

- Every box maps to a real component or role in the codebase or architecture doc.
- Data flows show direction and protocol where known.
- No secrets, credentials, or production URLs on shared diagrams.
- Version or date the diagram when the tool supports metadata.

## Deliver

Summarize what was created or updated, link or ID from the MCP tool, and list
gaps that need user input.
