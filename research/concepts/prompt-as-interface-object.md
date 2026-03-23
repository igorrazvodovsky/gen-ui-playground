---
type: concept
tags: [intent, user-agency, generative-ui, specification]
sources: [sources/ai-instruments.md]
created: 2026-02-20
---
Prompts are not text strings to be typed and submitted — they are persistent, manipulable graphical objects that live in the workspace alongside the content they produce. A reified prompt has spatial presence, visual state, and direct-manipulation affordances: it can be dragged, edited, locked, varied, composed with other prompts, and reused across contexts. This transforms the user's relationship to intent from "fire and forget" (type a sentence, hope for the best) to "sculpt and steer" (adjust visible parameters, observe effects, iterate).

## Context

Chat-based AI interaction forces a fundamental mismatch: user intent is multidimensional (style, content, mood, scope, audience, etc.) but the input channel is a single text string that flattens all dimensions into one sequential utterance. Each re-prompt overwrites the previous context rather than building on it. Henry Riche et al. apply Beaudouin-Lafon's instrumental interaction framework to fix this: if the instrument (prompt) is reified as a first-class interface object, it gains persistence, visibility, and composability that text strings lack.

The Fragments probe is the clearest implementation: an LLM decomposes a prompt into [type, value] attribute pairs, each rendered as a card. Users can lock dimensions (persist across regeneration), vary one dimension while freezing others, and compose fragments from different prompts. This isn't just a nicer prompt editor — it changes the interaction model from turn-taking (user → AI → user → AI) to continuous manipulation (user adjusts, AI responds, in parallel).

## Connections

- Extends [[intent-decomposition]] — IntentFlow decomposes intent into Goal → Intents → Dimensions with typed controls. Fragments decompose the prompt text itself into [type, value] cards. Both make hidden dimensions visible. The key difference: IntentFlow's decomposition is *pre-generation* (an intermediate step before the AI acts), while Fragments are *in-situ* (they live in the workspace and persist across iterations). These are complementary — IntentFlow structures the user's high-level task intent, Fragments structure the low-level prompt parameters.
- Extends [[intent-decomposition]] — Fragments are a different control modality: draggable cards with lock/vary/edit affordances, vs. IntentFlow's Likert scales and sliders. Both reify dimensions as interactive elements; the right modality depends on the content domain (sliders work for continuous quantities, cards work for categorical/textual attributes).
- Enables [[reflection-in-intent]] — reification is what makes reflection possible. You can only show users their own intent structure if that structure has a visual representation.
- Supports [[gentle slope]] — adds a new rung: direct manipulation of reified intent objects sits between "adjust abstract dimension sliders" (IntentFlow) and "edit the semantic specification" (Park et al.).
- Contrasts with [[semantic-intermediate-layer]] — Park et al.'s semantic layer is a *checkpoint* (inspect before generation). Reified prompts are *persistent companions* (live alongside generated content, remain editable after generation). Different temporal model.
- Supports [[tools-not-apps]] — each AI-instrument (Fragment, Lens, Brush, Container) is a composable tool, not a monolithic application. Users assemble workflows from instruments.
- Relates to [[in-place toolchain]] — instruments are editing tools embedded within the workspace, not extracted to separate panels or modes.
- **Paralleled by** [[intent-tag-as-micro-prompt]] — Gmeiner et al. (CHI '25) independently arrive at prompt reification through a different route: intent tags are [label: value] keyword pairs placed on a spatial canvas. Like Fragments, they're persistent, manipulable, and composable. The key difference: Fragments are *analytically derived* (LLM decomposes an existing prompt), while intent tags are *constructively authored* (the user builds them incrementally). Both validate the core principle — prompts should be objects, not strings — through different interaction models.

- **Formalised within** [[paradigm-graph-as-design-language]] — the IAI model (Shen et al., CHI '26) reinterprets AI-Instruments' three principles as properties of paradigm graphs rather than standalone design goals. Reification = whether intent is externalised into an explicit intermediate representation (Aug). Reflection = whether multiple alternatives are surfaced through post-invocation paradigms (P5, P6). Grounding = whether interactions constrain interpretation through artifact references (P3, P4, P9–P12). This mapping shows the principles aren't orthogonal design guidelines — they manifest differently across different paradigm graph structures depending on interaction timing and resource availability. See [[prompt-interaction-synergy]].

## Practical implementations

- **Beaudouin-Lafon's instrumental interaction** (2000) — the theoretical foundation. Instruments mediate between users and domain objects; reification turns commands into objects.
- **Adobe Firefly's "Generative Fill"** — spatially-scoped prompt application (paint a region, describe what to fill it with). Partial implementation of Transformative Lenses.
- **Midjourney's parameter system** (`--style`, `--ar`, `--chaos`) — crude reification of prompt dimensions as named parameters, but still text-based, not graphical.
- **ComfyUI** — node-based image generation workflow where generation parameters are reified as connectable nodes. Closer to the compositional instrument model but requires technical expertise.
- **Figma's AI features** — emerging examples of spatially-scoped AI operations on design elements.

## Relevance to project

The genUI pipeline currently treats user input as a text prompt that enters the pipeline at one end. AI-instruments suggest a richer input model: the user's intent could be a **persistent workspace of reified intent objects** — fragments for key requirements, lenses for scoped modifications, containers for exploring alternatives.

Concretely, this informs two pipeline stages:
1. **Intent decomposition** — the LLM's decomposition of the user prompt could produce reified Fragment-style cards (not just IntentFlow-style sliders), giving users a manipulable prompt workspace before generation begins.
2. **Post-generation refinement** — instead of re-prompting to modify the generated UI, users could apply Lens-like instruments: "apply this style to this section," "swap this component type in this region." Spatially-scoped modification is a concrete interaction model for [[scoped-semantic-editing]].

The meta-instrument concept (instruments taking other instruments as input) also maps to the pipeline: a "task pattern" instrument could take "attribute" instruments as parameters, composing a generation spec from manipulable parts.

## Open threads

- All four probes target image generation. Does reification transfer to structured UI generation, where output is a component tree rather than pixels? Spatial scoping (Lenses) is less obvious when the output has semantic structure — scoping by component hierarchy might replace scoping by spatial region.
- The [type, value] decomposition depends on LLM quality. Bad decompositions (merging two concepts into one Fragment, splitting an atomic concept across two) would break the manipulation affordances. How robust is prompt decomposition for complex, multi-entity UI requests?
- Composability gets complex fast. Meta-instruments (containers taking fragments) worked in the workshop, but scaling to deep composition chains raises learnability questions.
