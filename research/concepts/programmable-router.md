---
type: concept
tags:
  - json-render
  - component-mapping
  - generative-ui
sources:
  - "[[Adaptive GenAI-Native Systems.pdf|Adaptive GenAI-Native Systems (Vandeputte, Nokia Bell Labs, 2025)]]"
  - "[[sources/llm-driven-accessible-interface]]"
created: 2026-02-24
---

Route each request through the cheapest processing path that can handle it — deterministic logic for routine cases, progressively more "cognitive" (LLM-powered) paths only when needed. Inspired by Kahneman's System 1 / System 2: fast, automatic processing handles the majority; slow, deliberate processing kicks in for genuinely ambiguous situations.

## Context

Vandeputte proposes a "programmable router" within each GenAI-native processing cell that triages incoming requests across multiple execution paths. The insight isn't the routing itself (load balancers have existed forever) — it's the explicit recognition that ~95% of requests in a mature system shouldn't touch the LLM at all. The router progressively escalates: cached response → rule-based logic → small model → full LLM → LLM with extended reasoning. Each step is slower and more expensive but handles a broader class of inputs.

The second half of the idea is equally important: **promote consistency over creativity**. As the system learns which inputs produce stable outputs, it should systematically harden those paths — moving them from LLM-generated to cached or rule-based. The system gets cheaper and more predictable over time, with the LLM reserved for genuinely novel situations.

## Connections

- **Extends** [[constraint-driven component selection]] — the constraint rules (cardinality → dropdown, boolean → checkbox) are exactly the "fast path" for component mapping. No LLM needed for leaf-level decisions.
- **Supports** [[guardrailed generative UI]] — the router is the architectural mechanism that keeps the LLM within guardrails by only invoking it when deterministic paths can't handle the request.
- **Supports** [[pattern-driven transformation]] — pattern matching and instantiation with known variables is a "medium path" (rule-based, not LLM). Only novel task structures or ambiguous pattern fits need the LLM.
- **Relates to** [[ai-attribute-reformulation]] — reformulation at data-time could use the same routing logic: cached reformulations for repeated data shapes, small model for routine transforms, full LLM only for genuinely novel content.
- **Validated by** [[content-structure-adaptation-split]] — Jerry et al. (2025) implement the programmable router pattern for accessibility adaptation. Structural adaptations (contrast, layout, font size) take the deterministic fast path; content adaptations (plain language simplification, pictogram generation) take the LLM path. The routing criterion is clear: if the adaptation is fully specifiable by standards (WCAG contrast ratios), use rules; if it requires judgement (simplifying medical text), use the LLM.
- **Validated by** [[optimisation-based-ui-adaptation]] — Stefanidi et al. (2022) demonstrate a fully deterministic adaptation path: ontology reasoning (SWRL rules) produces scores, a solver (Gurobi ILP) produces the optimal layout. No LLM at any point, running at ~0.02s per frame. This is the "fast path" applied to the entire adaptation problem — appropriate when the adaptation logic is fully specifiable and the domain is well-understood.

## Practical implementations

- **CDN / edge caching** is the simplest form: serve a cached response if available, compute only if not.
- **Feature flag systems** (LaunchDarkly, Unleash) route users through different code paths based on context — the same principle applied to feature rollout.
- **Cloudflare Workers AI** and similar edge-AI platforms implement tiered model routing: small models at the edge, large models in the cloud.
- In the genUI context, a concrete implementation: a spec cache keyed on (task type + data schema hash). If the same task type with the same schema shape has been generated before, serve the cached spec. If the schema is similar but not identical, apply rule-based transformations to the cached spec. Only generate from scratch when genuinely novel.

## Relevance to project

Directly informs the architecture of the generation pipeline. The three-layer mapping architecture already identified in the synthesis (patterns for macro structure, constraint rules for micro structure, LLM for edge cases) is a programmable router in disguise. Making the routing explicit means:

1. **Spec generation** — most field-to-component mappings are deterministic (string → text input, enum → dropdown). Only structurally ambiguous cases (should this entity group be tabs or accordion?) need LLM involvement.
2. **Attribute reformulation** — repeated reformulation prompts on similar data shapes should be cached, not re-run through the LLM each time.
3. **Pattern selection** — well-known task types (CRUD, search, dashboard) can be pattern-matched directly. The LLM is only needed for novel task structures or hybrid tasks.

The system should get faster and cheaper over time as more paths get hardened from LLM-generated to rule-based to cached.

## Open threads

- How to detect when a request has crossed the threshold from "rule-based can handle this" to "needs LLM"? Confidence scoring on pattern matching? Schema similarity metrics?
- What's the right caching granularity for specs? Full spec? Per-section? Per-component?
- How does the router interact with [[accretive-extensibility]]? If a user has overlays on a cached spec, and the cache is invalidated, do the overlays survive?
