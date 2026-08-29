# Workstream 02 — Backend plugins

**Tier:** `default-off`. No `alwaysApply`. Original text only.

## Plugins

### `backend-node` (expand)

- Existing `010-node-server-discipline.mdc` stays.
- Add `020-node-http-errors.mdc` if 010 is already at single-responsibility limit — async errors, no swallowed rejections, don't log secrets.

### `backend-python` (expand)

- Keep parameterized-query rule.
- Add `020-python-types-async.mdc` only if it does not duplicate 010: type hints at public APIs, don't add a web framework the repo doesn't use.

### `backend-java` (new)

- Globs: `["**/*.java", "**/pom.xml", "**/build.gradle", "**/build.gradle.kts"]`
- Rule `010-java-service-discipline.mdc`: match existing package layout; parameterized queries / prepared statements; no `e.printStackTrace()` in new code; don't upgrade JDK in-task.

### `backend-go` (new)

- Globs: `["**/*.go", "**/go.mod"]`
- Rule `010-go-service-discipline.mdc`: wrap errors with `%w`; context on I/O; no ignored `err`; modules match `go.mod`.

## Duplicate NodeJs

User listed Node twice. **One plugin:** `backend-node`.

## Evals

Same trio as other stack plugins (tier, dead paths, one content regex).

## Parallel safety

`plugins/backend-java`, `plugins/backend-go`, and optional extra rules under existing backend-* dirs. If two agents expand `backend-node` and `backend-python`, **serialize** those two or split extra rules into this workstream only.

## Detect-stack (coordinator)

`go.mod` → `backend-go`; `pom.xml` / `build.gradle` → `backend-java`.
