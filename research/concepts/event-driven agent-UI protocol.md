---
type: concept
tags: [specification, generative-ui, data-model]
sources: ["sources/ag-ui-protocol", "sources/lit-laui"]
created: 2026-02-27
---
The runtime connection between an AI agent and a user-facing application should be a stream of typed events, not a request-response API. The agent emits events (text tokens, state changes, tool requests, lifecycle signals) as an observable stream; the frontend subscribes and reacts. This makes agent interaction inherently incremental, asynchronous, and composable.

## Context

Traditional APIs are synchronous: send request, wait for response, render result. But agents are fundamentally different — they're long-running, nondeterministic, stream intermediate work, and need user input mid-execution. A request-response model forces you to either block until the agent finishes (terrible UX) or poll for updates (fragile, wasteful). An event stream makes incrementality native: the agent pushes updates as they happen, and the frontend processes them as they arrive.

AG-UI defines 16 event types grouped into lifecycle (run/step start/finish/error), text messages (start/content/end streaming), tool calls (start/args/end), state management (snapshots and deltas), and special events (custom, activity, reasoning). Two composition patterns recur: **Start-Content-End** for streaming content incrementally, and **Snapshot-Delta** for state synchronisation.

The protocol is transport-agnostic — SSE for text streaming, binary for production — and vendor-neutral across AI providers.

## Connections

- **Enables** [[streaming specification compilation]] — if UI specs are delivered as events rather than complete responses, the Start-Content-End pattern maps directly to progressive rendering. AG-UI's text streaming is structurally identical to json-render's SpecStream: both deliver incremental content that the frontend assembles progressively. AG-UI generalises this beyond text to tool calls, state changes, and custom events.
- **Implements** [[json-document-backed-components]] at the protocol level — DFRP connects React components to shared JSON documents that update reactively. AG-UI's StateSnapshot/StateDelta events are essentially DFRP's document update mechanism extracted into a network protocol. The difference: DFRP assumes co-located components and documents; AG-UI bridges a network boundary between agent and frontend.
- **Supports** [[shared data layer]] — the Snapshot-Delta pattern using JSON Patch (RFC 6902) is the concrete mechanism for bidirectional state sync.
- **Prefigured by** LAUI's Manager pattern (Chin et al.) — the Flute X GPT Manager is a rule-based state machine that relays events (user speech, performance evaluations) to the LLM, parses LLM output into thought/action/speech, and routes actions to the system. It's a domain-specific, hand-built precursor to the general-purpose event protocol AG-UI defines. The Manager handles synchronisation (function calls timed with speech), error recovery (re-querying on malformed output), and latency management (batching TTS). These are exactly the concerns a general agent-UI protocol must address.
- **Complements** [[LLM-operable interface]] — if the pipeline's intermediate representations (catalog, mapping rules, data model) need to be inspectable and modifiable by an agent at runtime, an event protocol is how the agent communicates those modifications back to the frontend.
- **Relates to** [[UI composition]] — AG-UI's activity messages (UI-only events never forwarded to the agent) solve a composition problem: UI elements like progress indicators and loading states need to exist in the interface without polluting the agent's context. This is a clean separation of UI-specific coordination from agent-relevant state.

## Practical implementations

- **AG-UI** — the reference protocol (CopilotKit as primary client)
- **Server-Sent Events (SSE)** — the underlying transport for most AG-UI implementations
- **OpenAI streaming API** — structurally similar (token-by-token streaming with event types) but proprietary and text-only
- **LangChain/LangGraph streaming** — framework-specific streaming with AG-UI middleware adapters
- **GraphQL subscriptions** — similar event-driven pattern but for database/API data, not agent interaction
- **WebSockets** — bidirectional event streams used by collaborative tools (Figma, Google Docs)

## Relevance to project

This concept addresses a gap the pipeline design has sidestepped: **how does the generated UI stay connected to the agent at runtime?** The current pipeline assumes a one-shot flow (prompt → task analysis → spec → render). But for model evolution — the feedback loop where users modify the UI and changes propagate back — the frontend needs a persistent, bidirectional connection to the agent. An event protocol is how that connection works.

For json-render specifically: json-render currently receives a complete JSON spec and renders it. An event-driven approach would mean json-render receives spec *events* — partial specs, incremental updates, state deltas — and renders progressively. This is already partially implemented via SpecStream, but AG-UI suggests a more general architecture where the spec stream is just one event type among many (alongside tool calls, state sync, reasoning visibility, etc.).

The middleware concept is also relevant: event streams can be intercepted and transformed. For the pipeline, this means adaptation rules ([[content-structure-adaptation-split]]) could be implemented as middleware that transforms agent events before they reach the renderer — rewriting text for accessibility, adjusting component choices for the user's context, etc.

## Open threads

- Does the genUI pipeline need a full event protocol, or is the simpler DFRP pattern (shared JSON document with reactive rendering) sufficient? AG-UI adds network transparency and agent-specific event types, but also complexity.
- How does event ordering interact with spec validity? If a StateDelta arrives before the StateSnapshot it references, the frontend needs recovery logic. For UI specs, this could mean rendering invalid intermediate states.
- The middleware pattern suggests a pipeline-within-a-pipeline: agent events → adaptation middleware → rendering middleware → component output. Is this the right architecture for the adaptation layer?
