---
name: smb-pragmatism
description: |
  Right-sized development philosophy for SMB context. Auto-apply when discussing
  architecture decisions, technical trade-offs, scope questions, or reviewing code.
  Use when someone asks "how should we build this?", "is this over-engineered?",
  "should we add X?", or any build-vs-buy discussion. Not for communication drafting
  or non-engineering decisions; non-negotiable quality areas are governed by
  quality-bar, not relaxed here.
user-invocable: false
_organized: true
---

# SMB Pragmatism

## Core Principle

**Pragmatic ≠ Sloppy**

Sloppy work has to be done twice. Pragmatic work is done **right-sized** for the problem.

---

## What Pragmatic Means

### Right-Sized for SMB Scale
- Ship features solving real customer problems now
- Build for 10x scale (not 1000x)
- Use proven patterns (not bleeding edge)
- Optimize for team maintainability

### Quality Where It Matters

**High Standards (Non-Negotiable):**

Non-negotiables (customer-facing correctness, data integrity, OWASP Top 10, exact compliance) are owned by `work-mode/quality-bar.md` — this skill governs right-sizing below that line.

**Pragmatic Standards (Fit-for-Purpose):**
- Internal tools — Good enough > perfect
- Performance — Fast enough for users
- Scalability — Current load + 10x growth
- Code elegance — Readable > award-winning

### Ship Fast, Refactor Smart
- Ship working features quickly
- Document technical debt explicitly in tasks/notes, not as TODO comments in code
- Refactor when debt blocks new features
- Pay debt with interest (each touch improves)

### Team Maintainability > Individual Brilliance
- Boring, predictable patterns
- Consistent with existing codebase
- Documented decisions (why, not just what)
- Tested enough to refactor confidently

### Evidence-Based, Not Ivory Tower
- Real customer feedback > theoretical best practices
- Measured performance > assumed bottlenecks
- Proven patterns in our stack > cutting-edge
- Actual team capacity > ideal capacity

---

## Decision Framework

- Prefer the simple right thing over the fast wrong thing
- Avoid speculative architecture and fake enterprise complexity
- Avoid lazy shortcuts that create predictable downstream pain
- Good enough is valid only when downside is bounded and cleanup cost stays low
- Ten more lines to avoid a future footgun can be the pragmatic choice
- Elegance means the simplest structurally correct solution, not the most abstract one
- Do not add indirection or architecture theater in the name of elegance
- If the obvious fix is already simple and sound, ship it without inventing a cleverer path

## Engineering Judgment

- Internal tools can be lighter, but not structurally stupid
- If a problem is obvious, recurrent, and cheap to solve correctly, solving it correctly is the pragmatic move
- Do not spend complexity budget where it does not matter
- Do spend quality attention where sloppiness compounds
- Strict where errors compound; lean where extra polish adds no real value

---

## When to Break Pragmatism

Sometimes you DO need the "ivory tower" solution:

1. **Regulatory/Compliance** — Zero tolerance
2. **Security** — OWASP vulnerabilities fix immediately
3. **Data Integrity** — Financial/customer data
4. **Proven Bottleneck** — Evidence shows won't scale

---

## Application

When reviewing code or architecture:
- Ask: "Is this right-sized for the actual problem?"
- Challenge over-engineering: "What's the 10x scenario, not 1000x?"
- Challenge under-engineering: "Will this work correctly for customers?"
- Default to boring patterns unless there's evidence otherwise
- Surface right-sizing findings first, one per line, each with the concrete simpler or stronger alternative.
