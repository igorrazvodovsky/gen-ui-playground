---
type: concept
tags: [generation, knowledge-graph, llm-role, specification]
sources: ["sources/ontology-llm-conversational-ai"]
created: 2026-02-13
---
Instead of generating output from training weights alone, the LLM queries a structured knowledge store (knowledge graph, ontology, pattern library, component catalog) and assembles its output from retrieved facts. The knowledge store is the source of truth; the LLM is a translator between natural language and structured queries. This reduces hallucination and constrains output to what the knowledge base can support.

## Context

Fareedi et al. demonstrate this concretely: the LLM receives the knowledge graph schema (node types, relationships, properties) as prompt context, generates Cypher queries against Neo4j, and formats the retrieved results as natural language. The LLM never fabricates domain facts — it can only surface what exists in the graph. Their evaluation showed a 15 percentage point accuracy improvement (87% vs. 72%) when grounding responses in the knowledge graph vs. relying on LLM training alone.

The mechanism generalises beyond conversational AI. Any system that gives an LLM a structured vocabulary to navigate — rather than an open canvas to paint on — is implementing this pattern. The key architectural choice is: what's the knowledge store, and what query language does the LLM target?

## Connections

- **Generalises** [[pattern]] — pattern instantiation is a specific case where the "knowledge store" is a pattern library and the "query" is pattern selection + variable binding. Both share the principle: LLM navigates structured knowledge rather than generating from scratch.
- **Extends** [[ontology-driven UI generation]] — the ontology paper (Nunes et al.) uses ontologies to drive UI deterministically, with no LLM. This concept adds the LLM as an intermediary that *queries* the ontology/KG rather than bypassing it. Combines the reliability of structured knowledge with the flexibility of NL understanding.
- **Operationalises** one side of [[structured vs unstructured tension]] — the knowledge graph is the structured pole; the LLM handles the unstructured-to-structured translation.
- **Complementary to** [[constraint-driven component selection]] — constraint rules handle deterministic micro-decisions (data type → widget); KG-grounded generation handles the macro navigation (which part of the knowledge base is relevant to this query).
- **Informs** [[guardrailed generative UI]] — the knowledge graph acts as a semantic guardrail in addition to json-render's structural guardrails (schema validation, component whitelisting). The KG constrains *what the LLM can say*; the catalog constrains *what it can render*.
- **Stores** [[work-context-model]] stable dimensions — domain constraints and institutional rules (checklist dimensions 2 and 6) are best served as knowledge-graph entries rather than goal properties

## Practical implementations

- **RAG (Retrieval-Augmented Generation)**: The most widespread implementation — LLMs retrieve from vector stores or document indexes before generating. Less structured than KG-grounding (vector similarity vs. graph queries) but same principle.
- **GraphRAG (Microsoft)**: Combines knowledge graphs with RAG for structured retrieval. Closer to the paper's approach.
- **Neo4j + LLM integrations**: LangChain's `GraphCypherQAChain`, Neo4j's `GraphDatabase` tools — LLM generates Cypher, executes against graph, formats results.
- **Wikidata SPARQL + LLMs**: LLMs generating SPARQL queries against Wikidata's knowledge graph.
- **GitHub Copilot workspace**: Uses repo structure (a form of knowledge graph — files, dependencies, symbols) to ground code suggestions.
- **Design system documentation as LLM context**: When you feed Storybook docs or component API references to an LLM for UI generation, you're implementing lightweight KG-grounding — the component catalog is the knowledge store, the docs are the query interface.

## Relevance to project

This concept maps directly onto the genUI pipeline's architecture. The pipeline already assumes the LLM navigates structured knowledge:

| Pipeline stage | Knowledge store | "Query" |
|---|---|---|
| Task analysis | Pattern library | Pattern selection |
| Data model → UI spec | Component catalog + constraint rules | Component mapping |
| Adaptation | Adaptation rule library + user profile | Rule activation |

The paper's contribution is making this explicit as an architectural principle: **the LLM should always be querying a structured store, not generating into a void**. Each pipeline stage should have its own knowledge store (pattern library, catalog, adaptation rules) that the LLM navigates.

The Cypher-over-Neo4j mechanism is probably overkill for the genUI pipeline — the knowledge stores (pattern library, catalog) are small enough to fit in prompt context. But for larger pattern libraries or domain-specific knowledge, a queryable graph store becomes relevant. The principle scales: as the knowledge base grows, the LLM's query mechanism needs to get more structured (from prompt context → function calling → structured queries → graph queries).

## Open threads

- What's the right query mechanism for each pipeline stage? Prompt context (small knowledge stores), function calling (medium), or structured graph queries (large)?
- How do you keep the knowledge store in sync with the LLM's understanding of it? If the catalog changes, the LLM's schema context needs updating.
- Can the LLM build/extend the knowledge graph itself? The paper assumes domain experts build ontologies. For genUI, the LLM might need to generate new pattern entries or catalog extensions — effectively writing to the knowledge store, not just reading.
- The 15% accuracy improvement is compelling but the paper's evaluation was small-scale (30 users, healthcare domain). How does grounding quality scale with knowledge graph complexity?
