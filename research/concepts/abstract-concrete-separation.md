---
type: concept
tags: [specification, component-mapping, generative-ui]
sources: ["sources/varv"]
created: 2026-02-11
---
Specifications should be split into an abstract layer (what happens semantically — "item is completed") and a concrete layer (how it happens in a specific modality — "checkbox is clicked"). The abstract layer is view-agnostic and reusable; the concrete layer binds abstract events to specific interaction modalities (DOM clicks, touch gestures, keyboard shortcuts, voice commands).

## Context

Varv uses this as a convention: concept definitions are split into abstract and concrete files. The abstract file defines a `todo` concept with a `toggleCompleted` action and no when-block (no trigger — it's purely semantic). A separate concrete file adds the when-block: `toggleCompleted` fires when the `todoCheckbox` view element is clicked. This means the same abstract concept can be reused across DOM, WebGL, AR, or IoT views by swapping only the concrete bindings.

This separation exists at multiple levels in UI systems. CSS separates content structure (HTML) from visual presentation. React separates component logic (hooks) from rendering (JSX). The model-view-controller pattern separates domain logic from presentation. But Varv applies it to interactive *behaviour* specifically — the event/action semantics are separate from the input modality that triggers them.

The architectural benefit: retargeting. Moving a Varv application from a desktop web interface to a mobile touch interface requires only new concrete bindings, not reimplementation of application logic. The [[model hierarchy]] makes a similar point at a higher level of abstraction — task models are platform-independent; only presentation and layout models are platform-specific.

## Connections

- **Extends** [[model hierarchy]] — the abstract/concrete split maps to the task-to-presentation transformation. Task and dialog models are abstract; presentation and layout models are concrete. Varv applies this split within a single concept definition, not across separate model layers.
- **Supports** [[specification-based rendering]] — the abstract layer is the stable specification; the concrete layer is a platform-specific binding. Multiple renderers can share the same abstract spec.
- **Enables** [[context-driven adaptation]] — different user contexts (desktop vs. mobile, mouse vs. touch, sighted vs. screen reader) can be handled by swapping concrete bindings without touching abstract logic. Accessibility adaptations become a matter of providing alternative concrete layers.
- **Relates to** [[pattern-driven transformation]] — the transformation from abstract to concrete is itself a pattern. "For a toggle action in a checkbox context, bind to click" is a mapping rule.
- **Supports** [[concept-as-composition-unit]] — keeping concepts abstract enables reuse across different view contexts. An "assignable" mixin can be injected into any concept regardless of how "assignment" is presented.

## Practical implementations

- **React Native / React + react-native-web** — shared component logic (hooks), platform-specific rendering (native views vs. DOM)
- **Flutter** — shared Dart logic, platform-specific rendering engine
- **Headless UI libraries** (Radix Primitives, React Aria, Headless UI) — provide accessible interaction behaviour without prescribing visual presentation. The "headless" part is the abstract layer; the consumer provides the concrete styling.
- **WAI-ARIA** — semantic roles (abstract) mapped to platform accessibility APIs (concrete)
- **MVC pattern** — model + controller are abstract; view is concrete
- **Design tokens** — abstract design decisions (spacing-md = 16px) with concrete platform bindings (CSS custom properties, Swift constants, Android dimens)

## Relevance to project

For the genUI pipeline, this suggests a two-pass generation strategy:

1. **Abstract pass** — LLM generates semantic concepts: entities, relationships, valid actions, state transitions. Platform-independent. This is the [[task-model]] + [[domain-data-model]] + behaviour rules.
2. **Concrete pass** — deterministic mapping rules bind abstract concepts to specific components and interaction patterns for the target platform. This is where [[constraint-driven component selection]] and the [[component catalog as schema]] come in.

The abstract layer is reusable across platforms and stable across regeneration cycles. The concrete layer is platform-specific and can be swapped without touching the abstract layer. This also supports the [[gentle slope]]: users who edit the concrete layer (swap which component renders a field) don't need to understand the abstract layer (what the field means semantically).

For the malleability problem ([[milestones#Opportunity 1 — Generated UIs are disposable|O1]]): the abstract/concrete split clarifies where user edits should go. Editing a value is an abstract action (modify state). Dragging a component to resize it is a concrete action (modify layout). These are different layers and should be handled differently in the feedback loop. This concept appears as solution S3 in the OST.

- **Applied to attributes by** [[fluid-attributes]] — Meridian shows abstract-concrete separation at the attribute level: the attribute definition (name, source field, semantic type) is abstract; the formatter and display type are concrete. The same attribute can have different concrete presentations in overview vs. detail views, or on desktop vs. mobile. This is Varv's abstract/concrete split applied to data presentation rather than interaction behaviour.

## Open threads

- How fine-grained should the abstract/concrete split be? Varv splits at the concept level (one abstract file, one concrete file). Could you split at the action level (each action has abstract and concrete variants)?
- Does the LLM need to generate abstract and concrete layers separately, or can it generate a combined spec that's later factored into layers?
- What's the minimum abstract layer for a generative UI system? Full Varv-style actions and triggers, or just entity schemas with type constraints?
