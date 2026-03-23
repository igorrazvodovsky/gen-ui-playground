---
title: "What You See Is What It Does: A Structural Pattern for Legible Software"
authors: [Eagon Meng, Daniel Jackson]
year: 2025
venue: "Onward! '25, ACM SIGPLAN"
type: literature
status: processed
---

## Core idea

Proposes a structural pattern for software legibility: concepts (independent services) + synchronisations (declarative event-based rules). Synchronisations replace all procedural glue code — route handlers, controllers, middleware — with declarative when/where/then rules. The architecture delivers three properties: incrementality (localised changes), integrity (no cross-concept breakage), transparency (action traces for debugging). LLM case study: generated both concept specs and synchronisations for RealWorld benchmark (Medium clone).

## Key concepts

- Synchronisation language (when/where/then declarative rules replacing procedural glue code)
- Concept as independent service (state machine with actions, implemented as computational agents)
- Flow-based scoping (action traces linked by flow tokens for causal tracing)
- Concept entropy (referenced from Palantir paper — concepts as antidote to complexity)
- Bootstrap concept (Web concept as entry point handling HTTP requests/responses)
- Provenance and causal documentation (every action traceable to synchronisation that caused it)

## Technical approach

Concepts implemented as computational agents managing RDF graph stores. Synchronisation engine: reactive database watching for action completions, firing matching synchronisations, recording invocations. Where clause uses SPARQL-like queries across concept states. RealWorld case study: Conduit (Medium clone) implemented with ~10 concepts, ~30 synchronisations. LLM generated specs from minimal prompts and code from specs; synchronisations required iteration. RDF/Linked Data for state, Comunica SPARQL engine for queries.

## Extracted concepts

- `synchronisation-as-behavioural-rule.md` (new)
- `concept-spec-as-generation-checkpoint.md` (shared with Kodless)
- Updates to `declarative-concept-binding.md` — synchronisations are an alternative to Déjà Vu's template bindings
- Updates to `concept-as-composition-unit.md` — adds WYSIWID as fourth implementation
