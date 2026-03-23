# human-agent-ui

Experimental workspace for implementing the ideas in `research/research-project.md`.

This repository is set up for agent-driven development:

- `docs/` is the system of record for architecture, design intent, frontend decisions, and plans.
- `research/` holds the evidence base, concept work, and opportunity mapping that justify the experiments.
- `domain/` is the current agent-facing domain pack for realistic UI scenarios.
- `experiments/` contains runnable prototypes that test specific hypotheses.

## Current first step

The initial runnable experiment is `experiments/json-render-lab`, a minimal Next.js app that proves the `json-render` integration for the `UI specification -> rendered UI` slice of the target pipeline.

## Commands

```bash
npm install
npm run dev:json-render
npm run typecheck
```

## Notes

- The old standalone Git history from `research/` was preserved locally in `.history-backups/` so the root repository can now track the research files directly.
- Shared packages under `packages/` will be added only after at least two experiments need the same code.

