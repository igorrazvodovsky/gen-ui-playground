---
title: "Real-Time Adaptation of Context-Aware Intelligent User Interfaces, for Enhanced Situational Awareness"
authors: [Zinovia Stefanidi, George Margetis, Stavroula Ntoa, George Papagiannakis]
year: 2022
venue: "IEEE Access"
type: literature
status: processed
---
## Core idea

UI adaptation framed as a combinatorial optimisation problem solved at runtime. An ontology model captures context (user profile, stress, task, environment, device) and SWRL rules reason over it to produce dynamic scores for each UI component. A solver then jointly decides *what* to display, at *what level of detail*, and *where* to place it — simultaneously, not sequentially — subject to constraints including collision avoidance and a cognitive-load-derived cap on total displayed elements. Deployed as an AR HUD for law enforcement.

## Key concepts

- **[[optimisation-based-ui-adaptation]]** — the core methodological contribution. Adaptation as a 0-1 knapsack variant rather than a rule chain. Joint selection + LoD + layout. Ontology-derived parameters replace hardcoded coefficients.
- **[[cognitive-load-bounded-display]]** — the visualisation constraint. Maximum displayed components varies with user stress (5 under high stress, 9 under low stress), grounded in Miller's law. A hard, context-sensitive cap on UI complexity.
- **Level of Detail (LoD)** — components have 1–3 discrete presentation templates (Low, Mid, High). Higher LoD = richer content but more screen space consumed. Context determines which LoD is appropriate. Connects to [[semantic-zoom]] and [[fluid-attributes]].
- **SA score** — a continuous value ∈ (0, 1) representing a component's appropriateness for display given the current context. Computed via SWRL rules combining Component Type priority (task-dependent) and LoD appropriateness (context-dependent). Used as the objective function coefficient in the optimiser.
- **Component Type / Component / Component Instance** hierarchy — three levels of increasing specificity. Component Types are categories (e.g. "Criminal Activities"), Components are design templates at a specific LoD, Component Instances are instantiated with content and positioned on screen.

## Technical approach

**Architecture:** Decision Maker (DM) with three internal modules + two interface modules:
- *Context module* (input) — extracts user profile, state (stress via DNNs), environment (crowdedness), task, device info
- *Knowledge Base* (input) — provides real-time data as Information Elements (detected objects, identities, alerts)
- *Ontology Model* — OWL 2.0 ontology modelling both context factors and GUI elements. SWRL rules infer SA scores from context.
- *SA Reasoner* — runs SWRL rules (Pellet reasoner via Owlready2) to compute SA scores for each Component given current context
- *UI Optimizer* — solves integer linear program (Gurobi solver) to select components, LoDs, and positions
- *Visualiser* (output) — renders selected Component Instances at assigned positions

**Ontology structure:** Two logical parts: (1) context factors (user profile + stress, activity/task, environment crowdedness, device/HUD specs) and (2) GUI elements (Component Types in three categories: Detection, Annotation, General; Components at specific LoDs; Component Instances with content).

**SWRL rules** in two categories:
1. *Priority rules* — assign task-dependent priority to Component Types (e.g. "Carried Weapons" is higher priority than "Procedural Information" during Incident Resolution)
2. *SA rules* — compute the SA score per Component, combining Component Type priority with LoD appropriateness given context (crowdedness, stress, expertise). Two templates: Low Stress (considers environment + state + expertise) and High Stress (simpler, drops expertise).

**Optimisation formulation:**
- Decision variable: binary x for each (Information Element, Component, Position) triple
- Objective: maximise Σ(SA_score + position_priority) × x
- Constraints: (a) uniqueness — each info element displayed at most once, (b) visualisation — total displayed ≤ N (stress-dependent), (c) collision — no overlapping positions on display grid
- Solved as ILP via Gurobi. ~0.02s per frame on commodity hardware.

**Display grid:** pixels partitioned into tiles (configurable sampling rate). Position priority values add stability (favour previous frame's positions to avoid oscillation).

**Evaluations:**
1. Expert-based (N=10: 5 LEAs + 5 UX experts) — assessed what/how/where decisions across 12 conditions. High scores for low stress; component selection criticised under high stress (too few elements shown). Led to improvements: detections always highlighted, more positions added.
2. User-based (N=20 LEAs, within-subjects, AR simulation) — measured SA (SART + SAGAT), workload (NASA-TLX), UX (UMUX-Lite). Results: perceived SA improved 25.63%, observed SA improved 9.25% overall. System does not impose additional workload. UX positive (5.03–5.05/7). Professional expertise did not affect SA with system — equalising effect across skill levels.

## Extracted concepts

- [[optimisation-based-ui-adaptation]] — new
- [[cognitive-load-bounded-display]] — new
- [[semantic-zoom]] — updated (LoD as discrete implementation)
- [[context-driven adaptation]] — updated (optimisation as alternative to rule chains)
- [[constraint-driven component selection]] — updated (joint selection + layout)
