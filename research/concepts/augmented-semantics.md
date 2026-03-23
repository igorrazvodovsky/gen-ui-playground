---
type: concept
tags: [generative-ui, user-agency, intent]
sources: [sources/semantic-guidance-park]
created: 2026-02-20
---
After generating a UI, the system analyses the output (code + screenshot) to extract what the AI actually implemented — including decisions the user didn't explicitly request. These "augmented semantics" are presented in the same vocabulary as the input semantics, making it possible to compare intent vs. implementation and identify where the AI inferred, added, or deviated. The extraction is bidirectional: user intent → structured semantics → generated UI → extracted semantics → comparison.

## Context

When an AI generates a complete interface from a brief prompt, it makes hundreds of implicit decisions — colour values, spacing, typography hierarchy, interaction patterns, information architecture. Without visibility into these decisions, users can't evaluate whether the output matches their intent or identify what to change. Augmented semantics turn evaluation from "does this look right?" (gestalt impression) into "which specific semantic decisions match and which don't?" (structured comparison). Park et al. found this significantly improved output interpretability (M: 3.86 → 5.93) and transparency (M: 3.79 → 5.64).

## Connections

- Depends on [[semantic-intermediate-layer]] — augmented semantics only work if there's a shared vocabulary between input and output. The four-level framework provides that vocabulary.
- Depends on [[hierarchical-design-semantics]] — the extraction maps generated UI properties back into the same Product/Design System/Feature/Component slots.
- Enables [[scoped-semantic-editing]] — once you can see *which* semantic was implemented differently from intent, you can target your edit to that specific semantic rather than guessing.
- Relates to [[in-place toolchain]] — augmented semantics are a form of inspection embedded in the generation workflow. JELLY's "inspect" tool and Varv's data inspector are analogous — tools that reveal the system's internal state alongside the rendered output.
- Extends [[LLM-operable interface]] — if semantics are extractable from generated UI, an agent can also inspect its own output, compare to intent, and self-correct. This turns augmented semantics from a user-facing feature into an agent-facing feedback loop.
- Parallels [[ai-attribute-reformulation]] — both involve the LLM operating on generated output rather than generating from scratch. Reformulation transforms data values; augmented semantics extracts design decisions. Both are "data-time" LLM operations (post-generation), distinct from "design-time" spec generation.
- **Extended by** [[parallel-state-display]] — augmented semantics extract what the AI *did* retrospectively; a parallel state display shows what the system *currently believes* in real time. Viégas & Wattenberg (2023) argue for continuous monitoring of the System Model and [[inferred-user-model]], not just post-hoc extraction. Augmented semantics are a snapshot; parallel display is a stream.
- **Implemented at intent level by** [[intent-output-traceability]] — Kim et al. (CHI 2025) apply the same principle to intent communication: a post-generation Linking Module creates bidirectional mappings between intent dimensions and specific output phrases. Users hover over a dimension to see what it influenced, or hover over output to see which dimensions shaped it. Same pattern as augmented semantics (post-generation analysis mapping output to specification vocabulary), operating at intent granularity rather than design semantics.

## Practical implementations

Park et al. use GPT-5's multimodal capabilities (code + screenshot analysis) for extraction. In production: Figma's Dev Mode extracts design tokens from visual designs. CSS computed styles reveal what the browser actually rendered vs. what was specified. React DevTools let you inspect component props and state. Design linting tools (Stylelint, ESLint plugin for design tokens) automatically flag deviations from design system rules. The novelty is doing this extraction at the *semantic* level (intent-aware, not just property-aware) using an LLM.

## Relevance to project

For the genUI pipeline, augmented semantics suggests a **verification step** after spec generation. The LLM generates a json-render spec, the spec is rendered, and then a second LLM pass (or deterministic analysis) extracts what was actually produced and compares it to the input semantics. Mismatches are surfaced to the user or fed back to the generation step for self-correction.

This is especially valuable for the [[pattern-driven transformation]] pipeline: after each transformation step (Task → Dialog → Presentation → Layout), the output could be analysed to verify that the intended pattern was correctly instantiated.

## Open threads

- How reliable is LLM-based semantic extraction? The paper reports participants found it "quite accurate," but systematic error rates aren't reported.
- Can extraction be partially deterministic? Component-level semantics (type, properties, state) are directly readable from code. Higher-level semantics (mood, style, goal alignment) require inference.
- What happens when augmented semantics reveal the AI made *better* choices than the user specified? Should the system suggest updating the input semantics to match?
- Cost implications: extraction requires a second LLM call per generation. Is this acceptable for real-time iteration?
