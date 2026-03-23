---
milestone: M2
status: not started
pipeline-segment: Task-driven data model → UI specification
depends-on:
  - "[[M0 - AI-assisted rendering from component catalog]]"
---

# M2 — Intermediate representation design

## Hypothesis

There's a useful intermediate representation between "what the user wants" (task/data model) and "what json-render needs" (component specs). Finding the right shape for this IR is the core design problem.

## Why this matters

json-render needs `{type, props, children}`. JELLY uses object-relational schemas (SVAL/DICT/PNTR/ARRY). Model-based UI uses domain + task + presentation models. The IR bridges the semantic gap — it captures *what the user is working with* in a form that can be compiled to *what the renderer needs*.

## What "done" looks like

A hand-authored IR for 3–5 example tasks (e.g. "plan a dinner party," "compare apartments," "track a reading list") that compiles cleanly to valid json-render specs. No LLM involved yet — this is about finding the right data shape.

## Open questions

- One IR or a chain of transformations (task model → data model → UI spec)?
- How much of JELLY's schema language to adopt vs. invent?
- Does the IR need to encode relationships between entities, or just flat attribute lists?
- How do you represent "this data should be shown as a map" vs. "this data should be shown as a list" — is that in the IR or in the mapping rules?

## Informed by

- Papers 2–5 (MBUI + ontology approaches)
- Varv
- Bridging Gulfs in UI Generation through Semantic Guidance
- JELLY — SVAL/DICT/PNTR/ARRY

## Key blockers

Core research question — papers 2–10 will inform this heavily

## Related Concepts

- [[model hierarchy]]
- [[abstraction-to-concrete mapping]]
- [[UI-derivation process]]
- [[ontology-driven UI generation]]
- [[structured vs unstructured tension]]
