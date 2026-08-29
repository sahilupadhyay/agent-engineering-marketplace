#!/bin/sh
. "$(dirname "$0")/_hook-lib.sh"

hook_read_stdin
file=$(hook_json_field file_path)
if [ -z "$file" ]; then
  file=$(hook_json_field path)
fi

if [ -z "$file" ]; then
  hook_emit_permission allow
  exit 0
fi

base=$(hook_basename "$file")
lower=$(hook_lower "$base")

is_example() {
  case "$lower" in
    *.example|*.sample|*.template|*.example.*|*.sample.*) return 0 ;;
  esac
  return 1
}

deny_read() {
  hook_emit_permission deny "Blocked read of credential file ($1)." "protect-read: denied $file"
  exit 2
}

case "$lower" in
  .env|.env.*)
    if is_example; then
      hook_emit_permission allow
      exit 0
    fi
    deny_read ".env"
    ;;
  credentials.json|credentials.csv|credentials.xml)
    deny_read "credentials file"
    ;;
  id_rsa|id_dsa|id_ecdsa|id_ed25519)
    deny_read "ssh private key"
    ;;
  *.pem|*.key|*.p12|*.pfx|*.keystore)
    if is_example; then
      hook_emit_permission allow
      exit 0
    fi
    deny_read "key material"
    ;;
esac

case "$file" in
  */.aws/credentials|*/.aws/credentials/*)
    deny_read ".aws/credentials"
    ;;
esac

hook_emit_permission allow
exit 0
