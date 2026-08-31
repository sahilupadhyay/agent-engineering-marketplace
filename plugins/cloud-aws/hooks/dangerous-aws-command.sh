#!/bin/sh
# shellcheck source=_hook-lib.sh
. "$(dirname "$0")/_hook-lib.sh"

hook_read_stdin
command=$(hook_json_field command)

if ! printf '%s' "$HOOK_INPUT" | grep -q '{'; then
  hook_emit_permission ask "Could not parse the shell command for AWS safety review." "dangerous-aws-command: invalid JSON on stdin"
  exit 0
fi

if [ -z "$command" ]; then
  hook_emit_permission allow
  exit 0
fi

# Kubernetes and Helm destructive ops live in platform-kubernetes dangerous-k8s-command.sh.

# Additional AWS destructive patterns not covered by security-core protect-shell.
if printf '%s' "$command" | grep -Eiq 'aws[[:space:]]+(eks[[:space:]]+delete-cluster|ecs[[:space:]]+delete-(service|cluster)|elasticache[[:space:]]+delete-(cache-cluster|replication-group)|elbv2[[:space:]]+delete-load-balancer|route53[[:space:]]+delete-hosted-zone|secretsmanager[[:space:]]+delete-secret|kms[[:space:]]+schedule-key-deletion|autoscaling[[:space:]]+delete-auto-scaling-group|cloudfront[[:space:]]+delete-distribution|apigateway[[:space:]]+delete-rest-api|sns[[:space:]]+delete-topic|sqs[[:space:]]+delete-queue|logs[[:space:]]+delete-log-group|ssm[[:space:]]+delete-parameter|ecr[[:space:]]+delete-repository|organizations[[:space:]]+delete-|rds[[:space:]]+delete-db-cluster|redshift[[:space:]]+delete-cluster|opensearch[[:space:]]+delete-domain)'; then
  hook_emit_permission ask "Confirm destructive AWS command." "dangerous-aws-command: destructive AWS command requires confirmation"
  exit 0
fi

if printf '%s' "$command" | grep -Eiq 'aws[[:space:]]+s3api[[:space:]]+delete-bucket'; then
  hook_emit_permission ask "Confirm S3 bucket deletion." "dangerous-aws-command: s3api delete-bucket requires confirmation"
  exit 0
fi

hook_emit_permission allow
exit 0
