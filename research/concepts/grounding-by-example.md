---
type: concept
tags: [intent, user-agency, generative-ui, specification]
sources: [sources/ai-instruments.md]
created: 2026-02-20
---
Users specify intent by pointing at examples rather than describing in words. "Like this" replaces "I want a warm, textured, slightly muted colour palette with organic shapes." The system extracts semantic attributes from the example and applies them in a new context. This sidesteps the articulation problem — the gap between what users can *recognise* and what they can *describe*.

## Context

Henry Riche et al. implement this as Fillable Brushes: the user paints over a region of an existing image to "fill" the brush with that region's style attributes. The system (via LLM analysis) extracts what makes that region distinctive — colour palette, texture, compositional style, mood. The user then paints those attributes onto a different region or a new canvas. Intent is communicated by ostension (pointing at something) rather than description (writing a prompt).

This exploits an asymmetry in human cognition: recognition is far easier than recall or description. Users can instantly identify "I want something like *that*" but struggle to articulate what "that" is in words. Verbal prompt engineering penalises users who lack the vocabulary to describe what they want — which is most users, most of the time.

## Connections

- Addresses [[structured vs unstructured tension]] from the opposite direction — instead of the LLM converting unstructured text into structured specs, it converts unstructured examples into structured attributes. The bridge goes through recognition rather than articulation.
- Complements [[intent-decomposition]] — IntentFlow and Fragments decompose *verbal* intent. Grounding-by-example decomposes *visual/structural* examples. Together they cover both input modalities: words and demonstrations.
- Supports [[gentle slope]] — pointing at examples requires less knowledge than adjusting dimension sliders, which requires less than editing semantic specifications. Grounding-by-example is potentially the lowest-effort rung on the slope.
- Extends [[prompt-as-interface-object]] — the filled brush *is* a reified intent object, but one created by demonstration rather than by typing. Intent objects can be authored multiple ways.
- Relates to [[context-driven adaptation]] — "adapt this UI to be like *that* UI" is a form of grounding by example applied to adaptation. A user could point at an interface they like and say "more like this."
- Contrasts with [[reflection-in-intent]] — reflection makes *existing* intent visible. Grounding creates *new* intent from examples. Different directions, same goal of making intent manipulable rather than opaque.

## Practical implementations

- **CSS Zen Garden** (early web) — the original demonstration that presentation could be extracted from examples (same HTML, different CSS). Not AI-driven, but same principle of separating style from structure.
- **Figma's "Inspect" + style extraction** — copy styles from one element to another. Manual version of grounding-by-example.
- **Style transfer in image generation** (Stable Diffusion's img2img, ControlNet) — extract visual style from a reference image and apply to a new prompt. Direct ancestor of Fillable Brushes.
- **Design system token extraction** — tools that analyse existing UIs and extract design tokens (colours, spacing, typography). Automated grounding for systematic design decisions.
- **Webflow's "Clone" feature** — copy an entire site as a starting template. Coarse-grained grounding.

## Relevance to project

For the genUI pipeline, grounding-by-example could work at multiple levels:

1. **Component level** — "make this card look like *that* card." The system extracts the style attributes (spacing, typography, colour) and applies them. This is trivially implementable with design tokens.
2. **Pattern level** — "I want a layout like *this* app." The system analyses a screenshot or URL, extracts the structural pattern (overview+detail, dashboard grid, wizard flow), and uses it as a pattern selection hint for [[pattern-driven transformation]].
3. **Data model level** — "I want to track things like *this* spreadsheet." The system infers entity types, relationships, and attribute types from example data. This is essentially schema-by-example.

The third level is particularly interesting because it connects to the pipeline's front door. Instead of prompting "build me a project tracker," a user could upload an existing spreadsheet or screenshot and say "build me something that works with data like this." The LLM extracts a task-driven data model from the example, which feeds the rest of the pipeline normally.

## Open threads

- Attribute extraction quality is a bottleneck. If the system extracts the wrong attributes from an example (surface appearance instead of structural logic), the grounding produces superficial copies rather than meaningful adaptations. How to control extraction depth?
- Combining grounding with verbal intent: "like this, but more colourful" requires the system to merge example-derived attributes with verbal modifications. The priority resolution between example and description is non-trivial.
- For UI generation specifically: what constitutes the "style" of a UI that can be extracted and transferred? Design tokens (colours, spacing, type) are straightforward. Layout patterns are harder. Interaction patterns (how things behave) may not be extractable from static examples at all.
