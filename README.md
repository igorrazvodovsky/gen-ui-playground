# Generative UI playground

Experimental workspace for the LLM-operable-interface vision in [research/vision tree.md](research/vision%20tree.md), with current implementation focus on *generative UI specification* from [research/research-project.md](research/research-project.md).

This repository is set up for agent-driven development:

- [docs/](docs/) is the system of record for architecture, design intent, frontend decisions, and plans.
- [research/](research/) holds the evidence base, concept work, and opportunity mapping that justify the experiments.
- [domain/](domain/) is the current agent-facing domain pack for realistic UI scenarios.
- [experiments/](experiments/) contains runnable prototypes that test specific hypotheses.

## Scope

- Parent scope: [research/vision tree.md](research/vision%20tree.md) describes the broader program around LLM-operable interfaces.
- Current repo focus: Branch 2, generate new interfaces, as detailed in [research/research-project.md](research/research-project.md) and [research/solution tree.md](research/solution%20tree.md).
- Design constraint: build Branch 2 infrastructure so it does not unnecessarily block Branch 1 (operate existing systems) or Branch 3 (compose across boundaries).

## Current first step

The initial runnable experiment is [experiments/json-render-lab](experiments/json-render-lab), a minimal Next.js app that proves the `json-render` integration for the `UI specification -> rendered UI` slice of the target pipeline.

