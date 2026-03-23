---
type: solution
id: S1
opportunity: "[[Changes don't propagate]]"
status: researched
created: 2026-03-03
source: "[[solution tree]]"
---
# S1 — Two-way reactive binding (DFRP)

React components read from *and write to* a shared JSON document. json-render currently only reads; making it write-back is the minimum viable step. AG-UI's [[shared data layer]] provides a concrete protocol: StateSnapshot for full state, StateDelta with JSON Patch (RFC 6902) for incremental updates. This makes the agent-frontend binding bidirectional over a network boundary, not just co-located.

## Concepts

- [[json-document-backed-components]]
- [[shared data layer]]
- [[event-driven agent-UI protocol]]

## Experiments

- [[E1-round-trip-binding|E1 — Round-trip binding]]
- [[E2-update-granularity|E2 — Update granularity test]]
