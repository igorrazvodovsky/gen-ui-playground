---
type: opportunity
id: Branch 1
parent: "[[LLM operable interfaces]]"
created: 2026-03-03
source: "[[vision tree]]"
status: partially-testable
---
The agent drives applications that already exist, navigating their configuration spaces on the user's behalf. No new UI is generated — the agent uses the system's own surfaces (GUI, API, CLI) to accomplish user goals.

This is what the LAUI paper describes: the agent as a fourth abstraction layer (Functions → API → GUI → LAUI). The [[Domain-specific end-to-end]] experiment test this: task decomposition driving an existing app via WebMCP.

Partially testable now. Shares intent decomposition and knowledge grounding with [[Generative UI|Branch 2]] but doesn't need the rendering pipeline.

## Sub-opportunities

- [[Agent can't reliably decompose business intent into system operations|O1.1 — Agent can't reliably decompose business intent into system operations]]
- [[Agent actions in existing systems are fragile|O1.2 — Agent actions in existing systems are fragile]]
- [[Users can't see or steer what the agent is doing|O1.3 — Users can't see or steer what the agent is doing]]
