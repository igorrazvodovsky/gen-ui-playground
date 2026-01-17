# ExecPlans

When writing complex features or significant refactors, use an ExecPlan (as described in .agent/PLANS.md) from design to implementation.

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

