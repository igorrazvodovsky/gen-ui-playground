---
title: "Meridian: A Declarative Specification and Framework for Malleable Overview+Detail Interfaces"
authors: [Min, Xia]
year: 2025
venue: "CHI 2025"
type: literature
status: processed
companion: "[[sources/malleable-overview-detail]]"
---
## Core idea

Meridian is a declarative specification language and React framework that implements the design space from the companion paper. It specifies malleable overview+detail interfaces through four configuration layers: DataConfig (schema), AttributeConfig (formatters and reformulators), ViewConfig (which attributes in each view), and LayoutConfig (spatial arrangement). The key architectural move is making attributes — not components — the primary unit of specification and customisation.

## Key concepts

- [[fluid-attributes]] — the specification mechanism: attributes defined with types, formatters, AI reformulators, and view assignments
- [[fluid-attributes]] — end-user customisation operates by manipulating attribute definitions
- [[ai-attribute-reformulation]] — `aiReformulate` field in attribute config: prompt + target type → LLM transforms raw data
- [[overview-detail-pattern]] — the target pattern Meridian specifies

## Technical approach

**Four-layer specification**:

```
DataConfig → AttributeConfig → ViewConfig → LayoutConfig
```

1. **DataConfig** — data source URL + schema definition (field names, types). The raw data model.
2. **AttributeConfig** — for each attribute: source field(s), display type, formatter function, optional `aiReformulate` config (prompt + output type). Three attribute types:
   - *Native*: direct mapping from data field (e.g. `price` → price display)
   - *Derived*: computed from multiple fields via formatter function (e.g. `price_per_night = price / nights`)
   - *AI-reformulated*: LLM transforms data using a prompt (e.g. reviews → sentiment summary)
3. **ViewConfig** — defines overview and detail views as ordered lists of attribute references. Attributes can appear in both views with different formatters. Controls what users see in each view.
4. **LayoutConfig** — spatial arrangement: overview grid/list layout, detail panel position, responsive breakpoints.

**React implementation**: Built as a component library with `<MeridianProvider>`, `<OverviewPanel>`, `<DetailPanel>`, `<AttributeSlot>` components. The specification is passed as a JSON config object to the provider. Components render based on the spec — changing the spec changes the UI.

**End-user customisation layer**: Built on top of the developer API. Users can:
- Drag attributes between overview and detail views
- Add/remove attributes from views
- Change attribute display format (dropdown of available formatters)
- Reorder attributes within a view
- Request AI reformulation of attributes (type a prompt, get a new derived attribute)
- Adjust layout (grid density, detail panel size)

All user customisations are represented as spec modifications — they produce a new AttributeConfig/ViewConfig that overlays the developer-defined base config.

**Developer study**: 12 developers (6 professional, 6 student) built interfaces across 4 domains (shopping, hotel, restaurant, job search). Key findings:

- Specification was expressive enough to cover all design space dimensions
- Average task completion: 15–25 minutes for a full malleable interface
- Developers appreciated the attribute-centric model ("thinking about data attributes rather than UI components was more natural for information-seeking tasks")
- Main pain point: AI reformulation prompts required iteration to get good results
- The four-layer structure mapped well to developers' mental models of the problem

**Architecture diagram** (simplified):

```
JSON spec (4 configs)
  → MeridianProvider (parses spec, manages state)
    → OverviewPanel (renders attribute slots per ViewConfig)
    → DetailPanel (renders attribute slots per ViewConfig)
    → CustomisationPanel (user modifications → spec overlays)
      → Updated spec → re-render
```

**Spec overlay model**: End-user customisations don't modify the base spec. Instead, they produce overlay configs that the provider merges at runtime. The base config is always recoverable. This is structurally identical to [[accretive-extensibility]] — modifications are additive layers, not edits.

## Extracted concepts

- [[fluid-attributes]]
- [[fluid-attributes]]
- [[ai-attribute-reformulation]]
- [[overview-detail-pattern]]
