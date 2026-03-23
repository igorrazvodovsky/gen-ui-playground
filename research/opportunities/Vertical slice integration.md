---
type: solution
id: S21
opportunity: "[[The end-to-end loop doesn't cohere]]"
status: open-question
created: 2026-03-03
source: "[[solution tree]]"
---
Pick one example task. Wire the full pipeline: prompt → intent decomposition → IR → mapping → json-render → user edit → IR update → re-render. Test every seam.

The runtime layer needs an [[event-driven agent-UI protocol]] — the persistent bidirectional connection (event streams, state sync, frontend-defined tools) that makes the feedback loop work as a continuous process rather than discrete request-response cycles.

## Concepts

- [[event-driven agent-UI protocol]]
- [[shared data layer]]

## Experiments

- [[E23-vertical-slice|E23 — Vertical slice integration]]
