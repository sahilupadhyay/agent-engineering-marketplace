---
name: model-router
description: Classify the current query, recommend model tier or Ask/Agent/Plan, and hold until the user confirms.
---

# Model router

Run task triage on the current user query before doing any other work.

1. Classify intent and complexity (Light / Mid / Heavy).
2. Classify required Cursor mode (Ask / Agent / Plan).
3. If the current model or mode is a mismatch, do not call tools or edit files.
4. Recommend stay, upgrade, downgrade, or a mode change, with one-line why.
5. Wait for an explicit preference, then execute only with that choice.

You cannot change the model picker or Cursor mode; the user must.
