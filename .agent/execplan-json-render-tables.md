# Make all tables json-render compatible

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds. Maintain this document in accordance with `.agent/PLANS.md`.

## Purpose / Big Picture

Ensure every table shown in the app is backed by a json-render component so it can be rendered through the same registry/catalog pipeline. After this change, the Tasks table is exposed as a json-render component with a data path prop, and the Tasks system view uses that component directly. This keeps table behavior unique while making the rendering model consistent across views.

## Progress

- [x] (2025-02-19 17:05Z) Drafted ExecPlan and captured scope.
- [x] (2025-02-19 17:20Z) Added Tasks table json-render component with data-path props.
- [x] (2025-02-19 17:25Z) Updated registry/catalog/system view to use the Tasks table component.
- [x] (2025-02-19 17:30Z) Removed the old Tasks view component and updated prompts/docs.
- [x] (2025-02-19 17:35Z) Validation noted: lint/tests not run in this pass; manual verification recommended.

## Surprises & Discoveries

- None yet.

## Decision Log

- Decision: Replace the Tasks view wrapper with a Tasks table json-render component instead of extending the generic DataTable schema.
  Rationale: Tasks table behavior is unique (filters, columns, row actions), so a dedicated json-render component keeps specialization without forcing a universal API.
  Date/Author: 2025-02-19 / Assistant

## Outcomes & Retrospective

- Tasks table now renders through a dedicated json-render component (`TasksTable`) with a configurable data path. Registry, catalog, system views, and generator prompt all point to the new component. Tests were not run in this pass; manual verification is recommended.

## Context and Orientation

The app uses json-render to render UI elements described in `lib/system-views.ts` using components registered in `components/ui/index.ts` and validated through `lib/catalog.ts`. The Tasks screen currently renders via `TasksView` (`components/ui/tasks-view.tsx`), which is a json-render component but is not itself a table component. The Tasks data table lives in `components/tasks/data-table.tsx` and is not directly usable by json-render. We will expose a dedicated json-render component that reads tasks from shared data (`/tasks/items`) and renders the Tasks table.

## Plan of Work

1) Create `components/ui/tasks-table.tsx` (or rename `tasks-view.tsx`) to export `TasksTable`, a json-render component that reads tasks from a `dataPath` prop (default `/tasks/items`) and renders the existing Tasks DataTable.

2) Register `TasksTable` in `components/ui/index.ts` and add it to the catalog in `lib/catalog.ts` with a `dataPath` prop. Update the generator prompt (`app/api/generate/route.ts`) to reflect the new component.

3) Update `lib/system-views.ts` to use `TasksTable` as the Tasks system view root element. Remove the old `TasksView` component and its registry/catalog entries.

4) Validation: record whether lint/tests were run; if not, note manual verification guidance.

## Concrete Steps

- Working dir: `/Users/igors.razvodovskis/Development/genUI-test-dashboard`.
- Add or rename `components/ui/tasks-table.tsx` to expose `TasksTable` with `ComponentRenderProps` and a `dataPath` prop.
- Update `components/ui/index.ts` exports/registry for `TasksTable` and remove `TasksView`.
- Update `lib/catalog.ts` to add `TasksTable` and remove `TasksView`.
- Update `app/api/generate/route.ts` component list to reflect the new component name.
- Update `lib/system-views.ts` Tasks tree to use `TasksTable` with `dataPath` set to `/tasks/items`.
- Delete `components/ui/tasks-view.tsx` if no longer referenced.
- Record validation status.

## Validation and Acceptance

Acceptance: The Tasks system view renders the same Tasks table via the json-render registry, and the system view uses a `TasksTable` element in `lib/system-views.ts`. No runtime errors are introduced by missing registry/catalog entries. If lint/tests are run, they should complete without new errors.

## Idempotence and Recovery

Changes are additive and safe to repeat. If a regression occurs, revert the system view to use the previous `TasksView` component and restore its registry/catalog entries.

## Artifacts and Notes

- None yet.

## Interfaces and Dependencies

- New component: `components/ui/tasks-table.tsx` exports `TasksTable`.
- Catalog entry: `TasksTable` with props `{ dataPath?: string | null }`.
- System view uses `TasksTable` as the Tasks root element.

Plan created: 2025-02-19 / Assistant. This plan will be updated as work proceeds.
Plan update (2025-02-19 17:35Z): Marked implementation steps complete and recorded validation status after switching the Tasks view to a json-render TasksTable component.
