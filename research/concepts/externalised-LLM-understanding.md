---
type: concept
tags: [intent, generative-ui, user-agency, specification]
sources: [sources/neurosync]
created: 2026-03-05
updated: 2026-03-11
---
The LLM's inferred task structure — the subtasks, dependencies, and data flows it plans to implement — should be extracted and rendered as a visible, editable representation *before* it generates output. This is distinct from making the *user's* intent visible ([[intent-decomposition]]) or making *design decisions* visible ([[semantic-intermediate-layer]]). It's making the *model's interpretation of the task* visible — what it "understood" from the prompt, externalised as a graph users can inspect and correct.

## Context

Zhang et al. (UIST '25) coined the term "LLM understanding" for this: the tasks and their relationships implicitly encoded in the code an LLM is about to generate. Traditional paradigms hide this understanding — the user submits a prompt, the LLM generates code, and the user only discovers misalignment after the fact. NeuroSync's "direct intent–task matching" flips this: extract the understanding first, show it to the user, let them fix it, *then* generate.

The representation is a directed graph where nodes are subtasks (e.g., "initialise crawler," "parse HTML," "extract images") and edges are dependencies or data flows. This sits at a different abstraction level from code (more readable) and from prompts (more structured). The graph *is* the intermediate representation the LLM would use internally — just made external.

The key empirical finding: users who could see and edit the task graph completed tasks in 1–2 iterations instead of 7–8 with prompt-only interaction. The graph didn't just improve transparency — it changed the interaction paradigm from sequential misalignment resolution (fix one thing, break another) to parallel inspection (see all potential misalignments at once, fix them before generation).

## Connections

- **Motivated by** [[bidirectional-ambiguity]] — externalising the understanding is the direct solution to the LLM-to-user direction of ambiguity.
- **Complements** [[intent-decomposition]] — IntentFlow externalises the *user's* intent structure (Goal → Intents → Dimensions). NeuroSync externalises the *LLM's* task structure (subtasks → dependencies → mappings). Together they make both sides of the conversation visible. The mapping between them reveals misalignment.
- **Complements** [[semantic-intermediate-layer]] — Park et al. externalise *design decisions* (Product → Design System → Feature → Component). NeuroSync externalises *task logic* (subtasks → dependencies). Different granularity, different pipeline stage.
- **Extends** [[parallel-state-display]] — Viégas & Wattenberg argued for surfacing the system's internal model continuously. NeuroSync is a *pre-generation* version: surface the model's task understanding once, then refine across turns via incremental graph updates.
- **Managed by** [[intent-aware-simplification]] — once the graph exists, its complexity must be managed. The simplification algorithm focuses the graph on what's relevant to the user's current intent, collapsing irrelevant branches into summary supernodes.
- **Relates to** [[augmented-semantics]] — augmented semantics extract what the AI *did* from generated output. Externalised understanding shows what the AI *plans to do*. Pre-hoc vs. post-hoc transparency.
- **Tension with** [[pattern-driven transformation]] — in a pattern-driven pipeline, the LLM's "understanding" isn't a freeform task graph but a structured pattern selection. Externalising it would mean showing "I selected the Search pattern with these parameters" rather than "here are the subtasks I inferred."
- **Connects to** [[knowledge-graph-grounded-generation]] — NeuroSync's understanding graph is structurally similar to a knowledge graph. The difference: knowledge graphs are *input*; the understanding graph is *output* (structure inferred from the prompt).
- **Relates to** [[software-as-data-structure]] — Varv makes the *program* inspectable by making it data. NeuroSync makes the *plan for the program* inspectable by making it a graph. Same principle, different scope.
- **Structurally grounded by** [[task-graph-decomposition]] — NeuroSync's editable task graph is essentially a task graph decomposition in the ReTaMeta sense: nodes are tasks with types and dependencies, edges are data flows and enablement relationships. The MBUID tradition formalised this structure decades ago; NeuroSync rediscovered it as a transparency mechanism
- **Cautioned by** [[process-induced-overreliance]] — an impressive-looking task graph might induce overreliance on the LLM's plan. This is mitigated by the graph being *pre-generation* (for steering, not verification) but remains a risk. Temporal design principle: process-oriented transparency before generation, outcome-oriented transparency after.

## Practical implementations

- **NeuroSync** (Zhang et al., UIST '25) — the primary implementation. Three-panel interface: conversation, understanding graph, intent-task mapping view.
- **WaitGPT** (Xie et al.) — visualises data analysis tasks as graphs during LLM wait time. Similar concept, but read-only and post-generation.
- **Promptchainer** (Wu et al.) — visual programming of LLM chains as node-link diagrams. Editable, but represents the *user's design* not the *LLM's interpretation*.
- **GoT (Graph of Thoughts)** (Besta et al.) — graph representations for LLM reasoning. Internal, not externalised to users.
- **IDE debuggers** (call stack, variable inspector) — externalise runtime state for developers.

## Relevance to project

For the genUI pipeline, this suggests a third intermediate layer alongside intent decomposition and semantic specification. After the LLM analyses a user prompt, it could produce:

1. **Intent decomposition** (IntentFlow) — "here's what you want" (user-facing)
2. **Task understanding graph** (NeuroSync) — "here's what I'll build" (model-facing, externalised)
3. **Semantic specification** (Park et al.) — "here's how it'll look" (design-facing)

The task understanding graph sits between intent decomposition and semantic specification. It answers questions like: "I asked for an event planner — does the LLM understand it needs venue search, guest management, AND timeline coordination, or did it miss the timeline part?"

For json-render: the understanding graph could map to the spec structure. Each node → a section of the json-render spec. Editing the graph directly modifies the spec's architecture before it's generated.

## Open threads

- How does the task understanding graph relate to JELLY's task-driven data model? JELLY's model is the *data structure*; the understanding graph is the *functional structure*. For UI generation, you likely need both.
- Can the graph format generalise from code generation to UI generation? Code tasks have clear subtask boundaries; UI tasks might have fuzzier boundaries.
- The two-modality editing (graph-level NL modification + node-level direct manipulation) mirrors the [[gentle slope]] principle. Could this dual-modality pattern apply to other pipeline stages?
- Latency: 10–15 seconds to generate the understanding graph is acceptable for code generation. Distillation approach helps for real-time UI generation.
- **Temporal extension**: [[intent-specification-as-common-ground]] externalises the *accumulated* understanding across all tasks — the long-term memory version.
