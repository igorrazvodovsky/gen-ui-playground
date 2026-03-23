---
type: concept
tags: [adaptation, user-context, specification]
sources: ["sources/real-time-context-aware-IUI"]
created: 2026-03-06
---
The number of simultaneously displayed UI elements should be hard-capped based on cognitive science, and that cap should vary with user state. Miller's law (7±2 items in working memory) sets the baseline, but stress, cognitive load, and task complexity reduce the effective capacity. In high-stress conditions, the cap drops to ~5; in calm conditions, it can go up to ~9. Exceeding this cap doesn't just clutter the screen — it actively degrades the user's ability to perceive, comprehend, and act on the displayed information.

## Context

Stefanidi et al. (IEEE Access 2022) operationalise this in their AR law enforcement system through the "visualisation constraint" — a hard upper bound N on the total number of Component Instances displayed simultaneously. N is set by an IF-THEN rule that reads the user's stress level from the ontology model:

- Low Stress → N = 9 (upper bound of Miller's range)
- High Stress → N = 5 (lower bound, accounting for reduced capacity under stress)

This isn't a soft guideline or a design heuristic — it's a hard constraint in the optimisation problem. The solver physically cannot display more than N elements, regardless of how many high-scoring candidates exist. If there are 15 information elements and N = 5, the optimiser must select the 5 that maximise total SA value.

The concept draws from Endsley's work on "SA demons" — factors that actively impair situational awareness. Information overload is a primary SA demon: more information than working memory can process leads to attentional tunnelling (fixating on one element, missing others), increased stress, and degraded decision quality. The bound isn't about screen real estate — it's about *cognitive real estate*.

The interaction with level of detail adds nuance. Under the N cap, the system can still modulate how much each element communicates. High stress → fewer elements, each at low LoD (icons only). Low stress → more elements, each potentially at high LoD (full text). The total information throughput adapts across both dimensions: *number of elements* × *detail per element*.

## Connections

- **Implemented via** [[optimisation-based-ui-adaptation]] — the cognitive load bound is one of the three constraint types in the optimiser (alongside uniqueness and collision avoidance). Without the optimisation framework, enforcing the cap while still selecting the *best* N elements would require explicit priority sorting.
- **Extends** [[context-driven adaptation]] — OADAPT's adaptation rules modify UI presentation based on user profile (disabilities, expertise). The cognitive load bound adds a constraint dimension that OADAPT doesn't address: dynamic limits on UI *quantity*, not just quality. Stress-driven N is a real-time adaptation the user profile alone can't predict — it depends on the user's current state, not their persistent traits.
- **Relates to** [[semantic-zoom]] — semantic zoom controls the *granularity* of each displayed element (keywords ↔ summary ↔ full text). The cognitive load bound controls the *number* of displayed elements. Together they form a two-dimensional adaptation surface: horizontal (how many things) × vertical (how detailed each thing). Under high load, the system contracts on both axes: fewer elements, each at lower detail.
- **Supports** [[gentle slope]] — a bounded display is less overwhelming than an unbounded one, especially for novice users. The cap can be personalised: novice users might have a lower default N (progressive disclosure), while experts might tolerate a higher N. This connects the cognitive bound to [[context-driven adaptation]]'s experience-level dimension.
- **Concretised by** [[modality-as-task-container]] — Andru & Saksena (2025) map information density against modality space and task complexity, showing that small modalities (prompt bar, contextual) tolerate low information density while large modalities (canvas, full-screen) tolerate high density. Mismatches (verbose AI reasoning in a contextual tooltip) erode trust. This is the cognitive load bound expressed as a modality constraint: each modality has an implicit N determined by its available space and interaction affordances.
- **Tension with** [[fluid-attributes]] — attribute-level customisation lets users add attributes to a view ("show me walkability scores too"). If the user adds enough attributes, they could hit the cognitive bound. The system needs to either enforce the cap (refusing to show a user-added attribute, which violates user agency) or warn the user (which is paternalistic). The right answer probably depends on whether the bound is a hard constraint (safety-critical domains like AR HUDs) or a soft recommendation (general-purpose UIs).
- **Relates to** [[intent-aware-simplification]] — NeuroSync's approach to managing complexity (collapse branches irrelevant to current intent) is a different mechanism for the same goal: keeping the displayed information within cognitive capacity. Intent-aware simplification is content-driven (hide what's irrelevant); the cognitive load bound is capacity-driven (hide the least important, regardless of relevance).
- **Fed by** [[work-context-model]] — the situation dimension (runtime context, not goal-level) determines the information density budget. High cognitive load situations → fewer elements, higher salience

