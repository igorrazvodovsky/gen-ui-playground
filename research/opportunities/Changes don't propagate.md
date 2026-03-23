---
type: opportunity
id: O1a
parent: "[[Generated UIs are disposable]]"
created: 2026-03-03
source: "[[solution tree]]"
status: open
---
When a user edits the UI (changes a value, toggles a switch, rearranges a list), nothing updates upstream. The underlying spec doesn't know the UI changed. Next regeneration wipes everything.

## Solutions

- [[Two-way reactive binding|S1 — Two-way reactive binding (DFRP)]]
- [[Accretive overlays|S2 — Accretive overlays (Varv pattern)]]
- [[Abstract-concrete separation|S3 — Abstract/concrete separation]]
