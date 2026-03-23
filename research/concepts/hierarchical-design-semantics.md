---
type: concept
tags: [specification, intent, data-model, generative-ui]
sources: [sources/semantic-guidance-park]
created: 2026-02-20
---
UI generation semantics organise into four hierarchical levels — **Product** (description, target user, goal), **Design System** (style, colour, typography, visual properties, mood, tone of voice), **Feature** (function, content, information architecture), **Component** (type, interactivity, state, content, properties) — with relationships operating both vertically (between levels, top-down cascading) and horizontally (within levels, coherence constraints). Derived from thematic analysis of 907 prompting guideline fragments across six production UI generation tools.

## Context

The framework emerged from asking a practical question: what information do users actually need to specify for UI generation? Instead of designing a framework theoretically, Park et al. analysed what v0, Stitch, Figma Make, Lovable, Relume, and Wizard actually tell their users to include in prompts. The recurring patterns clustered into four levels, from strategic (Product) to concrete (Component). The hierarchy isn't just categorical — changes propagate. Setting "elderly users" as target user cascades to larger typography, higher contrast, simplified navigation, and specific component sizing.

## Connections

- Complementary to [[model hierarchy]] — Seffah's hierarchy (Task → Dialog → Presentation → Layout) describes abstraction levels in the *generation pipeline*. This hierarchy describes abstraction levels in the *design specification*. Rough mapping: Product ≈ Task (what/why), Feature ≈ Dialog (what screens/flows), Design System ≈ cross-cutting concerns (applied at Presentation level), Component ≈ Layout (concrete elements). The key difference: Design System is a horizontal concern in Park et al. (affects all levels), whereas Seffah treats each level as a sequential transformation.
- Extends [[pattern|patterns]] — the Product and Feature levels correspond roughly to the context in which patterns are selected. A pattern library could be indexed by Product.Goal and Feature.Function: "e-commerce checkout for elderly users" selects different patterns than "music streaming for young professionals."
- Informs [[constraint-driven component selection]] — the Component level's properties (type, interactivity, state) map to the constraints that drive deterministic widget selection. The Design System level adds global constraints (colour scheme, typography scale) that the component-level rules must respect.
- Relates to [[fluid-attributes]] — Meridian's attribute-level customisation operates primarily at the Feature/Component boundary. Park et al.'s framework adds the Product and Design System levels above, providing the strategic context that [[fluid-attributes]] lacks.
- Horizontal relationships connect to [[semantic-drift]] — when users modify one semantic element without understanding its horizontal dependencies, incoherence results. Making these relationships visible is how you prevent drift.
- Converges with [[context-driven adaptation]] — the Product.Target User field is essentially OADAPT's user profile in miniature. The framework suggests adaptation should be triggered at the Product level and cascade through Design System and Feature levels.

## Practical implementations

Park et al.'s system implements this as collapsible form panels with 15 total semantic slots. In production, similar hierarchical thinking appears in: Figma's component/variant/design token architecture (component ≈ Component level, design tokens ≈ Design System level), Brad Frost's Atomic Design (atoms/molecules/organisms/templates/pages maps to Component → Feature → Product), and Garrett's Elements of User Experience (strategy/scope/structure/skeleton/surface). The specific four-level structure with named slots is novel, but the principle of hierarchical design specification is well-established.

## Relevance to project

This framework could serve as the **schema for the first LLM touchpoint** — the output of task analysis. Instead of going directly from user prompt to json-render spec, the LLM produces a hierarchical semantic specification that's inspectable and editable. The user reviews/corrects it, and then the downstream pipeline (pattern selection, constraint-driven component mapping, spec compilation) operates on this structured input.

Specifically for json-render: Product level drives overall layout pattern selection. Design System level maps to design tokens / theme config. Feature level drives view/screen structure. Component level compiles to json-render `{type, props, children}` specs.

## Open threads

- Is this the right granularity? The paper found some user confusion between Design Style vs. Visual Mood, and Function vs. Information Architecture. Simpler might be better for LLM generation.
- How does this interact with multi-screen/multi-view generation? The framework was tested on single-component generation.
- Should the semantic slots be fixed (as in the paper) or dynamically determined by the task type? A data dashboard might need different Feature-level semantics than a social media feed.
- IntentFlow's [[intent-decomposition]] (Goal → Intents → Dimensions) is a parallel hierarchy for *task intent* rather than *design specification*. The two could compose: IntentFlow structures what the user wants to achieve; this framework structures how it should look. The Goal level maps roughly to Product; Intents map to Feature-level functions. Can the frameworks share a data model, or are they best kept as separate pipeline stages?
