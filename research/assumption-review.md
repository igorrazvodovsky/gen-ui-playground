---
created: 2026-03-11
status: in-progress
purpose: systematic extraction and testing of assumptions in synthesis.md
---
# Assumption review

Extracted from [[synthesis]], [[project]], and [[solution tree]]. Each assumption is tagged with its evidence status:

- **Strong** — multiple papers or empirical data directly support
- **Moderate** — one paper supports, or logical inference from strong evidence
- **Weak** — asserted without direct evidence, or evidence is from a different domain
- **Untested** — plausible but no evidence either way
- **Challenged** — evidence exists that complicates or contradicts

---

## A. Foundational assumptions

These are the "why build this at all" beliefs. If any of these are wrong, the whole project changes shape.

### A1. The app paradigm is the problem

> "Generative UI is not about generating better apps — it's about eliminating the app paradigm altogether."

**Claim:** Users are poorly served by fixed, monolithic applications. Tasks cut across apps, and the interface should be a projection of the task, not a container for features.

**Evidence:** Strong. [[tools-not-apps]] (Ink & Switch), JELLY's entire premise, the [[design-time-vs-use-time]] information asymmetry argument. Multiple independent research groups converge on this.

**But:** The synthesis assumes this is universally true. For well-defined, stable workflows (payroll processing, inventory management), fixed apps work fine. The assumption holds most strongly for *exploratory, cross-domain, evolving* tasks. The project scope (generative UI for ad-hoc tasks) is appropriate, but the synthesis sometimes overgeneralises.

**Status:** Strong for the project's target domain. Overstated as a universal claim.

---

### A2. Design-time information is fundamentally insufficient

> "More information is available at use-time than at design-time."

**Claim:** [[design-time-vs-use-time]] — designers know the system but not the user; users know themselves but not the system. An LLM agent with access to both sides can generate better-fitted interfaces at use-time than any designer can at design-time.

**Evidence:** Moderate. The LAUI paper argues this philosophically. [[high-dimensional-configuration-space]] provides the mathematical framing (exponential configs, designers explore a fraction). But no paper in the vault directly *measures* the quality gap between design-time and use-time generation.

**Risk:** This could be true in principle but irrelevant in practice if use-time generation quality is too low. The assumption implicitly requires that LLM generation quality is "good enough" — which is itself [[untested]].

**Status:** Moderate. Philosophically sound, empirically unvalidated for UI generation specifically.

---

### A3. The structured/unstructured bridge is the core problem

> "The LLM's primary job is to bridge [the structured vs unstructured] gap — converting vague prompts into structured data models."

**Claim:** [[structured vs unstructured tension]] is the central tension. Everything downstream (spec, rendering) operates on structured data. The hard part is getting from unstructured intent to structured models.

**Evidence:** Strong. Every paper that touches the intent-to-spec pipeline confirms this is where the difficulty concentrates. IntentFlow, NeuroSync, Park et al., DuetUI all build mechanisms specifically to manage this bridge.

**But:** The synthesis may underweight a second hard problem: even with perfect structured specs, *choosing the right UI patterns* is a design judgement problem, not a translation problem. The mapping from structured model → good UI involves taste, context, and convention that aren't captured by "bridging structured/unstructured."

**Status:** Strong as *a* core problem. May not be *the* core problem — design judgement (O3 in the solution tree) is a parallel challenge, not downstream of it.

---

### A4. Users want malleability

**Claim:** Users will meaningfully modify generated interfaces if given the tools. The [[gentle slope]] is worth building because people will walk it.

**Evidence:** Moderate. DuetUI (N=24) shows users prefer iterative refinement over one-shot generation. JELLY's design is premised on it. IntentFlow and IntentTagger show users want control over generation parameters.

**But:** No paper tests whether users will modify the *output UI* (not just the generation parameters). Adjusting a slider pre-generation is different from restructuring a rendered interface. The Malleable Software essay (Ink & Switch) acknowledges that most users don't modify their tools — the gentle slope needs to be *very* gentle. DuetUI's users iterated on generation parameters, not on the rendered components directly.

**Status:** Moderate for pre-generation control. Weak for post-generation structural modification. The gap between "I want to adjust what gets generated" and "I want to edit the generated thing" is under-explored.

---

## B. Architectural assumptions

### B1. The pipeline is sequential with feedback

> "User prompt → Task analysis → Task-driven data model → UI specification → Rendered UI ↺ End-user customisation → Model evolution → UI update"

