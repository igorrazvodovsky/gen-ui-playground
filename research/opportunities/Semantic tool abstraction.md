---
type: solution
id: V4
opportunity: "[[Agent actions in existing systems are fragile]]"
status: open-question
created: 2026-03-03
source: "[[vision tree]]"
---
# V4 — Semantic tool abstraction

Expose domain operations as high-level tools ("configure product for channel") rather than low-level GUI clicks. Hides implementation fragility.

Trade-off: the tool layer must be maintained as the underlying system changes.

## Riskiest assumption

Semantic tools can be authored quickly enough to be practical. If each new domain requires weeks of tool engineering, the approach doesn't scale.
