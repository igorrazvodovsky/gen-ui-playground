---
title: "InterQuest: A Mixed-Initiative Framework for Dynamic User Interest Modeling in Conversational Search"
authors: [Yu Mei, Yuanxi Wang, Shiyi Wang, Qingyang Wan, Zhuojun Li, Chun Yu, Weinan Shi, Yuanchun Shi]
year: 2025
venue: "UIST '25"
type: literature
status: processed
---
## Core idea

Users' information preferences are persistent and cross-task ("User-Centric Knowledge"), not just per-session. These preferences have non-hierarchical, overlapping scope boundaries and inherent uncertainty. InterQuest builds a dynamic user knowledge model through two strategies: (1) inferring and refining cross-task knowledge from task-specific interactions, and (2) proactively asking users uncertainty-targeted questions using Shannon entropy to maximise information gain per question.

## Key concepts

- **[[cross-task-user-knowledge]]** — persistent preference attributes that span tasks and domains, with dynamic, non-hierarchical scope (global, category-specific, attribute-based). Represented as content + scope + confidence. E.g., "user cares about functionality details for electronics" (category scope) or "user is concerned about materials in products that contact skin" (attribute scope).
- **[[uncertainty-driven-elicitation]]** — using Shannon entropy to select which user knowledge uncertainties to resolve through proactive questioning. Three uncertainty types: cold-start (insufficient data), content (uncertain whether inferred preference is accurate), scope (uncertain where preference applies). Prioritise questions with highest entropy (p ≈ 0.5), not lowest confidence.
- **Non-hierarchical knowledge boundaries** — formative study finding (N=18) that user preference structures are fluid and overlapping, not tree-structured. Categories partially overlap ("transport-fragile" products cross multiple product categories). Fixed hierarchical models miss this.

## Technical approach

**System architecture** (Figure 3): four components — Intent Manager (parses queries, infers intents using User-Centric Knowledge), Executor (web operations, information extraction), User Model Manager (knowledge storage, inference, refinement), Proactive Question Manager (uncertainty detection, target selection, question generation).

**Dynamic User Knowledge Modeling** (Figure 4):
- *Initiation*: cold-start survey (multiple-choice questions about search goals) → initial knowledge inference
- *Interaction*: each new task triggers two operations — (1) update existing knowledge (match new task data to existing knowledge, adjust confidence), (2) generate new knowledge (semantic similarity to find related tasks, infer new cross-task preferences, adopt if overlap > 0.6)
- Knowledge represented in natural language with content, scope, and confidence scores
- Confidence computed via structured self-evaluation: task coverage, evidence strength, knowledge specificity (for content); task coverage, category consistency (for scope)

**Uncertainty-Driven Questioning** (Figure 5):
- Candidate selection: knowledge whose scope covers current task AND content is applicable
- Target selection: compute p = C_scope × C_content, then entropy = −p log₂(p) − (1−p) log₂(1−p). Select candidate with highest entropy
- Key insight: max entropy is at p = 0.5 (maximum uncertainty), not at lowest confidence. Extremely low-confidence knowledge (p ≈ 0) isn't worth asking about — it's probably invalid
- Question generation: LLM generates closed-ended multiple-choice questions with reasoning shown. Users can provide additional details
- Knowledge refinement: parse user answer, update or correct the target knowledge

**Implementation**: Chrome extension with sidebar. GPT-4o (temp 0.5 for questioning, 0.3 for other tasks). text-embedding-3-small for semantic similarity.

**User study** (N=18, within-subjects, three task domains: products, restaurants, tour groups):
- InterQuest vs. Baseline 1 (LLM recommender, rule-based QA) vs. Baseline 2 (Dynamic User Knowledge Modeling, rule-based QA)
- Results: InterQuest significantly higher on confidence, insightfulness, relevance (all p < 0.01 vs. both baselines after Bonferroni correction)
- Rejection count significantly lower (M=0.46 vs. 0.74/1.16), decision time significantly reduced
- User-Centric Knowledge accuracy: 87.50% (InterQuest) vs. 57.63% (Baseline 2). Pairwise t-test p < 0.01
- Question experience: naturalness and transparency significantly higher than baseline (p < 0.01). 16/18 found question frequency acceptable. Average 9.60% of time on questions.
- Qualitative: "it felt like it was progressively getting to know me" (P10). 12/18 preferred indirect questions over direct ones for nuanced responses.

## Extracted concepts

- [[cross-task-user-knowledge]] (new)
- [[uncertainty-driven-elicitation]] (new)
- [[inferred-user-model]] (updated — concrete representation)
- [[meta-intent-elicitation]] (updated — complementary mechanism)
- [[context-driven adaptation]] (updated — dynamic scope challenges static profiles)
