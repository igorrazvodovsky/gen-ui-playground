---
type: concept
tags: [specification, json-render, component-mapping]
sources: [json-render, "json-render docs 2026-03"]
created: 2026-02-07
---
UI is represented as declarative JSON specifications that describe *what* to render (component types, properties, hierarchy) rather than *how* to render it (imperative DOM manipulation, procedure calls). The spec acts as an intermediate representation that's both AI-generatable and human-readable—separating the description layer from the implementation layer.

## Context

Traditional UI code mixes declaration with implementation. A button isn't just "a button with label X"—it's a class instantiation, event binding, style application, and DOM insertion. This makes it hard for AI to generate safely (code execution risks) and hard for users to modify (requires programming knowledge).

Specification-based rendering splits this: the spec says `{type: "Button", props: {label: "Save"}}` while the binding layer maps this to actual React components. The AI only generates data structures, never executable code.

**Updated (2026-03)**: json-render has evolved the spec format significantly. Specs now use a flat element map (`{root, elements}`) rather than nested trees — better for AI generation and patch-based streaming. The spec includes reactive state (`$state`, `$bindState`), watchers (state changes → action cascades), computed values (`$template`, `$computed`), and form validation. The core is also now schema-agnostic — it can host A2UI, Adaptive Cards, AG-UI, OpenAPI, and custom formats, not just its own built-in format.

## Connections

- **Enables** [[guardrailed generative UI]] — specs can be validated against schemas before rendering, preventing arbitrary code execution
- **Enables** [[component catalog as schema]] — the catalog defines valid component types and props, making specs verifiable
- **Downstream of** [[pattern-driven transformation]] — patterns transform through abstraction layers, ultimately producing specs for rendering
- **Target format for** [[abstraction-to-concrete mapping]] — mapping rules output specs, not code
- **Relates to** [[UI composition]] — specs naturally express hierarchical composition through `children` arrays
- **Supports** [[streaming specification compilation]] — JSON specs can be progressively compiled as they're generated
- **Part of** model-based UI paradigm — specs are presentation/layout models in the [[model hierarchy]]
- **Produced by** [[ontology-driven UI generation]] — ontology parsing outputs JSON (properties, related classes, subclasses, cardinalities) that's structurally close to json-render specs. The Nunes et al. system's `/get_class_details` endpoint returns a spec-like JSON format that the React frontend renders dynamically — validating that specification-based rendering works for ontology-generated specs, not just LLM-generated ones.
- **Subset of** [[software-as-data-structure]] — spec-based rendering applies the "program as data" principle to the UI layer only. Varv extends it to the entire application: state, behaviour, event handling, and view bindings are all declarative JSON. This raises the question of whether the genUI pipeline's output should be richer than just UI specs.
- **Concrete layer of** [[abstract-concrete-separation]] — UI specs are the concrete binding of abstract semantic concepts to visual components. The abstract layer (what entities exist, what actions are valid) is separate from the spec layer (which components render them).
- **Extended by** [[accretive-extensibility]] — Varv shows that specs can be modified by layering new definitions on top rather than editing the original. For genUI, this means user customisations could be overlay specs rather than edits to the generated base spec.
- **Extended by** [[fluid-attributes]] — Meridian (Min & Xia, 2025) demonstrates an attribute-centric spec format: `{data, attributes, views, layout}` rather than json-render's component-centric `{type, props, children}`. The attribute config layer sits between the data model and the view config, adding a semantic mediation layer that makes specs more customisable by end users. This suggests the pipeline's intermediate representation should include attribute-level semantics, not just component-level structure.

## Practical implementations

- **json-render** (Vercel): The reference implementation — JSON specs with Zod validation
- **React Server Components**: JSX-like specs sent from server, rendered on client
- **Mitosis**: Framework-agnostic component specs that compile to React/Vue/Svelte
- **UISpec (abandoned)**: iOS/Android UI specs in JSON
- **Remotion**: Video specs as React components (data-driven video rendering)
- **Retool/Bubble**: Low-code platforms using internal spec formats

## Relevance to project

Specification-based rendering is the foundation of the **UI specification → Rendered UI** stage. It establishes the format that all upstream systems (task analysis, data model, mapping rules) must produce.

Key questions this raises:
- What should the spec schema include beyond `{type, props, children}`? State management? Event handlers? Data dependencies?
- How expressive should specs be? (Trade-off: more expressive = harder to validate and constrain)
- How do specs evolve when the user's task changes? (Do we diff specs, regenerate entirely, or use incremental updates?)

**Pattern transformation output**: Specs are the final output of the [[UI-derivation process]]. Layout patterns (from [[pattern-driven transformation]]) compile to json-render specs.

- **Refined by** [[two-step generative UI]] — AG-UI's draft generative UI proposal separates *what* UI is needed (agent specifies description + data + output schema) from *how* to render it (specialist generator produces specs). The spec remains the intermediate representation, but generation responsibility is split between a reasoning agent and a UI specialist.
- **Delivered via** [[event-driven agent-UI protocol]] — AG-UI shows that specs don't have to arrive as complete documents. They can be streamed as events (StateSnapshot for full specs, StateDelta with JSON Patch for incremental updates), making spec evolution a continuous process rather than discrete regeneration cycles.

## Open threads

- **Spec evolution**: How do we represent *changes* to specs? Diffs, patches, or full regeneration? **Substantially answered**: json-render now uses RFC 6902 JSON Patch natively via JSONL streaming — each line is a patch operation targeting specific paths. AG-UI independently converged on the same mechanism (StateDelta). The remaining question is whether path-based patching is robust enough when spec *structure* changes significantly (not just values).
- **State management**: ~~Where does application state live—in the spec, outside it, or both?~~ **Answered**: json-render's current model embeds a `state` object in the spec, with `$state`/`$bindState` for read/write binding, watchers for reactive cascades, and `StateProvider`/`useStateStore` for external state injection. State lives *both* in the spec (initial values) and externally (runtime store). The remaining question is whether this flat key-value state model is sufficient for a *task-driven* data model with dependencies and domain semantics.
- **User customisation**: Can users directly edit specs (like tweaking JSON), or must changes flow through NL → task model → new spec?
- **Semantic vs syntactic**: Specs describe *structure* but not *meaning*. How do we preserve user intent when regenerating specs?
- **Code export as escape hatch**: json-render's `@json-render/codegen` can convert specs to standalone framework code (React/Next.js) with zero runtime dependency. This means specs aren't trapped in the json-render runtime — they can graduate to real code. Implications for the "generated UIs are disposable" problem.
