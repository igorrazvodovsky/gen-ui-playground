---
type: experiment
id: E4
solution: "[[Abstract-concrete separation]]"
status: not-started
created: 2026-03-03
source: "[[solution tree]]"
---
# E4 — Abstract/concrete separation test

Express a simple task (e.g. a reading list) as abstract model + concrete bindings. Change the bindings (swap table for cards) and verify the abstract model is untouched. Change the abstract model (add a field) and verify bindings extend gracefully.

## What it validates

Whether abstract/concrete separation holds under modification in both directions.
