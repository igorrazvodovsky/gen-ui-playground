---
type: concept
tags: [data-model, intent, specification, model-evolution]
sources: ["sources/model-based-UI-with-patterns", "sources/lit-malleable-software", "sources/composite-task-meta-model"]
created: 2026-02-24
---
A representation of what the user wants to accomplish — the goals, sub-tasks, sequencing constraints, and domain objects involved in a user's activity. Not the data shape (that's the [[domain-data-model]]), and not the UI structure (that comes later). The task model captures *why* someone is using the system and *what operations* they need to perform.

**Unified primitive vocabulary** (from ReTaMeta — Goschnick et al., 2010, synthesising GOMS, GOMSL, TKS, GTA/TWO, Diane+H, CTT): the task model's schema should express these entities and relationships:

- **Goal** — desired state change or enquiry. Decomposes into sub-goals. Has Parameters (named constraints the user specifies). **JTBD-enriched**: each Goal carries a job statement, circumstance, and desired outcomes (functional/emotional/social) — see [[work-context-model]] checklist for the authoring dimensions. See [[goal-task-duality]]
- **Task** — activity that satisfies a goal. One-to-one with Goal via `satisfying`. Contains Plans (methods to achieve the goal) with SelectionRules (OR/AND/XOR) for choosing between alternative plans
- **Operator** — leaf-level action within a task, typed as Action (system), Interaction (user+system), or Manual (user only). See [[operator-type-triad]]. Determines whether a UI component is needed
- **Object** — domain entity the task manipulates. Has ontological structure (self-referencing hierarchy). Linked to tasks via `manipulates`. Bridges to [[domain-data-model]]
- **Agent/Role** — who performs the task. Agents play hierarchical Roles; Roles are responsible for task sets. Relevant for multi-user/collaborative UIs
- **Event** — external trigger that fires a task hierarchy via Precondition. Enables reactive task activation
- **Precondition/LinkCondition** — conditions gating task execution. Preconditions trigger top-level tasks (from Events or Object state changes). LinkConditions gate transitions between sequential subtasks
- **RelatedTask** — decomposition structure allowing graph relationships (not just trees). See [[task-graph-decomposition]]

## Context

The task model is the first structured artefact the pipeline produces from unstructured user intent. "Plan a dinner party" becomes: invite guests (select from contacts, send invitations), plan menu (browse recipes, check dietary constraints, create shopping list), coordinate timing (set date, sequence prep tasks). Each of these is a task with inputs, outputs, preconditions, and relationships to domain objects.

In Seffah & Gaffar's [[model hierarchy]], the task model sits at the top — it's the most abstract, most user-centric layer. Everything downstream (dialog sequencing, presentation structure, layout) derives from it. JELLY collapses the task model and [[domain-data-model]] into a single "task-driven data model," which is pragmatic but loses the distinction between *what the user does* (task) and *what the data looks like* (domain).

The distinction matters because they change independently. The same domain model (recipes with ingredients, prep times, serving sizes) supports different task models (meal planning vs. recipe browsing vs. grocery shopping). And the same task model (search → filter → select → act) applies across wildly different domains. Keeping them separate lets you reuse both.

## Connections

- **Top layer of** [[model hierarchy]] — the task model is layer one; downstream transformations produce dialog, presentation, and layout models
- **Drives** [[pattern-driven transformation]] — task patterns are selected based on the task model. "Search task" → Search pattern → Form + Results + Filters. The task model is the input the LLM analyses to choose patterns
- **Distinct from** [[domain-data-model]] — task model = what the user does; domain data model = what the data looks like. JELLY merges them; Seffah separates them; the pipeline probably needs both as distinct artefacts
- **Fed by** [[intent-decomposition]] — IntentFlow's Goal level maps to task identification; Intents map to sub-tasks and requirements. Intent decomposition is the user-facing mechanism for *constructing* the task model
- **Informed by** [[hierarchical-design-semantics]] — Park et al.'s Product.Goal and Feature.Function fields provide the semantic vocabulary that maps onto task model elements
- **Constrains** [[abstraction-to-concrete mapping]] — the task model determines *which* mapping paths are valid. A "comparison task" implies side-by-side views; a "creation task" implies forms
- **Relates to** [[concept-as-composition-unit]] — Déjà Vu's concept selection step ("build an event planner" → select Event, Schedule, Group concepts) is essentially task-model-to-concept mapping. The task model determines which concepts are needed
- **Contrasts with** [[ontology-driven UI generation]] — ontology-driven approaches start from the domain model (OWL classes and properties), not the task model. They produce structurally correct UIs but miss task-level intent (the same data displayed differently for browsing vs. editing)
- **Decomposed by** [[goal-task-duality]] — the task model is actually two linked hierarchies: goals (what) and tasks (how). ReTaMeta makes this separation explicit across all six source formalisms
- **Typed by** [[operator-type-triad]] — each leaf-level operator is Action, Interaction, or Manual. This type directly determines whether a UI component is needed and what class of component
- **Structured by** [[task-graph-decomposition]] — tasks form graphs, not just trees. Shared subtasks, parallel execution, and link conditions require graph relationships
- **Goals enriched by** [[work-context-model]] — the checklist's six dimensions guide authoring of JTBD-enriched Goals. Purpose chain becomes the goal hierarchy; circumstance carries activity context and situation; outcomes carry success criteria. Domain constraints and institutional rules live in the domain model rather than the goal layer

