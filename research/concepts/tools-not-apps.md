---
type: concept
tags: [user-agency, data-model]
sources: [sources/lit-malleable-software]
created: 2026-02-06
---
Applications are avocado slicers — single-purpose bundles of functionality that can't be recombined. Tools are knives — general-purpose, composable, worth investing skill in. Malleable software should orient around composable tools operating on shared data, not monolithic apps with private data silos.

## Context

The app model bundles data, logic, and UI into a single sealed unit. This gives a cohesive experience within one app but makes cross-app workflows painful (manual copy-paste, no shared state). Planning a dinner party means juggling a calendar, a notes app, a maps app, a messaging app — exactly the scenario JELLY is designed to collapse into one generative interface.

The alternative: small, general tools that compose over shared data. Text editors, spreadsheets, and Unix pipes are examples. The challenge is that composability requires agreements about data formats and UI integration points.

## Connections

- Depends on [[shared data layer]] — tools can only compose if they operate on common data
- Depends on [[UI composition]] — tools need to share workspace, not just data
- Tension with generative UI: a generated interface *is* a kind of app (purpose-built for a task). But if the underlying data model and component library are open, it's more like a dynamically assembled toolkit. The distinction matters.

## Relevance to project

This reframes what generative UI is for. It's not about generating better apps — it's about eliminating the need for apps altogether by generating task-specific tool assemblies on the fly. The data model is the shared substrate; the UI components are the tools; the generation step is the assembly.

For json-render: the component library *is* the toolkit. Each component should be a general-purpose tool (a date picker, a list view, a map) that can be composed and recomposed, not a bespoke component for one use case.

- **Implemented by** [[concept-as-composition-unit]] — Varv's concepts are precisely this: small, named, composable units of functionality. An application is a composition of concepts, not a monolith. The todo list case study shows features added one concept at a time (todo, assignee, filtering) — each is an independent tool composed into the whole.
- **Enabled by** [[accretive-extensibility]] — tools compose by layering on top of each other. Adding a feature doesn't require understanding or modifying existing features.

## Open threads

- Where's the line between "generating an app" and "assembling tools"? Is JELLY's approach closer to generating a custom app or composing tools? **Varv suggests the answer**: if the output is a set of composable concepts (each an independent tool), it's assembly. If the output is a monolithic spec, it's app generation. The genUI pipeline should target concept composition, not monolithic spec generation.
- Can the json-render component set be designed as composable tools rather than just rendering primitives?
- Varv's board game toolkit shows domain-specific tool libraries: Sean builds reusable game concepts ("piece", "square", "colorable") that enable rapid game creation. Could generative UI include domain-specific concept libraries (project management, event planning) as pre-built tool kits?
