---
title: "Integrating Ontologies with Large Language Models for Enhanced Conversational Agents: A Framework for the Pediatric Emergency Department"
authors: [Amar Fareedi, Muhammad Fahad, Sara Saeed, Zunaira Shafique]
year: 2026
venue: "Knowledge (MDPI), vol. 6, issue 2"
type: literature
status: processed
---
## Core idea

Combines formal ontologies (built from Ontology Design Patterns) with LLMs to create conversational agents grounded in structured domain knowledge. The LLM doesn't generate responses from training alone — it translates natural language queries into Cypher queries against a Neo4j knowledge graph populated from the ontologies. The knowledge graph is the source of truth; the LLM is the translator.

## Key concepts

- **[[knowledge-graph-grounded-generation]]** — the LLM queries a structured knowledge store (here, Neo4j) rather than generating from its training weights. Reduces hallucination and ensures domain accuracy.
- **Ontology Design Patterns (ODPs)** — reusable, modular templates for building domain ontologies. Analogous to [[pattern composition]] but at the knowledge/domain modelling level rather than the UI level. The paper uses Content ODPs (domain concepts), Structural ODPs (formal relationships), and Communication ODPs (documentation).
- **SHAICF (Service-oriented Human-AI Collaborative Framework)** — the overall architecture: multiple interconnected ontologies → knowledge graph → LLM-mediated querying → conversational responses.
- **Competency Questions (CQs)** — natural language questions used to validate that the ontology captures the domain adequately. Each CQ maps to a SPARQL or Cypher query that the knowledge structure must be able to answer.

## Technical approach

**Ontology network**: Five interconnected ontologies built using Protégé and ODP methodology:

1. **Conversational Ontology (Convology)** — models dialogue structure (intents, entities, conversation flow, context tracking)
2. **Service Ontology (SO)** — PED services, departments, procedures, workflows
3. **Resource Ontology (RO)** — physical and human resources, availability, allocation
4. **Personalised Ontology (PO)** — user profiles, preferences, interaction history (parallel to OADAPT's User Profile Ontology)
5. **Disease Ontology (DO)** — medical conditions, symptoms, treatments, triage levels

Each ontology validated with Competency Questions — 60 CQs total across the five ontologies.

**Knowledge graph layer**: Ontologies exported to Neo4j as a labelled property graph. Classes → nodes, object properties → edges, data properties → node attributes. This flattening from OWL's description logic to a property graph trades formal expressiveness for queryability and LLM accessibility.

**LLM integration**: The pipeline is:
```
User NL query
  → LLM translates to Cypher query (using ontology schema as context)
    → Neo4j executes Cypher
      → Results returned to LLM
        → LLM formats as natural language response
```

The LLM receives the knowledge graph schema (node types, relationship types, property keys) as prompt context. It generates Cypher queries, not freeform text. The knowledge graph constrains possible answers — the LLM can only retrieve what exists in the graph.

**Prototype**: "Madibot" — a conversational agent for Islamabad's PIMS hospital PED. Built with Rasa (intent classification, entity extraction, dialogue management) + Neo4j + GPT-4. Evaluated with 30 healthcare staff on usability (SUS), response accuracy, and user satisfaction.

**Evaluation results**: Usability scored 78.5/100 (SUS), response accuracy 87% with ontology grounding vs. 72% without (15 percentage point improvement from KG grounding). The KG grounding primarily helped with factual/procedural queries; creative/empathetic responses still relied on LLM training.

## Extracted concepts

- Created: [[knowledge-graph-grounded-generation]]
- Updated: [[pattern]], [[ontology-driven UI generation]], [[structured vs unstructured tension]]