**Claim:** The generation process flows top-down through defined stages, with a feedback loop for iteration.

**Evidence:** Moderate. The [[model hierarchy]] (Seffah & Gaffar) provides theoretical grounding. JELLY implements a version of it. Multiple papers assume or describe sequential transformation.

**But:** DuetUI's [[bidirectional-context-loop]] suggests the process may be more circular than sequential — generation and refinement interleave rather than forming a clean pipeline. NeuroSync shows users benefit from inspecting *all* stages in parallel, not sequentially. The pipeline metaphor may be too rigid for the actual interaction pattern, which is more like continuous negotiation.

**Status:** Moderate. Useful as an engineering abstraction. May not reflect how users actually experience the process.

---

### B2. Three-layer mapping (patterns → constraints → LLM)

> "Patterns handle macro structure, constraint rules handle micro structure, LLM handles edge cases."

**Claim:** Component selection should be stratified: patterns for section-level decisions, deterministic constraint rules for field-level decisions, LLM only for ambiguous cases.

**Evidence:** Moderate. [[pattern-driven transformation]] (Seffah & Gaffar) provides the pattern layer. [[constraint-driven component selection]] (Nunes et al.) provides the constraint layer. The combination is logical. [[programmable-router]] (Vandeputte) names the general principle.

**But:** No system has implemented all three layers together. The interfaces between layers are undefined. It's unclear whether patterns and constraints provide enough coverage that the LLM "edge case" layer is genuinely small, or whether most real tasks hit edge cases, making this a two-layer system with an LLM escape hatch that gets used constantly.

**Status:** Moderate as architecture. Untested as implementation. The "edge case" layer's size is the key unknown.

---

### B3. Design systems are the pattern library

> "Instead of building pattern libraries from scratch, use design systems as the foundation."

**Claim:** [[design systems as pattern libraries]] — existing design systems (Material UI, Radix, Shadcn) already encode the pattern knowledge the pipeline needs. Their documentation is the pattern library; their components are the catalog.

**Evidence:** Moderate. The convergence between academic component taxonomies (UISCO, OADAPT) and practical design system categories is documented. Atomic design methodology maps to pattern composition levels.

**But:** Design systems encode *component-level* patterns (how to build a search input) but not *task-level* patterns (when to use search vs. browse vs. filter). The synthesis conflates two levels: the component library (well-served by design systems) and the task-to-UI mapping (not addressed by design systems at all). Design system docs say "here's how to use a DataTable"; they don't say "for a comparison task with 5+ items sharing 3+ attributes, use a DataTable."

**Status:** Strong for the component catalog. Weak for task-level pattern knowledge. The gap is at the task → component mapping level, which is exactly where the LLM currently fills in.

---

### B4. Specs should be declarative JSON, never code

> "The LLM generates validated data structures (specs), never executable code."

**Claim:** [[specification-based rendering]] is foundational. The LLM produces JSON specs conforming to catalog schemas. The rendering layer interprets them. No code generation.

**Evidence:** Strong. json-render validates it. A2UI, Open-JSON-UI, and AG-UI's [[two-step generative UI]] all converge on declarative JSON. Varv's [[software-as-data-structure]] extends this to behaviour. Industry convergence (2025–26) confirms the direction.

**But:** Varv's concepts include *actions* (state transitions, event handlers) which are essentially behaviour specifications — a kind of code, even if expressed declaratively. The line between "declarative spec" and "code" blurs when you add behaviour. The current synthesis treats UI-only specs as the target, but the gap map notes that behaviour specification is needed for real interactivity. Once you add actions and triggers, you're generating something code-adjacent.

**Status:** Strong for UI structure. Challenged for behaviour. The "never code" boundary will need renegotiating as the system gains interactivity.

---

### B5. The LLM is a pattern engine, not a freeform generator

> "It selects patterns, binds variables, composes them, transforms through layers."

**Claim:** The LLM's role is constrained navigation of a defined space, not open-ended generation. The pattern library + catalog define the grammar; the LLM navigates within it.

**Evidence:** Moderate. [[pattern-driven transformation]] provides the framework. [[knowledge-graph-grounded-generation]] (Fareedi et al., 15% accuracy improvement) supports grounding over freeform generation. [[configuration-model-as-design-space]] (Kumbang) formalises the "navigate a space" framing.

**But:** This assumes the pattern library is comprehensive enough to cover most tasks. If the library has gaps, the LLM falls back to freeform generation anyway. No one has measured pattern coverage for real-world task diversity. Also, current LLMs are much better at freeform generation than at constrained navigation — the approach trades on the LLM's weaknesses (precision, consistency) rather than its strengths (creativity, generalisation).

