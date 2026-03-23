---
type: concept
tags: [intent, user-agency, generative-ui]
sources: [sources/intent-tagging, sources/just-in-time-objectives]
created: 2026-03-05
---
The system doesn't just execute the user's stated intent — it helps the user discover intent they haven't articulated yet. Through contextually relevant suggestions (tag suggestions, alternative values, opposite poles), the AI stimulates the user's thinking about dimensions of the task they hadn't considered. The user's intent is *expanded* by the interaction, not just communicated through it.

## Context

Gmeiner et al. distinguish this from standard intent elicitation (asking the user what they want) and from intent alignment (ensuring the system understood correctly). Meta-intent elicitation operates one level up: it helps users become aware of their own intentions and expectations *during* the creative process. Participants described this as the system helping them "figure out what they want" and "think through the task."

Three mechanisms in IntentTagger implement this. **Tag suggestions** propose new tags based on existing active tags — e.g. given "Topic: Sustainability Initiatives" and "Audience: New Employees", the system suggests "Focus: Eco-friendly Practices" and "Objective: Corporate Responsibility". These expand the intent space the user is working in. **Drop-down alternatives** for each tag show what other values are possible — the user sees the landscape of options, not just their current choice. **The opposite slider** shows the polar opposite of the current value and a spectrum between, prompting the user to consider whether their choice is deliberate or default.

The empirical finding is striking: participants rated IntentTagger significantly higher than chat-based systems on "the system helps me to become more aware of my own intentions and expectations during the task and to express these to the AI system" (MD = 1.58, p = 0.003). The system isn't just a better input mechanism — it's a thinking partner.

## Connections

- **Extends** [[reflection-in-intent]] — reflection shows users what they *did* say (externalised decomposition). Meta-intent elicitation shows them what they *could* say (expanded possibility space). Reflection is mirror-like; meta-intent elicitation is generative.
- **Relates to** [[intent-decomposition]] — IntentFlow's implicit intent extraction (inferring requirements the user didn't state) is a system-driven version of the same principle. The difference: IntentFlow presents inferred intents as a fait accompli for review. IntentTagger presents *suggestions* the user can adopt, modify, or ignore. The user has more agency in the discovery process.
- **Complements** [[augmented-semantics]] — augmented semantics show what the AI *implemented* (post-generation analysis). Meta-intent elicitation shows what the user *could request* (pre-generation exploration). Together they bracket the generation process: expand intent before, analyse output after.
- **Supports** [[gentle slope]] — meta-intent elicitation lowers the entry barrier. Users don't need to know what they want before starting — they can discover it through interaction with the system's suggestions. This addresses the blank-page problem.
- **Relates to** [[high-dimensional-configuration-space]] — the parameter space for any generative task is vast. Users explore a tiny fraction. System suggestions reveal regions of the space the user might not have considered. This is the LAUI insight (the LLM can navigate the full configuration space) applied to the intent layer rather than the generation layer.
- **Tension with** [[intent-tag-as-micro-prompt]] — if the system suggests too many tags, users feel overwhelmed ("maybe less overloaded with suggestions" — P01). The benefit of expanded awareness trades off against cognitive load. Progressive disclosure and ranking of suggestions are needed but not solved.
- **Extended by** [[just-in-time-objective-induction]] — JIT objectives take meta-intent elicitation to its extreme: instead of suggesting dimensions the user could specify, the system infers the entire objective from passive observation. Poppins participants reported the system surfaced goals they hadn't considered — "I didn't know until I saw it" (P18) — which is the same meta-intent discovery but without requiring any user action at all. The mechanisms differ (IntentTagger: interactive suggestions during specification; JIT: passive inference from context), but the cognitive outcome is the same: expanded awareness of one's own goals.
- **Relates to** [[context-driven adaptation]] — some of the most valued suggestions were about audience and purpose — dimensions users skip when creating presentations in traditional tools. The system effectively prompts users to consider contextual factors that would otherwise be left to defaults.

## Practical implementations

- **Grammarly's tone suggestions** — when writing, the tool suggests tonal adjustments the user may not have explicitly intended. "Did you mean to sound this formal?" is meta-intent elicitation for writing tone.
- **Spotify Discover Weekly** — algorithmically generated playlists introduce users to music they didn't know they wanted. Intent discovery through exposure rather than specification.
- **Pinterest's "More like this"** — showing related content helps users refine what they're looking for through exposure to adjacent possibilities rather than through verbal specification.
- **Design critique sessions** — a human practice where peers ask questions that help a designer articulate implicit decisions. "Why did you choose that colour?" forces reflection on a choice that may have been unconscious. IntentTagger's tag suggestions serve a similar function.
- **ChatGPT's suggested follow-up questions** — after an answer, the system suggests related questions the user might want to ask. Lightweight meta-intent elicitation, though at the output stage rather than the input stage.

## Relevance to project

For the genUI pipeline, meta-intent elicitation should happen at the intent layer — the first user touchpoint. When a user starts specifying what to generate, the system should proactively suggest dimensions they haven't addressed. "You've specified the data model and the layout, but you haven't said anything about who this is for or what level of complexity you want." This isn't just asking for missing information — it's expanding the user's awareness of the decision space.

Concretely, this could work as a suggestion layer on top of the intent decomposition or tag collection:
1. User provides initial intent (prompt, tags, or example)
2. System generates the first-pass specification
3. **Suggestion engine** identifies underspecified dimensions by comparing the current intent against a taxonomy of relevant dimensions for that task type
4. Suggestions appear as optional, adoptable, modifiable items — not as required fields

The taxonomy of "what dimensions matter for UI generation" could be derived from the semantic hierarchy ([[hierarchical-design-semantics]]) and the adaptation model ([[context-driven adaptation]]): audience, complexity, accessibility needs, data density, interaction style, visual mood, responsive requirements, etc.

The study's finding that users valued suggestions for reflection and thinking — not just for direct steering — has a design implication: suggestion mechanisms should be designed as thinking prompts, not just parameter completion. The opposite slider is a good example: it was used for reflection ("what *would* the opposite look like?") more than for setting values.

## Open threads

- How do you generate *good* suggestions? The study used GPT-4o to suggest tags based on existing active tags. For UI generation, what's the right prompt structure to suggest intent dimensions a user is likely to have overlooked?
- When does meta-intent elicitation become annoying? Users appreciated suggestions in IntentTagger but some felt overwhelmed. The tipping point probably depends on how much the user already knows what they want — experts may want fewer suggestions, novices more. This connects to [[context-driven adaptation]] applied to the authoring interface itself.
- Can the system learn which suggestions a specific user typically adopts and tailor future suggestions accordingly? This is a user-model-for-the-authoring-process, distinct from the user-model-for-the-generated-output.
- **Prioritisation mechanism**: [[uncertainty-driven-elicitation]] (InterQuest, UIST '25) provides a principled way to choose *which* suggestions or questions to surface: use Shannon entropy to target knowledge with the highest information gain. This is complementary — meta-intent elicitation discovers *what to ask about* (intent dimensions the user hasn't considered), uncertainty-driven elicitation determines *when to ask* (high-entropy knowledge items vs. already-confident ones).
- The opposite slider finding (used for reflection, not steering) suggests a design pattern: *reflective instruments* — UI elements whose primary value is making the user think, not directly controlling output. What other reflective instruments could the pipeline offer?
