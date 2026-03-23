---
type: concept
tags: [generative-ui, intent, user-agency]
sources: [sources/duetui-bidirectional-co-generation]
created: 2026-03-05
---
Complex task-oriented UI generation should unfold through distinct collaborative phases, not as a single prompt-to-output step. DuetUI identifies six stages: **Define** (capture high-level goal), **Empathise** (elicit details and constraints), **Plan** (structure requirements into subtasks), **Explore** (gather data and potential solutions per subtask), **Refine** (adjust parameters of proposed solutions), **Duet** (finalise through iterative refinement cycles where the agent proactively pushes context-aware suggestions based on observed user behaviour).

## Context

Derived from DuetUI's formative study (N=12) synthesised with design thinking frameworks. All participants revealed intent gradually — starting with a "basic motivation," generating an initial result, then refining based on what they saw. The six-stage model formalises this observed workflow into a structure the system can support with stage-appropriate interfaces.

The crucial insight is that different stages have different collaboration dynamics. Early stages (Define, Empathise) are agent-led — the system asks questions, the user answers. Middle stages (Plan, Explore) shift to mixed initiative — the agent generates structure, the user rearranges it. Late stages (Refine, Duet) are user-led — the user makes selections, the agent infers preferences and proactively suggests.

## Connections

- Implements [[gentle slope]] in a temporal dimension — the gentle slope is usually discussed spatially (view → tweak → edit specs → edit models). Staged co-generation adds a temporal slope: the user starts with broad strokes (Define) and progressively commits to specifics (Refine, Duet). Each stage demands more precision but also provides more scaffolding.
- Extends [[intent-decomposition]] — IntentFlow decomposes intent structurally (Goal → Intents → Dimensions) in a single step. Staged co-generation decomposes it *temporally* — the user's intent becomes more structured across stages as the system elicits and the user interacts.
- Contrasts with [[two-step generative UI]] — AG-UI's two-step pattern (agent describes what → generator produces how) is a simplified version of this. The six stages elaborate the "what" side into a multi-phase collaborative process rather than a single agent decision.
- Supports [[meta-intent-elicitation]] — the Empathise stage is precisely where the system should suggest dimensions the user hasn't articulated, expanding their intent rather than just capturing it.

## Practical implementations

- **DuetUI**: each stage has a tailored interface — Define uses simple input + selection, Empathise uses structured questions, Plan presents reorderable cards, Explore shows consolidated search results with controls, Refine offers filtering/sorting interfaces, Duet proactively pushes recommendations.
- **Design thinking / double diamond**: Define+Empathise+Plan mirror the "discover and define" diamond; Explore+Refine+Duet mirror the "develop and deliver" diamond.
- **Wizard patterns** in traditional UI: staged co-generation is a wizard where the steps are dynamically generated and the agent fills in between user inputs.

## Relevance to project

The pipeline currently treats generation as a single pass: prompt → intent → spec → UI. Staged co-generation suggests the upstream portion (prompt → intent → task model) should itself be a multi-step collaborative process, with the system generating intermediate artefacts (questions, plans, options) that the user steers. This aligns with the existing [[semantic-intermediate-layer]] idea but extends it temporally — not just "show the spec before rendering" but "collaboratively build the spec across multiple guided steps."

For the json-render pipeline, this means the intent/task analysis stages shouldn't be a black-box LLM call. They should produce inspectable, manipulable artefacts at each phase — even if the user often just clicks through.

- **Complemented by** [[generation-layer-as-customisation-surface]] — staged co-generation structures *how the conversation unfolds* (temporal phases of collaboration). Generation layers structure *how the artefact assembles* (structural dimensions of the output). They're orthogonal: the staged collaboration could happen within each generation layer. Define+Empathise might occur at the Categories layer, Explore+Refine at the Layout layer, etc.

## Open threads

- **Stage flexibility**: DuetUI's six stages are sequential. Real tasks are messier — users may need to jump back to Plan after Refine, or skip Empathise entirely for simple tasks. How much stage rigidity is helpful (scaffolding) vs. harmful (constraining)?
- **Stage detection**: how does the system know which stage the user is in? DuetUI hard-codes it. A more adaptive system would infer the stage from user behaviour — which is essentially the [[adaptive-autonomy]] problem.
- **Scaling to complex tasks**: the six stages were validated on travel planning and relocation. For professional tasks with domain-specific subtask structures, the stage model may need domain-specific variants.
