---
title: "Sensecape: Enabling Multilevel Exploration and Sensemaking with Large Language Models"
authors: [Bryan Min, Srishti Palani, Haijun Xia]
year: 2024
venue: "CHI 2024"
type: literature
status: processed
---
## Core idea

A canvas-based sensemaking tool that uses LLMs to enable **multilevel exploration** — users can zoom in/out to see information at different abstraction levels (keywords ↔ summaries ↔ full text), and "dive" into subtopics to create nested canvas layers. The system externalises the foraging/sensemaking dual loop (Pirolli & Card) as two coordinated views: an infinite canvas for spatial foraging and a hierarchy panel for structural sensemaking.

## Key concepts

- **[[semantic-zoom]]** — LLM-driven level-of-detail rendering. As the user zooms out, nodes compress (full text → summary → keywords); zooming in expands them. The abstraction level is computed by the LLM, not just truncation. The zoom level controls *cognitive density*, not just visual scale.
- **Semantic dive** — double-clicking a node creates a new nested canvas layer scoped to that subtopic. The hierarchy view updates to show the nesting. This is essentially navigation through abstraction depth — moving from "AI in healthcare" into "diagnostic imaging" creates a child workspace.
- **Expand bar** — four LLM interaction modes applied to any node: Prompt (freeform question), Explain (expand the concept), Questions (generate related questions), Subtopics (decompose into sub-concepts). Each produces new nodes connected to the source. This reifies the LLM as a multi-modal expansion engine, not just a chatbot.
- **Foraging/sensemaking loop** — from Pirolli & Card's information foraging theory. Foraging = collecting and organising raw information (canvas view). Sensemaking = building mental models and schemas from collected information (hierarchy view). The two activities alternate, and supporting both simultaneously (rather than sequentially) reduces context-switching cost.
- **Hierarchy view** — a tree panel showing the abstraction levels created by semantic dives, with the current canvas highlighted. Makes the exploration structure visible and navigable. Users can jump between levels.

## Technical approach

Built as a web application with an infinite canvas (zoom + pan) and a sidebar hierarchy.

**Node types**: Text notes (user-created), LLM-generated expansions, and collections (spatial groupings the user draws). Each node stores its full text, LLM-generated summary, and LLM-generated keywords as three pre-computed representations.

**Semantic zoom implementation**: Three rendering modes per node triggered by zoom thresholds. On node creation, the LLM generates summary and keyword versions. As the user zooms, nodes crossfade between representations. This is pre-computation (not on-demand) — the LLM call happens once at creation time, and zoom just switches between cached representations.

**Semantic dive**: Creates a new canvas context scoped to the dived node's content. The hierarchy panel updates. Child canvases inherit the parent's topic context for LLM calls. Navigation between levels via the hierarchy panel or browser-like back/forward.

**Expand bar**: Appears when a node is selected. Four buttons each trigger a different LLM prompt template with the node's content as context. Generated nodes are placed spatially adjacent to the source and connected with edges.

**User study** (n=14, within-subjects): Compared Sensecape against a baseline LLM chatbot for exploratory sensemaking tasks. Sensecape users produced broader topic coverage (more subtopics explored), deeper exploration (more levels of detail), and significantly better sensemaking outcomes (ability to identify connections and synthesise). Key finding: the hierarchy view was rated most useful — externalising the abstraction structure helped users maintain orientation during deep exploration.

## Extracted concepts

- Created: [[semantic-zoom]]
- Updated: [[gentle slope]] — added semantic zoom as a mechanism at the "view" end
- Updated: [[overview-detail-pattern]] — noted semantic zoom as level-of-detail mechanism within the pattern
