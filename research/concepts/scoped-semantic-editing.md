---
type: concept
tags: [generative-ui, model-evolution, user-agency]
sources: [sources/semantic-guidance-park]
created: 2026-02-20
---
Refinement in generative UI should work through explicit semantic diffs — specifying exactly which semantic value changed and how — rather than through conversational re-prompting where the model must infer intent from chat history. The previously generated code serves as a structural constraint, and the semantic diff drives targeted regeneration of only the affected region. This prevents [[semantic-drift]] by bounding the scope of each edit.

## Context

In chat-based UI generation, refinement requests like "make the button bigger" are interpreted against the full conversation context, and the model may change unrelated elements. Park et al.'s approach instead tracks the semantic state as a persistent object, computes the diff when a user modifies a semantic slot, and passes both the diff ("Design System.Typography changed from 'small' to 'large'") and the previous code ("here's what you generated last time — only change what the diff requires") to the generation model. Nine of 14 participants highlighted the ability to "target just the node I want to change" while the rest of the interface stayed stable. The approach has a natural extension to edit scopes: local (single semantic), section (one framework level), global (cross-level cascade).

## Connections

- Prevents [[semantic-drift]] — direct mechanism. By making changes explicit and bounded, the compounding uncertainty of iterative refinement is contained.
- Depends on [[semantic-intermediate-layer]] — without a persistent semantic structure, there's nothing to compute diffs against.
- Parallels [[accretive-extensibility]] — both are strategies for safe modification. Scoped semantic editing works at the intent level (change what you mean); accretive extensibility works at the spec level (layer what you want on top). They're complementary: semantic diffs could *produce* overlay layers.
- Informs [[model hierarchy]] — scoped editing suggests each layer of the hierarchy should be independently editable. A change at the Presentation layer shouldn't require re-deriving from the Task layer.
- Relates to [[pattern-driven transformation]] — a semantic edit at the Feature level ("change function from 'search' to 'browse'") could trigger re-selection of the task pattern while preserving Design System and Component-level decisions.
- Connects to [[fluid-attributes]] — Meridian's attribute-level edits (add/remove/reformat attributes) are a form of scoped editing at a specific granularity. Park et al.'s framework adds scoping at higher levels (Product, Design System) and lower levels (Component properties).

## Practical implementations

Park et al.'s system computes diffs on the structured semantic object and includes them in the generation prompt. Related approaches: Git's line-level diffs for code (same principle — show what changed, preserve the rest). Figma's component overrides (change instance properties without affecting the master). CSS cascade (specificity determines which rules override). JSON Patch (RFC 6902) for surgical document updates. In LLM prompting: "diff-based prompting" where you provide the original output and specify only the desired change is an informal version of this.

## Relevance to project

For the genUI pipeline, scoped editing defines how the feedback loop should work:

1. User modifies a semantic value in the [[semantic-intermediate-layer]]
2. System computes the semantic diff
3. Diff is mapped to the appropriate pipeline stage: Product-level change → full re-derivation; Component-level change → local spec update; Design System change → cross-cutting update
4. Previous spec serves as structural constraint (don't regenerate unchanged sections)
5. Only affected sections are regenerated; user customisation overlays on unaffected sections are preserved

This maps naturally to the [[model hierarchy]]: the level at which the semantic change occurs determines which downstream layers need re-derivation and which can be preserved.

## Open threads

- How do you handle edits that *should* cascade but the user wants to prevent cascade? ("Change target user to elderly but keep the same colour scheme")
- What's the right granularity for diffs? Slot-level ("colour changed") or value-level ("colour changed from blue to green")?
- Can the system predict the impact of a semantic edit before executing it? Park et al.'s relationship graph partially does this, but without concrete before/after comparison.
- How does scoped editing interact with multi-component generation? If components share semantic context, editing one component's semantics might need to propagate to siblings.
- IntentFlow's [[intent-decomposition]] implement scoped editing at the intent level — adjusting a Likert scale or slider is an intent-level semantic diff that drives targeted regeneration. Combined with [[intent-output-traceability]], the user can see what will change before adjusting. This is a gentler version of scoped semantic editing: instead of editing Park et al.'s semantic slots (which require understanding design vocabulary), users adjust intuitive controls (which require only an opinion).