**Status:** Moderate as aspiration. The feasibility depends entirely on pattern library coverage, which is untested. There's a tension: if the library is comprehensive enough, you might not need an LLM at all (just a search engine); if it isn't, the LLM reverts to freeform generation.

---

### B6. Two LLM touchpoints, not one

> "Spec generation at design time; attribute reformulation at data time."

**Claim:** [[ai-attribute-reformulation]] reveals a second, distinct LLM role: per-item semantic transformation of data values at fetch time, separate from the one-shot spec generation.

**Evidence:** Moderate. Meridian implements this pattern. The distinction between design-time and data-time LLM use is architecturally clean.

**But:** The synthesis treats these as the only two touchpoints. The architecture sketch actually shows many more potential LLM calls: intent decomposition, semantic parsing, task analysis, pattern selection, adaptation, augmented semantics extraction, intent-output traceability computation. "Two touchpoints" undersells the LLM dependency. The real question is which of these can be made deterministic and which genuinely require LLM inference.

**Status:** Moderate for the two named touchpoints. Incomplete as a description of total LLM dependency. The pipeline likely has 5–8 LLM touchpoints in practice.

---

### B7. Accretive modification > regeneration

> "User modifications should be overlay layers on top of generated base specs."

**Claim:** [[accretive-extensibility]] — modifications layer on top; the base is never edited. Regeneration replaces the base; overlays survive.

**Evidence:** Moderate. Varv implements it. Meridian validates it in production React (attribute-level overlays). The pattern is clean and composable.

**But:** The synthesis doesn't seriously engage with the *failure mode*: what happens when a regenerated base conflicts with an existing overlay? "Remove the overlay" is the documented solution, but if the user spent 20 minutes crafting overlays, losing them is a real cost. The compatibility problem (can overlays survive arbitrary base changes?) is hand-waved. Meridian works because attribute configs are relatively stable; structural overlays (moving components, changing hierarchy) are much more fragile.

**Status:** Strong for attribute-level overlays. Weak for structural overlays. The compatibility problem is the real challenge and it's largely unaddressed.

---

## C. Interaction assumptions

### C1. The gentle slope is walkable

> "Users need a gentle slope from viewing → tweaking values → customising attributes → swapping patterns → editing specs → editing models."

**Claim:** [[gentle slope]] — there exists a continuous gradient of engagement from passive viewing to deep structural editing, and users will traverse it.

**Evidence:** Moderate. The slope is well-theorised across multiple papers: IntentFlow (intent dimensions), Park et al. (semantic slots), AI-instruments (reified intent objects), Meridian (attribute customisation). Each adds a step.

**But:** The slope has been *designed* by accumulating papers, not *tested* as a whole. Each paper validates one step in isolation. No one has tested whether the combined slope (now ~10 steps) is actually navigable — whether users can find the right level and move between levels fluidly. The risk is that the slope is actually a staircase: each step is individually reasonable, but transitions between steps are jarring because the representation changes (intent dimensions → semantic slots → pattern selections → spec JSON → component props).

**Status:** Moderate per step. Untested as a continuous experience. The representation-switching problem at boundaries is the key risk.

---

### C2. Three intermediate layers are better than none (or one, or two)

> "The architecture may need three inspectable layers: what the user wants, what the model understood, how it should look."

**Claim:** Intent decomposition (IntentFlow), task understanding (NeuroSync), and semantic specification (Park et al.) should all be user-inspectable.

**Evidence:** Individually moderate. Each paper shows its layer improves outcomes. NeuroSync: 50% faster, 66% fewer LLM calls. IntentFlow: significant improvements on control (p<.001). Park et al.: significant improvements on output interpretability.

**But:** [[process-induced-overreliance]] (Grunde-McLaughlin et al.) directly challenges this. More visibility isn't always better. Process-oriented transparency *after generation* produced the worst error detection (39.13%). The synthesis notes this tension but doesn't resolve it: should all three layers be pre-generation checkpoints? If so, the overhead of reviewing three representations before seeing any output may be unacceptable. [[alignment-cost-tradeoff]] (Terry et al.) argues checkpoints should be proportional to stakes, not universal.

**Status:** Challenged. Individual layers are validated; the combination is not. The interaction cost of three checkpoints pre-generation is likely prohibitive for most tasks. The synthesis needs a clearer position on *when* each layer is worth showing.

