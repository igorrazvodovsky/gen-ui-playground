---
status: ready
priority: p2
issue_id: "001"
tags: [ui, refactor, json-render, shadcn]
dependencies: []
---

# Standardize component usage and renderer alignment

Reduce bespoke UI styling by reusing shared primitives, retrofit json-render components to shadcn styles, and ensure `<main>` content defaults to json-render components unless clearly unique or non-generated.

## Problem Statement

The app currently mixes inline styles, ad hoc Tailwind layouts, and shared primitives across dashboard, object views, and task tables. This causes styling drift, duplicated UI patterns, and higher maintenance overhead when adjusting the design system. We need a consistent component strategy so changes can be made once and reused across generated and app-authored views.

## Findings

- Renderer components (`components/ui/*`) still use inline styles in several places (e.g., `components/ui/card.tsx`, `components/ui/badge.tsx`, `components/ui/heading.tsx`).
- `<main>` content is a mix of json-render components and app-only React components (`components/object-view.tsx`, `components/ui/tasks-table.tsx`).
- `components/ui/index.ts`, `lib/catalog.ts`, and `app/api/generate/route.ts` must stay aligned when component availability changes.
- Tasks tables are implemented in `components/tasks/*` and currently use bespoke controls and styling.

## Proposed Solutions

### Option 1: Retrofit renderer components to shadcn styles and migrate `<main>` content to json-render

**Approach:** Keep `components/ui` as the shared home for primitives and renderer components; retrofit renderer components to use shadcn styles (no inline styles), migrate object views and tasks table usage to json-render components, keep task tables task-specific.

**Pros:**
- Consistent design system usage
- Matches generation constraints for `<main>` content
- Minimal folder churn

**Cons:**
- Requires careful mapping of renderer props to shadcn primitives
- Larger refactor surface area

**Effort:** 1-2 days

**Risk:** Medium

---

### Option 2: Separate renderer components into dedicated folder

**Approach:** Move renderer-specific components to a separate folder to avoid naming collisions and keep shadcn primitives in `components/ui`.

**Pros:**
- Clear separation of responsibilities
- Avoids naming conflicts

**Cons:**
- Large rename/refactor overhead
- Not aligned with current direction

**Effort:** 2-3 days

**Risk:** Medium

## Recommended Action

Proceed with Option 1. Keep everything in `components/ui`, retrofit renderer components to shadcn styles, migrate object views and tasks table to json-render components for `<main>`, and keep task tables task-specific for now. Update `lib/catalog.ts`, `components/ui/index.ts`, and `app/api/generate/route.ts` together when components change.

## Technical Details

**Affected files:**
- `components/dashboard-page.tsx` - main layout and widget rendering
- `components/object-view.tsx` - migrate to json-render
- `components/ui/tasks-table.tsx` - migrate to json-render usage
- `components/tasks/*` - keep task-specific tables but reuse primitives
- `components/ui/*` - retrofit renderer components to shadcn styles
- `components/ui/index.ts` - componentRegistry alignment
- `lib/catalog.ts` - component catalog
- `app/api/generate/route.ts` - generation prompt

## Resources

- https://ui.shadcn.com/llms.txt
- `components.json`
- `app/globals.css`

## Acceptance Criteria

- [ ] App-level UI surfaces (`components/dashboard-page.tsx`, `components/object-view.tsx`, `components/tasks/*`) use shared primitives where feasible.
- [ ] Components used in `<main>` default to json-render components unless clearly unique or not intended for generation.
- [ ] Renderer components use shadcn styling instead of inline styles.
- [ ] `components/ui/index.ts`, `lib/catalog.ts`, and `app/api/generate/route.ts` remain aligned.
- [ ] Tasks table interactions (sorting/filtering/pagination/selection) still work.
- [ ] `npm run lint` and `npm test` pass.

## Work Log

### 2026-01-22 - Kickoff

**By:** Claude Code

**Actions:**
- Confirmed direction to keep `components/ui` as shared home and retrofit renderer components to shadcn styles.
- Confirmed `<main>` content should default to json-render components.
- Captured decision to keep task tables task-specific for now.

**Learnings:**
- Renderer/catalog/prompt alignment is a key risk area during refactors.
- Tasks table uses dedicated components that should stay intact for now.

### 2026-01-22 - Renderer refactor and object view migration

**By:** Claude Code

**Actions:**
- Added json-render `ObjectView` component and routed object views through `Renderer`.
- Added shared `Separator` primitive and updated tasks filter to use it.
- Retrofitted renderer components (Card, Badge, Text, Metric, Select, TextField, DatePicker, Alert, Empty, Grid, Stack, Divider, RenderButton, Chart) to use shadcn-style classes instead of inline styles.
- Synced `components/ui/index.ts`, `lib/catalog.ts`, and `app/api/generate/route.ts` for `ObjectView`.
- Ran `npm run lint` (pass) and `npm test` (fails: no test files found).

**Learnings:**
- Inline style removal is mostly concentrated in renderer components; charts still require dynamic height styles.

## Notes

- Ensure any new components added from shadcn are exported in `components/ui/index.ts` and considered for catalog/prompt updates.
