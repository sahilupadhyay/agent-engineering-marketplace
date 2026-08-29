# shellcheck shell=sh
# Shared POSIX sh helpers for security-core hooks.

hook_read_stdin() {
  HOOK_INPUT=$(cat)
}

hook_json_escape() {
  printf '%s' "$1" | sed 's/\\/\\\\/g; s/"/\\"/g; s/\t/\\t/g'
}

hook_json_field() {
  field="$1"
  printf '%s' "$HOOK_INPUT" | sed -n "s/.*\"$field\"[[:space:]]*:[[:space:]]*\"\\([^\"]*\\)\".*/\\1/p" | head -1
}

hook_emit_permission() {
  perm="$1"
  user_msg="${2:-}"
  agent_msg="${3:-}"
  esc_user=$(hook_json_escape "$user_msg")
  esc_agent=$(hook_json_escape "$agent_msg")
  printf '{"permission":"%s"' "$perm"
  if [ -n "$user_msg" ]; then
    printf ',"user_message":"%s"' "$esc_user"
  fi
  if [ -n "$agent_msg" ]; then
    printf ',"agent_message":"%s"' "$esc_agent"
  fi
  printf '}\n'
}

hook_lower() {
  printf '%s' "$1" | tr '[:upper:]' '[:lower:]'
}

hook_basename() {
  basename "$1"
}
