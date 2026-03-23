---
type: concept
tags: [interaction-paradigm, generative-ui, user-agency]
sources: [sources/lit-laui]
created: 2026-03-05
---
More information is available at use-time than at design-time. The designer knows the system's capabilities and can imagine some user scenarios, but they don't know the actual user's goals, preferences, skill level, environment, or current context. The user has all of this information but doesn't know the system's capabilities. This information asymmetry means neither party alone can find optimal workflows — the designer can't because they don't know the user, the user can't because they don't know the system. An LLM agent that knows the system (via prompting) and can study the user (via interaction) has access to both sides simultaneously at use-time.

## Context

Chin et al. frame this as a reversal: instead of the user learning the application, the application learns the user. Conventional GUI design assumes the user will invest effort to become proficient — explore menus, read documentation, try features. LAUI assumes the user just needs to describe their needs, and the agent bridges the gap.

The information asymmetry is not just about knowing more facts at use-time. It's about having the right *combination* of facts. A designer might know that haptic mode X works well for beginners. A user might know they're a beginner. But only at use-time do these facts meet — and only then can the system configure itself appropriately.

This principle underpins the entire generative UI approach: generating interfaces at use-time (when user context is available) rather than designing them at design-time (when it isn't). It's also why one-shot generation is insufficient — the user's context evolves during use, so the system needs to adapt continuously.

## Connections

- **Foundational for** [[emergent workflow]] — emergent workflows arise precisely because use-time information enables configurations that design-time imagination couldn't reach.
- **Foundational for** [[LLM agent UI as abstraction layer]] — the LAUI layer exists to exploit use-time information that the GUI layer (designed at design-time) can't.
- **Reframes** [[high-dimensional-configuration-space]] — the configuration space is intractable at design-time but not at use-time, because the user's actual context collapses the relevant space from exponential to manageable.
- **Connects to** [[inferred-user-model]] — the agent's use-time advantage depends on accurately modelling the user. If the inferred model is wrong, the information advantage is wasted. Viégas & Wattenberg's point about surfacing and correcting this model is essential for the asymmetry to actually work.
- **Extends** [[context-driven adaptation]] — OADAPT's approach pre-declares user context (profile, environment) and applies rules. This is a partial solution: it brings *some* use-time information into the pipeline but limits it to what can be pre-declared and pre-mapped. The LLM agent extends this by handling undeclared, inferred, and evolving context.
- **Reframes** [[structured vs unstructured tension]] — at design-time, you're forced to pre-structure everything (menus, forms, layouts). At use-time, you can start unstructured (natural language) and progressively structure based on the actual situation. The tension is more acute at design-time and more tractable at use-time.
- **Supports** [[intent-decomposition]] — IntentFlow's implicit intent extraction works precisely because the LLM can infer use-time context (what the user probably cares about given their request) that no design-time system could pre-enumerate.

## Practical implementations

- **Recommendation systems** — Netflix, Spotify, YouTube all generate personalised interfaces at use-time based on accumulated user context. The "home page" is a use-time-generated UI; the static browse categories are a design-time fallback.
- **Adaptive learning platforms** — Khan Academy, Duolingo adjust difficulty and content sequence at use-time based on learner performance. The curriculum is designed at design-time; the personalised path through it is generated at use-time.
- **Google Search** — the results page is a use-time-generated UI: knowledge panels, featured snippets, "People also ask," map packs — all assembled based on query intent, location, device, search history. No designer pre-built a page for your specific query.
- **Smart home assistants** — "Hey Google, set comfortable lighting" requires use-time context (time of day, who's home, current ambient light) that no designer could pre-wire for every situation.

## Relevance to project

This is the philosophical foundation for the entire generative UI pipeline. The pipeline generates at use-time because:

1. **Task analysis** requires knowing the user's actual intent (available at use-time only)
2. **Data model generation** benefits from knowing what the user already has, already knows, and actually needs (use-time context)
3. **Component selection** should account for the user's device, accessibility needs, and preferences (use-time context via [[context-driven adaptation]])
4. **Customisation** is inherently a use-time activity — the user adjusts a running interface, not a design-time blueprint

The implication for the pipeline architecture: every stage should accept use-time context as an input, not just the initial prompt. And the "customisation loop" (UI update → model evolution) is where the design-time/use-time split pays its biggest dividends — each iteration brings more use-time information (the user's reactions, corrections, refinements) that further collapses the configuration space.

For json-render specifically: the renderer currently receives a complete spec and produces a static output. To exploit use-time information, it needs to support dynamic re-rendering as context changes — not just full regeneration, but incremental updates driven by evolving user context.

## Open threads

- How much use-time information is "enough" for a first-pass generation? You could wait for extensive user interaction before generating (high quality, slow). Or generate immediately from the prompt and refine (fast, likely wrong initially). What's the right trade-off?
- Does the information advantage compound over sessions? If the system remembers user context from previous interactions, each new session starts with more use-time information. But stale context (user's needs changed) is worse than no context.
- Is there a design-time/use-time spectrum rather than a binary? Component library curation is design-time. Template selection from a prompt is early use-time. Runtime adaptation is deep use-time. The pipeline stages map to different points on this spectrum.
