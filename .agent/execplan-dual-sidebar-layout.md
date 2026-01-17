# Adopt dual-sidebar layout and command-driven prompting

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This plan follows the ExecPlan requirements in `.agent/PLANS.md` from the repository root and must be maintained accordingly.

## Purpose / Big Picture

After this change, the dashboard page renders the dual-sidebar layout from `temp-two-sided-page-component/` with the command palette centered in the header, and that command input is the sole prompt entry point for LLM widget generation. Users can open the command palette, type a freeform prompt, or select one of the prompt suggestions from the command list, and see generated widgets appear in the main content card. This is visible by running the dev server and visiting the home page; the page should match the two-sidebar layout and the prompt suggestions should appear in the command menu instead of buttons.

## Progress

- [x] (2026-01-17 15:51Z) Capture baseline structure and decide where to relocate or rename the JSON-render Button so the shadcn Button can live at `components/ui/button.tsx`.
- [x] (2026-01-17 15:51Z) Add Tailwind CSS plumbing and theme variables from `temp-two-sided-page-component/app/globals.css`, plus PostCSS config for Tailwind.
- [x] (2026-01-17 15:51Z) Port required utilities and UI primitives from `temp-two-sided-page-component/` into `lib/`, `hooks/`, and `components/ui/`.
- [x] (2026-01-17 15:51Z) Update `components/ui/index.ts` and component registry wiring to use the relocated JSON-render Button while exporting new primitives.
- [x] (2026-01-17 15:51Z) Rewrite `app/page.tsx` to match the dual-sidebar layout and wire the command palette to `useUIStream`, including prompt suggestions as command items.
- [x] (2026-01-17 15:51Z) Update `app/layout.tsx` for the new typography setup and ensure `globals.css` is applied consistently.
- [x] (2026-01-17 15:52Z) Install new dependencies and update `package-lock.json`.
- [x] (2026-01-17 16:52Z) Run lint/build checks.
- [ ] (2026-01-17 16:53Z) Start the dev server to validate UI (started on port 3010; manual UI verification remaining).

## Surprises & Discoveries

- Observation: `npm install` failed with ENOTEMPTY due to a stale `.postcss-...` directory in `node_modules`; renaming it allowed the install to finish.
  Evidence: npm error ENOTEMPTY when renaming `node_modules/postcss` to a temp `.postcss-*` directory.
- Observation: `npm run lint` fails because `@repo/eslint-config` is not installed in this environment.
  Evidence: ESLint error `Cannot find package '@repo/eslint-config' imported from eslint.config.js`.
- Observation: `npm install -D @repo/eslint-config` failed with a 404 and an expired npm access token notice.
  Evidence: npm error `404 Not Found - GET https://registry.npmjs.org/@repo%2feslint-config`.
- Observation: `npm run dev` fails because port 3001 is already in use.
  Evidence: Next.js error `EADDRINUSE` for :::3001.
- Observation: `npm run dev -- --port 3002` also failed with `EADDRINUSE`, but port 3010 worked and the server started successfully before the command timed out.
  Evidence: Next.js output showing `Ready` on `http://localhost:3010`.

## Decision Log

- Decision: Use the shadcn-style Tailwind layout and primitives from `temp-two-sided-page-component/` rather than re-implementing them with inline styles.
  Rationale: The request stresses reproducing the layout exactly, and the source layout relies on Tailwind utilities and Radix-based primitives.
  Date/Author: 2026-01-17 / Codex

## Outcomes & Retrospective

Implemented the dual-sidebar layout, ported shadcn primitives and Tailwind theme, and wired the command palette to `useUIStream` with prompt suggestions inside the menu. The lint step is still blocked because the local environment lacks the `@repo/eslint-config` package referenced by `eslint.config.js`.

## Context and Orientation

The current home page lives in `app/page.tsx`, uses `@json-render/react` with a plain text input, and renders widgets inside a single column layout. The temporary layout source is in `temp-two-sided-page-component/app/page.tsx` and relies on shadcn/ui primitives plus Tailwind-based styling defined in `temp-two-sided-page-component/app/globals.css`. The project’s UI component registry for JSON-render components is in `components/ui/index.ts`, and the existing `components/ui/button.tsx` is the JSON-render Button implementation, so it conflicts with the shadcn Button name used by the layout.

## Plan of Work

