---
title: refactor: standardize component usage
type: refactor
date: 2026-01-22
---

# refactor: standardize component usage

## Overview

Review component usage across the entire app and refactor UI rendering to reuse existing components, minimize ad hoc styling, and add missing shadcn/ui primitives when needed. The scope includes app-level UI (dashboard, object views, tasks table) and the json-render component catalog alignment so any new components are consistent across `components/ui`, `lib/catalog.ts`, and the generation prompt.

## Problem Statement / Motivation

The app currently mixes bespoke Tailwind layouts and custom components alongside shared UI primitives. This creates styling drift, duplicated patterns (for example table and badge variants), and a higher maintenance cost when updating UI behaviors. Standardizing component usage should improve consistency, reduce custom styling spread across files, and make it easier to add or swap UI pieces without reworking layout code.

## Proposed Solution

1. Inventory component usage and custom styling across the app:
   - Scan `components/page/index.tsx`, `components/object-view.tsx`, and `components/tasks/*` for recurring layout and styling patterns.
   - Identify which patterns can be replaced with existing primitives in `components/ui` (Button, Input, Select, Dialog, Tooltip, Table primitives, Sidebar, etc.).
   - Tag custom UI elements that should become reusable components (especially if repeated in multiple places).

2. Review existing shared UI primitives and catalog alignment:
   - Confirm which `components/ui` files are json-render components versus app-level primitives.
   - Default to json-render components for anything likely to appear in the main content area (`<main>`). Only keep app-only primitives when the UI is clearly unique or not intended for generation.
   - Note name collisions with shadcn/ui components (Card, Badge, Separator, etc.) and decide on a safe naming or directory strategy before adding new components.
   - Keep `components/ui/index.ts`, `lib/catalog.ts`, and `app/api/generate/route.ts` in sync if new renderer components are introduced.

3. Add missing shadcn/ui components when needed:
   - Use `https://ui.shadcn.com/llms.txt` as the canonical list of available primitives before introducing new custom components.
   - Add needed primitives via the shadcn CLI or manual install, ensuring file names follow kebab-case in `components/ui/` and exports are updated.

4. Refactor app-level components to reuse shared primitives:
   - Replace ad hoc HTML + Tailwind combinations with shared primitives or newly added shadcn components.
   - Consolidate similar UI pieces (for example: unify table badges, separators, filters, and pagination controls).
   - Ensure any refactor keeps JSON-rendered widgets and data bindings working as-is.

## Technical Considerations

- `components/ui` currently mixes json-render components (e.g., `card.tsx`, `badge.tsx`, `heading.tsx`) with app-level shadcn primitives (e.g., `button.tsx`, `input.tsx`, `select.tsx`). Adding more shadcn components may require a naming or directory separation to avoid collisions.
- `components/ui/index.ts` exports `componentRegistry` and maps `RenderButton`/`RenderTabs` for json-render. Any new renderer component must be wired into `componentRegistry`, `lib/catalog.ts`, and `app/api/generate/route.ts`.
- The tasks table stack uses `@tanstack/react-table` with custom controls (`components/tasks/data-table-*.tsx`). Refactors must preserve filtering, sorting, pagination, and row selection behaviors.
- `components.json` and `app/globals.css` define shadcn/ui configuration and theme variables. New shadcn components should remain consistent with these tokens.
- Because this is a broad refactor, create an ExecPlan before implementation if the change set grows beyond simple swaps (per `.agent/PLANS.md`).

## Acceptance Criteria

- [ ] All app-level UI surfaces (`components/page/index.tsx`, `components/object-view.tsx`, `components/tasks/*`) use shared primitives where feasible; duplicated patterns are consolidated into reusable components.
- [x] Any newly added shadcn/ui components are sourced from `https://ui.shadcn.com/llms.txt`, placed under `components/ui/` with kebab-case filenames, and exported in `components/ui/index.ts`.
- [x] Components used in `<main>` default to json-render components unless clearly unique or not intended for generation.
- [x] Renderer-facing components remain aligned: `components/ui/index.ts` `componentRegistry`, `lib/catalog.ts`, and `app/api/generate/route.ts` are updated together when component availability changes.
- [ ] Table interactions (sorting, filtering, pagination, row selection) still work for the tasks table and json-render data table.
- [x] No new bespoke styling is introduced outside shared primitives or documented component styles; any necessary custom styles are encapsulated in reusable components.
- [ ] `npm run lint` and `npm test` complete successfully.

## Success Metrics

- Custom layout/styling in app-level components is reduced and concentrated in reusable primitives rather than spread across page files.
- UI behavior remains stable while component usage becomes more consistent and predictable.

## Dependencies & Risks

- Risk of visual regressions when replacing ad hoc layout with shared components; require targeted visual checks on the dashboard, object view, and tasks table.
- Potential naming collisions between json-render components and shadcn/ui components (Card, Badge, Separator).
- Refactors might inadvertently break json-render data bindings or action handlers if renderer props change.

## SpecFlow Notes

- Core user flows to preserve: dashboard load and navigation, command menu open/close, left/right sidebar toggles, object view routing, tasks table sorting/filtering/pagination, JSON-rendered widget generation.
- Edge cases to account for: empty states (no widgets, missing object), streaming generation state, small screen layouts (sidebars collapsed), and disabled states during generation.

## Open Questions

- Should json-render components be separated (directory or naming) from app-level shadcn primitives to avoid collisions, or should we retrofit existing renderer components to use shadcn styles directly?
- Is the scope limited to app-level UI files only, or should renderer components with inline styles also be refactored to shared primitives?
- Are there any UI areas outside the dashboard that must be treated as high-priority for consistency?
- Should `components/tasks` table primitives be consolidated with `components/ui/data-table.tsx`, or kept as a separate, task-specific implementation?

## References & Research

- `components/page/index.tsx`
- `components/object-view.tsx`
- `components/tasks/data-table.tsx`
- `components/tasks/data-table-pagination.tsx`
- `components/tasks/data-table-toolbar.tsx`
- `components/ui/index.ts`
- `components/ui/table-primitives.tsx`
- `components/ui/data-table.tsx`
- `lib/catalog.ts`
- `app/api/generate/route.ts`
- `components.json`
- `app/globals.css`
- https://ui.shadcn.com/llms.txt
