---
milestone: M0
status: done
pipeline-segment: UI specification → Rendered UI
---
# M0 — AI-assisted rendering from component catalog

## Hypothesis

A JSON spec can drive a full component render with validation and safety guardrails.

## What was learned

[json-render](https://github.com/vercel-labs/json-render) confirms [[specification-based rendering]] works. The [[component catalog as schema]] pattern defines what's generatable. Three-layer guardrails ([[guardrailed generative UI]]) make it production-viable. [[streaming specification compilation]] handles latency.

## Constraints discovered

Everything upstream must produce specs that conform to catalog schemas. The catalog is the contract boundary.

## Related Concepts

- [[specification-based rendering]]
- [[component catalog as schema]]
- [[guardrailed generative UI]]
- [[streaming specification compilation]]
