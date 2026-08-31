#!/bin/sh
# shellcheck source=_hook-lib.sh
. "$(dirname "$0")/_hook-lib.sh"

hook_read_stdin
command=$(hook_json_field command)

if ! printf '%s' "$HOOK_INPUT" | grep -q '{'; then
  hook_emit_permission ask "Could not parse the shell command for safety review." "protect-shell: invalid JSON on stdin"
  exit 0
fi

if [ -z "$command" ]; then
  hook_emit_permission allow
  exit 0
fi

# Deny catastrophic rm -rf on / or ~
if printf '%s' "$command" | grep -Eiq '\brm[[:space:]]+-[a-zA-Z]*[rf][a-zA-Z]*[rf][a-zA-Z]*'; then
  if printf '%s' "$command" | grep -Eq 'rm[[:space:]]+(-[a-zA-Z]+[[:space:]]+)*(/|/\*|~|~/|~/\*)'; then
    hook_emit_permission deny "Blocked catastrophic delete of / or \$HOME." "protect-shell: denied rm of filesystem root or home"
    exit 2
  fi
  if printf '%s' "$command" | grep -Eq 'rm[[:space:]]+(-[a-zA-Z]+[[:space:]]+)*~'; then
    hook_emit_permission deny "Blocked catastrophic delete of / or \$HOME." "protect-shell: denied rm of filesystem root or home"
    exit 2
  fi
fi

if printf '%s' "$command" | grep -Eiq 'git[[:space:]]+reset[[:space:]].*--hard'; then
  hook_emit_permission ask "Confirm git reset --hard (discards uncommitted work)." "protect-shell: git reset --hard requires confirmation"
  exit 0
fi

if printf '%s' "$command" | grep -Eiq 'git[[:space:]]+clean[[:space:]].*-f'; then
  hook_emit_permission ask "Confirm git clean -f (deletes untracked files)." "protect-shell: git clean -f requires confirmation"
  exit 0
fi

if printf '%s' "$command" | grep -Eiq 'git[[:space:]]+checkout[[:space:]]+--[[:space:]]+\.'; then
  hook_emit_permission ask "Confirm git checkout -- . (discards working tree changes)." "protect-shell: git checkout -- . requires confirmation"
  exit 0
fi

if printf '%s' "$command" | grep -Eiq 'git[[:space:]]+push'; then
  if printf '%s' "$command" | grep -Eiq '(--force|--force-with-lease|\s-f(\s|$))'; then
    if ! printf '%s' "$command" | grep -Eiq -- '--force-with-lease'; then
      hook_emit_permission ask "Confirm git push --force (can overwrite remote history). --force-with-lease is allowed." "protect-shell: git push --force requires confirmation"
      exit 0
    fi
  fi
fi

if printf '%s' "$command" | grep -Eiq 'DROP[[:space:]]+DATABASE'; then
  hook_emit_permission ask "Confirm DROP DATABASE." "protect-shell: DROP DATABASE requires confirmation"
  exit 0
fi

if printf '%s' "$command" | grep -Eiq 'DROP[[:space:]]+TABLE'; then
  hook_emit_permission ask "Confirm DROP TABLE." "protect-shell: DROP TABLE requires confirmation"
  exit 0
fi

if printf '%s' "$command" | grep -Eiq 'TRUNCATE[[:space:]]+TABLE'; then
  hook_emit_permission ask "Confirm TRUNCATE TABLE." "protect-shell: TRUNCATE TABLE requires confirmation"
  exit 0
fi

if printf '%s' "$command" | grep -Eiq 'DELETE[[:space:]]+FROM'; then
  if ! printf '%s' "$command" | grep -Eiq '\bWHERE\b'; then
    hook_emit_permission ask "Confirm DELETE FROM without WHERE (may remove all rows)." "protect-shell: DELETE without WHERE requires confirmation"
    exit 0
  fi
fi

if printf '%s' "$command" | grep -Eiq '\b(FLUSHALL|FLUSHDB)\b'; then
  hook_emit_permission ask "Confirm Redis FLUSHALL/FLUSHDB (wipes cache data)." "protect-shell: Redis flush requires confirmation"
  exit 0
fi

if printf '%s' "$command" | grep -Eiq 'aws[[:space:]]+s3[[:space:]]+rm\b'; then
  hook_emit_permission ask "Confirm aws s3 rm (deletes S3 objects)." "protect-shell: aws s3 rm requires confirmation"
  exit 0
fi

if printf '%s' "$command" | grep -Eiq 'find[[:space:]].*-delete\b'; then
  hook_emit_permission ask "Confirm find -delete (removes matched files)." "protect-shell: find -delete requires confirmation"
  exit 0
fi

if printf '%s' "$command" | grep -Eiq 'aws[[:space:]]+(s3[[:space:]]+rb|dynamodb[[:space:]]+delete-table|cloudformation[[:space:]]+delete-stack|rds[[:space:]]+delete-db-instance|lambda[[:space:]]+delete-function|iam[[:space:]]+delete-|ec2[[:space:]]+terminate-instances)'; then
  hook_emit_permission ask "Confirm destructive AWS command." "protect-shell: destructive AWS command requires confirmation"
  exit 0
fi

if printf '%s' "$command" | grep -Eiq '(terraform|pulumi)[[:space:]]+destroy|cdk[[:space:]]+destroy'; then
  hook_emit_permission ask "Confirm infrastructure destroy." "protect-shell: terraform/cdk/pulumi destroy requires confirmation"
  exit 0
fi

if printf '%s' "$command" | grep -Eiq '\brm[[:space:]]+-[a-zA-Z]*[rf][a-zA-Z]*[rf]'; then
  if printf '%s' "$command" | grep -Eiq '(node_modules|/dist|/build|/coverage|\.next|\.nuxt|\.turbo|\.cache|__pycache__|\.venv|/venv|/tmp|/temp|/out|\.pytest_cache|htmlcov|\.nyc_output|\.tox|bower_components|\.parcel-cache|\.angular)(/|[[:space:]]|$)'; then
    hook_emit_permission allow
    exit 0
  fi
  hook_emit_permission ask "Confirm rm -rf of a non-artifact path. Artifact dirs (node_modules, dist, build, …) are allowed." "protect-shell: rm -rf outside artifact allowlist requires confirmation"
  exit 0
fi

hook_emit_permission allow
exit 0
