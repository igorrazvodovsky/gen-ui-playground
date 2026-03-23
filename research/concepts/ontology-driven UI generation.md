---
type: concept
tags: [ontology, domain-model, generation]
sources: ["sources/ontology-driven-UI", "sources/ontology-specification", "sources/ontology-llm-conversational-ai"]
created: 2026-02-08
---
Using formal ontologies (OWL, RDF) as the primary input for dynamically generating user interfaces. The ontology's class hierarchy, properties, semantic relationships, and formal constraints are parsed at runtime and mapped to UI elements. The domain model isn't a simple schema — it's a rich semantic graph that encodes what things *are*, how they relate, and what constraints govern them. The UI becomes a direct projection of domain knowledge.

## Context

This sits between two poles. On one side: simple data schemas (JSON Schema, database tables) that encode structure but not meaning. On the other: natural language descriptions that encode meaning but not structure. Formal ontologies occupy the sweet spot — they're machine-parseable *and* semantically rich. An OWL ontology for academic events doesn't just say "a lecture has a location" — it says "a lecture is located in exactly one academic space, which may be a laboratory, auditorium, or classroom."

The Nunes et al. system demonstrates this concretely: parse OWL with RDFLib → extract class details as JSON → render dynamic React forms. The ontology drives everything — navigation (class hierarchy), form structure (properties), [[constraint-driven component selection]], and validation (cardinalities enforce data quality at the UI level).

Critically, this approach uses **ontology reuse** (building on BFO, IAO, OBI) rather than inventing domain models from scratch. This promotes interoperability — systems built on the same foundational ontologies can exchange data meaningfully.

## Connections

- **Enriches** [[model hierarchy]] — ontologies are a richer form of [[domain-data-model]] than simple schemas. They provide the starting point for the Task → Dialog → Presentation → Layout pipeline, but with more semantic structure than traditional domain models
- **Alternative mechanism to** [[pattern-driven transformation]] — patterns map tasks to UI through design knowledge; ontologies map domain structure to UI through formal semantics. These aren't mutually exclusive — patterns could operate on ontology-derived models.
- **Produces** [[specification-based rendering]] format — the parsed ontology outputs JSON (properties, classes, cardinalities) that's structurally similar to json-render specs. The ontology parser is essentially a spec generator.
- **Extreme end of** [[structured vs unstructured tension]] — ontologies are maximally structured. They solve the structure problem completely but at the cost of requiring an ontology engineer upfront. No room for vague intent.
- **Informs** [[component catalog as schema]] — the set of UI components the system can render (dropdowns, text inputs, add buttons) is an implicit catalog. The ontology constraints determine which catalog entries get selected.
- **Enables** [[shared data layer]] — because ontologies use shared standards (OWL, RDF, BFO), the data layer is inherently interoperable. Multiple tools can read/write to the same ontological data.
- **Implements** [[constraint-driven component selection]] — the mapping from ontological constraints to specific components
- **Extended by** [[context-driven adaptation]] — Nunes uses ontologies to model the *domain*; OADAPT uses ontology networks to model *domain + user + UI + adaptation system*. The HCI-ON ontology network now has four new ontologies in its well-founded domain layer: ContUsO (context of use — environment, equipment), UPO (user profile — disabilities, characteristics), UISCO (UI software components — formal component taxonomy), AUISO (adaptive UI system — customisation types, rules, recommendations). These show ontologies modelling not just what to render but *for whom*, *with what components*, and *how to adapt*. Strengthens the case for ontological structure, but also shows the complexity cost — four interconnected ontologies plus foundational (UFO) and core (HCIO) layers, all for one adaptive social network.

## Practical implementations

