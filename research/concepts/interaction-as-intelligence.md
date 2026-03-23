---
type: concept
tags: [user-agency, generative-ui, model-evolution, intent]
sources: ["[[sources/interaction-as-intelligence|Interaction As Intelligence (Ye et al., 2025)]]"]
created: 2026-03-05
updated: 2026-03-11
---
Interaction is a fundamental dimension of intelligence, not merely an interface for accessing it. The dominant paradigm treats interaction as overhead — something to minimise so the AI can "think" uninterrupted. This inverts the relationship: the most sophisticated intelligence (human or artificial) emerges through dialogue, feedback, refinement, and the integration of diverse perspectives. Minimising interaction doesn't free the AI — it cripples the combined system.

## Context

The AI field's prevailing trajectory assumes the ultimate AI needs minimal human input — scaling parameters, training data, and architectures to create autonomous black boxes. Ye et al. argue this fundamentally mischaracterises intelligence. They point to Hutchins (1995) and Minsky (1987): human intelligence rarely occurs in isolation. Breakthrough discoveries involve iterative cycles of hypothesis, testing, revision, and collaborative refinement. If interaction is constitutive of intelligence (not just a delivery mechanism), then optimising for human-AI cognitive partnership is more productive than optimising for AI autonomy.

### Operational grounding: when to interact

The principle needs teeth — "interaction is intelligence" without knowing *when* to interact is a platitude. [[dynamic-cooperation-willingness]] (Ye et al., N=13 deep research study) provides the empirical answer: users naturally oscillate between hands-on and hands-off modes in a predictable six-phase pattern:

1. **Clarification** — hands-on. User specifies and corrects the task framing.
2. **Input gathering** — hands-off. System collects and organises information.
3. **Reasoning** — hands-off. System analyses, compares, synthesises.
4. **Intervention** — hands-on. User redirects when intermediate results diverge.
5. **Summarisation** — hands-off. System consolidates findings.
6. **Exploratory search** — mixed. User and system jointly explore unexpected directions.

The design implication: not all intermediate checkpoints need equal attention. Intent decomposition and final review should default to **hands-on** (high-interaction phases where human judgment is irreplaceable). Pattern transformation and attribute reformulation should default to **hands-off with transparency** (show what's happening, don't demand decisions). The system should adapt its interaction demands to match the current phase — see [[adaptive-autonomy]].

This also connects to [[risk-based-delegation]]: users apply a risk/judgment heuristic. Mechanical, low-risk, broad-search tasks go to the agent; consequential, high-judgment, synthesis tasks stay with the user. Interaction density should track where human judgment adds irreplaceable value.

## Connections

- **Operationalised by** [[dynamic-cooperation-willingness]] — the six-phase pattern that turns this principle into actionable design guidance
- **Supports** [[adaptive-autonomy]] — if interaction is intelligence, then autonomy level should adapt to maximise interaction quality, not minimise quantity
- **Extends** [[gentle slope]] — the slope assumes users *want* varying engagement. This provides the theoretical grounding: varying engagement is how the combined system produces its best output
- **Supports** [[bidirectional-context-loop]] — the continuous feedback loop is an implementation: the interface is the medium through which intelligence emerges
- **Contrasts with** [[LLM agent UI as abstraction layer]] — LAUI positions the agent as an autonomous operator. This says the agent should be a cognitive partner that actively seeks human input at strategic moments
- **Enables** [[dynamic-cooperation-willingness]] — studying *how* humans naturally want to interact is a first-order design question
- **Complements** [[cognitive-engagement-for-reliance]] — this says interaction *is* intelligence; Raees et al. say interaction *calibrates reliance*. Different claims converging on the same implication: intermediate layers are where productive work happens
- **Tension with** [[process-induced-overreliance]] — rich process visibility can either enable collaborative cognition (when interactive, pre-generation) or undermine it (when retrospective, post-generation). The resolution lies in distinguishing interactive vs. retrospective process visibility.

## Practical implementations

- **Deep Cognition** (Ye et al.) — multi-agent research system with pause/interrupt/redirect capabilities
- **Pair programming** — the original interaction-as-intelligence pattern: two minds, continuous dialogue
- **Jupyter notebooks** — computational narratives where human reasoning and machine execution interleave
- **Socratic teaching** — intelligence emerging through structured dialogue, not knowledge transfer

## Relevance to project

This reframes the pipeline's purpose. It isn't a generation engine that minimises user involvement — it's collaboration infrastructure that maximises the quality of human-AI interaction at each stage:

- The [[semantic-intermediate-layer]] isn't a "checkpoint for catching errors" — it's where intelligence happens. The user reviewing and correcting the semantic parse is the system *thinking*.
- [[intent-decomposition]] shouldn't aim to extract intent so accurately the user never intervenes. It should make intervention *maximally productive* — surfacing the right dimensions at the right moment.
- The feedback loop (↺) isn't a fallback for when generation fails. It's the primary mechanism through which the system gets smarter.

The six-phase cooperation pattern translates to pipeline design: phases 1 and 4 (clarification, intervention) are where the pipeline should demand attention. Phases 2, 3, and 5 (gathering, reasoning, summarisation) are where it should run autonomously with transparency. Phase 6 (exploration) is where [[emergent workflow]] lives.

## Open threads

- Where's the boundary between productive interaction and burdensome overhead? The six-phase pattern gives structure, but the optimal *amount* of interaction at each phase is an open question.
- How does this apply when the "user" is another agent? In the [[LLM-operable interface]] vision, agents operate the generated UI. Is agent-agent interaction also "intelligence"?
- [[usage-as-annotation]] provides a mechanism for implicit interaction — normal use patterns that train the system without adding feedback burden. How much of the interaction-as-intelligence principle can be satisfied implicitly?
