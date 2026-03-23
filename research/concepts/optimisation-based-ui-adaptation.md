---
type: concept
tags: [adaptation, specification, generative-ui]
sources: ["sources/real-time-context-aware-IUI"]
created: 2026-03-06
---
UI adaptation framed as a combinatorial optimisation problem rather than a chain of independent rules. Instead of separately deciding what to show, then how to show it, then where to place it, the system solves all three jointly — because they're interdependent. A component might not be displayed because its preferred position is occupied by something more important. A component might be shown at a lower level of detail because the higher-detail version would overlap with a higher-priority neighbour. Sequential rules can't capture these trade-offs; optimisation can.

## Context

Stefanidi et al. (IEEE Access 2022) deploy this for an AR law enforcement HUD, but the principle is general-purpose. The architecture has three layers:

1. **Scoring** — an ontology reasoner (SWRL rules over OWL) computes a continuous "SA score" for each candidate component, reflecting how appropriate it is *for the current context*. The score depends on the component's type (task-dependent priority), its level of detail (context-dependent appropriateness), and the user's state (stress, expertise, environment). This produces a gradient of preferences, not binary show/hide decisions.

2. **Optimisation** — an integer linear program (0-1 knapsack variant) maximises total component value subject to constraints: uniqueness (each information element displayed at most once), visualisation cap (total displayed ≤ N, where N varies with stress — see [[cognitive-load-bounded-display]]), and collision avoidance (no overlapping positions on the display grid). Solved via Gurobi at ~0.02s per frame.

3. **Stabilisation** — position priority values favour the previous frame's layout, preventing oscillation between equally-optimal solutions across frames. This is a form of temporal consistency that rule-based systems struggle with.

The key difference from rule-based adaptation ([[context-driven adaptation]]): rules produce a single deterministic output for each context state. Optimisation produces the *best feasible* output given all constraints simultaneously, handling trade-offs that rules can't express. When the display is crowded, the optimiser might choose to show a lower-LoD version of a high-priority component rather than omitting a medium-priority one — a nuanced trade-off that would require an explosion of special-case rules.

The ontology-derived parameters are the other significant contribution. Traditional CO for UIs (Oulasvirta, SUPPLE) hardcodes the objective function coefficients. Here, the coefficients are reasoned at runtime from the context model. This means the same optimiser adapts to different users, tasks, and environments without reconfiguration — the ontology does the reconfiguration.

## Connections

- **Alternative to** [[context-driven adaptation]] — OADAPT uses a rule chain (context → adaptation modes → UI modifications). This approach replaces the rule chain with a solver that considers all constraints simultaneously. Rules are still used upstream (SWRL rules compute SA scores), but the final adaptation decision is optimisation, not rule application. The two aren't exclusive — rules could produce candidate modifications, with optimisation resolving conflicts.
- **Extends** [[constraint-driven component selection]] — ontology-driven constraint rules handle leaf-level component mapping (type → widget). Optimisation-based adaptation extends this to handle selection *among* components (which of these 15 candidates should I display, and at what LoD?) and layout (where should each go?). Constraint-driven selection answers "what widget for this field"; optimisation answers "which fields should be visible at all."
- **Instance of** [[programmable-router]] — the scoring + optimisation pipeline is itself a form of programmatic routing. The ontology reasoner (deterministic rules) handles the scoring; the optimiser (algorithm) handles the selection and layout. No LLM is involved. This is a fully deterministic adaptation path — exactly the kind of "fast path" the programmable router pattern advocates for known adaptation types.
- **Relates to** [[configuration-model-as-design-space]] — Kumbang's insight was that a product model defines a space of valid configurations, not a single product. The optimiser navigates a similar space: all feasible combinations of (component, LoD, position) that satisfy the constraints. The "current best UI" is a point in this space, and context changes move the system to a different point. Unlike Kumbang's user-navigated space, here the system navigates automatically.
- **Enables** [[cognitive-load-bounded-display]] — the visualisation constraint (display ≤ N elements) is a hard constraint in the optimiser. Without an optimisation framework, enforcing this cap while still showing the *most important* N elements requires explicit priority ranking — which is what the SA scoring provides.
- **Relates to** [[content-structure-adaptation-split]] — Jerry et al. split adaptation into structural (deterministic) and content (LLM). Optimisation-based adaptation is entirely structural — it decides what to show and where, not what the content says. Content adaptation (simplification, reformulation) would still need the LLM path. The two are complementary layers.

