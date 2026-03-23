---
title: "IntentFlow: Assisting Users to Leverage LLMs' Intent-Driven Interactions"
authors: [Tae Soo Kim, Yoonjoo Lee, Minsuk Chang, Juho Kim]
year: 2025
venue: "CHI 2025"
type: literature
status: processed
---
## Core idea

Users struggle to communicate intent to LLMs because current chat interfaces collapse four distinct activities — articulating what you want, exploring possibilities, managing accumulated preferences, and keeping intent synchronised with output — into a single text box. IntentFlow decomposes user intent into a structured, manipulable representation (Goal → Intents → Intent Dimensions) and provides dedicated UI for each phase, letting users steer generation through direct manipulation of intent parameters rather than conversational re-prompting.

## Key concepts

- **[[intent-decomposition]]** — hierarchical breakdown of user prompts into Goal (task/domain/topic), Intents (explicit + implicit requirements), and Intent Dimensions (parameterised controls with typed interaction widgets)
- **[[intent-decomposition]]** — reifying abstract intents as typed, manipulable UI elements (Likert scales, sliders, hashtags, dropdowns) that map directly to generation parameters
- **[[intent-output-traceability]]** — bidirectional linking between intent dimensions and specific output phrases, enabling users to see what influenced what and make targeted adjustments
- Four-phase intent communication model: Articulation (structuring vague prompts), Exploration (discovering possibilities), Management (tracking accumulated preferences), Synchronisation (aligning intent with output)
- Implicit intent extraction: LLM identifies logically required but unstated intents and surfaces them as editable dimensions

## Technical approach

Six-module LLM pipeline, each with a dedicated prompt template:

1. **Entrypoint Chat Module** — routes user queries to appropriate modules (goal extraction, intent extraction, output generation, or conversational follow-up)
2. **Goal Module** — extracts structured Goal (task type, domain, topic) from user query. JSON schema output.
3. **Intent Module** — extracts explicit intents from the query plus implicit intents the task logically requires. Each intent: {name, description, explicit/implicit flag}. Uses the Goal as context.
4. **Intent Dimension Module** — maps each intent to one or more manipulable dimensions. Each dimension: {name, description, control type (Likert/slider/hashtag/etc.), initial value, value range}. Control type is chosen based on value semantics (ordinal → Likert, continuous → slider, categorical → hashtag/dropdown).
5. **Preview Module** — given the current dimension values, explains what the output will be like. Provides verbal preview without generating the full output.
6. **Output Module** — generates the final output using Goal + Intents + all Dimension values as structured context.
7. **Linking Module** — post-generation, creates bidirectional links between dimension values and specific phrases in the output. Each link: {dimension, value, output phrase, relevance score}.

All modules use GPT-4 with structured JSON output schemas. The pipeline is sequential: Goal → Intents → Dimensions → (user adjustment) → Preview/Output → Linking.

User study (n=12): compared IntentFlow to baseline chat for writing tasks. Significant improvements in perceived control (p<.001), output satisfaction (p<.001), and output quality (p<.05). Participants described IntentFlow as providing "knobs to turn" instead of having to re-prompt from scratch.

Technical evaluation across 12 writing tasks: Goal alignment 4.42/5, Intent completeness 4.17/5, Intent relevance 4.58/5, Dimension relevance 4.25/5, Dimension coverage 3.75/5 (lowest — some intents lacked sufficient dimensions).

## Extracted concepts

- [[intent-decomposition]] — created
- [[intent-decomposition]] — created
- [[intent-output-traceability]] — created
- [[semantic-intermediate-layer]] — updated (IntentFlow as complementary intent-level approach)
- [[gentle slope]] — updated (intent dimensions as new rung)
- [[augmented-semantics]] — updated (Linking Module as intent-level implementation)
- [[structured vs unstructured tension]] — updated (IntentFlow's decomposition as bridge mechanism)
- [[hierarchical-design-semantics]] — updated (IntentFlow's parallel hierarchy)
- [[scoped-semantic-editing]] — updated (dimension adjustment as intent-level scoped editing)
- [[semantic-drift]] — updated (IntentFlow's management phase as drift prevention)
