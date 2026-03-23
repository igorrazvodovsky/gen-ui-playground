---
type: concept
tags:
  - mapping
  - transformation
  - abstraction
sources:
  - sources/model-based-UI-with-patterns
created: 2026-02-08
---
The rules and mechanisms for converting abstract specifications ([[task-model|task models]], presentation models) into concrete implementations (UI components, layouts). Not a one-to-one mapping — one abstract element may map to multiple concrete elements, and the mapping is context-dependent (platform, user role, device constraints).

## Context

The abstraction-to-concrete gap is where most model-based UI systems fail. Generating abstract models is tractable; rendering concrete UIs is well-solved. The mapping between them is the hard part.

Traditional approaches use handwritten transformation rules. The paper's approach uses patterns that *are* the mapping — a presentation pattern encodes "this abstract structure maps to these concrete widgets". Example: "Unambiguous Format" pattern maps data types to specific input components (String → text field, Date → three dropdowns, Boolean → checkbox).

## Connections

- **Implements** [[pattern-driven transformation]] — patterns are the mapping rules at macro level (task structure → UI sections)
- **Bridges** abstract (task/presentation models) and concrete (layout/components)
- **Related to** [[component catalog as schema]] — the catalog defines what concrete elements are available
- **Required for** [[UI derivation process]] — derivation only works if you can map between layers
- **Implemented by** [[design systems as pattern libraries]] — design tokens provide abstraction layer, component documentation provides mapping rules
- **Complemented by** [[constraint-driven component selection]] — rule-based mapping at micro level (data types/cardinalities → specific components). Patterns handle macro structure, constraints handle field-level component choice.
- **Informed by** [[ontology-driven UI generation]] — formal ontologies provide richer input for mapping than simple data schemas (semantic relationships, class hierarchies, formal cardinalities)

## Practical implementations

- **Design tokens**: map semantic values to platform-specific implementations
- **Design systems**: Material UI theming, Shadcn variants, Chakra style props — provide mapping layers between intent and rendering
- **Schema-to-UI libraries**: React Hook Form, Formik, react-jsonschema-form — map JSON schemas to form UIs
- **Type-to-component mappings**: GraphQL + Relay (types → components), tRPC (type-safe APIs), Zod (runtime schema validation)
- **CSS-in-JS**: Styled-components, Emotion, Stitches — abstraction layers between styles and rendering

## Relevance to project

This is the **core technical challenge** for the generative UI pipeline. json-render defines the concrete side (the catalog of components). JELLY and model-based UI define the abstract side ([[task-model|task models]], [[domain-data-model|data schemas]]). We need the mapping rules between them.

Three strategies:

**1. Pattern library approach (this paper):** Maintain a curated library of abstract → concrete mappings. "Search task" → "Form + Results List" pattern. LLM selects appropriate pattern based on task analysis.

**2. Learned mappings:** Train an LLM on examples of (task, UI) pairs, let it learn mapping rules implicitly. Flexible but unpredictable.

**3. Hybrid:** Pattern library as baseline, LLM can adapt patterns or generate custom mappings when patterns don't fit.

**Critical design constraint from json-render:** Mappings must target catalog components. You can't map to a component that doesn't exist. This makes pattern libraries particularly attractive — patterns can be validated at build time to ensure they only reference valid catalog entries.

**Data type mappings** (from paper's "Unambiguous Format" pattern) are especially important:
- String → TextInput
- Integer → NumberInput
- Boolean → Checkbox
- Enum → Dropdown/Radio buttons
- Date → DatePicker
- Array → List/Table
- Object → Form/Card

These should be **default mappings** in the system, with pattern library handling more complex cases.

**Ontology-driven mapping (Nunes et al.)** adds a fourth strategy: rule-based mapping from formal constraints. Ontological cardinalities (`only` → dropdown, `some` → add button, `min 1` → required field) deterministically select components. See [[constraint-driven component selection]]. This is the most reliable approach for leaf-level decisions but requires structured input (formal ontology or rich schema). The practical synthesis: **patterns for macro structure, constraint rules for micro structure, LLM for edge cases**.

**Design tokens as abstraction mechanism:** Modern design systems use design tokens to separate semantic intent from concrete implementation. Instead of hardcoding `color: #FF0000`, use `color: semantic.danger`. Tokens provide an abstraction layer: semantic values → theme-specific values → platform-specific rendering. This is abstraction-to-concrete mapping at the styling level. Combined with component-level mappings (task → components), you get full pipeline coverage. See [[design systems as pattern libraries]].

## Open threads

- How do you handle ambiguous mappings? Multiple valid ways to represent the same abstract structure?
- Can mappings be learned from user behaviour? If users consistently modify generated UIs in certain ways, update the mapping rules?
- What happens when the target catalog changes? Do mappings break?
- How do you make mappings inspectable? Users need to understand *why* a task mapped to this particular UI structure
