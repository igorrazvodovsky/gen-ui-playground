---
type: concept
tags: [model-evolution, user-agency, generative-ui]
sources: [sources/how-notations-evolve.md]
created: 2026-03-12
---
Notations evolve through three social stages with distinct dynamics. **Stage 1 (invention & incubation):** a notation is created to manage complexity, borrowing from existing representations via linking metaphors and refining through rapid iteration against diverse scenarios. **Stage 2 (dispersion & divergence):** the notation spreads to new communities who adapt, reinterpret, and extend it — divergent variants emerge, "notation wars" may erupt. **Stage 3 (institutionalisation & sanctification):** committees form to standardise, changes become costly, the notation is reified in software and encoded in standards. Alongside these social stages, three functional stages describe how a notation's *purpose* shifts: descriptive (representing phenomena), generative (producing new ideas/configurations), and evaluative (becoming the lens through which the domain is judged).

## Context

Zhang et al. (2025) identify these stages from patterns shared across the evolution of chemical formulas, dance notation, music notation, sign language writing, Feynman diagrams, programming languages, Markdown, and others. The stages aren't rigid — patterns can appear across stages — but they capture a consistent social trajectory. Key insight: formality is not a spectrum toward a reachable end-state but a contested social process that involves negotiation, power, and value-setting.

## Connections

- Parallels [[accretive-extensibility]] — Varv's overlay model (user modifications as a separate layer from the base) structurally mirrors Stage 2 divergence: users create personal variants without modifying the canonical notation
- Extends [[configuration-model-as-design-space]] — Stage 2 divergence is what happens when users navigate *outside* the designed configuration space; the forks and variants are explorations of regions the original inventor didn't map
- Relates to [[intent-specification-as-common-ground]] — SemanticCommit addresses the Stage 3 problem: how to govern changes to a shared, evolving specification (commit semantics, conflict detection, blast radius analysis)
- Connects to [[design-time-vs-use-time]] — Stage 1 is design-time; Stage 2 is the messy collision of design-time assumptions with use-time reality; Stage 3 is the attempt to re-stabilise
- Supports [[tools-not-apps]] — the malleable software philosophy is explicitly anti-Stage 3, favouring perpetual Stage 2 where users continuously adapt tools rather than being locked into institutionalised forms

## Practical implementations

Programming language governance: Python PEPs, ECMAScript TC39, Rust RFCs. Design system versioning: Material Design 1 → 2 → 3, each a Stage 3 institutionalisation followed by a controlled Stage 1 reinvention. API versioning and deprecation policies. Markdown's fractured ecosystem (CommonMark, GFM, Obsidian Flavored) is a living example of Stage 2 divergence partially resolved by Stage 3 efforts.

## Relevance to project

**Model evolution (the ↺ loop):** The genUI pipeline generates an interface (Stage 1: invention). When users customise it, they create personal variants (Stage 2: dispersion). If those variants are shared or become defaults, they're institutionalised (Stage 3). The pipeline should be designed with this lifecycle in mind. Specifically:

- **S2 (accretive overlays)** and **S3 (abstract/concrete separation)** are mechanisms that support healthy Stage 2 divergence — personal variants that don't destroy the base
- The [[intent-specification-as-common-ground]] pattern is a Stage 3 governance mechanism — how shared specifications are updated without uncontrolled divergence
- The paper's warning about Stage 3 costs (changes become expensive, communities resist them) applies to the data model layer: once a user has built workflows on top of a generated schema, changing the schema is a breaking change. This reinforces the importance of [[configuration-model-as-design-space]] — designing for variation upfront rather than hard-coding a single point

**Functional stages have a pipeline analogue.** A generated UI starts in the descriptive stage (it represents the user's task). If the user starts generating new entities or configurations through the UI (not just viewing existing ones), it's entered the generative stage. If the UI's structure starts shaping how the user *thinks about* the task — filtering out considerations the notation doesn't represent — it's entered the evaluative stage. The pipeline should be aware of this progression, particularly the evaluative risk: the UI shouldn't silently narrow the user's problem space.

## Open threads

- The paper notes that inventors "lose control" of notations as they spread (§3.3.10). For generated UIs, who "owns" the evolving specification — the user, the system, or neither? This connects to [[adaptive-autonomy]].
- How fast do generated UIs move through the stages? Traditional notations take decades; generated UIs might compress the cycle to hours or days. Does the speed change the dynamics?
- The "notation wars" pattern (§3.2.10) — where competing representations vie for dominance — could manifest as competing generated UIs for the same task. Is there value in showing users multiple options and letting them choose?
