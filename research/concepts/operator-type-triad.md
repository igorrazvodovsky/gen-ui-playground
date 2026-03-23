---
type: concept
tags: [data-model, component-mapping, specification, json-render]
sources: ["sources/composite-task-meta-model"]
created: 2026-03-23
---
Every leaf-level operation in a task model falls into exactly one of three categories based on who's involved: **Action** (system only — no UI needed), **Interaction** (user + system — needs a UI control), or **Manual** (user only — outside the system, at most instructional text). ReTaMeta (Goschnick et al., 2010) formalises these as subclasses of Operator, synthesising Diane+H's task types and CTT's category attribute.

## Context

The pipeline's task analysis step decomposes a user prompt into a task hierarchy. But not every node in that hierarchy needs a UI component. "Calculate shipping cost" is an Action — the system does it silently. "Select delivery address" is an Interaction — needs a form element. "Pack the item for return" is Manual — the user does it physically, the system can at best show instructions. Without this distinction, the LLM generates UI elements for things that don't need them, or misses interactive controls for things that do.

The triad also directly maps to [[constraint-driven component selection]] decisions. Actions get no component (or a status indicator if feedback is needed). Interactions map to input controls, selection widgets, or dialogs depending on the data type. Manuals get informational displays (text, illustration, checklist step) — never input controls.

## Connections

- **Informs** [[task-model]] — operator types are a core attribute of task model nodes; the existing concept note mentions task types informally but ReTaMeta makes the triad explicit and grounded across six formalisms
- **Feeds** [[constraint-driven component selection]] — type narrows the component search space before any data-type or cardinality rules apply. Interaction + String + `only` constraint → Dropdown. Action → no component (or progress indicator). Manual → instructional text block
- **Refines** [[pattern-driven transformation]] — at the organism level, patterns can specify which internal nodes are Actions vs. Interactions. A "Checkout" pattern might have: calculate total (Action), enter payment (Interaction), confirm order (Interaction), process payment (Action), pack order (Manual)
- **Relates to** [[frontend-defined tool execution]] — AG-UI's concept of frontend-defined tools is the runtime equivalent: the frontend declares which Interaction operations are available; the agent can trigger Actions directly
- **Relates to** [[adaptive-autonomy]] — the type isn't always fixed. An Interaction can become an Action when the system has high confidence in the right choice (auto-fill). An Action can surface as an Interaction when the user wants control (show me the calculation). The type boundary is the collaboration contract

## Practical implementations

- **CTT tools** (ConcurTaskTrees Environment): explicitly assigns task types — user task, system task, interaction task, abstract task — using icons in the tree notation
- **BPMN** (Business Process Model and Notation): Service Tasks (Action), User Tasks (Interaction), Manual Tasks (Manual) — exact same triad, different lineage
- **React component libraries**: already implicitly encode this. Display components (Text, Badge, Indicator) = Action feedback. Form components (Input, Select, Checkbox) = Interaction. No standard category for Manual, but instructional/stepper components serve the role
- **State machines** (XState): events distinguish user-initiated transitions (Interaction) from automatic transitions (Action). Guards are the equivalent of Conditions

## Relevance to project

This is the first-pass filter in the task analysis → UI specification step. Before the LLM selects patterns or maps data types to components, it should classify each task node's operator type. The classification determines:

1. **Whether to generate a component at all** — Actions produce no visible UI element unless the user has requested transparency (in which case: status indicator or progress bar)
2. **Which component *class* to search** — Interaction → form/input controls; Manual → informational/instructional displays
3. **How the task appears in the [[semantic-intermediate-layer]]** — different visual treatment helps users distinguish "things I'll interact with" from "things the system does automatically"

For the LLM prompt: when decomposing a task, each node should carry a `type: "action" | "interaction" | "manual"` field. This can be inferred from the task description with high reliability (LLMs understand agency well) and validated against simple heuristics (tasks with "select", "enter", "choose" → Interaction; tasks with "calculate", "fetch", "validate" → Action; tasks with physical verbs → Manual).

## Open threads

- Should the triad extend to a quartet? CTT adds "abstract" — a grouping node that exists only to organise the hierarchy. In a generative UI context, abstract nodes might map to section headers, tab containers, or navigation groups
- How does the type interact with [[adaptive-autonomy]]? If the system auto-fills an Interaction (converting it to effectively an Action), should the UI still show the control (pre-filled, editable) or hide it? DuetUI's trust findings suggest showing it — hidden automation erodes trust
- Can the LLM reliably assign types? Edge cases: "review the report" — is that Manual (user reads) or Interaction (user marks as reviewed in the system)? The distinction depends on whether the task has a system-facing state change
