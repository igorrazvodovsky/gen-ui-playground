---
type: concept
tags: [architecture, generative-ui, design-constraint]
sources: [sources/lit-laui]
created: 2026-03-05
---
When a system's features can be controlled independently, the total configuration space is the Cartesian product of all settings — it grows exponentially. A system with 10 binary settings has 1,024 configurations; with continuous parameters, the space is effectively infinite. This makes exhaustive design-time exploration impossible. No human designer can imagine, test, and build GUI affordances for every meaningful combination. Most configurations are never considered, even though some would be the best fit for specific users in specific contexts.

## Context

Chin et al. illustrate this with Music X Machine: haptic mode (4 options) × visual feedback (on/off) × tempo mode (2 options) × song selection × segment selection × tempo multiplier — already more combinations than any designer could pre-build interaction patterns for. The designer creates a handful of "presets" (Force Mode, Adaptive Mode) that package sensible defaults, and the GUI exposes those presets. But the space between and beyond the presets goes unexplored.

This isn't unique to music tutoring. Any sufficiently configurable system has this property — and a generative UI pipeline is one of the most configurable systems imaginable. The pipeline's own configuration space includes: which components to use, how to lay them out, what data to show, how to bind data to presentation, what interaction patterns to support, what level of detail to expose. Each choice multiplies the space.

## Connections

- **Motivates** [[LLM agent UI as abstraction layer]] — the LAUI exists precisely because the configuration space is too large for human designers to cover. The agent navigates configurations at use-time that designers couldn't anticipate at design-time.
- **Motivates** [[emergent workflow]] — emergent workflows are configurations (or sequences of configurations) that were never pre-designed but turn out to be effective for a specific user.
- **Constrains** [[pattern-driven transformation]] — patterns are designer-curated "good configurations" — presets that cover common cases. They don't cover the full space. The question is whether patterns + an LLM agent can reach configurations that patterns alone can't.
- **Relates to** [[constraint-driven component selection]] — constraints reduce the configuration space by eliminating invalid combinations. But even a heavily constrained space can be enormous. Constraints help but don't solve the fundamental combinatorial problem.
- **Relates to** [[context-driven adaptation]] — adaptation rules are another form of pre-designed configuration mapping (user trait → UI modification). Like patterns, they cover common cases but can't cover the full Cartesian product of user traits × system capabilities.
- **Relates to** [[design-time-vs-use-time]] — the configuration space is intractable at design-time but navigable at use-time, because the user's actual context dramatically prunes the relevant subspace.
- **Formalised by** [[configuration-model-as-design-space]] — Kumbang (Asikainen et al., 2007) shows that product families have been dealing with this problem for decades. Their solution: define the space formally (types, cardinalities, constraints), then provide a configurator that navigates it with automated consistency checking. The configuration space isn't just a metaphor — it's a concrete artefact with formal semantics.

## Practical implementations

- **IDE settings** — VS Code has 500+ settings. Most users touch fewer than 20. The rest form a vast unexplored space. Extensions like "Settings Sync" and workspace-specific settings are workarounds for the fact that no default configuration fits everyone.
- **DAW mixing consoles** — per-channel EQ, compression, effects, routing, sends, automation. Each parameter is independent; the total space is astronomical. Engineers develop personal "starting templates" (presets) and adjust from there.
- **Webpack/build tool config** — build systems have combinatorial configuration spaces. CRA, Vite, and Next.js succeed partly by collapsing this space into opinionated defaults.
- **Kubernetes** — resource limits × replica counts × affinity rules × network policies × storage classes. Auto-scalers and operators are essentially agents navigating this configuration space at runtime.
- **CSS** — every element has dozens of properties, each composing with layout, cascade, and specificity rules. Design systems work because they pre-package "good configurations" as tokens and component variants.

## Relevance to project

The genUI pipeline *is* a high-dimensional configuration space. Consider what the system needs to decide for a single UI generation: component type (from catalog) × component variant × layout position × data binding × interaction mode × styling parameters × responsiveness rules. Multiply across all components in the interface, and the total space dwarfs anything a human could pre-specify.

This has two practical implications:

1. **Pattern libraries are necessary but insufficient.** Patterns pre-package good configurations for common cases. They're the "presets." But the pipeline also needs a mechanism for navigating the space beyond patterns — either through LLM reasoning about component semantics or through user customisation loops.

2. **The catalog needs enough metadata to support automated navigation.** If an agent (or LLM) is going to select configurations at use-time, catalog entries need semantic descriptions of when they're appropriate, what data shapes they expect, and how they compose with other components. A catalog that only says "Button: {variant: primary | secondary}" can't support intelligent configuration selection. One that says "Button: primary for single main action, secondary for alternative actions; pair with Form for submission workflows" can.

## Open threads

- Is there a useful middle ground between "designer picks from presets" and "agent navigates full space"? Something like "designer defines regions of the space (patterns), agent searches within and between regions"?
- How do you validate configurations that were never pre-tested? An emergent configuration might look good to the agent but produce a terrible UX. This is the quality assurance problem for generative UI at scale.
- Does the configuration space have structure (smooth gradients, clusters of good solutions) or is it rugged (small changes produce wildly different outcomes)? If smooth, hill-climbing works; if rugged, you need more sophisticated search.
