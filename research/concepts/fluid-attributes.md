---
type: concept
tags: [data-model, user-agency, generative-ui, specification, gentle-slope]
sources: ["sources/malleable-overview-detail", "sources/meridian-overview-detail"]
created: 2026-02-13
updated: 2026-03-11
---
Data attributes treated as first-class, user-manipulable entities — not just values rendered by components, but named objects with their own type, formatter, source mapping, and optional AI reformulation prompt. The attribute is the natural unit of customisation because it maps to the user's vocabulary ("show me the price per night") rather than the implementation's vocabulary ("modify the card component's props").

The right granularity for end-user interface customisation is the **attribute** — not the component (too technical), not the view (too coarse), not the pixel (too fine). Users think in data attributes, and the system should let them add, remove, reorder, reformat, and AI-transform at that level.

## Context

Most UI systems treat attributes as implementation details — a price field is a `<span>` inside a card component, and customising how it appears means editing the component. Fluid attributes invert this: the attribute is the primary abstraction. A `price` attribute has a source (data field), a display type (currency, badge, chart), a formatter (raw → formatted), and optionally an AI reformulation prompt ("summarise this as a value-for-money indicator"). The UI is a projection of the attribute configuration, not the other way around.

Meridian defines three attribute types:

- **Native** — direct mapping from a data field (`price` → price display)
- **Derived** — computed from multiple fields via a formatter function (`price / nights` → price per night)
- **AI-reformulated** — LLM transforms source data using a prompt (reviews → sentiment badge)

The Min et al. formative study found that nearly all user customisation desires mapped to attribute operations: "show me the distance to the beach" → add attribute to overview; "I don't care about the rating" → remove attribute from overview; "show price as price-per-night instead of total" → change attribute formatter; "give me a summary of whether this is a good deal" → add AI-reformulated attribute; "move the amenities list to the overview card" → promote attribute from detail to overview. None of these require understanding components, JSON, or UI architecture.

## Connections

- **Fills a gap in** [[gentle slope]] — the existing slope has a cliff between "tweak values" and "swap patterns." Attribute-level customisation sits in this gap: more powerful than value editing (you can add entirely new attributes, including AI-derived ones), less demanding than pattern manipulation (no structural understanding needed). Updated slope: view → tweak values → **customise attributes** → swap patterns → edit specs → edit models.
- **Extends** [[specification-based rendering]] — Meridian's spec isn't just `{type, props, children}` (component-centric). It's `{data, attributes, views, layout}` (attribute-centric). The attribute config layer sits between the data model and the view config.
- **Enables** [[ai-attribute-reformulation]] — AI reformulation is only possible because attributes are first-class objects with explicit source mappings and output types. The reformulation prompt is a property of the attribute, not a feature of the component.
- **Relates to** [[abstract-concrete-separation]] — the attribute definition (name, source, type) is abstract; the formatter and display type are concrete. The same attribute can be rendered differently in overview vs. detail views by having different concrete bindings in each view config.
- **Contrasts with** [[constraint-driven component selection]] — constraint-driven selection maps data *types* to components (string → text input, enum → dropdown). Fluid attributes operate at a higher level: they map data *meaning* to presentation *intent* (price → "show as comparison badge"). The two are complementary — constraints handle the component choice, attributes handle the semantic framing.
- **Reads from** [[domain-data-model]] — the domain data model defines what fields exist and their types; the attribute configuration layer then decides how those fields are presented.
- **Supports** [[accretive-extensibility]] — Meridian's end-user customisations are spec overlays on the base attribute/view config. Adding an attribute to the overview doesn't edit the base spec; it layers a modification. Clean, reversible, composable.
- **Informs** [[pattern composition]] — in an overview+detail pattern, attributes are the content that flows through the pattern structure.
- **Contrasts with** [[in-place toolchain]] — in-place toolchains expose the *implementation*; attribute-level customisation exposes the *content*. Both are valid; attribute-level is more accessible to non-technical users.
- **Extends** [[context-driven adaptation]] — user customisation of attributes is a form of adaptation driven by preference rather than profile. The system can also *suggest* attribute configurations based on user context.

## Practical implementations

- **Airtable views** — fields are first-class; views configure which fields appear, in what order, with what formatting. Closest mainstream equivalent.
- **Notion databases** — properties are attributes; views (table, board, calendar, gallery) configure which properties appear and how.
- **Obsidian Dataview** — metadata properties as queryable attributes rendered in different view formats.
- **Spreadsheet column formatting** — each column is an attribute with a type and format.
- **Looker/Metabase dimensions and measures** — data attributes with defined types and formatting rules across visualisation types.
- **Tableau/Power BI dimension shelves** — drag data attributes onto visual encoding shelves (rows, columns, colour, size).
- **Jira board configuration** — choose which fields appear on cards.
- **GraphQL field selection** — clients request which attributes to include, though without formatting semantics.

## Relevance to project

Fluid attributes suggest a **new intermediate layer** in the pipeline between the data model and the UI spec:

```
User prompt
  → Task analysis → task-driven data model (entities + fields)
    → Attribute configuration (formatters, display types, AI reformulations)
      → View configuration (which attributes in which views)
        → Layout configuration (spatial arrangement)
          → Rendered UI
```

This splits the current monolithic "data model → UI spec" step into two: (1) define how data attributes should be presented (attribute config), and (2) define where they go in the UI (view config). The attribute layer is where the LLM's semantic understanding adds the most value.

For json-render: the current spec format (`{type, props, children}`) is component-centric. An attribute-centric layer above it would define attributes with their formatters, then compile down to component specs.

Five operations users can perform on attributes:

1. **Add** attributes (including AI-derived ones) to any view
2. **Remove** attributes they don't care about
3. **Reformat** attributes (change display type, formatter)
4. **Reorder** attributes within a view
5. **Promote/demote** attributes between views (overview ↔ detail)

Each produces a well-defined, reversible spec modification. The LLM can mediate — "show me the distance" → LLM identifies the right data field, selects an appropriate formatter, and produces an attribute config addition.

## Open threads

- How do fluid attributes interact with [[pattern-driven transformation]]? Patterns define UI structure; attributes define content. Do patterns specify *slots* that attributes fill?
- Can the LLM generate attribute configs as a separate step from generating the UI structure?
- How does attribute-level customisation scale beyond overview+detail? For dashboards, forms, and other multi-view patterns, does the attribute model still hold?
- Performance: AI-reformulated attributes require LLM calls per data item. How does this scale to large datasets?
- Does attribute-level customisation work for non-information-seeking interfaces?
- How does the system discover which attributes are *available* (but not shown)?
- Can attribute customisations transfer across similar interfaces? (Portable preference via [[cross-task-user-knowledge]])
