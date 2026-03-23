---
type: solution
id: V8
opportunity: "[[Data doesn't flow between systems]]"
status: speculative
created: 2026-03-03
source: "[[vision tree]]"
---
Systems share entity IDs, not data. Each system owns its own data for entities it knows about; cross-references happen via shared IDs. Déjà Vu's approach. Lighter than a shared data layer but requires a shared identity namespace.

## Riskiest assumption

A shared identity namespace can be established across systems that weren't designed to interoperate.

## Concepts

- [[identity-based-data-integration]]
