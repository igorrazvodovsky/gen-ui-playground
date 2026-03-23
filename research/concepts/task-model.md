---
type: concept
tags: [data-model, intent, specification, model-evolution]
sources: ["sources/model-based-UI-with-patterns", "sources/lit-malleable-software"]
created: 2026-02-24
---
A representation of what the user wants to accomplish — the goals, sub-tasks, sequencing constraints, and domain objects involved in a user's activity. Not the data shape (that's the [[domain-data-model]]), and not the UI structure (that comes later). The task model captures *why* someone is using the system and *what operations* they need to perform.

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

## Practical implementations

- **User story mapping** (Jeff Patton) — user activities → tasks → sub-tasks, arranged as a two-dimensional map. The horizontal axis is the task sequence; vertical axis is detail/priority. This is task modelling for product teams.
- **GOMS / ConcurTaskTrees** — formal task analysis methods from HCI. Hierarchical task decomposition with sequencing operators (sequence, choice, interleaving, parallelism).
- **Jobs to Be Done** (Christensen) — "what job is the user hiring this product for?" is a task model expressed in business language.
- **Redux action types** — `ADD_TODO`, `TOGGLE_TODO`, `SET_FILTER` are task model operations encoded as dispatchable actions.
- **GraphQL mutations** — named operations (`createUser`, `updatePost`, `deleteComment`) that map directly to task model verbs.

## Relevance to project

The task model is where the LLM adds the most value in the upstream pipeline. Converting "plan a dinner party" into a structured task decomposition requires world knowledge, common-sense reasoning, and the ability to infer implicit requirements — exactly what LLMs are good at. Downstream steps (data model → component selection → rendering) can be increasingly rule-driven.

For the pipeline: the task model should be the first explicit artefact after [[intent-decomposition]]. The LLM takes intent dimensions and produces a task structure: named tasks, their sequencing, their inputs/outputs, and their relationship to domain entities. This task structure then drives both [[domain-data-model]] generation (what entities and attributes do these tasks require?) and [[pattern-driven transformation]] (which UI patterns implement these tasks?).

The open question from [[model hierarchy]] — "where does the data model fit?" — resolves cleanly when you separate these two concepts. The task model comes first (what to do), then drives domain data model generation (what data supports those tasks), then both feed into UI generation.

## Open threads

- Can the LLM produce task models that are reusable across domains? A "search → filter → select → detail" task model works for recipes, apartments, job listings. If task models are domain-independent, they could become a library similar to the [[concept-catalog]].
- How granular should task decomposition be? Too coarse ("plan dinner") and patterns can't match. Too fine ("click the date field") and you've recreated ConcurTaskTrees' formalism problem.
- Should the task model include sequencing constraints (task A before task B), or just enumerate tasks and let the dialog model handle sequencing? Seffah says sequencing is the dialog model's job; JELLY doesn't distinguish.
- How does the task model interact with [[context-driven adaptation]]? An expert's task model might skip steps a novice needs (progressive disclosure at the task level, not just the UI level).
