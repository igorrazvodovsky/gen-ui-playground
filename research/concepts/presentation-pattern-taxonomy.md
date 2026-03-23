---
type: concept
tags: [patterns, specification, component-mapping, data-model]
sources: ["Just-UI (Molina, Melia & Pastor)"]
created: 2026-03-13
---
A finite set of abstract interaction types — Service, Instance, Population, Master-Detail — that exhaustively classify how users interact with data objects in information systems. Each type is composed from a small vocabulary of simple patterns (Filter, Order Criterion, Display Set, Navigation, Actions) that declare *what the UI needs to say about the data*, not how it looks.

## Context

Just-UI (Molina, Melia & Pastor, early 2000s) approaches UI specification by asking four questions about each data class: *how to search?*, *how to order?*, *what to see?*, *what to do?* Each answer maps to a simple pattern:

- **Filter** — search criteria for finding objects (e.g. `colour="red" and fare.code="special"`)
- **Order Criterion** — sort rules over attributes (e.g. `brand ASC, colour DESC`)
- **Display Set** — which attributes to show (e.g. `brand, model, year, colour, state`)
- **Navigation** — which related objects to reach from here (following relationships in the data model)
- **Actions** — which operations the user can perform (CRUD operations, domain services)

These five primitives compose into four presentation patterns:

| Pattern | Purpose | Composed from |
|---------|---------|---------------|
| **Service** | Execute an operation (form-like) | Input fields, grouping, dependencies, feedback |
| **Instance** | View/edit a single object | Display Set, Actions, Navigation |
| **Population** | Browse a collection of objects | Filter, Order Criterion, Display Set, Navigation, Actions |
| **Master-Detail** | Coordinated parent-child views | Instance or Population as master; Instance, Population, or recursive Master-Detail as detail |

The taxonomy is deliberately platform-neutral — no design details are collected. A Population pattern maps equally to a web table, a mobile list, or a desktop grid. The translation to concrete widgets happens in a separate generation phase.

The key insight isn't the specific patterns (which are limited to CRUD-style business apps) but the *decomposition strategy*: you can specify a complete UI by answering a fixed set of questions about each entity in the data model. The questions are simple enough for non-technical users to answer, yet structured enough to drive automatic code generation.

## Connections

- **Concrete instance of** [[pattern]] — these are presentation-level patterns in the [[model hierarchy]], sitting below task patterns and above layout patterns
- **Provides vocabulary for** [[constraint-driven component selection]] — the simple patterns (Filter → search input, Display Set → column list, etc.) are essentially constraint-driven mappings at the interaction level, one step above the field-level mappings (string → TextInput, enum → Dropdown)
- **Feeds into** [[specification-based rendering]] — each pattern type declares enough information to generate a json-render spec. A Population pattern with its Filter, Order Criterion, and Display Set is structurally equivalent to a DataTable spec with search, sort, and column configuration.
- **Complements** [[pattern-driven transformation]] — Seffah & Gaffar's framework describes *how* patterns transform between layers; Just-UI's taxonomy describes *what* the presentation-layer patterns actually contain
- **Extends** [[abstraction-to-concrete mapping]] — adds an interaction-level mapping layer between task-level patterns (Search, Browse) and field-level constraint rules (string → TextInput)
- **Relates to** [[overview-detail-pattern]] — the Master-Detail presentation pattern is the formal version of the overview-detail interaction pattern, with recursive nesting
- **Bounded by** [[domain-data-model]] — the taxonomy assumes a class-based data model with attributes, relationships, and services. Richer data models enable richer pattern instantiation

## Practical implementations

- **react-admin** — its `<List>`, `<Show>`, `<Edit>`, `<Create>` resource views map almost exactly to Population, Instance, and Service patterns. Filters, sort controls, and field display are configured declaratively.
- **Django admin** — `list_display`, `list_filter`, `search_fields`, `ordering` on ModelAdmin classes are Display Set, Filter, and Order Criterion patterns.
- **Airtable views** — Grid view is Population (with Filter + Sort + Display Set); Expanded record is Instance; linked records are Navigation.
- **Retool / Appsmith** — low-code platforms whose Table + Form + Detail components map to Population, Service, and Instance patterns.
- **GraphQL + Relay** — connection-based pagination (`first`, `after`, `orderBy`, `filter`) implements Population pattern at the data layer.

## Relevance to project

The taxonomy answers a specific open question: **what does the UI spec need to declare about each entity in the data model?** For data-centric views, the answer is: filter criteria, sort order, visible attributes, available actions, and navigation targets. These five declarations, combined with the four composition patterns, cover the majority of information-display UIs.

For the pipeline, this suggests that when the LLM processes the task-driven data model, it should annotate each entity with these five dimensions. The annotations are simple enough to be LLM-generated reliably (they're selections from the data model's own attributes and relationships, not creative decisions) and structured enough to drive deterministic spec generation downstream.

**Limitation**: the taxonomy only covers data-centric interaction (browsing, editing, navigating between objects). It doesn't cover generative/creative tasks, conversational flows, dashboards with cross-entity aggregations, or anything where the UI structure doesn't mirror the data model structure. For the genUI pipeline, it's a solid base layer for the common case, not a complete solution.

## Open threads

- Can the five simple patterns be extended with modern equivalents? Inline editing, drag-to-reorder, infinite scroll, faceted search, and real-time collaboration are all absent from the original taxonomy but follow the same decomposition logic.
- How does this interact with [[fluid-attributes]]? Meridian's attribute-centric spec format (`{data, attributes, views, layout}`) is structurally similar — attributes map to Display Set, views map to presentation patterns. Could they be unified?
- The Master-Detail pattern's recursive nesting is interesting for the spec format — it implies the json-render spec needs a composition mechanism where one spec can embed another by reference, not just by nesting.
