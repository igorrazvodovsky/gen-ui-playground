# Source Map

This file explains which source documents currently ground the first-pass domain pack.

## Domain evidence

| File | Role in domain pack | Notes |
| --- | --- | --- |
| `domain/sources/recipss/d5.1-iot-platform-supporting-smart-washing-machines.pdf` | Business context, stakeholders, end-to-end use cases, early platform architecture | Strong source for actor and workflow definitions |
| `domain/sources/recipss/d5.3-white-goods-demonstrator-documentation.pdf` | Updated demonstrator architecture, backend information model, REST surface, operational flows | Strong source for entities, roles, and billing logic |
| `domain/sources/recipss/d6.6-lessons-learned-service-based-offering-of-washing-machines.pdf` | Market rollout variation, customer behavior, economic sensitivity, sustainability feedback, operational lessons | Strong source for scenarios, risks, and fixture variation |
| `domain/sources/recipss/d6.1-non-technical-barriers-and-legal-issues.pdf` | Legal and operational constraints, trust, non-payment, return and repossession concerns | Used mainly for rules and edge cases |
| `domain/sources/recipss/d2.3-circular-business-models-evaluation-reports.pdf` | Business-model risk framing, implementation uncertainty, organizational change | Used for higher-level risk and governance context |

## Research literature moved out of inbox

These are useful, but they are research references rather than direct domain evidence for the first pass.

| File | Placement | Reason |
| --- | --- | --- |
| `research/sources/full-text/digital-platforms-for-circular-economy.pdf` | Research vault | General research source on CE platforms |
| `research/sources/full-text/ontology-alignment-in-the-circular-economy.pdf` | Research vault | Research source on CE ontology alignment |

## Reliability notes

- Facts in `actors.yaml`, `entities.yaml`, `rules.yaml`, and `lifecycles.yaml` are either `source-backed` or explicitly marked as `synthesis`.
- Where ReCiPSS documents describe planned functionality rather than finished implementation, the pack keeps the domain concept but avoids overstating system completeness.

