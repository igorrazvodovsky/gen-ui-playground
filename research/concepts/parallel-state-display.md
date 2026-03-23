---
type: concept
tags: [user-agency, generative-ui, specification]
sources: [sources/system-model-user-model]
created: 2026-02-20
---
AI systems need non-conversational visual instrumentation — dashboards, gauges, indicators — running *alongside* their primary interface, displaying the system's internal state in real time. Language alone is insufficient because there is information the system cannot or will not express verbally, and because some of the most important signals (confidence, mode, attitude) are simple enough that a scalar bar or boolean light communicates them more efficiently than a sentence.

## Context

The analogy is mechanical devices: cars have speedometers, ovens have thermometers, coffeemakers have blinking lights. These instruments surface internal state that's critical for safe and effective use. Viégas & Wattenberg (2023) argue AI systems deserve the same treatment, especially dialogue-based ones where the conversational surface creates an illusion of completeness. The Tesla self-driving display is the closest existing example — it shows the car's inferred model of the road, letting drivers calibrate trust. Crucially, *imperfect* models are still worth displaying: flickering or unstable readings alert the user that the system is uncertain, which is more useful than false confidence.

The paper proposes two "universal" models worth surfacing across most AI systems: the **System Model** (the network's model of its own state — fiction vs. fact mode, communicative intent, confidence, rule-following) and the **User Model** (the network's inferred model of the user — demographics, expertise, attitude). Both are conjectured to be interpretable internal representations recoverable through probing or activation analysis.

Design principles: simple "steampunk" gauges (booleans, scalars, categorical indicators) are likely more effective than sophisticated visualisations. Anthropomorphic representations (avatars, emotion cartoons) should be avoided — they imply more than is justified and work against the goal of reminding users they're interacting with a machine. Dynamic prioritisation matters: sudden changes in usually-stable features should trigger surfacing (e.g., an alert when the system flips from factual to fictional mode).

## Connections

- **Complements** [[semantic-intermediate-layer]] — Park et al.'s semantic layer makes the LLM's *pre-generation* interpretation visible and editable. Parallel state display extends this to *continuous runtime* monitoring. The semantic layer is a single checkpoint ("here's what I'll generate"); the dashboard is an ongoing readout ("here's what I currently think"). Together they address both Norman's gulf of execution (semantic layer) and gulf of evaluation (dashboard).
- **Extends** [[augmented-semantics]] — augmented semantics extract *what the AI did* post-generation and map it to semantic vocabulary. A parallel display does something similar but in real time: it continuously shows what the system *believes* about the user and itself, not just what it produced. Augmented semantics are retrospective; parallel display is live.
- **Informs** [[in-place toolchain]] — the dashboard *is* a form of in-place tooling. It lives alongside the working interface and helps users understand and guide the system without a context switch. Varv's data inspector and JELLY's inspect tool are specific implementations; the parallel display concept generalises these to any AI-mediated interaction.
- **Requires surfaces from** [[LLM-operable interface]] — if the pipeline stages expose inspectable surfaces for agents, the same surfaces can feed a user-facing dashboard. The LLM-operable interface is the data source; the parallel display is the visualisation layer.
- **Motivated by** [[gentle slope]] — a dashboard showing the system's model of the user and its own state creates a new low-effort intervention point: before tweaking values or editing specs, users can correct the system's *assumptions*. "You think I'm a novice — I'm not" is a lower-slope action than editing a UI spec.
- **Relates to** [[inferred-user-model]] — the User Model is the single most important element to surface in a parallel display.
- **Tension with** [[guardrailed generative UI]] — Viégas & Wattenberg note an adversarial concern: dashboards could help malicious users "hack" the system by revealing internal state. This parallels the guardrail tension between transparency and safety. Their counter: speedometers create temptation but are still worth having.

## Practical implementations

