---
type: concept
tags: [patterns, hierarchy, modularity]
sources: ["sources/model-based-UI-with-patterns"]
created: 2026-02-08
---
Complex [[pattern|patterns]] are built from simpler sub-patterns using aggregation. A "Search" pattern contains "Multi-Value Input" and "Browse" sub-patterns. Variable bindings flow top-down: when you set a variable on the parent pattern, it affects all child patterns. This creates a tree of dependencies where modifying high-level patterns cascades changes downward.

## Context

Building UIs from atomic primitives is too low-level; building from monolithic templates is too rigid. Pattern composition offers middle ground — small reusable pieces that combine into larger structures while maintaining parametric control.

The paper uses UML aggregation relationships: Pattern A consists of sub-patterns B and C. Variables defined at A's level can be bound to variables in B and C. Example: Search pattern's "Object" variable gets passed to both the Browse and Multi-Value Input sub-patterns.

## Connections

- **Enables** [[pattern-driven transformation]] — transformation patterns are typically compositions
- **Required by** [[pattern]] — instantiating a parent pattern instantiates all children
- **Similar to** React component composition — nested components that pass props down
- **Contrasts with** copy-paste reuse — composition maintains consistency with original pattern
- **Implemented by** [[design systems as pattern libraries]] — design systems use atomic design methodology (atoms → molecules → organisms) which is pattern composition

## Practical implementations

- **Atomic Design** (Brad Frost): Atoms → Molecules → Organisms → Templates → Pages — the standard methodology for composing design systems
- **React component composition**: Nested components with props flowing down (prop drilling, composition patterns)
- **Design systems**: Material UI, Shadcn, Radix, Chakra — all organize components in composition hierarchies
- **Storybook**: Documents composition patterns as stories (examples of composed components)
- **Component libraries**: Headless UI, Radix Primitives — composable primitives that build into complex components

## Relevance to project

This is how you build a **composable pattern library** instead of a flat collection of templates. Atomic patterns (Button, Input Field, List) combine into molecular patterns (Form = multiple Input Fields + Submit Button) which combine into organism patterns (Search = Form + Results List + Filters).

For generative UI, this creates a three-tier architecture:
1. **Atomic components** (json-render catalog entries)
2. **Molecular patterns** (compositions of atomic components)
3. **Organism patterns** (full UI sections combining multiple molecules)

The LLM works at the organism level — selects high-level patterns, instantiates them, lets composition handle the details.

**Key insight from the paper:** Variable cascading is the secret to making composition work. You don't manually wire up every connection between sub-patterns. Setting one top-level variable ("this Search is about Hotel Rooms") automatically configures all the nested forms, lists, and filters.

Practical implication: json-render specs need **variable substitution** support. A spec template might have `{{object}}` placeholders that get resolved when the pattern is instantiated. Or alternatively, build a layer *above* json-render that handles pattern composition and outputs fully-resolved specs.

**Atomic design methodology:** Brad Frost's atomic design (atoms → molecules → organisms → templates → pages) is pattern composition in practice. Design systems organize components using this hierarchy. For generative UI: atoms = catalog components, molecules = simple patterns, organisms = complex patterns. The LLM selects organisms, composition cascades down. See [[design systems as pattern libraries]].

- **Complemented by** [[accretive-extensibility]] — pattern composition builds structures from sub-patterns (static, design-time). Accretive extensibility layers new behaviour on existing structures (dynamic, runtime). Varv uses extension operators (inject, join, omit, pick) — these are behavioural composition analogous to pattern structural composition. Both mechanisms are needed: patterns for building initial structures, accretive extension for evolving them.
- **Instantiated by** [[concept-as-composition-unit]] — Varv's concepts compose through extension operators, which is a different composition mechanism than pattern aggregation but serves the same goal: building complex from simple. Concepts can be thought of as composable behaviour patterns, while patterns (in the MBUI sense) are composable structural patterns.

- **Populated by** [[fluid-attributes]] — Min et al. (2025) show that composed patterns need *content*, not just structure. An [[overview-detail-pattern]] defines two views and their relationship; [[fluid-attributes]] define what data populates each view. Pattern structure + attribute configuration = complete interface. This suggests pattern templates should define attribute *slots* that users can fill and reconfigure.

## Open threads

- How deep should composition hierarchies go? At what point does nesting become unmanageable?
- Can users recompose patterns? Take a generated Search UI and swap the Browse sub-pattern for a different view?
- What happens when sub-patterns conflict? (e.g., two sub-patterns want different layouts)
- How do you visualise composition structure so users understand what they're modifying?
- **Composition mechanisms compared**: MBUI uses aggregation (parent contains children, variables flow down). Varv uses extension operators (inject merges into existing, join creates new from sources). Déjà Vu uses [[declarative-concept-binding]] (template bindings with dataflow and [[transactional-composition|transaction scope]]). Atomic design uses nesting (atoms in molecules in organisms). Three distinct mechanisms: structural nesting, behavioural extension, and declarative wiring. Are these fundamentally different, or different syntax for the same underlying operation?
- **Template-as-composition** (from Déjà Vu): the composition template could itself be a pattern. A "Search" pattern template would wire together Query, Filter, and Results concepts with standard dataflow bindings. Pattern libraries could include both structural patterns (how components nest) and wiring patterns (how concepts bind).
