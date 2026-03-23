---
type: solution
id: V10
opportunity: "[[The composed interface is incoherent]]"
status: speculative
created: 2026-03-03
source: "[[vision tree]]"
---
Instead of embedding existing UIs, generate a new unified interface that communicates with existing systems via API. The user sees one coherent generated UI; the backend orchestrates data flow to/from existing systems.

This is closer to [[Generative UI|Branch 2]] (generation) than Branch 1 (operation), but the generated UI is thin — primarily a presentation layer over existing system APIs.

## Riskiest assumption

The existing systems expose enough API surface that a generated wrapper can provide equivalent functionality. Many systems don't.
