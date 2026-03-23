# Architecture

## Purpose

This repository exists inside the broader LLM-operable-interface vision described in `research/vision tree.md`. Its current implementation focus is Branch 2 from `research/research-project.md`, and the target pipeline is still the one described there:

`user intent -> task analysis -> task-driven data model -> UI spec -> rendered UI -> refinement loop`

The codebase does not implement that full pipeline yet. The current job of the repo is to validate each segment with small experiments and only extract reusable code when repeated pressure appears.

The important boundary is scope, not ambition:

- parent scope: the three-branch vision from `research/vision tree.md`
- active build scope: Branch 2, generate new interfaces
- design constraint: avoid generation-only assumptions that would make shared infrastructure unusable for Branch 1 or Branch 3 later

## Current modeling baseline

The latest research tightened one previously vague piece of the architecture: the task-driven data model now has a concrete starting vocabulary instead of being a placeholder.

For planning purposes, the repo should assume:

- **Goals** are stable and user-facing. They should be authored with JTBD-style structure: job, circumstance, and desired outcomes.
- **Tasks** are system-facing activities that satisfy goals. They are allowed to regenerate when the goal layer changes.
- **Objects** carry the domain entities those tasks manipulate.
- **Preconditions and link conditions** carry sequencing and gating logic.
- **Agent/Role/Event** stay optional until a given experiment genuinely needs collaboration or reactive triggers.

This is not implemented code yet. It is the current architectural shape for the upcoming S7-style task-model experiments described in `research/solution tree.md`.

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

Most experiments will stay Branch 2 scoped. Branch 1 experiments are acceptable when they test shared infrastructure such as task decomposition, knowledge grounding, tool execution, or runtime protocols.

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
2. Add two-way binding and overlay experiments around the renderer.
3. Add task-model experiments that express JTBD-enriched goals, satisfying tasks, and CQ-backed schemas.
4. Add mapping-rule experiments that compile those task/domain structures into specs.
5. Extract shared types, validators, or compilers into `packages/` only when reuse is real.
