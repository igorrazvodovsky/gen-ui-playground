---
type: concept
tags: [intent, user-agency, generative-ui, specification]
sources: [sources/intent-tagging]
created: 2026-03-05
---
An intent tag is an atomic [label: value] keyword pair — a graphical micro-prompt — that captures a single aspect of user intent as a persistent, spatial, toggleable object. Rather than writing a full prompt sentence, the user assembles a collection of tags on a 2D canvas. Each tag can be activated/deactivated (toggled in/out of generation), edited inline, explored via drop-down alternatives, or fine-tuned via a continuous opposite slider. The collection of active tags *is* the prompt — but decomposed, visible, and independently adjustable.

## Context

The paper identifies a four-way trade-off between intent elicitation methods (Table 1). GUI wizards offer guidance and manipulation but not open-ended expression. Text prompts offer openness but no guidance or manipulation. Chat dialogues offer guidance but not manipulation or continuous option representation. Intent tags are the first method to score on all four: open prompt format (users type whatever they want as label/value), system guidance (LLM-generated suggestions), GUI-based option manipulation (drop-downs, sliders), and continuous option representation (tags persist as objects, not vanishing into conversation history).

The spatial canvas model is key. Tags aren't in a list or a form — they're positioned in 2D space, grouped into semantic clusters (Narrative, Visual Style, Content Sources). Users developed their own spatial hierarchies and ordering conventions. The canvas becomes a *mood board for generation parameters* — a visible, manipulable externalisation of the user's creative intent.

Two types of tag: **concept tags** (user-authored [label: value] keywords like "Topic: Product Launch" or "Typography: Modern") and **reference tags** (pointers to external content — Word documents, images, other slide decks — that provide grounding material for generation).

## Connections

- **Alternative to** [[intent-decomposition]] — IntentFlow decomposes intent *automatically* (LLM extracts Goal → Intents → Dimensions from a prompt). Intent tags decompose intent *manually* (user creates tags one by one) with optional LLM assistance (suggested tags, grounding from text prompt). The authoring model is fundamentally different: top-down system decomposition vs. bottom-up user construction. Both produce structured intent representations, but the user's relationship to that structure differs — IntentFlow's is presented for review, intent tags' are authored by the user.
- **Alternative to** [[intent-decomposition]] — intent dimensions use typed controls (Likert scales, sliders, hashtags) matched to value semantics. Intent tags use a universal format ([label: value] text fields) with optional exploration via drop-downs and opposite sliders. Dimensions are more precise; tags are more flexible. Dimensions require the system to know the parameter space upfront; tags let users define dimensions the system didn't anticipate.
- **Variant of** [[prompt-as-interface-object]] — intent tags are reified prompts in exactly Henry Riche et al.'s sense: persistent, spatial, manipulable graphical objects that replace the text-submission model. The key difference: Fragments decompose an *existing prompt* into [type, value] cards via LLM analysis, while intent tags are *authored directly* by the user (or suggested by the system and adopted). Fragments are analytical; tags are constructive.
- **Enables** [[meta-intent-elicitation]] — the tag suggestion mechanism and drop-down alternatives help users discover dimensions they hadn't considered. The spatial canvas layout forces explicit thinking about categories (narrative, style, sources) that free-text prompting leaves implicit.
- **Enables** [[graduated-ambiguity-tolerance]] — because tags are free-text [label: value] pairs, users can specify at any precision level. The system doesn't enforce a schema.
- **Supports** [[gentle slope]] — intent tags sit between "just prompting" (zero structure) and "editing a semantic specification" (full structure). They offer structure without enforcing it. Users can start with one tag and add more incrementally. The drag-in/drag-out activation model means commitment is reversible.
- **Relates to** [[reflection-in-intent]] — tag grounding acts (decomposing a prompt or existing content into tags) create reflection opportunities. When the system generates tags from a slide's current state, the user sees their implicit creative decisions externalised as discrete, editable objects.
- **Informs** [[semantic-intermediate-layer]] — the tag collection functions as a lightweight, user-authored semantic specification. Three tag groups (Narrative, Visual Style, Content Sources) parallel Park et al.'s semantic hierarchy, but specified through incremental tag authoring rather than form-filling.
- **Contrasts with** [[hierarchical-design-semantics]] — Park et al.'s four-level hierarchy (Product → Design System → Feature → Component) is a *fixed schema* with named slots. Intent tags are *schema-free* — users define whatever dimensions they want. The tag group structure (Narrative, Visual Style, Content Sources) is the only imposed schema, and users wanted to customise even that.
- **Complements** [[grounding-by-example]] — reference tags are a form of grounding by example: point at a document or image and say "include this." The system extracts relevant content rather than requiring the user to describe it verbally.

