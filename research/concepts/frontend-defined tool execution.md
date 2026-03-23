---
type: concept
tags: [user-agency, generative-ui, safety]
sources: ["sources/ag-ui-protocol"]
created: 2026-02-27
---
Tools are defined and controlled by the frontend application, not the agent. The agent sees a set of available tools (name, description, JSON Schema parameters), can request execution via streaming events, but the frontend decides what tools exist, runs them locally, and returns results. The application controls the agent's action space, not the other way round.

## Context

The conventional pattern in agent frameworks (LangChain, AutoGPT, etc.) is agent-owned tools: the agent has a toolkit, decides when to call tools, and executes them directly. This gives the agent maximum autonomy but minimal safety — it can take actions the user didn't authorise, access resources the application didn't intend to expose, and operate beyond the frontend's visibility.

AG-UI inverts this. Tools are declared by the frontend as JSON Schema definitions. The agent sees what's available and streams tool call requests (ToolCallStart → ToolCallArgs → ToolCallEnd). The frontend accumulates the arguments, executes the tool locally, and returns results as a tool message referencing the original call ID. The agent never directly executes anything — it only *requests*.

This creates a human-in-the-loop architecture by default: the frontend can intercept any tool call, display a confirmation dialog, require user approval, or silently execute based on policy. The agent proposes; the application disposes.

## Connections

- **Implements** [[guardrailed generative UI]] at the interaction level — the three-layer guardrail model (schema validation, component whitelisting, action constraints) constrains what UI the agent can *generate*. Frontend-defined tools constrain what actions the agent can *take*. Together they bound both the output space (safe UI) and the action space (safe behaviour). The JSON Schema tool definitions are structurally identical to catalog schemas — both use schemas to define valid operations.
- **Supports** [[gentle slope]] — by controlling which tools the agent can access, the frontend can expose progressively more powerful tools as the user's trust or expertise increases. A novice user might expose only read-only tools; an expert might allow write access to the data model.
- **Relates to** [[tools-not-apps]] — AG-UI's tools are small, focused, composable functions (not monolithic app features). The frontend curates a toolkit for the agent, much like the genUI pipeline curates a component catalog for the renderer. The agent operates on the toolkit; the user operates on the generated UI; both are tool-based interaction models.
- **Extends** [[in-place toolchain]] — tools can be added or removed dynamically based on context, permissions, or user preferences. The toolset isn't fixed at compile time — it's a runtime-configurable surface. This means the in-place toolchain could expose tools to the agent that match what it exposes to the user: the same "inspect" action available as both a user-facing button and an agent-callable tool.
- **Tension with** [[LLM agent UI as abstraction layer]] — Chin et al. position the LLM agent as a persistent operator navigating the UI. But if the frontend constrains the agent's tools, the agent can only operate within the application's permission boundary. This is probably desirable (safety) but limits the agent's ability to perform novel compositions.

## Practical implementations

- **AG-UI tool protocol** — the reference implementation (CopilotKit's `useCopilotAction` hook in React)
- **MCP (Model Context Protocol)** — similar pattern but for agent ↔ tool/data connections rather than agent ↔ frontend. MCP tools are server-defined; AG-UI tools are frontend-defined.
- **OpenAI function calling** — agent requests function execution, but the caller (not the agent) runs the function. Structurally similar, but not frontend-specific.
- **Browser extension permissions** — browser extensions declare required permissions; the user/browser grants or denies. Same principle: the execution environment controls what the agent can do.
- **OAuth scopes** — applications request specific permissions; the user grants them. Frontend-defined tools are like fine-grained OAuth scopes for agent actions.

## Relevance to project

This has direct implications for the **model evolution** stage of the pipeline. When the user modifies the generated UI (adds a field, changes a component, reorganises layout), the system needs to propagate those changes back through the pipeline. Frontend-defined tools provide the mechanism: the frontend exposes tools like `updateDataModel`, `addAttribute`, `swapComponent` that the agent can call to evolve the model. But crucially, the frontend controls *which* evolution operations are available — preventing the agent from making destructive changes (deleting the user's customisations, replacing the entire spec).

This also connects to the [[content-structure-adaptation-split]]: structural adaptations (deterministic, rule-based) could be frontend tools that don't need agent involvement at all. Content adaptations (requiring LLM judgement) could be agent-callable tools with quality gates. The frontend decides which adaptations are automatic and which require agent reasoning.

For the component catalog: if the catalog is exposed as a set of tools (each component as a tool the agent can "use"), the frontend controls which components the agent can instantiate — a dynamic, runtime version of the component whitelist.

## Open threads

- How granular should agent tools be? One coarse tool (`modifyUI`) or many fine-grained ones (`addColumn`, `changeTheme`, `reorderFields`)? Finer granularity gives the frontend more control but gives the agent a more complex action space.
- Can tool definitions themselves be generated? If the UI is generative, the tools available to the agent should evolve with the UI. A generated kanban board might expose `moveCard` and `addColumn` tools that didn't exist before generation.
- How does tool availability interact with the [[semantic-intermediate-layer]]? The semantic parse shows users what the agent interpreted. Should it also show what tools the agent considered and why it chose specific ones?
