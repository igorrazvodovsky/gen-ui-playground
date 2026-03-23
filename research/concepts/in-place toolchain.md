---
type: concept
tags: [user-agency, generative-ui]
sources: [sources/lit-malleable-software]
created: 2026-02-06
---
The tools for modifying software should live inside the same environment where you use that software. No context-switch to a separate IDE, no leaving the browser, no deployment pipeline.

## Context

Spreadsheets are the canonical example: the formula bar is right there. You don't open Excel in one window and a "spreadsheet development environment" in another. HyperCard had the same property — scripting happened inside the card stack, not in a separate tool.

In contrast, browser extensions require leaving the browser to write code, package it, and install it. PushPin initially had the same problem (code lived in a GitHub repo, deployed via standard pipeline). Farm and Patchwork moved code into the Automerge data layer to fix this — tools could be edited at runtime.

The scrappy aesthetic matters too: if the interface *looks* like it can be modified (like a spreadsheet), people are more willing to try. Pixel-perfect polish signals "don't touch."

## Relevance to project

For generative UI: JELLY's "inspect" tool is an in-place toolchain — users can view and edit the underlying data model without leaving the generated interface. This is critical. If modifications require dropping into a JSON editor or a code environment, the system fails at malleability.

For json-render: can the renderer itself expose an editing mode? Something like browser dev tools but for the JSON spec — click a component, see its spec, modify it, see the change live.

## Connections

- Enables [[gentle slope]] — no context-switch means lower friction for each step up the slope
- Related to [[UI composition]] — if the toolchain is in-place, it needs to compose with the running UI
- **Enabled by** [[software-as-data-structure]] — Varv demonstrates that representing the full application as data makes generic inspection/editing tools possible. Its data inspector (browse/edit concept instances) and view inspector (click element → see its concept, template, and data source) are concrete implementations of an in-place toolchain. These tools work on *any* Varv application because they operate on the universal data structure, not application-specific APIs.
- **Supports** [[accretive-extensibility]] — Varv's tooling (Cauldron IDE, block editor, YAML editor) lets users add new concept definition files without leaving the application environment. The in-place toolchain is what makes accretive extension practical for non-experts.
- **Extended by** [[augmented-semantics]] — Park et al. (CHI '26) show a form of in-place inspection that goes beyond showing spec/data properties: extracting what the AI *decided* and displaying it alongside what the user *specified*. The semantic analysis (match/conflict/omission indicators) turns the inspection tool from passive display into active coaching. Participants described it as an "honest coach that clarified both why the UI looked a certain way and what to do next." This suggests in-place toolchains for generative UI need not just *what is* (spec state) but *why* (semantic provenance).

- **Generalised by** [[parallel-state-display]] — Viégas & Wattenberg (2023) argue that in-place instrumentation should extend beyond spec/data inspection to continuous display of the system's internal state (its model of itself and the user). The dashboard concept generalises the inspect tool from "see the spec" to "see what the system believes." This is in-place tooling for trust calibration rather than just modification.
- **Concretised by** [[prompt-as-interface-object]] — Henry Riche et al.'s (CHI '25) AI-instruments (Fragments, Transformative Lenses, Generative Containers, Fillable Brushes) are concrete examples of in-place tools for AI interaction. They live in the workspace alongside the content they affect — no separate panel, no mode switch. Lenses are spatially scoped (draw a region, apply a transformation); Brushes transfer attributes by painting. These demonstrate that in-place AI tooling can go beyond inspection to include intent specification and scoped modification.
- **Extended by** [[tangible-agency]] — DuetUI embeds agent interaction controls (input fields, sliders, action buttons, date pickers) directly within the task interface. These aren't inspection tools — they're *agent capability tools* that make abstract agent functions directly manipulable in context. The in-place toolchain expands from "inspect and modify the generated UI" to "steer the agent from within the generated UI."

## Open threads

- What does "inspect mode" look like for a json-render-based system? Can you click on a rendered component and see/edit the JSON that produced it? **Varv's view inspector answers this concretely**: ctrl+click an element → see its concept type, template file, and property values → jump to the source in the Cauldron editor → edit → see changes live. A json-render equivalent would need: click element → see its spec node (type, props) → edit props → see re-render.
- How do you surface the data model to users who don't understand JSON schemas?
- Varv offers three authoring interfaces at different skill levels: YAML editor (text), JSON Schema autocomplete (IDE), Blockly editor (visual). Which level is right for genUI customisation?
