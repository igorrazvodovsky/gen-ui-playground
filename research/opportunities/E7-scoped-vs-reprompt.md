---
type: experiment
id: E7
solution: "[[Scoped semantic editing]]"
status: not-started
created: 2026-03-03
source: "[[solution tree]]"
---
# E7 — Scoped vs. re-prompt drift comparison

Generate a multi-component interface. Ask the user to modify one section. Compare scoped editing (change just that section's spec) vs. re-prompting (describe the change in natural language). Measure drift in the unchanged sections.

## What it validates

Whether scoped editing reduces [[semantic-drift]] measurably compared to re-prompting.

## Metrics

- Similarity of unchanged sections before/after (structural diff)
- User perception of stability
