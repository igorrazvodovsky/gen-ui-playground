---
type: concept
tags: [specification, generative-ui, data-model]
sources: ["sources/varv"]
created: 2026-02-11
---
The entire interactive application — not just the UI, but also its behaviour, state shape, event handling, and data bindings — is represented as an inspectable, modifiable data structure (JSON in Varv's case). There is no imperative code hidden behind the specification; the data structure *is* the program.

## Context

[[specification-based rendering]] captures the idea that UI should be declared as data (JSON specs → rendered components). Software-as-data-structure extends this principle to the whole application. In Varv, the JSON doesn't just describe layout — it describes state schemas, state transition rules (actions), event bindings (triggers), view templates, and data storage mappings. The runtime interprets this data structure to produce a working interactive application.

This is a stronger claim than "configuration-driven" or "low-code." Configuration assumes there's real code underneath doing the work, with knobs exposed for tuning. Software-as-data-structure means the data structure *is* the complete program — there is no separate implementation to fall back on (Varv does allow escape-hatch custom JavaScript actions, but the primary authoring model is declarative).

The payoff is toolability. Because the program is data, you can build generic tools that work on any program: inspectors that browse state, editors that modify behaviour, analysers that reason about event flow, merge engines that combine programs. None of these tools need to understand the specific application — they operate on the universal data structure.

## Connections

- **Extends** [[specification-based rendering]] — spec-based rendering is the UI-only subset of this idea. Software-as-data-structure applies the principle to the full stack (state, logic, bindings, not just layout).
- **Enables** [[accretive-extensibility]] — merging declarative data structures is tractable (JSON merge); merging imperative code is not. The data structure representation makes extension-by-addition possible.
- **Enables** [[in-place toolchain]] — generic inspection/editing tools can be built because the program has a known, universal structure. Varv's data inspector and view inspector are concrete examples.
- **Relates to** [[json-document-backed-components]] — DFRP treats the JSON document as the model that drives the view. Software-as-data-structure goes further: the JSON also encodes behaviour and event handling, not just state.
- **Relates to** [[ontology-driven UI generation]] — ontologies also represent application knowledge as structured data (OWL/RDF). The difference: ontologies focus on domain knowledge and constraints; software-as-data-structure focuses on interactive behaviour.
- **Relates to** [[LLM-operable interface]] — if the application is a data structure, an LLM agent can read, reason about, and modify it without needing to understand imperative code. The data structure becomes the API surface for AI.

## Practical implementations

- **Varv** — the reference implementation. Entire interactive apps as JSON concept definitions.
- **Vega / Vega-Lite** — declarative JSON specifications for interactive data visualisations. Not full applications, but the same principle applied to the visualisation domain.
- **Webflow / Framer** — store site structure as a data model that the runtime interprets. Closer to "configuration-driven" but trending toward full-program representation.
- **Retool / Airplane** — internal tool builders where the "application" is a JSON document describing components, data sources, and logic.
- **Scratch / Blockly** — visual programming environments where the "code" is a data structure (blocks) that the runtime interprets. No text code involved.
- **Terraform / Pulumi** — infrastructure-as-code where the infrastructure definition is a declarative data structure (HCL/JSON).

## Relevance to project

This significantly reframes what the genUI pipeline's output should be. Currently the pipeline targets json-render specs (UI only). Varv suggests the output should be richer: a data structure that encodes not just what to render, but how the rendered elements behave, what state they manage, and how they respond to user interaction.

For M2 (intermediate representation design), this means the IR probably needs:
- **Schema** — what entities exist and their properties (already planned)
- **Actions** — what state transitions are valid (not yet considered)
- **Triggers** — what events cause which state transitions (not yet considered)
- **View bindings** — which entity properties render as which components (already planned as mapping rules)

Varv's concept language is one possible shape for this IR. The question is whether the genUI pipeline needs behaviour specification at all, or whether it can rely on component-level behaviour (each component handles its own interactions). The answer likely depends on whether cross-component coordination is needed — and based on [[UI composition]], it is.

## Open threads

- Is full software-as-data-structure needed, or is spec-based rendering + component-level behaviour sufficient? Varv's approach is maximalist; the pragmatic minimum might be: UI spec + state schema + action rules (no triggers, no low-level event handling).
- How does an LLM generate behaviour specifications? Generating UI layout is already challenging; generating correct state transition logic is significantly harder. Can the behaviour be inferred from patterns rather than generated from scratch?
- Performance: interpreting a data structure at runtime has overhead vs. compiled code. Varv runs client-side in a browser — is this fast enough for complex applications?
