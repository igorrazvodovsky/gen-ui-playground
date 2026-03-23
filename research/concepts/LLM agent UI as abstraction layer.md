---
type: concept
tags: [architecture, interaction-paradigm]
sources: [sources/lit-laui]
created: 2026-02-07
---
LAUI (LLM-Agent User Interface) is a fourth layer of abstraction over a system's raw capabilities: Functions → API → GUI → LAUI. Each layer provides a friendlier interface than the one below. The critical difference: GUI teaches the user to operate the system; LAUI learns the user and operates the system on their behalf. LAUI can reach down through GUI *and* API — it's not limited to what the GUI exposes.

## Context

GUIs are designed at design-time to expose a curated subset of system capabilities through explorable visual metaphors. This works when the system is simple enough and the user is willing to learn. It breaks down when the configuration space is high-dimensional (exponentially many setting combinations) or the user is a novice. LAUI sidesteps both problems: the agent is initialised with full system knowledge, so it can navigate configurations the designer never imagined, and the user only needs to express needs, not learn the system.

## Connections

- Extends [[gentle slope]] — LAUI provides an alternative to the gentle slope: instead of the user climbing from viewing to tweaking to modifying, the agent can do the climbing. But both can coexist — the user interacts with the GUI while the agent adjusts it. The gentle slope still matters for users who *want* to understand and modify.
- Informs [[component catalog as schema]] — the catalog defines not just what the renderer can produce, but what the agent can *choose from*. Catalog design becomes an agent-interface design problem, not just a rendering problem.
- **Motivated by** [[high-dimensional-configuration-space]] — the LAUI layer exists because complex systems have configuration spaces too large for human designers to cover. The agent navigates configurations at use-time that designers couldn't anticipate.
- **Exploits** [[design-time-vs-use-time]] — the agent's advantage is access to use-time information (actual user needs, context, skill level) that the GUI layer, designed at design-time, couldn't have known.
- Tension with [[tools-not-apps]] — a LAUI wrapping a generated interface could re-seal it into an "app" experience (the agent mediates everything, user loses direct composability). Or it could be the thing that makes tool composition accessible to non-technical users. Depends on how transparent the agent's actions are.

## Relevance to project

This doesn't change what gets built in the current pipeline step (json-render, spec generation), but it changes *how* it gets built. Every stage of the pipeline — catalog, mapping rules, data model — should expose surfaces that an LLM agent can inspect, query, and reconfigure. If the catalog is a black box that only the renderer sees, a future LAUI layer can't navigate it. If the mapping rules are hardcoded, the agent can't adapt them to a user's context.

Practical constraint: keep the pipeline's internal representations (specs, schemas, catalog metadata) in formats an LLM can reason about — i.e. JSON with semantic keys, not opaque binary blobs.

## Open threads

- How transparent should the LAUI layer be? If the agent silently reconfigures the UI, the user loses agency. If every change requires approval, the interaction is slow. The Flute X GPT approach is conversational — the agent explains its reasoning — but that doesn't scale to rapid micro-adjustments.
- Does LAUI imply a persistent agent with memory across sessions, or can it work statelessly?
