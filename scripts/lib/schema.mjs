/**
 * Minimal JSON Schema Draft 2020-12 subset for marketplace validation.
 */

import fs from "node:fs";

/**
 * @param {unknown} data
 * @param {Record<string, unknown>} schema
 * @param {string} path
 * @returns {string[]}
 */
export function validateJson(data, schema, path = "$") {
  const errors = [];
  const resolved = resolveRef(schema, schema);
  errors.push(...validateNode(data, resolved, path, schema));
  return errors;
}

/**
 * @param {string} schemaPath
 * @param {unknown} data
 * @param {string} label
 * @returns {string[]}
 */
export function validateAgainstSchemaFile(schemaPath, data, label) {
  const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
  return validateJson(data, schema).map((err) => `${label}: ${err}`);
}

/**
 * @param {Record<string, unknown>} schema
 * @param {Record<string, unknown>} root
 */
function resolveRef(schema, root) {
  if (typeof schema.$ref === "string") {
    const ref = schema.$ref;
    if (!ref.startsWith("#/")) {
      throw new Error(`unsupported $ref ${ref}`);
    }
    const target = getByPointer(root, ref.slice(1));
    return resolveRef(target, root);
  }
  return schema;
}

/**
 * @param {Record<string, unknown>} root
 * @param {string} pointer
 */
function getByPointer(root, pointer) {
  const parts = pointer.split("/").filter(Boolean);
  let current = /** @type {unknown} */ (root);
  for (const part of parts) {
    const key = part.replace(/~1/g, "/").replace(/~0/g, "~");
    if (current == null || typeof current !== "object") {
      throw new Error(`invalid schema pointer ${pointer}`);
    }
    current = /** @type {Record<string, unknown>} */ (current)[key];
  }
  if (!current || typeof current !== "object") {
    throw new Error(`invalid schema pointer ${pointer}`);
  }
  return /** @type {Record<string, unknown>} */ (current);
}

/**
 * @param {unknown} data
 * @param {Record<string, unknown>} schema
 * @param {string} path
 * @param {Record<string, unknown>} root
 * @returns {string[]}
 */
function validateNode(data, schema, path, root) {
  if (Array.isArray(schema.allOf)) {
    const errors = [];
    for (const sub of schema.allOf) {
      errors.push(
        ...validateNode(
          data,
          resolveRef(/** @type {Record<string, unknown>} */ (sub), root),
          path,
          root,
        ),
      );
    }
    return errors;
  }

  if (schema.if && typeof schema.if === "object") {
    const ifErrors = validateNode(
      data,
      resolveRef(/** @type {Record<string, unknown>} */ (schema.if), root),
      path,
      root,
    );
    if (ifErrors.length === 0 && schema.then && typeof schema.then === "object") {
      return validateNode(
        data,
        resolveRef(/** @type {Record<string, unknown>} */ (schema.then), root),
        path,
        root,
      );
    }
    return [];
  }

  if (Array.isArray(schema.oneOf)) {
    const branchErrors = schema.oneOf.map((sub) =>
      validateNode(
        data,
        resolveRef(/** @type {Record<string, unknown>} */ (sub), root),
        path,
        root,
      ),
    );
    const passing = branchErrors.filter((errs) => errs.length === 0).length;
    if (passing === 1) {
      return [];
    }
    if (passing === 0) {
      return [`${path}: value does not match oneOf`];
    }
    return [`${path}: value matches more than one oneOf branch`];
  }

  const errors = [];

  if (Object.prototype.hasOwnProperty.call(schema, "const")) {
    if (data !== schema.const) {
      errors.push(`${path}: must equal ${JSON.stringify(schema.const)}`);
    }
    return errors;
  }

  if (schema.type) {
    if (!matchesType(data, /** @type {string} */ (schema.type))) {
      errors.push(`${path}: expected type ${schema.type}`);
      return errors;
    }
  }

  if (Array.isArray(schema.enum)) {
    if (!schema.enum.includes(data)) {
      errors.push(`${path}: must be one of ${schema.enum.join(", ")}`);
    }
    return errors;
  }

  if (typeof data === "string") {
    if (typeof schema.minLength === "number" && data.length < schema.minLength) {
      errors.push(`${path}: string shorter than minLength ${schema.minLength}`);
    }
    if (typeof schema.pattern === "string") {
      const re = new RegExp(schema.pattern);
      if (!re.test(data)) {
        errors.push(`${path}: string does not match pattern ${schema.pattern}`);
      }
    }
    if (schema.format === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data)) {
      errors.push(`${path}: invalid email format`);
    }
    if (schema.format === "uri" && !/^https?:\/\/.+/.test(data)) {
      errors.push(`${path}: invalid uri format`);
    }
  }

  if (typeof data === "number") {
    if (typeof schema.minimum === "number" && data < schema.minimum) {
      errors.push(`${path}: number below minimum ${schema.minimum}`);
    }
    if (typeof schema.maximum === "number" && data > schema.maximum) {
      errors.push(`${path}: number above maximum ${schema.maximum}`);
    }
  }

  if (Array.isArray(data)) {
    if (typeof schema.minItems === "number" && data.length < schema.minItems) {
      errors.push(`${path}: array shorter than minItems ${schema.minItems}`);
    }
    if (typeof schema.maxItems === "number" && data.length > schema.maxItems) {
      errors.push(`${path}: array longer than maxItems ${schema.maxItems}`);
    }
    if (schema.items && typeof schema.items === "object") {
      data.forEach((item, index) => {
        errors.push(
          ...validateNode(
            item,
            resolveRef(/** @type {Record<string, unknown>} */ (schema.items), root),
            `${path}[${index}]`,
            root,
          ),
        );
      });
    }
    if (schema.uniqueItems === true) {
      const seen = new Set();
      for (const item of data) {
        const key = JSON.stringify(item);
        if (seen.has(key)) {
          errors.push(`${path}: array items must be unique`);
          break;
        }
        seen.add(key);
      }
    }
  }

  if (data && typeof data === "object" && !Array.isArray(data)) {
    const obj = /** @type {Record<string, unknown>} */ (data);
    const props = /** @type {Record<string, unknown>} */ (schema.properties ?? {});
    const required = /** @type {string[]} */ (schema.required ?? []);

    for (const key of required) {
      if (!Object.prototype.hasOwnProperty.call(obj, key)) {
        errors.push(`${path}: missing required property "${key}"`);
      }
    }

    if (schema.additionalProperties === false) {
      for (const key of Object.keys(obj)) {
        if (!Object.prototype.hasOwnProperty.call(props, key)) {
          errors.push(`${path}: additional property "${key}" is not allowed`);
        }
      }
    }

    for (const [key, subSchema] of Object.entries(props)) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        errors.push(
          ...validateNode(
            obj[key],
            resolveRef(/** @type {Record<string, unknown>} */ (subSchema), root),
            `${path}.${key}`,
            root,
          ),
        );
      }
    }
  }

  return errors;
}

/**
 * @param {unknown} value
 * @param {string} type
 */
function matchesType(value, type) {
  switch (type) {
    case "string":
      return typeof value === "string";
    case "number":
      return typeof value === "number" && !Number.isNaN(value);
    case "integer":
      return typeof value === "number" && Number.isInteger(value);
    case "boolean":
      return typeof value === "boolean";
    case "object":
      return value !== null && typeof value === "object" && !Array.isArray(value);
    case "array":
      return Array.isArray(value);
    default:
      return true;
  }
}
