---
type: solution
id: V7
opportunity: "[[Data doesn't flow between systems]]"
status: speculative
created: 2026-03-03
source: "[[vision tree]]"
---
A common substrate that multiple views (both generated and existing) can read from and write to. Schema differences handled by lenses (Cambria-style bidirectional translation) or by a mediating LLM that maps between schemas.

## Riskiest assumption

Schema mediation can be automatic enough to be practical. Manual mapping per system pair doesn't scale.

## Concepts

- [[shared data layer]]
