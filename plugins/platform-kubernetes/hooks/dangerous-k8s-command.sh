#!/bin/sh
# shellcheck source=_hook-lib.sh
. "$(dirname "$0")/_hook-lib.sh"

hook_read_stdin
command=$(hook_json_field command)

if ! printf '%s' "$HOOK_INPUT" | grep -q '{'; then
  hook_emit_permission ask "Could not parse the shell command for Kubernetes safety review." "dangerous-k8s-command: invalid JSON on stdin"
  exit 0
fi

if [ -z "$command" ]; then
  hook_emit_permission allow
  exit 0
fi

if printf '%s' "$command" | grep -Eiq '\bkubectl[[:space:]]+delete\b'; then
  hook_emit_permission ask "Confirm kubectl delete (removes Kubernetes resources)." "dangerous-k8s-command: kubectl delete requires confirmation"
  exit 0
fi

if printf '%s' "$command" | grep -Eiq '\bhelm[[:space:]]+(uninstall|delete)\b'; then
  hook_emit_permission ask "Confirm helm uninstall/delete (removes a release)." "dangerous-k8s-command: helm uninstall/delete requires confirmation"
  exit 0
fi

hook_emit_permission allow
exit 0
