---
type: concept
tags:
  - generative-ui
  - specification
  - model-evolution
sources:
  - "[[Adaptive GenAI-Native Systems.pdf|Adaptive GenAI-Native Systems (Vandeputte, Nokia Bell Labs, 2025)]]"
created: 2026-02-24
---

Replace binary pass/fail validation with a utility-based quality spectrum: "good enough for this context" rather than "correct or incorrect." Generated outputs are evaluated against graduated sufficiency thresholds that vary by use case, user expertise, and task criticality.

## Context

Traditional software testing uses binary assertions: the output is correct or it isn't. GenAI outputs don't work this way — a generated UI spec can be usable but suboptimal, structurally sound but aesthetically poor, or perfect for one user and confusing for another. Vandeputte proposes "utility-based sufficiency criteria" as the replacement: define what "good enough" means for each output, measure on a continuous scale, and accept anything above the threshold.

The key move is making the threshold context-dependent. A quick exploratory UI for a data analyst might accept a lower sufficiency bar (layout roughly right, data bindings correct, aesthetics don't matter). A customer-facing dashboard needs a much higher bar. The same generation pipeline, different quality gates.

## Connections

- **Extends** [[augmented-semantics]] — Park et al.'s extraction of what the AI actually implemented provides the raw signal for sufficiency evaluation. You can't assess quality without first knowing what was produced.
- **Supports** [[semantic-intermediate-layer]] — the semantic decomposition (Product → Design System → Feature → Component) gives you *per-slot* sufficiency criteria rather than a single holistic score. "Colour palette is sufficient but typography choice is below threshold" is actionable; "the UI is 73% good" is not.
- **Relates to** [[programmable-router]] — the router decides which processing path to use; sufficiency criteria determine whether the output of that path is acceptable or needs escalation to a more capable (expensive) path.
- **Relates to** [[scoped-semantic-editing]] — when sufficiency is below threshold on specific semantic dimensions, those dimensions become refinement targets rather than triggering full regeneration.
- **Relates to** [[constraint-driven component selection]] — deterministic constraint rules produce outputs that are definitionally "sufficient" (correct by construction). Sufficiency criteria are primarily needed for the LLM-generated portions.

## Practical implementations

- **LLM-as-judge** patterns (using a second LLM call to evaluate the first) are the most common current implementation. OpenAI Evals and similar frameworks use this approach.
- **Rubric-based evaluation** in education: holistic vs. analytic rubrics map directly to holistic sufficiency ("is this UI good?") vs. dimensional sufficiency ("is the layout good? is the data binding correct? is the interaction model clear?").
- **Canary deployments** in software — serving a new version to a subset and measuring quality metrics before full rollout — apply the same graduated acceptance principle.
- **Design critique frameworks** (heuristic evaluation, cognitive walkthrough) already use multi-dimensional quality assessment. Nielsen's heuristics are essentially sufficiency criteria for usability.

## Relevance to project

Answers an open question lurking in the pipeline: how do you know if a generated spec is good enough to render? Currently implicit — the spec either validates against the Zod schema (structural correctness) or it doesn't. But structural correctness is necessary, not sufficient. A spec can be valid JSON with valid component types and still produce a terrible UI.

Sufficiency criteria suggest a two-tier validation approach:

1. **Structural validation** (existing) — does the spec conform to the catalog schema? Binary, deterministic, fast. This is the floor.
2. **Quality validation** (new) — does the spec meet sufficiency thresholds for the relevant semantic dimensions? Graduated, possibly LLM-evaluated, context-dependent. This is the quality gate.

The quality tier could use [[hierarchical-design-semantics]] as the evaluation framework: score each semantic slot (visual mood, colour, layout strategy, interaction model) independently, flag any below threshold, and either auto-refine via [[scoped-semantic-editing]] or surface to the user for correction.

- **Paralleled by** Pareek et al. (CHI '26) — their central finding about multi-agent LLM transparency is structurally identical to this concept, but applied to *transparency* rather than *generation quality*. Users didn't want maximum transparency into agent reasoning; they wanted "contextually sufficient" transparency — just enough to support their decision-making without drowning in detail. They call this a "Goldilocks zone" and find it's shaped jointly by task demands, user expertise, and dispositional trust. The framing "sufficiency judgement, not a volume dial" maps directly: transparency isn't binary (opaque vs. transparent) just as quality isn't binary (pass vs. fail). Both are context-dependent continuous assessments where "enough for this context" replaces "maximally correct." This suggests sufficiency criteria should apply not just to generated specs but to every user-facing output of the pipeline, including transparency artefacts themselves (semantic layers, intent decompositions, quality reports). Showing too much verification detail can erode trust just as showing too little does.

## Open threads

- Who sets the sufficiency thresholds? System defaults? User preferences? Task-type-specific profiles? Probably all three, layered.
- How to avoid the LLM-as-judge problem of the evaluator having the same blind spots as the generator? Different model? Different prompt framing? Human calibration?
- Is there a meaningful distinction between "sufficiency for initial render" (lower bar — get something on screen fast) and "sufficiency for final output" (higher bar — polished result)? Progressive quality refinement — render immediately, improve in background?
