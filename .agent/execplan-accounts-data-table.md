# Add Accounts DataTable system view

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds. Maintain this document in accordance with `.agent/PLANS.md`.

## Purpose / Big Picture

Enable a richer “Accounts” system view that uses a data-table experience (sorting, filtering, row selection) similar to shadcn’s data table. After implementation, a user can open the Accounts system view from the left sidebar, see metrics plus an interactive table, sort columns, search/filter rows, and select rows for bulk actions. The feature should be driven by json-render data, wired into the catalog/registry, and styled to match the project’s shadcn-inspired look.

## Progress

- [x] (2025-02-19 12:00Z) Drafted ExecPlan and captured current intent.
- [x] (2025-02-19 12:15Z) Implemented DataTable UI component with sorting/filter/selection using TanStack Table.
- [x] (2025-02-19 12:20Z) Registered DataTable in `components/ui/index.ts` and catalog schema.
- [x] (2025-02-19 12:22Z) Updated accounts data with stable `id` fields for table usage.
- [x] (2025-02-19 12:25Z) Swapped Accounts system view to use DataTable with sorting/selection/search.
- [x] (2025-02-19 12:40Z) Removed account summary metric cards per request; Accounts view now shows only the interactive table.
- [x] (2025-02-19 12:48Z) Removed Accounts card container/title/subheader and pagination; view now shows toolbar + table only.
- [x] (2025-02-19 13:05Z) Added Radix checkbox with indeterminate indicator and wired DataTable selection to it.
- [x] (2025-02-19 13:45Z) Made toolbar filters operational via filter action + DataTable external filter support (status filter event).
- [x] (2025-02-19 14:05Z) Added shadcn Tabs component and wired Accounts toolbar to tabs that trigger the filter action; catalog/registry updated.
- [x] (2025-02-19 14:12Z) Adjusted toolbar layout to keep Export CSV aligned after adding tabs.
- [x] (2025-02-19 14:30Z) Swapped Dashboard documents section buttons for shadcn Tabs wired to `view_details`.
- [ ] (2025-02-19 12:32Z) Lint/tests: lint passed; tests absent (vitest exits with no test files). Manual UI validation still pending.

## Surprises & Discoveries

- `pnpm add @tanstack/react-table` emitted a build-script warning (esbuild, sharp, unrs-resolver) but install succeeded; no build scripts were run.
- `pnpm test` fails because there are no test files; noted for awareness.

## Decision Log

- Decision: Use TanStack Table via shadcn-style wrapper instead of extending the simple Table.
  Rationale: Provides battle-tested sorting/filtering/selection and matches the requested shadcn data-table behavior with less bespoke logic.
  Date/Author: 2025-02-19 / Assistant

## Outcomes & Retrospective

- To be filled after implementation.

## Context and Orientation

The app uses json-render to render a UI tree from `lib/system-views.ts` and initial data from `app/page.tsx`. Components are registered in `components/ui/index.ts` and validated via `lib/catalog.ts`. The existing `Table` component is simple and lacks sorting/filtering/selection. We need a new richer table component (DataTable) aligned with shadcn’s pattern. The left sidebar lists `SYSTEM_VIEWS`; adding an Accounts view requires updating `lib/system-views.ts` and ensuring data paths exist in `INITIAL_DATA`.

## Plan of Work

1) Add a `DataTable` component in `components/ui/data-table.tsx` using `@tanstack/react-table` for sorting, filtering, pagination, and optional row selection. Props: `title?`, `dataPath` (json path to array), `columns` (array of `{ key, label, format?, sortable? }`), `enableSelection?`, `initialSort?`, `searchKey?`, and `emptyMessage?`. Implement toolbar with search input (filters by `searchKey` or all string fields), selection checkbox column, and display selected count. Styling should mirror shadcn data-table (bordered card, hover rows, pill badges).

2) Register DataTable in `components/ui/index.ts` and add a `DataTable` schema entry to `lib/catalog.ts` (props matching component). Ensure catalog exposes the new component name to the generator.

3) Extend `INITIAL_DATA` in `app/page.tsx` accounts list with stable `id` fields (e.g., slugs) and any extra fields needed for filters/search. Keep summary metrics unchanged.

4) Update `lib/system-views.ts` Accounts view to use `DataTable` instead of the simple `Table`, wiring columns (name, owner, segment, status, health, ARR, renewal date) with sortable/badge formatting, enabling selection and search. Keep existing metrics and toolbar actions; adjust descriptions to mention the richer table.

5) Validation: run `npm run lint` and `npm test` (expected no tests present but ensure command succeeds once tests exist). Optionally run `npm run dev` to manually verify the Accounts view renders, supports sorting and selection, and shows selected count updates.

## Concrete Steps

- Working dir: `/Users/igors.razvodovskis/Development/genUI-test-dashboard`.
- Install dependency: `npm install @tanstack/react-table` (adds to package.json).
- Implement `components/ui/data-table.tsx` with TanStack table setup, toolbar, search, sorting headers, selection checkboxes, and formatting for currency/date/badge.
- Update `components/ui/index.ts` to export and register `DataTable`.
- Update `lib/catalog.ts` to include `DataTable` with props schema.
- Modify `app/page.tsx` accounts data to add `id` fields.
- Replace Accounts table in `lib/system-views.ts` to use `DataTable` with columns and options.
- Run `npm run lint` and `npm test` (note: tests currently absent; ensure command does not error if possible).
- Manual check (if time): start dev server and verify Accounts view interactions.

## Validation and Acceptance

Acceptance: In dev mode (`npm run dev`), opening the Accounts system view shows metric cards plus a table that supports: click column headers to sort, type in search to filter, and select rows via checkboxes with a selected count indicator. Data should reflect `INITIAL_DATA.accounts.list`, and badge formatting should appear for status/health. Lint/test commands complete without new errors.

## Idempotence and Recovery

Steps are additive. Re-running dependency install or table rendering is safe. If TanStack table integration fails, revert to the previous `Table` component by switching the Accounts view back and removing the dependency. Keep json paths consistent to avoid runtime nulls.

## Artifacts and Notes

- Record any command output snippets (lint/test) in `Outcomes & Retrospective`.

## Interfaces and Dependencies

- New dependency: `@tanstack/react-table`.
- Component interface (for catalog and registry):
  - `DataTable` props: `title?: string`, `dataPath: string`, `columns: Array<{ key: string; label: string; format?: "text"|"currency"|"date"|"badge"; sortable?: boolean }>`, `enableSelection?: boolean`, `initialSort?: { key: string; direction: "asc"|"desc" }`, `searchKey?: string`, `emptyMessage?: string`.
  - Actions: reuse existing action handlers for refresh/export; selection is handled locally (no external action dispatch required unless added later).
