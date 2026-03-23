---
type: concept
tags: [user-agency, intent, model-evolution, data-model]
sources: ["[[sources/semantic-commit|Semantic Commit (Vaithilingam et al., UIST 2025)]]"]
created: 2026-03-06
---
Human-readable documents that accumulate user intent — CLAUDE.md files, cursor rules, game design documents, requirements lists — are emerging as the primary coordination mechanism between humans and AI agents. These **intent specifications** aren't just configuration; they're evolving representations of common ground that the AI reads to ground its decisions and the human inspects to verify the AI's understanding. The key property: they're comprehensible and editable by the human, not just machine-readable.

## Context

The paradigm is already widespread. Cursor users maintain "cursor rules" — markdown files ranging from "never use apologies" to "use vectorized operations in pandas and numpy for improved performance." Anthropic's Claude Code uses CLAUDE.md files for project-level and global-level directives. OpenAI's ChatGPT has a structured memory store. Game designers maintain game design documents (GDDs) that AI agents implement. In all cases, the document serves three functions simultaneously: it grounds the AI's behaviour, surfaces the AI's assumptions for human review, and acts as an intermediate representation that both sides can inspect and edit.

Vaithilingam et al. adapt the term from software engineering's "requirements specifications" but broaden it: intent specifications may include not just what to build but who the user is, what they care about, what the AI should assume — anything that accelerates establishment of common ground. The critical distinction from a general memory store: intent specifications are meant to be *reviewable, concise, and digestible*. They're curated, not comprehensive.

The hard problem is **integration**: as the user interacts with the AI over time, new information needs to be committed to the intent specification. This creates semantic conflicts — new info may contradict, refine, or render obsolete existing items. Simple methods (append, regenerate entire document, vector store) fail at scale because detecting semantic conflicts requires multi-hop reasoning across items that may be conceptually related but textually distant.

## Connections

- **Persists** [[cross-task-user-knowledge]] — InterQuest's structured knowledge items (content + scope + confidence) describe *what* to store about the user. Intent specifications describe *where and how* to store it: a human-readable document the user can inspect and correct. An intent specification could *be* the persistent store for cross-task knowledge, formatted for human review.
- **Extends** [[semantic-intermediate-layer]] — Park et al.'s semantic layer is a per-session intermediate between user prompt and generated output. Intent specifications extend this to a *persistent* intermediate: they accumulate across sessions, grounding future generation. The semantic layer is a snapshot; the intent specification is the film.
- **Extends** [[inferred-user-model]] — Viégas & Wattenberg argue the AI's beliefs about the user should be surfaced. Intent specifications *are* that surface — a document the user can inspect to see what the AI "knows" about them. The difference: the inferred model is implicit and volatile; the intent specification is explicit and persistent.
- **Operationalises** [[externalised-LLM-understanding]] — NeuroSync externalises the LLM's understanding of a single task. Intent specifications externalise its accumulated understanding across all tasks — the long-term memory version of the same principle.
- **Enables** [[cognitive-engagement-for-reliance]] — reviewing and correcting an intent specification is active analytical engagement with the AI's model, exactly the kind of interaction Raees et al. argue calibrates appropriate reliance.
- **Supports** [[gentle slope]] — intent specifications create an entry point below even intent decomposition on the slope: the user can correct persistent assumptions ("I'm not a day trader, I'm a student") without engaging with any generation-time interface.
- **Tension with** [[design-time-vs-use-time]] — intent specifications blur the boundary. They're created at use-time (during interaction) but function at design-time (they configure the AI before the next generation). They're user-authored design documents that accumulate from runtime interaction.

## Practical implementations

- **Cursor Rules** — project-specific (.cursorrules) and global markdown files that ground the AI IDE's behaviour. Community-contributed via awesome-cursorrules repository.
- **CLAUDE.md** (Anthropic) — project- and global-level directives for Claude Code. Users create memories as bullet points, referenced across sessions.
- **ChatGPT Memory** (OpenAI) — structured memory store, recently expanded with "Canvas" for direct editing. Windsurf announced auto-generated memories from interaction.
- **Game Design Documents** — standardise characters, mechanics, world rules across a team. Increasingly used by AI agents that implement the game.
- **Memolet** (Yen & Zhao, UIST '24) — reifying user-AI conversational memories as editable artefacts.
- **Requirements specifications** (software engineering) — the original intent specification. Leveson (1997) coined the term in SE context; Vaithilingam et al. broaden it to informal human-AI coordination documents.

## Relevance to project

For the generative UI pipeline, intent specifications matter at two levels:

1. **As persistent pipeline input**: the pipeline currently takes user prompt + domain model → generated UI. An intent specification adds a third, persistent input: accumulated preferences, constraints, and context from previous sessions. This feeds into every stage — intent decomposition (pre-populated dimensions), pattern selection (known preferences for layout style), attribute configuration (preferred data formats), adaptation rules (accessibility needs).

2. **As the integration challenge**: when the pipeline generates a new UI and the user modifies it, those modifications are implicit intent updates ("I prefer tables over cards for this data type"). The pipeline needs a mechanism to *commit* these preferences back to the persistent intent specification — which means the semantic conflict detection problem applies. "User preferred cards last week but now switched to tables" — is this a conflict (contradictory preferences) or an evolution (preference changed)?

The SemanticCommit architecture (KG-based retrieval + conflict classification + local/global resolution) could be the mechanism for maintaining the persistent user model in the pipeline. Each user modification to a generated UI is a potential "commit" to the intent specification — and each commit needs conflict detection.

## Open threads

- What's the right granularity for intent specification items? Cursor rules range from single commands ("never apologise") to paragraph-length policies. For UI generation preferences, is "I prefer dense tables" the right granularity, or should it be broken into component preferences ("table: compact rows, visible headers, sortable columns")?
- How do intent specifications scale? The paper's user study used 30-item lists. Real cursor rule files can grow to hundreds of items. At what point does the specification become unmanageable, and what structural mechanisms help (folding, categorisation, importance ranking)?
- Who authors the intent specification — user, AI, or both? Cursor rules are human-authored. ChatGPT memories are AI-authored. SemanticCommit suggests a mixed-initiative model where the AI proposes and the human reviews. For the genUI pipeline, modifications to generated UIs could be auto-detected as candidate intent updates, surfaced for review.
- Privacy and portability: if the intent specification contains detailed user preferences and context, it's sensitive data. Should it be portable between AI systems? Encrypted? User-deletable per-item?
