---
type: concept
tags: [specification, component-mapping, generative-ui, data-model]
sources: ["sources/wysiwid"]
created: 2026-03-13
---

A synchronisation is a declarative event-based rule with a when/where/then structure that mediates between independent concepts (or components) without introducing coupling. "When these actions happen, where the current state satisfies these conditions, then execute these follow-on actions." Synchronisations replace procedural glue code — route handlers, controllers, middleware — with a small, inspectable set of declarative rules.

WYSIWID (Meng & Jackson, 2025) evolved Jackson's original synchronisation mechanism. The original had limitations: complex causal model mixing CSP-like rendezvous with stimulus/response, transaction complications, difficulty with set operations and error handling. The new scheme follows simple event-based causality (when X completes, do Y), uses free/bound variables for implicit quantification over sets, and eliminates the need for transactions by allowing synchronisations to fire on action failures. The language is deliberately small: sync name, when clause (action completion patterns), where clause (state queries), then clause (action invocations). This smallness matters for LLM generation — WYSIWID's case study showed LLMs could generate synchronisations from concept specs, though iteration was needed.

## Context

Most reactive frameworks (React, Vue, Svelte) handle UI-layer dataflow declaratively, but cross-concept or server-side coordination still relies on procedural code. Synchronisations offer a middle path: declarative enough for LLM generation and human inspection, procedural enough to handle complex orchestration.

## Connections

- **Alternative to** [[declarative-concept-binding]] — Déjà Vu uses template bindings (property/event syntax); WYSIWID uses synchronisation rules. Both achieve concept independence but through different mechanisms.
- **Extends** [[concept-as-composition-unit]] — synchronisations are the WYSIWID-specific composition mechanism.
- **Enables** [[concept-as-behavioural-annotation]] — in the revised pipeline, synchronisation-style rules would be the format for the thin behavioural layer that activates when concepts are needed.
- **Connects to** [[specification-based rendering]] — synchronisations are declarative specifications. They could be generated, inspected, and modified through the same pipeline machinery.
- **Connects to** [[accretive-extensibility]] — adding a new synchronisation extends behaviour without modifying existing ones. This is the additive-only principle Varv uses for concept definitions.

## Practical implementations

Event-driven architectures (Kafka consumers, AWS EventBridge rules). Zapier/n8n/Make workflow rules (when trigger fires, check conditions, execute actions). Database triggers (when row updated, if condition, then cascade). Redux middleware that watches for specific actions and dispatches follow-on actions. CSS @container queries (declarative rules that fire based on state).

## Relevance to project

For the genUI pipeline, synchronisation-style rules could serve as the behavioural layer's representation format. When the pipeline detects non-trivial cross-component behaviour, it generates declarative rules rather than procedural code. These rules would be: inspectable by the user (unlike buried event handlers), LLM-generatable (small, structured language), and accretively extensible (add rules without modifying existing ones). The rule layer starts empty and fills up as behavioural complexity demands it.

## Open threads

- WYSIWID's synchronisations are backend-focused (server-side actions, database state). What would UI-layer synchronisations look like? Is "When the filter changes, update the visible items in the list" redundant in reactive frameworks?
- How do synchronisations interact with the model hierarchy? Do they sit at the task model level, the dialog level, or cut across levels?
- The WYSIWID case study needed iteration for synchronisation generation. Is this a current LLM limitation or an inherent difficulty with cross-concept rules?
