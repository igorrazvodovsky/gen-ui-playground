---
type: concept
tags: [component-mapping, generative-ui]
sources: [sources/lit-malleable-software, sources/deja-vu]
created: 2026-02-06
---
Breaking an application's control over the interactive environment so that independently developed tools/components can coexist and communicate in a shared workspace. The problem isn't just sharing data — it's sharing the *screen*.

## Context

Five approaches from the literature:

1. **Compound documents** (OpenDoc, OLE) — documents composed of multiple media types, each edited in place by a different tool. Open-ended: developers can add new media types and editors.
2. **Entanglers** (Tchernavskij) — a dedicated layer that dynamically detects and connects related UI elements across components. Enables things like reusing a colour picker from one app inside another.
3. **Event-trigger composition** (Varv) — behaviour specified as lists of event triggers that can be additively extended. New tools hook into existing events without modifying original code.
4. **Shared-state concept composition** (Varv) — [[concept-as-composition-unit|concepts]] are composed using extension operators (inject, join, omit, pick). Multiple concepts share state through a centralised store (no encapsulation). This enables cross-cutting features but at the cost of information hiding. Varv's Checkers-O-Thello case study shows two independently developed games merged into one by accretively adding a resolution concept.
5. **Declarative binding composition** (Déjà Vu) — concepts share nothing by default. Composition is declared in an HTML-like template via [[declarative-concept-binding]]: property bindings for dataflow, shared IDs for [[identity-based-data-integration]], and `dv.tx` wrappers for [[transactional-composition]]. The template IS the integration architecture — all composition knowledge lives there, not in the concepts. Opposite end of the spectrum from Varv: maximum isolation, explicit-only coordination.

PushPin's experience revealed key tensions: components need isolation (to reason about behaviour locally) but also coordination (shared hover states, selection, context). Strong isolation prevents rich UX. The Embark prototype showed the opposite: deep context sharing between embedded views (maps aware of outline content) enables powerful interactions. Déjà Vu demonstrates that productive composition is possible with maximum isolation — but requires a richer binding language to compensate.

## Connections

- Depends on [[shared data layer]] — components need common data to coordinate
- Enables [[gentle slope]] — if users can rearrange and recombine components without code, the slope is gentler
- **Related but distinct from** [[pattern composition]] — pattern composition is about building UI structures from sub-patterns (design-time); UI composition is about how instantiated components coexist and communicate (runtime)
- **Informed by** [[model hierarchy]] — dialog models define which views can coexist, presentation models define component boundaries
- **Mechanism provided by** [[concept-as-composition-unit]] — Varv's concepts compose at the specification level via extension operators; the resulting composed concepts then produce composed UI. The specification-level composition drives the runtime composition.
- **Enabled by** [[accretive-extensibility]] — new UI functionality can be layered on top of existing interfaces without modifying them. Varv's case studies show features added one at a time, each composing with existing UI.
- **Alternative binding approach** [[declarative-concept-binding]] — Déjà Vu shows that explicit template bindings can achieve productive composition while maintaining complete concept isolation. The binding template is itself inspectable and modifiable.
- Tension: isolation vs. coordination. Too much isolation prevents rich interactions; too little makes the system fragile. Varv takes the extreme coordination position (shared state, no encapsulation); Déjà Vu takes the extreme isolation position (shared nothing except IDs). Both produce working applications. The right position probably depends on the domain: data-heavy apps (dashboards, analytics) benefit from shared state; workflow-heavy apps (e-commerce, project management) benefit from explicit coordination.

## Practical implementations

- **React Context**: Components share state through context providers without direct coupling
- **Redux/Zustand**: Centralized state stores where components subscribe to shared state
- **Event buses**: Components emit and listen to events (EventEmitter, mitt, Posthog)
- **Micro-frontends**: Frameworks like single-spa, Module Federation enable independent apps to coexist
- **Web Components**: Shadow DOM provides isolation, custom events enable coordination
- **JELLY's approach**: Shared data model (CRDT-based) — all components read/write to same document

## Relevance to project

This is the core challenge for the json-render step. json-render maps JSON to React components, but: how do those components communicate? Can a map component react to selection in a list component? Can a user drag a component from one panel to another?

JELLY handles this through the shared data model — components don't talk to each other directly, they all read from and write to the same model. Changes propagate through the model. This is a clean architecture but limits direct component-to-component interaction (like synchronised hover).

**Pattern library implication**: Organism-level patterns need composition rules that specify how sub-components coordinate. A "Search" pattern might say "Results list selection should filter Detail view" — this coordination logic needs encoding somewhere.

## Open threads

- What level of component communication does json-render support? Is it purely one-way (JSON → render) or can components emit events back?
- How should cross-component interactions (selection sync, hover highlighting) work in a generated UI?
- Is JELLY's "everything goes through the model" approach sufficient, or do you need a richer composition layer?
