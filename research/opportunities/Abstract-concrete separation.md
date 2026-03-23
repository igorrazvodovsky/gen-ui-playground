---
type: solution
id: S3
opportunity: "[[Changes don't propagate]]"
status: researched
created: 2026-03-03
source: "[[solution tree]]"
---
Separate the *semantic* layer (what entities exist, what actions are valid) from the *binding* layer (which components render them, which layout). User edits to the concrete layer don't affect the abstract layer and vice versa.

## Concepts

- [[abstract-concrete-separation]]

## Experiments

- [[E4-abstract-concrete-separation-test|E4 — Abstract/concrete separation test]]
