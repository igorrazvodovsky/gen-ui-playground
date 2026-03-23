---
type: concept
tags: [user-agency, generative-ui]
sources: [sources/lit-malleable-software]
created: 2026-02-06
---
# Gentle slope from user to creator

Each incremental increase in tailoring power should require only a small incremental investment of learning and skill (MacLean et al., 1990). A system following this rule has no "cliffs" — no points where the user suddenly needs to learn an entirely new paradigm to get slightly more control.

## Context

The dominant model has a binary: you're either a user (settings, maybe plugins) or a developer (full code). The gap between these is a cliff most people never cross. Spreadsheets, HyperCard, and Flash succeeded partly because they offered a smooth gradient — view → edit values → tweak formulas → write scripts.

Two strategies for smoothing the slope: (1) start from full programming and make it more approachable (friendlier syntax, live environments, AI assistance), or (2) start from direct manipulation and gradually layer on programmability. The second strategy is underappreciated and produces systems like spreadsheets — "a media editor with optional programmability."

## Connections

- Supports [[in-place toolchain]] — the slope is gentler when the editing tools are right there in the usage environment, no context-switch required
- Directly relevant to [[UI composition]] — if users can't rearrange/recombine UI components without code, that's a cliff
- **Implemented by** [[model hierarchy]] — the four layers (task/dialog/presentation/layout) create intervention points at increasing levels of detail. Each layer is a step on the slope.
- **Enabled by** [[pattern]] — if users can modify pattern variables without touching specs, that's a gentler step than editing JSON
- **Constrained by** [[guardrailed generative UI]] — guardrails create a plateau (safe zone) but can also create cliffs at the boundaries
- **Smoothed by** [[context-driven adaptation]] — adaptation based on experience level can flatten the slope. Novice users see a simpler UI with progressive disclosure; as they gain experience, the system reveals more surfaces. The slope adjusts to the user rather than being fixed.
- **Gap filled by** [[fluid-attributes]] — Min et al. (2025) identify a missing step between "tweak values" and "swap patterns": customising which data attributes appear and how they're formatted. This operates in the user's natural vocabulary (data they care about) rather than implementation vocabulary (components, patterns). See [[fluid-attributes]].
- **Scaffolded by** [[semantic-intermediate-layer]] — Park et al. (CHI '26) show that an explicit semantic layer creates natural intervention points at different granularities. Users can edit a single component property (low slope), modify a feature's information architecture (medium slope), or change the product goal (high slope). The [[hierarchical-design-semantics]] framework organises these intervention points into four levels. Crucially, the relationship analysis shows users *what will cascade* from each edit — previewing the cost of climbing higher on the slope. Participants described this as lowering effort through "chunking" (content, function, components, style) and "next-step signalling" (warnings and recommendations).
- **Extended downward by** [[intent-decomposition]] — Kim et al. (CHI 2025) add an intervention point *below* semantic specification: adjusting typed intent dimensions (Likert scales, sliders, hashtags). This requires zero technical understanding — just an opinion about what you want. Sits between "just prompting" and "editing semantic slots" on the slope. The full slope now extends: view → correct user model → **adjust intent dimensions** → tweak values → customise attributes → edit semantic specification → swap patterns → edit specs → edit models.
- **Enriched by** [[prompt-as-interface-object]] — Henry Riche et al. (CHI '25) add direct manipulation of reified intent objects (Fragments, Lenses, Brushes) as a new interaction modality on the slope. Sits alongside intent dimensions but uses drag-and-drop, lock/vary, and spatial scoping instead of sliders and Likert scales. Also adds spatial scoping (Lenses) as a refinement mechanism between "adjust dimensions" and "edit semantic specification."
- **Smoothed by** [[graduated-ambiguity-tolerance]] — Gmeiner et al. (CHI '25) show that accepting intent at any precision level removes precision barriers at every rung. Users don't need to know the exact term or value — "Dark and Moody" is valid alongside "#FF33CC". This prevents the slope from having invisible precision cliffs where the system suddenly demands specificity.
- **Enriched by** [[intent-tag-as-micro-prompt]] — intent tags add a canvas-based, freeform rung between "just prompting" and "editing semantic specifications." Users assemble atomic [label: value] pairs spatially, with the option to start vague and refine. Combined with [[meta-intent-elicitation]], the system helps users populate the slope as they climb it.
- **Given a generation-timeline axis by** [[generation-layer-as-customisation-surface]] — Min et al. (2026) add a horizontal navigation axis orthogonal to the vertical abstraction slope. Instead of climbing from "view" to "edit specs," users rewind through the generation timeline to access different customisation dimensions (categories, layout, content, style). Each layer operates in a different vocabulary and at a different abstraction level, but presents as a partial UI rather than an abstract representation — making the slope walkable without technical understanding of the pipeline.
- **Given a temporal dimension by** [[staged-co-generation]] — DuetUI's six-stage model (Define → Empathise → Plan → Explore → Refine → Duet) adds a temporal gentle slope alongside the spatial one. Users don't need to specify everything upfront; the system progressively elicits more detail across stages. Combined with [[adaptive-autonomy]], the *default position* on the slope shifts over time — new users start agent-guided, experienced users start user-driven.
- **Extended to zero-knowledge entry by** [[grounding-by-example]] — "like this" requires no articulation at all, just recognition. Pointing at an example is potentially the lowest-effort rung on the slope — even below adjusting intent dimensions, which requires opinions. Grounding only requires noticing something you like.
- **Navigated via** [[semantic-zoom]] — Min, Palani & Xia (CHI 2024) show that zoom level can control the abstraction level of rendered content (full text ↔ summary ↔ keywords). This is the lowest-effort navigation mechanism on the slope — the user controls cognitive density through a gesture (pinch/scroll) they already know, with no understanding of underlying structure. In the pipeline, this could apply both to generated UI content (component detail level) and to the pipeline's own intermediate representations (zooming through Task → Dialog → Presentation → Layout views).

## Practical implementations

- **Spreadsheets**: Values → formulas → macros → VBA — each step adds power, small learning delta
- **Notion**: View content → edit values → create databases → formulas/relations → API
- **Figma**: View designs → move elements → create components → variants → plugins
- **Webflow**: Edit content → adjust styles → responsive design → interactions → custom code
- **Retool**: Drag components → bind data → write queries → JavaScript → custom components

- **Extended by** [[inferred-user-model]] — Viégas & Wattenberg (2023) identify an intervention point *below* even value tweaking: correcting the system's assumptions about the user. "You think I'm a novice — I'm not" requires no understanding of specs or patterns, just self-knowledge. This extends the slope downward: view → correct user model → tweak values → customise attributes → swap patterns → edit specs → edit models. Surfaced via [[parallel-state-display]].

## Relevance to project

For generative UI: the generated interface should itself be a gentle slope. Users should be able to view it, tweak values, rearrange components, modify the specification, and (at the top of the slope) edit the data model — all within the same environment, with each step requiring only a little more understanding. This is exactly what JELLY's "inspect" tool attempts: letting users see and edit the underlying model without leaving the UI.

For json-render: the component mapping layer should expose enough structure that modifications don't require dropping into raw code. Can a user change which component renders a data type without writing JSON by hand?

**Slope design with patterns**: The [[model hierarchy]] suggests natural intervention points:
1. **View** — see the generated UI (no learning needed)
2. **Tweak values** — modify pattern variables (understand parameters)
3. **Customise attributes** — add/remove/reformat data attributes via [[fluid-attributes]] (understand the data)
4. **Swap patterns** — replace Search pattern with Browse pattern (understand pattern library)
5. **Edit specs** — modify json-render specs directly (understand spec format)
6. **Edit models** — modify task/data models (understand model semantics)

- **Smoothed by** [[accretive-extensibility]] — Varv shows that if modification is purely additive (layering new definitions on top), the learning curve flattens. Users don't need to understand the whole system to make a change — they just need to write a small concept definition file. The original system is always recoverable by removing the extension.
- **Supported by** [[software-as-data-structure]] — when the program is data, generic inspection tools (data inspector, view inspector) can show users exactly what's happening without requiring them to read code. This makes the middle steps of the slope (understanding what to modify) more accessible.

- **Navigated via** [[intent-aware-simplification]] — Zhang et al. (UIST '25) show that complex representations can be simplified relative to the user's current intent focus. This is itself a gentle-slope mechanism: the user sees a manageable view that can be progressively expanded. No need to face the full complexity cliff; no risk of oversimplification hiding relevant structure.
- **Demonstrated by** [[externalised-LLM-understanding]] — NeuroSync's two editing modalities (graph-level NL commands + node-level direct manipulation) embody the gentle slope in a single interface. Users who can't parse the graph structure can type a natural language modification; users who understand the graph can drag nodes directly. Same system, two slopes depending on skill level.

- **Empirically validated by** Pareek et al. (CHI '26) — a qualitative study of multi-agent LLM interfaces found that 8 of 12 participants explicitly wanted collapsible, on-demand reasoning: start with a simplified output, expand to see agent rationales or debates only when needed. Participants described wanting "the consensus answer up at the top [...] and if I have doubts or want to check the conversation, I can expand it if needed." This directly validates progressive disclosure as the right interaction model for the slope — the default resting position should be low on the slope (view the output), with expansion paths available at every level. The paper also found the preferred resting position shifts by task complexity: simple fact-lookup tasks → opaque final answer was sufficient; complex reasoning tasks → users wanted rationales and critique visible by default. This suggests the slope's *default expansion level* should be task-adaptive, not fixed.

- **Navigated via interaction paradigm selection** — [[paradigm-graph-as-design-language]] (Shen et al., CHI '26) adds a new dimension to the slope: the *type of interaction paradigm* the user engages with, not just the level of the pipeline they operate at. At the bottom of the slope, the user is in a P5 paradigm (AI suggests prompt refinements — minimal user effort). Moving up, they shift to P1 (interactive prompt enhancement — editing text), then P7/P8 (manipulating generated controls — structured precision), then P4/P12 (artifact-grounded interaction — direct manipulation of the output). The paradigm graph gets structurally richer as the user climbs. This suggests the pipeline should support graceful transitions between paradigm types, not just between abstraction levels. See [[prompt-interaction-synergy]].

## Open threads

- What does each "step" on the slope look like concretely for a generative UI system? JELLY has NL prompts → direct manipulation → inspect tool. Is there a smoother gradient? **Varv suggests**: view UI → edit property values in inspector → add new concept definition file (accretive) → use block editor to build actions visually → edit JSON/YAML directly. This is 5 steps, each a small increment.
- How does AI assistance change the slope? It can flatten the top (making code-level changes easier) but doesn't necessarily help with the middle steps.
- Can the LLM generate extension overlays instead of full regeneration? "Add filtering to this list" → LLM produces a small overlay concept definition, leaving the existing spec untouched. This is accretive extension via AI.
