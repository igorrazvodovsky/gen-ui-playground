---
type: concept
tags: [adaptation, user-context, personalisation]
sources: ["sources/oadapt-ontology-based-UI", "sources/ontology-specification", "sources/llm-driven-accessible-interface", "sources/real-time-context-aware-IUI"]
created: 2026-02-09
updated: 2026-03-11
---
UI generation should be parameterised not just by *what the user wants to do* (task/intent) and *what the domain looks like* (data model), but also by *who the user is* and *where they are*. Context-driven adaptation adds a third input to the pipeline: structured context that influences component selection, layout, interaction modes, and styling — producing different UIs for the same task depending on who's using the system and under what conditions.

Context splits into two fundamentally different sources with different characteristics:

1. **[[user-profile-adaptation]]** — stable, declared characteristics (disabilities, experience level, preferences, language). Fed by user declaration or OS settings. Drives deterministic, auditable rules (30 WCAG-derived rules, 14 adaptation modes). Updated rarely.
2. **[[environment-driven-adaptation]]** — volatile, sensed conditions (luminosity, connectivity, device, noise, cognitive load). Fed by browser APIs and sensors. Drives real-time adaptation. Updated continuously.

## Context

The critical architectural insight (from OADAPT, Freitas & Barcellos): adaptation rules form a *separate layer*, not something embedded in component logic. The reasoning engine takes (user profile + environment + domain model) as inputs and produces adaptation directives that modify the UI spec before or during rendering. This keeps adaptation logic decoupled from both the domain model and the UI components.

Three types of adaptation:
1. **Accessibility adaptations** — driven by disability characteristics. Deterministic, often regulated (WCAG). Handled by [[user-profile-adaptation]].
2. **Experience-level adaptations** — driven by expertise. Novice → progressive disclosure; expert → density and shortcuts. Can be profile-based or inferred.
3. **Environmental adaptations** — driven by runtime conditions. Handled by [[environment-driven-adaptation]].

## Connections

- **Decomposed into** [[user-profile-adaptation]] (stable, declared) and [[environment-driven-adaptation]] (volatile, sensed)
- **Operationalised by** [[content-structure-adaptation-split]] — structural adaptations (contrast, layout) are deterministic rules; content adaptations (simplification, reformulation) use the LLM
- **Extended by** [[normative-grounded-adaptation]] — tracing every adaptation to a specific accessibility standard clause
- **Verified by** [[adaptation-quality-gates]] — automatic quality checks after LLM-driven content adaptations
- **Alternative mechanism in** [[optimisation-based-ui-adaptation]] — replacing sequential rule chains with combinatorial optimisation for interdependent decisions
- **Bounded by** [[cognitive-load-bounded-display]] — dynamic limits on UI quantity based on cognitive state
- **Extended by** [[inferred-user-model]] — what the system *believes* about the user from interaction, as distinct from what's declared
- **Extended by** [[cross-task-user-knowledge]] — dynamic, non-hierarchical preference knowledge that persists across tasks
- **Informs** [[gentle slope]] — adaptation can smooth the slope by presenting complexity appropriate to the user's level
- **Extends** [[constraint-driven component selection]] — domain constraints select *which* component; user context selects *which variant*
- **Informs** [[LLM-operable interface]] — the user profile model is another surface the agent can inspect and reason about
- **Tension with** [[guardrailed generative UI]] — adaptation rules modify the generated UI, potentially outside catalog constraints
- **Complemented by** [[work-context-model]] — OADAPT's user context (disabilities, preferences) is orthogonal to the JTBD-enriched goal structure. OADAPT handles *who* the user is; JTBD-enriched goals handle *what job in what circumstance*. Both feed adaptation from different angles

## Practical implementations

- **OS-level accessibility**: macOS Accessibility, Windows Ease of Access, Android TalkBack
- **CSS `prefers-*` media queries**: `prefers-color-scheme`, `prefers-reduced-motion`, `prefers-contrast`
- **Responsive design**: Viewport width as context → layout adaptations
- **Feature flags / progressive rollout**: User segment → feature set
- **Personalisation engines**: Netflix, Spotify Discover Weekly — behaviour history → content adaptation
- **Enterprise RBAC-driven UIs**: Role → different views per role

## Relevance to project

The pipeline should be:

```
User prompt (intent) + Domain model + User context → UI spec → Rendered UI
```

Where user context includes: accessibility needs, experience level, preferences, device/environment.

For the LLM-driven pipeline, the hybrid approach:
- **Deterministic rules** for accessibility (WCAG compliance — auditable, not LLM guesses). See [[user-profile-adaptation]].
- **LLM context** for softer adaptations (experience level, preferences)
- **Real-time sensing** for environment. See [[environment-driven-adaptation]].

OADAPT's conceptual/operational distinction maps to the architecture: conceptual = pattern library + user profile schema (reusable, application-independent design knowledge); operational = catalog + constraint rules + adaptation rules (machine-readable, runtime).

## Open threads

- Finer-grained conflicts remain: "low vision → larger text" vs. "mobile device → compact layout" isn't addressed by mutual exclusion constraints.
- How do the three sources (declared profile, inferred model, environment) compose when they conflict?
- OADAPT focuses on accessibility. Cognitive/task-level adaptations ("novice → wizard pattern") cross into pattern selection territory.