---

### C3. Conversational interaction is the starting point, instrumental interaction is the future

> "The first version will inevitably be chat-based, but the architecture should not assume chat as the only input modality."

**Claim:** Chat is easiest to implement and most familiar, but instrumental interaction (spatial, persistent, concurrent — per AI-instruments) is more expressive.

**Evidence:** Moderate. DuetUI's user study directly supports this: users preferred structured controls over conversational prompting. IntentTagger's spatial tag canvas outperformed chat-based systems. AI-instruments' probes show the potential of instrumental interaction.

**But:** This assumption contains an unstated sequencing claim: "chat first, instruments later." The evidence actually suggests the opposite — DuetUI found that chat was the *problem*, not the starting point. If the first version is chat-only, it may set a precedent that's hard to break. The architecture might need to support instruments from day one, even if the implementation starts simple.

**Status:** The "instruments are better" part is moderate-to-strong. The "chat first" sequencing is a pragmatic call, not an evidence-based one. Worth questioning.

---

### C4. Iterative refinement > one-shot generation

> "Users overwhelmingly prefer iterative refinement over one-shot generation."

**Claim:** From DuetUI's user study — generation should be iterative and convergent, not a single prompt-to-output shot.

**Evidence:** Strong. DuetUI (N=24, p=.002 on usability). Multiple papers (IntentFlow, Park et al., NeuroSync) build mechanisms specifically for iteration. User quotes reinforce: "I don't expect it to get everything right in one go."

**But:** This may be an artefact of current LLM quality. If generation quality improves dramatically, one-shot might become acceptable for simple tasks. The evidence is also from controlled studies with motivated participants — real users may have less patience for iteration than study participants.

**Status:** Strong for current LLM capabilities. May weaken as models improve. The [[alignment-cost-tradeoff]] already captures this nuance — sometimes acting first is cheaper than specifying first.

---

## D. Adaptation and context assumptions

### D1. Accessibility adaptations should be deterministic, not LLM-driven

> "Accessibility adaptations → deterministic post-processing rules. You want reliable, auditable behaviour here, not LLM guesses."

**Claim:** [[content-structure-adaptation-split]] — structural accessibility adaptations (contrast, font size, layout) via rules; content adaptations (plain language simplification) via LLM with quality gates.

**Evidence:** Strong. Jerry et al. (2025) implement this split. OADAPT provides 30 WCAG-derived rules. [[normative-grounded-adaptation]] ensures auditability. The EU accessibility directive creates a regulatory incentive for deterministic, traceable adaptation.

**Status:** Strong. One of the better-supported assumptions. The split is clean and practical.

---

### D2. User context is a separate input, not embedded in prompts

> "The pipeline needs 'for whom' alongside 'what to build.'"

**Claim:** [[context-driven adaptation]] should be a distinct pipeline input (user profile, environment), not something the user includes in their prompt.

**Evidence:** Moderate. OADAPT argues for a separate semantic layer. [[cross-task-user-knowledge]] (InterQuest) shows persistent user preferences improve quality (87.50% vs. 57.63%). [[inferred-user-model]] (Viégas & Wattenberg) argues the system's beliefs about the user should be surfaceable.

**But:** In practice, current LLM-based systems handle user context as prompt context ("generate for an expert user") and it works reasonably well. The overhead of a separate user profile schema, adaptation rules, and reasoning engine may not be justified until the system is mature enough to benefit from it. This is an architecture-astronaut risk.

**Status:** Moderate in principle. Pragmatically, prompt-based context may be sufficient for v1. The separate layer becomes important when adaptation needs to be deterministic and auditable (accessibility), not when it's preference-based.

---

## E. Scope and priority assumptions

### E1. The rendering layer (json-render) is solved

> "This covers the UI specification → Rendered UI segment of the pipeline."

**Claim:** json-render is a sufficient foundation. The interesting problems are all upstream.

**Evidence:** Moderate. json-render works. The industry is converging on similar approaches (A2UI, Open-JSON-UI).

**But:** json-render is *one-way*. The synthesis acknowledges this but treats two-way binding as an incremental addition. It may be a fundamental rearchitecture. Also, json-render's catalog is narrow — extending it to support the patterns the upstream pipeline would need (overview+detail, dashboard layouts, kanban boards, timeline views) is non-trivial work that the synthesis doesn't account for.

**Status:** Moderate for the rendering principle. Weak for the specific tool. The gap between json-render's current capabilities and what the pipeline needs is larger than the synthesis implies.

