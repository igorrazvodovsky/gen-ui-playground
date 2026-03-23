---
title: "AG-UI: Agent–User Interaction Protocol"
authors: [CopilotKit, community contributors]
year: 2025
venue: "Open-source protocol specification"
type: literature
status: processed
---
## Core idea

AG-UI is an open, event-based protocol that standardises the bidirectional runtime connection between AI agents and user-facing applications. It's not a generative UI specification itself — it's the plumbing layer that carries generative UI (and everything else) between backend agents and frontend interfaces. Think of it as the missing middle of a three-protocol stack: MCP connects agents to tools/data, A2A connects agents to each other, and AG-UI connects agents to users.

## Key concepts

- [[event-driven agent-UI protocol]] — the core architectural pattern: agents emit typed events, frontends subscribe and react
- [[shared data layer]] — bidirectional state synchronisation via snapshots and JSON Patch deltas (RFC 6902)
- [[frontend-defined tool execution]] — tools are defined by the frontend, not the agent; the agent requests execution, the frontend controls what's available
- [[two-step generative UI]] — AG-UI's draft approach to generative interfaces: agent specifies *what* (description + data + output schema), a secondary generator produces *how* (the actual UI)
- Relates to existing concepts: [[specification-based rendering]], [[streaming specification compilation]], [[shared data layer]], [[json-document-backed-components]], [[guardrailed generative UI]]

## Technical approach

### Architecture
Event-driven client-server model. Agents implement a `run(input: RunAgentInput) → Observable<BaseEvent>` interface — they receive conversation context and stream back typed events. Transport-agnostic (SSE for text streaming, binary for production). POST requests in, observable event streams out.

### Event system
16 event types across five categories:

1. **Lifecycle** — RunStarted, RunFinished, RunError, StepStarted, StepFinished
2. **Text messages** — Start/Content/End streaming pattern (incremental token delivery)
3. **Tool calls** — ToolCallStart/Args/End (agent requests tool execution; frontend runs it locally and returns results as tool messages)
4. **State management** — StateSnapshot (full state), StateDelta (JSON Patch incremental updates), MessagesSnapshot (conversation history)
5. **Special** — Raw (passthrough), Custom (application-defined), Activity (UI-only, never forwarded to agent), Reasoning (chain-of-thought, optionally encrypted)

Two core patterns: **Start-Content-End** for streaming (text, tool args, reasoning) and **Snapshot-Delta** for state synchronisation.

### Messages
Vendor-neutral format. Roles: user, assistant, system, tool, developer, activity, reasoning. Activity messages exist only on the frontend (progress indicators, loading states) — never sent to the agent, preventing context pollution. Reasoning messages support encrypted content for privacy-preserving state continuity across turns.

### Tools (frontend-defined)
Tools are JSON Schema definitions (name, description, parameters) provided by the frontend. The agent sees available tools, can request execution via the streaming event pattern, but the frontend controls what's available and runs the tool locally. This inverts the typical pattern where agents own tool execution.

### State management
Shared state object accessible to both agent and frontend. Synchronised via snapshots (full state at interaction start or after disconnection) and deltas (JSON Patch for incremental updates). The agent reads application state to make informed decisions; the frontend reacts to agent state changes. Uses `fast-json-patch` for atomic, non-mutating patch application.

### Middleware
Event streams can be intercepted and transformed via a middleware chain (function-based for simple transforms, class-based for stateful scenarios). Built-in `FilterToolCallsMiddleware` restricts tool execution by allowlist/denylist. Middleware chains are nested: input flows down, events flow up.

### Generative UI (draft)
Two-step architecture:
1. Agent calls a lightweight `generateUserInterface` tool with: description (what UI is needed), data (pre-populated values), output (JSON Schema defining expected user-submitted data)
2. A secondary LLM/generator consumes these parameters to produce the actual UI (JSON Schema, React, HTML — format is flexible)

The separation means the primary agent never generates UI directly — it specifies *what* at a semantic level, and a dedicated generator handles *how*. This addresses context window constraints and ensures UI generation fidelity.

### Protocol stack
Three complementary protocols:
- **MCP** — agent ↔ tools/data (becoming agentic itself)
- **A2A** — agent ↔ agent coordination
- **AG-UI** — agent ↔ user interaction

AG-UI has handshakes enabling it to front-end agents that support MCP and A2A. Natively supports three generative UI specs: A2UI (Google, JSONL-based), Open-JSON-UI (OpenAI), MCP-UI (Microsoft + Shopify, iframe-based).

## Extracted concepts

- [[event-driven agent-UI protocol]]
- [[shared data layer]]
- [[frontend-defined tool execution]]
- [[two-step generative UI]]
