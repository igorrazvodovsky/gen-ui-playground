---
type: concept
tags: [data-model, specification, generative-ui, intent]
sources: [interaction-augmented-instruction]
created: 2026-03-06
---
The augmented instruction (Aug) is the composite, machine-readable instruction that GenAI actually receives and executes. It's assembled from up to three sources: text prompts (T → Aug), interaction-derived information (I → Aug), and artifact-derived context (A → Aug). Aug is *not* something the human or AI writes directly — it's constructed by the system from the combination of what the user typed, what they clicked/selected/brushed, and what artifacts they referenced. The only valid execution path is Aug → G; Aug does not itself perform edits (no Aug → A).

## Context

Before the IAI model, most pipeline descriptions treated "the prompt" as the input to GenAI, sometimes mentioning "context" as a secondary input. This obscures a critical distinction: what the user *says* (T) is not what the model *receives* (Aug). Interactions encode non-linguistic constraints (pixel masks, coordinate ranges, selected table rows, context snippets) that get normalised, structured, and attached to the prompt in a machine-readable form. Viewing Aug as an explicit entity makes paradigm comparisons tractable: different tools differ chiefly in *how they construct Aug* — which combinations of T, I, and A feed into it.

## Connections

- Is-part-of [[semantic-intermediate-layer]] — Aug functions as a semantic intermediate layer on the *input* side. The semantic intermediate layer (Park et al.) sits between user intent and AI output on the *output* side. Together they bookend the LLM: inspectable input representation (Aug) → LLM → inspectable output representation (augmented semantics).
- Extends [[intent-decomposition]] — IntentFlow decomposes the user's intent into Goal → Intents → Dimensions. These dimensions, once the user adjusts them via controls, effectively become the I → Aug contribution. The "augmented instruction" is what you get *after* intent decomposition + user refinement.
- Supports [[knowledge-graph-grounded-generation]] — in knowledge-grounded systems, A → Aug (artifact-derived constraints from the knowledge graph become part of the composite instruction). The IAI model formalises this as a standard pathway.
- Relates to [[specification-based rendering]] — Aug is to the input side what the json-render spec is to the output side: a structured, validated, intermediate representation that the next stage consumes.
- Enables [[prompt-interaction-synergy]] — Aug is the *product* of combining prompts and interactions. Without Aug as an explicit entity, the synergy is invisible.

## Practical implementations

- **json-render + Vercel AI SDK**: the messages array + tool call results + system prompt collectively form an Aug, though it's not reified as an inspectable entity.
- **LangChain/LlamaIndex**: prompt templates with variable substitution. The filled template = Aug. But interaction-derived variables are rare; most variables come from retrieval (A → Aug pathway).
- **Cursor / Claude Code**: the code context (selected files, terminal output, error messages) + the user's text prompt combine into an Aug. The interaction (file selection, cursor position) contributes I → Aug.
- **JELLY**: the task-driven data model + user's NL modification request form an Aug. The data model is A → Aug; the request is T → Aug.
- **MCP tool calls**: tool results become part of the context for subsequent calls — a form of A → G that the IAI model subsumes under the Aug pathway.

## Relevance to project

The pipeline's architecture sketch has implicit Aug construction at several points, but doesn't treat it as a first-class entity:

1. **Intent decomposition → semantic parse**: The output of intent decomposition (adjusted dimensions + text prompt) is an Aug. Making this explicit means it should be inspectable, serialisable, and versionable — not just an ephemeral intermediate computation.
2. **Spec overlay → re-render**: When a user makes a scoped edit (interaction) combined with the existing spec (artifact) and an optional text instruction, the system constructs a new Aug for the targeted regeneration. The IAI model confirms this should be a well-defined entity, not ad-hoc string concatenation.
3. **The two LLM touchpoints** both receive Augs with different compositions: Touchpoint 1 (spec generation) gets T + semantic slots + intent dimensions; Touchpoint 2 (attribute reformulation) gets T + data item + attribute config. Treating these as typed Augs enables validation, caching, and debugging.
4. **For the bidirectional context loop** ([[bidirectional-context-loop]]), each cycle constructs a new Aug from the previous output (A) + user manipulation (I) + any new text (T). The IAI model gives this cycle a precise vocabulary.

## Open threads

- Should Aug be a logged/versioned entity in the pipeline? If so, it enables replay, comparison ("what did the system receive when it generated *that*?"), and debugging. This connects to [[outcome-oriented-verification]] — showing the user the Aug would let them verify what the system was actually told.
- The IAI model constrains Aug to single-GenAI-call scope. Multi-step pipelines (spec generation → attribute reformulation → adaptation) would need chained Augs. How do these compose?
