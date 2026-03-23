---
type: concept
tags: [user-agency, generative-ui, intent]
sources: [sources/neurosync]
created: 2026-03-05
updated: 2026-03-11
---
When a complex representation (graph, tree, specification) grows beyond comfortable comprehension, simplify it *relative to the user's current focus* rather than uniformly. Nodes and branches that map to the user's active intent are preserved in full; everything else collapses into summary supernodes. The result: users see global structure (nothing disappears entirely) with local detail (the relevant part is fully expanded). Complexity is managed without information loss.

## Context

Zhang et al. (UIST '25) developed this for NeuroSync's task understanding graphs (see [[externalised-LLM-understanding]]), which grow unwieldy across multi-turn interactions. The insight is that cognitive load isn't about absolute complexity — it's about *relevance-weighted* complexity. A 50-node graph where 8 nodes matter right now is harder to use than a 12-node graph where 8 are relevant and 4 are collapsed summaries.

### Algorithm

The simplification uses the intent tree (the user's hierarchical goal structure from [[intent-decomposition]]) as the focus filter:

1. **Intent tracking**: A Nondeterministic Finite Automaton tracks which intent nodes have changed in the current interaction turn.
2. **Relevance mapping**: Intent-to-task mappings identify which task graph nodes relate to active intent nodes.
3. **Recursive topological reduction**: Branches of the task graph with no mapping to current intent nodes are collapsed. Each collapsed branch becomes a supernode.
4. **Edge reconstruction**: Edges incident on collapsed nodes are rewired to the supernode, preserving the graph's connectivity.
5. **Reversibility**: Users can click any supernode to re-expand it, making this a reversible focus operation rather than lossy compression.

The algorithm ensures the user always sees the full graph topology (as supernodes maintain structural position) while only expanding detail where it's currently relevant. As the user's intent focus shifts across turns, different branches expand and collapse dynamically.

## Connections

- **Extends** [[semantic-zoom]] — Min, Palani & Xia's semantic zoom adjusts content abstraction level based on *geometric zoom level* (pinch/scroll). Intent-aware simplification adjusts structural complexity based on *semantic relevance* (which parts relate to current intent). Same principle (adaptive detail), different control signal. Could be combined: zoom level controls base detail; intent focus controls which branches expand.
- **Relates to** [[fluid-attributes]] — Meridian lets users choose which attributes to see and how to format them. Intent-aware simplification extends this to structural elements: which *branches* of a task graph or specification to expand. Both are about user-controlled information filtering.
- **Supports** [[gentle slope]] — the simplification creates a navigable middle ground. Users don't face the full complexity cliff or the oversimplification flat. The "click to expand collapsed branch" interaction is itself a gentle-slope pattern.
- **Enables** [[externalised-LLM-understanding]] — the understanding graph only works as a user-facing artefact if its complexity is manageable. Without simplification, the graph becomes as opaque as the code it replaced.
- **Relates to** [[overview-detail-pattern]] — the simplified graph IS an overview+detail interface. The simplified view is the overview; clicking a collapsed supernode reveals the detail. The difference from Meridian: the overview is dynamically computed from intent relevance, not statically designed.
- **Informs** [[parallel-state-display]] — dashboards surfacing system state face the same problem: too much information overwhelms. Intent-aware simplification could apply to pipeline monitoring — full detail for the stage the user is inspecting, collapse the rest.
- **Relates to** [[cognitive-load-bounded-display]] — both manage information quantity, but through different mechanisms. Cognitive load bounding caps the *total* visible elements; intent-aware simplification redistributes detail *within* a budget, putting it where it's most useful.

## Practical implementations

- **IDE code folding** — collapse functions/regions to manage complexity. But folding is manual and positional, not intent-aware.
- **Map applications** (Google Maps, Mapbox) — zoom-dependent detail. Major roads at country zoom, minor streets at neighbourhood zoom. The "intent" is implicit in the zoom level.
- **GitHub's file tree** — auto-collapses large directory trees. Not intent-aware, just size-based.
- **Figma's layer panel** — auto-collapses nested groups. Expanding is manual.
- **Telescopic text** (telescopictext.org) — expand inline summaries to full detail. Closest to the intent-aware model: detail level adapts to user interest expressed through clicks.

## Relevance to project

For the genUI pipeline, intent-aware simplification addresses a scaling problem that will emerge as generated UIs become more complex. A generated interface with 30 components across 5 views produces a large specification tree. If the user wants to modify just the search functionality, they shouldn't have to parse the entire spec.

Concrete application: the pipeline could maintain the full specification tree internally but present a simplified view that expands only the sections relevant to the user's current edit request. "I want to change how search results display" → expand the search-results branch of the spec tree, collapse everything else into labelled summaries.

This also applies to the [[semantic-intermediate-layer]]: Park et al.'s four-level hierarchy (Product → Design System → Feature → Component) could be intent-simplified. If the user is editing colour scheme, expand Design System's visual attributes; collapse Product goals and Component details into summaries.

## Open threads

- What's the right granularity for "intent" in UI generation? NeuroSync tracks intent at the subtask level. For UI generation, intent might be at the feature level or the attribute level. Different granularities need different simplification strategies.
- How does this interact with [[accretive-extensibility]]? If user modifications are overlay layers, the simplification could highlight which parts of the base spec have overlays (user-modified) and which don't (generated defaults). Intent-relevance + modification-status as dual filtering criteria.
- Performance: the NFA-based intent tracking adds overhead. For real-time UI editing with rapid interactions, can intent tracking keep up? Or does it need to be event-driven (simplify on user action) rather than continuous?
- Can the simplification algorithm work with non-graph structures? The pipeline's spec tree, semantic hierarchy, and attribute configuration are all tree-structured, not graph-structured. Topological reduction needs adaptation for trees.
