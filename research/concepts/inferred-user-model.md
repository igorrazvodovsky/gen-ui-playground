---
type: concept
tags: [user-agency, generative-ui, data-model, intent]
sources: [sources/system-model-user-model, sources/lit-laui]
created: 2026-02-20
---
An AI system builds an implicit, evolving model of the user it's interacting with — their demographics, expertise, preferences, attitude, intent — and this model silently shapes every output. Making this inferred model visible, inspectable, and correctable is essential for both usability (the user can check whether the system's assumptions are right) and safety (the user can see when the system's model of them shifts in problematic ways, like misidentifying an adult as a child).

## Context

Viégas & Wattenberg (2023) illustrate with a Portuguese-language ChatGPT example: the system initially addresses the user with masculine forms, then silently switches to feminine when a dress is mentioned. Under the world model hypothesis, the system has a "gender" feature in its User Model that flipped — but the user had no way to see this happen. The stakes scale: if you're getting medical advice from an AI that thinks you're 25 when you're 60, the advice could be dangerous. The User Model includes not just fact-like attributes (age, location, gender) but also evaluative features — the system's attitude toward the user (the Bing "you have not been a good user" episode) and sycophancy patterns where the model adjusts its views to please.

The critical distinction from [[context-driven adaptation]]: OADAPT treats the user profile as an *input* — something declared upfront and fed into the pipeline. The inferred user model is what the system *believes* about the user regardless of what was declared, built up implicitly from conversational signals, and potentially wrong. Both matter: the declared profile drives deterministic adaptations; the inferred model drives everything else and needs to be surfaced so the user can catch errors.

## Connections

- **Extends** [[context-driven adaptation]] — OADAPT models the user profile as a pipeline input (declared, structured, feeds adaptation rules). The inferred user model adds a second dimension: what the system *believes* about the user based on interaction, which may differ from the declared profile. A complete system needs both: declared profile for reliable adaptations + inferred model surfaced for correction.
- **Surfaced via** [[parallel-state-display]] — the parallel display concept is the delivery mechanism. The inferred user model is *what* to show; the dashboard is *how* to show it.
- **Complements** [[semantic-intermediate-layer]] — Park et al.'s semantic layer makes the system's interpretation of the *task* visible. The inferred user model makes the system's interpretation of the *user* visible. Both address opacity but in different dimensions: task intent vs. user identity.
- **Informs** [[gentle slope]] — correcting the system's model of you is a very low-slope action. "I'm an expert, not a novice" requires no understanding of specs, patterns, or data models — just self-knowledge. This creates an intervention point *below* even value tweaking on the slope.
- **Enables better** [[ai-attribute-reformulation]] — if the system knows (correctly) that the user is a real estate investor rather than a first-time buyer, it can reformulate attributes differently: "cap rate" instead of "monthly payment," "comparable sales" instead of "neighbourhood feel." The quality of per-attribute LLM reformulation depends on an accurate user model.
- **Operationalised by** [[LLM agent UI as abstraction layer]] — LAUI's "secretary" level explicitly studies the user's needs, preferences, mood, and attention. The inferred user model is what the secretary builds over the course of interaction. Chin et al.'s Flute X GPT demonstrates this concretely: the agent diagnoses musical challenges and infers student skill level from performance data, building an implicit user model that drives subsequent configuration choices.
- **Depends on** [[design-time-vs-use-time]] — the inferred user model is inherently a use-time construct. It can't exist at design-time because there's no user to observe. The information asymmetry principle explains why this model is valuable: it contains exactly the kind of context that design-time systems lack.
- **Tension with** [[guardrailed generative UI]] — displaying the inferred user model raises privacy and sensitivity concerns. Showing "inferred gender: female, 82% confidence" might be useful for debugging recommendations but uncomfortable or harmful in practice. Viégas & Wattenberg cite the "Is it true? Is it necessary? Is it kind?" criterion for feature selection.

## Practical implementations

- **Google "Why This Ad"** — surfaces the ad-targeting model (inferred interests, demographics) on request. High-level, not real-time.
- **Pandora Music Genome Project** — describes which musical features the system believes appeal to the user.
- **Netflix "Because you watched X"** — partially surfaces the recommendation model's reasoning.
- **Spotify Wrapped** — annual summary of the inferred user model (genres, moods, listening patterns). Retrospective, not real-time.
- **Amazon "Improve your recommendations"** — lets users see and correct the inferred purchase-interest model.
- **OS accessibility settings propagation** — macOS, Windows, Android propagate declared user capabilities to all apps. This is the *declared* side; the *inferred* side (e.g., iOS detecting reduced dexterity from touch patterns) is rarer.

## Relevance to project

For the genUI pipeline, the inferred user model matters at two points:

1. **At generation time**: The LLM's task analysis is shaped by what it infers about the user. "Build me a portfolio tracker" generates differently for someone the LLM thinks is a day trader vs. a retiree. If this inference is wrong, the entire generated UI is misaligned. Surfacing the inferred model before generation lets users catch this — "you assumed I'm a professional investor; I'm actually a student tracking a class project."

2. **At customisation time**: [[fluid-attributes]] and [[ai-attribute-reformulation]] both depend on understanding the user. If the system can show "I'm formatting prices as per-square-metre because I think you're a European property professional," the user can correct both the inference and the formatting in one step.

Implementation for the pipeline: after the semantic parse step, include a "user assumptions" panel alongside the semantic slots. This panel shows what the LLM inferred about the user from the prompt (expertise level, domain familiarity, likely use case). The user can correct these before generation proceeds. Corrections feed into both the [[context-driven adaptation]] rules (deterministic) and the LLM prompt context (generative).

This is cheaper than it sounds — it's a structured extraction from the same LLM call that does task analysis. "Parse this prompt into semantic slots AND list your assumptions about the user" is a single prompt addition.

## Open threads

- How do you extract the inferred user model from a hosted LLM (GPT, Claude) that doesn't expose internal representations? Structured prompting ("list your assumptions about the user") is pragmatic but unreliable — the LLM might confabulate rather than report actual internal features.
- What happens when the inferred model conflicts with the declared profile? "User declared: expert. LLM inferred from prompt: novice." Which takes priority? Probably the declared profile, but the conflict itself is useful information to surface.
- How granular should the surfaced model be? Full feature vector (age, gender, location, expertise, attitude, intent) might be overwhelming. A simpler "user persona summary" might suffice: "I'm treating you as a mid-career professional exploring a new hobby." **Pareek et al. (CHI '26) add empirical weight here**: participants' transparency needs were strongly shaped by their own expertise and dispositional trust. Confident users wanted *less* process visibility ("if I'm querying the AI for something that I have expertise in, then I would like only a brief output"), while uncertain users wanted *more* ("when I'm not confident at all, even looking at all four [agent's reasoning paths] may not be enough to trust it"). One participant described calibrating their transparency needs over time as trust developed. For the inferred user model, this means the surfacing decision is recursive: how much of the inferred model to show depends partly on *what the inferred model says about the user*. An expert user who the system correctly identifies as expert needs fewer model corrections surfaced; a novice may need to see (and correct) more assumptions. The system's confidence in its own user model should modulate how prominently the model is displayed.
- Ethical constraints on which inferences to display: showing inferred gender, age, or race raises fairness concerns even if the inference drives system behaviour. There may be a case for *using* the model internally but *not displaying* certain features — though this trades transparency for comfort.
- Does the inferred user model persist across sessions? If the system remembers "this user is an expert," that's useful context for future generations. But it introduces stale-model risk: the user might be an expert in one domain and a novice in another. **Addressed by** [[cross-task-user-knowledge]] (InterQuest, UIST '25) — a concrete representation for persistent user knowledge with content + scope + confidence scores. Knowledge items are natural-language statements with dynamic, non-hierarchical scope boundaries (global, category-specific, attribute-based). The confidence-weighted structure directly addresses stale-model risk: scope confidence decreases when knowledge is applied outside its validated domain. [[uncertainty-driven-elicitation]] provides the refinement mechanism — entropy-based questioning to resolve the highest-impact uncertainties.
