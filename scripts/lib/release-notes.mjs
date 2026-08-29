import { readFileSync } from "node:fs";

/**
 * @param {string} changelog
 * @param {string} version
 * @returns {string}
 */
export function extractReleaseNotes(changelog, version) {
  const header = `## [${version}]`;
  const start = changelog.indexOf(header);

  if (start === -1) {
    throw new Error(`CHANGELOG.md has no section ${header}`);
  }

  const afterHeader = start + header.length;
  const rest = changelog.slice(afterHeader);
  const nextMatch = rest.match(/\n## \[/);
  const section = (nextMatch ? rest.slice(0, nextMatch.index) : rest).trim();

  if (!section) {
    throw new Error(`empty section for ${header}`);
  }

  return section;
}

/**
 * @param {string} root
 * @param {string} version
 * @returns {string}
 */
export function releaseNotesFromFile(root, version) {
  const changelog = readFileSync(`${root}/CHANGELOG.md`, "utf8");
  return extractReleaseNotes(changelog, version);
}
