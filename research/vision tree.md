---
last-updated: 2026-02-27
framework: opportunity solution tree
scope: LLM-operable interface (parent scope — generative UI is one branch)
status: draft — first pass, needs refinement as research progresses
---
# Vision tree: LLM-operable interfaces

> [!info] Relationship to the generative UI solution tree
> The [[solution tree]] is scoped to the JELLY vision: generate, modify, and evolve UIs from natural language. This document sits *above* that — it asks what generative UI is a part of, and what else belongs in the same picture.
>
> The generative UI pipeline is **Branch 2** below. Everything in the existing solution tree nests under it. The other branches are context for where this work leads, what it enables, and what adjacent problems it shares infrastructure with.

## Outcome

**LLM agents reliably mediate between user intent and system capabilities — whether that means generating new interfaces, operating existing ones, or composing both.**

The user doesn't learn the system; the system learns the user. The agent layer sits above GUIs ([[LLM agent UI as abstraction layer]]) and can reach down through GUI, API, and data layers. The user expresses what they want to accomplish; the agent figures out how to make it happen — generating new UI when nothing suitable exists, driving existing applications when they do, and composing both when the task crosses system boundaries.

This isn't a single pipeline. It's three capabilities that share infrastructure:

```
                        User intent
                            │
                    ┌───────┼───────┐
                    ▼       ▼       ▼
              1. Operate  2. Generate  3. Compose
              existing    new UI       across
              systems                  boundaries
                    │       │       │
                    └───────┼───────┘
                            ▼
                    Shared infrastructure
              (intent, knowledge, adaptation,
               state, feedback loops)
```

---

## Branch 1 — Operate existing systems

The agent drives applications that already exist, navigating their configuration spaces on the user's behalf. No new UI is generated — the agent uses the system's own surfaces (GUI, API, CLI) to accomplish user goals.

This is what the LAUI paper describes: the agent as a fourth abstraction layer (Functions → API → GUI → LAUI). It's also what the experiments (S17, S22 in the [[solution tree]]) test — task decomposition driving an existing app via WebMCP.

### O1.1 — Agent can't reliably decompose business intent into system operations

"Make Product A available in Channel B" requires knowing: eligibility rules, attribute configuration, pricing setup, possibly approval workflows. The agent needs domain knowledge the LLM doesn't have from training alone.

**Solutions:**

- **V1: Knowledge-grounded task decomposition** — [[knowledge-graph-grounded-generation]]. The agent queries a structured knowledge store (product schemas, business rules, vocabulary) to decompose intent into valid operations. Already scoped as S17 in the genUI tree; here it's recognised as shared infrastructure that serves both operation and generation.
  - *Riskiest assumption:* A minimal knowledge store (schemas + rules + glossary, short of a full graph) is sufficient for reliable decomposition.

- **V2: Example-grounded decomposition** — [[grounding-by-example]]. Provide the agent with examples of correct task decompositions. Few-shot domain expertise. Can complement or replace the knowledge store.
  - *Riskiest assumption:* Example coverage generalises — that 10–20 examples cover the majority of real task variations in a domain.

### O1.2 — Agent actions in existing systems are fragile

WebMCP tool calls against a live GUI are brittle — selectors break, async timing fails, multi-step flows depend on UI state that's hard to observe. The agent can decompose the task correctly but still fail at execution.

**Solutions:**

- **V3: API-first operation where available** — Route through API/CLI when the system exposes them. GUI automation only as fallback. The [[programmable-router]] pattern: cheapest reliable path first.
  - *Riskiest assumption:* Most high-value operations have API equivalents.

- **V4: Semantic tool abstraction** — Expose domain operations as high-level tools ("configure product for channel") rather than low-level GUI clicks. Hides implementation fragility. Trade-off: the tool layer must be maintained as the underlying system changes.
  - *Riskiest assumption:* Semantic tools can be authored quickly enough to be practical. If each new domain requires weeks of tool engineering, the approach doesn't scale.

