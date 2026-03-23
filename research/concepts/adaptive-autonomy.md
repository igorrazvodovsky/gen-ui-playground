---
type: concept
tags: [generative-ui, user-agency, model-evolution]
sources: [sources/duetui-bidirectional-co-generation, "[[sources/interaction-as-intelligence|Interaction As Intelligence (Ye et al., 2025)]]", sources/interface-framework-HAIC]
created: 2026-03-05
---
The allocation of control between human and agent should not be static but should adapt dynamically based on the user's growing expertise, task familiarity, and current cognitive state. Users want more agent guidance when they're uncertain (early stages, unfamiliar domains) and more direct control when they know what they want (late stages, familiar tasks, growing proficiency).

## Context

DuetUI's user study (N=24) found participants wanted control that shifts with context. P2 explained: "At the beginning, I don't really know what I'm doing, so I need the system to recommend... But once I have a plan, I should take the lead, and the AI should become a helper." Users desired greater control as their task familiarity grew (P8, P14-15) and as their overall system proficiency increased (P9, P13). Expert users (professional designers) should be granted more granular control from the outset (P6, P14, P23).

The paper also surfaces the dual risk of getting this wrong: an overly helpful agent leads to cognitive offloading and over-reliance (P15: "I'll just pick one"), while an overly proactive agent feels paternalistic — like an "impatient customer service agent pressuring you to make a decision quickly" (P16).

## Connections

- Extends [[gentle slope]] along a temporal axis — the gentle slope is usually about capability tiers (view → tweak → edit specs). Adaptive autonomy adds that the *default position* on that slope should shift over time. New users start agent-guided (high on the slope); experienced users start user-driven (low on the slope).
- Complements [[graduated-ambiguity-tolerance]] — graduated ambiguity lets users choose precision level *per dimension*. Adaptive autonomy lets users choose control level *per interaction context*. Both resist one-size-fits-all approaches.
- Contrasts with [[context-driven adaptation]] — OADAPT adapts the *interface presentation* based on user profile (accessibility, preferences). Adaptive autonomy adapts the *collaboration dynamic* — how much the agent leads vs. follows. These are orthogonal: you could have a high-contrast, agent-led interface or a standard-visual, user-led one.
- Connects to [[inferred-user-model]] — to adapt autonomy, the system needs to model the user's current state (expertise, confidence, cognitive load). Viégas & Wattenberg's inferred user model provides the data source; adaptive autonomy is the action taken on that data.
- Supports [[design-time-vs-use-time]] — the fundamental argument for generative UI is that more information is available at use-time. Adaptive autonomy is a concrete instance: the right control allocation can't be designed in advance, it must be inferred at use-time from the user's actual behaviour.

## Practical implementations

- **Deep Cognition's dynamic cooperation pattern** (Ye et al., 2025): first empirical phase model of adaptive autonomy. Users oscillate hands-on/hands-off across six research phases — see [[dynamic-cooperation-willingness]]. Critically, the ablation study shows that neither cognition alone nor interaction alone matches the combined system (72.73% vs. 45.45%/40.91%), validating that adaptive autonomy must preserve *both* modes.
- **DuetUI's staged model**: implicit adaptive autonomy — early stages are agent-led (system asks questions), late stages are user-led (user selects, agent infers). But the stage progression is fixed, not truly adaptive.
- **IDE auto-complete**: adjusts suggestion aggressiveness based on context. In an unfamiliar library, detailed suggestions help; in familiar code, they're noise. Some IDEs (Copilot) learn from acceptance/rejection patterns.
- **Game difficulty scaling**: dynamic difficulty adjustment monitors player performance and adjusts challenge in real time — the same pattern applied to a different domain.
- **Endsley's Levels of Autonomy**: framework from human factors research (LOA 1-10) that DuetUI cites. Describes a spectrum from full manual control to full automation, with mixed-initiative levels in between.

## Relevance to project

The pipeline needs to support this at the interaction layer. Concretely: the same pipeline stage (e.g., intent decomposition) should be able to run agent-led (system generates intent dimensions, user reviews) or user-led (user specifies intent directly, agent validates). The [[semantic-intermediate-layer]] should be inspectable but skippable. The [[tangible-agency]] controls should be suggestive (agent pre-fills) when the user is exploring and deferential (agent waits) when the user is driving.

For the json-render pipeline, this means the generation system needs a "confidence/initiative" dial, not a fixed workflow. A simple initial implementation: let the user choose a mode ("guide me" vs. "I know what I want") that adjusts how many intermediate checkpoints are shown.

- **Modality-autonomy inversion**: Andru & Saksena (2025) find that high-complexity modalities (canvas, split-screen) don't necessarily support high autonomy — users want *more* control for complex tasks, not less ([[modality-as-task-container]]). Prompt bar and rail are perceived as AI-led (system takes initiative for speed); canvas and split-screen are perceived as human-led (user drives, AI assists). This is an inversion of the naive expectation that more capable modalities = more autonomy. Progressive control — where users retain intervention ability at any autonomy level — is the resolution. The modality encodes a *default* autonomy level, but the user can always shift it.
- **Informed by** [[work-context-model]] — JTBD social outcomes and Agent/Role structure shape how autonomous the system should be. Solo context → more autonomous; team context → actions affecting others need confirmation

## Open threads

- **Phase-based design**: Ye et al.'s six-phase model suggests autonomy inference might be easier than expected if the system can detect *which phase* the user is in, rather than trying to model expertise directly. Phase detection from behavioural signals ([[usage-as-annotation]]) could be more tractable than expertise inference.
- **Inference reliability**: inferring the right autonomy level from user behaviour is hard. Clicking quickly might mean confidence or impatience. Pausing might mean thinking or confusion. DuetUI doesn't attempt real-time inference — it uses fixed stages. Building reliable autonomy inference is an open research problem.
- **Transition smoothness**: abrupt shifts in control level are jarring. If the system suddenly stops making suggestions because it thinks you're an expert now, that's confusing. Gradual transitions with visible signals ("I'll let you take the lead on this section") are needed.
- **Expertise is domain-specific**: a user might be expert at travel planning but novice at financial modelling. Per-domain autonomy profiles are needed, not a single global setting.
- **Reliance calibration**: [[cognitive-engagement-for-reliance]] adds that autonomy allocation should account for how much cognitive scaffolding the user has built. A user who has explored the data (driver analysis) and tested scenarios (what-if) can appropriately handle more autonomy than one who just arrived. The four-phase engagement model (explore → experiment → construct → evaluate) suggests autonomy should increase as the user progresses through these phases, not just as they gain general expertise.
- **Verification as autonomy mode**: Grunde-McLaughlin et al. (2026) show that how much verification detail to surface is itself an autonomy decision. [[outcome-oriented-verification]] (requirements + assumptions checklist) is a high-control verification mode; auto-acceptance with retrospective review is a high-autonomy mode. The key finding: [[process-induced-overreliance]] means that *medium*-autonomy verification (show the process, let user scan it) can be worse than either extreme. This creates a non-monotonic autonomy curve for verification — moderate transparency may underperform both full transparency and full delegation.