- **Protege**: OWL ontology editor — itself generates a UI from ontology structure (class browser, property editor, individual editor). The tool *is* an ontology-driven UI.
- **TopBraid Composer / TopBraid EDG**: Enterprise ontology management with auto-generated forms from SHACL/OWL constraints.
- **PoolParty**: Semantic platform that generates taxonomy/ontology browsing UIs.
- **Django Admin / Rails scaffolding**: Database schema → CRUD UI. Weaker semantics (no formal ontology) but same principle: domain model drives UI generation.
- **Prisma Studio**: Database schema → admin interface. Schema-driven.
- **react-jsonschema-form**: JSON Schema → React forms. The closest mainstream equivalent — schema constraints drive component selection — but without ontological richness (no class hierarchies, no semantic relationships).
- **Amazon Neptune / Stardog**: Graph databases with ontology-aware query UIs.
- **SPARQL query builders**: Auto-generate query interfaces from ontology structure.

## Relevance to project

This paper reveals a **third approach** to the "how do you get from domain to UI?" question, alongside patterns (Seffah) and LLM generation (JELLY):

| Approach | Input | Mapping mechanism | Flexibility | Semantic richness |
|---|---|---|---|---|
| Pattern-driven | Task analysis | Design pattern library | Medium (pattern selection) | Low (patterns encode UX knowledge, not domain knowledge) |
| Ontology-driven | OWL ontology | Rule-based constraint mapping | Low (deterministic rules) | High (full semantic model) |
| LLM-driven | Natural language | Learned/inferred | High (anything goes) | Variable (depends on prompt quality) |

For the generative UI pipeline, the interesting question is: **can ontologies serve as the intermediate representation?** Instead of the LLM generating json-render specs directly, it could:
1. Infer/generate a lightweight ontology from user intent
2. Apply rule-based constraint-to-component mappings (deterministic, reliable)
3. Output json-render specs

This would give the LLM's output more structure and the pipeline more predictability. The ontology becomes a checkpoint between fuzzy intent and concrete UI — inspectable, modifiable, semantically meaningful.

**However**, formal ontologies require expertise to create. The paper's system assumes an ontology engineer builds the OWL file in Protege. For generative UI, the LLM would need to generate the ontology — which raises the question of whether a full OWL ontology is overkill. A lighter-weight "domain schema" (closer to JSON Schema with semantic annotations) might hit the sweet spot.

**Connection to JELLY**: JELLY's "task-driven data model" (object-relational schema) is essentially a lightweight ontology — entities with attributes, relationships, and constraints. JELLY skips the OWL formalism but captures the same structural information. The Nunes paper shows what you gain from full formalism (interoperability, reuse, richer constraints) and what it costs (complexity, expertise requirement).

## Open threads

- Can an LLM generate useful ontologies from natural language? If so, the pipeline becomes: prompt → LLM → lightweight ontology → rule-based UI generation. This would be more reliable than prompt → LLM → UI spec directly.
- Is full OWL too heavy? Would a simpler semantic schema format (JSON-LD? SHACL shapes? Extended JSON Schema?) capture enough ontological structure for UI generation without the complexity?
- How does ontology evolution work when user needs change? Traditional ontology engineering is slow and expert-driven. For malleable software, you need lightweight ontology modification.
- The paper only handles CREATE operations. For full generative UI, you need READ, UPDATE, DELETE — and the ontology needs to drive all four.
- Can ontology reuse (building on BFO, established ontologies) work for ad-hoc task-driven data models? Or is reuse only practical for stable, well-understood domains?
- Fareedi et al. demonstrate a working ontology network (5 interconnected ontologies) stored as a Neo4j knowledge graph and queried by LLMs via auto-generated Cypher. This adds evidence that ontology networks are practical when the domain is stable (healthcare/PED). For the genUI pipeline, where domains are ad-hoc and user-defined, the question remains whether LLMs can generate lightweight ontological structures on the fly — or whether simpler schemas with semantic annotations are the pragmatic ceiling.
- The OADAPT specification validates the ontology network concept with detailed specs for four ontologies, but also demonstrates the cost: the full specification is ~40 pages of conceptual models, competency questions, verification tables, and instantiation examples for a single adaptive social network. The *knowledge content* (disability taxonomy, adaptation rules, component classification) is valuable regardless of whether it's encoded as a formal ontology or a simpler schema. The question is whether the ontological formalism earns its weight.
