---
type: concept
tags:
  - design-systems
  - patterns
  - implementation
  - component-libraries
sources:
  - sources/model-based-UI-with-patterns
created: 2026-02-08
---
Modern design systems (Material UI, Ant Design, Radix, Shadcn, Chakra UI) are the practical implementation of [[pattern]]-driven UI development. They provide component catalogs, composition patterns, design tokens (abstraction layers), and usage guidelines — exactly what the academic pattern library literature describes, but production-ready.

## Context

The model-based UI paper (2006) describes pattern libraries as theoretical constructs for reusable UI building blocks. Meanwhile, the design systems movement (2010s-present) independently solved the same problem from a practitioner perspective. Design systems codify:
- **Component libraries** (the catalog of available UI elements)
- **Composition patterns** (how components combine — atomic design methodology)
- **Design tokens** (abstraction layer: semantic values → platform-specific implementations)
- **Usage guidelines** (when to use which pattern, accessibility rules, interaction patterns)

The academic concept of "task patterns → presentation patterns → layout patterns" maps to design system layers: **user intent → semantic components → styled primitives → design tokens**.

## Connections

- **Implements** [[pattern-driven transformation]] — design systems provide pre-built transformation rules
- **Enables** [[pattern composition]] — composition is core to design system architecture (atomic design)
- **Provides** [[abstraction-to-concrete mapping]] via design tokens
- **Related to** [[component catalog as schema]] — design system component libraries are catalogs
- **Bridges** academic MBUI theory and practical implementation

## Relevance to project

This fundamentally changes the implementation strategy. Instead of building a pattern library from scratch, **use an existing design system as the foundation**:

1. **Component catalog = design system library**: json-render's catalog should map to a design system (e.g., Radix primitives, Shadcn components)

2. **Pattern library = design system patterns**: Extract composition patterns from the design system's documentation. "Search" pattern = SearchInput + Results component + Filter sidebar (as documented in the design system)

3. **LLM training data**: Design system documentation provides natural language descriptions of patterns + their implementations. This is training data for the LLM's pattern selection.

4. **Semantic components**: Modern design systems provide semantic abstractions (not just `<Button>` but `<PrimaryAction>`, `<DangerousAction>`, `<CancelAction>`). These semantic labels help LLM pattern matching — "user wants to submit" → `<PrimaryAction>`, not raw `<Button>`.

5. **Design tokens as parameters**: Pattern instantiation variables map to design tokens. Instead of hardcoding colors/spacing, patterns reference tokens. User preference changes update tokens, automatically propagating through all patterns.

**Practical architecture:**
```
User prompt
  → Task pattern identification (LLM)
    → Design system pattern selection (e.g., "Search" pattern from MUI docs)
      → Component composition (SearchBar + DataGrid + FilterPanel)
        → Token application (theme tokens applied)
          → json-render spec (targeting design system components)
            → Rendered UI
```

**Advantages:**
- Don't build component library from scratch — use battle-tested design systems
- Rich documentation provides LLM training data
- Accessibility, interaction patterns, responsive behaviour already solved
- Design token system provides abstraction layer for theming/customisation

**Trade-offs:**
- Locked into design system's opinions and constraints
- Design system breaking changes affect generated UIs
- May need to support multiple design systems (enterprise requirement)

## Open threads

- How do you handle design system version changes? Pattern mappings break?
- Can you mix components from multiple design systems? Or must choose one?
- Design systems have hundreds of components — how does LLM navigate that space efficiently?
- Do different design systems require different pattern libraries, or can patterns be design-system-agnostic?
- How do you validate that generated UI respects design system guidelines (not just uses components, but uses them correctly)?