## Practical implementations

- **Progressive disclosure** (Don Norman, Jakob Nielsen) — the design pattern version: show only essential options initially, reveal more on demand. The cognitive load bound formalises *why* progressive disclosure works (working memory limits) and adds context-sensitivity (the threshold changes with user state).
- **Notification systems** (iOS, Android) — group and limit simultaneous notifications to prevent overwhelm. iOS's notification summary is a form of cognitively-bounded display. "Do Not Disturb" is the extreme: N = 0.
- **Dashboard design** (Stephen Few's "Information Dashboard Design") — the rule of thumb that a dashboard should have 5–9 key metrics visible at once, with detail on demand. Same Miller's law grounding.
- **Cockpit design** (aviation human factors) — primary flight instruments are limited to ~6 core indicators (airspeed, altitude, heading, attitude, vertical speed, turn coordinator). Secondary instruments are hidden under normal flight and surface when relevant. The cognitive bound is literally safety-critical.
- **Card/kanban limits** (Trello, Jira) — WIP limits in kanban constrain the number of simultaneously active items for the same cognitive reason: more than 5–7 active tasks degrade attention quality.

## Relevance to project

For the generative UI pipeline, the cognitive load bound addresses a problem that emerges the moment the LLM generates complex UIs: information overload. If the user says "build me a project management dashboard" and the LLM faithfully generates panels for tasks, team members, timelines, budgets, milestones, risks, documents, and communications — that's 8+ distinct information regions. For a novice user or a stressed user, that's too many.

**Pipeline integration points:**

1. **Generation-time cap**: Include the cognitive load bound as a constraint in spec generation. "Generate a dashboard with at most 7 primary views; additional views should be accessible but not simultaneously visible." This constrains the LLM's output complexity.

2. **Adaptation-time cap**: After generation, apply the bound as a post-processing constraint. All views exist in the spec, but the rendered UI displays only the top N (by relevance to current task), with the rest accessible via navigation. Context changes (user switches task, screen size changes) can re-select which N to display.

3. **User-adjustable cap**: Let users explicitly control their information density preference. Some users want a dense, 9-panel dashboard; others want a focused, 3-panel view. This is a [[context-driven adaptation]] parameter (information density preference) with a cognitive science floor.

The stress-dependent version is particularly relevant for high-stakes domains (healthcare, operations, finance) where the pipeline generates UIs used under varying cognitive load. In calm analysis mode, show the full dashboard; in crisis response mode, automatically pare down to essentials. This connects to [[adaptive-autonomy]] — the system takes more initiative in managing information load when it detects the user is under stress.

## Open threads

- How to detect user stress in a general web application? Stefanidi et al. use DNNs on physiological signals (possible with wearables, impractical for most web UIs). Interaction tempo (faster, more erratic clicks) might proxy for cognitive load. Or the user could self-report ("I'm in a rush" → lower N).
- Should the bound be per-view (each tab/panel shows at most N elements) or global (the total across all visible panels)? For AR HUDs, it's global (one shared visual field). For web UIs with spatial separation (sidebar + main + detail), per-region bounds might make more sense.
- What's the right N for different UI types? Miller's 7±2 applies to working memory for discrete items, but a well-designed dashboard might support more items through spatial grouping and visual hierarchy. The bound might need to be *effective complexity* (number of distinct information sources demanding attention) rather than raw element count.
- How does the bound interact with [[overview-detail-pattern]]? The overview panel might have its own bound (show at most N summary cards); the detail panel is uncapped (the user has chosen to focus on this one thing). This suggests per-region bounds with different values.
