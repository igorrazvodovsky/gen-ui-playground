---
title: "Varv: Reprogrammable Interactive Software as a Declarative Data Structure"
authors: [Marcel Borowski, Luke Murray, Rolf Bagge, Janus Bager Kristensen, Arvind Satyanarayan, Clemens N. Klokmose]
year: 2022
venue: "CHI '22"
type: literature
status: processed
---
## Core idea

Interactive applications can be represented entirely as compositions of declarative JSON data structures called "concepts." Each concept bundles a schema (state shape and types), actions (state transitions specified as when/then rules), and triggers (events that cause actions). Because the whole application is data — not imperative code — it becomes inherently extensible: new functionality is added by layering new concept definitions on top of existing ones, never by modifying source code.

## Key concepts

- [[accretive-extensibility]] — the principle that software modification happens purely by addition. New concept definitions override, extend, or compose existing ones using extension operators (inject, join, omit, pick). No existing code is ever edited.
- [[software-as-data-structure]] — the entire application (logic, state, view bindings) is an inspectable, modifiable JSON data structure. Goes beyond [[specification-based rendering]] (which is UI-only) to encompass behaviour and state.
- [[abstract-concrete-separation]] — convention of splitting concept definitions into abstract (view-agnostic semantic events) and concrete (view-dependent bindings to specific interaction modalities). Enables retargeting across platforms.
- [[concept-as-composition-unit]] — the "concept" as a named, composable bundle of state + behaviour. Not a component (which implies a visual element) — a concept can be purely abstract (e.g. "assignable", "colorable") and composed into other concepts.

## Technical approach

**Architecture** — six components:

1. **Concept definitions** — JSON files specifying concepts (schema, actions, triggers). Merged by the event engine at runtime; later definitions override earlier ones.
2. **Event engine** — parses and merges all concept definitions, builds the runtime model, handles event propagation. Reactive triggers (state changes) and view triggers (user input) fire events that flow through action chains.
3. **Templates** — view-layer specifications that bind concept state to visual elements. View-dependent (a DOM template is HTML; a WebGL template would be a scene graph).
4. **Views** — render templates with state from concepts. Independent of the event engine — can connect different view types to the same underlying concepts.
5. **Mappings** — pointers defining where concept state is stored. Properties can map to different data stores (DOM for persistent/synced, memory for ephemeral, localStorage for local persistence).
6. **Data layer** — data stores that persist and synchronise concept instance state. Decoupled from both concepts and views.

**Concept language primitives:**

- **Schema** — modified JSON Schema defining state shape and types. Supports `derive` for computed properties (like `totalCount` = length of `todos` array).
- **Actions** — when-block (trigger condition) + then-block (action sequence). Actions include: get, set, new, remove, append, calculate, toggle, etc. Can be chained, forked, filtered with `where`, and parameterised with `@` variables.
- **Triggers** — reactive (stateChanged, action completion, interval) and view (click, key, mouseDown, mouseUp, mouseMove).
- **Extensions** — four composition operators: `inject` (merge into existing concept), `join` (merge into new concept), `omit` (remove from concept), `pick` (select subset into new concept). Enable mixin-like reuse.

**Event flow** — events carry contexts (target concept instance + variables) and shared variables. Actions process contexts sequentially, can filter (`where`), transform (`select`), and fork (`run`) the event stream. This is essentially a declarative data-flow pipeline over concept instances.

**Implementation** — three prototypes: (1) Webstrates + Codestrates v2 (collaborative web platform, main implementation), (2) Electron (local development), (3) Observable (notebook-style). All share the same Varv runtime; differ only in storage and editing environment.

**Tooling enabled by the declarative representation:**

- YAML editor — friendlier syntax for concept definitions
- JSON Schema autocompletion — IDE support for the concept language
- Blockly-based block editor — visual editing of actions and triggers
- Data inspector — browse/edit concept instances and their properties in the Cauldron IDE
- View inspector — ctrl+click any UI element → see its concept type, template, and data; jump to source code

## Extracted concepts

- [[accretive-extensibility]] (new)
- [[software-as-data-structure]] (new)
- [[abstract-concrete-separation]] (new)
- [[concept-as-composition-unit]] (new)
- Updated: [[specification-based rendering]], [[in-place toolchain]], [[UI composition]], [[json-document-backed-components]], [[gentle slope]], [[shared data layer]], [[pattern composition]], [[tools-not-apps]]
