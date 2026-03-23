---
type: concept
tags: [data-model, specification, model-evolution]
sources: ["sources/composite-task-meta-model"]
created: 2026-03-23
---
Task decompositions are graphs, not trees. Diane+H's RelatedTask entity (adopted into ReTaMeta) allows a task to have multiple parent tasks, siblings that execute in parallel, and sequential chains gated by link conditions. This is strictly more expressive than the tree-only hierarchies in HTA, GOMS, and most task analysis notations.

## Context

The pipeline currently assumes task hierarchies — tree-shaped decompositions where each subtask has exactly one parent. But real tasks have shared subtasks: "validate address" appears under both "place order" and "update profile." "Send notification" is triggered by multiple unrelated task branches. Forcing these into a tree means either duplicating the shared subtask (losing the connection) or picking one parent arbitrarily (losing the other dependency).

RelatedTask's graph model captures this naturally. The `elder/younger` ordering handles sequence (task A must complete before task B). The `sibling` boolean handles parallelism (tasks A and B can execute simultaneously). LinkConditions between sequential tasks express data dependencies ("proceed to checkout only when cart is non-empty").

The graph structure also matters for the UI. A shared subtask that appears in multiple task branches should probably appear *once* in the UI, accessible from multiple paths — not duplicated in each section. This is a composition problem: the task graph needs to map to a UI structure that's simpler (usually tree-shaped) without losing the cross-cutting connections.

## Connections

- **Extends** [[task-model]] — replaces the implicit assumption of tree decomposition with graph decomposition. The task-model concept already discusses hierarchies; this sharpens the structural model
- **Relates to** [[UI composition]] — a task graph that maps to multiple UI sections creates exactly the component coordination problem PushPin and Embark explored. Shared subtasks need shared state
- **Informs** [[pattern composition]] — if a subtask appears in multiple pattern contexts, the pattern library needs a way to express shared sub-patterns without duplication. This is analogous to the programming concept of shared functions
- **Connects to** [[synchronisation-as-behavioural-rule]] — WYSIWID's sync rules (when X changes, update Y) are the behavioural equivalent of graph edges between tasks. Both express cross-cutting dependencies that trees can't capture
- **Relates to** [[accretive-extensibility]] — when a user adds a new task that shares a subtask with existing ones, the graph model accommodates this naturally (add an edge). A tree model would require restructuring
- **Extends** [[externalised-LLM-understanding]] — NeuroSync's task graph (editable pre-generation) is essentially this concept in practice. NeuroSync found users completed tasks in 1–2 iterations vs. 7–8 when they could see and edit the task decomposition graph

## Practical implementations

- **BPMN** (Business Process Model and Notation): process flows are directed graphs with gateways (parallel, exclusive, inclusive). The standard notation for process modelling in industry
- **DAGs in workflow systems** (Airflow, Prefect, Temporal): task dependencies expressed as directed acyclic graphs. Each node is a task; edges are data or control dependencies
- **React component dependency graphs**: React's reconciliation algorithm already handles DAG-shaped component trees (via shared state, context). A component rendered in two places shares the same state if wired through a store
- **GraphQL schema relationships**: entities reference each other in graph structures, not trees. A `User` references `Orders` which reference `Products` which reference `Reviews` which reference `Users` — cycles included

## Relevance to project

The task-driven data model's schema needs to support graph relationships between tasks, not just parent-child nesting. Concretely:

1. **Schema design**: task nodes need a `relatedTasks` field (array of task IDs with relationship type: enables, parallels, shares-data-with), not just `children`
2. **LLM output format**: when the LLM decomposes a task, it should be allowed to reference existing subtasks rather than being forced to create new ones. Prompt: "If a subtask is shared between multiple parent tasks, reference it by ID rather than duplicating it"
3. **UI mapping**: the renderer needs a strategy for shared tasks — render once with navigation links from all parent contexts, or render in the primary context with cross-references
4. **Model evolution**: when a user adds or modifies a task, graph-aware propagation ensures changes to shared subtasks affect all dependent paths

The link condition mechanism (expression gating sequential task transitions) maps directly to the state management layer — it's the task-model-level representation of conditional UI flows (show step 2 only when step 1 is complete and passes validation).

## Open threads

- How should the LLM represent graph structures in JSON? Adjacency list (each task lists its connections) vs. separate edge list vs. nested-with-references? The A2UI spec uses a flat adjacency list for components — same pattern could work for tasks
- Cycles: real task graphs can have cycles (iterative refinement loops). Should the task model allow cycles, or restrict to DAGs? DAGs are simpler to render but lose the explicit representation of iteration
- Visualisation: how should a task graph be presented in the [[semantic-intermediate-layer]]? NeuroSync uses a node-link diagram. Could also use an indented list with cross-reference annotations (less visual, more compact)