First, introduce Tailwind styling by copying the temporary layout’s `globals.css` into `app/globals.css` and adding a PostCSS config with the Tailwind plugin. Then, relocate the JSON-render Button component to a new file name, add the shadcn Button at `components/ui/button.tsx`, and update `components/ui/index.ts` to export both the shadcn primitives and the JSON-render registry without name collisions. Next, port the required supporting utilities (`lib/utils.ts`, `hooks/use-mobile.ts`) and the minimal set of shadcn components used by the layout (`sidebar`, `dropdown-menu`, `command`, `popover`, `dialog`, `sheet`, `tooltip`). After the primitives exist, rewrite `app/page.tsx` by starting from the temporary dual-sidebar layout and inserting the `useUIStream` prompt handling so the command palette input triggers LLM generation; move the prompt suggestions into command items. Finally, update `app/layout.tsx` to apply the font classes expected by the new theme, install dependencies from the ported components, and run lint or build checks to confirm TypeScript and CSS compile.

## Concrete Steps

From the repository root, follow these steps in order.

1. Rename `components/ui/button.tsx` to `components/ui/render-button.tsx`, update its exported function name to `RenderButton`, and update `components/ui/index.ts` to import it and map `Button: RenderButton` inside `componentRegistry`.
2. Add `lib/utils.ts` and `hooks/use-mobile.ts` by copying the implementations from `temp-two-sided-page-component/`.
3. Add the shadcn UI primitives by copying files from `temp-two-sided-page-component/components/ui/` into `components/ui/` (button, sidebar, dropdown-menu, command, popover, dialog, sheet, tooltip) and format them to match the repository’s TypeScript style (double quotes, semicolons).
4. Replace `app/globals.css` with the Tailwind-based version from the temp layout, then add `postcss.config.mjs` with the Tailwind plugin configuration.
5. Rewrite `app/page.tsx` to use the dual-sidebar layout, keeping the `DataProvider`/`ActionProvider`/`VisibilityProvider` wrapper and wiring `CommandInput` and `CommandItem` selections to `useUIStream.send`.
6. Update `app/layout.tsx` to include the font classes expected by the Tailwind theme (for example `font-sans` and `antialiased`).
7. Add the necessary dependencies in `package.json` and run `npm install` to refresh `package-lock.json`.
8. Run `npm run lint` from the repo root and fix any reported errors.

## Validation and Acceptance

Start the dev server with `npm run dev`, open `http://localhost:3001`, and confirm the following behaviors:

- The page uses a left sidebar, a right sidebar with a collapse control, and a header containing a centered command palette trigger.
- Clicking the command palette trigger opens a popover with the prompt input; selecting a prompt suggestion triggers generation and renders widgets in the main content area.
- Typing a custom prompt and submitting it from the command menu generates new widgets.
- The layout and spacing match the `temp-two-sided-page-component/app/page.tsx` structure.

Run `npm run lint` and expect no lint errors.

## Idempotence and Recovery

All file edits are additive or replacements and can be repeated safely; if a mistake is made copying the layout or CSS, re-copy the file from the temp source and re-apply formatting. If dependency installation fails, re-run `npm install` until `package-lock.json` reflects the new dependencies and `node_modules/` contains the Radix/Tailwind packages.

## Artifacts and Notes

Keep a brief diff snippet for `app/page.tsx` and `components/ui/index.ts` once changes are complete to show the new layout structure and the registry mapping.

## Interfaces and Dependencies

The following dependencies must exist in `package.json` for the layout to compile:

- `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-popover`, `@radix-ui/react-slot`, `@radix-ui/react-tooltip` for the shadcn primitives.
- `cmdk` for the command palette.
- `class-variance-authority`, `clsx`, `tailwind-merge` for class composition.
- `lucide-react` for iconography.
- `tailwindcss`, `@tailwindcss/postcss`, `postcss`, and `tw-animate-css` for Tailwind CSS and animation utilities.

`components/ui/index.ts` must export `componentRegistry` with the JSON-render `Button` mapped to `RenderButton` and should continue to export the other JSON-render components unchanged.

## Plan Revision Notes

2026-01-17 15:52Z: Updated Progress to reflect completed implementation steps, split the lint task into completed vs. blocked work, and recorded npm/ESLint issues in Surprises. This keeps the plan aligned with the current execution state after dependency installation and the attempted lint run.
2026-01-17 15:53Z: Updated Outcomes & Retrospective to summarize delivered layout and note the outstanding lint blocker. This records the current end state of the implementation.
2026-01-17 16:51Z: Logged failed attempts to install `@repo/eslint-config` and to start the dev server, and added new progress blockers for linting and port usage.
2026-01-17 16:53Z: Marked lint as complete and recorded the successful dev server start on port 3010 with pending manual UI verification.