### O1.3 — Users can't see or steer what the agent is doing

The agent operates the system on the user's behalf, but the user has no visibility into its reasoning, progress, or potential mistakes until the result appears. Silent automation is either trusted blindly or not trusted at all.

**Solutions:**

- **V5: Parallel state display** — [[parallel-state-display]]. Show the agent's internal state (current step, confidence, assumptions about the user) alongside the system's own UI. Dashboard-like instrumentation, not conversational narration.
  - *Riskiest assumption:* Meaningful agent state can be extracted and displayed in real time without crippling latency.

- **V6: Frontend-defined tool control** — [[frontend-defined tool execution]]. The frontend declares which operations the agent can perform. The user can grant or revoke capabilities dynamically. Agent proposes; user (or application policy) disposes.
  - *Riskiest assumption:* Tool granularity can be set at a level that's both safe and useful — not so coarse that the agent is useless, not so fine that approval fatigue kills the interaction.

---

## Branch 2 — Generate new interfaces

The JELLY vision. When no suitable application exists, or the user's task cuts across multiple domains, the agent generates a working, modifiable UI from natural language.

**This is the existing [[solution tree]] in its entirety.** All five opportunities (O1–O5) and their solutions (S1–S22) nest here. The key sub-problems:

- **O2.1** — Generated UIs are disposable (changes don't propagate, users can't see what's driving the UI, iteration diverges) → Two-way binding, accretive overlays, semantic intermediate layer, scoped editing
- **O2.2** — The gap between user task and component spec is too wide → Intermediate representations, concept catalogs, multi-level IR chains
- **O2.3** — The system has no design taste → Pattern libraries, constraint-driven selection, LLM with pattern guidance
- **O2.4** — Natural language can't reliably become structured task models → Intent decomposition, knowledge-grounded generation, verification loops
- **O2.5** — The end-to-end loop doesn't cohere → Vertical slice integration, domain-specific end-to-end testing

> [!tip] See [[solution tree]] for full detail
> The generative UI tree is mature (22 solutions, prioritised experiment sequence). This vision tree doesn't duplicate it — it provides the surrounding context.

### What AG-UI adds to this branch

AG-UI clarifies the **runtime layer** the generative UI pipeline needs but hadn't explicitly designed:

- [[event-driven agent-UI protocol]] — the persistent, bidirectional connection between agent and frontend that makes the feedback loop (UI ↺ customisation → model evolution → UI update) work as a continuous process rather than discrete request-response cycles.
- [[shared data layer]] — JSON Patch (RFC 6902) for incremental spec updates, snapshots for major regeneration. Concrete answer to the spec evolution question.
- [[two-step generative UI]] — agent specifies *what* (description + data + output schema), specialist generator produces *how*. Validates the pipeline's separation of task analysis from spec generation and suggests multiple specialised models rather than one monolithic LLM.
- [[frontend-defined tool execution]] — runtime-configurable guardrails on agent actions, complementing the output-space guardrails (schema validation, component whitelisting) with action-space guardrails.

---

## Branch 3 — Compose across boundaries

The hardest and furthest-out branch. The user's task spans multiple systems — some existing, some generated, some belonging to other agents. "Plan the offsite" touches calendar, travel booking, expense management, and a custom agenda builder. No single system handles this; the agent must compose across boundaries.

This is where [[tools-not-apps]], [[UI composition]], and the A2A protocol converge. It's also where the research gets speculative — few systems have demonstrated reliable cross-system agent composition.

### O3.1 — Data doesn't flow between systems

Each system has its own data model. Guest list in one, travel preferences in another, budget in a third. The agent must bridge schemas, resolve conflicts, and maintain consistency.

**Solutions:**

- **V7: Shared data layer with schema mediation** — [[shared data layer]]. A common substrate that multiple views (both generated and existing) can read from and write to. Schema differences handled by lenses (Cambria-style bidirectional translation) or by a mediating LLM that maps between schemas.
  - *Riskiest assumption:* Schema mediation can be automatic enough to be practical. Manual mapping per system pair doesn't scale.

- **V8: Identity-based integration** — [[identity-based-data-integration]]. Systems share entity IDs, not data. Each system owns its own data for entities it knows about; cross-references happen via shared IDs. Déjà Vu's approach. Lighter than a shared data layer but requires a shared identity namespace.
  - *Riskiest assumption:* A shared identity namespace can be established across systems that weren't designed to interoperate.

### O3.2 — The composed interface is incoherent

Even if data flows, the UI is a patchwork. A generated agenda builder next to an embedded Google Calendar next to a Slack thread. No visual coherence, no interaction coherence, no shared interaction patterns.

**Solutions:**

- **V9: Adaptation layer as unifier** — [[context-driven adaptation]] applied to composition. A shared adaptation layer (design tokens, accessibility rules, interaction patterns) post-processes all components — generated and embedded — to enforce visual and interaction coherence.
  - *Riskiest assumption:* Embedded third-party UIs can be adapted meaningfully from outside (CSS overrides, wrapper components) rather than requiring internal changes.

- **V10: Generate wrappers, not embeddings** — Instead of embedding existing UIs, generate a new unified interface that communicates with existing systems via API. The user sees one coherent generated UI; the backend orchestrates data flow to/from existing systems. This is closer to Branch 2 (generation) than Branch 1 (operation), but the generated UI is thin — primarily a presentation layer over existing system APIs.
  - *Riskiest assumption:* The existing systems expose enough API surface that a generated wrapper can provide equivalent functionality. Many systems don't.

### O3.3 — Agent-to-agent coordination is unreliable

If sub-tasks are delegated to specialised agents (a travel agent, a scheduling agent, a budget agent), coordination becomes a distributed systems problem: partial failures, conflicting results, ordering dependencies.

**Solutions:**

- **V11: Orchestrator pattern** — One primary agent decomposes the task and delegates sub-tasks to specialist agents via A2A. The orchestrator maintains global state and resolves conflicts. Simple but creates a single point of failure.
  - *Riskiest assumption:* Sub-task boundaries can be cleanly defined. Real tasks have cross-cutting concerns that don't decompose neatly.

- **V12: Shared state convergence** — All agents write to a shared state object ([[shared data layer]]). Conflicts are resolved by CRDTs or last-writer-wins policies. No orchestrator — coordination emerges from shared state. Simpler architecture but harder to reason about.
  - *Riskiest assumption:* Conflict resolution policies produce acceptable results. Two agents modifying the same schedule entry needs a resolution strategy that's better than arbitrary.

---

## Shared infrastructure

These capabilities cut across all three branches. Investing in them pays off regardless of which branch you're working on.

### Intent layer

- [[intent-decomposition]] — Goal → Intents → Dimensions. Needed for Branch 1 (decomposing business intent into system operations), Branch 2 (decomposing user prompt into structured task model), and Branch 3 (decomposing cross-system tasks into per-system sub-tasks).
- [[semantic-intermediate-layer]] — visible, editable specification between intent and output. Makes the agent's interpretation transparent whether it's operating, generating, or composing.
- [[hierarchical-design-semantics]] — Product → Design System → Feature → Component. Primarily serves Branch 2 but could inform Branch 3 (coherence standards for composed interfaces).

### Knowledge layer

- [[knowledge-graph-grounded-generation]] — structured knowledge stores the agent queries rather than generating from training alone. Branch 1 needs domain knowledge (business rules, system capabilities). Branch 2 needs design knowledge (pattern libraries, component catalogs). Branch 3 needs integration knowledge (API schemas, data mappings).
- [[concept-catalog]] — reusable full-stack concepts. Branch 2 uses them for generation. Branch 3 could use them as integration units — each concept wraps a system's capability in a composable interface.

### Adaptation layer

- [[context-driven adaptation]] — user profile + environment → UI modifications. Applies to all branches: adapted operation (Branch 1), adapted generation (Branch 2), adapted composition (Branch 3).
- [[content-structure-adaptation-split]] — structural adaptations via rules, content adaptations via LLM + quality gates. The routing principle is universal.
- [[programmable-router]] — cheapest reliable processing path. Applies to every pipeline stage across all branches.

### State and feedback layer

- [[event-driven agent-UI protocol]] — the runtime connection between agent and frontend. Branch 1 needs it for operation progress and control. Branch 2 needs it for the generation feedback loop. Branch 3 needs it for coordinating multiple agent streams.
- [[shared data layer]] — bidirectional state sync. The mechanism for two-way binding (Branch 2), operation monitoring (Branch 1), and cross-system data flow (Branch 3).
- [[frontend-defined tool execution]] — the frontend controls what the agent can do. Safety mechanism for all branches — dynamic guardrails via dynamic tool sets.

### Malleability layer

- [[gentle slope]] — from viewing through tweaking to modifying to programming. Applies whenever a user interacts with agent output, regardless of whether that output was generated, operated, or composed.
- [[accretive-extensibility]] — modifications as overlay layers, never destructive edits. Applies to generated specs (Branch 2), system configurations (Branch 1), and composed interfaces (Branch 3).
- [[in-place toolchain]] — editing tools embedded in the running interface. Needed wherever the user needs to understand and modify what the agent produced.

---

## How the branches relate

The branches aren't sequential — they're concurrent capabilities at different maturity levels.

**Branch 2 (Generate) is the current focus** because it's where the hardest unsolved research problems are (intent → structured spec → rendered UI → evolution loop), and because it produces the shared infrastructure (intent layer, adaptation layer, state layer) that Branches 1 and 3 need.

**Branch 1 (Operate) is partially testable now** via the experiments. It shares the intent decomposition and knowledge grounding infrastructure with Branch 2 but doesn't need the rendering pipeline. The experiments in the [[solution tree]] (S17, S22) are Branch 1 work — they test task decomposition and execution against existing systems.

**Branch 3 (Compose) is future work.** It depends on both Branch 1 (operating existing systems) and Branch 2 (generating new UI) working individually before combining them. The shared data layer and agent coordination problems are real but premature to experiment on now.

```
Maturity: ████░░░░░░ Branch 1 (Operate)
          ██████░░░░ Branch 2 (Generate)  ← current focus
          █░░░░░░░░░ Branch 3 (Compose)
```

The key architectural insight from this broader view: **the infrastructure you build for Branch 2 should not assume Branch 2 is the only consumer.** Intent decomposition, knowledge grounding, adaptation rules, event protocols, and state management all serve the other branches too. This is already partly true in the [[solution tree]] — the experiments use the same knowledge-grounding infrastructure as generative UI. Making it explicit prevents over-fitting the architecture to generation-only use cases.

---

## What this tree changes about the generative UI work

Not much operationally — the [[solution tree]] experiment sequence remains correct. But the broader framing shifts a few priorities:

1. **Intent decomposition and knowledge grounding are more important than previously weighted.** They're not just "upstream of rendering" — they're the shared substrate for all three branches. Investing in them first has the highest leverage.

2. **The AG-UI protocol layer deserves explicit design attention.** The [[solution tree]] treats runtime communication as a cross-cutting concern. In the broader vision, it's shared infrastructure that all three branches depend on. The event protocol, shared state model, and frontend tool definitions need to be designed *once*, not retrofitted per branch.

3. **The experiments (S17, S22) are Branch 1 experiments wearing Branch 2 clothes.** Recognising this clarifies what they're actually testing: domain-grounded task decomposition and agent-operated execution — not generative UI. Their results inform the broader vision even if they don't produce rendered interfaces.

4. **[[concept-catalog]] grows in importance.** In Branch 2, concepts are generation units. In Branch 3, concepts could be integration units — each wrapping a system's capability in a composable interface. A concept catalog that works for both would be significantly more valuable than one designed only for generation.
