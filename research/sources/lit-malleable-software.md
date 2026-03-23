---
title: "Malleable Software: Restoring User Agency in a World of Locked-Down Apps"
authors: [Geoffrey Litt, Josh Horowitz, Peter van Hardenberg, Todd Matthews]
year: 2025
venue: "Ink & Switch"
type: literature
status: processed
---

## Core idea

Mass-produced software forces users to adapt to rigid, single-purpose applications. Malleable software inverts this: users reshape tools to fit their needs with minimal friction. The essay proposes three design patterns — gentle slope from user to creator, tools not apps, and communal creation — and demonstrates them through Ink & Switch's prototype stack (PushPin, Cambria, Farm, Patchwork, Potluck, Embark).

## Key concepts

- [[gentle slope]] — each increment of tailoring power requires only a small increment of learning
- [[tools-not-apps]] — composable, general-purpose tools operating on shared data, not monolithic apps with private silos
- [[shared data layer]] — tools operate on a common data substrate; the filesystem and Automerge/local-first are examples
- [[UI composition]] — breaking apps' control over the interactive environment so tools can coexist in shared workspaces
- [[in-place toolchain]] — editing tools live inside the usage environment, no context-switch to a separate dev environment
- [[structured vs unstructured tension]] — computational tools need structure, humans think in unstructured ways; the challenge is gradual enrichment
- [[json-document-backed-components]] — React UI component backed by a JSON document that's automatically persisted and synced (PushPin pattern)

## Technical approach

**Infrastructure stack (local-first):**
- Automerge for persisting and syncing JSON documents
- PushPin: media canvas where each card is a React component backed by an Automerge doc (DFRP pattern)
- Cambria: live schema translation via "lenses" — decouples write schemas from read schemas
- Farm: source code stored in Automerge docs, enabling live editing
- Patchwork: version control + bootstrapping on top of the above; code-as-data; AI-assisted tool creation

**Dynamic documents:**
- Potluck: enrich plaintext with dynamic behaviour via detectors and formulas
- Embark: hierarchical outline + structured objects (e.g. Google Maps locations) + embedded rich views (maps, calendars) with shared context

**Key finding from Embark:** rich embedding context — embedded views are deeply aware of surrounding document content. Local context determines what's shown. Interactions synchronise across views (hover on map highlights in outline).

## Extracted concepts

- [[gentle slope]]
- [[tools-not-apps]]
- [[shared data layer]]
- [[UI composition]]
- [[in-place toolchain]]
- [[structured vs unstructured tension]]
- [[json-document-backed-components]]
