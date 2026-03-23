---
type: experiment
id: E10
solution: "[[Multi-level IR chain]]"
status: not-started
created: 2026-03-03
source: "[[solution tree]]"
---
# E10 — Multi-level IR chain build

Build the intent IR → data IR → presentation IR chain for one example task. Test: can a user edit at the data IR level (add a field) and have the change propagate cleanly to the presentation IR and then to json-render?

## What it validates

Whether a three-level IR chain is feasible and whether propagation between levels can be automated.

## Key question

How much of the chain can be automated vs. requires human choice?
