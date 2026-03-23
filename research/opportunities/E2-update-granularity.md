---
type: experiment
id: E2
solution: "[[Two-way reactive binding]]"
status: not-started
created: 2026-03-03
source: "[[solution tree]]"
---
# E2 — Update granularity test

Test full spec replacement vs. surgical JSON patches (RFC 6902). Measure re-render performance and state preservation.

## What it validates

Whether JSON Patch (StateDelta) is worth the added complexity over full snapshot replacement (StateSnapshot) for this use case.

## Metrics

- Re-render time under both approaches
- State preservation (e.g. scroll position, focus) after update
- Complexity of implementation
