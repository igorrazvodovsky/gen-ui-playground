---
type: concept
tags: [specification, component-mapping, generative-ui, data-model]
sources: ["sources/varv", "sources/deja-vu", "sources/kodless", "sources/wysiwid", "sources/concept-centric-development"]
created: 2026-02-11
---
A "concept" is a named, self-contained unit of interactive functionality that bundles state (schema), behaviour (actions), and event handling (triggers) into a single composable artefact. Unlike a UI component (which implies visual rendering), a concept can be purely abstract — "assignable", "colorable", "markable" — and composed into other concepts to build complex functionality from reusable pieces.

## Context

The term "concept" here draws on Daniel Jackson's *Concept Design* (2021) and Déjà Vu (De Rosso & Jackson, 2019). Jackson argues that software is built from a small number of recognisable concepts (e.g. "trash", "tag", "notification") and that good design makes these concepts independent and composable.

Two implementations of concept-as-composition-unit exist in the literature, with radically different integration strategies:

**Varv's concepts** are lightweight declarative data structures (JSON). They differ from UI components: (1) they don't require visual representation, (2) they carry behaviour (actions) not just state (props), (3) they compose through extension operators (inject/join), and (4) their state is shared across the application (no encapsulation). The shared-state design mirrors the Store pattern (Redux, Vuex, Zustand) — powerful for cross-cutting features but sacrifices information hiding.

**Déjà Vu's concepts** are heavyweight full-stack modules — each is a self-contained service with its own frontend widgets, GraphQL server, and database. Concepts share nothing by default; integration happens via [[identity-based-data-integration]] (shared IDs) and [[declarative-concept-binding]] (template bindings). Atomic coordination uses [[transactional-composition]]. This is the opposite of Varv's shared-state approach: maximum isolation, minimum coupling.

The Varv/Déjà Vu spectrum reveals a fundamental design trade-off: **shared state** (Varv) makes cross-concept features easy but reasoning hard; **shared identifiers** (Déjà Vu) keeps reasoning easy but cross-concept features require explicit wiring. For generative UI, the choice affects what the LLM needs to produce: Varv-style concepts need a shared state schema; Déjà Vu-style concepts need a composition template with dataflow bindings.

Varv's board game toolkit case study illustrates concept composition vividly. Sean creates abstract concepts ("piece", "square"), mixin-style concepts ("colorable", "locatable", "markable"), and injects the mixins into the domain concepts. He then builds Checkers and Othello by adding game-specific actions to the shared concepts. Amy creates a copy of Sean's Checkers and replaces game rules to make Othello. They merge both into "Checkers-O-Thello" by accretively adding a resolution concept. None of this requires editing existing code.

Three further implementations extend the spectrum. **WYSIWID** (Meng & Jackson, 2025) keeps Déjà Vu's concept independence but replaces template bindings with [[synchronisation-as-behavioural-rule|synchronisations]] — declarative when/where/then rules that mediate between concepts without coupling them. The synchronisation engine is reactive, firing rules when actions complete. **Kodless** (Voronin, 2024) uses concepts as an intermediate representation for LLM generation: the LLM produces a concept spec (name, purpose, state, actions), then generates TypeScript implementation from that spec. The concept is a [[concept-spec-as-generation-checkpoint|generation checkpoint]], not a runtime architecture. **Palantir** (Wilczynski et al., 2023) found that at organisational scale, the full Jackson formalism was too heavy — they stripped concepts to name + description, enriched by links to external resources. Their concepts are [[concept-as-knowledge-artefact|knowledge artefacts]] for cross-functional communication, not runtime constructs.

## Connections

