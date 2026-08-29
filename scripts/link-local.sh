#!/bin/sh
set -e
REPO_ROOT="$(CDPATH= cd "$(dirname "$0")/.." && pwd)"
TARGET="${HOME}/.cursor/plugins/local/agent-engineering-marketplace"
mkdir -p "${HOME}/.cursor/plugins/local"
ln -sfn "$REPO_ROOT" "$TARGET"
printf 'Linked %s -> %s\n' "$TARGET" "$REPO_ROOT"
printf 'Restart Cursor or reload plugins, then add the local marketplace in Settings → Plugins.\n'
