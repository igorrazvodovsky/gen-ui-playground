---
type: concept
tags: [generative-ui, specification, data-model, component-mapping]
sources: [sources/duetui-bidirectional-co-generation]
created: 2026-03-05
---
A strict hierarchical correspondence between the logical task decomposition and the visual interface description: Task ↔ Navigation, Subtask ↔ Page, Data ↔ Component. Every element in the task plan has a corresponding, directly manipulable interface element, and vice versa. The two structures are maintained in parallel by separate agents (Task Agent and Interface Agent) but kept consistent through shared context.

## Context

DuetUI's formative study found users naturally entangle task needs with interface expectations (F3) — "I want to search for travel guides [task], browse and bookmark posts [interface], then summarise a plan [task]." Rather than fighting this entanglement, task-interface duality embraces it: the interface IS the task plan, rendered. Modifying one modifies the other.

This is a specific instantiation of a broader principle: the UI should be isomorphic to the task structure it supports, not an arbitrary visual arrangement. When Harry drags the "Find accommodation" card before "Plan itinerary" in DuetUI's Plan stage, he's simultaneously reordering the task plan AND the interface navigation — because they're the same structure.

## Connections

- Refines [[task-model]] — the task model concept captures what the user is working with (entities, attributes, relationships). Task-interface duality adds a requirement: the task model must be *structurally mappable* to a UI hierarchy. Not just data, but navigational structure.
- Implements [[abstract-concrete-separation]] differently — Varv separates abstract semantics from concrete bindings. Task-interface duality separates logical structure (task decomposition) from visual structure (interface description) but maintains a strict *correspondence* rather than independence. The two hierarchies mirror each other.
- Extends [[pattern-driven transformation]] — the model hierarchy (Task → Dialog → Presentation → Layout) assumes transformations between different levels of abstraction. Task-interface duality suggests that at least two of these levels (task and presentation) should remain explicitly linked, not just connected by a transformation pipeline. The correspondence should be visible and manipulable, not buried in code.
- Addresses [[semantic-drift]] structurally — if every task element maps to an interface element, regenerating or modifying the interface is anchored to the task structure. Changes in one propagate predictably to the other, preventing the kind of unconstrained drift that occurs when task and interface are loosely coupled.

## Practical implementations

- **DuetUI**: Task Agent manages a three-level task decomposition (task/subtask/data); Interface Agent manages a parallel three-level interface description (navigation/page/component). Context Manager maintains the correspondence.
- **Notion databases**: the task structure (rows, properties) directly determines the interface structure (table columns, kanban lanes, calendar events). Different views are different visual projections of the same underlying structure.
- **JELLY**: task-driven data model drives the generated UI. The data model entities map to UI sections; attributes map to fields. Same principle, less formally specified.
- **Meridian**: DataConfig → ViewConfig mapping, where the data attributes determine what appears in overview vs. detail views.

## Relevance to project

For the genUI pipeline, this suggests the intermediate representation (between intent analysis and UI specification) should encode *both* the task structure and its interface mapping as a single, coherent artefact. Not "generate a task model, then separately generate a UI spec" — but "generate a task-interface plan where the structural correspondence is explicit." This would make the generated UI more predictable (changes to task structure cascade cleanly to UI) and more inspectable (the user can see why each UI section exists — it corresponds to a task element).

The four-layer config from Meridian (Data → Attribute → View → Layout) could be extended with explicit task correspondence: each View element links back to the task element it serves.

## Open threads

- **Granularity mismatch**: not every data element needs a dedicated component, and not every component serves a single data element. The strict three-level mapping (Task↔Navigation, Subtask↔Page, Data↔Component) may be too rigid for complex interfaces where cross-cutting views aggregate data from multiple subtasks.
- **Break the symmetry when needed**: dashboards, summaries, and cross-task comparisons don't fit neatly into a one-to-one task-interface mapping. The duality works well for task execution interfaces but may constrain analytical or exploratory interfaces.
- **Dynamic duality**: as the task evolves (user adds subtasks, reorders, removes), the interface must co-evolve. How fast and how smoothly this happens determines whether the duality feels helpful or constraining.
- **Preceded by** [[feature-component-duality]] — Kumbang (2007) identified the same structural pattern in software product families: features (user view) and components (builder view) are distinct but formally linked via implementation constraints. Task-interface duality is the generative-UI version: tasks (user view) and interface elements (builder view) mirror each other. Kumbang adds something DuetUI doesn't make explicit: a formal constraint language for the bridging rules.
