---
type: concept
tags: [generative-ui, user-agency, model-evolution, intent]
sources: [sources/duetui-bidirectional-co-generation]
created: 2026-03-05
---
The agent and user communicate through the interface itself, not through conversation. The agent's actions materialise as UI changes; the user's manipulations of that UI feed back as implicit context that steers the agent's next step. A shared action history captures both directions, creating a continuous feedback loop where the interface is simultaneously the output and the input channel.

## Context

One-shot generation fails because intent is emergent — users don't know what they want until they see something (DuetUI's F1). Turn-based supervision fails because it widens the gulf of execution — users must translate fluid goals into discrete instructions. The bidirectional context loop sidesteps both by making the generated interface the communication medium. The user doesn't re-prompt; they interact. The agent doesn't wait for instructions; it observes.

DuetUI's formative study (N=12) found all 12 participants externalised goals in phases, beginning with "basic motivation" to generate an initial result that served as an artefact for evaluation. The loop operationalises this: generate → observe user actions → infer refined intent → regenerate/update → repeat.

## Connections

- Extends [[json-document-backed-components]] — DFRP makes components read/write to shared JSON. The bidirectional context loop adds agent inference on top: not just reactive data binding, but interpretation of user actions as implicit intent signals.
- Operationalises [[shared data layer]] — AG-UI's StateSnapshot/StateDelta mechanism is the protocol-level equivalent. DuetUI's Context Manager is a domain-specific implementation of the same principle: bidirectional state sync between agent and user.
- Addresses [[bidirectional-ambiguity]] — NeuroSync diagnosed the problem (user can't express nonlinear intent linearly; agent can't communicate nonlinear logic through opaque output). The bidirectional context loop is a *runtime* solution: instead of fixing the prompt→output channel, it creates a continuous side channel through the interface itself.
- Enables [[emergent workflow]] — the loop means interaction patterns arise from the user's actual behaviour, not from pre-designed flows. The agent adapts to what the user does, not what they say.
- Contrasts with [[intent-decomposition]] — IntentFlow structures intent *before* generation via explicit decomposition. The bidirectional context loop captures intent *during* interaction via implicit observation. These are complementary: decomposition for upfront specification, context loop for ongoing refinement.

## Practical implementations

- **DuetUI** (the paper's prototype): Vue.js + Element Plus frontend, GPT-4o + LLaMA3-70B agents, Pydantic schemas for consistency, Context Manager as shared state hub.
- **CopilotKit / AG-UI**: the event-driven protocol (lifecycle events, state snapshots, deltas) provides the infrastructure for this kind of loop. DuetUI's architecture could be reimplemented on AG-UI's protocol.
- **Cursor / Windsurf-style code editors**: apply the same principle in a different domain — the user writes code (direct manipulation), the agent observes and suggests (inference from context), the suggestions modify the shared artefact (the codebase).
- **Google Stitch** (DuetUI's baseline): implements a simpler version — conversational + generative, but without the bidirectional implicit intent inference.

## Relevance to project

This is the **runtime mechanism** the pipeline has been missing. The architecture sketch describes generation flowing *downward* (prompt → intent → spec → UI) with a feedback arrow (↺ user customisation → model evolution → UI update), but the arrow was abstract. The bidirectional context loop makes it concrete: user manipulations are captured as action history, the agent reads that history alongside the current spec, and infers what to update. For json-render, this means the rendering layer needs to emit structured interaction events (not just render), and a context manager needs to accumulate them as input to the next generation/update cycle.

## Open threads

- **Implicit vs. explicit intent**: how much can be reliably inferred from user actions alone? DuetUI found users sometimes wanted to override the agent's inference ("it misinterpreted my click"). The loop needs an escape hatch to explicit communication — probably the [[tangible-agency]] controls serve this role.
- **History management**: as the action history grows, what gets pruned? DuetUI doesn't address this. For long-running tasks, the context window becomes a bottleneck. Summarisation or sliding windows are needed.
- **Latency tolerance**: the loop requires near-real-time agent response to user actions. DuetUI used GPT-4o + Groq for speed. For a production system, the inference step needs to be fast enough that the user doesn't perceive a gap between their action and the agent's response.
