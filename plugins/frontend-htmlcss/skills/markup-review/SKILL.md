---
name: markup-review
description: Use when reviewing accessibility, layout bugs, or markup/CSS structure in HTML and stylesheets.
---

# Markup review

## Scope

Applies to HTML templates and CSS/SCSS/Sass/Less files. Skip SPA-framework
component APIs; those belong to the matching frontend plugin.

## Workflow

1. **Identify the surface** — page, partial, or stylesheet the user named.
2. **Check semantics** — headings, landmarks, labels, and form controls.
3. **Check contrast and focus** — visible focus, skip links if the app already has them.
4. **Check layout source** — which stylesheet owns the broken rule; edit there.
5. **Report** — blockers (missing labels, keyboard traps) vs style nits.

Do not rewrite the design system. Match existing tokens and class names.
