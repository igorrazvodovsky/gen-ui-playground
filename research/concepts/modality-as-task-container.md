---
type: concept
tags: [component-mapping, user-agency, specification, generative-ui]
sources: [sources/interface-framework-HAIC.md]
created: 2026-03-06
---
An AI interface modality is not a UI component — it's a **task-contextual container** that embodies decisions about how visible, proactive, and autonomous the AI should be for a given task. Andru & Saksena (2025) identify eight: prompt bar (quick queries), hub (command centre), contextual (inline suggestions), rail (persistent side panel), full-screen (deep focus), split-screen (parallel content + AI), canvas (spatial workspace), and immersive (AI as co-creator). Each occupies a region in a 3D space of workflow complexity × AI autonomy × AI reasoning.

The critical insight is that these aren't just layout options — they're **collaboration contracts**. Choosing "split-screen" commits to a specific division of labour (human works on content, AI assists alongside). Choosing "contextual" commits to non-disruptive nudges. The modality encodes the interaction paradigm, not just the viewport.

## Context

The genUI pipeline currently makes no explicit decision about *what kind of interface container* to generate. It goes from task analysis → data model → component spec, implicitly assuming a single-view rendering. But real tasks may warrant different containers at different stages — exploration might start in a prompt bar, escalate to full-screen for deep work, then use a rail for monitoring. The modality decision sits above pattern selection: it's the macro-level choice about how AI and human will share the screen.

## Connections

- **Extends** [[task-interface-duality]] — DuetUI's duality maps task structure to interface structure; modalities add a *container* level above this. The task decomposition drives not just which components appear but which modality hosts them.
- **Extends** [[context-driven adaptation]] — modality selection is itself an adaptation decision driven by task context (complexity, autonomy needs, reasoning depth), not just user profile.
- **Supports** [[design-time-vs-use-time]] — modality selection is a use-time decision (depends on the current task's demands), not a design-time one. This is a strong argument for the LLM agent choosing the modality at runtime.
- **Enables** [[fluid-modality-transitions]] — the taxonomy is prerequisite for defining transition rules between modalities.
- **Informs** [[pattern-driven transformation]] — at the highest level, the pattern library needs modality-level patterns (not just component-level) that define which container to use and what it affords.
- **Tension with** [[cognitive-load-bounded-display]] — the paper finds information density must match modality space. A contextual modality can't carry the same reasoning depth as a full-screen one. This is a concrete constraint: the AI's explanation verbosity should be modality-aware.

## Practical implementations

- **Adobe's marketing platform** — the paper's prototype demonstrates modality transitions across audience creation and journey management workflows.
- **ChatGPT's UI** — effectively implements prompt bar (quick input) → full-screen (conversation) with canvas (side-by-side editing). No formal framework for when to use which.
- **GitHub Copilot** — contextual modality (inline suggestions) with a rail option (Copilot Chat panel).
- **Cursor** — split-screen modality (code + AI chat side by side), with contextual (inline completions).
- **Notion AI** — contextual modality (inline block suggestions) within an existing workspace.
- **Claude artifacts** — effectively a split-screen modality: conversation on the left, rendered artifact on the right.

## Relevance to project

Sits at the **top of the pattern hierarchy** — above organism patterns, above component selection. When the pipeline analyses a user's task, the first macro decision should be: which modality is this task best served by? A simple lookup ("show me today's weather") warrants a prompt bar or contextual response. A complex multi-entity task ("plan a dinner party with dietary constraints") warrants split-screen or canvas.

For the pipeline, this means the pattern library needs a **modality selection layer**: task complexity + autonomy requirements + reasoning depth → recommended modality → which then constrains downstream pattern and component choices. A contextual modality can only surface lightweight patterns (badges, inline suggestions); a canvas modality can surface the full pattern library.

This also informs the [[semantic-intermediate-layer]] design: the semantic specification should include a modality recommendation that the user can override, not just component-level design decisions.

## Open threads

- The framework was validated with marketing practitioners only. Do the eight modalities and three dimensions generalise to other domains?
- The "immersive" modality is speculative (the paper acknowledges current AI can't support it). How far out is it, and should the pipeline prepare for it?
- How does modality selection interact with multi-step tasks where different steps have different complexity levels? The paper's case studies show transitions, but the *decision logic* for when to transition is left to the designer.
- Can modality selection be automated based on the task model, or does it always require human choice?
