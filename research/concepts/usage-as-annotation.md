---
type: concept
tags: [model-evolution, user-agency, data-model]
sources: ["[[sources/interaction-as-intelligence|Interaction As Intelligence (Ye et al., 2025)]]"]
created: 2026-03-05
---
Normal user interactions — not explicit feedback, just the act of using the system — implicitly generate annotation signals that guide system adaptation. Hesitations, corrections, and smooth task completions are all data. When product design is thoughtful, usage *is* annotation.

## Context

Ye et al.'s Design Suggestion 1: "Usage as Annotation becomes possible through thoughtful product design that transforms natural user interactions into annotation signals." Complex user hesitations or corrections trigger deeper reasoning processes in the system, while smooth task completion indicates successful lightweight inference. The preference agent operationalises this by treating user actions as reward signals for in-context reinforcement learning — no explicit rating or feedback mechanism needed.

The key distinction from traditional user modelling: the system doesn't ask users what they want or how they feel about the output. It observes what they *do* — which search results they click, which sections they edit, which suggestions they accept vs. override — and treats these behavioural patterns as implicit training data. The preference agent learns across three dimensions from these signals: query preferences (how users refine searches), webpage preferences (which sources they trust), and report preferences (what style and structure they favour).

## Connections

- **Extends** [[inferred-user-model]] — Viégas & Wattenberg proposed surfacing the system's inferred model of the user. Usage-as-annotation is the mechanism by which that model gets built: not through explicit profiling but through behavioural observation
- **Supports** [[adaptive-autonomy]] — if usage patterns are annotation signals, the system can detect when to increase or decrease autonomy without asking. A user who frequently overrides suggestions needs more control; one who accepts defaults can be given more autonomy
- **Enables** [[dynamic-cooperation-willingness]] — the six-phase cooperation pattern was *observed* from usage data, not self-reported. The system could detect phase transitions from the same signals
- **Connects to** [[context-driven adaptation]] — OADAPT models user context as a declared input. Usage-as-annotation suggests a complementary approach: context inferred from behaviour, continuously updated, without requiring the user to maintain a profile
- **Relates to** [[bidirectional-context-loop]] — DuetUI's upward feedback channel (user manipulations → agent context) is a form of usage-as-annotation: the agent reads intent from interface interactions, not from chat messages
- **Contrasts with** [[intent-decomposition]] — IntentFlow makes intent explicit through structured decomposition. Usage-as-annotation captures intent implicitly through behaviour. Both are needed: explicit for initial specification, implicit for ongoing refinement

## Practical implementations

- Spotify's recommendation engine — listening behaviour (skips, repeats, playlist additions) is the primary signal, not explicit ratings
- Deep Cognition's preference agent — ICRL from user interaction trajectories across query, webpage, and report dimensions
- Google Search ranking — click-through rates, dwell time, and pogo-sticking as implicit relevance signals
- IDE autocompletion — acceptance/rejection of suggestions trains the local model without explicit feedback

## Relevance to project

For the generative UI pipeline, usage-as-annotation has two concrete applications:

1. **Model evolution loop** — the `↺` in the pipeline. When users interact with the generated UI (resize columns, reorder fields, hide sections, change filter values), these actions are implicit annotation of what the current spec got wrong. The system should capture these patterns and feed them back into the next generation cycle. This is richer than just persisting the edits ([[accretive-extensibility]]) — it's learning *preferences* from the edits. If a user consistently widens the description column, the system should learn that this user wants more space for text-heavy attributes.

2. **Preference-driven pattern selection** — over time, the system accumulates evidence about which UI patterns the user prefers (tables vs. cards, compact vs. spacious, detail-first vs. overview-first). This should inform pattern selection without the user explicitly declaring preferences. The preference agent architecture (ICRL over interaction trajectories) provides a concrete mechanism.

The distinction from [[ai-attribute-reformulation]] is temporal: reformulation happens at data-fetch time using explicit prompts. Usage-as-annotation happens continuously at interaction time using implicit signals. Both feed into model evolution, but through different channels.

## Open threads

- What's the minimum interaction volume before usage-as-annotation produces reliable signals? Deep Cognition works within a single session. For the genUI pipeline, will a single UI generation session produce enough signal, or does this require cross-session learning?
- Privacy implications: implicit behavioural tracking is inherently more invasive than explicit preference setting. Users should be able to see and correct what the system has inferred — which loops back to [[inferred-user-model]] and [[parallel-state-display]].
- How to distinguish intentional behaviour (the user wants this column wider) from incidental behaviour (the user accidentally dragged the column)? Signal quality matters more than signal volume.
