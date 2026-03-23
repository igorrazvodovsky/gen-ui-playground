---
title: "Development and Evaluation of an LLM-Based Tool for Automatically Building Web Applications"
authors: [Diana Nguyen Voronin]
year: 2024
venue: "MIT MEng Thesis"
type: literature
status: processed
---

## Core idea

Kodless uses concept design (Jackson) to structure LLM-generated web apps. The LLM generates concept specifications (name, purpose, state, actions) and then TypeScript implementations from those specs. The concept spec acts as an intermediate representation between natural language prompt and code. Key finding: "concept-driven prompt engineering" — prompts that name specific concepts and their actions produce dramatically better code than feature-level descriptions.

## Key concepts

- Concept-driven prompt engineering
- Concept specification as intermediate representation for generation
- Concept implementation framework (DocCollection base class, MongoDB-backed state, Express routes)
- Concept synchronisation (procedural glue code in routes that wires concepts together)
- Iterative prompt refinement (3-phase case study: minimal → enriched descriptions → working code in 3/10 trials by phase 3)

## Technical approach

Platform with standard architecture: each concept is a TypeScript class extending DocCollection (MongoDB). LLM (GPT-4) generates: (1) concept spec from NL description, (2) concept implementation from spec, (3) synchronisations/routes from app definition. Built-in User and WebSession concepts for authentication. Frontend generation assistant uses a "Hyper-Reactive Markup Language" DSL. Case study: library app with Book and LoanableInventory concepts, 3 phases of prompt refinement, 10 trials each.

## Extracted concepts

- `concept-spec-as-generation-checkpoint.md` (new)
- `concept-driven-prompt-engineering.md` (new)
- Updates to `concept-catalog.md` — evidence that concept naming improves LLM generation
- Updates to `concept-as-composition-unit.md` — adds Kodless as a third implementation approach