- **Composed using** [[accretive-extensibility]] — concepts are extended by adding new definitions, never editing existing ones. Extension operators (inject, join, omit, pick) are the composition mechanics.
- **Represented as** [[software-as-data-structure]] — concepts are JSON objects. Their composability depends on the data structure representation.
- **Split into** [[abstract-concrete-separation]] — abstract concepts define semantic behaviour; concrete concepts bind to specific views.
- **Higher-level than** [[pattern|patterns]] — a pattern is a proven solution to a recurring UI problem. A concept is a unit of *functionality*. Patterns can be implemented as concept compositions, but concepts can also represent non-UI functionality (data transformations, validation rules, business logic).
- **Relates to** [[pattern composition]] — concepts compose through extension operators; patterns compose through aggregation. Both build complex from simple, but the mechanisms differ.
- **Relates to** [[UI composition]] — concepts are composed at the specification level (build-time/load-time); UI composition happens at the visual/runtime level. A set of composed concepts produces a set of composed UI elements.
- **Relates to** [[tools-not-apps]] — each concept is a small, focused unit of functionality. An application is a composition of concepts, not a monolith. This is the tools-not-apps principle at the specification level.
- **Connects to** [[design systems as pattern libraries]] — design system components can be thought of as the visual manifestation of concepts. A "DatePicker" component implements the "date selection" concept. A "SearchInput" component implements the "search" concept.
- **Repositioned by** [[concept-as-behavioural-annotation]] — for generative UI, concepts may not be the primary composition unit but rather selective annotations applied when structural composition is insufficient. The composition-unit framing assumes concepts are the default; the annotation framing assumes patterns and components are the default, with concepts activated when behaviour is non-trivial.

## Practical implementations

- **Varv concepts** — the reference implementation. JSON-defined, composable through extension operators.
- **Déjà Vu concepts** — self-contained full-stack services (frontend + GraphQL server + database) composed via [[declarative-concept-binding]]. 18 generic concepts in a [[concept-catalog]] cover most common web app needs. Much more heavyweight than Varv — each concept is an independent running service, not a data structure.
- **Redux slices** — named bundles of state + reducers (actions) + selectors. Composed by combining slices into a store.
- **Zustand stores** — each store is a named unit of state + actions. Composable through store merging.
- **Vue composables** — named bundles of reactive state + computed properties + methods. Composed by calling multiple composables in a component.
- **Entity-Component-System (game dev)** — entities are compositions of components (data) and systems (behaviour). Same concept-as-composition principle.
- **Obsidian plugins** — each plugin adds named functionality (state + UI + commands) to the shared environment. Composed by enabling multiple plugins.

## Relevance to project

For the genUI pipeline, "concepts" offer a more natural unit for LLM generation than either raw UI components or full page layouts. Instead of asking the LLM to generate a complete json-render spec, you could ask it to generate a set of concepts:

1. LLM analyses task → identifies relevant concepts ("todo", "assignee", "priority", "filtering")
2. Each concept gets a schema (state shape) and actions (valid transitions)
3. Concept composition assembles them into a complete specification
4. Mapping rules bind concepts to UI components

This is essentially [[pattern]] but at a higher level — the LLM selects and configures concepts rather than patterns. The concept library becomes the vocabulary the LLM works with, analogous to how the component catalog defines what's renderable.

The board game toolkit case study is particularly relevant: Sean built a domain-specific concept library (pieces, squares, game rules) and then rapidly created multiple games from it. For generative UI, a similar approach could work — domain-specific concept libraries (project management, event planning, data analysis) that the LLM selects from and composes.

## Open threads

- How do you build concept libraries? Varv's case studies show manual creation by developers. Could an LLM generate concept definitions from examples or domain descriptions?
- What's the right granularity for concepts? Varv's are fine-grained ("colorable" is a concept). JELLY's task-driven data model is coarser-grained. The right level probably depends on the domain.
- Can concepts be auto-discovered from existing applications? If you analyse a set of common task management UIs, can you extract the recurring concepts ("task", "status", "assignee", "due date", "filter")?
- How does concept composition interact with the [[model hierarchy]]? Are concepts at the [[task-model|task level]], the presentation level, or both? Concept selection seems to map naturally to the task model (identify what functionality is needed); concept state schemas map to the [[domain-data-model]] (what the data looks like)
- **Varv vs. Déjà Vu integration strategies**: which is better for generated UIs? Shared state is simpler to generate (one schema) but harder to reason about at scale. Explicit bindings are more work to generate (need a composition template) but more predictable. A hybrid — shared data model for state, explicit bindings for coordination — might be the pragmatic answer.
- Could a [[concept-catalog]] be auto-generated by analysing common SaaS features across domains? Task management, event planning, e-commerce, etc. all share recurring concepts (auth, comments, ratings, scheduling).
- Is the composition-unit framing the right default for generative UI, or should concepts be repositioned as selective behavioural annotations? The evidence from JELLY, pattern-driven transformation, and ontology-driven UI — none of which use explicit concepts — suggests most generation tasks don't need them.
