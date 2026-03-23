---
type: concept
tags: [user-agency, intent, generative-ui, specification]
sources: [interaction-augmented-instruction]
created: 2026-03-06
---
Text prompts and GUI interactions are complementary modalities with different strengths, not competing alternatives. Prompts are flexible, expressive, and general-purpose — but ambiguous, underspecified, and coarse-grained. Interactions (clicks, brushes, selections, sliders, sketches) are precise, fine-grained, and referentially clear — but rigid, predefined, and narrow in scope. Neither is sufficient alone. Combining them produces richer instructions than either could achieve independently: the prompt supplies the high-level goal, interactions supply the precise constraints and referents.

## Context

This tension has been implicit across the vault — [[graduated-ambiguity-tolerance]] accepts a spectrum of precision, [[intent-tag-as-micro-prompt]] mixes free text with structured controls, [[tangible-agency]] embeds precise controls alongside conversational input. What the IAI model adds is the explicit framing: these aren't UX preferences, they're a fundamental information-theoretic complementarity. Text carries intent; interaction carries specificity. The system that combines them well gets both.

## Connections

- Extends [[graduated-ambiguity-tolerance]] — the *reason* mixed-precision input works is this complementarity. Tags accept "Dark and Moody" (prompt-like) and "#FF33CC" (interaction-like) because each modality handles what the other can't.
- Extends [[structured vs unstructured tension]] — this tension is a specific instance of prompt-interaction synergy. The pipeline's core challenge (NL → structured spec) is fundamentally about bridging the prompt modality to the interaction/structured modality.
- Supports [[tangible-agency]] — DuetUI's embedded controls (sliders, pickers) are the interaction (I) side of the synergy. The IAI model explains *why* participants preferred them: interactions provide precision that re-prompting can't.
- Supports [[prompt-as-interface-object]] — AI-Instruments' reification of prompts as manipulable objects is an attempt to give prompts some of interaction's precision while keeping their flexibility.
- Enables [[augmented-instruction]] — the composite input to GenAI is the product of this synergy.

## Practical implementations

- **DynaVis** (P8 paradigm): NL prompt for initial visualisation + AI-generated control widgets for fine-grained manipulation. The prompt creates; the widgets refine.
- **SketchFlex** (P3 paradigm): sketch + text prompt combined into a single instruction. The sketch provides spatial/structural specificity the prompt can't.
- **DirectGPT** (P4 paradigm): selecting/brushing regions on an artifact + text prompt. The interaction grounds referential ambiguity ("make *this part* brighter").
- **PromptCharm** (P7 paradigm): text-to-image prompt + generated parameter sliders (attention weights). The prompt specifies the scene; the sliders steer generation precision.
- Design systems' component playgrounds (Storybook, Radix docs): text-based configuration (prop names/types) + interactive controls (knobs, sliders) for the same component.

## Relevance to project

The customisation loop (`↺ End-user customisation (NL + direct manipulation) → Model evolution → UI update`) explicitly names both modalities. The IAI model tells us these aren't just two input channels — they serve fundamentally different communicative functions. Implications:

1. **Every user-facing touchpoint in the pipeline should support both modalities.** Intent decomposition? Offer both text editing *and* dimension sliders. Spec review? Allow both NL re-prompting *and* direct manipulation of the semantic slots. Attribute configuration? Both "make this shorter" *and* a length slider.
2. **The intermediate representation (Aug) must be able to encode contributions from both.** A pure text spec loses interaction precision; a pure structured spec loses prompt flexibility. This supports the existing intuition that the IR needs both a human-readable face and a machine-structured face ([[feature-component-duality]]).
3. **The choice of *which* paradigm to use at each pipeline stage is itself a design decision.** Table 3 provides a cheat sheet. Pre-invocation artifact-grounded paradigms (P3, P4) suit initial specification when examples exist. Post-invocation prompt-only paradigms (P5, P6) suit exploratory refinement.

## Open threads

- How does the synergy change when the "interaction" is with an AI-generated UI rather than a traditional GUI? The paradigms were derived from existing tools; generative UI creates new interaction surfaces on the fly.
- What's the right balance point? Too much interaction overhead defeats the purpose of NL prompting. Too little precision makes iteration slow. The [[alignment-cost-tradeoff]] framework should apply here.
