---
type: concept
tags: [user-agency, data-model, intent, model-evolution]
sources: ["[[sources/interquest-mixed-initiative-user-modelling|InterQuest (Mei et al., UIST 2025)]]"]
created: 2026-03-06
---
A user's preferences aren't per-session or per-task — they're persistent attributes that span across tasks and domains, with dynamic, non-hierarchical scope boundaries. "User cares about functionality details for electronics" applies across all electronics searches. "User is concerned about materials in products that contact skin" cuts across product categories entirely. These cross-task preferences, when captured and maintained, dramatically improve a system's ability to infer what a user actually wants from ambiguous requests.

## Context

InterQuest's formative study (N=18, Wizard-of-Oz) found that human wizards consistently used persistent cross-task knowledge as an intermediate reasoning step: task-specific observation → inferred cross-task preference → predicted current-task interest. The reasoning chain "user previously focused on DPI sensitivity for a smartwatch → user cares about monitoring metrics for electronics → user probably cares about screen resolution for this keyboard" shows knowledge abstraction and transfer.

Three characteristics distinguish this from static user profiles:

1. **Non-hierarchical scope**: preferences don't fit neat category trees. "Transport-fragile" and "products that contact skin" are attribute-based scopes that cut across any product taxonomy. The preference structure is a fuzzy graph, not a tree (Figure 2 in the paper).

2. **Dynamic boundaries**: the scope of a preference adjusts as more data arrives. "Cares about hygiene" might start as restaurant-specific, expand to "all food" after a few tasks, then contract to "restaurants serving raw food" after a corrective question.

3. **Confidence-weighted**: each piece of knowledge carries content confidence (is this preference accurate?) and scope confidence (does it apply here?). Both evolve with evidence. InterQuest computes these via structured LLM self-evaluation chains — task coverage, evidence strength, category consistency.

The user study validated the representation: 87.50% accuracy for cross-task knowledge modelling vs. 57.63% for a dynamic-but-flat baseline. The structured knowledge representation (content + scope + confidence) with proactive refinement significantly outperformed task-history-as-context approaches.

## Connections

- **Extends** [[inferred-user-model]] — Viégas & Wattenberg argue the system's inferred beliefs about the user should be surfaced. Cross-task user knowledge provides a *concrete representation* for those beliefs: structured natural-language knowledge items with confidence scores and scope boundaries, not just implicit features in a neural network. This makes the inferred model inspectable by design.
- **Operationalises** [[context-driven adaptation]] for preferences — OADAPT handles accessibility via deterministic rules from a static profile. Cross-task knowledge handles *preferences* via a dynamic, evolving knowledge base. The user doesn't declare "I like detailed specs" — the system infers it from behaviour and confirms through [[uncertainty-driven-elicitation]].
- **Enables better** [[ai-attribute-reformulation]] — knowing that a user persistently cares about "functionality details" means the LLM can reformulate product attributes to emphasise specs and performance rather than aesthetics. The cross-task knowledge is directly usable as context for per-item attribute transformation.
- **Extends** [[usage-as-annotation]] — Ye et al.'s concept says normal user actions implicitly train the system. Cross-task knowledge is what the system *builds* from those actions: structured preference knowledge, not just raw interaction logs.
- **Complements** [[intent-decomposition]] — IntentFlow decomposes the current task's intent. Cross-task knowledge provides persistent context that *enriches* intent decomposition: "this user always cares about accessibility features" should surface in the decomposition even if the current prompt doesn't mention it.
- **Connects to** [[cognitive-engagement-for-reliance]] — users who can see and correct their cross-task knowledge profile are engaging analytically with the system's model of them, building appropriate reliance.

## Practical implementations

- **Amazon's purchase-based recommendations** — "customers who bought X also bought Y" is cross-task knowledge at the population level. Per-user purchase history as preference signal.
- **Spotify's taste profiles** — persistent genre/mood/tempo preferences inferred from listening history, used to personalise discovery recommendations across different search contexts.
- **LACE** (Radlinski et al., 2023) — editable user profiles as human-readable concepts that influence recommendation outcomes. Users can directly manipulate the preference model.
- **Google Knowledge Graph personalisation** — persistent user interests inferred from search history, applied across search domains.

## Relevance to project

The generative UI pipeline needs persistent user context, not just per-session intent. Currently the pipeline takes user prompt + domain model → generated UI. Cross-task knowledge adds a third input: what we already know about this user's preferences from previous interactions.

Concretely:
- After a few generation sessions, the system should have knowledge items like: "user prefers dense table layouts over cards," "user always wants export functionality," "user cares about mobile responsiveness." These should feed into pattern selection and attribute configuration without the user re-specifying them each time.
- The knowledge representation (content + scope + confidence in natural language) could be stored as a JSON document alongside the user profile, exposed via the [[parallel-state-display]] panel for user inspection and correction.
- The dynamic scope mechanism is particularly relevant: a preference discovered in one domain ("likes drill-down navigation") might or might not apply in another. The system should apply it tentatively and confirm through [[uncertainty-driven-elicitation]] when the scope is uncertain.

The non-hierarchical finding challenges any attempt to model user preferences as a taxonomy. The preference structure should be a flat or graph-based knowledge store (like InterQuest's natural-language items with scope tags), not a tree of categories.

- **Stored in** [[intent-specification-as-common-ground]] — cross-task knowledge needs a persistent, human-readable home. Intent specifications (CLAUDE.md, cursor rules) are exactly this: documents the user can inspect and correct that persist across sessions. The knowledge items InterQuest discovers could be formatted as intent specification entries. SemanticCommit's conflict detection then applies when new knowledge potentially contradicts existing items.
- **Updated via** [[impact-analysis-before-generation]] — when the system infers a new cross-task preference that conflicts with an existing one (e.g., user now prefers cards after previously preferring tables), impact analysis should surface this conflict before updating the knowledge store.

## Open threads

- InterQuest was validated for information-seeking search (products, restaurants, tours). Transfer to UI generation preferences is untested. UI preferences might be more domain-independent (layout preferences, interaction style) or more domain-specific (specific component preferences for data types). The scope dynamics could be very different.
- How does cross-task knowledge interact with the declared user profile ([[context-driven adaptation]])? If the user declares "I'm an expert" but cross-task knowledge suggests novice-like behaviour (always uses simple views, never uses keyboard shortcuts), which takes priority?
- Privacy implications: persistent cross-task knowledge is a detailed user model that could be sensitive. InterQuest users raised concerns about data breaches (10/18), excessive inference (5/18), and permanent retention (11/18). For the pipeline, user knowledge should be user-owned, locally stored, and deletable.
- Cold-start: how many interactions before cross-task knowledge becomes useful? InterQuest used a 6-question survey for initialisation. For UI generation, could the initial session explicitly ask about preferences ("do you prefer dense or spacious layouts?") to bootstrap the knowledge base?
