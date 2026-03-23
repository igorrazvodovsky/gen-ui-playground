---
type: concept
tags: [user-agency, generative-ui, intent, model-evolution]
sources: ["[[sources/interaction-as-intelligence|Interaction As Intelligence (Ye et al., 2025)]]"]
created: 2026-03-05
---
Users naturally oscillate between "hands-on" and "hands-off" modes when collaborating with AI, and this oscillation follows a predictable pattern tied to task phase and cognitive demand. Effective human-AI collaboration adapts to this rhythm rather than imposing a fixed interaction intensity.

## Context

Ye et al.'s user study (N=13) observed a six-phase pattern across deep research tasks:

1. **Clarification** (hands-on) — users actively refine vague problem definitions. High engagement; the system asks scoping questions, users redirect and narrow.
2. **User knowledge input** (hands-on) — users inject domain expertise: specific references, paper links, targeted directives. They know things the system doesn't and actively guide retrieval.
3. **Reasoning** (hands-off) — users step back during analytical phases. They want to *watch* the AI reason, not direct it. Transparency matters here (users want to see decision routes) but intervention drops.
4. **Real-time intervention** (hands-on) — engagement spikes again during dynamic browsing. Users see specific pages or sources that warrant detailed retrieval and actively redirect.
5. **Web summary** (hands-off) — users delegate summarisation willingly. Mechanical aggregation from multiple sources is trusted to the AI.
6. **Web search** (hands-on) — engagement returns for open-ended, subjective questions requiring interpretation or judgement.

The pattern is not uniform delegation nor uniform control — it's strategic alternation based on where human judgement adds most value.

## Connections

- **Extends** [[adaptive-autonomy]] — DuetUI proposed adaptive control allocation but validated it only qualitatively. This provides the first empirical phase model showing *when* autonomy should shift and in *which direction*
- **Supports** [[interaction-as-intelligence]] — the oscillation pattern demonstrates that interaction quality, not quantity, is what matters. Users don't want constant involvement — they want involvement at the right moments
- **Informs** [[staged-co-generation]] — DuetUI's six fixed stages (Define → Empathise → Plan → Explore → Refine → Duet) could be redesigned around the natural cooperation rhythm rather than a prescribed workflow
- **Connects to** [[gentle slope]] — the hands-on/hands-off oscillation is a temporal dimension of the gentle slope. Users move up and down the slope *within a single session*, not just across sessions
- **Informs** [[context-driven adaptation]] — user engagement level is itself a context signal. A user going hands-off is a signal to increase autonomy; a user going hands-on is a signal to increase transparency and control surfaces

## Practical implementations

- Deep Cognition's pause/resume mechanism — users can interrupt at any phase, but the system doesn't demand attention during hands-off phases
- IDE debugger patterns — step-through (hands-on) vs. continue-to-breakpoint (hands-off). The developer controls granularity of attention.
- Google Docs suggestion mode — collaborators choose when to review vs. when to let edits accumulate

## Relevance to project

The pipeline has multiple stages where the user could theoretically intervene: intent decomposition, semantic review, pattern selection, attribute configuration, rendered UI inspection. The dynamic cooperation model says not all of these should demand equal attention. The design implication:

- **Hands-on by default**: intent decomposition (Phase 1 — clarification), real-time UI manipulation (Phase 4 — intervention), final review (Phase 6 — judgement calls)
- **Hands-off by default**: pattern-driven transformation (Phase 3 — let the system reason), attribute reformulation (Phase 5 — mechanical transformation)
- The system should surface transparency (show what it's doing) even during hands-off phases, because users in Phase 3 specifically said they want to *see the reasoning* without *directing* it

This also informs the [[bidirectional-context-loop]]: the loop doesn't need to be equally tight at all stages. During hands-off phases, the system accumulates context silently; during hands-on phases, it processes user input immediately.

## Open threads

- The six phases were observed in a *research* task context. Do the same phases (or analogous ones) appear in a *UI generation* task? The cognitive structure is different — research is divergent then convergent; UI generation is more iterative.
- What signals indicate a phase transition? Deep Cognition relies on explicit user actions (pause, type feedback). Could the system detect phase shifts from implicit signals — typing speed, interaction frequency, gaze patterns?
- How does expertise affect the pattern? Design Suggestion 3 notes that expert-level interaction requires cognitively appropriate challenge. Novices might stay hands-on longer; experts might go hands-off more readily but intervene more sharply when they do.
- [[cognitive-engagement-for-reliance]] suggests the six-phase oscillation pattern maps onto a four-phase engagement model (driver analysis → what-if → model building → evaluation). The hands-on phases (1, 2, 4, 6) correspond to analytical engagement that builds reliance scaffolding; the hands-off phases (3, 5) correspond to delegated execution where reliance has already been calibrated. This reframes the oscillation: it's not just task-phase-dependent, it's reliance-readiness-dependent.
