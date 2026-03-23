---
type: concept
tags: [user-agency, model-evolution, generative-ui]
sources: ["Cocoa: Co-Planning and Co-Execution with AI Agents (Feng et al., CHI '26)"]
created: 2026-03-06
---
Planning and execution should not be separate phases — they should interleave continuously, so that partial execution results inform plan revision and plan changes redirect execution mid-flight. A structured plan (step list, task graph, whatever) is a living document that evolves as the system and user learn from intermediate outputs.

## Context

Cocoa (Feng et al., CHI '26) found that researchers naturally interleave planning and execution when working with AI agents. In their lab study (N=16), participants who could freely switch between editing plan steps and running them used tighter feedback loops — shifting away from passive output inspection toward active co-execution (15.2% vs. 3.1% of interaction time spent on output editing, p < 0.001). The critical mechanism: when a user edits a plan step after seeing partial results, the system detects the trajectory change and automatically replans downstream steps — "autocompleting" the rest of the plan to cohere with the edit.

This contrasts with the dominant pattern in current AI tools: plan-then-execute (generate a full plan, approve it, run it) or execute-then-correct (let the agent run, fix problems afterward). Both assume a clean separation that doesn't match how people actually work. ReAct-style fully autonomous interleaving exists but gives the user no visibility or control — the agent interleaves internally.

## Connections

- Extends [[staged-co-generation]] — DuetUI's six stages (Define → Empathise → Plan → Explore → Refine → Duet) are sequential phases with different collaboration dynamics. Interleaved plan-execute says those phases shouldn't be strictly sequential — execution results from the Explore stage should be able to trigger re-planning. Cocoa's approach is stage-fluid where DuetUI is stage-structured.
- Supports [[adaptive-autonomy]] — interleaving enables adaptive delegation at a granular level. Users in Cocoa assigned low-risk mechanical steps to the agent and kept high-judgment steps for themselves, then adjusted assignments mid-flight based on what they saw. The autonomy allocation isn't decided upfront — it emerges from the interleaving process.
- Complements [[semantic-intermediate-layer]] — Park et al.'s semantic layer is a checkpoint *before* generation. Interleaved plan-execute adds checkpoints *during* generation, at each step boundary. The plan itself becomes a semantic intermediate layer that updates as execution proceeds.
- Related to [[externalised-LLM-understanding]] — NeuroSync externalises the LLM's task decomposition as an editable graph before generation. Cocoa's interactive plan is a simpler version of the same idea (a step list rather than a dependency graph), but with the crucial addition that the externalisation persists and evolves during execution rather than being a one-shot pre-generation checkpoint.
- Informs [[tangible-agency]] — the step assignment toggle (agent step vs. user step) and execution controls (Run all, Pause, Run remaining) are tangible agency controls specifically for managing the plan-execute interleave.

## Practical implementations

- **Cocoa** (Feng et al.): Tiptap-based document editor with interactive plan steps. Each step has assignment toggles (agent/user), execution indicators (pending/running/needs-input/done), and editable descriptions. Replanning triggers automatically when edits change the plan trajectory.
- **Computational notebooks** (Jupyter, Observable): the structural ancestor. Code cells interleave definition and execution; users run cells selectively, inspect outputs, revise code, re-run. Cocoa explicitly maps its features to notebook equivalents (Table 1 in the paper).
- **Make/build systems**: dependency-aware execution where changing an upstream file triggers selective re-execution of downstream targets. The replanning mechanism in Cocoa is analogous — editing an upstream step triggers replanning of downstream steps.

## Relevance to project

The genUI pipeline currently assumes a forward pass: intent → task model → semantic spec → pattern selection → UI render. Interleaved plan-execute suggests the pipeline should support partial execution with feedback loops at each stage boundary. Concretely: after the task model is generated, the user might see it, adjust it, and that adjustment should propagate forward (triggering re-generation of the semantic spec) without requiring the user to re-specify intent from scratch.

This is especially relevant for the [[model hierarchy]] transitions (Task → Dialog → Presentation → Layout). Each transition could be a "step" in an interactive plan — the user sees the Task model, approves or edits it, then the system generates the Dialog model, and so on. The pipeline becomes a collaborative walk through abstraction layers rather than a black-box transformation.

The replanning mechanism (downstream steps regenerate when upstream steps change) maps directly to how specification changes should cascade: editing a task-level decision should automatically update the presentation-level spec without the user manually propagating the change.

## Open threads

- **Replanning cost**: Cocoa's replanning regenerates all downstream steps when a step is edited. For the genUI pipeline, regenerating a full UI spec because the user tweaked a task-level decision could be expensive and slow. Incremental propagation (only regenerate affected branches) would be needed — which connects to [[impact-analysis-before-generation]].
- **Plan granularity**: Cocoa's plans are 4–7 natural language steps. The genUI pipeline's "plan" (task model → dialog model → presentation model → layout) is more abstract. Whether users benefit from seeing and controlling these abstract transformations, or whether they'd prefer to operate at a higher level ("I want a dashboard" → done), is an open question about where on the [[gentle slope]] interleaving is most valuable.
- **Convergence**: interleaving risks infinite loops — edit plan → see result → edit plan → see result. Cocoa doesn't address convergence criteria. When should the system suggest "this plan is good enough, let's commit"?
