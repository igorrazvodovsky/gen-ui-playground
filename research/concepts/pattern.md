---
type: concept
tags: [patterns, reuse, design, parameterisation]
sources: ["sources/model-based-UI-with-patterns"]
created: 2026-02-08
updated: 2026-03-11
---
A proven solution to a recurring problem in a specific context, documented in a way that makes it reusable across different situations. Patterns capture design knowledge — not just the solution, but the problem it solves, the context where it applies, the forces at play, and the trade-offs involved.

## Context

The pattern concept originated with Christopher Alexander's architectural work (1977) — patterns for building towns, buildings, and construction that create "quality without a name." The software engineering community adopted this: Gang of Four design patterns (1994), then HCI patterns for user interface design.

**Key insight from Alexander**: A pattern isn't just a template to copy-paste. It's a relationship between a context, a system of forces, and a configuration that brings those forces into equilibrium. You don't apply a pattern mechanically — you adapt it to your specific situation.

### Alexander's own critique of patterns

Alexander himself came to see pattern languages as insufficient. At his OOPSLA '96 keynote, he told the software patterns community they'd adopted the wrong part of his work — patterns were a codification tool, but the *generative* mechanism was what actually mattered. His later work, *The Nature of Order* (2002–04), shifts focus to **structure-preserving transformations** and **fifteen properties of living structure** (strong centres, good shape, gradients, etc.). The fundamental differentiating process — observe the current whole, identify the weakest centre, apply a transformation that strengthens it without breaking what's there — is iterative and use-time, not design-time template instantiation.

This critique has direct relevance to the project. The pipeline currently frames the LLM as a "pattern instantiation engine" (select → parameterise → compose → render). That's the Gang of Four interpretation Alexander rejected. His alternative — generating systems that produce structure through incremental, context-sensitive transformations — maps more naturally onto the feedback loop (`↺ End-user customisation → Model evolution → UI update`), where the UI evolves through use rather than being fully specified upfront. The concept of "gradual stiffening" (Pattern 208 in *A Pattern Language*) — designs tested in situ, shifted, and firmed up over time rather than specified in advance — is a precursor to this later thinking.

**Gap**: The vault's current treatment of patterns draws almost entirely from the software patterns tradition (Gang of Four, Seffah & Gaffar, design systems). Alexander's later work on generating systems, structure-preserving transformations, and living structure is not yet captured. The *Nature of Software* series (https://the.natureof.software) translates *The Nature of Order* into software terms and may provide the bridge. See also Steenson (2016) for the historical transmission from Alexander → software design.

For UI development, patterns exist at multiple scales:
- **Task patterns**: Reusable task structures (Login, Search, Multi-Value Input Form)
- **Dialog patterns**: Navigation and sequencing between views (Wizard, Recursive Activation)
- **Presentation patterns**: Abstract UI element combinations — see [[presentation-pattern-taxonomy]] for a concrete enumeration (Service, Instance, Population, Master-Detail) composed from simple patterns (Filter, Order Criterion, Display Set, Navigation, Actions)
- **Layout patterns**: Spatial organisation and styling (Portal, House Style, Grid Layout)

### Instantiation

Patterns are parameterised — they contain variables (placeholders) that get bound to concrete values during instantiation, transforming abstract templates into concrete model fragments. Two variable types: **substitution variables** (simple replacements like task names) and **process variables** (structural parameters like "how many input fields").

A "Search" pattern works for searching hotel rooms, products, or documents — the structure is identical but the details differ. Variables cascade through pattern hierarchies — setting the "Object" variable on a Search pattern automatically sets related variables on its sub-patterns (Multi-Value Input, Browse).

The paper uses UML-style parametric classes: a pattern declares its interface (required parameters), and instantiation binds those parameters to produce a usable instance. This is conceptually identical to React components with props, or function application in programming.

**Critical design question**: Should patterns be **rigid templates** (fixed structure, variable values) or **flexible schemas** (LLM can modify structure too)? Rigid = more reliable but less expressive. Flexible = more powerful but riskier. json-render's approach: rigid schemas (Zod validation), flexible props.

## Connections

**Pattern operations** (how patterns are used):
- [[pattern composition]] — building complex patterns from simpler sub-patterns
- [[pattern-driven transformation]] — using patterns to transform between abstraction layers

**Relationship to other concepts**:
- **Implemented by** [[design systems as pattern libraries]] — modern design systems are pattern libraries in practice
- **Provides structure for** [[abstraction-to-concrete mapping]] — patterns encode the mapping rules
- **Works within** [[guardrailed generative UI]] — patterns constrain the generative space semantically
- **Informs** [[model hierarchy]] — different pattern types correspond to different model layers
- **Supports** [[gentle slope]] — pattern variables provide intervention points between viewing and coding
- **Specific case of** [[knowledge-graph-grounded-generation]] — pattern instantiation is the genUI-specific version: LLM navigating structured knowledge stores rather than generating from scratch. The "query" is pattern selection + variable binding.
- **Related to** json-render's prop passing — patterns with variables are like React components with props, and Zod schemas can validate instantiation

## Practical implementations

**Historical lineage**: Alexander's pattern language (1977), Tidwell's UI patterns (1999+), Van Welie's interaction design patterns, Yahoo Design Pattern Library (2006–2013), Borchers' pattern languages for interaction design (2001).

**Modern equivalents**: React components with props, template engines (Handlebars, Mustache, Jinja), design system variants (Shadcn's `variant` prop, Chakra's `colorScheme`), UI builders (Framer, Webflow, Builder.io), form builders (Typeform, Google Forms).

## Relevance to project

Patterns are the **bridge between task analysis and UI generation**. Instead of asking an LLM to generate UI from scratch (unpredictable), you give it a structured pattern library and ask it to:
1. Identify which patterns apply to the user's task
2. Instantiate those patterns with task-specific parameters
3. Compose patterns into complete UIs
4. Transform patterns through abstraction layers

This shifts the problem from "generate any UI" (intractable) to "select and configure patterns" (tractable). The LLM becomes a **pattern instantiation engine**.

**Architecture implication**: The pipeline needs a pattern library (curated collection), pattern metadata (semantic tags for LLM selection), pattern validation (ensure patterns only reference catalog components; Zod for parameter validation), and pattern composition rules.

**Semantic guardrails**: Instead of just saying "Button is valid" (catalog constraint), patterns say "In a Search context, use SubmitButton with primary variant" (semantic constraint). This gives LLMs structured guidance within safety boundaries.

**Design systems as pattern libraries**: Instead of building from scratch, extract patterns from design system documentation. Material UI, Radix, Shadcn already document when to use which components for which tasks.

## Open threads

- **Pattern discoverability**: How do LLMs find relevant patterns? Semantic search? Tags? Examples?
- **Pattern granularity**: Too fine-grained = overwhelming. Too coarse = inflexible. What's optimal?
- **Pattern evolution**: Can user modifications feed back into pattern definitions?
- **Pattern conflicts**: What happens when multiple patterns apply? How to choose?
- **Pattern composition vs. code composition**: How much should be pre-composed into organism patterns vs. dynamically composed by LLMs?
- **User-created patterns**: Can end-users save their customisations as new patterns for reuse?
- Can users modify pattern variable bindings post-generation? How do you handle invalid parameter combinations?
