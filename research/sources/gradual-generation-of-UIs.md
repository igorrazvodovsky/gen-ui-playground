---
title: "Gradual Generation of User Interfaces as a Design Method for Malleable Software"
authors: [Bryan Min, Peiling Jiang, Zhicheng Huang, Haijun Xia]
year: 2026
venue: "arXiv preprint (cs.HC)"
type: literature
status: processed
---
## Core idea

Instead of generating a final UI in one shot from a prompt, structure the generation process into intermediate UI "layers" that load progressively. Each layer exposes a different dimension of customisation (e.g. categories, layout, content, style). Users discover customisation options by rewinding to the layer where that dimension was decided — the generation process itself becomes the customisation surface.

## Key concepts

- [[generation-layer-as-customisation-surface]] — the paper's central contribution: intermediate generation states, rendered as partial UIs, are the primary mechanism for customisation discovery
- Layer-specific specification formats — each layer naturally uses a different spec type: natural language (categories), JSON schema (layout), code/type definitions (content), CSS variables (style)
- Designer-defined layers — the designer's role shifts from creating fixed mockups to identifying key intermediate stages and designing customisations per stage
- Personal intermediate layers — end-users can introduce their own pluggable layers into the generation process, extending customisation beyond what designers anticipated
- Cross-platform reusable layers — platform-specific layers (e.g. haptics) can be slotted into existing layer stacks without redesigning the whole system

## Technical approach

The design method has four steps:

1. **Identify key intermediate stages** — designers reflect on their design process and identify which stages produce meaningful partial UIs (e.g. a video homepage progresses through category rankings → spatial layout → content population → visual styling)
2. **Design customisations per stage** — each layer gets its own set of user-facing controls. The categories layer might let users reorder/add/remove categories; the layout layer might let users resize and rearrange sections
3. **Develop specifications per stage** — each layer's customisations are documented as specs the generation system can consume. Different layers use different formats: documentation pages, JSON type definitions, code blocks, CSS variables
4. **Ensure smooth transitions** — key UI elements must persist visually across layers so the user can track how their choices cascade (e.g. a category block in layer 1 becomes a layout section in layer 2, then a content panel in layer 3, then a styled card in layer 4)

Three prototypes demonstrate the method: a generative video feed homepage (4 layers: Categories → Layout → Content → Style), a team scheduling calendar (4 layers: Data → Information → Time Slots → Style), and a course management system (4 layers: Files → Widgets → Content → Style).

No user evaluation. No implementation architecture. This is a design method paper — it proposes a way of thinking about customisation in genUI, not a system.

## Extracted concepts

- [[generation-layer-as-customisation-surface]] — created
- Updated: [[gentle slope]], [[configuration-model-as-design-space]], [[staged-co-generation]], [[dimensions-of-meaningful-variation]]
