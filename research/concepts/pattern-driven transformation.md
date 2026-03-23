---
type: concept
tags: [patterns, transformation, model-based]
sources: ["sources/model-based-UI-with-patterns"]
created: 2026-02-08
---
[[pattern|Patterns]] serve a dual role: they're building blocks for constructing models at a given abstraction layer, and they're transformation drivers between layers. A task pattern isn't just a template for task models — it implies which presentation and dialog patterns should be used when transforming that task model into lower-level representations.

## Context

Model-based UI development involves creating multiple models at different abstraction levels (task, dialog, presentation, layout). Transforming from one layer to the next is the most expensive and error-prone part of the process. Traditional approaches rely on manual, ad-hoc mappings.

Pattern-driven transformation codifies these mappings: if you use pattern X at the task level, patterns X' and Y' are recommended for the presentation level. Variables defined in the parent pattern cascade to child patterns, maintaining consistency across transformation boundaries.

## Connections

- **Extends** [[UI derivation process]] — provides the mechanism for how models transform
- **Requires** [[pattern composition]] — transformation patterns are typically aggregations of sub-patterns
- **Enables** [[abstraction-to-concrete mapping]] — structured path from high-level intent to concrete UI
- **Related to** [[specification-based rendering]] (from json-render) — both use declarative specs, but pattern-driven transformation happens *upstream* of rendering
- **Implemented by** [[design systems as pattern libraries]] — modern design systems provide production-ready pattern transformation rules
- **Complementary to** [[constraint-driven component selection]] — pattern-driven transformation handles macro-level mapping (task → UI sections), while constraint-driven selection handles micro-level mapping (field → component). The Nunes et al. [[ontology-driven UI generation]] system uses only constraint rules (no patterns), which works for form-like UIs but lacks task-level structure. The ideal system uses both: patterns for information architecture, constraints for field-level rendering.
- **Differentiated by** [[work-context-model]] — JTBD circumstance on goals drives pattern selection. Same task, different circumstances → different patterns (time-pressured round → scannable summary; audit → detailed table)

## Practical implementations

Modern design systems (Material UI, Ant Design, Radix UI, Shadcn UI, Chakra UI, Adobe Spectrum) implement pattern-driven transformation through their documentation and composition guidelines. They provide:
- Pattern documentation (when to use which components)
- Composition recipes (how to combine components for common tasks)
- Semantic components that encode pattern intent (SearchInput, DataGrid, FilterPanel)

Brad Frost's Atomic Design methodology codifies the composition hierarchy. Storybook and similar tools document patterns as executable examples.

## Relevance to project

This is the missing link between "[[task-model|task analysis]] → [[domain-data-model|data model]]" and "data model → UI spec" in the target pipeline. json-render handles "UI spec → rendered UI", but doesn't tell you how to *generate* the spec.

Pattern-driven transformation suggests the LLM's job isn't to generate UI specs directly — it's to:
1. Identify the user's task structure
2. Select applicable task patterns
3. Transform those task patterns into presentation patterns
4. Generate json-render specs from presentation patterns

The pattern library becomes a **constraint grammar** for the LLM. Instead of freeform generation, the LLM navigates a structured space of transformations.

Practical implication: the json-render catalog needs semantic metadata linking components back to the patterns they implement. A "Search" pattern implies specific task → presentation → component mappings.

**Design systems as pattern libraries:** Modern design systems (Material UI, Ant Design, Radix, Shadcn) already implement pattern-driven transformation. Their documentation describes task-level patterns ("user needs to search") and maps them to component combinations. Instead of building pattern libraries from scratch, use design system documentation as the pattern library. See [[design systems as pattern libraries]].

## Open threads

- Can this transformation pipeline be inverted? If a user modifies the rendered UI, can we propagate changes backwards through patterns to update the task model?
- How do you build a pattern library that's both comprehensive and learnable? The paper documents dozens of patterns — too many for manual selection, but potentially tractable for LLM-based selection
- What happens when multiple valid transformation paths exist? How do you choose between them?
- How does pattern-driven transformation interact with [[semantic-intermediate-layer]]? Park et al.'s semantic framework provides a complementary input structure. The Product.Goal and Feature.Function fields could drive pattern *selection* (which task pattern to apply), while Design System fields could constrain pattern *instantiation* (which visual properties to bind). [[scoped-semantic-editing]] at the Feature level could trigger pattern re-selection while preserving other semantic slots. This would connect the user-facing semantic layer to the pattern-based generation engine.
