# Refactor dashboard page into modular layout system

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

The repository guidelines live at `.agent/PLANS.md` from the repository root. Maintain this document in accordance with that file.

## Purpose / Big Picture

After this change, the dashboard page behaves the same in the UI but its code is organized into focused modules: constants, utilities, state hooks, and layout components. A maintainer can now locate persistence, recents, and layout logic quickly, and the refactor is guarded by basic unit tests. You can verify the outcome by running the app, navigating between views and objects, and confirming prompts, recents, and streaming behavior still work.

## Progress

- [x] (2026-01-25 13:47Z) Extracted shared constants, utilities, types, and fixture data into `components/page/` modules.
- [x] (2026-01-25 13:47Z) Added state hooks for view persistence/loading, recents storage, command menu state, share-link state, and keyboard shortcuts in `components/page/state/`.
- [x] (2026-01-25 13:47Z) Split layout into `LeftSidebar`, `TopBar`, `MainCanvas`, `RightSidebar`, and a composed `Layout` component.
- [x] (2026-01-25 13:47Z) Added utility tests and ran `npm run lint` plus `npm test`.

## Surprises & Discoveries

Observation: ESLint’s `react-hooks/set-state-in-effect` rule flagged the localStorage bootstrap in the recents hook, so the recents storage moved to `useSyncExternalStore` with a localStorage-backed event. Evidence: `npm run lint` completed with zero errors after the change.

Observation: The new utility tests run quickly and all pass. Evidence: `npm test` reports 1 test file with 11 passing tests.

## Decision Log

- Decision: Use `useSyncExternalStore` for recent object views instead of a `useEffect` bootstrap.
  Rationale: It avoids setState-in-effect lint errors and provides a consistent external-store model for localStorage-backed state.
  Date/Author: 2026-01-25 (Codex)
- Decision: Introduce a dedicated `components/page/layout.tsx` wrapper to compose the sidebars, header, and canvas.
  Rationale: It matches the plan’s layout extraction milestone and keeps `components/page/index.tsx` focused on state composition.
  Date/Author: 2026-01-25 (Codex)

## Outcomes & Retrospective

The dashboard page is now modular, with shared constants and utilities under `components/page/`, state managers under `components/page/state/`, and UI layout split into focused components with a shared `Layout` wrapper. Basic utility tests were added and run successfully. No remaining gaps were identified against the original milestones.

## Context and Orientation

The page entry point is `components/page/index.tsx`, which now composes the state hooks and renders `components/page/layout.tsx`. Static data is defined in `components/page/initial-data.ts`, shared types in `components/page/types.ts`, shared constants in `components/page/constants.ts`, and pure helpers in `components/page/utils.ts`. The UI shell lives in `components/page/left-sidebar.tsx`, `components/page/top-bar.tsx`, `components/page/main-canvas.tsx`, and `components/page/right-sidebar.tsx`. The route entry `app/[[...slug]]/page.tsx` still renders `Page` from `components/page/index.tsx`.

## Plan of Work

The work is complete. If repeating or extending the refactor, update or add constants and pure helpers in `components/page/constants.ts` and `components/page/utils.ts` first, then adjust the domain hooks under `components/page/state/`, then wire any new UI needs through `components/page/layout.tsx`. Finish by updating or adding utility tests under `components/page/__tests__/` and running lint plus test commands.

## Concrete Steps

Run commands from `/Users/igors.razvodovskis/Development/genUI-test-dashboard`.

  $ npm run lint
  > gen-ui-playground@0.1.0 lint
  > eslint --max-warnings 0

  $ npm test
  > gen-ui-playground@0.1.0 test
  > vitest

   RUN  v4.0.17 /Users/igors.razvodovskis/Development/genUI-test-dashboard
   ✓ components/page/__tests__/utils.test.ts (11 tests) 3ms
   Test Files  1 passed (1)
   Tests  11 passed (11)

## Validation and Acceptance

Start the dev server with `npm run dev`, open the app in a browser, and confirm that system views load, the command menu opens with Cmd/Ctrl+K, and object view routes update the recents list. Run `npm run lint` and `npm test` and expect them to pass with zero warnings and one test file passing.

## Idempotence and Recovery

These changes are safe to reapply. If an edit misbehaves, restore the affected module from git and rerun the step. The recents store is persisted in localStorage, so deleting localStorage entries provides a clean reset for recents behavior without touching the repository.

## Artifacts and Notes

The key artifacts are the new modules in `components/page/` and the utility test file `components/page/__tests__/utils.test.ts`. The lint and test transcripts above provide evidence of the refactor passing validation.

## Interfaces and Dependencies

Utilities live in `components/page/utils.ts` and export `buildViewRoute`, `buildObjectRoute`, `buildObjectRecentId`, `mergeRecents`, `mergeSystemViews`, `parsePathname`, `resolveObjectTarget`, and `parseRecentObjectItems`. Shared constants are defined in `components/page/constants.ts`, including workspace names, prompt suggestions, icon maps, and recents timing constants. State hooks under `components/page/state/` include `use-command-menu`, `use-share-link`, `use-keyboard-shortcuts`, `use-recent-objects`, and `use-view-persistence`; the view hook returns the view state, streaming state, and navigation helpers needed by `components/page/index.tsx`. The layout shell is composed in `components/page/layout.tsx` using `LeftSidebar`, `TopBar`, `MainCanvas`, and `RightSidebar`.

Plan update note (2026-01-25 13:47Z): Rewrote the ExecPlan to align with PLANS.md, documented the completed milestones, and recorded lint/test evidence after finishing the refactor and test additions.
