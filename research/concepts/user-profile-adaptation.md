---
type: concept
tags: [adaptation, user-context, personalisation, specification]
sources: ["sources/oadapt-ontology-based-UI", "sources/ontology-specification", "sources/llm-driven-accessible-interface"]
created: 2026-03-11
---
Adaptation rules driven by a **declared user profile** — stable characteristics the user states or the system imports from OS-level settings: disabilities, experience level, language, preferences. These feed deterministic rules that modify the UI spec before or during rendering. The rules are auditable, WCAG-traceable, and don't require LLM inference.

## Context

OADAPT's User Profile Ontology (UPO) contains a detailed taxonomy: disabilities (vision, auditory, cognitive, physical — each with subtypes), experience level (basic/average/high), preferences, language, education, age. These feed into **adaptation modes** — an intermediate abstraction layer of 14 UI Customisation Types (Dark Mode, Contrast Mode, Font Mode, Screen Reader Mode, Voice Command Mode, etc.) that decouple user traits from implementation. The relationship is many-to-many: multiple disabilities can trigger the same mode (low vision AND contrast sensitivity → Contrast Mode), and one disability can trigger multiple modes (blindness → Screen Reader Mode ∧ Voice Command Mode).

**30 concrete rules (R1–R30)** in first-order logic, derived from WCAG:
- Auditory disability → Caption Transcript Mode ∨ Readable Interface Mode
- Blindness → Screen Reader Mode ∧ Voice Command Mode
- Light sensitivity → Contrast Mode
- ADHD → Readable Interface Mode ∧ Basic Experience Mode
- RSI → Voice Command Mode ∧ Gesture Navigation Mode

Three mutual exclusion constraints prevent conflicts: Desktop ⊕ Mobile, Light ⊕ Dark, exactly one experience mode.

Whether these rules need to be expressed as first-order logic or as simple if-then conditions is a separate question from whether the *knowledge content* is useful. The rules themselves are essentially a WCAG-grounded lookup table.

## Connections

- **Part of** [[context-driven adaptation]] — user profile adaptation is the stable, declared side of context-driven adaptation. The volatile, sensed side is [[environment-driven-adaptation]].
- **Operationalised by** [[normative-grounded-adaptation]] — Jerry et al. add formal standards traceability (DARs) so every adaptation traces to a specific WCAG clause.
- **Split by** [[content-structure-adaptation-split]] — structural adaptations (contrast, layout, modality) are deterministic rules (this concept); content adaptations (simplification, pictograms) use the LLM.
- **Verified by** [[adaptation-quality-gates]] — after content adaptations, automatic quality checks (readability, semantic fidelity, factual consistency).
- **Distinct from** [[inferred-user-model]] — the declared profile is what the user *states*; the inferred model is what the system *believes*. Both matter: declared for reliable, auditable adaptations; inferred for everything else.
- **Extends** [[constraint-driven component selection]] — domain constraints select *which* component; user profile constraints select *which variant* or add accessibility modifications.

## Practical implementations

- **OS-level accessibility**: macOS Accessibility, Windows Ease of Access, Android TalkBack — system-wide profile → UI adaptations.
- **CSS `prefers-*` media queries**: `prefers-color-scheme`, `prefers-reduced-motion`, `prefers-contrast` — browser-level user context.
- **Enterprise RBAC-driven UIs**: Role → different UI views per role. User role as context.
- **OADAPT's formal ontology network**: domain ontology ↔ user profile ontology ↔ adaptive interface ontology ↔ UI elements ontology.

## Relevance to project

For the LLM-driven pipeline, profile-based adaptation works best as **post-processing rules**: LLM generates a base UI spec for a canonical user profile, a separate rule engine applies adaptation modifications. "Find all text < 16px → set to 16px. Find all colour-only indicators → add pattern overlay." Deterministic, auditable, WCAG-compliant.

Softer adaptations (experience level, preferences) could alternatively be handled as LLM context: "Generate for an expert user" vs. "Generate for a novice." The hybrid: deterministic rules for accessibility, LLM context for preference.

OADAPT's conceptual/operational distinction maps to the architecture: conceptual = pattern library + user profile schema (reusable, application-independent); operational = catalog + constraint rules + adaptation rules (machine-readable, runtime).

## Open threads

- Should the user profile model be standardised across systems or system-specific?
- The 30 rules cover disabilities but say nothing about preference-based adaptation ("user prefers tabs over accordions"). [[fluid-attributes]] and [[cross-task-user-knowledge]] extend into this territory.
- OADAPT's conceptual/operational distinction — is the full ontology overhead justified, or can simple JSON schemas + if-then rules capture enough?
