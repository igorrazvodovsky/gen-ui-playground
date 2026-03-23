---
type: concept
tags: [process, transformation, models]
sources: ["sources/model-based-UI-with-patterns"]
created: 2026-02-08
---
Interface generation as stepwise refinement through abstraction layers. Start with user requirements, derive task model, transform to dialog model, transform to presentation model, transform to layout model, render final UI. Each transformation adds detail while preserving semantics from previous layers. The process is iterative — evaluate at each layer and refine upward if needed.

## Context

Direct code generation from requirements is brittle — small requirement changes force wholesale rewrites. Intermediate models create edit points. Change the task model, regenerate downstream. Change the presentation model, only layout needs updating.

The derivation process isn't strictly waterfall despite the layered appearance. The paper emphasises iteration: create task model → derive dialog → evaluate → refine task → rederive. Each model serves as both output (artefact to evaluate) and input (constraint for next layer).

## Connections

- **Implemented by** [[model hierarchy]] — the layers through which derivation flows
- **Uses** [[pattern-driven transformation]] — the mechanism for moving between layers
- **Related to** [[gentle slope]] — derivation layers are intervention points for increasing user involvement
- **Contrasts with** one-shot generation — derivation assumes multiple refinement cycles

## Practical implementations

Few production systems implement full iterative derivation, but elements exist:
- **v0 by Vercel**: Prompt → UI generation with iterative refinement through user feedback
- **Figma → Code tools**: Design (abstract) → Code (concrete) with manual intervention points
- **GraphQL Codegen**: Schema → TypeScript types → React components (partial derivation)
- **Prisma**: Database schema → Client API → UI queries (data derivation)

Most practical systems do **direct generation** (skip intermediate layers) rather than stepwise derivation. The full derivation process is primarily academic.

## Relevance to project

The target pipeline *is* a derivation process:
```
Prompt → Task analysis → Data model → UI spec → Rendered UI
```

But there's a critical difference: traditional MBUI assumes *human* evaluation and refinement at each layer. Generative UI needs to work automatically.

Two approaches:

**1. LLM-as-evaluator:** LLM generates task model, evaluates it against user intent, refines, then proceeds to next layer. Slow but thorough.

**2. Direct derivation:** LLM generates all layers in one shot based on learned transformation rules. Fast but less reliable.

Hybrid approach: Direct generation with **verify-and-refine** checkpoints. Generate full pipeline, then validate each layer:
- Task model validation: does it capture user intent?
- Dialog model validation: is the navigation sensible?
- Presentation model validation: are components appropriate for data types?
- Layout model validation: does it render without errors?

Failures trigger localised regeneration — only regenerate the failing layer and downstream, not the whole pipeline.

**Key insight:** The more explicit you make the intermediate models, the easier validation becomes. JELLY's approach (skip intermediate layers) makes generation faster but validation harder.

## Open threads

- Can derivation be parallelised? Generate multiple candidate task models, derive all of them, pick best result?
- How do you handle derivation failures? Backtrack to previous layer or restart from scratch?
- What's the cost of full derivation vs. direct generation? Is the reliability gain worth the latency?
- Can users step through the derivation process, inspecting intermediate models?
