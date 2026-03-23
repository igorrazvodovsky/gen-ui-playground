---
type: concept
tags: [intent, user-agency, generative-ui, model-evolution]
sources: ["[[sources/interquest-mixed-initiative-user-modelling|InterQuest (Mei et al., UIST 2025)]]"]
created: 2026-03-06
---
When a system has uncertain knowledge about the user, the most productive question to ask isn't about what it's *least confident* about — it's about what has the *highest potential impact* on task outcomes. InterQuest formalises this using Shannon entropy: knowledge with confidence p ≈ 0.5 has maximum entropy and maximum information gain from a single question, while knowledge with very low confidence (p ≈ 0) is probably invalid and not worth asking about. This inverts the naive "ask about what you know least" strategy.

## Context

Mixed-initiative systems face a fundamental question: when should the system proactively ask the user for input? Asking too much is burdensome; asking too little leaves important uncertainties unresolved. InterQuest's formative study found that human wizards (N=9) mitigated three types of uncertainty through strategic questioning:

1. **Cold-start uncertainty** — insufficient interaction history to make any inference. Resolved by initial structured questions ("What attributes do you prioritise when purchasing a product?").
2. **Content uncertainty** — the system has inferred a preference but isn't sure it's accurate. Resolved by confirmatory questions ("You care about sugar content in yoghurt — is it because you're into fitness?").
3. **Scope uncertainty** — the system has a preference but isn't sure where it applies. Resolved by boundary-probing questions ("You care about keyboard material — are you also interested in the material of all electronics?").

The entropy-based targeting works as follows: for each piece of user knowledge, compute p = C_scope × C_content (joint probability of being valid and applicable). Then entropy = −p log₂(p) − (1−p) log₂(1−p). The candidate with highest entropy is the questioning target.

The key insight: knowledge with extremely low confidence (p → 0, entropy → 0) isn't worth asking about — the user is likely to reject it, yielding minimal information gain. Knowledge with high confidence (p → 1, entropy → 0) isn't worth asking about either — it's already reliable. The sweet spot (p ≈ 0.5, entropy = 1) is where a single question maximally reduces uncertainty.

InterQuest's evaluation showed the entropy-based approach significantly outperformed rule-based questioning on naturalness (p < 0.01) and transparency (p < 0.01), with 16/18 participants finding the question frequency acceptable (average 9.60% of interaction time). 12/18 preferred indirect questions (scope-probing) over direct ones (confirmatory), finding them more natural.

## Connections

- **Extends** [[meta-intent-elicitation]] — Gmeiner et al.'s concept is about expanding the user's awareness of their own intent. Uncertainty-driven elicitation adds a *prioritisation mechanism*: among all the things the system could ask about, which question produces the highest information gain? The two are complementary — meta-intent elicitation discovers new dimensions to ask about, uncertainty-driven elicitation chooses *which* to ask about *now*.
- **Operationalises** [[cognitive-engagement-for-reliance]] — proactive, targeted questioning is itself a form of cognitive engagement. The user answering "yes, I care about functionality details, but only for office electronics" is actively calibrating the system's model, building appropriate reliance.
- **Complements** [[alignment-cost-tradeoff]] — Terry et al. argue that alignment has costs and should be proportional to stakes. Entropy-based targeting is a concrete mechanism for this: ask more questions when uncertainty is high (high stakes), fewer when the knowledge base is well-calibrated (low marginal value).
- **Informs** [[adaptive-autonomy]] — the system's questioning frequency should decrease as [[cross-task-user-knowledge]] becomes more confident. Early interactions involve more questions (cold-start); later interactions are mostly autonomous (knowledge is calibrated). The entropy metric provides a natural transition signal.
- **Connects to** [[graduated-ambiguity-tolerance]] — intent tags allow users to specify with varying precision. Uncertainty-driven elicitation is the system's counterpart: it tolerates ambiguity where confidence is high enough and probes where it isn't. The two mechanisms are complementary — user-side and system-side ambiguity management.
- **Connects to** [[sufficiency-criteria]] — Vandeputte's concept of graduated quality thresholds (not binary pass/fail) aligns with the entropy approach. Knowledge that's "good enough" (high confidence) passes; knowledge near the decision boundary (medium confidence, high entropy) gets targeted for improvement.

## Practical implementations

- **Active learning in ML** — the classic "query by uncertainty" strategy selects training examples the model is most uncertain about. InterQuest's entropy targeting is the conversational-UI equivalent.
- **Clarification questions in conversational AI** — ClariQ, UniPCQA generate clarifying questions for ambiguous queries. But they target current-task ambiguity, not cross-task knowledge gaps.
- **20 Questions game** — optimal question selection in information-theoretic terms: each question should maximally bisect the hypothesis space. The entropy metric formalises this for user knowledge.
- **Medical diagnostic interviews** — doctors ask targeted follow-up questions to resolve diagnostic uncertainty, prioritising tests with highest diagnostic value (analogous to highest entropy).

## Relevance to project

The generative UI pipeline has multiple points where the system might want to ask the user for clarification: during intent decomposition, pattern selection, attribute configuration, adaptation rule application. Currently these are either all-or-nothing (show the full intermediate layer) or implicit (the LLM guesses). Uncertainty-driven elicitation provides a middle path: ask *only when it matters most*.

Concretely:
- During intent decomposition: if the system is uncertain whether "plan a dinner party" means "generate a checklist" or "build an interactive planning tool" (high entropy on intent type), ask. If it's confident the user wants a table view (high confidence from [[cross-task-user-knowledge]]), don't ask.
- During pattern selection: if the task could map to either Search or Browse patterns with roughly equal probability, surface the choice. If one pattern dominates, apply it and move on.
- During adaptation: if the system inferred "novice" from the prompt but the cross-task knowledge says "uses expert features," the scope uncertainty is high — worth asking rather than guessing.

The entropy metric also addresses the [[alignment-cost-tradeoff]] operationally. Instead of offering all checkpoints or none, the system can *compute* which checkpoints are worth surfacing for this specific user + task combination. Low-entropy pipeline stages run silently; high-entropy stages surface for user input. This makes the "quick generate" vs. "guided generate" distinction dynamic rather than user-selected.

## Open threads

- The entropy metric assumes knowledge items are independent. In practice, resolving one uncertainty might cascade — confirming "user cares about functionality details for electronics" immediately reduces uncertainty on related items (screen resolution, battery life). A joint entropy model would be more efficient but harder to compute.
- InterQuest asks closed-ended multiple-choice questions. For generative UI, some uncertainties might need open-ended input ("what kind of layout do you prefer?"). The question format taxonomy needs extension.
- How to handle entropy in cold-start (no prior knowledge)? InterQuest uses a structured survey. For the pipeline, could the first generation session include a brief preference calibration? Or should the system generate conservatively and refine through the [[bidirectional-context-loop]]?
- Question fatigue over time: even if each question is high-entropy, cumulative burden across sessions matters. InterQuest participants accepted 9.60% question time in a single session. What's the acceptable rate across 20+ sessions?
