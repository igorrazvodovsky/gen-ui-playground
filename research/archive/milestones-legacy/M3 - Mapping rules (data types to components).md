---
milestone: M3
status: not started
pipeline-segment: UI specification (mapping rules)
depends-on:
  - "[[M2 - Intermediate representation design]]"
---

# M3 — Mapping rules: data types → components

## Hypothesis

A finite, learnable set of mapping rules can translate data types in the IR to appropriate component specs in the json-render catalog.

## Why this matters

This is the "design knowledge" layer — the system's taste. A date field could be a text input, a date picker, or a calendar. A list of items could be a table, cards, or a kanban board. The mapping rules encode which choice is appropriate given the data type, cardinality, user task, and available screen space.

## What "done" looks like

A rule set (could be a JSON config, a decision tree, or a simple function) that takes an IR entity and produces a valid json-render spec. Test it against the example tasks from M2 — do the generated UIs make sense?

## Open questions

- Pattern library (static rules) vs. learned mappings vs. LLM-selected?
- How does the catalog constrain the mapping? If the "right" component doesn't exist, what's the fallback?
- Do mappings need context beyond the single entity (e.g. "this list is next to a map, so use a sidebar layout")?

## Informed by

- 2 (MBUI patterns)
- 3–5 (ontology-driven mapping)
- 9–10 (Meridian overview-detail patterns)
- 19 (JELLY mapping)

## Key blockers

Need IR shape before mapping can be designed

## Related Concepts

- [[abstraction-to-concrete mapping]]
- [[pattern-driven transformation]]
- [[constraint-driven component selection]]
- [[context-driven adaptation]]
- [[design systems as pattern libraries]]
- [[pattern]]
- [[pattern composition]]
- [[pattern]]
- [[component catalog as schema]]
