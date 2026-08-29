/**
 * Strict flat YAML frontmatter parser (no external YAML dependency).
 */

const DEAD_SKILL_KEYS = new Set(["alwaysApply", "globs", "priority"]);

/**
 * @param {string} content
 * @returns {{ ok: true, frontmatter: Record<string, unknown>, body: string } | { ok: false, error: string }}
 */
export function parseFrontmatter(content) {
  if (!content.startsWith("---\n") && content !== "---") {
    return { ok: false, error: "missing opening frontmatter fence on line 1" };
  }

  const endIndex = content.indexOf("\n---", 4);
  if (endIndex === -1) {
    return { ok: false, error: "missing closing frontmatter fence" };
  }

  const rawBlock = content.slice(4, endIndex);
  const body = content.slice(endIndex + 4);
  const bodyNormalized = body.startsWith("\n") ? body.slice(1) : body;

  const frontmatter = {};
  const lines = rawBlock.split("\n");

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (line.trim() === "") {
      continue;
    }
    if (/^\s/.test(line)) {
      return {
        ok: false,
        error: `nested or multiline frontmatter not allowed at line ${i + 2}`,
      };
    }
    const match = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (!match) {
      return {
        ok: false,
        error: `invalid frontmatter line at line ${i + 2}: ${line}`,
      };
    }
    const key = match[1];
    const rawValue = match[2].trim();
    if (rawValue === "|" || rawValue === ">") {
      return {
        ok: false,
        error: `multiline frontmatter blocks not allowed for key ${key}`,
      };
    }

    const parsed = parseScalar(rawValue);
    if (parsed.error) {
      return { ok: false, error: `${parsed.error} (key ${key})` };
    }
    frontmatter[key] = parsed.value;
  }

  return { ok: true, frontmatter, body: bodyNormalized };
}

/**
 * @param {string} raw
 */
function parseScalar(raw) {
  if (raw === "true") return { value: true };
  if (raw === "false") return { value: false };
  if (raw === "null") return { value: null };

  if (
    (raw.startsWith('"') && raw.endsWith('"')) ||
    (raw.startsWith("'") && raw.endsWith("'"))
  ) {
    return { value: raw.slice(1, -1) };
  }

  if (raw.startsWith("[") && raw.endsWith("]")) {
    try {
      const value = JSON.parse(raw);
      if (!Array.isArray(value)) {
        return { error: "frontmatter array must be JSON array syntax" };
      }
      return { value };
    } catch {
      return { error: "invalid JSON array in frontmatter" };
    }
  }

  if (/^-?\d+$/.test(raw)) {
    return { value: Number(raw) };
  }

  if (raw.includes(":") && !raw.startsWith('"')) {
    return { error: "nested objects not allowed in frontmatter" };
  }

  return { value: raw };
}

/**
 * @param {Record<string, unknown>} frontmatter
 * @param {string} filePath
 * @returns {string[]}
 */
export function deadSkillFrontmatterErrors(frontmatter, filePath) {
  const errors = [];
  for (const key of DEAD_SKILL_KEYS) {
    if (Object.prototype.hasOwnProperty.call(frontmatter, key)) {
      errors.push(
        `${filePath}: dead frontmatter key "${key}" on SKILL.md (ignored by Cursor)`,
      );
    }
  }
  return errors;
}

/**
 * @param {string} body
 */
export function countBodyLines(body) {
  const lines = body.split("\n");
  while (lines.length > 0 && lines[lines.length - 1].trim() === "") {
    lines.pop();
  }
  return lines.length;
}

/**
 * @param {string} body
 * @returns {number}
 */
export function countTopLevelHeadings(body) {
  let count = 0;
  for (const line of body.split("\n")) {
    if (/^# /.test(line)) {
      count += 1;
    }
  }
  return count;
}
