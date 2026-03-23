---
type: concept
tags: [json-render, specification, performance]
sources: [json-render, "json-render docs 2026-03"]
created: 2026-02-07
---
Progressive rendering from incomplete JSON as the LLM generates tokens—compiling partial specs into valid component trees before the full response arrives. This creates perceived speed (UI appears immediately) and enables real-time feedback (user sees generation in progress), rather than waiting for complete specs.

## Context

LLMs generate text token-by-token, streaming responses over seconds. Traditional approaches wait for the entire JSON spec to arrive, parse it, validate it, then render. This creates a delay between "user submits prompt" and "UI appears"—the entire generation time plus parsing/validation overhead.

Streaming compilation inverts this: as JSON tokens arrive (`{"type": "Con...`), the system attempts to parse and render whatever's valid so far. When the opening of a component becomes parseable (`{"type": "Container", "props": {`), it starts rendering that component—even if its children or later siblings are still generating.

json-render's `SpecStream` utility handles this: emits partial specs as they become valid, manages incomplete/malformed intermediate states, and updates the UI progressively.

**Updated (2026-03)**: json-render has moved to a fundamentally different streaming model. Instead of parsing incomplete JSON, it now uses **JSONL + RFC 6902 JSON Patch** — each line is a discrete patch operation (`add`, `remove`, `replace`, `move`, `copy`, `test`) targeting a specific JSON Pointer path. This is a much cleaner architecture: the stream is a sequence of valid operations, not a stream of half-formed JSON. Two generation modes use the same patch mechanics: "generate" (pure JSONL, no prose) and "chat" (conversational text + inline JSONL patches, separated by `pipeJsonRender`). The `createSpecStreamCompiler` processes chunks and returns `newPatches` — only modified portions trigger UI updates.

## Context (how it works)

1. **Incremental parsing**: As tokens arrive, attempt to close incomplete JSON nodes. When a component becomes complete (all required props received), emit it.

2. **Buffering incomplete nodes**: If a component is half-formed (`{"type": "Button", "props": {"`), buffer it until enough tokens arrive to make it valid.

3. **Tree reconstruction**: Maintain a partial tree structure. When new siblings or children arrive, insert them into the existing tree and trigger re-render.

4. **Graceful handling of malformed JSON**: If the stream contains syntax errors, the system doesn't crash—it emits valid nodes up to the error point.

## Connections

- **Requires** [[specification-based rendering]] — only works when UI is represented as parseable data structures
- **Enabled by** [[component catalog as schema]] — knowing valid component shapes lets the parser identify "complete" nodes
- **Operates at different scale than** [[UI-derivation process]] — derivation is model-to-model transformation (task→dialog→presentation→layout); streaming is token-to-component compilation within the final rendering step
- **Improves** perceived latency for generative UIs — user sees something immediately, not after 5-10 seconds
- **Relates to** [[json-document-backed-components]] — both deal with incremental updates to UI state
- **Supports** real-time collaboration UIs — if multiple users are watching a spec generate, streaming keeps everyone synchronized

## Relevance to project

Streaming is a **quality-of-experience** feature rather than a core architectural requirement. It doesn't change *what's generatable*, but drastically improves *how generation feels*.

**For UI specification stage**: Streaming specs need to be "streamable"—i.e., structured so early components can render independently of later ones. If spec semantics require "knowing the whole spec before rendering anything," streaming breaks down.

**For model evolution stage**: If user changes require regenerating large specs, streaming makes iteration faster. But it also introduces complexity—how do we stream *updates* (diffs) rather than full specs?

**Trade-off**: Streaming adds implementation complexity (incremental parsing, state management) and potential bugs (partial renders, race conditions). Worth it for long-generation UIs, but possibly overkill for small/instant specs.

- **Generalised by** [[event-driven agent-UI protocol]] — AG-UI's Start-Content-End event pattern is structurally identical to SpecStream's incremental token delivery, but generalised beyond text to tool calls, state changes, and custom events. SpecStream is a single-purpose streaming mechanism; AG-UI provides the general protocol that streaming specs could ride on.
- **Updated via** [[shared data layer]] — AG-UI's Snapshot-Delta pattern (StateSnapshot for full state, StateDelta with JSON Patch for incremental updates) directly answers the "streaming updates vs full specs" question below.

## Open threads

- **Spec structure for streamability**: ~~Are some spec designs more/less amenable to streaming? (e.g., flat vs deeply nested)~~ **Answered**: json-render's flat element map (`{root, elements}`) is explicitly optimised for streaming. Elements keyed by ID means any element can be targeted by a single patch path — no tree traversal needed. The move from "parse incomplete JSON" to "sequence of RFC 6902 patches" sidesteps the nested-vs-flat question entirely.
- **Streaming updates vs full specs**: If user modifies intent and we regenerate, do we stream a diff or a new full spec? **Partially answered** by AG-UI's Snapshot-Delta pattern: use JSON Patch (RFC 6902) deltas for incremental changes, full snapshots for major regeneration or recovery. The choice depends on the magnitude of the change — a value tweak is a delta, a task model switch is a snapshot.
- **Error recovery**: If streaming hits malformed JSON midway, do we keep the partial UI or discard everything?
- **Multi-model streaming**: If we use multiple LLMs (e.g., one for layout, one for content), how do we merge their streams?
- **Backpressure and rate limiting**: If rendering is slower than token generation, do we buffer? Drop frames? Throttle the LLM?
