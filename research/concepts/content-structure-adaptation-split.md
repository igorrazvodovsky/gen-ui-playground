---
type: concept
tags: [generative-ui, model-evolution, component-mapping]
sources: [sources/llm-driven-accessible-interface]
created: 2026-02-24
---
Adaptation has two fundamentally different kinds of work: **content transformation** (making information itself more accessible — simplification, reformulation, alternative representations) and **structural transformation** (changing the UI's visual/interactive properties — layout, contrast, font size, modality switching). These should be handled by different mechanisms: LLMs for content, deterministic rules for structure. Mixing them produces unreliable, unauditable output.

## Context

Jerry et al.'s framework makes this split explicit. The LLM handles:
- Plain Language simplification (medical text → 6th-grade reading level)
- Pictogram generation (text concepts → visual symbols)
- Text-to-speech preparation (text → audio-ready format)
- Cognitive load reduction (information chunking, progressive disclosure of complex content)

Deterministic rules handle:
- Font size and contrast adjustments
- Layout changes (single-column for screen readers, enlarged touch targets)
- Modality selection (visual → audio → tactile)
- Colour palette adaptation (colour-blind safe palettes)
- Navigation structure simplification

The architectural reason for the split: structural adaptations are **fully specifiable** — WCAG 2.2 §1.4.3 says contrast ratio ≥ 4.5:1, and you can compute that exactly. Content adaptations are **not fully specifiable** — "simplify this medical text for someone with mild intellectual disability" requires judgement, context, and language understanding. The LLM handles what rules can't.

## Connections

- **Extends** [[context-driven adaptation]] — OADAPT's adaptation layer doesn't distinguish between content and structural adaptations. This split refines the adaptation model into two sub-pipelines with different reliability characteristics.
- **Instance of** [[programmable-router]] — route each adaptation task through the cheapest reliable mechanism. Structural → deterministic rules (cheap, auditable, 100% reliable). Content → LLM (expensive, needs quality gates, probabilistic). Don't use the LLM for what rules can handle.
- **Supports** [[ai-attribute-reformulation]] — Meridian's per-attribute AI reformulation is the same idea at a different scale. Jerry et al. reformulate medical content for accessibility; Meridian reformulates data attributes for information-seeking. Both bound the LLM to content transformation, not UI structure.
- **Related to** [[abstract-concrete-separation]] — Varv separates semantic events from modality bindings. Content adaptation operates on the semantic/abstract layer; structural adaptation operates on the concrete/binding layer. Same split, different framing.
- **Enables** [[adaptation-quality-gates]] — because content and structure are separated, you can apply different verification strategies: readability scoring for content, deterministic compliance checking for structure.

## Practical implementations

- **axe-core / Lighthouse** — structural accessibility checking is already deterministic and automated. This validates the "rules for structure" half.
- **Plain Language tools** (Hemingway Editor, readable.com) — content simplification is already recognised as a distinct problem requiring different tools from structural accessibility.
- **ARIA roles and attributes** — structural; applied by rules. Alt text generation — content; requires understanding. The HTML accessibility ecosystem already implicitly makes this split.
- **Design system accessibility features** (Radix's built-in ARIA, MUI's accessibility props) handle structural adaptation at the component level. Content adaptation is left to the application.

## Relevance to project

Directly informs the **adaptation rules** step and refines the LLM's role in the pipeline. The current architecture sketch has a single "Adaptation rules" step. This concept says it should be two sub-steps:

1. **Structural adaptation** (deterministic): user profile → rule activation → spec modifications (contrast, font, layout, modality). No LLM. Runs after spec generation, as post-processing.
2. **Content adaptation** (LLM-driven): user profile → prompt construction → content reformulation (simplification, alternative representations). Runs during or after [[ai-attribute-reformulation]], as a specialised case of per-attribute transformation.

This also sharpens the three-layer mapping architecture: patterns handle macro structure, constraint rules handle micro structure (component selection), and now **adaptation rules handle structural accessibility** while **the LLM handles content accessibility**. The LLM's responsibilities are pushed ever further into the "genuinely requires judgement" territory.

## Open threads

- Where does the boundary fall for edge cases? Information hierarchy (what to show first) is arguably structural, but it depends on content understanding. Progressive disclosure (how much to reveal initially) depends on cognitive load, which depends on content complexity.
- Can content adaptation be cached? If the same medical text is simplified once for "mild intellectual disability," can that result be reused? Jerry et al. don't address caching, but it maps to [[ai-attribute-reformulation]]'s caching question.
- Does this split hold for non-accessibility adaptation? Personalisation (expert vs. novice) might follow the same pattern: structural changes (information density, progressive disclosure levels) are rule-based; content changes (terminology, explanation depth) need the LLM.