- **Tesla self-driving display** — real-time visualisation of the car's world model (detected vehicles, lanes, pedestrians). The closest existing implementation of this concept.
- **Google "Why This Ad"** — high-level display of the ad-targeting User Model, available on request.
- **Pandora music genome** — describes features the system believes appeal to the user.
- **GitHub Copilot confidence indicators** — some code completion tools show confidence scores alongside suggestions.
- **Claude's thinking traces** — extended thinking shown to users is a form of System Model surfacing, though in text rather than visual instrumentation.
- **Cursor's "apply" diff view** — shows what the AI changed alongside the original, making the system's decisions visible.

## Relevance to project

For the genUI pipeline, the parallel display concept suggests that the rendered UI shouldn't be the *only* output. Alongside the generated interface, users should see a persistent sidebar or overlay showing:

1. **What the system thinks the task is** (task model summary — maps to the System Model's "mode")
2. **What assumptions it made about the user** (expertise level, preferences, accessibility needs — maps to the [[inferred-user-model]])
3. **Confidence indicators** for ambiguous generation decisions ("I guessed you wanted a calendar view — 60% confident")
4. **Mode/intent indicators** (is the system generating a prototype, a production UI, a wireframe? — maps to the System Model's "fictionality" dimension)

This is architecturally straightforward: the pipeline already produces intermediate representations (semantic parse, task model, pattern selections) that are currently internal. Surfacing them as a parallel display requires formatting, not new computation. The question is *which* intermediates to show and *how* to make instability visible (e.g., highlighting when the system's task classification changes during a conversation).

The parallel display also creates a natural correction interface: users click "you think I'm a novice" → correct to "expert" → system re-applies [[context-driven adaptation]] rules → UI updates. This is lower-friction than re-prompting.

- **Implemented (pre-generation) by** [[externalised-LLM-understanding]] — Zhang et al. (UIST '25) surface the LLM's inferred task structure as an editable graph before code generation. This is the parallel display concept applied to a specific moment: the pre-generation checkpoint. The graph IS a display of the system's internal model, but unlike the continuous runtime dashboard Viégas & Wattenberg envisioned, it's shown at a decision point where the user can intervene. NeuroSync's incremental graph refinement across turns moves toward the continuous version.

## Open threads

- What's the right information density for the dashboard? Too much overwhelms; too little fails the purpose. Viégas & Wattenberg suggest context-dependent dynamic prioritisation (show what changed), but this needs implementation design. **Pareek et al. (CHI '26) provide empirical grounding here**: their study of multi-agent LLM interfaces found that overly elaborate transparency (full agent debates, all rationales visible) sometimes *backfired*, eroding trust rather than building it — participants felt the system was "trying too hard to convince me." The practical implication for the dashboard: default to minimal indicators (confidence scalar, mode label) and let users expand on demand. The paper's "contextual sufficiency" framing means the dashboard's default density should adapt to task complexity — more indicators visible for ambiguous generation tasks, fewer for straightforward ones.
- How do you extract the System Model and User Model from an LLM that doesn't have explicitly designed world models? The paper assumes interpretability research will solve this; for a practical pipeline using a hosted LLM (GPT, Claude), you'd need to rely on structured prompting or separate inference calls.
- Does the dashboard concept scale to multi-step, multi-model pipelines? Each stage (semantic parse, task analysis, pattern selection, spec generation) could have its own monitoring — but that's potentially overwhelming. Pareek et al.'s finding that interaction topology and information flow (D5/D6 in their framework) were *perceptually latent* — users didn't notice or care about them — suggests that many pipeline internals genuinely don't need surfacing. Only the *visible cues* (agent count, rationales, disagreement, consensus) shaped trust. Translation: surface outputs and decisions, not architecture.
- The paper is speculative (no user study). Park et al.'s semantic layer *has* been validated and addresses similar transparency goals. Is a continuous parallel display needed beyond the semantic checkpoint, or does it become noise? **Partial answer from Pareek et al.**: their V3 ("Agents Explain") variant, which showed brief rationales alongside outputs, hit the "Goldilocks zone" for most participants — enough transparency for sensemaking, not so much it overwhelmed. This suggests the parallel display should be closer to V3's model (brief rationale summaries, expandable) than V5's (full multi-turn debate).
