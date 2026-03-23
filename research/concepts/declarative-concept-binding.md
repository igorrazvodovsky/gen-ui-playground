---
type: concept
tags: [specification, component-mapping, generative-ui, data-model]
sources: ["sources/deja-vu", "sources/wysiwid"]
created: 2026-02-20
---
Independent concepts are composed not by sharing state or calling APIs, but by declaring dataflow and synchronisation in a template language. The template binds concept outputs to concept inputs (`(outputA)="inputB"`), passes shared identifiers between concepts, and wraps groups in transaction tags for atomic execution. The template IS the application's integration architecture — there's no separate orchestration layer, no procedural glue code.

## Context

Most composition mechanisms require concepts (or components, or services) to know about each other: shared interfaces, event contracts, API schemas. Déjà Vu's template binding is different — concepts remain completely ignorant of each other. All knowledge of how they relate lives in the template. This is a radical separation of concerns: concept authors handle functionality, app authors handle composition.

The binding syntax is borrowed from Angular's property binding: `[input]="value"` for data flowing in, `(output)="target"` for data flowing out. A platform-level `generateId` function creates identifiers that flow to multiple concepts, creating implicit associations (see [[identity-based-data-integration]]). For atomic operations across concepts, `dv.tx` tags provide [[transactional-composition]].

The result: an app is ~400 lines of template that selects and wires concepts. The concepts themselves are reusable across apps without modification.

## Connections

- **Mechanism for** [[concept-as-composition-unit]] — this is how Déjà Vu's concepts get assembled into applications. The template language is the composition mechanism.
- **Alternative to** shared-state composition (Varv) — Varv composes concepts by letting them all read/write a shared centralised store. Déjà Vu composes via explicit dataflow bindings. Trade-off: shared state is more flexible (any concept can react to any state change) but harder to reason about; explicit bindings are more constrained but the data flow is visible in the template.
- **Alternative to** event-based composition — event buses (publish/subscribe) provide loose coupling but invisible data flow. Template bindings provide equally loose coupling with visible data flow.
- **Extends** [[specification-based rendering]] — the template is a declarative specification that the runtime interprets. It specifies not just what to render but how rendered concepts interact.
- **Enables** [[pattern composition]] — template binding is a concrete mechanism for composing patterns. A "Search" pattern could be a template fragment that wires together query, filtering, and results concepts.
- **Relates to** [[UI composition]] — template binding handles both visual composition (concept widgets appear on screen) and data composition (concept outputs flow to other concept inputs). These are unified in a single mechanism.
- **Alternative mechanism in** WYSIWID — [[synchronisation-as-behavioural-rule|synchronisations]] replace template bindings with declarative event-based rules. Both achieve concept independence through different mechanisms: bindings are property/event wiring (spatial, in the template); synchronisations are when/where/then rules (temporal, in a rule set). Synchronisations are more expressive (can query state across concepts, handle errors, fire on sets) but harder to reason about spatially.

## Practical implementations

- **Angular template binding** — Déjà Vu literally uses Angular's syntax. Angular's property/event binding on components is the same mechanism applied to framework components rather than full-stack concepts.
- **React JSX composition** — props-down/callbacks-up is conceptually similar: parent template passes data to children via props, receives data via callback props. Less declarative (callbacks are functions), but the same structural idea.
- **Webflow / Framer interactions** — visual tools where you wire component outputs to inputs declaratively, without code.
- **Unix pipes** — `grep | sort | uniq` composes independent programs via dataflow (stdout → stdin). The pipe IS the composition. Déjà Vu's template bindings are two-dimensional pipes.
- **Zapier / n8n / Make** — workflow automation tools that compose API services via declarative dataflow bindings. The workflow definition is the integration layer.
- **json-render specs** — nested `{type, props, children}` is a form of declarative binding: the spec declares which components appear and what data they receive. Missing: output bindings and transaction semantics.

## Relevance to project

For the genUI pipeline, template binding offers a concrete syntax for the composition layer. Currently the pipeline produces json-render specs (nested component trees with props). Déjà Vu shows what it would take to also express *inter-concept dataflow* in that spec:

1. **Input bindings** — already handled by json-render's `props` (data flows from spec to component)
2. **Output bindings** — NOT handled. json-render components can't currently express "when this component outputs X, feed it to that component's input Y"
3. **Shared identifiers** — NOT handled. No mechanism for multiple components to reference the same entity via shared ID
4. **Transaction scope** — NOT handled. No mechanism for grouping component actions into atomic operations

Items 2 and 3 are essential for the two-way binding problem. Item 4 may be less critical for a client-side system but matters if concepts have backend services.

The template-as-architecture principle also informs LLM generation: instead of generating a flat component tree, the LLM could generate a composition template that declares both structure AND dataflow. This is a richer output format than current json-render specs, but more constrained than full procedural code.

## Open threads

- Can template bindings be generated by an LLM? The binding syntax is simple and declarative, which should be easier for LLMs than procedural code. But the LLM needs to understand concept I/O interfaces to produce valid bindings.
- How do template bindings interact with [[accretive-extensibility]]? Can you add new bindings to an existing template without modifying it? Déjà Vu doesn't address this.
- What happens when binding requirements change at runtime (user wants to connect a new data source to an existing view)? Template bindings are static. Dynamic rebinding would need a different mechanism.
