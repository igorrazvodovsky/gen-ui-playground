---
title: "Intent Tagging: Exploring Micro-Prompting Interactions for Supporting Granular Human-GenAI Co-Creation Workflows"
authors: [Frederic Gmeiner, Nicolai Marquardt, Michael Bentley, Hugo Romat, Michel Pahud, David Brown, Asta Roseway, Nikolas Martelaro, Kenneth Holstein, Ken Hinckley, Nathalie Riche]
year: 2025
venue: "CHI '25"
type: literature
status: processed
---
## Core idea

Intent tags are small, atomic [label: value] keyword pairs — graphical micro-prompts — that users place on a 2D canvas to steer generative AI content creation. The paper proposes this as a middle ground that combines the open-endedness of text prompting with the manipulability and guidance of GUI controls. Unlike chat-based interaction (linear, sequential, all-or-nothing), intent tags support non-linear, iterative, and granular steering of generation — users can adjust any single aspect (narrative, visual style, content source) independently and in any order.

## Key concepts

- **[[concepts/intent-tag-as-micro-prompt|Intent tags as micro-prompts]]** — atomic [label: value] pairs that reify a single aspect of user intent as a persistent, draggable, toggleable graphical object on a spatial canvas. Two types: concept tags (user-authored keywords) and reference tags (external documents/images).
- **[[concepts/meta-intent-elicitation|Meta-intent elicitation]]** — the system's suggestions (tag suggestions, drop-down alternatives, opposite sliders) help users *discover* what they want, not just express known intent. Users reported the system helped them think through creative decisions they hadn't considered.
- **[[concepts/graduated-ambiguity-tolerance|Graduated ambiguity tolerance]]** — the same interface accepts intent at wildly different levels of precision ("Dark and Moody" and "#FF33CC" are both valid tag values), and the system handles both gracefully.
- **Tag grounding acts** — bidirectional: (1) the system decomposes a longer text prompt into individual intent tags ("grounding from text prompt"), and (2) the system extracts intent tags from an existing slide's content, style, and sources ("grounding from slide"). This closes the loop: tags → content and content → tags.
- **Tag groups** — three semantic clusters (Narrative, Visual Style, Content Sources) that organise tags spatially. Users valued this structure for forcing explicit thinking about presentation dimensions they normally skip (e.g. audience).
- **Opposite slider widget** — for each tag, the system generates an opposite value and provides a five-step continuous slider between the two poles. Primarily used for reflection ("what *is* the opposite of what I want?") rather than direct steering.

## Technical approach

IntentTagger is built with TypeScript/ReactJS, using ReactFlow for the 2D canvas and Blocknote for text editing. Slide rendering uses a modified fork of spectacle.js. Generation uses GPT-4o via the OpenAI API.

**Generation pipeline:** Active intent tags (concept + reference) are collected → GPT generates a markdown outline → GPT generates a JSON slide deck representation grounded in the outline, active tags, and deck references. Drop-down alternatives, slider explanations, and tag suggestions are all generated asynchronously per tag via separate GPT calls.

**Two scoping levels:** The Deck Steering Canvas controls the entire deck (global tags). The Slide Steering Overlay controls individual slides (local tags derived from the slide's current content via grounding-from-slide). Local changes can be accepted for one slide or applied to all slides.

**User study:** 12 participants, comparative tasks (IntentTagger vs PowerPoint Copilot + Designer). IntentTagger scored significantly higher on all 9 Likert measures: control over generation (MD = 2.67), intent communication (MD = 1.83), meta-intent elicitation (MD = 1.58), task success (MD = 2.33), and efficiency (MD = 2.33). Participants especially valued non-linear workflows, flexible intent expression, and integrated suggestions.

## Extracted concepts

- Created: [[concepts/intent-tag-as-micro-prompt]]
- Created: [[concepts/meta-intent-elicitation]]
- Created: [[concepts/graduated-ambiguity-tolerance]]
- Updated: [[concepts/intent-decomposition]] — intent tags as user-driven alternative to system-driven decomposition
- Updated: [[concepts/prompt-as-interface-object]] — intent tags as another reification modality
- Updated: [[concepts/reflection-in-intent]] — tag grounding from slides as reflection mechanism
- Updated: [[concepts/gentle slope]] — intent tags add a new rung
