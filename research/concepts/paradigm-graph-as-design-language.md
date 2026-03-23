---
type: concept
tags: [generative-ui, user-agency, component-mapping, model-evolution]
sources: [interaction-augmented-instruction]
created: 2026-03-06
---
An interaction design can be expressed as a directed graph over a fixed set of entities (Human, Interaction, Text Prompt, Augmented Instruction, Artifact, GenAI), with edges representing information or control flow. This graph representation — the atomic paradigm graph — serves as a design language: it enables describing existing designs (which entities and relations are active), discriminating between similar designs (where their graphs differ), and generating new designs (by recombining or modifying graph structures). Two designs that look superficially similar in their UI may have fundamentally different paradigm graphs, revealing structural distinctions invisible from screenshots alone.

## Context

HCI has had many taxonomies of human-AI interaction (Gao et al.'s communication modes, Hu et al.'s tool/partner/mediator roles, Riche et al.'s AI-Instruments principles). These are descriptive but coarse — they can label a system but can't distinguish between two systems that share the same label. The IAI model's paradigm graphs are fine-grained enough to discriminate (e.g. P3 vs P4 differ only in whether interaction carries intent directly or via an artifact) and compositional (complex workflows are chains of atomic graphs). This makes them usable as a design language, not just a classification scheme.

## Connections

- Extends [[pattern-driven transformation]] — patterns describe *what* UI structure to produce; paradigm graphs describe *how the user and AI interact to produce it*. They're orthogonal: a Search pattern could be generated via P1 (prompt enhancement), P4 (artifact-grounded instruction), or P6 (AI-driven decomposition). The paradigm graph is a meta-pattern for the interaction design, not the UI design.
- Supports [[gentle slope]] — different paradigm positions on the slope correspond to different paradigm graphs. Viewing the generated UI = no paradigm (passive). Adjusting a slider = P7 or P8. Re-prompting = basic H → T → G. The slope can be described as a progression through increasingly complex paradigm graphs.
- Relates to [[configuration-model-as-design-space]] — the set of valid paradigm graphs defines a design space for interaction patterns, just as Kumbang's configuration model defines a space of valid products. Navigating this space (choosing which paradigm to support) is a design decision.
- Complements [[task-interface-duality]] — DuetUI maintains a correspondence between task decomposition and interface structure. Paradigm graphs add a third dimension: the interaction structure. Task ↔ Interface ↔ Interaction paradigm, all three should cohere.
- Supports [[staged-co-generation]] — DuetUI's six stages (Define → Empathise → Plan → Explore → Refine → Duet) can be reinterpreted as a sequence of paradigm graphs: early stages use P5/P6 (AI-driven clarification), middle stages use P1/P2 (user-driven prompt enhancement), late stages use P7/P8/P12 (widget-driven refinement).

## Practical implementations

- **The IAI model's own online browser** (https://interaction-augmented-instruction.github.io/) — interactive exploration of paradigm graphs with tool annotations.
- **Design pattern catalogues** (e.g., UI Patterns, Mobbin) classify by UI pattern but not by interaction paradigm. Paradigm graphs would add a structural classification layer.
- **Storybook interaction testing** — tests are essentially coded paradigm graphs (user does X → component state changes → assertion). The graph vocabulary could make these more systematic.
- No production system currently uses paradigm graphs as an explicit design representation. This is purely an analytical tool at present.

## Relevance to project

Three direct applications:

1. **Choosing interaction patterns for the customisation layer.** The pipeline needs to decide which paradigms to support at each stage. Table 3's design cheat sheet maps design situations to recommended paradigms. For the genUI pipeline: intent specification → P2 (interactive prompt organisation) or P6 (AI-driven decomposition); post-generation refinement → P7 (generative prompt control widgets) or P12 (interactive artifact refinement); spec editing → P1 (interactive prompt enhancement) combined with P4 (artifact as part of instruction).

2. **Evaluating completeness.** By mapping the pipeline's planned interaction points to paradigm graphs, we can check coverage: do we support pre-invocation and post-invocation? Prompt-only and artifact-grounded? If certain quadrants are empty, we know which interaction capabilities are missing.

3. **Generating new interaction designs.** The four usage methods (Table 4) — extend by chaining, refine by adjusting relations, design from model, hypothesise by modifying graphs — provide a systematic process for designing the customisation UX. Instead of "what should the edit experience look like?", the question becomes "what paradigm graph should the edit experience implement, and what entities/relations does it need?"

## Open threads

- The 12 paradigms were derived from 66 existing tools. Generative UI creates interaction surfaces that don't exist yet (the UI itself is generated). What paradigms emerge when the artifact (A) is itself generated and malleable? P8 (generative artifact control widgets) is closest but assumes widgets generated *alongside* artifacts, not widgets generated *as part of* the artifact's own malleability.
- Can paradigm graphs be embedded in the UI specification itself? If a json-render spec included metadata about which paradigm each component supports, the rendering layer could automatically provision the right interaction affordances.
- Multi-agent workflows break the single-G constraint. The paper acknowledges this as future work. For the pipeline, multi-agent orchestration (spec generator + attribute reformulator + adaptation engine) would need extended paradigm graphs.
