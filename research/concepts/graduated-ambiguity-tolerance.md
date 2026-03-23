---
type: concept
tags: [intent, user-agency, generative-ui, specification]
sources: [sources/intent-tagging]
created: 2026-03-05
---
The system should accept user intent at any level of precision — from vague directional hints ("Dark and Moody") to exact specifications ("#FF33CC") — without forcing one level or penalising the other. The user chooses how precisely to specify each dimension independently, and the system fills in what's left unspecified through inference. Precision is per-dimension, not all-or-nothing.

## Context

IntentTagger demonstrated this through its free-text [label: value] tags. One participant specified header colour as "Gold"; another used hexadecimal notation "#FF33CC". One wrote "Typography: Modern"; another wrote detailed comma-separated phrases. The system handled all of these, generating reasonable interpretations regardless of specificity level. Critically, the system's *tolerance* was what made users comfortable: initial anxiety about naming tags "correctly" dissolved once they saw the system responding sensibly to imprecise input.

This addresses a fundamental asymmetry in creative tasks: users have high certainty about some aspects and low certainty about others, and this varies per person and per moment. A user might know exactly what colour they want but have no opinion on typography, or vice versa. Forcing uniform precision (as forms and wizards do) either frustrates experts (too many required fields) or overwhelms novices (too many decisions). Graduated ambiguity lets each dimension find its natural precision level.

The opposite slider is an interesting mechanism here: it provides a continuous five-point spectrum between a value and its opposite. Rather than requiring the user to articulate a precise value, they can position themselves along a conceptual axis. "Somewhere between modern and traditional, leaning modern" is a valid specification — more informative than "modern" alone, less demanding than a full typography specification.

## Connections

- **Addresses** [[structured vs unstructured tension]] — graduated ambiguity is a pragmatic resolution. Instead of forcing a choice between structured specification (forms, schemas) and unstructured input (free text), the system accepts a *spectrum* of structure. Each tag can be as structured or as loose as the user wants, independently.
- **Supports** [[gentle slope]] — ambiguity tolerance removes precision barriers at every rung of the slope. Users can start vague and become precise as their understanding develops, without hitting a cliff where the system demands specificity they don't yet have.
- **Extends** [[intent-decomposition]] — IntentFlow's typed controls (Likert scales, sliders, dropdowns) impose a specific precision format per dimension. Graduated ambiguity says: let the user *choose* the format. Sometimes a slider is right; sometimes a free-text value is right; sometimes "I'll know it when I see it" is right. The system should handle all three.
- **Relates to** [[intent-decomposition]] — typed controls assume the value semantics are known upfront (ordinal → Likert, continuous → slider, categorical → dropdown). Graduated ambiguity handles cases where the value semantics are *themselves* ambiguous — "Dark and Moody" could be a colour, a mood, or a visual style. The system infers the appropriate treatment.
- **Enabled by** [[intent-tag-as-micro-prompt]] — the free-text [label: value] format is what makes graduated ambiguity possible. A structured form with defined field types can't accept "Dark and Moody" in a colour field. A free-text tag can.
- **Complements** [[meta-intent-elicitation]] — system suggestions help *increase* precision over time. The user starts vague → system suggests specific alternatives → user selects or refines → precision grows organically. The drop-down alternatives provide a vocabulary for precision the user might lack.
- **Relates to** [[semantic-intermediate-layer]] — Park et al.'s semantic slots have defined value types. Graduated ambiguity suggests these slots should accept values at varying levels of formality — "modern" alongside specific design token references — with the system resolving ambiguity during generation.
- **Parallels** [[bidirectional-ambiguity]] — NeuroSync addresses ambiguity between user and LLM. Graduated ambiguity addresses ambiguity *within* the user's own specification. Both recognise that ambiguity isn't a bug to eliminate but a natural state to work with.

## Practical implementations

- **CSS colour values** — CSS accepts `red`, `#FF0000`, `rgb(255,0,0)`, `hsl(0,100%,50%)`, and named variables for the same colour. The format communicates precision intent: named colours are casual, hex codes are exact.
- **Google search** — handles everything from single keywords to quoted exact phrases to structured operators (`site:`, `filetype:`). The same search box accepts wildly different precision levels.
- **Figma's auto-layout** — users can specify spacing as fixed pixels, "auto" (fill available space), or min/max constraints. Different precision levels for the same property.
- **Natural language dates** — systems like Siri/Google understand "next Tuesday", "March 5th", "in two weeks", and "2026-03-05T14:30:00Z" as the same type of input at different precision levels.
- **Music production's "wet/dry" knobs** — a single control blends between extremes (fully processed ↔ unprocessed), letting the user specify "somewhere around here" without needing to articulate exact parameters.

## Relevance to project

For the genUI pipeline, graduated ambiguity tolerance should be a design principle at every user-facing input point. The intent layer shouldn't force a choice between free-text prompts (fully ambiguous) and structured semantic specifications (fully precise). It should accept:

- "Make it look professional" (vague direction)
- "Use a blue colour scheme with sans-serif typography" (moderate precision)
- `{ colorScheme: "blue-500", typography: { family: "Inter", scale: 1.25 } }` (exact specification)

...all in the same interface, for different dimensions of the same generation request.

The practical mechanism: each input in the pipeline should accept either natural language or structured values, and the LLM bridges the gap. For json-render spec generation, this means the user's input might be a mix of exact component specifications for things they care about deeply and vague descriptions for things they care about less. The pattern-driven transformation engine handles both: exact specs pass through, vague descriptions trigger pattern selection and inference.

The opposite slider pattern could generalise beyond intent tags. Any parameter with two conceptual poles (simple ↔ complex, minimal ↔ dense, playful ↔ serious) could expose a continuous exploration axis. For UI generation: "layout density" (spacious ↔ compact), "interaction complexity" (direct manipulation ↔ wizard flows), "data visibility" (overview ↔ detail). These are natural [[intent-decomposition]] but specified through continuous poles rather than typed values.

## Open threads

- How does the system resolve ambiguity during generation? "Dark and Moody" as a colour scheme needs to be mapped to actual colour tokens. The LLM handles this now, but deterministic fallbacks (ontology-based mapping from mood descriptors to design tokens) could improve consistency.
- Does graduated ambiguity compose well? If one tag says "Typography: Modern" and another says "Font: Garamond", there's a conflict — Garamond isn't modern. How should the system handle precision mismatches across related tags? (See also AmbigChat's taxonomy of ambiguous query facets — Ma et al., UIST '25 — which categorises *how* natural language is underspecified: entity references, verb degree/means, temporal/geographical/source dependencies. This taxonomy could inform what kinds of ambiguity the pipeline's intent layer should expect and handle.)
- The study found that users became *more precise over time* as they gained confidence. Is this always the trajectory? Or do some users prefer staying vague and letting the system decide? The pipeline should support both stable-vague and progressively-precise interaction patterns.
