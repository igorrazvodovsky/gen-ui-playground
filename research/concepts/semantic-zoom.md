---
type: concept
tags: [generative-ui, user-agency, specification]
sources: ["sources/sensecape", "sources/real-time-context-aware-IUI"]
created: 2026-02-24
---
Rendering the same content at different levels of abstraction depending on the user's current focus or zoom level. Not truncation (hiding text) or responsive design (adapting to screen size) — the LLM generates genuinely different representations at each level: full text, a summary capturing key points, and extracted keywords. The zoom level controls *cognitive density*, not just visual scale.

## Context

Sensecape (Min, Palani & Xia, CHI 2024) implements three rendering tiers per node on an infinite canvas: All (full text), Summary (LLM-generated précis), Keywords (key terms only). As the user zooms out, nodes crossfade between representations. The LLM calls happen once at node creation time — the three tiers are pre-computed and cached, so zoom is instantaneous.

The key insight: abstraction level is a *user-controlled* dimension, not a system-imposed one. The same content should be available at whatever granularity the user currently needs. When you're surveying the landscape, you want keywords. When you're focusing on a specific idea, you want the full text. Forcing one granularity for all contexts is a design failure.

This is distinct from progressive disclosure (which reveals *more content* on interaction) and responsive design (which adapts *layout* to viewport). Semantic zoom changes the *representation itself* — a summary isn't the same content in smaller text, it's a different text that captures the same meaning at lower resolution.

## Connections

- **Mechanism within** [[overview-detail-pattern]] — the overview view of an overview+detail pattern is essentially the "zoomed out" representation of items that the detail view shows in full. Semantic zoom generalises this: instead of a binary (overview card / detail page), there's a continuous gradient of abstraction levels. An overview card could show keywords at high density, summaries at medium density, and abbreviated full text at low density — all without switching to a detail view.
- **Complements** [[fluid-attributes]] — fluid attributes control *which* data attributes appear; semantic zoom controls *at what granularity* each attribute is rendered. They operate on orthogonal axes: attribute selection (horizontal — which fields) vs. attribute depth (vertical — how much detail per field). A fully customisable interface would let users control both.
- **Instance of** [[ai-attribute-reformulation]] — the summary and keyword representations are LLM reformulations of the full text. The difference: reformulation as typically described transforms one data field into a different kind of output (reviews → sentiment score); semantic zoom transforms one field into the *same kind* of output at different compression levels (text → shorter text → keywords). Same mechanism, different function.
- **Extends** [[gentle slope]] — semantic zoom sits at the absolute bottom of the slope, in the "view" zone. The user controls abstraction level through a gesture (zoom) they already know. No understanding of specs, data models, or even attributes required — just a trackpad pinch.
- **Relates to** [[parallel-state-display]] — Viégas & Wattenberg argue for surfacing the system's internal state at varying levels of detail alongside the primary interface. Semantic zoom is the interaction pattern that makes this practical: the monitoring layer could show full diagnostic detail when the user zooms into a specific area, and collapse to summary indicators when zoomed out.
- **Contrasts with** [[hierarchical-design-semantics]] — Park et al.'s four levels (Product → Design System → Feature → Component) are abstraction levels for the *specification*, not the content. Semantic zoom operates on the *rendered output*. Both are about navigating abstraction, but at different pipeline stages.
- **Discrete implementation in** [[optimisation-based-ui-adaptation]] — Stefanidi et al. (2022) implement a concrete version as Level of Detail (LoD) tiers: each Component Type has 1–3 discrete templates (LowLoD = icon only, MidLoD = icon + label, HighLoD = full text + metadata). The context determines which LoD is appropriate — high stress/crowdedness → low LoD, low stress + high expertise → high LoD. This is semantic zoom with discrete steps driven by context rather than user-controlled continuous zoom. The LoD choice is part of the optimisation objective (higher LoD scores differently than lower LoD under different conditions), making it a co-decision with element selection and placement.
- **Interacts with** [[cognitive-load-bounded-display]] — semantic zoom controls detail per element; the cognitive load bound controls the number of elements. Together they define a two-dimensional adaptation surface: fewer elements × lower detail under high load, more elements × higher detail under low load.

## Practical implementations

- **Google Maps** — zooming in reveals street names, building outlines, business names. Zooming out shows city labels and major roads. Different representations at each level, not just smaller versions of the same map.
- **Obsidian canvas** — cards show varying detail based on zoom, though this is mostly truncation rather than true semantic compression.
- **macOS Finder icon view** — file previews become more detailed as icons get larger. At small sizes you see a file type icon; at larger sizes you see a thumbnail of the actual content.
- **Treemaps** (e.g. WinDirStat, Disk Inventory X) — labels appear and disappear based on available rectangle size, and nested levels become visible as you zoom in.
- **Figma** — component instances show different detail levels at different zoom levels (hiding internal layers when zoomed far out).

## Relevance to project

Two applications to the generative UI pipeline:

**1. Generated UI components with built-in zoom semantics.** Instead of rendering each component at a single fixed granularity, the specification could include multiple representation tiers. A "hotel card" component might have three configs: keyword (name + price badge), summary (name + price + rating + one-line AI summary), full (all attributes). The view configuration would specify which tier to render based on context — a grid overview shows keyword tier, a list shows summary tier, a detail pane shows full tier. This is richer than just responsive breakpoints because the content itself changes, not just the layout.

**2. Navigating the pipeline's own abstractions.** The model hierarchy (Task → Dialog → Presentation → Layout) could be presented using semantic zoom: zoom out to see the task-level description ("hotel search with comparison"), zoom in to see dialog-level sequencing, zoom further to see presentation-level component assignments. This makes the pipeline's internal structure inspectable without overwhelming users with detail they don't need.

For Meridian's attribute configuration: each attribute could define not just one display type but a *zoom-dependent set* of display types. A `reviews` attribute might be: keywords → "Positive" badge, summary → "Mostly positive, guests praise location" text, full → complete review list. The zoom level selects which representation to render.

## Open threads

- **Pre-computation vs. on-demand**: Sensecape pre-computes all three tiers at node creation. For a generative UI system with many components and data items, this multiplies the LLM calls by 3×. On-demand generation would reduce upfront cost but introduce latency during zoom. A hybrid approach (pre-compute summary, generate keywords on demand) might work. Caching strategies become important.
- **Continuous vs. discrete tiers**: Sensecape uses three discrete levels. A more fluid implementation might have a continuous compression parameter ("render this at 30% detail") — but this requires per-zoom-level LLM calls, which defeats the pre-computation strategy. Discrete tiers that crossfade seem like the practical sweet spot.
- **User-defined tiers**: Could users define what "zoomed out" means for specific content? "When I zoom out, show me price and rating only" vs. "When I zoom out, show me the AI summary." This connects semantic zoom to [[fluid-attributes]] — the zoom tiers become another dimension of attribute configuration.
- **Zoom scope**: In Sensecape, zoom is global (the whole canvas zooms together). In a generated UI, zoom could be scoped to a specific panel or component subtree. The overview panel might stay at keyword density while the detail panel stays at full density. This is just the overview+detail pattern reimagined as zoom-level differentiation.
