---
type: concept
tags: [generative-ui, user-agency, specification]
sources: [sources/llm-driven-accessible-interface]
created: 2026-02-24
---
Adaptation rules should trace to specific, citable accessibility standards — not be ad hoc heuristics or LLM-inferred preferences. The mechanism is a **Derived Accessibility Requirement (DAR)**: a formal chain linking user need → adaptation requirement → implementation rule → normative reference (specific clause of WCAG 2.2, EN 301 549, ISO 24495-1, W3C COGA, etc.). Every adaptation the system applies can be audited: *why* was this change made, *for whom*, and *which standard mandates it*?

## Context

The OADAPT papers ([[context-driven adaptation]]) established that adaptation should be a separate architectural layer driven by user profiles. Their 30 WCAG-derived rules map disability types to UI customisation modes. But OADAPT's rules are expressed in first-order logic within an ontology — the normative grounding is implicit (the rules *implement* WCAG, but the specific clause citations aren't part of the data structure).

Jerry et al. make the normative link explicit and machine-readable. Each DAR carries its standards references as metadata. This matters for two reasons: (1) auditability — in healthcare and government contexts, you need to prove compliance, not just achieve it; (2) rule maintenance — when standards update (WCAG 2.2 → 3.0), you can trace which rules need revision by following the normative references.

## Connections

- **Extends** [[context-driven adaptation]] — adds formal standards traceability to OADAPT's adaptation rule model. OADAPT says *what* to adapt; normative grounding says *why*, with citable evidence.
- **Supports** [[guardrailed generative UI]] — normative grounding is a fourth guardrail layer alongside schema validation, component whitelisting, and action constraints. It constrains *adaptation* decisions specifically.
- **Related to** [[constraint-driven component selection]] — both use deterministic rules rather than LLM inference for specific UI decisions. Constraint-driven selection handles data-type → component mapping; normative grounding handles user-profile → adaptation mapping. Same architectural principle (rule-based, auditable), different domain.
- **Enables** [[adaptation-quality-gates]] — the normative references define what "correct" adaptation means, which makes quality verification possible (you can check whether the output meets the standard's requirements).

## Practical implementations

- **WCAG 2.2** conformance testing tools (axe-core, Lighthouse accessibility audits) check output against standards but don't trace *why* each rule applies to a specific user. Normative grounding closes that loop.
- **EN 301 549** (EU accessibility directive) increasingly requires demonstrated compliance — traceable adaptation rules provide the evidence chain.
- **SysML v2** (as used by Jerry et al.) provides the formal backbone for requirement traceability, though lighter-weight implementations (JSON schemas with `normativeRef` fields) would work for the pipeline.
- **Healthcare accessibility frameworks** (HL7 FHIR accessibility extensions, NHS Digital Service Standard) implicitly require this kind of traceability.

## Relevance to project

Informs the **adaptation rules** segment of the pipeline. The current architecture sketch has "Adaptation rules (user context → spec modifications)" as a single step. Normative grounding says those rules should carry metadata: which standard, which clause, which user need. This doesn't change the pipeline *structure* — it changes the *data model* of the rules themselves.

For IR design ([[milestones#O2a — No intermediate representation|O2a]]): if the IR includes adaptation rules, those rules should be structured DARs, not bare if-then mappings. For intent-to-structure generation ([[milestones#Opportunity 4 — Natural language can't reliably become structured task models|O4]]): the LLM shouldn't invent adaptation rules — it should select from a pre-authored, normatively-grounded rule library. This is another instance of [[knowledge-graph-grounded-generation]] applied to accessibility.

## Open threads

- How heavy does the formalism need to be? Full SysML v2 requirement tracing is rigorous but expensive. A simpler approach: JSON rule objects with `normativeRef: "WCAG 2.2 §1.4.3"` fields. Is that enough for practical compliance?
- Does normative grounding extend beyond accessibility? Could design pattern choices trace to usability heuristics (Nielsen's 10, Shneiderman's 8 golden rules) in the same way? The mechanism generalises — any rule-based design decision could carry a rationale reference.
- Standards evolve. WCAG 3.0 is coming. The traceability chain enables impact analysis (which rules need updating), but who maintains the mapping?
