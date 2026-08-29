# backend-java

Default-off glob-scoped rules for Java services, Maven, and Gradle builds.

## Recommended tier

Set **Default Off** in Dashboard → Plugins. Enable when the repository contains Java sources or Maven/Gradle build files.

## Rule

`010-java-service-discipline.mdc` — glob-scoped rule (no `alwaysApply`). Applies to `.java`, `pom.xml`, and Gradle build files.
## Context budget

Default-off tier allows **zero** always-applied rule bytes. This plugin ships no
`alwaysApply: true` rules.

## Eval suite

Deterministic cases live in `evals/suites/backend-java/` in the marketplace repo.
