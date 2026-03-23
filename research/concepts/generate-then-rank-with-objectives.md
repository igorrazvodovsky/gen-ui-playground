---
type: concept
tags: [specification, model-evolution, generative-ui]
sources: [just-in-time-objectives]
created: 2026-03-12
---
Applying an induced objective to both sides of a generate-then-rank architecture: the generator produces candidates steered by the objective (gen_objective), and the evaluator scores candidates against the objective (eval_objective). The objective acts as a lightweight, user-specific optimisation target that can be bolted onto existing LLM pipelines without restructuring them.

## Context

Generate-then-rank (also: generate-and-verify, actor-critic, best-of-N sampling) is a standard pattern for improving LLM output quality. The typical version uses generic quality criteria for ranking. The insight here is that replacing generic criteria with a user-specific objective produces dramatically better results — 66–86% win rates over unsteered baselines — because the objective focuses both generation and evaluation on what actually matters to this user right now. The objective is implemented as a simple prompt prepend (for generation) or JSON spec addition (for evaluation), making it trivially composable with existing systems.

## Connections

- Depends on [[just-in-time-objective-induction]] — the objective is the input
- Instance of [[programmable-router]] — the objective routes generation toward the user's goal, functioning as a lightweight steering signal rather than a full pipeline restructure
- Relates to [[adaptation-quality-gates]] — eval_objective is structurally similar to quality gates (both evaluate generated output against criteria), but gates check minimum quality while JIT evaluation optimises for user-specific relevance
- Extends [[three-alignment-gulfs]] — specification alignment is handled by the induced objective, evaluation alignment is handled by eval_objective. Process alignment (how the system gets there) remains unaddressed by this pattern
- Supports [[outcome-oriented-verification]] — the eval_objective produces a score that could feed into a requirements/assumptions decomposition for post-generation review

## Practical implementations

- Poppins (Lam et al., 2026) — gen_objective as prompt prepend, eval_objective as JSON spec addition to LLM-as-a-judge prompts
- The pattern is generic: any system with a generation step and an evaluation step can add objective steering. The paper demonstrates it on text feedback, tool design specifications, expert generation, and code evaluation

## Relevance to project

The pipeline already has multiple generation and evaluation touchpoints: task analysis, pattern selection, spec generation, attribute reformulation, adaptation. Each of these could benefit from objective steering. The practical question is granularity — one top-level objective steering the whole pipeline (as JIT does), or per-stage objectives derived from the top-level one? The current architecture's [[semantic-intermediate-layer]] and intent decomposition already decompose user intent into structured slots; JIT objectives could serve as the *upstream input* to that decomposition, providing the "why" while the semantic layer provides the "what."

The eval_objective pattern is particularly relevant for the post-generation verification loop. Currently the pipeline proposes requirements/assumptions decomposition — JIT evaluation could automate the first pass of this, scoring generated output against the induced objective before the user reviews.

## Open threads

- Diminishing returns beyond N=10 samples in Study 2 (only 3.5% improvement from N=10 to N=100). Is this a ceiling of the objective's specificity, or of the generation model's capability? For the pipeline, this suggests a small number of candidates with good objectives beats many candidates with generic criteria.
- The paper uses the same objective for both generation and evaluation. Could asymmetric objectives work better — a broader objective for generation (encourage diversity) and a tighter one for evaluation (select for fit)?
