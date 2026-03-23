---
type: concept
tags: [generative-ui, specification, component-mapping]
sources: ["sources/ag-ui-protocol"]
created: 2026-02-27
---
Generative UI should be split into two distinct steps: the reasoning agent specifies *what* UI is needed (description, pre-populated data, expected output schema), and a separate, specialised generator produces *how* to render it (actual components in JSON Schema, React, HTML, or any other format). The agent never generates UI directly.

## Context

AG-UI's draft generative UI proposal injects a `generateUserInterface` tool that the agent calls with three arguments: a high-level description ("a form that collects a user's shipping address"), pre-populated data (initial field values), and an output JSON Schema (required fields, types, constraints, enums). A secondary LLM or generator — focused solely on UI generation — consumes these parameters and produces the actual interface.

The rationale: context window constraints. A reasoning agent juggling conversation history, tool results, and task logic doesn't have the bandwidth to also produce high-fidelity UI. A dedicated generator, working from a clean specification, produces better results. It's the same principle as compilation: the programmer writes high-level intent, the compiler handles the low-level translation.

Developers retain full control of the second step — they can swap generators, add custom component libraries, include additional prompts, or use entirely different UI frameworks.

## Connections

- **Refines** [[specification-based rendering]] — spec-based rendering says "UI is data (JSON specs), not code." Two-step generative UI adds: "and the spec should be produced by a specialist, not the reasoning agent." The spec is still the intermediate representation, but the generation responsibility is split.
- **Validates** [[pattern-driven transformation]] — the two-step model maps directly onto the pattern approach. Step 1 (agent specifies *what*) is pattern selection and instantiation — choosing which patterns fit the task. Step 2 (generator produces *how*) is the transformation from abstract patterns to concrete component specs. The agent handles task-level reasoning; the generator handles UI-level rendering.
- **Aligns with** [[abstract-concrete-separation]] — step 1 produces the abstract layer (what's needed semantically), step 2 produces the concrete layer (how it's rendered). Varv's abstract/concrete split applied to the generation process itself.
- **Extends** [[guardrailed generative UI]] — the two-step model is itself a guardrail. The reasoning agent can't produce arbitrary UI — it can only specify structured requirements (description + data + schema). The generator is constrained by the developer's component library and prompts. Neither step alone can produce unsafe output.
- **Relates to** [[programmable-router]] — the decision of *which* generator handles step 2 is a routing decision. Different UI types might use different generators: a form generator for data collection, a dashboard generator for analytics, a narrative generator for reports. The router picks the specialist.
- **Relates to** [[ai-attribute-reformulation]] — Meridian's per-attribute LLM reformulation is a micro version of the same two-step pattern. The data pipeline specifies *what* attribute value is needed (raw data + transformation intent); a small, cheap LLM produces *how* (reformulated text, computed score, sentiment badge). Same separation, different granularity.
- **Connects to** [[knowledge-graph-grounded-generation]] — the agent's step 1 output (description + data + schema) is a structured query into the UI generation space, similar to how Fareedi et al.'s agents produce Cypher queries into a knowledge graph. The agent doesn't generate into a void — it generates a grounded specification.
- **Contrasts with** the pipeline's current model — the genUI pipeline assumes a single LLM handles everything from task analysis through spec generation. Two-step suggests the pipeline might benefit from specialisation: a reasoning model for task analysis and intent decomposition, a generation model for spec production, perhaps a third model for attribute reformulation.

## Practical implementations

- **AG-UI `generateUserInterface` tool** — the draft reference implementation
- **A2UI (Google)** — JSONL-based declarative generative UI spec, one of three specs AG-UI natively supports
- **Open-JSON-UI (OpenAI)** — open standardisation of OpenAI's internal declarative UI schema
- **MCP-UI (Microsoft + Shopify)** — iframe-based generative UI extending MCP for user-facing applications
- **Vercel AI SDK + UI components** — similar pattern: LLM generates structured data, React components render it. The RSC (React Server Components) approach where the server decides *what* and the client renders *how*.
- **Figma AI** — design intent → generated layout. The user describes what they want; the system produces the design. Same two-step separation.

## Relevance to project

This validates and sharpens the pipeline architecture. The current pipeline sketch is:

```
User prompt → Task analysis (LLM) → Data model → UI spec → Rendered UI
```

Two-step generative UI suggests this should really be:

```
User prompt → Task analysis (reasoning LLM) → Structured requirement (description + data + schema)
  → UI generation (specialist LLM/generator) → UI spec → Rendered UI
```

The "structured requirement" is the pivot point. It's richer than a raw prompt but simpler than a full UI spec — it captures *what* the UI should do without prescribing *how*. This maps naturally to the [[semantic-intermediate-layer]]: Park et al.'s semantic slots (Product goal, Design System choices, Feature IA, Component details) could serve as the structured requirement format. The reasoning agent fills the slots; the generator compiles them to specs.

The output schema in AG-UI's tool definition is particularly interesting. It defines what data the generated UI should collect — essentially specifying the UI's *contract* with the rest of the system. For the genUI pipeline, this means the data model and the UI spec are linked by a formal contract (JSON Schema), not just convention.

This also suggests the pipeline might benefit from **multiple specialised generators** rather than one monolithic LLM. Task analysis needs reasoning capability (large model). UI spec generation needs design knowledge (could be a smaller, fine-tuned model). Attribute reformulation needs language skill (small, cheap model). The two-step principle applied recursively.

## Open threads

- What's the right format for the step-1 output? AG-UI uses description + data + output schema. The pipeline's pattern-driven approach would use pattern selections + variable bindings + constraint rules. Are these equivalent, or does one carry more information?
- How much design knowledge should the reasoning agent have? If it specifies "a kanban board," does it need to know what a kanban board looks like, or just what it does? The less the agent knows about UI, the cleaner the separation — but the more the generator has to infer.
- Can the two-step model support iterative refinement? If the user says "make the date column sortable," does that go back to step 1 (agent updates the requirement) or directly to step 2 (generator modifies the spec)? The [[scoped-semantic-editing]] principle suggests it should go through step 1 to prevent semantic drift.
- Three competing generative UI specs (A2UI, Open-JSON-UI, MCP-UI) suggest the step-2 output format is far from settled. Does the pipeline need to be format-agnostic, or can it commit to one?
