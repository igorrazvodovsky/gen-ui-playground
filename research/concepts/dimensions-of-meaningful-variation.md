---
type: concept
tags: [specification, data-model, component-mapping, generative-ui]
sources: [sources/how-notations-evolve.md]
created: 2026-03-12
---
A notation works by mapping dimensions of **meaningful variation** in the conceptual/empirical domain to dimensions of **perceptually distinguishable variation** in the representational domain. What counts as "meaningful" is determined by experiment, cultural knowledge, or free choice. Salient features get mapped; everything else is either left out (invariant) or deemed irrelevant. Once established, these choices calcify — later introducing an overlooked dimension is hard, and foregrounding an invariant dimension wastes effort and misleads users.

## Context

Zhang et al. (2025) identify this as the core cognitive mechanism of notation design. It explains both the power and the limitation of any representational system: a notation makes certain things easy to see and compare by making other things invisible or hard to express. The paper calls this "notational centricity" when the notation becomes so dominant that users mistake it for the domain itself (e.g., equating "music" with what sheet music can represent).

## Connections

- Directly extends [[constraint-driven component selection]] — the mapping from semantic type to UI component is itself a decision about which dimensions of variation matter (data type, cardinality, task context) and which don't
- Informs [[configuration-model-as-design-space]] — variation points in a configuration model are explicitly reified dimensions of meaningful variation; the model *is* a notation for the space of valid UIs
- Relates to [[hierarchical-design-semantics]] — Park et al.'s 15 semantic slots are a fixed set of dimensions deemed meaningful for UI design; this paper explains why those particular slots were chosen and what gets lost by the choice
- Supports [[feature-component-duality]] — features are meaningful variation from the user's perspective; components are meaningful variation from the system's perspective; the mapping between them is exactly this concept
- Tension with [[graduated-ambiguity-tolerance]] — Gmeiner et al.'s intent tags let users choose their own precision level per dimension, which partially addresses the problem of pre-committing to fixed dimensions

## Practical implementations

Design tokens in design systems (Material, Radix) are reified dimensions of meaningful variation — colour, spacing, typography, elevation. The token vocabulary defines what's adjustable and what's not. Tailwind CSS takes this further: its utility class namespace *is* a notation whose dimensions (spacing scale, colour palette, breakpoints) determine what's easy to express and what requires escape hatches.

## Relevance to project

This concept cuts across two pipeline stages:

**Task-driven data model (O2a):** When the LLM generates a data model from a user prompt, it's making decisions about which dimensions of the task are meaningful. "Plan a dinner party" → guest count is meaningful, guest shoe size is not. These decisions are currently implicit in the LLM's output. The paper's argument suggests they should be made **explicit and inspectable** — the user should see which dimensions the system chose and be able to add overlooked ones or remove irrelevant ones. This connects directly to [[semantic-intermediate-layer]] and the intent decomposition work (S15).

**Component mapping (O3):** Choosing a component for a data type is choosing which perceptual channels to activate. A date as a text input activates reading/typing; a date as a calendar picker activates spatial/gestalt perception. The pattern library (S12) is a codified set of these mappings. This concept suggests the library should be organised by *which dimensions of variation each component foregrounds*, not just by data type compatibility.

- **Operationalised by** [[generation-layer-as-customisation-surface]] — Min et al. (2026) turn abstract dimensions of meaningful variation into concrete, navigable generation layers. Each layer foregrounds one dimension (categories, layout, content, style) and makes it directly manipulable as a partial UI. The designer's choice of which dimensions get their own layer is itself a consequential notation decision — un-layered dimensions become harder for users to discover.

## Open threads

- Can the system detect when a user's task requires a dimension that the current data model doesn't capture? (The paper calls this "un-representable circumstance" — §3.2.8.)
- How does [[semantic-drift]] relate to dimension loss across iterations? Each re-prompt might subtly drop or add dimensions.
- The paper's "evaluative stage" — where a notation becomes a lens through which the world is judged — has a dark analogue in generated UIs: once a UI frames a task in a certain way, the user may stop imagining alternative framings.
