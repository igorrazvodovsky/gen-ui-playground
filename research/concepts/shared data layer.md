---
type: concept
tags: [data-model, specification, generative-ui]
sources: ["sources/lit-malleable-software", "sources/ag-ui-protocol"]
created: 2026-02-06
updated: 2026-03-11
---
Tools can only compose if they operate on shared data — a common substrate that multiple views and editors can read from and write to. When each app owns its data privately, introducing new tools into a workflow incurs friction because data must be exported, transformed, and re-imported.

## Context

Historical examples: the desktop filesystem (edit the same file in different tools), Smalltalk's image (shared objects with behaviour), Airtable/Notion (multiple views of the same database), Automerge (synced JSON documents). PushPin's DFRP pattern (see [[json-document-backed-components]]) is a concrete implementation: React components backed by shared Automerge JSON docs.

The data layer doesn't have to be inert. Smalltalk's objects carry behaviour. But there's a spectrum from "dumb data" to "rich objects" — and the right level of richness depends on the use case.

A critical sub-problem: **schema compatibility**. If tools can't agree on data shape, they can't interoperate. Cambria's approach (live bidirectional schema translation via "lenses") is one answer. Another: keeping schemas simple enough that agreement is easy.

### Agent-frontend state synchronisation

At the network boundary between agent and frontend, the shared data layer needs a concrete protocol. AG-UI implements this via two synchronisation mechanisms:

1. **StateSnapshot** — complete state representation, used at interaction start, after disconnection, or during major state changes. Establishes a baseline.
2. **StateDelta** — incremental updates using JSON Patch (RFC 6902), with six operations: add, remove, replace, move, copy, test. Efficient for frequent small changes to large state objects.

The combination means the frontend can maintain a consistent view of agent state without receiving full state on every update. Patches are applied atomically — if a patch fails, the system requests a fresh snapshot for recovery.

The bidirectionality is key: the frontend's state (form values, user selections, scroll position) is available to the agent, and the agent's state (processing progress, intermediate results, confidence scores) is available to the frontend. Neither side owns the state exclusively.

## Connections

- **Enables** [[tools-not-apps]] — without shared data, tool composition is impossible
- **Enables** [[UI composition]] — shared data means multiple UI components can reflect the same state
- **Related to** [[json-document-backed-components]] — DFRP is one concrete pattern for shared data + reactive UI
- **Enriched by** [[ontology-driven UI generation]] — formal ontologies make the shared data layer semantically interoperable. A JSON document is shared syntax; an ontology-backed data layer is shared meaning.
- **Implemented by** Varv's data layer — Varv separates data storage from concepts and views via "mappings" (pointers that define which data store each property uses). Multiple applications can share the same data store.
- **Extended by** [[software-as-data-structure]] — the shared data layer is one part of the full software-as-data-structure. In Varv, not just data but also behaviour and composition rules are part of the shared substrate.
- **Answers open thread in** [[specification-based rendering]] — "How do we represent changes to specs?" JSON Patch (RFC 6902) for incremental changes, full snapshots for recovery.
- **Answers open thread in** [[streaming specification compilation]] — "How do we stream updates rather than full specs?" StateDelta with JSON Patch is exactly this mechanism.
- **Supports** [[parallel-state-display]] — if the agent publishes its internal state via shared state, the frontend can render it as dashboard-like instrumentation.
- **Enables** [[in-place toolchain]] — if intermediate representations are available via shared state, in-place inspection tools can display them without special APIs.
- **Tension with** [[accretive-extensibility]] — JSON Patch operations include `remove` and `replace`, which are destructive. If user customisations are stored as overlays, destructive patches from the agent could overwrite them.

## Practical implementations

- **Automerge / Yjs** — CRDT-based shared documents with automatic conflict resolution. More powerful than JSON Patch but heavier.
- **Firebase Realtime Database** — shared JSON state with real-time sync. Similar snapshot/delta model but server-mediated.
- **Redux + Redux DevTools** — centralised state with time-travel debugging.
- **React Server Components** — server-computed state streamed to client. One-directional unlike AG-UI's bidirectional model.
- **AG-UI StateSnapshot/StateDelta** — the reference protocol implementation for agent-frontend state sync.

## Relevance to project

This is the generative UI pipeline's backbone. JELLY's task-driven data model *is* the shared data layer — the object-relational schema that multiple UI components render different aspects of. When the model changes, all views update.

For json-render: the JSON that json-render consumes is essentially a shared data layer (in miniature). The question is how rich that JSON should be — just UI spec? Or also the underlying data model that UI spec is derived from?

The snapshot/delta model maps to the [[model hierarchy]] intervention points: a user editing presentation-level properties generates deltas; switching to a different task model generates a full snapshot.

For the feedback loop (`Rendered UI → End-user customisation → Model evolution → UI update`): the shared state object is where this loop lives. When the user modifies the UI, that change updates shared state. The agent observes the state change, updates its model, and emits new events that the frontend renders. JSON Patch gives a concrete mechanism — instead of regenerating the entire UI spec when the user says "add a date column," the agent emits a delta that patches the existing spec.

## Open threads

- JELLY separates the data model from the UI specification. Is that separation necessary at the json-render stage?
- How does schema evolution work when the user's task changes? Cambria's lenses? Or something simpler?
- Varv's data mapping approach suggests a clean architecture: data model defines entities and properties; mappings define where each property's data lives; UI spec defines how properties are rendered. These three can evolve independently.
- JSON Patch is path-based (`/children/2/props/label`). If the spec structure changes, existing patches may target wrong elements. Does this need a content-addressed scheme?
- How does shared state interact with the [[semantic-intermediate-layer]]? Should the semantic parse be part of shared state?
- Conflict resolution: if both user and agent modify the same state path simultaneously, who wins?
