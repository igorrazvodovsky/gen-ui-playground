---
type: concept
tags: [architecture, abstraction, models]
sources: ["sources/model-based-UI-with-patterns"]
created: 2026-02-08
---
UI development as a sequence of increasingly concrete models: [[task-model|Task]] (what users do) → Dialog (sequences between views) → Presentation (abstract UI elements) → Layout (concrete positioning and styling). Each model is a transformation of the previous layer, adding implementation detail while preserving higher-level semantics. The [[domain-data-model]] feeds into this hierarchy as a parallel input — it defines what the data looks like, while the task model defines what users do with it.

## Context

Direct UI implementation conflates multiple concerns — user goals, navigation structure, visual design, platform constraints — into a single artefact. This makes interfaces rigid and difficult to adapt. Separating these concerns into distinct models creates intervention points where different stakeholders can work independently.

The hierarchy isn't arbitrary. Task models are platform-independent and user-centric. Dialog models introduce sequencing but remain abstract about visual representation. Presentation models define UI elements without committing to layout. Layout models add platform-specific details.

## Connections

- **Enables** [[pattern-driven transformation]] — patterns transform models from one layer to the next
- **Implements** [[UI derivation process]] — the hierarchy *is* the derivation sequence
- **Contrasts with** [[tools-not-apps]] — model hierarchy produces monolithic interfaces; tool assembly produces composable pieces
- **Decomposes into** [[task-model]] and [[domain-data-model]] as the two primary inputs — the task model drives pattern selection, the domain data model drives component selection. JELLY collapses both into a single "task-driven data model"; this hierarchy keeps them distinct
- **Related to** JELLY's object-relational schemas — JELLY collapses task + data into a single model, skipping the intermediate dialog/presentation layers
- **Enriched by** [[ontology-driven UI generation]] — formal ontologies (OWL/RDF) are a richer form of domain model than simple data schemas. They encode semantic relationships, class hierarchies, and formal constraints (cardinalities), providing more information for downstream transformations and enabling [[constraint-driven component selection]] at the field level.
- **Complemented by** [[hierarchical-design-semantics]] — Park et al.'s four-level framework (Product → Design System → Feature → Component) describes the *specification structure*, while this hierarchy describes the *generation pipeline*. Rough mapping: Product ≈ Task (strategic intent), Feature ≈ Dialog (screen-level structure), Design System = cross-cutting concerns (cuts across all pipeline levels), Component ≈ Layout (concrete elements). The key difference: Design System is a horizontal concern in Park et al. — it constrains all levels simultaneously — whereas Seffah treats each level as a sequential transformation. Both hierarchies create intervention points for [[gentle slope]] and [[scoped-semantic-editing]].

## Practical implementations

While few systems implement the full four-layer hierarchy, aspects appear in various tools:
- **GraphQL**: Schema (data model) → Resolvers (task logic) → UI components (presentation)
- **BFF pattern** (Backend for Frontend): Task-specific APIs that transform domain models for UI consumption
- **MVC/MVVM frameworks**: Model → ViewModel/Controller → View (simplified hierarchy)
- **Low-code platforms**: OutSystems, Mendix, Retool — encode task → UI transformations in visual builders
- **Design tools**: Figma's Auto Layout, Framer's data binding — presentation → layout transformations

The full academic hierarchy is mostly theoretical — practical systems tend to collapse layers for pragmatism.

## Relevance to project

The four-layer hierarchy is traditional MBUI orthodoxy. But does generative UI need all four layers?

json-render operates at the presentation/layout boundary — it takes abstract component specs and renders them with concrete positioning. JELLY skips straight from task-driven data model to rendered UI.

Possible shortcut: **Task model → json-render spec** directly, bypassing dialog and presentation as explicit artefacts. The LLM internalises the transformation logic that would have been codified in intermediate models.

Trade-off: intermediate models provide inspectable, modifiable surfaces. Collapsing them makes the system faster but less transparent. For malleability, you want those surfaces exposed.

Suggested approach: Generate all four models, but only *store* task + layout. Dialog and presentation exist as ephemeral transformation artefacts the LLM produces on-demand when regenerating.

## Open threads

- Can you parallelise model construction instead of doing it sequentially? Generate presentation and dialog models simultaneously from the task model?
- ✓ Where does the data model fit? Resolved by splitting into [[task-model]] (what the user does) and [[domain-data-model]] (what the data looks like) as distinct concept notes. The task model drives pattern selection; the domain data model drives constraint-driven component selection. JELLY merges them; Seffah separates them; the pipeline needs both
- Do different user populations need to intervene at different layers? Designers at presentation, developers at layout, end-users at task? **Park et al. provide evidence**: their study found designers valued component-level semantics for hand-off, PMs valued product-level for intent expression, and engineers valued feature-level for implementation alignment. Different roles gravitate to different hierarchy levels.
- How does this hierarchy relate to [[scoped-semantic-editing]]? Each level could serve as a scope boundary — edits at the Presentation level shouldn't cascade up to Task, and the system should make the scope of impact visible.
