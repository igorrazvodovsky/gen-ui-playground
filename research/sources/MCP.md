---
title: "Model Context Protocol + WebMCP"
authors: ["Anthropic (MCP)", "Web Machine Learning CG (WebMCP)"]
year: 2024
venue: "Open specification / W3C community group proposal"
type: literature
status: processed
url: "https://modelcontextprotocol.io/"
url-webmcp: "https://github.com/webmachinelearning/webmcp"
updated: 2026-03-05
---

## Core idea

MCP is an open protocol that standardises how AI applications connect to external systems. It defines a client-server architecture where an AI host discovers and invokes tools, reads resources, and uses prompt templates — all via JSON-RPC 2.0. WebMCP adapts this for the browser: web pages expose their functionality as MCP tools implemented in client-side JavaScript, so agents interact through structured function calls rather than UI automation.

## Key concepts

- **Host / client / server**: The host (AI app) creates one MCP client per server. Each client maintains a dedicated connection. Servers can be local (stdio) or remote (streamable HTTP). This is a standardised version of [[Semantic tool abstraction]].
- **Tools primitive**: Executable functions with JSON Schema input definitions and structured content responses. Discovery via `tools/list`, execution via `tools/call`. Dynamic — servers can notify when tool lists change.
- **Resources primitive**: Read-only contextual data (file contents, database schemas, API responses). Think of these as the knowledge layer an agent can query before acting. Relevant to [[Knowledge-grounded generation]].
- **Prompts primitive**: Reusable interaction templates with parameter slots. Closest to few-shot example libraries.
- **Sampling**: Servers can request LLM completions from the host — keeps servers model-independent.
- **Elicitation**: Servers can request user input mid-flow — human-in-the-loop without breaking the protocol.
- **Notifications**: Real-time updates (tool list changes, progress tracking) via JSON-RPC notifications (no response expected).
- **Capability negotiation**: Lifecycle management handshake at connection start — each side declares what primitives it supports.
- **WebMCP tools**: Browser-side tool registration — web pages become MCP servers, agents invoke JS functions directly instead of clicking through DOM. Maintains shared context between user, app, and agent.

## Technical approach

### MCP architecture

Two layers: data layer (JSON-RPC 2.0 protocol with lifecycle, primitives, notifications) and transport layer (stdio for local, streamable HTTP for remote). The data layer is transport-agnostic.

Server primitives: tools (actions), resources (context data), prompts (interaction templates). Client primitives: sampling (LLM access), elicitation (user input), logging.

Tool discovery is dynamic — `tools/list` returns available tools with JSON Schema input definitions, and servers can push `notifications/tools/list_changed` when capabilities change. This means the tool surface can adapt at runtime.

### WebMCP specifics

WebMCP inverts the typical MCP deployment. Instead of a backend server exposing tools, a web page registers tools in client-side JavaScript. The agent loads the page and discovers tools through the same `tools/list` mechanism, but execution happens in the browser context with access to the live DOM and application state.

Key architectural properties:
- **Code reuse**: Tools call existing frontend functions rather than requiring separate backend implementations
- **Shared context**: User, application, and agent all see the same state — no synchronisation problem
- **Human-in-the-loop native**: The user is already looking at the page the agent is operating on
- **Progressive enhancement**: Pages work normally without an agent; WebMCP adds structured agent access on top

### What MCP doesn't do

MCP is deliberately agnostic about what happens between receiving context and producing output. It provides the plumbing (tool discovery, resource access, structured invocation) but not the intelligence (task decomposition, UI generation, component selection, spec evolution). The generative pipeline sits entirely above MCP.

## Extracted concepts

Existing concepts touched:
- [[Semantic tool abstraction]] — MCP's tools primitive is a concrete implementation of this
- [[Knowledge-grounded generation]] — MCP resources provide the grounding data layer

Concepts that need creation or updating:
- **Frontend-defined tool surface** — WebMCP's model where the web page declares what agents can do, rather than agents inferring from DOM. Directly relevant to [[Frontend-defined tool control]] in the opportunity tree.
- **Dynamic capability negotiation** — runtime discovery of what's available, not static configuration. Relevant to compose-across-boundaries and adaptation.
- **Protocol-level human-in-the-loop** — elicitation primitive bakes user confirmation into the protocol rather than leaving it to application logic.

## Relevance to project

**What MCP provides to the pipeline:**

Primarily the backend integration layer. For any generative UI system that needs to read real data (database schemas, API structures, domain knowledge) or write back to real systems (CRUD operations, workflow triggers), MCP standardises the connection. It's the answer to "how does the generating agent access domain knowledge and execute actions."

**Where it maps to the opportunity tree:**

Branch 1 (operate existing systems): MCP is the primary implementation option. Its tools primitive directly realises semantic tool abstraction and API-first operation. WebMCP specifically addresses frontend-defined tool control.

Branch 2 (generative UI): MCP's resources are a delivery mechanism for knowledge-grounded generation — domain schemas, component catalogues, and design system metadata can all be exposed as MCP resources. But MCP doesn't generate anything itself.

Branch 3 (compose across boundaries): MCP's multi-server architecture (one client per server, shared host) provides basic cross-system connectivity. However, it doesn't solve schema mediation — each server exposes its own schema, and reconciling them is the host's problem. It's standardised transport, not semantic integration.

Integration experiments: The existing application MCP experiment is already named after this protocol. MCP would be the concrete implementation technology for vertical slice integration.

**Genuine gaps relative to the pipeline:**
- No task decomposition — MCP delivers tools but doesn't decide how to use them
- No intermediate representation — tool results come back as content arrays, not structured specs
- No component mapping — nothing connects tool/resource outputs to UI components
- No model evolution — the protocol is stateless per-request (though connections are stateful)

**WebMCP-specific value for web apps:**
Given the project targets web applications, WebMCP is particularly interesting because it collapses the distance between the agent's tool surface and the user's interface. The agent doesn't need a separate backend MCP server to interact with the UI — the page itself is the server. This aligns with the vision tree's emphasis on shared data layer and reduces the number of protocol boundaries.

