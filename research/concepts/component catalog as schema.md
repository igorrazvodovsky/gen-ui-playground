---
type: concept
tags: [json-render, specification, guardrails]
sources: [json-render, "sources/ontology-specification", "json-render docs 2026-03"]
created: 2026-02-07
---
The component catalog serves dual roles: it's both a registry of available UI components *and* the validation schema that constrains what specs can contain. By defining components with Zod schemas (component name + prop types), the catalog becomes the single source of truth for what's generatable—enabling both guardrailed AI generation and runtime validation.

## Context

In traditional UI frameworks, component libraries are just code imports. There's no declarative registry of "what components exist and what props they accept." This makes it impossible to programmatically constrain what an AI can generate—you'd need to parse source code or maintain separate documentation.

json-render inverts this: the catalog is a first-class data structure that declares `{ ComponentName: PropSchema }`. This catalog then:
1. Generates system prompts for the AI (via `catalog.prompt()`) that describe available components
2. Validates AI-generated specs at runtime (rejecting invalid component names or prop types)
3. Drives the binding layer (maps spec component names to React implementations)

The catalog is the schema—not just for data validation, but for constraining the generative space.

## Connections

- **Enables** [[guardrailed generative UI]] — catalog whitelisting prevents arbitrary component generation
- **Requires** [[specification-based rendering]] — only works when UI is described as data structures (specs) rather than code
- **Defines the concrete side of** [[abstraction-to-concrete mapping]] — catalog components are the target of pattern transformations
- **Constrains** [[pattern]] — patterns can only reference catalog components
- **Informed by** [[design systems as pattern libraries]] — design system component libraries serve as natural catalogs
- **Supports** [[catalog-driven-prompt-generation]] — the catalog mechanically produces AI system prompts
- **Relates to** [[ontology-driven UI generation]] — both use formal schemas to constrain UI generation. The ontology constrains *what data shapes exist*; the catalog constrains *what components can render them*. In the Nunes et al. system, the implicit catalog (dropdowns, text inputs, add buttons) is small and hardcoded — [[constraint-driven component selection]] rules map ontological constraints to these implicit catalog entries. For a richer system, the catalog needs to be explicit so constraint rules can target specific entries.
- **Formally classified by** UISCO (Freitas & Barcellos, 2025) — the OADAPT specification provides a formal ontological taxonomy of UI components (Media, Layout, Alert, Form, Status Indicator — each with subtypes). This taxonomy was derived from formal ontology engineering yet converges with how practical libraries (Radix, MUI, Ant Design) organise their catalogs. The convergence validates that catalog categorisation reflects genuine domain structure. UISCO also marks every category as `{incomplete}` — acknowledging that no taxonomy fully covers the component space. Catalogs need the same extensibility.
- **Tension with** [[gentle slope]] — fixed catalogs limit customisation. How do users add components without programming?

## Practical implementations

- **json-render**: Component registry with Zod schemas, serves as both catalog and validation layer
- **Storybook**: Documents component APIs (though not machine-readable schemas)
- **React Docgen**: Extracts prop types from components to generate documentation
- **Design system docs**: Material UI, Radix, Shadcn document component APIs (could be scraped to generate catalogs)
- **GraphQL schema for UI**: Some systems define UI component schemas in GraphQL
- **Web Components manifest**: Custom elements registry in browsers

## Relevance to project

The catalog defines the **boundary between AI and implementation**. Understanding its constraints is critical for designing upstream systems:

**For task analysis stage**: The set of available components shapes what tasks can be represented. If the catalog has `Button` and `Input` but not `Calendar`, date-selection tasks need workarounds.

**For mapping rules stage**: Data types must map to components *that exist in the catalog*. The catalog's schemas reveal what props are available—e.g., if `Button` doesn't support `icon` prop, icon buttons require different components or composite specs. This is where [[abstraction-to-concrete mapping]] patterns must align with catalog reality.

**For model evolution stage**: When user intent changes, can we modify the catalog dynamically? Or is it fixed at build time?

**Pattern library integration**: The catalog should include semantic metadata linking components to the patterns they implement. A "SearchInput" component should tag itself as implementing the "Search" pattern's input sub-pattern.

## Open threads

- **Catalog evolution**: Can catalogs be extended at runtime (user adds new components), or are they build-time fixed? json-render doesn't specify.
- **Catalog granularity**: Should catalogs be fine-grained (one component per UI primitive) or coarse-grained (composite "patterns" like "LoginForm")? Trade-off: expressiveness vs AI cognitive load.
- **Cross-catalog composition**: Can specs reference components from multiple catalogs? (e.g., base UI library + domain-specific components)
- **Catalog as interface**: ~~If we want to support different rendering targets (React, Remotion, HTML), do we need per-target catalogs or one abstract catalog with multiple bindings?~~ **Answered (2026-03)**: json-render now has separate registries per platform (React, Vue, React Native, Remotion, PDF, email, image) sharing one abstract catalog. The catalog defines the component vocabulary; platform-specific registries bind implementations. One catalog, many renderers. This also extends to *schema formats* — the core is schema-agnostic, supporting A2UI, Adaptive Cards, AG-UI, OpenAPI, and custom formats alongside its built-in flat tree. The catalog concept is now a general primitive, not a json-render-specific pattern.
- **Catalog includes actions and functions**: The catalog now declares actions (named operations with typed params + descriptions) and functions (computed value implementations). This means the catalog constrains not just *what renders* but *what behaviours are available* and *what computations can run*. The AI's entire output space — structure, behaviour, and computation — is catalog-bounded.
