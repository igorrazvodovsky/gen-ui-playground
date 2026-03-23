---
type: concept
tags: [user-agency, specification, generative-ui]
sources: [sources/interactive-ai-alignment]
created: 2026-03-06
updated: 2026-03-11
---
When an AI's actual process is too opaque or complex for users to directly control, you can reverse-engineer a simplified, controllable representation of that process and let users interact with *that* instead. This controllable stand-in is a surrogate process.

The key move: the surrogate doesn't need to faithfully represent the AI's internal process. It just needs to be controllable by the user and predictably connected to the output.

## Context

The canonical example: Liu et al.'s spreadsheet code synthesis. The LLM generates code from a natural language request, then deterministically transforms the code into pseudocode. The user edits the pseudocode — a simplified surrogate — and the system regenerates actual code from the edit. The surrogate serves triple duty: specification alignment (reflects interpretation), process alignment (reveals the pipeline), and evaluation alignment (helps understand output).

Process alignment requires either making the AI's actual process transparent (hard when the process is neural network inference) or offering a parallel representation that's legible. The surrogate is the pragmatic answer: don't explain the black box, build a manipulable proxy.

**Critical nuance: temporal context determines surrogate type.** [[process-induced-overreliance]] (Grunde-McLaughlin et al., 2026) found that process-oriented surrogates (flowcharts of agent steps) actively induced overreliance — 39% accuracy on incorrect tasks. Outcome-oriented surrogates (Requirements + Assumptions checklists) achieved 65% accuracy. The resolution:

- **Pre-generation surrogates** should be **process-oriented** — the user is steering, not verifying. NeuroSync's task graph, IntentFlow's dimensions, and pattern selection summaries all work here because the user can redirect before output is committed.
- **Post-generation surrogates** should be **outcome-oriented** — decompose *what was built* and *what was assumed*, not *how it was built*. This forces analytical engagement rather than narrative acceptance.

## Connections

- **Extends** [[externalised-LLM-understanding]] — the task graph is effectively a surrogate for the LLM's task decomposition
- **Relates to** [[semantic-intermediate-layer]] — the semantic decomposition is a surrogate for the LLM's design interpretation
- **Supports** [[three-alignment-gulfs]] — surrogates are the primary mechanism for the Process Gulf
- **Relates to** [[abstract-concrete-separation]] — surrogates work at the abstract level, hiding concrete details
- **Enables** [[gentle slope]] — surrogates can be pitched at different abstraction levels
- **Tension resolved with** [[process-induced-overreliance]] — see temporal context above. The apparent contradiction (surrogates are valuable / surrogates cause overreliance) dissolves when you distinguish pre-generation steering from post-generation verification.

## Practical implementations

- Liu et al.'s pseudocode layer for code synthesis
- PromptPaint's prompt scheduling interface for image generation (users specify which prompts apply at which denoising stage — a surrogate for the diffusion process)
- Database query planners ("explain plan" the user can influence through hints)

## Relevance to project

The genUI pipeline's process is: prompt → intent decomposition → task model → pattern selection → component mapping → spec → render. Most of this is LLM inference — opaque by default. Each stage should have a surrogate:

- **Intent decomposition → intent dimensions** (IntentFlow) — surrogate for prompt interpretation
- **Pattern selection → pattern selection summary** — currently missing. Show which patterns were selected and why.
- **Component mapping → semantic spec** (Park et al.) — surrogate for mapping decisions
- **Full generation → task graph** (NeuroSync) — surrogate for the complete plan

The principle: every major LLM decision should have a surrogate the user can inspect and optionally edit. But the surrogate type should match the temporal context — process surrogates for stages where the user is still deciding, outcome surrogates for stages where the user is verifying.

## Open threads

- How faithful does a surrogate need to be? If users edit the surrogate in ways the actual process can't honour, the mismatch creates a new alignment problem.
- Can surrogates be generated automatically (as Liu et al. do with code → pseudocode), or must they be designed per-stage?
- Surrogate fidelity vs. simplicity: a faithful surrogate is complex; a simple one may mislead. How to calibrate for different user expertise levels?
