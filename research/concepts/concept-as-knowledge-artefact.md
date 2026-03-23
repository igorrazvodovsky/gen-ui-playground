---
type: concept
tags: [specification, generative-ui, data-model]
sources: ["sources/concept-centric-development"]
created: 2026-03-13
---

A concept can function as a lightweight organisational knowledge artefact — just a name and description, linked to related resources — without requiring formal state machine specification. At this weight, concepts serve as shared vocabulary for cross-functional communication rather than as runtime constructs or generation templates. The concept's value comes from its identity as a named, trackable, relatable entity, not from its formal specification.

Palantir's deployment at scale revealed that Jackson's full concept formalism (name, purpose, state, actions, operational principle) was too heavyweight for practical organisational use. Product managers, designers, and non-engineers found the formal structure intimidating and consensus on "correct" specifications hard to achieve. Palantir stripped concepts to name + description, enriching them by linking to external resources (design mocks, documents, sketches, code components). This lighter weight enabled broader adoption (250 users across engineering, product, design, marketing, legal) and faster bootstrapping (first 100 concepts entered in hours, not months). The concept sketches and aliases proved more practically valuable than formal specifications — they helped teams trace design decisions and understand why the software was structured as it was.

## Context

Organisations accumulate both formal specifications (hard to maintain, slow to update) and informal tribal knowledge (hard to search, inconsistent). Lightweight knowledge artefacts split the difference: structured enough to search and version, lightweight enough to keep current.

## Connections

- **Lighter than** [[concept-as-composition-unit]] — concept-as-composition-unit requires state, actions, and triggers. Concept-as-knowledge-artefact requires only name and description. They serve different purposes: composition requires formalism; communication requires identity.
- **Supports** [[concept-catalog]] — a catalog of lightweight knowledge artefacts is easier to bootstrap and maintain than a catalog of formal specs. The catalog can grow bottom-up from naming conventions and existing documentation.
- **Fights** [[concept-entropy]] — by establishing canonical names and aliases, knowledge artefacts reduce terminology fragmentation.
- **Relates to** [[semantic-intermediate-layer]] — if concepts are exposed as part of the user-facing semantic layer, they'd appear as knowledge artefacts (named functionalities), not formal specs.
- **Complements** [[concept-spec-as-generation-checkpoint]] — the knowledge artefact is the user/designer-facing representation; the formal spec is the system/LLM-facing representation. Same concept, two levels of detail.

## Practical implementations

Palantir's concept inventory (name + description + links in Foundry ontology). Notion databases of product features. Confluence glossaries. Design system documentation (component descriptions without implementation details). API documentation (resource descriptions before endpoint details). Shared Figma component libraries with attached documentation.

## Relevance to project

Suggests two levels of concept representation. The user-facing layer (semantic intermediate layer, intent decomposition) would show concepts as named functionalities with plain-language descriptions — "Your app uses Task Management, Assignment, Status Tracking, and Filtering." The system-facing layer (generation, behavioural specification) would hold formal specs where needed. The knowledge artefact bridges the two: the user understands "Assignment" as a capability; the system knows it's a concept with Assignee state, assign/unassign actions, and specific transitions. This two-level approach lets the system be formal where it needs to be (generation) and lightweight where it needs to be (user communication and catalog maintenance).

## Open threads

- At what point does a knowledge artefact need to be promoted to a formal spec? When the LLM needs to generate behaviour for it? When the user reports unexpected behaviour?
- Can knowledge artefacts be auto-generated from the pipeline's task analysis? "Your app uses these concepts: ..." as an early checkpoint.
- How do knowledge artefacts map to Palantir's concept clusters? Could the genUI pipeline have domain-specific concept clusters (project management, e-commerce, data analysis)?