## Practical implementations

- **SUPPLE / SUPPLE++** (Gajos & Weld, 2004–2008) — the pioneer: optimisation-based UI generation adapted to motor/vision capabilities. Uses decision-theoretic cost model. Stefanidi et al. extend this with runtime ontology reasoning for dynamic parameters.
- **Ad placement algorithms** — advertising systems solve a similar optimisation: maximise total value of displayed ads, subject to position constraints, no overlap, and user relevance scoring. Google Ads, Meta's ad auction — all combinatorial optimisation over scored candidates with placement constraints.
- **Recommendation system UIs** — Netflix, Spotify homepages are solutions to a placement optimisation problem: which content to show in which row/position to maximise engagement, subject to diversity constraints.
- **Dashboard layout engines** — tools like Grafana, Kibana auto-arrange panels to avoid overlap while maximising information density. Simpler than full optimisation but the same structural problem.
- **Window managers** (tiling WMs like i3, Sway) — solve a simplified version: given N windows, assign positions and sizes to maximise visibility subject to no-overlap. No scoring, but the constraint structure is identical.

## Relevance to project

Two potential roles in the generative UI pipeline:

**1. Adaptation layer for generated specs.** After the LLM produces a UI specification, an optimiser could adapt the layout and component visibility for the specific user's context. Instead of showing all 12 attributes of a hotel listing, the optimiser selects the 7 most relevant given the user's stated preferences, screen size, and task (browsing vs. booking). This is more principled than truncation rules and handles the interaction between selection and layout that responsive design struggles with.

**2. Real-time re-adaptation.** When the context changes (user moves from desktop to mobile, switches from exploration to focused comparison), the optimiser can re-solve with updated scores and constraints, producing a new layout without regeneration from scratch. The base spec stays the same; only the selection and layout change. This is cheaper than re-prompting the LLM and more predictable than asking it to "adapt for mobile."

The SA scoring mechanism is particularly relevant. Instead of asking the LLM "which fields are important for this user?", the system could use lightweight rules or a small scoring model to assign relevance scores to each attribute, then let the optimiser handle the rest. This separates the "judgement" step (scoring, which could use LLM or rules) from the "arrangement" step (optimisation, which should be deterministic).

**Caveat:** The knapsack formulation works well for discrete, independent elements (AR annotations, dashboard panels) but gets harder with structured UIs where components have hierarchical relationships. A hotel search UI with filters, results list, and detail pane can't just have any subset displayed — the relationships between components constrain what combinations make sense. The optimiser would need structural constraints beyond collision avoidance. This is where [[pattern composition]] and [[feature-component-duality]] provide the constraint vocabulary.

## Open threads

- Can optimisation-based adaptation work with the nested component tree structure of json-render specs, or does it need a flat component space? The AR HUD use case has flat, independent elements — real UIs have trees.
- How to define the scoring function for a general generative UI system? The SA score works for situational awareness but the equivalent for "how useful is this attribute in this context" is harder to specify. Could user interaction history ([[usage-as-annotation]]) train a scoring model?
- What's the latency budget? Stefanidi et al. achieve ~0.02s on a gaming PC. A web-based generative UI needs to stay under ~100ms for layout re-optimisation to feel instant.
- Could the optimiser handle [[accretive-extensibility]] — treating user overlays as additional constraints ("this attribute must be visible regardless of score")?
