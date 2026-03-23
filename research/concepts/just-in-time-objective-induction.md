---
type: concept
tags: [intent, specification, generative-ui, user-agency]
sources: [just-in-time-objectives]
created: 2026-03-12
---
Inferring a user's in-the-moment goal from passive observation of their context (a screenshot, visible document, browser state), then operationalising that goal as a structured object — name, description, importance weight — that can steer downstream AI systems. The key move: objective induction happens *without the user articulating anything*. The system watches, hypothesises, and presents the objective for review.

## Context

The problem this addresses is that LLMs default to generic output when given underspecified prompts — and most prompts are underspecified because users can't easily articulate what they want (the [[bidirectional-ambiguity]] problem from the user's side). Prior approaches attack this by structuring what users *say* — [[intent-decomposition]] breaks prompts into dimensions, [[intent-tag-as-micro-prompt]] offers bottom-up tagging. JIT objective induction skips the articulation step entirely: it derives objectives from what the user is *doing*, not what they *say*.

## Connections

- Extends [[meta-intent-elicitation]] — both surface goals the user hasn't stated, but JIT objectives do it passively (observation) rather than interactively (suggestions during specification)
- Complements [[intent-decomposition]] — IntentFlow structures intent the user has articulated; JIT induction surfaces intent the user hasn't. They could layer: induction generates initial objectives, decomposition lets the user refine them
- Enables [[generate-then-rank-with-objectives]] — the induced objective is the input to the gen/eval steering mechanism
- Addresses [[bidirectional-ambiguity]] from the input side — instead of improving prompt structure, it sidesteps prompting altogether
- Tension with [[intent-specification-as-common-ground]] — JIT objectives are ephemeral (per-moment), while SemanticCommit's intent specs are persistent (cross-session). A full system likely needs both: persistent specs for stable preferences, JIT objectives for in-the-moment task steering
- Related to [[inferred-user-model]] — both involve the system inferring things about the user, but the user model infers *who the user is* while JIT objectives infer *what the user wants right now*

## Practical implementations

- Poppins (Lam et al., 2026) — browser extension + web app, Claude Sonnet 3.7 for induction
- The chain-of-thought prompt structure (task domain → completion stage → audience → ideal output → user reaction → objectives) is a reusable pattern for any context-to-intent inference

## Relevance to project

Maps directly to the **pre-generation** pipeline, specifically the gap *before* intent decomposition — where do objectives come from in the first place? The current pipeline assumes a per-session prompt as input. JIT induction suggests the system could also derive objectives from observed context (the user's current workspace, open documents, recent actions) as a complement to explicit prompting. This is particularly valuable for the model evolution loop (`↺`): as the user works with the generated UI, their shifting context could trigger new objective induction without re-prompting.

For the pipeline's four-input model (persistent intent spec + per-session prompt + user context + domain model), JIT objectives blur the line between "per-session prompt" and "user context" — the prompt could be *derived from* context rather than stated.

## Open threads

- Lam et al. use a single snapshot (one screenshot). They note this is a deliberate floor — richer context (interaction logs, revision histories, temporal patterns) would improve accuracy. What's the right context window for objective induction in a generative UI system that already has a data model and interaction history?
- The paper shows 97.8% of users selected system-generated objectives over writing custom ones. This is presented as accuracy, but could also indicate anchoring bias — the system's framing shapes what users think they want. The ethical section acknowledges this. For the pipeline, this means induced objectives should be clearly marked as suggestions, not presented as facts about the user's intent.
- Objectives are currently flat (name + description + weight). Could they be hierarchical, connecting to the intent decomposition structure?
