---
title: "Model-based user interface engineering with design patterns"
authors: ["Seffah Ahmed", "Gaffar Ashraf"]
year: 2006
venue: "Journal of Systems and Software"
type: literature
status: processed
---
## Core idea

Model-based UI development suffers from poor reuse — creating and transforming models is tedious and largely manual. This paper introduces patterns as reusable building blocks for constructing models (task, dialog, presentation, layout) and as drivers for transforming one model into another. Patterns encapsulate proven solutions with parameters that get instantiated to specific contexts, making model-based development practical.

## Key concepts

- [[pattern-driven transformation]]: Patterns aren't just templates — they drive the transformation between abstraction layers (e.g., task → dialog, presentation → layout)
- [[model hierarchy]]: Task models (what users do) → Dialog models (sequences between views) → Presentation models (abstract UI elements) → Layout models (concrete positioning and styling)
- [[pattern]]: Patterns contain variables as placeholders; instantiation binds these to concrete values for the current context
- [[pattern composition]]: Complex patterns are aggregations of simpler sub-patterns; changes to parent pattern variables cascade to children
- [[UI derivation process]]: UI generation as iterative model transformation — each layer refines the abstraction from the previous layer

## Technical approach

**PD-MBUI framework** (Pattern-Driven Model-Based UI):
- Uses XUL (Extensible User Language) as common representation format across all models
- Velocity templates generate XUL code from patterns with parameters
- Task Pattern Wizard guides developers through: identification (target node in model), selection (choose applicable pattern), adaptation (bind variables), integration (merge pattern instance into model)
- Pattern taxonomy: Task patterns (e.g., Search, Login, Multi-Value Input Form), Dialog patterns (e.g., Wizard, Recursive Activation), Presentation patterns (e.g., Form, Unambiguous Format), Layout patterns (e.g., Portal, House Style)

**Pattern application process:**
1. Identification: select subset M' of target model M
2. Selection: choose pattern P applicable to M'
3. Adaptation: bind pattern variables to create instance S
4. Integration: merge S into M', connecting to other elements

**Key insight:** Patterns relate hierarchically across model layers. A task pattern X for building task model A implies presentation patterns X' and Y' for building presentation model B, where B is a transformation of A. Variable bindings flow top-down — changing a high-level pattern affects all sub-patterns.

## Extracted concepts

- [[pattern-driven transformation]]
- [[model hierarchy]]
- [[pattern]]
- [[pattern composition]]
- [[UI derivation process]]
- [[abstraction-to-concrete mapping]]
