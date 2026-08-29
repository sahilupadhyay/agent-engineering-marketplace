# engineering-core

Stack-agnostic always-on engineering discipline for Cursor sessions.

## Recommended tier

Set **Required** in Dashboard → Plugins → Required. The `tier` field in
`plugin-meta.json` is documentation only; install mode is a team-dashboard
setting.

## Rules

| File | Summary |
| --- | --- |
| `010-task-intake.mdc` | Understand the request and locate code before editing. |
| `020-evidence-hierarchy.mdc` | Locate evidence; never present inference as fact. |
| `030-minimal-change.mdc` | Smallest correct change; no drive-by edits. |
| `040-verification.mdc` | Inspect diff and run focused checks before done. |
| `050-context-efficiency.mdc` | Search and read narrowly; avoid context dumps. |

## Context budget

Combined always-applied rule bodies must stay within **4096** UTF-8 bytes
(`contextBudget` in `plugin-meta.json`). See [docs/tiers.md](../../docs/tiers.md).

## Install

Import this marketplace from Cursor Team Marketplaces. The repository is still
private until Milestone 1 completes.

## Eval suite

No eval suite ships with this plugin until PR 7 lands in the marketplace repo.
