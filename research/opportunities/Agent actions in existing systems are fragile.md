---
type: opportunity
id: O1.2
parent: "[[Operate existing systems]]"
created: 2026-03-03
source: "[[vision tree]]"
status: open
---
WebMCP tool calls against a live GUI are brittle — selectors break, async timing fails, multi-step flows depend on UI state that's hard to observe. The agent can decompose the task correctly but still fail at execution.

## Solutions

- [[API-first operation where available|V3 — API-first operation where available]]
- [[Semantic tool abstraction|V4 — Semantic tool abstraction]]
