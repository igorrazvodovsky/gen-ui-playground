---
type: concept
tags: [data-model, intent]
sources: [sources/lit-malleable-software]
created: 2026-02-06
---
Computational tools need structured data to operate on (schemas, types, relationships). But humans naturally express intent in unstructured ways (natural language, sketches, rough notes). The fundamental design challenge is bridging this gap — ideally through gradual enrichment rather than forcing structure upfront.

## Context

Ink & Switch explored this across two prototypes:

- **Potluck**: started with arbitrary plaintext, used "detectors" to parse structure. Finding: parsing unstructured text into structure is cumbersome. Complex relationships (containment, sequence) require complex detector rules.
- **Embark**: used hierarchical outlines as a middle ground — more structure than plaintext but still flexible. Structured objects (Google Maps locations) could be "mentioned" within the outline. Finding: some baseline structure makes computation dramatically easier without overly constraining the user.

The spectrum runs: free text → outlines → structured objects → formal schemas → **formal ontologies** → code. The question is where on this spectrum to operate, and whether you can let users move along it gradually.

Nunes et al.'s [[ontology-driven UI generation]] sits at the extreme structured end — a full OWL ontology with class hierarchies, semantic relationships, cardinality constraints, and foundational ontology reuse (BFO). This maximises UI generation quality (deterministic [[constraint-driven component selection]], guaranteed data validity) but requires an ontology engineer upfront. No room for vague intent. JELLY's task-driven data model occupies a pragmatic middle ground: structured enough for UI generation, lightweight enough to be LLM-generated from natural language.

## Connections

- Directly relevant to [[gentle slope]] — forcing users to work in formal schemas is a cliff; letting them start unstructured and gradually add structure is a slope
- Central to how the LLM fits into the pipeline — the LLM's job is essentially to bridge from unstructured (user prompt) to structured (data model)
- **Demonstrated by** [[knowledge-graph-grounded-generation]] — Fareedi et al. show the LLM acting as a literal translator: NL query → Cypher query → knowledge graph → structured results. The knowledge graph is maximally structured; the user query is unstructured; the LLM bridges them. 15% accuracy improvement over ungrounded generation quantifies the value of having structured knowledge to query.
- **Addressed by** [[semantic-intermediate-layer]] — Park et al. (CHI '26) propose the most concrete solution to this tension yet: an explicit, inspectable semantic layer between user intent and AI output. Instead of requiring the user to produce structure (write better prompts) or the AI to infer structure (guess from vague text), the system parses intent into editable semantic slots using [[hierarchical-design-semantics]]. The user can then correct and refine the structured representation before it drives generation. This is "progressive structuring" made real.

## Relevance to project

This is arguably the core challenge for the generative UI pipeline. The user says "I'm hosting a dinner party." The system needs to produce a structured [[domain-data-model]] (entities, attributes, relationships) via a [[task-model]] (what the user wants to do). JELLY uses LLMs for this bridge. The question is how well the LLM can infer structure from vague intent — and what happens when it gets it wrong.

For json-render: json-render operates entirely on the structured side (it receives JSON, it renders components). But the steps upstream — generating the JSON from user intent — are where this tension lives.

## Open threads

- How much structure should the user see? JELLY shows the data model via inspect tools, but is that too much for casual users?
- ✓ **Partially answered**: Park et al.'s [[semantic-intermediate-layer]] shows that structured slots with auto-parsing from natural language can work — users appreciated "being told what to specify" and found the system "organised my thinking for me." The key: allow partial specification (only fill in what matters to you) and auto-populate from NL input.
- What's the right intermediate representation? Embark's outline-with-structured-objects is an interesting alternative to JELLY's object-relational schema. Park et al.'s [[hierarchical-design-semantics]] (Product → Design System → Feature → Component) is another candidate — focused on design intent rather than data structure.
- **Bridged by** [[intent-decomposition]] — Kim et al. (CHI 2025) demonstrate another progressive structuring mechanism. The LLM decomposes an unstructured prompt into Goal → Intents → Intent Dimensions, each with a typed value and control widget. This is the bridge working at the *intent* level (before design specification). The implicit intent extraction is particularly relevant: the LLM not only structures what the user said, but surfaces what the task logically requires but the user left unstated — turning unspoken assumptions into visible, adjustable parameters.
- **Diagnosed as** [[bidirectional-ambiguity]] — Zhang et al. (UIST '25) sharpen this tension into a more specific claim: the format mismatch operates in *both* directions (user → system AND system → user) and the two directions compound each other across interaction turns. Their solution — [[externalised-LLM-understanding]] — addresses the system-to-user direction by surfacing the LLM's inferred task structure as an editable graph.
