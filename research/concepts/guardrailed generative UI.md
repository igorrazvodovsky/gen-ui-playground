---
type: concept
tags: [json-render, safety, specification]
sources: [json-render, "sources/llm-driven-accessible-interface"]
created: 2026-02-07
---
A three-layer safety model that makes AI-generated interfaces production-ready by constraining the generative space: (1) schema validation enforces prop types, (2) component whitelisting restricts what can be instantiated, (3) action constraints limit behavioural scope. The goal is predictable, safe rendering without requiring human review of every generated spec.

## Context

Unconstrained AI code generation is dangerous—models can hallucinate malicious code, make API calls with wrong parameters, or generate syntactically valid but semantically broken UIs. The standard solution is "human in the loop"—review everything before execution. But this breaks the promise of generative UI: direct generation from user intent.

Guardrails shift the constraint boundary upstream. Instead of asking "is this generated code safe?", the system asks "can the AI only generate safe things?" By limiting the output space (validated JSON specs, whitelisted components, predefined actions), the answer becomes "yes"—making human review optional rather than mandatory.

## Context (three layers)

1. **Schema validation**: Zod schemas enforce strict prop typing. If `Button` expects `{label: string, variant: 'primary'|'secondary'}`, specs with `variant: 'danger'` are rejected at runtime.

2. **Component whitelist**: AI can only reference components registered in the catalog. Attempting to generate `<CustomHackyComponent>` fails validation—it's not in the allowed set.

3. **Action constraints**: Predefined actions (via `catalog.prompt()`) limit what behaviours can be specified. If actions are `{onClick: 'submit'|'cancel'}`, the AI can't generate `onClick: 'deleteAllData'`.

Together, these ensure that **any valid spec is safe to render**.

Jerry et al. (2025) add a **fourth guardrail layer** for content adaptation: quality gates that verify LLM-generated content against normative standards. Where the first three layers guard *structural* output (valid JSON, known components, safe actions), [[adaptation-quality-gates]] guard *content* output (readable, semantically faithful, factually consistent). And [[normative-grounded-adaptation]] provides the audit trail — every adaptation traces to a specific accessibility standard clause.

## Connections

- **Requires** [[specification-based rendering]] — guardrails only work when UI is data (specs), not code
- **Requires** [[component catalog as schema]] — the catalog defines the whitelist and prop schemas
- **Complementary to** [[pattern]] — patterns provide structured constraints (typed variables, validation rules); catalog provides component-level constraints
- **Extended by** [[adaptation-quality-gates]] — a fourth guardrail layer for content adaptation: readability scoring, semantic fidelity, factual consistency. Guards the content dimension that schema/whitelist/action constraints don't cover.
- **Extended by** [[normative-grounded-adaptation]] — normative traceability adds auditability to the guardrail system. Not just "is this safe?" but "can we prove *why* this adaptation was applied?"
- **Informs** [[pattern-driven transformation]] — patterns must only reference catalog components to pass guardrail validation
- **Tension with** user agency/malleability — strict guardrails limit what's generatable. How do we balance safety and flexibility?
- **Relates to** [[tools-not-apps]] — guardrailed generation could enable users to build custom tools without programming (if guardrails are wide enough)
- **Contrast with** [[gentle slope]] — guardrails create a "safety plateau" rather than a slope. Users can do anything *within* the catalog, but jumping outside requires developer intervention.

## Relevance to project

Guardrails determine **what's generatable at each pipeline stage**. They constrain:

**Task analysis**: User prompts must map to tasks expressible within the component catalog. "Build me a kanban board" is only feasible if the catalog has drag-drop components—or if the system can compose primitives into kanban-like behaviour.

**Spec generation**: The mapping rules (data types → components) must respect catalog schemas. Can't map `date` type to a `Calendar` component if it doesn't exist or has incompatible props.

**Model evolution**: When user intent changes, updated specs must remain valid. If the user says "make it red" but `color` isn't a valid prop, the system needs a fallback strategy (reject? suggest alternatives? compose a solution?).

Critical question: **How wide should the guardrails be?** Too narrow = users hit walls constantly. Too wide = safety erodes. json-render doesn't prescribe this—catalog design is the developer's choice.

**Pattern libraries as guardrails**: Patterns add a semantic layer above catalog constraints. Instead of just "Button is valid", patterns say "In a Search context, use SubmitButton variant". This gives LLMs structured guidance within the guardrails.

- **Extended to agent actions by** [[frontend-defined tool execution]] — AG-UI adds a fourth guardrail dimension beyond schema validation, component whitelisting, and action constraints: constraining what actions the agent can *take* at runtime. The frontend defines available tools as JSON Schema; the agent can only request execution of declared tools. Action-space guardrails complementing the output-space guardrails.

## Open threads

- **Dynamic guardrails**: Can guardrails adapt per-user or per-task? (e.g., wider for power users, narrower for novices) **AG-UI suggests yes**: [[frontend-defined tool execution]] means tool availability is runtime-configurable. The frontend can add or remove tools based on user permissions, task context, or trust level — dynamic guardrails via dynamic tool sets.
- **Graceful degradation**: When a user request violates guardrails, how does the system respond? Reject? Suggest alternatives? Generate closest valid approximation?
- **Guardrail visibility**: Should users see the catalog (so they know what's possible), or should it be invisible (with the AI guiding them)?
- **Escape hatches**: Do users need ways to break guardrails safely (e.g., "custom code" blocks with sandboxing)? Or does that defeat the purpose?
