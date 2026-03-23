---
type: concept
tags: [json-render, component-mapping, specification]
sources: [sources/lit-malleable-software]
created: 2026-02-06
updated: 2026-03-11
aliases: [document functional reactive programming, DFRP]
---
A UI architecture pattern from PushPin: represent a tool as a React component backed by a shared JSON document that is automatically persisted and synchronised. The component reads from and writes to the document; the infrastructure handles storage and sync. This decouples data from presentation — the JSON document is the model, the React component is the view. Multiple components can render the same document differently.

## Context

This is the same pattern as a spreadsheet: the data lives in cells, the rendering (formatting, charts) is layered on top. Change the chart type and the data stays the same. Add a new chart and it reads from the same cells.

PushPin found that this pattern dramatically reduced the effort to extend the system with new tools — just register a new component that reads the existing document format. But it also found limitations: components couldn't easily share state beyond the document (hover states, selections), and the embedding model was too restrictive for rich cross-component interactions.

PushPin's implementation used Automerge for CRDT-based conflict-free synchronisation of the JSON documents across devices.

## Connections

- **Instance of** [[shared data layer]] — the JSON document is the shared substrate
- **Enables** [[UI composition]] — because data and UI are decoupled, new views can be plugged in
- **Related to** [[tools-not-apps]] — each component is a small, focused tool operating on shared data
- **Generalised by** [[software-as-data-structure]] — DFRP treats the JSON document as data that drives UI rendering. Varv extends this: the JSON also encodes behaviour (actions, triggers) and composition rules. DFRP is one layer of the full approach.
- **Uses** [[abstract-concrete-separation]] — the JSON document (data) is abstract; the React component (view) is concrete. Different components can render the same JSON differently.
- **Networked via** AG-UI's StateSnapshot/StateDelta events — AG-UI extracts DFRP's document update mechanism into a network protocol. DFRP assumes co-located components and documents; AG-UI bridges a network boundary, adding incremental sync via JSON Patch. See the agent-frontend state sync section in [[shared data layer]].

## Practical implementations

- **PushPin** (Ink & Switch) — the origin. React components + Automerge JSON docs.
- **Spreadsheets** — the ur-example. Data in cells, multiple views (tables, charts, pivots) read the same cells.
- **Airtable/Notion** — multiple views (table, board, calendar) over the same database records.
- **React + Redux** — centralised JSON state, multiple React components subscribe to slices.
- **CRDTs** (Automerge, Yjs) — the synchronisation layer that makes shared JSON documents work across devices.

## Relevance to project

This is almost exactly what json-render does. JSON in → React component out. The question is whether json-render's model is rich enough to support the full pattern — specifically, can multiple components render different aspects of the same JSON? Can a component write back to the JSON (making it two-way, not just rendering)?

JELLY takes this further: the JSON isn't just a flat document but a structured data model (object-relational schema + dependency graph), and the mapping to components is governed by explicit UI specification rules rather than one-to-one component registration.

## Open threads

- json-render is currently one-way (JSON → rendered UI). What would it take to make it two-way? AG-UI suggests a mechanism: [[frontend-defined tool execution]] — the frontend exposes mutation tools that the agent can call, and user interactions trigger the same tools locally.
- How does the pattern handle schema evolution? If the JSON document structure changes, how do existing components adapt?
- PushPin's limitation (no cross-component state sharing) — is this also a limitation of json-render? Varv trades away per-document isolation for full reprogrammability. Where on this spectrum should the pipeline sit?
