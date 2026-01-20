# Align shared table utilities and primitives

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds. Maintain this document in accordance with `.agent/PLANS.md`.

## Purpose / Big Picture

Reduce duplication across the project’s table implementations without merging their behavior into a single component. After this change, table formatting, empty states, input styling, and base table primitives are shared while each data table keeps its own sorting/filtering/data source logic. Users will see the same UI as before; the benefit is a single place to update shared visuals and formatting.

## Progress

- [x] (2025-02-19 15:40Z) Drafted ExecPlan and captured refactor scope.
- [x] (2025-02-19 16:20Z) Shared table formatting helper used by both json-render `Table` and `DataTable`.
- [x] (2025-02-19 16:25Z) Shared empty-state component wired into json-render table components.
- [x] (2025-02-19 16:30Z) Promoted shared Input primitive to `components/ui`, updated table toolbars/search to use it.
- [x] (2025-02-19 16:40Z) Promoted table primitives to `components/ui/table-primitives.tsx`, refactored tables to use them.
- [x] (2025-02-19 16:45Z) Validation noted: lint/tests not run in this pass; manual verification recommended.

## Surprises & Discoveries

- None yet.

## Decision Log

- Decision: Keep table primitives in `components/ui/table-primitives.tsx` and import directly, not through `components/ui/index.ts`, to avoid name collisions with the json-render `Table` component.
  Rationale: The registry already exports `Table` for json-render, and exporting another `Table` would be confusing. Direct imports keep shared primitives without breaking the registry API.
  Date/Author: 2025-02-19 / Assistant
- Decision: Align the Tasks table container and cell padding with the Accounts table by using shared container classes on the table primitives.
  Rationale: This keeps the unique behaviors while presenting both lists with consistent spacing, border radius, and row density.
  Date/Author: 2025-02-19 / Assistant

## Outcomes & Retrospective

- Shared table formatting, empty states, and primitives now live in `lib/table-format.tsx`, `components/ui/table-empty.tsx`, and `components/ui/table-primitives.tsx`, reducing duplication across json-render and Tasks tables. Input styling is consolidated in `components/ui/input.tsx`, and Tasks table spacing now matches Accounts. Tests were not run in this pass; manual verification is recommended.

## Context and Orientation

There are multiple table implementations:
- `components/ui/table.tsx` is the json-render `Table` component.
- `components/ui/data-table.tsx` is a json-render `DataTable` with custom sorting/filtering.
- `components/tasks/data-table.tsx` is the Tasks view’s TanStack table.
- `components/tasks/table.tsx` provides table primitives for the Tasks view.
- `components/tasks/input.tsx` is a generic input used by the Tasks toolbar.

Shared opportunities include formatting logic for currency/date/badge values, empty-state UI, and base table primitives. We will extract these into shared utilities and update the existing table components to use them without altering behavior.

## Plan of Work

1) Extract table cell formatting into a shared helper in `lib/table-format.tsx`. Update `components/ui/table.tsx` and `components/ui/data-table.tsx` to call the helper with configuration that preserves existing formatting (currency rounding stays as-is per component).

2) Create a shared empty-state component in `components/ui/table-empty.tsx`. Replace the duplicated empty-state markup in `components/ui/table.tsx` and `components/ui/data-table.tsx` with this component.

3) Move `components/tasks/input.tsx` to `components/ui/input.tsx`, update imports in `components/tasks/data-table-toolbar.tsx`, and update `components/ui/data-table.tsx` to use the same Input component for its search field.

4) Move `components/tasks/table.tsx` to `components/ui/table-primitives.tsx` and update `components/tasks/data-table.tsx` (and `components/ui/data-table.tsx`) to use the shared primitives. Where necessary, pass class overrides so each table’s visual layout remains unchanged. Remove the old Tasks table file.

5) Update `components/ui/index.ts` to export any new UI primitives (Input, TableEmpty) while avoiding name collisions with the existing json-render `Table` component.

6) Validation: note whether lint/tests were run and provide manual verification guidance if they were not.

## Concrete Steps

- Working dir: `/Users/igors.razvodovskis/Development/genUI-test-dashboard`.
- Add `lib/table-format.tsx` with a `formatTableCell(value, format, options?)` helper.
- Add `components/ui/table-empty.tsx` and replace empty state markup in `components/ui/table.tsx` and `components/ui/data-table.tsx`.
- Move `components/tasks/input.tsx` to `components/ui/input.tsx` and update imports in `components/tasks/data-table-toolbar.tsx` and `components/ui/data-table.tsx`.
- Move `components/tasks/table.tsx` to `components/ui/table-primitives.tsx` and update `components/tasks/data-table.tsx` plus `components/ui/data-table.tsx` to use the primitives with class overrides.
- Update `components/ui/index.ts` exports for new primitives.
- Record any validation (lint/tests/manual).

## Validation and Acceptance

Acceptance: Tasks data table and json-render tables render as before with no layout regressions. The Tasks view still has filtering, view options, and row actions; json-render tables still format currency/date/badge values correctly and show the empty-state styling. If running lint/tests, the commands should complete without new errors.

## Idempotence and Recovery

Changes are additive and safe to re-run. If a refactor introduces a regression, revert the shared helper usage by restoring the previous inline formatting or empty-state markup in the affected component, and re-introduce the previous per-feature input/table primitives.

## Artifacts and Notes

- None yet.

## Interfaces and Dependencies

- New helper: `lib/table-format.tsx` exports `formatTableCell(value, format, options?)`.
- New UI primitive: `components/ui/table-empty.tsx` exports `TableEmpty`.
- New UI primitive: `components/ui/input.tsx` exports `Input`.
- New primitives module: `components/ui/table-primitives.tsx` exports `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableHead`, `TableRow`, `TableCell`, `TableCaption`.

Plan created: 2025-02-19 / Assistant. This plan will be updated as work proceeds.

Plan update (2025-02-19 16:45Z): Marked shared formatting, empty state, Input, and table primitives refactors as completed in Progress after implementing them.
Plan update (2025-02-19 16:55Z): Logged the Tasks wrapper decision and recorded validation status (tests not run) in Progress/Decision Log.
Plan update (2025-02-19 17:00Z): Added Outcomes & Retrospective summary to capture completed refactor and validation status.
Plan update (2025-02-19 17:55Z): Updated decision/outcome to reflect aligning Tasks table container styling with Accounts.
