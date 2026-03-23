---
type: concept
tags: [generation, specification, generative-ui, llm-role]
sources: ["sources/kodless", "sources/wysiwid"]
created: 2026-03-13
---

A concept specification (name, purpose, state, actions, operational principle) can serve as an intermediate checkpoint in LLM code generation. Instead of generating implementation code directly from natural language, the LLM first produces a concept spec, then generates code from that spec. The spec constrains the code generation, reducing variance and improving correctness. The spec is also human-inspectable — a designer or system can review whether the behavioural model is correct before implementation begins.

Both Kodless and WYSIWID demonstrate this pattern independently. Kodless generates concept specs from NL descriptions, then TypeScript implementations from specs. WYSIWID generates concept specs from minimal prompts, then implementation code from specs, noting the spec "allowed a more direct and reliable manipulation of code." Both found that LLM-generated code was more consistent when constrained by a prior spec, and that conversational refinement worked better at the spec level than at the code level. This fits the broader pipeline principle of [[knowledge-graph-grounded-generation]]: the concept spec is a structured intermediate form that constrains downstream generation.

## Context

Direct NL-to-code generation produces high variance: the LLM interprets the intent in many ways, sometimes contradictory. Adding a specification layer — not a rigid formal specification, but a semi-structured checkpoint — forces the LLM to make its interpretation explicit and correctable before code generation.

## Connections

- **Instance of** [[knowledge-graph-grounded-generation]] — the concept spec is a local knowledge structure that grounds code generation.
- **Supports** [[concept-as-behavioural-annotation]] — when the pipeline needs a concept, generating the spec first (then implementation) is the recommended mechanism.
- **Analogous to** [[hierarchical-design-semantics]] — just as Park et al.'s semantic slots structure the LLM's design interpretation, concept specs structure the LLM's behavioural interpretation.
- **Connects to** [[generation-layer-as-customisation-surface]] — the concept spec could be exposed as a customisation surface: users inspect the behavioural model before code generation.
- **Connects to** [[externalised-LLM-understanding]] — the concept spec is the LLM's understanding of the behaviour, made visible and correctable.

## Practical implementations

Kodless platform (spec → TypeScript). WYSIWID case study (spec → RDF/JS implementation). OpenAPI specs → API client generation (same pattern: spec constrains code). Database schema → ORM code generation. TypeScript interfaces → implementation scaffolding.

## Relevance to project

When the genUI pipeline detects that a concept is needed (behavioural complexity detected), the generation sequence should be: (1) LLM proposes concept spec (name, purpose, state, actions), (2) spec is validated against knowledge graph / catalog for consistency, (3) implementation is generated from spec. Step 2 is where the catalog adds value — a proposed "Bookmark" concept can be matched against the catalog's canonical Bookmark spec, catching deviations early. This also allows the user to review the behavioural model as an inspection point before rendering.

## Open threads

- Should the concept spec be user-visible? For domain experts, probably not (too technical). But for the system's debugging/inspection layer, absolutely.
- How stable are LLM-generated concept specs across multiple generations? Kodless found high variance in phase 1 but convergence with better prompts.
- Can concept specs be generated incrementally — start with name + purpose, add state and actions as the task clarifies?
