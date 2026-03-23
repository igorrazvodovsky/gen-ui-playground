---
type: concept
tags: [patterns, specification, generative-ui]
sources: ["sources/malleable-overview-detail", "sources/meridian-overview-detail"]
created: 2026-02-13
---
A multi-view interface pattern where a collection of items is shown in a condensed overview (cards, rows, pins on a map) alongside a detailed view of a selected item. Found in 83% of information-seeking applications surveyed — the dominant pattern for browse-and-select tasks. Has three customisation dimensions: content (which attributes), composition (how views relate), layout (spatial arrangement).

## Context

Overview+detail is so pervasive it's almost invisible. Amazon product listings → product page. Airbnb search results → listing detail. Email inbox → email body. File manager → file preview. The pattern's ubiquity means getting it right in a generative UI system covers a huge proportion of real-world use cases.

The formative study (Min et al., 2025) found remarkably consistent attribute usage across 83 applications: overview cards converge on a small set of high-signal attributes (title, image, rating, price), while detail views show everything. But user preferences diverge significantly from these defaults — users want to promote detail attributes to overview cards, remove irrelevant defaults, and add computed/AI-derived attributes that don't exist in the raw data.

The three customisation dimensions are:

1. **Content** — which attributes appear, in what format. The most frequently desired customisation. Users want different attributes from those the developer chose.
2. **Composition** — how overview and detail views relate. Which attributes bridge both views. Whether selecting an overview item opens a detail panel, navigates to a new page, or expands inline.
3. **Layout** — spatial arrangement. Grid vs. list for overview, side-by-side vs. stacked for detail, responsive breakpoints.

## Connections

- **Instance of** [[pattern composition]] — overview+detail is a composed pattern: an overview view (list/grid pattern) + a detail view (form/card pattern) + a selection binding between them. The composition hierarchy is: Overview+Detail organism contains Overview (list of card molecules) + Detail (card with full attribute molecules) + Selection state.
- **Customised via** [[fluid-attributes]] — attributes are the content that fills the pattern. The pattern defines structure (two views linked by selection); attributes define substance (what appears in each view).
- **Extends** [[model hierarchy]] — overview+detail maps to the dialog model layer (sequencing between views: browse → select → inspect) and the presentation model layer (abstract layout of overview and detail regions). It's a concrete pattern that spans two model layers.
- **Constrains** [[constraint-driven component selection]] — within each view, individual attributes still need component mapping (price → currency display, rating → star widget, image → thumbnail). But the *view assignment* of attributes (overview vs. detail) is a higher-level decision that constraint rules don't cover — it requires task-level understanding.
- **Relates to** [[UI composition]] — overview and detail views need to coordinate: selecting an item in the overview updates the detail view. This is the cross-component communication problem. Meridian solves it through shared state in the provider component.
- **Informs** [[context-driven adaptation]] — different users might want different overview+detail configurations for the same data. A visual shopper wants image-heavy overview cards; a price-sensitive shopper wants compact rows with price comparisons. The pattern structure stays the same; the attribute configuration adapts.
- **Generalised by** [[semantic-zoom]] — instead of a binary (overview card / detail page), semantic zoom enables a continuous gradient of abstraction levels within each view. An overview card could show keywords at high density, summaries at medium density, abbreviated content at low density — without switching to a detail view. This reframes overview+detail as two points on a zoom spectrum rather than two discrete views.

## Practical implementations

- **Virtually every e-commerce site** — product listing + product detail page
- **Email clients** (Gmail, Outlook) — inbox list + email reading pane
- **File managers** (Finder, Explorer) — file list/grid + preview panel
- **Map-based interfaces** (Airbnb, Google Maps) — pins/cards on map + location detail
- **IDE file explorers** — file tree (overview) + editor (detail)
- **Obsidian** — file list + note editor (this vault, right now)
- **Master-detail pattern** in enterprise UI frameworks (SAP Fiori, Salesforce Lightning)

## Relevance to project

Overview+detail should be one of the **first patterns in the pattern library**. Its prevalence (83% of information-seeking apps) means it will be the most commonly generated pattern. The three customisation dimensions (content, composition, layout) provide a concrete structure for the LLM to work with:

```
LLM task analysis: "user wants to browse and compare hotels"
  → Pattern selection: Overview+Detail
    → Content config: which hotel attributes in overview vs. detail
      → Composition config: selection binding, cross-view attribute sync
        → Layout config: grid overview, side panel detail
          → Compile to json-render spec
```

Meridian's four-config specification (Data → Attribute → View → Layout) is a concrete implementation of how to specify this pattern declaratively. For the pipeline, this suggests that pattern instantiation should produce not a flat component spec but a structured config that separates content decisions from layout decisions.

**For the pattern library**: Overview+detail has well-understood variants:

- **List + panel** (email clients)
- **Grid + panel** (file managers, shopping)
- **Map + card** (location-based apps)
- **Table + drawer** (admin dashboards)
- **Timeline + detail** (social media, activity feeds)

Each variant is a composition of the same abstract pattern with different concrete view components. This maps cleanly to [[abstract-concrete-separation]]: the abstract pattern is "collection of items + selected item detail"; the concrete binding determines list vs. grid vs. map.

## Open threads

- Beyond overview+detail, what other multi-view patterns need malleable specifications? Dashboard (multiple coordinated views), comparison (side-by-side items), wizard (sequential views)?
- Can the overview+detail pattern be nested? (Overview of categories → detail shows overview of items in category → detail of selected item)
- How does the pattern handle real-time data? If the overview list updates while a detail is open, what happens?
- The formative study found 83% prevalence in information-seeking apps. What about creation/editing apps? Does overview+detail apply there too?
