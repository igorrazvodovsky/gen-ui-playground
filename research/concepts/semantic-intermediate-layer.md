---
type: concept
tags: [specification, intent, generative-ui, user-agency]
sources: [sources/semantic-guidance-park]
created: 2026-02-20
---
An explicit, structured representation inserted between user intent and AI-generated output that serves as a bridge in both directions: it structures what the user wants to say (execution) and reveals what the AI actually did (evaluation). The key move is making this layer *visible and manipulable* — not just an internal intermediate representation the system uses, but a surface the user can inspect, edit, and reason about.

## Context

Text-to-UI generation suffers from a fundamental opacity problem. Users fire prompts into a black box and get complete interfaces back, with no visibility into the hundreds of implicit decisions the AI made. The semantic intermediate layer addresses this by externalising the bridge between intent and output as a first-class, inspectable artefact. Park et al. (CHI '26) implemented this as a four-level semantic form ([[hierarchical-design-semantics]]) that both parses user input into structured slots and extracts implemented semantics from generated UI.

## Connections

- Addresses [[structured vs unstructured tension]] — this is the concrete mechanism for bridging the gap between unstructured user expression and structured system needs. Instead of asking users to write better prompts or the LLM to guess better, it inserts a shared, inspectable structure both sides can work with.
- Extends [[specification-based rendering]] — the semantic layer is upstream of the rendering spec. Where json-render's spec describes *what to render*, the semantic layer describes *why* — the intent, constraints, and relationships that motivate the spec.
- Relates to [[model hierarchy]] — Park et al.'s four levels (Product → Design System → Feature → Component) are a complementary hierarchy to Seffah's (Task → Dialog → Presentation → Layout). The model hierarchy describes the generation *pipeline*; the semantic framework describes the *specification structure*. They intersect at the Feature/Presentation level.
- Enables [[gentle slope]] — by making the semantic layer inspectable and editable at different granularities, it creates natural intervention points. Users can tweak a component property (low slope) or change a product goal (high slope), with the semantic relationships showing what will cascade.
- Contrasts with [[pattern-driven transformation]] — Park et al.'s system doesn't use patterns as the organising principle. Instead, it uses semantic slots with relationship analysis. The two approaches are complementary: patterns could inform which semantic slots matter for a given task type, and semantic relationships could validate pattern selections.
- Enables [[augmented-semantics]] — the layer only works bidirectionally if you can extract what the AI implemented back into the same semantic vocabulary.
- Enables [[scoped-semantic-editing]] — without an explicit semantic layer, there's nothing to scope edits *to*.
- **Complemented by** [[parallel-state-display]] — the semantic layer is a single pre-generation checkpoint; Viégas & Wattenberg (2023) argue for *continuous* runtime monitoring of the system's internal state. The semantic layer shows "here's what I'll generate"; a parallel display shows "here's what I currently believe about you and myself." Together they cover both gulfs.
- **Complemented by** [[inferred-user-model]] — the semantic layer makes the system's interpretation of the *task* visible; the inferred user model makes its interpretation of the *user* visible. Both address opacity but in different dimensions.
- **Extended upstream by** [[intent-decomposition]] — Kim et al. (CHI 2025) add an intent-level intermediate layer *before* the design-level semantic layer. IntentFlow decomposes the user's prompt into Goal → Intents → Intent Dimensions, each reified as typed UI controls ([[intent-decomposition]]). This structures *what the user wants to accomplish* before Park et al.'s framework structures *how it should look*. Together they form a two-layer mediation: intent layer → design layer → generated output. IntentFlow also demonstrates that showing users a structured representation isn't enough — you need interaction paradigms matched to value semantics (Likert scales for ordinal qualities, sliders for continuous ranges, hashtags for categories).

## Practical implementations

Park et al.'s system (Next.js + GPT-5 + v0-1.5-md) is the primary implementation. The broader pattern — structured intermediate representations between user and AI — appears in: prompt scaffolding tools (PromptMagician, Lumnate), design system token layers (Figma's design tokens sit between intent and implementation), and to some extent in any system that separates "what" from "how" (Meridian's DataConfig → AttributeConfig → ViewConfig → LayoutConfig is a similar layered mediation).

## Relevance to project

This is the missing piece between the user's prompt and the pattern-driven transformation pipeline. The pipeline currently assumes: user prompt → LLM task analysis → structured spec. Park et al. shows that the LLM task analysis step should produce a *visible, editable* intermediate — not just an internal data structure. The user should be able to see the semantic decomposition, correct it, and then have it drive generation.

Concretely: the genUI pipeline's first LLM touchpoint (spec generation) should output structured semantics in the Park et al. framework, displayed to the user, before compiling down to json-render specs. This adds an inspectable step between "I want a dinner party planner" and the rendered UI.

- **Complemented by** [[externalised-LLM-understanding]] — Zhang et al. (UIST '25) externalise a different kind of intermediate layer: the LLM's *task structure* (subtasks, dependencies, data flows) rather than *design semantics*. Park et al. make design decisions visible; NeuroSync makes functional decomposition visible. For a full-pipeline solution, both are needed at their respective stages. The task graph sits upstream — it shows *what functionality* before the semantic layer shows *how it looks*.

- **Extended temporally by** [[intent-specification-as-common-ground]] — the semantic layer is a per-session snapshot: "here's the structured interpretation of your current prompt." Intent specifications (Vaithilingam et al., UIST '25) extend this to a *persistent* intermediate that accumulates across sessions. The semantic layer mediates between prompt and generation; the intent specification mediates between the user and the AI agent over time. Both are inspectable, editable, structured representations — at different timescales.
- **Pre-modification counterpart** [[impact-analysis-before-generation]] — the semantic layer shows "here's what I'll generate." Impact analysis shows "here's what your change will affect in the existing knowledge." Both are feedforward mechanisms at different lifecycle points.
- **Surfaces** [[work-context-model]] assumptions — JTBD-enriched goals (job/circumstance/outcome) should be visible in the semantic layer so users can correct misidentified context

## Open threads

- How does the semantic layer interact with [[pattern-driven transformation]]? Should semantic slots map to pattern selection (e.g., Feature.Function = "search" triggers the Search pattern)?
- The paper's system is single-component — how does this scale to multi-component, multi-view interfaces where semantic relationships cross component boundaries?
- Can the semantic layer be the *same structure* as the model hierarchy, or does it need to be a parallel, user-facing simplification?
- How much of the semantic extraction (augmented semantics) can be done deterministically from the spec vs. requiring LLM inference?
