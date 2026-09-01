---
name: ui
description: >
  Build and review product-specific web and frontend interfaces. Use for pages,
  components, forms, tables, dashboards, renderers, visual regressions,
  responsive behavior, or user-facing interaction surfaces. Not for pure backend
  work and not to override an established design system.
argument-hint: "[component|page|review-task]"
---

# UI Development Guardrail

Product honesty over interface theater. Structure first, styling second.

## Build Rules

- Reuse the existing design system, tokens, components, and layout primitives.
- Establish hierarchy through layout and typography before decoration.
- Keep forms and tables readable, scannable, and stateful.
- Match interaction depth to frequency: a setting changed every session should
  not require edit, form, and save.
- Make mobile deliberate; do not turn desktop data into unscannable card soup.
- Use motion only to clarify a state change.

## Product Copy Boundary

Visible copy describes the user's product situation, not the prompt, ticket,
implementation, demo, or test setup. Check normal, empty, loading, validation,
error, and confirmation states for leaked internal language.

## Reject By Default

- decorative gradients, glass, and pills used as a substitute for hierarchy
- fake dashboards, charts, or metrics to fill space
- marketing-style hero blocks inside ordinary product screens
- controls whose visual weight exceeds the decision they represent

## Review Checklist

- Is the surface product-specific and consistent with the system?
- Are hierarchy, states, and next actions clear?
- Is every visible string written for the user rather than the implementation?
- Does responsive behavior preserve scanning and rhythm?
- Was every touched menu, popover, overlay, and dialog inspected open?

Use `implementation` for multi-file UI delivery, `discipline` before claiming a
UI works, and `dev-review` when the change creates a shared interface boundary.
