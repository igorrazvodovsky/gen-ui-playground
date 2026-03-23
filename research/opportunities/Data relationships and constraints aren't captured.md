---
type: opportunity
id: O2b
parent: "[[The gap between user task and component spec is too wide]]"
created: 2026-03-03
source: "[[solution tree]]"
status: open
---
Flat attribute lists don't encode that a dish *belongs to* a menu, that a guest *has* dietary requirements that *constrain* available dishes, or that a pricing tier *depends on* channel eligibility. Without relationships, the generated UI can't show connected views ([[overview-detail-pattern]]) or enforce business logic.

## Solutions

- [[Object-relational schema|S10 — Object-relational schema (JELLY's SVAL/DICT/PNTR/ARRY)]]
- [[Knowledge graph layer|S11 — Knowledge graph layer]]
