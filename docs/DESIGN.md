# Design

## Working stance

This repository is intentionally AI-first. Human effort should go into:

- choosing the next experiment,
- tightening acceptance criteria,
- reviewing outcomes,
- and encoding missing context back into the repo.

That follows the harness-engineering pattern: humans steer, agents execute, and the repo becomes the durable memory.

## Design principles

### Keep context in-repo

If a decision matters for future work, write it down in `docs/`, `domain/`, or the relevant experiment directory. Do not let key context exist only in chat.

### Prefer legibility over cleverness

Choose tools and abstractions that are easy for an agent to inspect, run, and modify locally. A slightly more boring dependency is preferable to an opaque one.

### Preserve the research-to-code chain

Implementation should stay traceable back to the research material:

- `research/vision tree.md` defines the parent program.
- `research/research-project.md` defines the target pipeline.
- `research/solution tree.md` defines the problem map and experiment opportunities.
- `docs/` translates those into repo-level decisions.
- `experiments/` validates them in runnable form.

In practice, this means every change should be clear about which level it serves:

- vision-level context,
- current branch focus,
- or a single experiment decision.

### Bias toward thin vertical slices

Do not scaffold the entire future architecture up front. Add just enough structure to support the next concrete experiment with a clean upgrade path.

This matters more because the repo operates with the broader vision as context. The right move is not to scaffold all three branches at once; it is to let the larger vision constrain local decisions while the codebase still advances through branch 2.

## Current non-goals

- Building the full intent-to-schema generation pipeline
- Committing to a final package split inside `packages/`
- Solving persistence, auth, or deployment
- Introducing domain-general abstractions before the domain experiments demand them

## Definition of a good experiment

A good experiment in this repo should:

- test one risky assumption,
- be runnable locally without hidden setup,
- expose state/spec/outputs clearly enough for humans and agents to inspect,
- and produce a result that changes the next plan.
