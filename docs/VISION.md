# Vision

## Repository scope

This repository should be operated with the broader vision in `research/vision tree.md` as context.

That vision is larger than generative UI alone:

1. Operate existing systems
2. Generate new interfaces
3. Compose across boundaries

The current implementation focus is still **Branch 2: generate new interfaces**, using `research/research-project.md` and `research/solution tree.md` as the immediate working scope.

## Practical interpretation

The repo should not pretend all three branches are equally active.

- Branch 2 is the primary build track.
- Branch 1 is valid when an experiment clarifies shared infrastructure such as intent decomposition, knowledge grounding, tool execution, or state/event protocols.
- Branch 3 is future work and should not drive major scaffolding yet.

## Design rule

When choosing between designs:

- prefer choices that move Branch 2 forward now,
- avoid Branch-2-specific assumptions that would unnecessarily block Branch 1 or Branch 3 later,
- and defer abstractions that only serve speculative cross-branch needs.

## Shared infrastructure bias

The following should be treated as cross-branch assets, not generation-only machinery:

- intent decomposition,
- knowledge grounding,
- state and event protocols,
- user/context adaptation,
- verification and feedback surfaces,
- and domain/task representations.

This means a renderer experiment can stay Branch 2 specific, but the surrounding interfaces and data shapes should remain inspectable and reusable.

## What this changes day to day

- `docs/PLANS.md` continues to track the active Branch 2 milestone sequence.
- Branch 1 experiments are allowed if they clearly inform shared infrastructure or de-risk later generation work.
- New docs and code should distinguish between:
  - parent vision,
  - current branch focus,
  - and the concrete experiment being run.

