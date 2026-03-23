---
type: experiment
id: E3
solution: "[[Accretive overlays]]"
status: not-started
created: 2026-03-03
source: "[[solution tree]]"
---
# E3 — Two-layer spec regeneration

Implement a two-layer spec: base (generated) + overlay (user edits). Regenerate the base and verify overlays still apply correctly.

## What it validates

Whether the accretive overlay pattern is viable in practice — that user modifications survive regeneration.

## Edge cases to test

- Regeneration removes an element the overlay modifies
- Overlay references a field that no longer exists in the new base
- Overlay conflicts with a structural change in the base
