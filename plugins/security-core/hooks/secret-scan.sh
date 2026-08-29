#!/bin/sh
. "$(dirname "$0")/_hook-lib.sh"

scan_text() {
  text="$1"
  source_label="$2"
  if [ -z "$text" ]; then
    return 0
  fi
  if printf '%s' "$text" | grep -Eq 'AKIA[0-9A-Z]{16}'; then
    if ! printf '%s' "$text" | grep -Eiq 'EXAMPLE|PLACEHOLDER|YOUR[_A-Z]*KEY|REPLACE_ME|CHANGEME|xxx+|TODO_SECRET'; then
      hook_emit_permission deny "Blocked possible secret (aws-access-key) in $source_label." "secret-scan: denied $source_label due to aws-access-key"
      exit 2
    fi
  fi
  if printf '%s' "$text" | grep -Eq '-----BEGIN (RSA |OPENSSH |EC |DSA |ENCRYPTED )?PRIVATE KEY-----'; then
    if ! printf '%s' "$text" | grep -Eiq 'EXAMPLE|PLACEHOLDER|YOUR[_A-Z]*KEY|REPLACE_ME|CHANGEME|xxx+|TODO_SECRET'; then
      hook_emit_permission deny "Blocked possible secret (private-key) in $source_label." "secret-scan: denied $source_label due to private-key"
      exit 2
    fi
  fi
  if printf '%s' "$text" | grep -Eq '(ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{36,}'; then
    if ! printf '%s' "$text" | grep -Eiq 'EXAMPLE|PLACEHOLDER|YOUR[_A-Z]*KEY|REPLACE_ME|CHANGEME|xxx+|TODO_SECRET'; then
      hook_emit_permission deny "Blocked possible secret (github-token) in $source_label." "secret-scan: denied $source_label due to github-token"
      exit 2
    fi
  fi
  if printf '%s' "$text" | grep -Eq 'github_pat_[A-Za-z0-9_]{20,}'; then
    hook_emit_permission deny "Blocked possible secret (github-pat) in $source_label." "secret-scan: denied $source_label due to github-pat"
    exit 2
  fi
  if printf '%s' "$text" | grep -Eq 'xox[baprs]-[A-Za-z0-9-]{10,}'; then
    hook_emit_permission deny "Blocked possible secret (slack-token) in $source_label." "secret-scan: denied $source_label due to slack-token"
    exit 2
  fi
  if printf '%s' "$text" | grep -Eq 'sk_live_[A-Za-z0-9]{16,}'; then
    hook_emit_permission deny "Blocked possible secret (stripe-live) in $source_label." "secret-scan: denied $source_label due to stripe-live"
    exit 2
  fi
  if printf '%s' "$text" | grep -Eiq 'aws_secret_access_key[[:space:]]*[=:][[:space:]]*['\''"][A-Za-z0-9/+=]{40}['\''"]'; then
    hook_emit_permission deny "Blocked possible secret (aws-secret-assign) in $source_label." "secret-scan: denied $source_label due to aws-secret-assign"
    exit 2
  fi
  return 0
}

hook_read_stdin

if ! printf '%s' "$HOOK_INPUT" | grep -q '{'; then
  hook_emit_permission allow
  exit 0
fi

tool=$(hook_json_field tool_name)
command=$(hook_json_field command)
cwd=$(hook_json_field cwd)

if [ "$tool" = "Write" ] || [ "$tool" = "StrReplace" ]; then
  contents=$(hook_json_field contents)
  if [ -z "$contents" ]; then
    contents=$(hook_json_field new_string)
  fi
  if [ -z "$contents" ]; then
    contents=$(printf '%s' "$HOOK_INPUT" | tr '\n' ' ' | sed -n 's/.*"contents"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | tail -1)
  fi
  path_label=$(hook_json_field path)
  if [ -z "$path_label" ]; then
    path_label=$(hook_json_field file_path)
  fi
  if [ -z "$path_label" ]; then
    path_label="write"
  fi
  scan_text "$contents" "$path_label"
  hook_emit_permission allow
  exit 0
fi

if printf '%s' "$command" | grep -Eiq 'git[[:space:]]+(commit|push)'; then
  workdir="$cwd"
  if [ -z "$workdir" ] || [ ! -d "$workdir" ]; then
    workdir=$(pwd)
  fi
  if [ -d "$workdir/.git" ]; then
    staged=$(git -C "$workdir" diff --cached 2>/dev/null || true)
    scan_text "$staged" "staged diff"
  fi
fi

hook_emit_permission allow
exit 0
