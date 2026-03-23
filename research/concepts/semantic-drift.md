---
type: concept
tags: [generative-ui, model-evolution, user-agency]
sources: [sources/semantic-guidance-park]
created: 2026-02-20
---
In iterative generative UI workflows, each refinement cycle compounds uncertainty rather than reducing it. The user's imperfect understanding of the generated output (evaluation gulf) leads to imprecise modification requests (execution gulf), which produce even less predictable results — a vicious cycle where design coherence degrades over time. Park et al. call this the "amplification problem." Practically, it manifests as: minor prompt changes causing disproportionate visual changes, successive modifications pulling the design away from original intent, and competing directives accumulating without resolution.

## Context

The problem is specific to generative systems where the AI makes many implicit decisions per iteration. In traditional design tools, edits are direct and local — changing a button colour doesn't accidentally change the header layout. In chat-based AI generation, modifying one aspect often triggers unrelated changes because the model re-interprets the entire context. Five of 14 study participants explicitly described "ripple effect" failures where targeted requests caused unrelated changes. Multiple participants abandoned iterative refinement entirely, concluding that starting over was more efficient than fixing degraded designs.

## Connections

- Motivates [[semantic-intermediate-layer]] — the primary solution Park et al. propose. By making the semantic structure explicit and persistent, edits can be scoped to specific semantic nodes rather than expressed as free-text modifications.
- Motivates [[scoped-semantic-editing]] — the direct mechanism for preventing drift. Semantic diffs explicitly specify what changed, and the generated code serves as structural anchor.
- Contrasts with [[accretive-extensibility]] — Varv's approach to evolution (layer modifications, never edit) is an alternative prevention strategy. Where Park et al. scope edits via semantic structure, Varv scopes them via overlay isolation. Both prevent unintended side effects; they work at different levels (semantic intent vs. specification structure).
- Relates to [[pattern-driven transformation]] — in a pattern-based pipeline, drift could be detected structurally: if a user's edit breaks the relationship between an instantiated task pattern and its downstream presentation patterns, the system can flag the inconsistency.
- Connects to [[UI composition]] — drift is especially dangerous in multi-component interfaces where semantic changes in one component should cascade to coordinated components but not to independent ones.
- Informs [[model hierarchy]] — each level of the hierarchy is a potential drift containment boundary. A change at the Presentation level shouldn't cascade up to the Task level.

## Practical implementations

Chat-based code generation tools (v0, Cursor, Lovable) all exhibit this problem — users report "the AI changed something I didn't ask it to change" as a top frustration. Park et al.'s semantic diff approach is a specific implementation. Other mitigation strategies in practice: version control with diff visibility (Git for code), "locked" regions in collaborative editors (Google Docs suggestions mode), and undo/redo stacks. In LLM-based systems, techniques like "anchoring" (providing previous output as reference) and "diff-based prompting" (specifying only what to change) are informal versions of scoped editing.

## Relevance to project

Drift is the core threat to the feedback loop in the genUI pipeline. The target architecture assumes: generate → render → user modifies → model updates → re-render. If each cycle degrades coherence, the loop doesn't converge — it diverges. The pipeline needs drift prevention at multiple levels:

1. **Semantic level** — explicit semantic structure (Park et al.) so modifications are scoped
2. **Spec level** — accretive overlays (Varv/Meridian) so base specs aren't destroyed
3. **Pattern level** — pattern integrity checks so structural relationships are maintained
4. **Data level** — A2UI's data/component separation so data changes don't trigger layout changes

## Open threads

- How much drift is acceptable? Some drift might actually be beneficial — the AI "improving" unstated aspects. The challenge is distinguishing helpful inference from harmful drift.
- Can drift be detected automatically? If the system tracks semantic relationships, it could flag when a regeneration changed semantics that weren't in the modification request.
- Does drift scale with prompt complexity? More semantic slots = more relationships = more potential for cascading changes?
- IntentFlow's [[intent-decomposition]] addresses drift through the management phase: intents and dimensions are a persistent structured object, not scattered across conversation history. Modifications are targeted dimension adjustments rather than full re-prompts, and [[intent-output-traceability]] lets users detect when output-intent correspondence shifts between iterations. This is drift prevention at the intent level, complementing Park et al.'s prevention at the design level.
