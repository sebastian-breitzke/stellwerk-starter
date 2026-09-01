---
name: dev-ui
description: "UI development and review guardrail for product-honest, non-generic interfaces. Use automatically when building, changing, debugging, or reviewing web/frontend UI, renderers, block/message output, dashboards, internal tools, app shells, forms, tables, route screens, screenshots, visual regressions, responsive behavior, or user-facing interaction surfaces. Do not use it to override an established design system, and not for pure backend or non-visual work."
argument-hint: "[component|page|review-task]"
_organized: true
---

# /dev:ui - UI Development Guardrail

**Purpose:** Guide UI implementation and review toward interfaces that feel product-specific, structurally clear, and worth shipping.

**Source inspiration:** `https://github.com/cyxzdev/Uncodixfy/blob/main/Uncodixfy.md`

## When To Use

Use this skill when:
- building or reviewing product UI
- designing dashboards, internal tools, admin surfaces, or app shells
- a proposal feels too AI-generated, too decorative, or too startup-generic
- hierarchy, layout, forms, tables, or mobile behavior need real product discipline

Do not use this skill to fight an established design system. If the product already has a strong visual language, follow the system first.

## Core Rules

- Product honesty over UI theater.
- Structure first, styling second.
- Existing design system beats improvisation.
- Calm, readable interfaces beat chrome-heavy attention traps.
- Mobile must stay readable and intentional, not collapse into card soup.

## Development Rules

- Reuse existing components, tokens, and layout primitives before inventing new ones.
- Prefer predictable layout and clear information hierarchy.
- Forms should be boring and readable: labels above inputs, obvious validation, clear focus states.
- Tables and lists should optimize scanning, not decoration.
- When a surface must get denser or calmer, cut content first, not layout
  technique: drop secondary lines, redundant group sums, and per-row action
  trios before switching table/grid mechanics. Swapping the layout while
  keeping every element is how "kompakter" requests fail on the first pass.
- Group header rows only when groups actually have more than one child; a
  group of one duplicates every number it summarizes — inline the group label
  into the row instead.
- Buttons should look like controls, not marketing pills.
- Motion should clarify state change, not perform taste.

## Product Copy Boundary

Treat every visible string as product behavior, not as a convenient echo of the
prompt. User dictation, tickets, acceptance criteria, test fixtures, agent
instructions, implementation notes, and architecture terms explain what to
build; they are not candidate UI copy by default.

Before rendering or approving a UI, inspect all visible strings and remove
fourth-wall language:

- no agent/process language such as mockup, demo, synthetic, test data, pilot,
  same logic, implementation, endpoint, or internal/external flow unless the
  actual user needs that fact to complete the task;
- no explanatory copy that merely repeats why the feature was built or compares
  it with another surface;
- no developer or domain-model labels where the user's established vocabulary
  exists;
- no disclaimers embedded in the primary workflow merely to reassure the team
  about constraints already enforced elsewhere.

Write from the active user's situation: what they are doing, what information
they need now, and what the next action means. If a prototype represents the
future real product, its copy must also represent the future real product.

## Zeremonie Gegen Häufigkeit

Match the depth of the interaction to how often the setting is actually
touched. Depth means every step between intent and effect: opening a panel,
pressing an edit button, filling a form, confirming a save.

- A setting that belongs to the next action — the model a message will run on,
  the account a payment posts to, the branch a build targets — is one gesture
  in place. It shows its current value and changes on selection.
- A setting configured once per workspace, tenant, or install may live behind a
  dialog with an explicit save.

A Cancel/Save form for a value the user turns several times a day is the
failure mode. Each step is defensible alone; the sum is not. When a control sits
in a working surface, count the steps to change it and justify every one against
its frequency.

Corollary for state signals: in a quiet text row, indicate an on/off state
through ink weight or color, not through a border and filled background around
the icon. The box is louder than the statement it makes.

## Anti-Patterns To Reject

- oversized rounded corners everywhere
- pill overload
- glassmorphism by default
- decorative gradients used to fake taste
- fake control-room dashboards
- metric-card grids as first instinct
- fake charts to fill space
- hero sections inside normal product UI
- eyebrow/headline/support mini-marketing blocks inside app screens
- ornamental labels like "live pulse" unless the product voice truly calls for it
- style decisions chosen only because they are easy for AI to generate

## Review Checklist

- Does this look product-specific rather than AI-generic?
- Is hierarchy created by layout and typography instead of glow and chrome?
- Is there one clear structure rather than stacked feature theater?
- Are colors restrained and coherent?
- Are controls and states obvious?
- Does the number of steps to change a setting match how often it is changed —
  no edit-then-form-then-save for a value touched every session?
- Does mobile keep clarity and rhythm?
- Did we avoid decorative elements that add no product value?
- Does every visible string belong to the user's product situation rather than
  exposing the prompt, implementation, test setup, or agent process?
- Was the copy boundary checked in every relevant dynamic state, including
  validation, loading, empty, result, error, and confirmation states?
- Was every popover, menu, overlay, and dialog on the touched surface verified
  in its open state, not only at rest?

## Output Contract

When using this skill:
- name the generic UI patterns being rejected
- state the structural alternative chosen
- keep recommendations grounded in product needs, not visual performance

Done when the Review Checklist has been answered for the touched surface.

## Skill Handoffs

When this skill is active:

- If UI work requires code changes across routes, components, queries, backend APIs, or tests → load `dev-implement`.
- If the UI problem is a bug, rendering failure, screenshot mismatch, or unexpected behavior → load `dev-discipline/references/debug.md`.
- Before claiming a UI change works → load `dev-discipline/references/verify.md` and verify the affected rendered surface, not only compilation.
- If model prompts, block contracts, skills, MCP tools, or AI output instructions shape the UI content → load `prompt-creation-review`.
- If the UI change introduces a new shared component/interface or replaces a product pattern → load `dev-review`.

## Related

- `/dev:implement` with `--web` is the orchestrator for UI feature work. It calls this guardrail in phase 1 and phase 3.
- `/dev:review` is the architecture-level judgment. Use that for fit; use this for surface quality.
