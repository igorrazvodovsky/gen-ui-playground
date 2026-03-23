---
title: "LLM-Driven Accessible Interface: A Model-Based Approach"
authors: [Jerry, Moreno, Francisco, Hervás]
year: 2025
venue: "Applied Sciences"
type: literature
status: processed
---
## Core idea

A framework combining model-driven engineering (SysML v2) with LLMs to generate accessible, personalised UIs for users with cognitive and sensory disabilities — specifically in healthcare (medical leaflets). The key architectural move: the LLM handles **content transformation** (plain language simplification, pictogram generation) while **deterministic rules** handle structural/visual adaptation (layout, contrast, modality switching). Every adaptation decision traces back to a specific accessibility standard (WCAG 2.2, EN 301 549, ISO 24495-1, W3C COGA) via formal requirement chains.

## Key concepts

- [[normative-grounded-adaptation]] — adaptation rules formally linked to accessibility standards via Derived Accessibility Requirements (DARs). Each DAR chain: user need → requirement → adaptation rule → normative reference. Traceability is the point — every UI decision can be audited.
- [[content-structure-adaptation-split]] — architectural principle separating what the LLM does (content reformulation — simplification, pictograms, modality alternatives) from what deterministic rules do (structural adaptation — layout, contrast, font size, modality selection). The LLM is bounded to content; it doesn't touch UI structure.
- [[adaptation-quality-gates]] — automatic checkpoints after LLM generation: readability scoring, semantic fidelity checks (entailment), factual consistency. Failures trigger regeneration or human-in-the-loop review. A concrete mechanism for making LLM-driven adaptation auditable.

## Technical approach

**Architecture — three layers:**

1. **Domain Layer** — medical content (leaflet sections, dosage info, contraindications) modelled as SysML v2 blocks with semantic annotations. The domain model is the source of truth.
2. **Adaptation Layer** — user profile (disability types, severity, preferences) + adaptation rules + normative requirements. Rules activate based on profile traits. The 42 Derived Accessibility Requirements (DARs) each trace: user need → adaptation requirement → implementation rule → standard reference.
3. **Technical UI Layer** — React rendering with component selection driven by activated rules. Accessible components (adjustable text, high contrast, audio output, pictograms) compose into personalised views.

**Generative pipeline (six stages):**

1. **Profile interpretation** — parse user profile, identify relevant disability types and severity levels.
2. **Rule activation** — match profile traits to DARs. Many-to-many: one disability activates multiple rules; one rule may serve multiple disabilities.
3. **Prompt construction** — build LLM prompts from activated rules + source content. Prompts are rule-generated, not freeform — the LLM receives explicit instructions grounded in normative requirements.
4. **Generative transformation** — LLM performs content adaptations: Plain Language simplification, pictogram generation (via image generation), text-to-speech preparation. Structural adaptations (layout, contrast) are applied deterministically, no LLM involved.
5. **Quality gates** — automatic verification: Flesch-Kincaid readability ≤ 6th grade, NLI-based semantic fidelity ≥ 0.85, factual consistency check against source. Failures → retry or escalate.
6. **Rendering + feedback** — React components render the adapted UI. User feedback (comprehension ratings, interaction patterns) feeds back for profile refinement.

**User profiles** cover: visual (low vision subtypes, colour blindness), cognitive (intellectual disability, dyslexia, low literacy, memory difficulties), auditory (hearing loss), motor (limited fine motor), and combined profiles. Severity levels (mild/moderate/severe) modulate adaptation intensity.

**Normative backbone:** WCAG 2.2 (AA/AAA), EN 301 549 (EU accessibility directive), ISO 24495-1 (plain language), W3C COGA (cognitive accessibility). Each DAR cites specific clauses.

**SysML v2 formalisation:** The entire architecture (domain model, user profiles, adaptation rules, DAR chains, quality gates) is modelled in SysML v2. This isn't just documentation — SysML v2 blocks, requirements, and satisfy/trace relationships provide machine-readable traceability. In principle, the SysML model could drive code generation for the adaptation pipeline.

## Extracted concepts

- [[normative-grounded-adaptation]] — new
- [[content-structure-adaptation-split]] — new
- [[adaptation-quality-gates]] — new
- [[context-driven adaptation]] — updated (this paper operationalises what OADAPT theorised)
- [[programmable-router]] — updated (this paper validates the pattern in the adaptation domain)
- [[guardrailed generative UI]] — updated (normative grounding as a fourth guardrail layer)
