---
type: concept
tags: [intent, generative-ui, user-agency]
sources: [sources/neurosync]
created: 2026-03-05
---
Human-LLM misalignment isn't a one-sided communication problem — it's a **format mismatch in both directions simultaneously**. User-to-LLM: the user's intent is nonlinear and hierarchical (goals nest, subtasks branch, dependencies cross-cut), but must be expressed as a linear text prompt — flattening the structure, losing context, and creating semantic ambiguity. LLM-to-User: the model's output embeds nonlinear task logic (branching execution paths, variable dependencies, sequential constraints) in code that non-programmers can't parse, making it impossible to issue precise corrections. These two ambiguities compound over turns: the user can't see what went wrong, so they re-prompt vaguely, which introduces new misinterpretations.

## Context

Zhang et al. (UIST '25) identified this through a formative study with six domain users across 95 interaction rounds. The bidirectional nature is the key insight — prior work addressed either the user-to-LLM direction (prompt engineering, structured decomposition) or the LLM-to-user direction (code explanations, visualisations), but treating them as separate problems misses that they reinforce each other. A user who can't read the code can't write a good correction prompt; a model that receives a vague correction can't produce well-targeted changes.

Three specific failure modes on the user side: (1) *nonlinear intent loss* — hierarchical goals flatten into sequence; (2) *contextual omissions* — users leave out information they think is obvious; (3) *vague modification guidance* — users describe desired outcomes without specifying what to change. On the LLM side: users can't identify task boundaries, misinterpret execution flow, or fail to spot partial completions buried in code.

## Connections

- **Refines** [[structured vs unstructured tension]] — that concept captures the general gap between unstructured human expression and structured system needs. Bidirectional ambiguity is more specific: it identifies that the mismatch operates in *both* directions (not just user → system) and that the two directions amplify each other. The structured/unstructured tension is the static problem; bidirectional ambiguity is the dynamic, compounding version.
- **Motivates** [[externalised-LLM-understanding]] — the direct solution. If users can't read code (LLM-to-user ambiguity) and can't write precise prompts (user-to-LLM ambiguity), give them a third modality: an editable graph representation of the task structure that both sides can work with.
- **Relates to** [[semantic-drift]] — bidirectional ambiguity is a *mechanism* that causes semantic drift. Each misaligned turn introduces compounding errors because neither side can detect or correct the other's misunderstanding.
- **Addressed differently by** [[semantic-intermediate-layer]] — Park et al.'s approach inserts a visible design-level bridge. NeuroSync inserts a visible task-level bridge. Both address the opacity problem but at different pipeline stages.
- **Addressed differently by** [[intent-decomposition]] — IntentFlow structures the user's side of the ambiguity (making intent explicit). NeuroSync structures the LLM's side (making its task interpretation explicit). Both are partial solutions to the same bidirectional problem; combining them would address both directions simultaneously.
- **Exacerbated by** [[high-dimensional-configuration-space]] — the more degrees of freedom in the generation task, the more places bidirectional ambiguity can hide.

## Practical implementations

- **GitHub Copilot's inline suggestions** — partially address LLM-to-user ambiguity by showing code in context, but don't address user-to-LLM ambiguity at all. Users still re-prompt blindly when suggestions are wrong.
- **Cursor's diff view** — shows what the LLM changed, reducing LLM-to-user ambiguity for code-literate users. Non-programmers still can't parse the diffs.
- **CoLadder** (Ryan et al.) — bidirectional dialogue with editable multi-level code blocks. Addresses both directions but in a code-centric way that still requires some programming literacy.

## Relevance to project

This diagnosis applies directly to the genUI pipeline, not just to code generation. When the LLM generates a UI spec from a prompt, the same bidirectional ambiguity operates: the user's intent was richer than their prompt expressed (user-to-LLM), and the generated spec embeds decisions the user can't inspect (LLM-to-user). The pipeline's response — intermediate layers at multiple stages (intent decomposition, semantic specification, task model) — is essentially a multi-layered attack on bidirectional ambiguity, providing inspectable, editable representations at each point where format mismatch occurs.

The practical question: which representations reduce ambiguity most efficiently? NeuroSync's task graph worked for code generation. For UI generation, the semantic intermediate layer (Park et al.) or the intent decomposition (IntentFlow) might be more appropriate — or all three at different pipeline stages.

## Open threads

- Does bidirectional ambiguity scale differently for UI generation vs. code generation? Code has invisible execution semantics; UI has visible but potentially misleading surface presentation. A generated UI might *look* right while being structurally wrong (right components, wrong data bindings). This could make LLM-to-user ambiguity harder to detect.
- Can the compounding effect be quantified? NeuroSync shows it takes 7–8 rounds with baseline vs. 1–2 with the graph. That's a 4–7× amplification factor. Is this consistent across task types?
- **Disambiguation as interactive widget pattern**: AmbigChat (Ma et al., UIST '25) demonstrates a concrete implementation where ambiguous *factual queries* are decomposed into a hierarchical disambiguation tree (facets → values → rewritten queries) and surfaced as interactive widgets — question chips with images, answer cards, draggable context chips for follow-up. The tree construction pipeline (LLM + taxonomy + RAG → ordered facet list → breadth-first tree → pruned leaves) is a narrow-domain version of the genUI pipeline's prompt → structured representation → rendered components flow. The context chips — draggable answer references that get parsed back into structured context for the LLM — are a worked example of the [[bidirectional-context-loop]] at widget level. Relevant if the pipeline needs to handle ambiguous user prompts interactively rather than resolving all ambiguity in a single decomposition pass. (DOI: 10.1145/3746059.3747686)
