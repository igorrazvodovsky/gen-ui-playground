---
type: outcome
scope: generative-ui
created: 2026-03-03
source: "[[solution tree]]"
---
**Users describe a task in natural language → get a working, modifiable UI → the system evolves as their needs change.**

This is the JELLY vision. The pipeline is the architectural hypothesis for how to get there:

```
User prompt → Task analysis → Task-driven data model → UI specification → Rendered UI ↺ User modification → Model evolution
```

The opportunities below map to gaps in this pipeline — places where we don't yet know if or how the thing works. This outcome sits within the broader [[LLM operable interfaces|LLM-operable interfaces outcome]] as Branch 2.

## Opportunities

- [[Generated UIs are disposable|O1 — Generated UIs are disposable]] — the biggest experiential gap
- [[The gap between user task and component spec is too wide|O2 — The gap between user task and component spec is too wide]]
- [[The system has no design taste|O3 — The system has no design taste]]
- [[Natural language can't reliably become structured task models|O4 — Natural language can't reliably become structured task models]]
- [[The end-to-end loop doesn't cohere|O5 — The end-to-end loop doesn't cohere]]

## Validated so far

| Area | Status |
|------|--------|
| Spec → Rendered UI | ✅ Validated (json-render) |
| Accretive overlay pattern | 📖 Researched, not built |
| Abstract/concrete separation | 📖 Researched, not built |
| Semantic intermediate layer | 📖 Researched, not built |
| Intent decomposition | 📖 Researched, not built |
| Knowledge-grounded generation | 📖 Researched, not built |
| Two-way binding (DFRP) | 📖 Researched, not built |
| Runtime protocol (AG-UI) | 📖 Researched, not built |
| IR design | ❓ Open |
| Design mapping rules | ❓ Open |
| LLM → structured task model | ❓ Open |
