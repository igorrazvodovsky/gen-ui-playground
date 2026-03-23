---
type: concept
tags: [specification, generative-ui, data-model, intent]
sources: ["sources/kodless", "sources/wysiwid", "sources/concept-centric-development"]
created: 2026-03-13
---

In a generative UI pipeline, concepts are not the primary architectural unit. They're selective annotations that the system applies when a task involves non-trivial behaviour — state transitions, side effects, cross-component coordination. Most design work is structural composition (assembling components and patterns). Concepts activate when composition isn't enough, when you need to reason about *how something works* rather than *what it's made of*.

Three approaches exist in the literature. Déjà Vu treats concepts as the primary structural unit; every app is a concept composition. WYSIWID treats them as independent services composed via synchronisations. Palantir treats them as organisational knowledge artefacts. Yet JELLY, pattern-driven transformation, ontology-driven UI, and the semantic intermediate layer all work without explicit behavioural concepts, suggesting concepts aren't architecturally necessary for most generation tasks. They become critical when behaviour is complex.

The trigger for needing a concept is experiential — a "chunk" of behaviour that doesn't reduce to structural composition. Filtering is a pattern; multi-step approval workflows are concepts. The boundary is a continuum of behavioural complexity, not a binary.

## Context

Most generative UI systems avoid concepts as primary units because the overhead is high: formal specifications require consensus, they're hard for LLMs to generate correctly, and most tasks don't need them. Yet systems that skip concepts entirely struggle when tasks have cross-component logic or state management requirements that patterns can't express.

## Connections

- **Repositions** [[concept-as-composition-unit]] — from primary unit to selective annotation. Concepts are still composable, but they're not the default vocabulary for generated apps.
- **Repositions** [[concept-catalog]] — from mandatory pipeline stage to knowledge resource. The catalog is consulted when behavioural complexity is detected, not always invoked.
- **Extends** [[knowledge-graph-grounded-generation]] — the concept catalog is one of the knowledge stores the LLM queries, specifically for behavioural patterns.
- **Compatible with** [[pattern-driven transformation]] — patterns handle structural composition; concepts handle the cases patterns can't express.
- **Relates to** [[feature-component-duality]] — concepts live on the feature face (user-facing functionality), not the component face (implementation building blocks).
- **Informed by** [[concept-entropy]] — Palantir's finding that formal concept specs are too heavy supports the "selective annotation" approach.

## Practical implementations

Design systems where most components are purely presentational but some carry embedded state machines (Radix's Dialog, Popover, Tabs — these are essentially concepts implemented as components). React hooks that encapsulate behavioural patterns (useForm, useAuth, usePagination) consulted when needed, not always present.

## Relevance to project

Reframes the pipeline's relationship to concepts. Instead of: user prompt → task analysis → concept selection → concept composition → UI spec. It becomes: user prompt → task analysis → structural composition (patterns + components) + behavioural specification (concepts, when triggered) → UI spec. The pipeline starts without concepts and adds them bottom-up when needed. The architecture just needs clean layer separation (data model, component tree, empty rule layer) to be hospitable to concepts when they arrive.

## Open threads

- Can the pipeline reliably detect when structural composition is insufficient and a concept is needed? Or does this require user signalling?
- What does the "empty rule layer" look like concretely? Is it a synchronisation engine (WYSIWID), a hook system, or something lighter?
- How many concepts does a typical generated app need? If most apps need 0-3, the "selective annotation" framing is right. If they need 10+, the approach may be wrong.
