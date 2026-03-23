---
type: concept
tags: [data-model, specification, generative-ui]
sources: ["sources/deja-vu"]
created: 2026-02-20
---
Concepts don't share data directly — they share identifiers. Each concept maintains its own independent data store with its own schema. When two concepts receive the same ID, their separate data becomes implicitly associated. The ID is the only coupling point; neither concept knows about the other's data model or even its existence.

## Context

This is an alternative to two common integration strategies: (1) shared database (all concepts read/write the same tables — tight coupling), and (2) API integration (concepts call each other's APIs — requires knowledge of interfaces). Identity-based integration is weaker coupling than either: concepts only share a string (the ID). Everything else — data schemas, storage engines, query patterns — remains independent.

In Déjà Vu, a platform function `generateId` creates an ID that gets bound (via [[declarative-concept-binding]]) to multiple concept instances. For example, a "post" gets an ID. The `Comment` concept stores comments referencing that ID. The `Scoring` concept stores votes referencing that ID. Neither knows the other exists. The app template just passes the same ID to both.

This is structurally similar to foreign keys in relational databases — but without a shared schema. Each concept's table has a column for the shared ID, but the rest of the schema is concept-specific. It's also similar to how microservices integrate via shared entity IDs in event streams (correlation IDs).

## Connections

- **Mechanism for** [[declarative-concept-binding]] — shared IDs are the primary way concepts exchange references in Déjà Vu's template bindings.
- **Alternative to** [[shared data layer]] — Ink & Switch's malleable software vision assumes a shared data substrate (CRDTs) that all tools read/write. Identity-based integration achieves coordination without a shared data layer — each concept has its own data, linked only by IDs. Trade-off: shared data enables richer cross-concept queries; identity-based integration enables stronger independence.
- **Supports** [[concept-as-composition-unit]] — the independence that identity-based integration provides is what makes concepts genuinely self-contained and reusable. If concepts shared data directly, extracting one for reuse in another app would require extracting the shared data model too.
- **Relates to** [[abstract-concrete-separation]] — the shared ID is abstract (semantically meaningful: "this is the same entity"); each concept's data is concrete (implementation-specific). The abstract/concrete split happens at the data integration level, not just the view level.
- **Contrasts with** Varv's shared-state model — Varv's concepts share everything through a centralised store with no encapsulation. Déjà Vu's concepts share nothing except IDs. Opposite ends of a spectrum: maximum sharing vs. minimum sharing. Varv enables richer cross-concept behaviour; Déjà Vu enables stronger concept independence.

## Practical implementations

- **Microservice correlation IDs** — distributed systems use correlation IDs to track the same entity across services. Each service stores its own data, linked by the shared ID.
- **Foreign keys (without joins)** — relational databases link tables via shared IDs. Identity-based integration is like foreign keys without a shared schema or join capability.
- **URL-based linking** — the web itself uses URLs as shared identifiers. Two independent systems can reference the same resource by URL without knowing anything about each other.
- **OAuth subject identifiers** — identity providers issue a subject ID that multiple applications use to refer to the same user, each maintaining their own user data.
- **JSON-LD / Linked Data** — entities share IRIs (identifiers) across independent data sources. Each source has its own schema; shared IRIs create implicit associations.

## Relevance to project

For the genUI pipeline, identity-based integration offers a lightweight alternative to Varv's shared-state model for cross-component coordination. Instead of all generated components reading/writing a single shared model (JELLY's approach), each component could maintain its own state, linked to shared entities by ID.

This maps naturally to how json-render could handle multiple views of the same data: a list view and a detail view both receive the same entity ID, but each renders its own subset of properties from its own data source. Selection synchronisation becomes ID passing: "user selected entity X" → pass X's ID to the detail view.

For the LLM's generation task, identity-based integration simplifies the output format. Instead of generating a complex shared data model, the LLM generates: (1) independent concept schemas, and (2) a binding template that declares which IDs flow between concepts. Each concept's schema is self-contained and can be validated independently.

The trade-off for our project: identity-based integration makes it harder to do cross-concept queries ("show me all posts with their comments and scores in a single view"). That requires either joining at the app level or introducing a shared query layer — which starts to look like a shared data layer again.

## Open threads

- How does this interact with [[ai-attribute-reformulation]]? Reformulated attributes may need data from multiple concepts (e.g., "value score" combining price + comparable listings). Identity-based integration alone doesn't provide the join mechanism for this.
- Can LLMs generate ID-flow bindings? The LLM needs to understand which entities are shared across concepts — essentially, it needs to design the identity graph.
- How do you handle identity conflicts? Two concepts might use "id" to mean different things. Namespace collision is a real risk without a shared schema.
