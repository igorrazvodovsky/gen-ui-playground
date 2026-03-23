---
type: concept
tags: [generative-ui, intent, data-model, model-evolution]
sources: ["sources/malleable-overview-detail", "sources/meridian-overview-detail"]
created: 2026-02-13
---
Using an LLM not to generate entire interfaces but to transform individual data attributes into task-appropriate presentations. A user prompt ("is this a good deal?") + source data (price, reviews, location, comparable listings) → LLM produces a new derived attribute ("value score: 8/10 — below average price for this area, strong reviews"). The LLM operates at the attribute level, not the UI level.

## Context

The genUI pipeline as currently sketched uses the LLM for macro-level tasks: analysing user intent, selecting patterns, generating specs. AI attribute reformulation uses the LLM for a much more granular job: taking raw data fields and producing user-meaningful derived values. This is closer to how LLMs are used in data analysis pipelines (summarise, classify, extract) than in UI generation.

Meridian implements this as an `aiReformulate` field in the attribute config:

```json
{
  "name": "value_assessment",
  "sources": ["price", "reviews", "location", "comparable_prices"],
  "aiReformulate": {
    "prompt": "Assess whether this is a good deal compared to similar listings. Return a score out of 10 and a one-sentence explanation.",
    "outputType": "badge"
  }
}
```

The output is a new attribute value that's rendered like any other attribute — using the display type and formatter specified in the config. The LLM call happens at data-fetch time, not at UI-generation time. This is a fundamentally different timing from spec generation.

The formative study found this was one of the most valued customisation capabilities. Users wanted attributes that *don't exist in the raw data*: walkability scores (derived from distance, transit, neighbourhood), deal assessments (derived from price comparisons), personalised relevance scores (derived from matching against their stated criteria). These require semantic understanding of the data — exactly what LLMs provide.

## Connections

- **Enabled by** [[fluid-attributes]] — reformulation is only possible because attributes are first-class objects with explicit source mappings. Without the attribute abstraction, there's no natural place to attach a reformulation prompt.
- **Different LLM role from** [[pattern-driven transformation]] — pattern transformation uses the LLM for structural decisions (what UI to build). Attribute reformulation uses the LLM for data decisions (what values to compute). These are separate pipeline stages with different timing, different prompts, and different failure modes.
- **Extends** [[knowledge-graph-grounded-generation]] — reformulation is grounded generation at the attribute level. The LLM receives specific data fields (grounding) and produces a specific typed output (constrained generation). This is more reliable than open-ended generation because the input and output are tightly scoped.
- **Relates to** [[context-driven adaptation]] — reformulation prompts can be personalised. "Assess this hotel for a family with young children" produces different results from "assess this hotel for a solo business traveller." User context → reformulation prompt → personalised attribute values.
- **Supports** [[structured vs unstructured tension]] — raw data is structured (price: 150, rating: 4.2). The reformulated output is structured too (score: 8, explanation: "..."). But the *transformation* passes through the unstructured domain (natural language prompt → LLM reasoning → typed output). The LLM bridges structured-to-structured via unstructured.
- **Tension with** [[guardrailed generative UI]] — reformulated attributes introduce LLM outputs into the rendered UI. If the LLM hallucinates a "value score" based on incorrect reasoning, the user sees wrong information presented with the same confidence as real data. Guardrails need to extend to data-level generation, not just spec-level.

## Practical implementations

- **Notion AI properties** — auto-fill database properties using AI (summarise, classify, extract from page content). The closest existing implementation.
- **Airtable AI fields** — AI-generated column values based on other columns.
- **Google Sheets AI functions** — `=AI("summarise this row")` style computed cells.
- **Databricks AI Functions** — SQL functions that call LLMs for per-row transformations.
- **Pandas + LLM pipelines** — `df.apply(lambda row: llm.transform(row))` pattern in data science workflows.

## Relevance to project

This suggests the pipeline should have **two LLM touchpoints**, not one:

1. **Spec generation** (design-time) — LLM analyses task, selects patterns, generates UI structure. Runs once when the interface is created.
2. **Attribute reformulation** (data-time) — LLM transforms data values for display. Runs per data item, potentially continuously as data updates.

These have very different requirements. Spec generation needs to understand UI patterns and produce valid specs. Attribute reformulation needs to understand data semantics and produce typed values. Different prompts, different models (reformulation could use a smaller, faster model), different caching strategies.

For json-render: the current renderer expects static prop values. Attribute reformulation means some prop values are *computed asynchronously* — the renderer needs to handle loading states, errors, and updates for AI-derived attributes. This is a new requirement.

**Practical immediate value**: Even before building the full pipeline, attribute reformulation could be added to json-render as a prop-level feature. Components receive a mix of static props (from the spec) and dynamic props (from LLM reformulation). This would demonstrate the value of AI in UI without requiring the full upstream pipeline.

## Open threads

- **Latency**: AI reformulation adds LLM inference time per attribute per data item. For a list of 50 items with 3 reformulated attributes, that's 150 LLM calls. Caching, batching, and pre-computation strategies are essential.
- **Trust**: How do users know which attributes are raw data vs. AI-generated? Meridian doesn't visually distinguish them. Should there be an indicator? A confidence score?
- **Prompt iteration**: The developer study found that writing good reformulation prompts required trial and error. How does the system help users (not just developers) write effective prompts?
- **Consistency**: The same reformulation prompt may produce different results for similar items. How do you ensure that "value score" means the same thing across all listings?
- **Cost**: Per-item LLM calls at scale could be expensive. When does it make sense to pre-compute and cache vs. compute on demand?
