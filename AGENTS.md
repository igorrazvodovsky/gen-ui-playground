# AGENTS.md

This repository is optimized for agent-driven implementation. Treat this file as the map, not the manual.

## Start here

1. Read `docs/README.md`.
2. Read `docs/ARCHITECTURE.md` for repository boundaries and extraction rules.
3. Read `docs/PLANS.md` for the current milestone sequence.
4. Read `docs/FRONTEND.md` before changing renderer or UI experiment code.
5. Read `docs/DESIGN.md` before changing workflow, process, or repo conventions.

## Source-of-truth boundaries

- `docs/` is the system of record for the implementation repo.
- `research/` is the evidence and hypothesis layer. It explains why the work exists.
- `domain/` is the current domain pack used by experiments and eval fixtures.
- `experiments/` is where runnable prototypes live.

If code changes invalidate a documented architectural decision, update the relevant file in `docs/` in the same change.

## Working rules

- Prefer small, runnable experiments over broad speculative scaffolding.
- Extract shared code into `packages/` only after two experiments need the same abstraction.
- Keep repo-local context legible. Do not rely on chat history as the only place a decision lives.
- When an experiment grows beyond a quick spike, add or update a plan in `docs/exec-plans/`.
- Preserve boring, inspectable tools and explicit scripts.

## Key context files outside docs

- `research/research-project.md`: project goal, pipeline, and research approach.
- `research/solution tree.md`: opportunity/solution/experiment map.
- `research/synthesis.md`: current synthesized understanding.
- `domain/README.md`: current target domain and modeling boundaries.