## Practical implementations

- **User story mapping** (Jeff Patton) — user activities → tasks → sub-tasks, arranged as a two-dimensional map. The horizontal axis is the task sequence; vertical axis is detail/priority. This is task modelling for product teams.
- **GOMS / ConcurTaskTrees / Diane+H** — formal task analysis methods from HCI. ReTaMeta (2010) synthesised six of these into a unified vocabulary. CTT is closest to the pipeline's needs (typed tasks, temporal operators, object model); Diane+H adds graph decomposition and link conditions. GOMS is primarily evaluative (predicting task time), less useful for generation.
- **Jobs to Be Done** (Christensen) — "what job is the user hiring this product for?" is a task model expressed in business language. In the pipeline, JTBD structure enriches the Goal entity: job statement + circumstance + outcomes carry work context within the goal hierarchy rather than as a separate input.
- **Redux action types** — `ADD_TODO`, `TOGGLE_TODO`, `SET_FILTER` are task model operations encoded as dispatchable actions.
- **GraphQL mutations** — named operations (`createUser`, `updatePost`, `deleteComment`) that map directly to task model verbs.

## Relevance to project

The task model is where the LLM adds the most value in the upstream pipeline. Converting "plan a dinner party" into a structured task decomposition requires world knowledge, common-sense reasoning, and the ability to infer implicit requirements — exactly what LLMs are good at. Downstream steps (data model → component selection → rendering) can be increasingly rule-driven.

For the pipeline: the task model should be the first explicit artefact after [[intent-decomposition]]. The LLM takes intent dimensions and produces a task structure: named tasks, their sequencing, their inputs/outputs, and their relationship to domain entities. This task structure then drives both [[domain-data-model]] generation (what entities and attributes do these tasks require?) and [[pattern-driven transformation]] (which UI patterns implement these tasks?).

The open question from [[model hierarchy]] — "where does the data model fit?" — resolves cleanly when you separate these two concepts. The task model comes first (what to do), then drives domain data model generation (what data supports those tasks), then both feed into UI generation.

## Open threads

- Can the LLM produce task models that are reusable across domains? A "search → filter → select → detail" task model works for recipes, apartments, job listings. If task models are domain-independent, they could become a library similar to the [[concept-catalog]].
- How granular should task decomposition be? Too coarse ("plan dinner") and patterns can't match. Too fine ("click the date field") and you've recreated ConcurTaskTrees' formalism problem. ReTaMeta suggests the Operator level (Action/Interaction/Manual) is the right leaf granularity — fine enough to determine UI needs, coarse enough to avoid keystroke-level modelling.
- ~~Should the task model include sequencing constraints (task A before task B), or just enumerate tasks and let the dialog model handle sequencing? Seffah says sequencing is the dialog model's job; JELLY doesn't distinguish.~~ **Resolved by ReTaMeta**: yes, include them. LinkConditions between sequential tasks and Preconditions triggering task activation are core primitives across all six formalisms. They're the task model's representation of the state management layer. Without them, the dialog model has to reconstruct dependencies from scratch.
- How does the task model interact with [[context-driven adaptation]]? An expert's task model might skip steps a novice needs (progressive disclosure at the task level, not just the UI level).
- **New (from ReTaMeta)**: what's the right JSON schema for expressing the unified primitives? The LLM needs to output something concrete. Candidate: `{ goals: [{ id, name, subGoals, parameters }], tasks: [{ id, satisfies, type, relatedTasks, operators, preconditions, objects }] }`. The dual goal/task structure and graph relationships need to be expressible without requiring the LLM to learn a new notation.
- **New**: ReTaMeta's Agent/Role entities matter for collaborative UIs but add complexity for single-user tasks. Should the schema always include them (simpler LLM prompt, consistent structure) or only when the task involves multiple actors (leaner output for common cases)?
- **New (from JTBD enrichment)**: what JSON schema fields should the Goal entity carry for JTBD structure? Candidate: `{ id, jobStatement, circumstance, outcomes: { functional: [], emotional: [], social: [] }, subGoals: [], parameters: [] }`. The circumstance field is where activity context, time pressure, and collaboration mode live. How terse can the LLM be for casual goals ("plan dinner") vs. institutional goals ("complete medication round during night shift with 2 nurses covering 16 patients")?
