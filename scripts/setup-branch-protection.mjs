#!/usr/bin/env node
/**
 * Apply branch protection on `main` for this repository.
 *
 * Requires GitHub CLI (`gh`) authenticated with admin access.
 * On GitHub Free, branch protection for `main` is available only when the
 * repository is **public** (or on GitHub Pro for private repos).
 *
 * Usage:
 *   node scripts/setup-branch-protection.mjs
 *   node scripts/setup-branch-protection.mjs --dry-run
 */
import { execFileSync } from "node:child_process";

const OWNER = "sahilupadhyay";
const REPO = "agent-engineering-marketplace";
const BRANCH = "main";
const MAINTAINER = "sahilupadhyay";
/** @type {string} CI job name from .github/workflows/validate.yml */
const REQUIRED_CHECK = "validate";

const dryRun = process.argv.includes("--dry-run");

const payload = {
  required_status_checks: {
    strict: true,
    contexts: [REQUIRED_CHECK],
  },
  enforce_admins: true,
  required_pull_request_reviews: {
    dismiss_stale_reviews: true,
    require_code_owner_reviews: true,
    required_approving_review_count: 1,
  },
  restrictions: {
    users: [MAINTAINER],
    teams: [],
    apps: [],
  },
  required_linear_history: false,
  allow_force_pushes: false,
  allow_deletions: false,
  block_creations: false,
  required_conversation_resolution: true,
};

const endpoint = `repos/${OWNER}/${REPO}/branches/${BRANCH}/protection`;

console.log(`Branch protection target: ${OWNER}/${REPO}@${BRANCH}`);
console.log(JSON.stringify(payload, null, 2));

if (dryRun) {
  console.log("\nDry run — no API call made.");
  process.exit(0);
}

try {
  execFileSync(
    "gh",
    ["api", endpoint, "-X", "PUT", "--input", "-"],
    {
      input: JSON.stringify(payload),
      stdio: ["pipe", "inherit", "inherit"],
    },
  );
  console.log("\nBranch protection applied.");
} catch (err) {
  console.error(
    "\nFailed to apply branch protection. On GitHub Free private repos this",
    "requires GitHub Pro — flip the repository to public first, then rerun:",
    "\n  node scripts/setup-branch-protection.mjs",
  );
  process.exit(typeof err.status === "number" ? err.status : 1);
}
