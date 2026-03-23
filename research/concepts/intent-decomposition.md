---
type: concept
tags: [intent, specification, user-agency, generative-ui, json-render]
sources: [sources/intentflow]
created: 2026-02-20
updated: 2026-03-11
---
Breaking a user's unstructured prompt into a three-level hierarchy: **Goal** (task type, domain, topic — the strategic "what"), **Intents** (specific requirements and preferences — the tactical "how"), and **Intent Dimensions** (parameterised, typed controls — the operational "how much"). The decomposition includes both explicit intents (stated by the user) and implicit intents (logically required by the task but unstated). This structure replaces the single text box with a manipulable intent model the user can inspect and adjust before generation.

Critically, dimensions aren't just data — they're **reified as typed UI controls** matched to their value semantics: ordinal qualities get Likert scales ("formal ← → casual"), continuous ranges get sliders ("length: 200–2000 words"), categorical choices get hashtag selectors or dropdowns. The user steers generation by adjusting these controls directly, replacing the lossy cycle of re-prompting with precise parameter manipulation.

## Context

Kim et al. (CHI 2025) identified four phases of intent communication that chat interfaces collapse into one: articulation (structuring what you want), exploration (discovering what's possible), management (tracking accumulated preferences across turns), and synchronisation (keeping intent aligned with output as both evolve). Each phase fails in different ways when the only interface is a text prompt — articulation suffers from vagueness, exploration from lack of visibility into the possibility space, management from intent scattering across conversation history, and synchronisation from [[semantic-drift]]. Intent decomposition addresses all four by externalising intent as a persistent, structured object rather than leaving it implicit in conversation context.

The implicit intent extraction is particularly interesting: the LLM doesn't just parse what the user said, it infers what the task logically requires. "Write a blog post about AI" implicitly requires intents around audience, tone, depth, structure, and examples — things the user didn't mention but will care about when they see the output. Making these visible *before* generation lets the user correct wrong assumptions upfront rather than discovering them in a disappointing result.

**Dimensions as controls** is what makes the decomposition actionable rather than merely informative. The control type assignment uses a simple heuristic: if values are ordinal and the range is small (3–7 points), use Likert; if values are continuous, use a slider; if values are categorical with multiple valid selections, use hashtags; if values are categorical with single selection, use a dropdown. The LLM proposes the control type alongside the dimension definition — a form of meta-generation where the system generates its own specification UI.

## Connections

- **Parallel to** [[hierarchical-design-semantics]] — Park et al.'s hierarchy (Product → Design System → Feature → Component) decomposes *design specification*; IntentFlow's hierarchy (Goal → Intents → Dimensions) decomposes *task intent*. They operate at different pipeline stages and are complementary: IntentFlow structures what the user wants to accomplish; Park et al. structures how it should look and feel. The two could combine: each semantic slot gets a dimension-style typed control, making the semantic layer interactive rather than just a form.
- **Addresses** [[structured vs unstructured tension]] — intent decomposition is a concrete bridge mechanism. The user starts unstructured (natural language prompt); the LLM produces structured output (typed dimensions with values); the user edits the structured version. Progressive structuring, not forced structure.
- **Prevents** [[semantic-drift]] — by externalising intent as a persistent object, modifications are targeted adjustments to specific dimensions rather than full re-prompts. The management phase explicitly tracks intent evolution across iterations.
- **Extends** [[semantic-intermediate-layer]] — IntentFlow adds an intent-level intermediate layer *upstream* of Park et al.'s design-level intermediate layer. Together they form a two-layer mediation: intent layer (what to accomplish) → design layer (how it should look) → generated output. The semantic layer becomes not just inspectable but *directly manipulable* through typed controls.
- **Informs** [[gentle slope]] — intent dimensions are among the gentlest possible intervention points. Adjusting a Likert scale from 3 to 5 requires zero technical understanding — just an opinion. This sits below even value editing in the slope hierarchy, because you're not editing the output, you're adjusting the generation parameters.
- **Relates to** [[context-driven adaptation]] — implicit intents function similarly to user context: properties the system needs to know but the user hasn't stated. OADAPT declares context explicitly (user profile); IntentFlow extracts it from the task. Both fill in the unspecified.
- **Contrasts with** [[pattern-driven transformation]] — patterns encode *design knowledge* (which UI structures work for which tasks). Intent decomposition encodes *user knowledge* (what the user actually wants). The LLM needs both: intent dimensions to know what matters to the user, patterns to know how to implement it.
- **Upstream of** [[task-model]] — intent decomposition is the user-facing mechanism for *constructing* the task model. The Goal level maps to task identification; Intents map to sub-tasks and requirements; Dimensions parameterise them.
- **Complemented by** [[prompt-as-interface-object]] — Henry Riche et al. (CHI '25) implement a different decomposition modality: Fragments parse the prompt into [type, value] attribute cards that are persistent, draggable, lockable, and composable workspace objects. IntentFlow decomposes pre-generation (structured checkpoint); Fragments decompose in-situ (persistent companions alongside output). Same principle, different temporal model.
- **Contrasted with** [[intent-tag-as-micro-prompt]] — Gmeiner et al. (CHI '25) offer a *user-driven* alternative to IntentFlow's *system-driven* decomposition. Instead of the LLM extracting a hierarchy, the user constructs atomic [label: value] tags on a spatial canvas. Both produce structured intent representations, but the authoring direction is inverted: IntentFlow is top-down (system proposes, user reviews); intent tags are bottom-up (user authors, system suggests). The hybrid model (grounding from text prompt → initial tags → user edits) bridges both approaches.
- **Complemented by** [[grounding-by-example]] — intent doesn't have to be decomposed from text. Users can also specify intent by pointing at examples ("like this"). Grounding produces structured attributes from demonstrations rather than verbal descriptions, bypassing the articulation problem entirely.
- **Parallels** [[fluid-attributes]] — both take abstract properties and make them manipulable first-class UI elements. Fluid attributes operate on data presentation (how a price field is displayed); intent dimensions operate on generation parameters (how formal the output should be). Same principle, different pipeline stage. The mapping logic (value type → appropriate widget) is identical to [[constraint-driven component selection]] — let the data shape determine the interaction mechanism.
- **Complemented by** [[externalised-LLM-understanding]] — Zhang et al. (UIST '25) externalise the *LLM's* task decomposition as an editable graph. IntentFlow externalises the *user's* intent as a structured hierarchy. Together they make both sides of the [[bidirectional-ambiguity]] visible: "here's what you want" (intent tree) alongside "here's what I'll build" (understanding graph). The mapping between them reveals misalignment.

## Practical implementations

- **Midjourney's parameter system** — `/imagine [prompt] --ar 16:9 --stylize 750 --chaos 50` decomposes generation intent into typed parameters. IntentFlow automates this extraction rather than requiring the user to know the parameters exist.
- **Spotify's recommendation tuning** — the "enhance" feature lets users adjust energy, danceability, and valence via sliders to tune playlist generation. Each slider is an intent dimension.
- **Notion AI's "tone" and "length" controls** — pre-defined intent dimensions for writing generation. IntentFlow makes these dynamic (extracted from the task) rather than static.
- **Stable Diffusion's ControlNet** — typed controls (edge maps, depth maps, pose references) that steer generation without re-prompting.
- **Google Flights' filter panel** — stops, price range, duration, departure time are all intent dimensions for the flight search task, presented as appropriate control types (sliders for ranges, checkboxes for categories).
- **Parametric design tools** (Grasshopper, OpenSCAD) — expose generation parameters as named, typed controls. Users manipulate parameters; the system regenerates. This is exactly intent-dimensions-as-controls applied to 3D modelling.
- **Figma's component properties** — when you insert a component with exposed properties (boolean toggles, text slots, variant selectors), you're manipulating intent dimensions for that design element.
- **Music production DAWs** — mixer channels decompose audio intent into manipulable dimensions (volume, pan, EQ, effects). Each fader is an intent dimension with a typed control.

## Relevance to project

This maps directly to the genUI pipeline's first touchpoint. The current architecture has: user prompt → semantic parse → task analysis. IntentFlow shows this should be: user prompt → **intent decomposition** (Goal + explicit/implicit Intents + typed Dimensions) → user review/adjustment → semantic specification → pattern-driven generation.

The intent layer sits *above* Park et al.'s semantic layer in the pipeline. The Goal maps to Park's Product level. Intents map to Feature-level functions. Dimensions map to the adjustable parameters within each level. IntentFlow answers a question the pipeline hadn't addressed: how does the user's vague prompt become a structured specification? Not by the LLM guessing in one shot, but by the LLM proposing a structured decomposition the user can correct.

Two implications for the pipeline:

**First, the pipeline's specification UI should use this pattern.** Instead of presenting the [[semantic-intermediate-layer]] as a static form with text fields, each semantic slot should get a control type matched to its value semantics. Park et al.'s "Visual Mood" slot should be a selector or mood board, not a text input. "Typography Scale" should be a slider. "Target User" should be a structured input with age, expertise, and accessibility sub-dimensions.

**Second, the generated UI itself could expose intent dimensions.** The user says "build me a task tracker." The system generates a task board *and* a dimension panel: "complexity (simple ↔ detailed), collaboration (solo ↔ team), views (list ↔ board ↔ timeline)." Adjusting these dimensions triggers targeted regeneration of the relevant spec sections. The dimension panel persists alongside the generated UI as a permanent steering mechanism.

## Open threads

- How does intent decomposition scale to complex, multi-entity tasks? IntentFlow was evaluated on writing tasks (single output). A task like "plan a dinner party" has multiple entities (guests, menu, timeline, venue) each with their own intents. Does the hierarchy need nesting?
- Can intent dimensions be *persistent* across sessions? If a user always wants "formal tone" and "detailed depth," should those become part of a user profile ([[context-driven adaptation]]) rather than being re-extracted each time?
- The LLM's implicit intent extraction scored 4.17/5 for completeness — decent but not exhaustive. What's the failure mode when important implicit intents are missed? Does the user discover them only when the output is wrong?
- How do intent dimensions interact with [[fluid-attributes]]? Both are user-facing manipulation handles. Dimensions steer *generation*; attributes steer *presentation*. Can they share a UI paradigm?
- How many dimensions before the user is overwhelmed? IntentFlow's writing tasks averaged 5–10 dimensions. A complex multi-entity UI task could have dozens. Progressive disclosure (show top dimensions, expand on demand) is the obvious solution, but how do you rank dimension importance?
- Can dimensions be hierarchical? A "visual style" intent could decompose into sub-dimensions (colour temperature, density, animation level). This nests the control surface — useful for experts, potentially confusing for novices.
- How do dimensions interact? Setting "complexity: detailed" might imply "visualisation: rich." IntentFlow doesn't model cross-dimension dependencies. Park et al.'s semantic relationships address this at the design level — could the same approach work at the intent level?