## Practical implementations

- **Miro/FigJam** — spatial canvases with sticky notes as free-form intent capture. No AI generation, but the same interaction paradigm: atomic notes, spatial grouping, drag-and-drop organisation.
- **Notion databases with AI** — properties (tags, selects, multi-selects) as structured metadata that could drive generation. Similar [label: value] structure but in a list/table, not a spatial canvas.
- **Midjourney's multi-prompt syntax** (`prompt1 :: prompt2 :: prompt3`) — decomposition of a prompt into weighted sub-prompts. Crude version of concept tags without the graphical interface.
- **Mood boards in design practice** — the direct inspiration for IntentTagger. Designers compile visual and textual references on a board to capture creative direction before execution. Intent tags digitise and operationalise this practice by connecting the board to a generative engine.
- **Stable Diffusion's prompt weighting** (`(keyword:1.5)`) — assigns importance to prompt fragments. Intent tags' active/inactive toggle is a binary version; the opposite slider offers five-point continuous weighting.

## Relevance to project

For the genUI pipeline, intent tags suggest an alternative (or complement) to the structured intent-decomposition → semantic-specification flow. Instead of the LLM producing a decomposition for user review, the user *constructs* their intent incrementally by placing tags on a canvas. The pipeline could support both entry points:

1. **Structured path** — user writes prompt → LLM decomposes → user reviews (IntentFlow model)
2. **Freeform path** — user places tags on canvas → builds up intent collection → triggers generation (IntentTagger model)
3. **Hybrid** — user writes prompt → system grounds into initial tags → user modifies/adds tags → generation

The hybrid model is what IntentTagger actually implements (grounding from text prompt). For json-render, this means the generation input could be a *tag collection* (set of [label: value] pairs organised into groups) rather than a single prompt string or a formal semantic specification. The tag collection is less structured than Park et al.'s semantic hierarchy but more structured than raw NL — a middle ground that matches the [[graduated-ambiguity-tolerance]] principle.

The two-scope model (deck-level canvas + slide-level overlay) also maps to the pipeline: global intent (overall app structure, style, data model) + local intent (per-component or per-view customisation). The grounding-from-slide pattern (extract tags from existing content) is directly applicable to post-generation refinement: the system analyses the generated UI and presents its current state as editable tags.

## Open threads

- How does the tag model scale beyond presentation creation? Slide decks have a natural decomposition into three concerns (narrative, visual style, content sources). A complex multi-entity UI might need many more tag groups — and users already wanted to customise groups for slides. What's the right grouping structure for UI generation tasks?
- Users struggled initially with tag naming and group placement, then relaxed when they realised the system was forgiving. How tolerant should the genUI pipeline be of informal, imprecise tag specifications? The study suggests: very tolerant, with the system showing its interpretation rather than demanding precision.
- The opposite slider was used for reflection but not for direct steering. Is this because the slider is a better thinking tool than a control tool? If so, intent exploration and intent specification might need different interaction mechanisms.
- Can intent tags be persistent across projects? Users saw value in re-using tag sets for similar presentations. A tag library — curated collections of tags for common task types — could bootstrap the generation process.
