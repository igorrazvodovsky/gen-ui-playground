---
type: outcome
scope: llm-operable-interfaces
created: 2026-03-03
source: "[[vision tree]]"
---
# Outcome — LLM-operable interfaces

**LLM agents reliably mediate between user intent and system capabilities — whether that means generating new interfaces, operating existing ones, or composing both.**

The user doesn't learn the system; the system learns the user. The agent layer sits above GUIs and can reach down through GUI, API, and data layers.

This isn't a single pipeline. It's three capabilities that share infrastructure:

- **Branch 1** — [[Operate existing systems|Operate existing systems]]
- **Branch 2** — Generate new interfaces → see [[Generative UI]] for full detail
- **Branch 3** — [[Compose across boundaries|Compose across boundaries]]

## Shared infrastructure (cuts across all branches)

**Intent layer:** [[intent-decomposition]], [[semantic-intermediate-layer]], [[hierarchical-design-semantics]]

**Knowledge layer:** [[knowledge-graph-grounded-generation]], [[concept-catalog]]

**Adaptation layer:** [[context-driven-adaptation]], [[content-structure-adaptation-split]], [[programmable-router]]

**State and feedback layer:** [[event-driven agent-UI protocol]], [[shared data layer]], [[frontend-defined tool execution]]

**Malleability layer:** [[gentle slope]], [[accretive-extensibility]], [[in-place toolchain]]

## Key insight

Infrastructure built for Branch 2 should not assume Branch 2 is the only consumer. Intent decomposition, knowledge grounding, adaptation rules, event protocols, and state management all serve Branches 1 and 3 too.
