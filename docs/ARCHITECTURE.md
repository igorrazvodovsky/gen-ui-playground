# Architecture

## Purpose

This repository exists to turn the research in `research/research-project.md` into runnable experiments. The target pipeline is still the one described there:

`user intent -> task analysis -> task-driven data model -> UI spec -> rendered UI -> refinement loop`

The codebase does not implement that full pipeline yet. The current job of the repo is to validate each segment with small experiments and only extract reusable code when repeated pressure appears.

## Current repository shape

```text
/
├── docs/                    system of record for repo decisions
├── research/                evidence base, concepts, synthesis, solution tree
├── domain/                  current agent-facing domain pack
├── experiments/             runnable prototypes
├── packages/                shared code extracted from experiments later
└── tests/                   cross-experiment verification once it exists
```

## Boundary rules

### `research/`

Research notes are the justification layer. They are allowed to be exploratory, broad, and ahead of the implementation. They should not silently replace repo decisions in `docs/`.

### `docs/`

This is the implementation truth. If an agent needs to know how the repository should evolve right now, this is the first stop after `AGENTS.md`.

### `domain/`

This is the current structured domain pack for experiments. It provides realistic tasks, fixtures, and rules for the connected circular laundry service domain. Experiments should prefer it over inventing fresh example domains.

### `experiments/`

Each experiment should answer a specific question from `research/solution tree.md`. The current first experiment is `experiments/json-render-lab`, which validates the renderer baseline for the `UI specification -> rendered UI` segment.

### `packages/`

Leave this empty until duplication shows up. Shared packages should be extracted only after at least two experiments need the same code. Premature package splits would add indirection without increasing legibility.

## Initial technical baseline

- Repository: root Git repo initialized on `main`
- Workspace tooling: npm workspaces
- Frontend baseline: Next.js + React 19
- Renderer baseline: `@json-render/core` and `@json-render/react`
- Type system: TypeScript in strict mode

## Why `json-render` is the first dependency

`research/research-project.md` explicitly identifies `json-render` as the current step because it covers the `UI specification -> rendered UI` slice of the pipeline. That makes it a good first integration target: it gives the repo something concrete to run while the upstream modeling questions are still open.

## Near-term extraction path

1. Prove the renderer baseline with hand-authored state + spec fixtures.
2. Add two-way binding experiments.
3. Add mapping-rule experiments that transform domain/task structures into specs.
4. Extract shared types or compilers into `packages/` only when reuse is real.
