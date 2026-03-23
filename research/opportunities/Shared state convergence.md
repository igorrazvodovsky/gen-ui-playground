---
type: solution
id: V12
opportunity: "[[Agent-to-agent coordination is unreliable]]"
status: speculative
created: 2026-03-03
source: "[[vision tree]]"
---
All agents write to a shared state object ([[shared data layer]]). Conflicts are resolved by CRDTs or last-writer-wins policies. No orchestrator — coordination emerges from shared state.

Simpler architecture but harder to reason about.

## Riskiest assumption

Conflict resolution policies produce acceptable results. Two agents modifying the same schedule entry needs a resolution strategy that's better than arbitrary.

## Concepts

- [[shared data layer]]
