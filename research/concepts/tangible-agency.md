---
type: concept
tags: [generative-ui, user-agency, component-mapping]
sources: [sources/duetui-bidirectional-co-generation]
created: 2026-03-05
---
An agent's abstract capabilities should be made concrete and directly manipulable through embedded UI controls, transforming the agent from a conversational partner into a set of tangible instruments the user can wield. Instead of typing "search for flights under €500," the user adjusts a budget slider and clicks a search button — structured UI affordances that both capture precise intent and trigger specific agent functions.

## Context

DuetUI's formative study found 11/12 participants faced a gulf of execution stemming from a poor mental model of the AI's capabilities (F2). Users perceived the AI as a "black box" and avoided certain interaction modalities because they lacked confidence in the AI's interpretive power. Tangible agency bridges this gulf by replacing ambiguous text prompts with clear signifiers — each control makes a specific capability visible and actionable.

The term draws on Shneiderman's principles of direct manipulation: continuous representation of task objects, rapid reversible actions, minimal cognitive load. The agent's functions are reified as UI components — InputField, Selection, ActionButton, Slider, DatePicker, Dashboard, NavigationCard — each with a clear signifier of what it does.

## Connections

- Is a concrete implementation of [[prompt-as-interface-object]] — Henry Riche et al. argue prompts should be persistent, manipulable graphical objects. Tangible agency implements this for agent capabilities specifically: each control is a reified prompt fragment that persists in the workspace.
- Supports [[intent-decomposition]] — IntentFlow reifies intent dimensions as typed controls (Likert, slider, hashtag). Tangible agency applies the same principle to agent *functions*, not just intent parameters. The slider for budget IS an intent dimension control AND an agent capability trigger simultaneously.
- Enables [[graduated-ambiguity-tolerance]] — structured controls accept precise values (€500 on a slider) while the overall task specification remains vague. Users choose their precision level per dimension through which controls they engage with vs. skip.
- Complements [[in-place toolchain]] — the in-place toolchain embeds editing tools within the running interface for *inspection and modification*. Tangible agency embeds agent interaction tools for *task execution and steering*. Both strategies embed tools in context rather than requiring mode switches.
- Instantiates [[LLM-operable interface]] from the other direction — LAUI discusses making UIs operable by LLM agents. Tangible agency makes LLM agent capabilities operable by users. Two faces of the same coin: a truly collaborative interface must be operable in both directions.

- **Formalised by** [[paradigm-graph-as-design-language]] — Shen et al. (CHI '26) identify two paradigms that correspond precisely to tangible agency: P7 (Generative Prompt Control Widgets — GenAI produces interactive widgets for prompt parameter steering) and P8 (Generative Artifact Control Widgets — GenAI produces widgets bound to artifacts for iterative manipulation). P7 extends the *prompt*; P8 extends the *artifact*. This distinction matters: a budget slider that changes the search query (P7) and a chart axis control that directly modifies the visualisation (P8) are structurally different even though both look like "AI-generated controls." See [[prompt-interaction-synergy]].

## Practical implementations

- **DuetUI**: seven component types (InputField, Selection, ActionButton, Slider, DatePicker, Dashboard, NavigationCard) embedded in the task document. Each triggers a specific agent function.
- **Notion AI / Coda AI**: inline AI commands embedded in the document context, though typically invoked through menus or slash commands rather than dedicated controls.
- **Figma AI features**: AI actions available as contextual controls on selected objects, making capabilities visible and scoped to the current selection.
- **Smart home interfaces**: physical controls (dimmers, thermostats) that make abstract system capabilities tangible — the conceptual ancestor.

## Relevance to project

For the genUI pipeline, tangible agency informs how the generated UI should expose agent interaction points. The rendered interface shouldn't just display data — it should include controls that let the user steer the agent (request more data, change scope, trigger regeneration of a section). These controls need to be part of the UI specification, not bolted on. This means the component catalog needs agent-interactive components alongside pure data-display components. The [[component catalog as schema]] should include action-triggering components (search buttons, refinement sliders) whose prop schemas specify which agent function they invoke.

## Open threads

- **Control generation**: who decides which tangible agency controls appear? In DuetUI, the Interface Agent generates them based on the task stage. For the pipeline, this is a mapping problem — the task model implies which agent capabilities are relevant, and the UI spec needs to include the corresponding controls.
- **Discoverability vs. clutter**: more controls = more discoverable capabilities but also more visual noise. DuetUI's staged approach manages this — different stages show different controls. A more dynamic approach would show controls contextually based on user focus.
- **Non-expert assumption**: DuetUI's user study participants were young, tech-literate. P4 worried "my mom couldn't use this." Whether tangible agency is genuinely more accessible than conversational prompting for older or less tech-savvy users is untested.
