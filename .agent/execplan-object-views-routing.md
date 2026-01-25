# Add routed object views and shareable generated views

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds. Maintain this document in accordance with `.agent/PLANS.md`.

## Purpose / Big Picture

After this change, the page supports deep links and back/forward navigation for both generated views and object detail views (accounts, tasks, and future objects). Generated views are persisted so a shared URL reliably restores the same UI tree, and object views can be visited via stable routes like `/objects/accounts/<id>`. A user should be able to refresh the page or send a link to someone else and see the same generated layout or object details.

## Progress

- [x] (2026-01-20 14:26Z) Drafted ExecPlan with routing, persistence, and object view scope.
- [x] (2026-01-20 14:44Z) Implemented the view persistence store and API routes.
- [x] (2026-01-20 14:44Z) Refactored the page into a reusable client component and added a catch-all page route.
- [x] (2026-01-20 14:44Z) Added object view rendering with type definitions and linkable list entries.
- [x] (2026-01-20 14:44Z) Wired routing state to system views, generated views, and object views.
- [x] (2026-01-20 14:44Z) Updated catalog/schema/prompt for new DataTable link props and actions.
- [x] (2026-01-20 14:55Z) Ran `npm run lint` successfully.
- [x] (2026-01-20 15:10Z) Moved generated view storage out of the repo to avoid dev reload loops while keeping persistence via an env override.
- [x] (2026-01-20 15:22Z) Stabilized dropdown trigger IDs to eliminate Radix hydration mismatches in the sidebar.
- [x] (2026-01-20 16:10Z) Prevented generated-view refetch loops by decoupling route effects from recent state updates.
- [x] (2026-01-20 16:45Z) Switched generated view persistence to SQLite for durable, shareable storage.

## Surprises & Discoveries

- Observation: The project enforces `react-hooks/set-state-in-effect`, which flags route-synchronization effects that set state synchronously.
  Evidence: `npm run lint` reported errors in `components/page/index.tsx` before adding a scoped eslint disable.
- Observation: Radix dropdown trigger IDs can mismatch during hydration without stable IDs on the trigger element.
  Evidence: Next.js hydration warnings referenced `SidebarMenuButton` inside dropdown triggers.
- Observation: Generated view routes can refetch in a loop when the refresh updates recent state within the same effect.
  Evidence: Dev logs showed repeated GETs to the same `/api/views/:id` endpoint.

## Decision Log

- Decision: Use route patterns `/views/system/<id>`, `/views/generated/<id>`, and `/objects/<type>/<id>` for deep linking.
  Rationale: These paths are explicit, human-readable, and let us share both predefined and generated views while keeping object URLs consistent.
  Date/Author: 2026-01-20 / Assistant

- Decision: Use a local SQLite database (`~/.genui-dashboard/views.sqlite` by default) for generated views.
  Rationale: SQLite gives durable storage without introducing an external service and avoids file watcher churn inside the repo.
  Notes: Override the location with `GENERATED_VIEWS_DB_PATH` if needed.
  Date/Author: 2026-01-20 / Assistant

- Decision: Use a scoped eslint disable for route-selection effects that must set state in response to pathname changes.
  Rationale: The lint rule disallows synchronous setState in effects; the disable is localized to the routing sync effects to keep behavior intact.
  Date/Author: 2026-01-20 / Assistant

- Decision: Consolidate routes into `app/[[...slug]]/page.tsx` to keep the page client component mounted across deep links.
  Rationale: Separate page components remount client state on navigation, which breaks immediate access to newly generated views and recent state.
  Date/Author: 2026-01-20 / Assistant

## Outcomes & Retrospective

- Generated views now persist to SQLite (outside the repo by default) and can be shared via `/views/generated/<id>` routes; object views render for accounts and tasks with deep links and back/forward support. Routing uses an optional catch-all page to preserve client state across deep links. Lint passes; additional runtime verification is still recommended via the dev server.

## Context and Orientation

The page currently lives in `app/page.tsx` as a client component that holds state for system views (`lib/system-views.ts`), recent generated views, and the json-render stream. The json-render catalog and component guardrails are defined in `lib/catalog.ts`, while the generator prompt is in `app/api/generate/route.ts`. The accounts system view uses the json-render `DataTable` (`components/ui/data-table.tsx`) and the tasks system view uses a dedicated table with custom columns in `components/tasks/columns.tsx`. There is no persistent storage for generated views and no object detail page today.

## Plan of Work

First, introduce a small persistence layer in `lib/view-store.ts` backed by SQLite and expose it through new API routes in `app/api/views/route.ts` and `app/api/views/[id]/route.ts`. Next, refactor the page UI into `components/page/index.tsx` so a new optional catch-all page can render the same client component and parse path-based routing. Then add object view rendering via `components/object-view.tsx` and `lib/object-definitions.ts`, and update the accounts/tasks tables to link into `/objects/...`. Finally, wire routing to update active views, persist generated views after streaming, and update catalog/prompt definitions for new DataTable link props and actions.

## Concrete Steps

- Working dir: `/Users/igors.razvodovskis/Development/genUI-test-dashboard`.
- Add `lib/view-store.ts` with file-backed helpers to create, update, and fetch generated views.
- Add API routes in `app/api/views/route.ts` (POST) and `app/api/views/[id]/route.ts` (GET/PUT).
- Move the page client logic into `components/page/index.tsx` and make `app/[[...slug]]/page.tsx` a thin wrapper that renders it.
- Create `lib/object-definitions.ts` describing accounts/tasks object metadata and fields.
- Create `components/object-view.tsx` to render object details from shared data.
- Update `components/ui/data-table.tsx` and `lib/catalog.ts` to support linkable columns and a base object route.
- Update `lib/system-views.ts` accounts table config to link account names into `/objects/accounts/<id>`.
- Update `components/tasks/columns.tsx` to link task IDs to `/objects/tasks/<id>`.
- Update `app/api/generate/route.ts` prompt and `lib/catalog.ts` actions to reflect any new action names.

## Validation and Acceptance

Run `npm run lint` and confirm no new lint errors. Start the dev server with `npm run dev` and verify the following:

- Navigating to `/views/system/system-accounts` loads the Accounts system view.
- Generating a view yields a URL like `/views/generated/<id>`; refreshing the page restores the generated view.
- Clicking an account name opens `/objects/accounts/<id>` and renders the object detail view; browser back returns to the accounts list.
- Clicking a task ID opens `/objects/tasks/<id>` and renders the task detail view.

If lint or dev server is not run, record the gap and provide manual verification guidance.

## Idempotence and Recovery

The changes are additive and safe to re-run. If a persistence bug appears, the app still works without stored views by regenerating. If routing regressions occur, revert to using the original `app/page.tsx` client component and remove the catch-all route.

## Artifacts and Notes

- None yet.

## Interfaces and Dependencies

- `lib/view-store.ts` exports `createView`, `updateView`, `touchView`, and `listViews`, each returning a `StoredView` object `{ id, prompt, tree, createdAt, updatedAt }`.
- `app/api/views/route.ts` implements POST to create a view.
- `app/api/views/[id]/route.ts` implements GET to fetch and PUT to update a view.
- `components/object-view.tsx` renders object details for a given `{ objectType, objectId }` and uses `lib/object-definitions.ts` for field metadata.
- `components/ui/data-table.tsx` supports a column-level `link` flag plus table-level `linkBasePath` and `linkIdKey` props.

Plan created: 2026-01-20 / Assistant.
