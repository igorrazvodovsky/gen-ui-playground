---
type: concept
tags: [specification, component-mapping, generative-ui, data-model]
sources: ["sources/deja-vu", "sources/kodless", "sources/concept-centric-development"]
created: 2026-02-20
---
A curated library of generic, reusable full-stack concepts (Authentication, Comment, Scoring, Task, Transfer, etc.) that provides the vocabulary for building applications. The catalog defines what's buildable from stock parts — apps that can be assembled entirely from catalog concepts require no custom code. The catalog grows by extracting generic abstractions from application-specific concepts.

## Context

Déjà Vu's catalog contains 18 concepts covering common web app functionality: Authentication, Authorization, Allocation, Comment, Designation, Email, Event, Follow, Geolocation, Group, Label, Passkey, Property, Rating, Scoring, Schedule, Task, Transfer. Each is a complete full-stack service. The evaluation showed that 8 of 12 student projects could be replicated entirely from this catalog; the remaining 4 needed custom concepts, but 5 new generic concepts were later extracted from those custom ones.

This is a higher-level catalog than [[component catalog as schema]] (which catalogs UI components like Button, Input, Card). A concept catalog operates at the *functionality* level: "this app needs authentication, commenting, and scoring" rather than "this UI needs buttons, inputs, and cards." The concept catalog is closer to what the LLM's task analysis produces; the component catalog is what the renderer consumes. They sit at different layers of the pipeline.

The catalog growth pattern is interesting: build apps → find custom concepts that are actually generic → extract them into the catalog → future apps can use them. This is bottom-up library building, analogous to how design systems grow by extracting reusable patterns from production UIs.

Palantir's concept inventory (~150 concepts, ~250 users) is a production-scale catalog with different design choices from Déjà Vu. Where Déjà Vu's catalog entries are full-stack services (npm packages with frontend, GraphQL, data store), Palantir's entries are lightweight knowledge artefacts — name, description, and links to external resources. The formal Jackson spec (state, actions, operational principle) was dropped in favour of simplicity and broader adoption. Concept aliases (multiple names → one canonical concept) and concept clusters (thematic groupings) proved more practically valuable than formal specifications. This suggests that a concept catalog for generative UI might have two layers: a lightweight vocabulary layer (names, descriptions, aliases — for intent matching and communication) backed by formal specs (state, actions — for generation and behaviour specification) only where needed.

## Connections

- **Higher-level than** [[component catalog as schema]] — component catalogs define renderable UI primitives; concept catalogs define composable functionality. A concept may use multiple components to present itself. The component catalog constrains the renderer; the concept catalog constrains the application architect (or the LLM).
- **Instance of** [[concept-as-composition-unit]] — the catalog is a library of concepts ready for composition. Each entry is a self-contained, reusable concept.
- **Composed via** [[declarative-concept-binding]] — catalog concepts are wired together using template bindings. The catalog provides the vocabulary; bindings provide the grammar.
- **Analogous to** [[pattern|pattern]] libraries — pattern libraries catalog proven UI solutions; concept catalogs catalog proven functionality solutions. Patterns are structural (how UI is arranged); concepts are functional (what the system does). Both serve as vocabularies for composition.
- **Relates to** [[design systems as pattern libraries]] — design systems are component catalogs + pattern libraries for UI. Concept catalogs are the same idea at the full-stack level. A "concept system" would include reusable concepts + composition patterns + documentation.
- **Constrained by** [[guardrailed generative UI]] — the catalog defines what's generatable, just as the component catalog defines what's renderable. An LLM selecting concepts from a catalog is more reliable than an LLM inventing concepts from scratch.
- **Repositioned by** [[concept-as-behavioural-annotation]] — the catalog shifts from a mandatory pipeline stage (always invoked during task analysis) to a knowledge resource (consulted when behavioural complexity is detected). Most generation tasks use the pattern library and component catalog; the concept catalog is reached for selectively.
- **Informed by** [[concept-entropy]] — catalogs need active curation, alias support, and canonical naming to prevent entropy. Palantir's experience shows this is an ongoing organisational effort, not a one-time design decision.
- **Two-level structure suggested by** [[concept-as-knowledge-artefact]] — lightweight entries for vocabulary, formal specs for generation. Same catalog, two faces.

## Practical implementations

- **Déjà Vu concept catalog** — 18 generic concepts (the reference implementation). Each is an npm package with frontend widgets, GraphQL server, and data store.
- **Salesforce platform** — standard objects (Account, Contact, Lead, Opportunity, Case) are essentially a concept catalog for CRM. Custom objects extend the catalog.
- **WordPress plugins** — a marketplace of reusable functionality modules (comments, e-commerce, auth, SEO) that compose into sites.
- **Supabase / Firebase features** — Auth, Database, Storage, Functions, Realtime — each is a full-stack concept that apps compose.
- **Shopify apps** — installable full-stack functionality (reviews, loyalty points, subscriptions) composed into a storefront.
- **Notion blocks** — reusable content/functionality types (database, toggle, callout, embed) that compose into pages. The block library is Notion's concept catalog.

## Relevance to project

For the genUI pipeline, a concept catalog sits between the user's task description and the component catalog:

```
User prompt → Task analysis → Concept selection (from concept catalog)
  → Concept composition (binding template)
    → UI specification (mapping concepts to components from component catalog)
      → Rendered UI
```

The LLM's first job is concept selection: given "build an event planning tool," select `Event`, `Schedule`, `Group`, `Geolocation`, `Authentication` from the catalog. Its second job is composition: generate the binding template that wires these concepts together. Its third job is mapping: for each concept's data, select appropriate UI components from the component catalog.

This three-step decomposition (select → compose → map) is more structured than the current pipeline sketch, which jumps from task analysis to pattern selection. Concepts are a higher-level unit than patterns — "Authentication" is a concept; "Login Form" is a pattern that implements part of it.

The 8-of-12 success rate in Déjà Vu's evaluation is encouraging: a well-curated catalog covers most common app needs. For generative UI, a concept catalog of ~20-30 generic concepts could handle a large proportion of generated applications without custom concept generation.

**Revised position:** The concept catalog is better understood as a knowledge resource for generation rather than a mandatory pipeline stage. The pipeline starts without concepts; when behavioural complexity arises (state transitions, side effects, cross-component coordination), the LLM consults the catalog for matching concepts. If found, the catalog concept constrains generation. If not found, the LLM generates a new concept into the concept space — conforming to the same schema as catalog entries — grounded by the knowledge graph. Over time, useful generated concepts are promoted into the catalog. The catalog grows bottom-up from actual need, not top-down from anticipated requirements.

## Open threads

- How do you build a concept catalog for generative UI? Déjà Vu's catalog was hand-built from student projects. Could it be bootstrapped from SaaS feature lists (every project management tool has tasks, assignments, due dates, labels, comments)?
- What granularity should catalog concepts be? Déjà Vu's are fairly coarse (Authentication, Scoring). Varv's are finer-grained (colorable, markable). For LLM selection, coarser is probably better — fewer choices, less ambiguity.
- How does the concept catalog interact with the [[model hierarchy]]? Are concepts at the task model level, or do they span multiple levels?
- Can the LLM generate new concepts when the catalog doesn't cover the need? Déjà Vu required a developer to build custom concepts. For generative UI, the system would need to generate concept implementations on the fly — a significantly harder problem.
