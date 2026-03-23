---
type: concept
tags: [data-model, intent, specification, generative-ui]
sources: ["sources/composite-task-meta-model"]
created: 2026-03-23
revised: 2026-03-23
---
A checklist of contextual dimensions for authoring rich Goal entities in the task model. Not a separate pipeline input — the dimensions fold into JTBD-enriched goals within the existing task model. The checklist draws from four analytical traditions (Activity Theory, Cognitive Work Analysis, Jobs to Be Done, Situation Awareness) and scales by relevance: solo casual tasks need only the purpose chain; institutional/collaborative tasks use all six dimensions.

The key insight: JTBD's core formulation — "When [circumstance], I want to [job], so I can [outcome]" — already carries purpose, situation, and outcome expectations. Enriching ReTaMeta's Goal entity with JTBD structure (job statement, circumstance, functional/emotional/social outcomes) means the task model's goal layer *is* the context layer. Four of the six dimensions collapse into JTBD-enriched goals. The remaining two (domain constraints, real-time situation awareness) were already covered by existing pipeline inputs (domain model via MCP, runtime context).

## The dimensions (as goal-authoring checklist)

**1. Purpose chain** (from JTBD) → **folds into Goal hierarchy**
Why does this task exist? What broader job does it serve? The main job → sub-jobs → job steps, each with circumstances and desired outcomes. ReTaMeta's Goal entity with `satisfying` Tasks hangs off the steps as the "how."

Example (nursing): "Ensure safe patient outcomes through this shift" → "Complete medication round on time and without errors" → "Administer 500mg amoxicillin to Patient 3." Each level carries success criteria. The LLM needs the chain because the broader purpose constrains design decisions the task decomposition alone can't.

**2. Domain constraints** (from CWA / Work Domain Analysis) → **already in the pipeline as domain model (MCP)**
Properties of the work domain, independent of who's doing the work. Drug interactions, prescriber authorisation requirements, contraindications. These aren't jobs the user has — they're invariants the UI must enforce. Already served by the domain model input; the checklist just reminds goal authors to verify coverage.

**3. Situation** (from Situation Awareness) → **runtime context, not goal-level**
What's happening now (perceive), what it means (comprehend), what's about to happen (project). This is volatile runtime state — patient vitals trending down, round running behind, pain medication window opening in 20 minutes. Feeds [[cognitive-load-bounded-display]] and [[optimisation-based-ui-adaptation]] at generation/adaptation time, but isn't something you'd encode in a goal hierarchy.

**4. Activity context** (from Activity Theory) → **folds into JTBD circumstance**
What ongoing activity is this task embedded in? What phase? JTBD's "When [circumstance]" naturally captures this: "When I'm midway through my medication round and running behind..." The circumstance attached to the Goal entity provides the activity context.

**5. Social structure** (from Activity Theory) → **folds into JTBD social outcomes + Agent/Role**
Who else is involved? JTBD's social outcome dimension ("so my team knows the round is complete") captures the collaboration purpose. ReTaMeta's Agent/Role entities capture the structural who. Together they cover what the LLM needs without a separate model.

**6. Institutional rules** (from Activity Theory) → **partially folds into JTBD constraints, partially into domain model**
Protocols, regulations, professional standards. Some are expressible as goal constraints ("administer medication according to the five rights"). Others are domain-level invariants ("medication documentation required within 30 minutes") that belong in the domain model or knowledge graph.

## Context

Originally conceived as a fifth pipeline input — a six-dimension model sitting alongside the persistent intent spec, per-session prompt, user context, and domain model. But JTBD's job/circumstance/outcome structure absorbs most of the dimensions into the Goal entity, and the rest were already handled by existing inputs. The architectural simplification: instead of five inputs feeding the pipeline, enrich the Goal entity in the task model with JTBD structure. The checklist remains valuable as a prompt for goal authoring — run through all six dimensions when defining goals for a new domain to make sure nothing's missing.

The "LLM as designer" insight still holds: because the LLM plays the designer role in the pipeline, it can reason with JTBD vocabulary computationally. "When [circumstance], I want to [job], so I can [outcome]" becomes structured context the LLM uses to make design decisions, not just an analytical lens for researchers.

## Connections

- **Enriches** [[goal-task-duality]] — the Goal side of the duality gains JTBD structure: job statement, circumstance, desired outcomes (functional/emotional/social). This gives the LLM the "why" and "within what situation" that raw goal decomposition misses
- **Checklist for** [[task-model]] — when the LLM generates a task model, the six dimensions serve as a completeness check for the goal hierarchy. Missing dimensions → missing context → contextually naive UI
- **Informs** [[pattern-driven transformation]] — the circumstance attached to goals differentiates pattern selection. Same task, different circumstances → different patterns (time-pressured → scannable summary; audit → detailed table)
- **Feeds** [[cognitive-load-bounded-display]] and [[optimisation-based-ui-adaptation]] — the situation dimension (runtime, not goal-level) determines information density budgets
- **Connects to** [[adaptive-autonomy]] — social outcomes and Agent/Role structure shape how autonomous the system should be
- **Connects to** [[knowledge-graph-grounded-generation]] — domain constraints (dimension 2) and institutional rules (dimension 6) are candidates for knowledge-graph storage
- **Surfaces via** [[semantic-intermediate-layer]] — the JTBD-enriched goals should be visible so users can correct misidentified context
- **Scopes** [[cross-task-user-knowledge]] — InterQuest's knowledge items could store preferences with scope defined by job circumstance
- **Relates to** [[context-driven adaptation]] — OADAPT's user context is orthogonal: it's about the user's capabilities and preferences, not the work context. Both feed adaptation but from different angles

## Relevance to project

The checklist feeds goal authoring, not the pipeline directly. When defining goals for a new domain or task:

1. **Purpose chain** — write the JTBD job hierarchy. Main job → sub-jobs → steps. Attach outcomes at each level. This becomes the Goal hierarchy in the task model
2. **Domain constraints** — verify the domain model (MCP) covers the invariants the UI must enforce
3. **Situation** — identify what runtime context the UI needs to adapt to. Wire these as runtime inputs, not goal properties
4. **Activity context** — express as JTBD circumstance on the relevant goals
5. **Social structure** — add Agent/Role entities to the task model where collaboration matters; express social outcomes in goals
6. **Institutional rules** — split between goal constraints (user-facing) and domain model entries (system-enforced)

For solo casual tasks (dinner party), only step 1 matters. For institutional tasks (medication round), all six steps contribute. The checklist scales by relevance.

## Open threads

- How does the LLM output JTBD-enriched goals? The JSON schema for Goals needs fields for job statement, circumstance, and outcome dimensions (functional, emotional, social). Something like: `{ id, jobStatement, circumstance, outcomes: { functional: [], emotional: [], social: [] }, subGoals: [], parameters: [] }`. This extends the ReTaMeta Goal entity
- Should the checklist be embedded in the LLM's system prompt, or provided as a tool/resource the LLM queries when generating goals for unfamiliar domains?
- The boundary between "goal constraint" and "domain model entry" for institutional rules is fuzzy. "Five rights of medication administration" could be either. Practical heuristic: if it's enforceable by the system (validation, required fields), it's domain model. If it's a guiding principle the user should be aware of, it's a goal constraint
