---
type: concept
tags: [intent, user-agency, generative-ui]
sources: [sources/intentflow]
created: 2026-02-20
---
Bidirectional linking between structured intent parameters and specific elements in the generated output, enabling users to trace which intents influenced which output phrases and, conversely, which output elements connect back to which dimension settings. The linking is computed post-generation by an LLM that analyses the output in the context of the full intent structure (Goal + Intents + Dimensions with values) and produces explicit {dimension, value, output element, relevance} tuples.

## Context

When an LLM generates output from a structured intent specification, the user faces an evaluation problem: the output is a monolithic blob, and it's not obvious which parts were shaped by which intent settings. Did the formal tone come from the "formality" dimension? Did this paragraph exist because of the "include examples" intent? Without traceability, adjusting a dimension and regenerating is a shot in the dark — the user can't predict what will change.

IntentFlow's Linking Module addresses this by creating explicit links post-generation. Users can hover over a dimension to highlight which output phrases it influenced (intent → output direction), or hover over an output phrase to see which dimensions shaped it (output → intent direction). This transforms evaluation from holistic impression ("does this feel right?") to targeted inspection ("is this paragraph doing what the 'audience: technical' dimension intended?").

The key design choice: linking is *computed*, not embedded. The generation module doesn't annotate its output in real time; a separate linking pass analyses the finished output against the intent structure. This separation matters because it means the generation model can focus on quality without the overhead of self-annotation, and the linking can be independently improved or replaced.

## Connections

- **Extends** [[augmented-semantics]] — Park et al.'s augmented semantics extract *design decisions* from generated UI and map them to semantic slots. IntentFlow's linking extracts *intent influence* from generated output and maps it to dimension values. Same principle (post-generation analysis mapping output to specification vocabulary), different granularity and pipeline stage. Augmented semantics operates at the design level; intent-output linking operates at the intent level.
- **Enables** [[scoped-semantic-editing]] — once you can see which dimension influenced which output, you can make a targeted adjustment: change that dimension, regenerate, and know roughly what will change. Without traceability, all edits are unscoped.
- **Prevents** [[semantic-drift]] — traceability provides a mechanism for detecting drift. If a dimension's influence shifts between iterations (it was shaping paragraphs 2–3, now it's shaping paragraphs 1 and 5), something drifted. The user can spot this through the linking visualisation.
- **Relates to** [[parallel-state-display]] — Viégas & Wattenberg argue for continuous display of the system's internal state. Intent-output linking is a *post-hoc* version: it reveals what the system did, mapped to intent structure. A real-time version would show intent influence as the output streams — but this is technically harder (the output isn't complete yet).
- **Complements** [[intent-decomposition]] — decomposition creates the structured intent model; traceability validates it against the output. Together they form a specification-generation-verification loop.
- **Depends on** [[intent-decomposition]] — the traceability is only as useful as the dimensions are meaningful. If a dimension is too vague (e.g., "quality: low ↔ high"), the links don't help because the user can't make targeted adjustments. Well-defined dimensions with clear value semantics make traceability actionable.

## Practical implementations

- **Explainable AI (XAI) feature attribution** — SHAP values, attention maps, and saliency maps all trace model outputs back to input features. Intent-output traceability is the same pattern applied to generative text: which input parameters influenced which output tokens?
- **Track changes in word processors** — each change is attributed to an author and a time. Intent linking attributes each output element to an intent parameter and a value.
- **Git blame** — traces each line of code to the commit that introduced it. Intent linking traces each output phrase to the intent dimension that motivated it.
- **React DevTools component highlighting** — hovering over a component in the inspector highlights it in the rendered page; hovering in the page highlights it in the tree. Same bidirectional inspection pattern.
- **Figma's "go to main component"** — traces an instance back to its source. Intent linking traces an output phrase back to its intent source.

## Relevance to project

For the genUI pipeline, traceability addresses the "why does this UI look like this?" question. Currently, the pipeline plans: user prompt → task analysis → spec → render. If the rendered UI has a table instead of cards, the user has no way to know *why* — was it a pattern selection decision? A constraint rule? An LLM heuristic? An intent inference?

With intent-output traceability, the pipeline becomes auditable:
1. Each rendered UI element links to the spec property that defined it
2. Each spec property links to the pattern or constraint rule that produced it
3. Each pattern selection links to the intent dimension that drove it
4. The user can trace from "why is this a table?" back through the pipeline to "because you said 'comparison' as your primary task, which selected the ComparisonTable pattern, which maps to this component spec"

This is the missing accountability layer. It also enables a powerful editing interaction: click on a UI element you don't like → see which intent dimensions influenced it → adjust those dimensions → targeted regeneration of the affected spec section. This is [[scoped-semantic-editing]] made concrete through traceability.

## Open threads

- How reliable is LLM-based linking? The paper doesn't report linking accuracy systematically. False links (dimension X didn't actually influence phrase Y) could be worse than no linking — they'd lead users to adjust the wrong dimension.
- Can traceability be partially deterministic? In the genUI pipeline, some links are mechanical: a constraint rule that maps "enum type" → "dropdown component" is fully traceable without LLM analysis. Only the LLM's creative/ambiguous decisions need computed linking.
- How does traceability scale to multi-component UI? IntentFlow links intents to phrases in a single text output. A generated UI with 20 components across 3 views has a much larger linking surface. Does the visualisation still work?
- Performance cost: the Linking Module requires a post-generation LLM call. For the genUI pipeline with spec-level traceability, this might need to run at every pipeline stage (intent → spec, spec → pattern, pattern → component). Cumulative cost could be significant.
