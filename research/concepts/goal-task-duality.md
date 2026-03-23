---
type: concept
tags: [data-model, intent, specification]
sources: ["sources/composite-task-meta-model"]
created: 2026-03-23
---
Goals and tasks are separate entities with a one-to-one `satisfying` relationship. A Goal is a desired state — either a modification or an enquiry. A Task is the activity that achieves it. Goals decompose into sub-goals (what-hierarchy); tasks decompose into subtasks with plans and operators (how-hierarchy). The distinction is universal across all six formalisms ReTaMeta synthesised: GOMS, GOMSL, TKS, GTA/TWO, Diane+H, and CTT all maintain it in some form.

## Context

The pipeline currently has a single "task model" step. But this conflates two things that change independently and serve different audiences. The goal hierarchy captures *what the user wants to accomplish* — this is the representation users should see and edit in the [[semantic-intermediate-layer]]. The task hierarchy captures *how the system will accomplish it* — this is the representation the pattern engine consumes to select components and generate specs.

"Manage my finances" (Goal) might decompose into sub-goals: "Track spending," "Set budgets," "Review investments." These are stable user intentions. The tasks that satisfy them — "Categorise transactions automatically" (Action), "Set monthly limits per category" (Interaction), "Display portfolio performance chart" (Action) — are implementation choices that could change without the goals changing.

The duality also resolves a naming confusion in the vault. [[intent-decomposition]] (IntentFlow) operates at the goal level: Goal → Intents → Intent Dimensions. [[task-model]] operates at the task level: tasks with operators, sequences, data dependencies. These aren't competing descriptions of the same thing — they're adjacent layers. IntentFlow structures what the user wants (goals); the task model structures how to deliver it (tasks).

## Connections

- **Refines** [[task-model]] — separates the what-hierarchy (goals) from the how-hierarchy (tasks), making explicit a distinction the concept note discussed informally
- **Bridges** [[intent-decomposition]] and [[task-model]] — IntentFlow's Goal/Intent/Dimension structure maps to the goal hierarchy; the task model maps to the task hierarchy that satisfies those goals. These are separate pipeline stages, not alternative descriptions
- **Relates to** [[feature-component-duality]] — Kumbang's feature (user-facing capability) vs. component (implementation building block) is the same structural pattern: one face for the user, one for the system, with explicit bridging
- **Connects to** [[hierarchical-design-semantics]] — Park et al.'s Product.Goal field maps to the goal hierarchy; Feature.Function maps to the task hierarchy. The semantic intermediate layer should expose both
- **Enriched by** [[work-context-model]] — the Goal side gains JTBD structure: job statement ("I want to [job]"), circumstance ("When [situation]"), and desired outcomes (functional/emotional/social). This carries the work context *within* the goal hierarchy rather than as a separate pipeline input. The checklist's six dimensions guide goal authoring for completeness
- **Informs** [[three-alignment-gulfs]] — Specification Alignment (does the spec match intent?) is about the goal-hierarchy side. Process Alignment (does the generation match the spec?) is about the task-hierarchy side. The duality maps cleanly onto the two gulfs
- **Relates to** [[task-interface-duality]] — DuetUI's Task → Subtask → Data mirrored by Navigation → Page → Component. Goal-task duality adds depth: the Task side of DuetUI's duality is itself two layers (goal + implementation task)

## Practical implementations

- **User story mapping** (Jeff Patton): the horizontal backbone is goals ("activities" in Patton's terminology); vertical stacks are tasks that accomplish each activity. Two separate hierarchies linked by position
- **OKRs** (Objectives and Key Results): Objectives are goals; Key Results are measurable tasks. The O/KR separation prevents confusing what you want to achieve with how you'll know you achieved it
- **Jobs to Be Done → Solution Space**: JTBD identifies goals ("hire this product to..."); the solution space proposes tasks. Separating these prevents premature solutioning. In the pipeline, JTBD structure (job/circumstance/outcome) enriches the Goal entity — see [[work-context-model]] checklist
- **BDD scenarios** (Given/When/Then): "Given" establishes goal context; "When/Then" describes task execution and verification. The test framework enforces the separation

## Relevance to project

The pipeline's task analysis step should produce **two linked hierarchies**, not one:

1. **Goal hierarchy** — user-facing, stable, inspectable. Shown in the semantic intermediate layer. Users edit goals ("I don't need budget tracking; add debt payoff instead") and the task hierarchy regenerates to satisfy the updated goals. This is the `satisfying` relationship: change a goal, the satisfying tasks must update.

2. **Task hierarchy** — system-facing, implementation-specific. Consumed by the pattern engine. Each task node carries an [[operator-type-triad]] type, data dependencies, and preconditions. The user *can* inspect this (transparency) but typically doesn't need to edit it directly.

The dual hierarchy also clarifies what [[model-evolution|model evolution]] means: when a user changes the UI, are they changing a *goal* (they want something different) or a *task* (they want the same thing done differently)? The answer determines propagation scope. Goal change → regenerate task hierarchy → regenerate spec. Task change → update spec locally, goals unchanged.

For the LLM prompt structure: first generate the JTBD-enriched goal decomposition from the user prompt (job statement + circumstance + outcomes at each level), then for each goal generate the satisfying task with operator types. This two-pass approach improves both inspectability (users review goals first) and reliability (each pass is simpler). The JTBD structure on goals also carries work context — the circumstance field captures activity phase, time pressure, collaboration mode — so the LLM has the contextual information it needs for pattern selection downstream without requiring a separate context input.

## Open threads

- How much of the goal hierarchy should be user-editable vs. system-inferred? IntentFlow suggests the LLM infers both explicit and implicit goals; the user reviews. ReTaMeta's Parameter concept (attached to Goal) provides a mechanism for user-specified constraints on goals
- Should the task hierarchy be regenerable from goals on demand? If so, user edits to the task level are ephemeral — they survive until the next regeneration pass. This is the [[accretive-extensibility]] question at the task level
- The one-to-one mapping between Goal and Task in ReTaMeta is a simplification. In practice, one goal might have multiple satisfying strategies (SelectionRules choosing between Plans). The task model should support alternative plans with selection criteria — "if online, auto-pay; if offline, generate reminder"