---

### E2. The JELLY vision is the right north star

**Claim:** JELLY (Cao, Jiang & Xia, CHI 2025) — malleable, generative interfaces driven by task-driven data models — is what we're building towards.

**Evidence:** The entire vault is organised around this. 32 papers have been read through this lens.

**But:** JELLY is a research prototype from one lab. It's never been tested with real users doing real tasks over extended periods. The vision is compelling, but the vault may have confirmation-biased the literature review — papers were selected and interpreted for their relevance to JELLY's architecture, potentially missing alternative approaches that would suggest a different north star.

**Status:** Untested as a product direction. Strong as a research organiser. Worth periodically questioning whether JELLY's specific architecture (task-driven data models, NL + direct manipulation) is the right framing, or whether the evidence points somewhere adjacent.

---

### E3. The LLM agent as persistent operator is a future concern, not a current one

> "We don't need to build the LAUI layer now, but designing the engine to be hostile to it would be expensive to undo."

**Claim:** The LAUI vision ([[LLM agent UI as abstraction layer]]) — an agent that continuously mediates between user and system — is architecturally important but not yet a building priority.

**Evidence:** This is a scoping decision, not an empirical claim. The "don't be hostile to it" framing is prudent.

**But:** AG-UI, DuetUI, and the interaction-as-intelligence paper all suggest the agent layer is more central than "future concern" implies. DuetUI's [[bidirectional-context-loop]] *requires* a persistent agent. The runtime protocol (AG-UI) *assumes* one. If the pipeline is built without agent persistence, retrofitting it may be harder than the synthesis assumes.

**Status:** The scoping decision may be wrong. The evidence increasingly suggests the agent isn't a layer on top — it's the orchestrator. Building the pipeline without it may create the very "hostile to it" architecture the synthesis warns against.

---

## F. Implicit assumptions (not stated but load-bearing)

### F1. LLMs can reliably generate structured specs

Never directly stated, but the entire pipeline depends on it. Every stage assumes the LLM can produce valid, well-formed, semantically appropriate structured output.

**Evidence:** Weak for complex specs. Current LLMs can generate simple JSON. Whether they can reliably generate multi-component, relationally consistent UI specs that conform to a catalog schema, pattern library, and constraint rules — simultaneously — is undemonstrated. [[knowledge-graph-grounded-generation]] shows 15% improvement with grounding, implying baseline accuracy is insufficient.

**Status:** Critical untested assumption. The entire pipeline's viability depends on this.

---

### F2. The component catalog is stable enough to build on

The pipeline assumes a fixed catalog that all stages target. But component libraries evolve (new components, deprecated ones, changed APIs). The synthesis doesn't address catalog versioning, migration, or the impact of catalog changes on stored specs/overlays.

**Status:** Untested. Becomes important as soon as real specs are being stored and reused.

---

### F3. Task decomposition is language-agnostic

The entire pipeline works in English. Intent decomposition, semantic slots, pattern names, constraint rules — all assume English-language users and English-language domain knowledge. Multilingual support is never mentioned.

**Status:** Not a research assumption per se, but a scope constraint worth naming.

---

### F4. Single-user, single-task

The pipeline assumes one user generating one interface for one task. Collaborative generation (multiple users contributing intent), multi-task interfaces (dashboards combining several tasks), and handoff scenarios (one user generates, another uses) are out of scope.

**Status:** Acknowledged implicitly in the Shen et al. reading log ("single-user single-agent scope"). Worth naming explicitly as a boundary.

---

## Summary: what to watch

The strongest assumptions are:
- Specs should be declarative JSON (B4)
- Accessibility adaptations should be deterministic (D1)
- Iterative refinement beats one-shot (C4)
- The structured/unstructured bridge is central (A3)

The most fragile assumptions are:
- Three intermediate layers are worth the overhead (C2) — directly challenged by evidence
- The LLM is a pattern engine (B5) — feasibility depends on unmeasured pattern coverage
- Users want post-generation structural modification (A4) — weak evidence
- LLMs can reliably generate structured specs (F1) — critical and untested
- The rendering layer is solved (E1) — understated gap

The assumptions most likely to need revision:
- The agent as "future concern" (E3) — evidence says it's more central than assumed
- Design systems as pattern libraries (B3) — true at component level, false at task level
- Two LLM touchpoints (B6) — likely 5–8 in practice
- Chat first, instruments later (C3) — the evidence favours instruments from the start
