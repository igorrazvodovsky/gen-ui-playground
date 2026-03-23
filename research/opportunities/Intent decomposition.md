---
type: solution
id: S15
opportunity: "[[Users express intent ambiguously]]"
status: researched
created: 2026-03-03
source: "[[solution tree]]"
---
Decompose the prompt into Goal → Intents → Intent Dimensions before generating anything. "Plan dinner party" → Goal: plan event → Intents: manage guests, design menu, schedule timeline → Dimensions: guest count (slider), dietary options (multi-select), formality level (toggle). Users refine the dimensions before generation.

Kim et al. (IntentFlow) validate the pattern.

## Concepts

- [[intent-decomposition]]
- [[intent-decomposition]]
- [[reflection-in-intent]]

## Experiments

- [[E16-intent-decomposition-tasks|E16 — Intent decomposition for example tasks]]
