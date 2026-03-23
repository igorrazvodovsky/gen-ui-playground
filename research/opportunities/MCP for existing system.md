---
type: experiment
id: E24
solution: "[[Domain-specific end-to-end]]"
status: not-started
created: 2026-03-03
source: "[[solution tree]]"
phase: MX Phase 3
---
Expose key operations as WebMCP tools. Map task model operations to tool calls. User states intent in business language → system decomposes → executes against real app → result matches what a human operator would have done. Test the feedback loop: execution failure → re-plan → retry.

## What it validates

Whether the full Branch 1 pipeline (intent → decomposition → execution against existing system) works end-to-end in the business domain.

## Depends on

- [[Business domain task decomposition]] and [[Knowledge representation variation]] (knowledge infrastructure)

## On schema design gaps

Schlapbach (2026), "The Convergence of Schema-Guided Dialogue Systems and the Model Context Protocol" (arXiv:2602.18764v2), maps SGD's original schema fields onto MCP and identifies three gaps worth watching when designing tool definitions:

- **Action boundaries**: SGD had an explicit `is_transactional` flag distinguishing read vs. state-changing operations. MCP doesn't — it relies on naming conventions (`get_`, `create_`, `delete_`). For the E24 feedback loop (execution failure → re-plan → retry), tool definitions should make this distinction explicit so the agent knows which calls are safe to retry vs. which need rollback or confirmation.
- **Inter-tool dependencies**: MCP tools are discovered independently with no declared ordering or data-flow relationships. The agent must infer that `authenticate` precedes `list_products` precedes `configure`. At E24's scale this is manageable, but encoding dependencies (e.g. `requires: [authenticate]` or `output.id → tool_Y.input.order_id`) in tool metadata would reduce reasoning burden.
- **Failure mode documentation**: MCP error semantics are ad-hoc — there's no standard way for a tool to communicate *why* it failed (rate limit vs. not found vs. invalid credentials) or what recovery strategy the agent should use. Relevant to E24's re-plan loop: the agent needs structured failure information to decide between retry, alternative tool, or user escalation.