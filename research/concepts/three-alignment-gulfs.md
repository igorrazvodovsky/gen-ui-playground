---
type: concept
tags: [specification, intent, user-agency, generative-ui]
sources: [sources/interactive-ai-alignment]
created: 2026-03-06
updated: 2026-03-11
---
Norman's two gulfs (Execution, Evaluation) assumed the user invokes specific operations and assesses results. When AI shifts interaction to outcome specification — the user describes *what* they want, not *how* to get it — the gulf structure changes. Three gulfs replace two:

1. **Specification Gulf**: user and AI must align on what the desired outcome is. Bidirectional: the AI also needs to communicate its capabilities.
2. **Process Gulf**: user and AI must align on how the outcome will be achieved. *New* — traditional systems have designer-defined operations. AI systems choose their own, often opaquely.
3. **Validation Gulf**: user must verify the output meets their objective *and* understand what was produced. Stronger than Norman's Evaluation.

The sobering observation: each gulf may be *theoretically impossible* to fully bridge as AI capability grows. You can't fully enumerate a general system's capabilities (Specification). You can't fully explain neural computations (Process). You may not be able to fully understand output that exceeds human expertise (Validation). The design challenge is *reducing* these gulfs to appropriate levels, not eliminating them.

## Gulf → solution concept mapping

This framework organises the pipeline's alignment mechanisms. Each gulf has specific concepts that address it:

### Specification Gulf — "do we agree on what to build?"
- [[intent-decomposition]] — externalise and structure the user's intent as editable hierarchy with typed dimension controls
- [[semantic-intermediate-layer]] — visible, editable design semantics between intent and output
- [[graduated-ambiguity-tolerance]] — accept intent at any precision level per-dimension
- [[intent-tag-as-micro-prompt]] — bottom-up user-driven intent construction
- [[reflection-in-intent]] — mirror the user's own intent structure back to them
- [[grounding-by-example]] — specify intent by pointing, not describing
- [[meta-intent-elicitation]] — help users discover intent they haven't articulated
- [[intent-specification-as-common-ground]] — persistent document accumulating shared understanding

### Process Gulf — "do we agree on how to build it?"
- [[externalised-LLM-understanding]] — make the model's task interpretation visible as editable graph
- [[surrogate-process]] — manipulable proxy for the opaque generation process
- [[parallel-state-display]] — continuous visual instrumentation of internal state
- [[interleaved-plan-execute]] — show and revise the plan as execution proceeds
- **Caution**: [[process-induced-overreliance]] — detailed process traces can *reduce* error detection. **Temporal design principle**: process transparency *before* generation (for steering), outcome transparency *after* (for verification).

### Validation Gulf — "did we get what we wanted?"
- [[outcome-oriented-verification]] — decompose output into Requirements + Assumptions. 77% error detection vs. 39% for process traces.
- [[augmented-semantics]] — extract what the AI actually implemented, in the same vocabulary as input
- [[intent-output-traceability]] — bidirectional linking between intent parameters and output elements
- [[adaptation-quality-gates]] — automatic verification after LLM-driven transformations
- [[impact-analysis-before-generation]] — show what will be affected before committing
- [[cognitive-engagement-for-reliance]] — appropriate reliance requires active analytical engagement

## Context

Norman's original gulfs were designed for deterministic, operation-based systems. The shift to outcome-based AI interaction doesn't just widen the existing gulfs — it creates a qualitatively different gap (Process) that traditional UI design never had to address.

## Connections

- **Refines** [[semantic-drift]] — drift is what happens when the Specification Gulf persists across iterations
- **Extends** [[bidirectional-ambiguity]] — bidirectional ambiguity is the compound of Specification Gulf (user → AI) and Process Gulf (AI → user)
- **Challenged by** [[process-induced-overreliance]] — the Validation Gulf finding that improved tools increased false confidence (Hedges' g: 0.85)

## Practical implementations

No production systems implement all three well. Analysis of existing systems:
- Midjourney: weak specification (text only), minimal process, minimal validation
- CoPilot: implicit specification (code context), partial process (block public code), basic validation (run the code)
- Liu et al.'s spreadsheet synthesis: strong specification + process through surrogate pseudocode

## Relevance to project

This is an organising framework for the entire pipeline. Each stage maps to an alignment problem:
- **Task analysis** = specification alignment — bridging prompt → structured task model
- **UI generation** = process alignment — visibility into pattern and component selection
- **Rendered output** = validation alignment — verifying the UI does what was wanted

The pipeline has strong specification alignment (intent decomposition, semantic layer) and growing validation alignment (augmented semantics, traceability). **Process alignment is the weakest area** — no mechanism yet for users to observe or control how the LLM navigates the pattern library.

## Open threads

- Multi-party alignment (teams using the same generated UI) introduces alignment *among* users.
- Where on "full alignment before acting" ↔ "act first, align retrospectively" should each stage sit?
- The Validation Gulf false confidence finding tempers optimism about verification checkpoints.
