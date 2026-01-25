# ExecPlans

When writing complex features or significant refactors, use an ExecPlan (as described in .agent/PLANS.md) from design to implementation.

## Code simplification working agreement

When code is written or modified, prioritize:
- Apply this repo’s established standards (linting, formatting, naming, module conventions).
- Prefer clarity over cleverness (avoid dense one-liners and nested ternaries).
- Keep scope tight by default: focus on code touched in this session/changeset.

# Repository Guidelines

## Project Structure & Module Organization
- `app/` contains the Next.js App Router entry points, including `app/layout.tsx`, `app/page.tsx`, and API routes such as `app/api/generate/route.ts`.
- `components/ui/` holds reusable UI primitives (e.g., `button.tsx`, `text-field.tsx`, `table.tsx`) exported via `components/ui/index.ts`.
- `lib/` is for shared utilities and catalog data (see `lib/catalog.ts`).
- Styling is centralized in `app/globals.css`; project configuration lives in `next.config.js`, `tsconfig.json`, and `eslint.config.js`.

## Build, Test, and Development Commands
- `npm run dev`: Run the local dev server with Turbopack on port 3001.
- `npm run build`: Create a production build.
- `npm run start`: Serve the production build locally.
- `npm run lint`: Run ESLint with zero warnings allowed.
- `npm test`: Run the Vitest test suite once in `jsdom`.
- `npm run test:watch`: Run tests in watch mode during development.

## Coding Style & Naming Conventions
- TypeScript is the default; keep files in `.ts`/`.tsx`.
- Follow the existing formatting patterns: 2-space indentation, double quotes, and trailing commas.
- Component file names in `components/ui/` use kebab-case (e.g., `text-field.tsx`, `date-picker.tsx`). Export new components from `components/ui/index.ts`.
- Prefer colocating UI-specific types and helpers near the component that uses them.

## Testing Guidelines
- Tests use Vitest with React Testing Library and `@testing-library/jest-dom` matchers.
- Place tests near the source or in `__tests__/` folders; name files `*.test.ts` or `*.test.tsx`.
- Prefer user-centric assertions (`screen.getByRole`, `userEvent`) over implementation details.

## Commit & Pull Request Guidelines
- Git history currently contains only an `initial commit`, so no established convention exists.
- Use short, imperative commit messages (e.g., “Add chart widget rendering”).
- PRs should include a clear description, steps to verify, and screenshots for UI changes. Link related issues or tasks when applicable.

## Configuration & Environment Notes
- This is a Next.js 16 project using React 19. Keep dependency updates aligned with the versions in `package.json`.
- API calls for UI generation are handled by `app/api/generate/route.ts`; keep prompts and model wiring consistent with this endpoint.

## json-render Usage Notes
- Docs live at https://json-render.dev/docs (Quick Start, Catalog, Components, Data Binding, Actions, Visibility, Validation, Streaming, API reference). Keep changes aligned with `@json-render/core@0.2.0` and `@json-render/react@0.2.0`.
- The catalog guardrail is defined in `lib/catalog.ts` via `createCatalog`; add/adjust components there with Zod props, `hasChildren`, and helpful descriptions. Use JSON Pointer paths (e.g., `/analytics/revenue`) for any `valuePath`/`dataPath` props. Keep catalog component names in sync with `components/ui/index.ts`’s `componentRegistry` and any prompt text in `app/api/generate/route.ts`.
- React integration: `Renderer` consumes `componentRegistry` from `components/ui/index.ts`. `DataProvider`, `VisibilityProvider`, and `ActionProvider` wrap `Page`; add `ValidationProvider` if you introduce custom validators and register them in the catalog’s `functions`.
- Data binding: prefer json-render hooks (`useData`, `useDataBinding`, `useDataValue`) or `getByPath` for reading/writing shared data from `INITIAL_DATA` in `app/page.tsx`. If you change the data shape, update paths in the catalog, components, and generation prompt together.
- Actions: declare action names (and params if needed) in the catalog and implement matching handlers in `ACTION_HANDLERS` in `app/page.tsx`. Components should call `onAction`/`useAction` with those declared names—no ad hoc actions.
- Streaming/API: `/api/generate/route.ts` streams JSONL patch ops (`set`/`add`/`replace`/`remove`); set `/root` first, then add elements under `/elements/{key}` with child key arrays. Keep the system prompt aligned with the catalog (or use `generateCatalogPrompt`) and the `Renderer`’s expectations when adjusting the API.
- Visibility/Validation: `visible` supports `path`/`auth` plus logical (`and`/`or`/`not`) and comparison (`eq`/`gt`/`gte`/`lt`/`lte`) conditions when wrapped by `VisibilityProvider`. For forms, use built-in checks (`required`, `email`, `minLength`, etc.) via `useFieldValidation`; wire custom validators through `ValidationProvider` and catalog `validationFunctions` as needed.
