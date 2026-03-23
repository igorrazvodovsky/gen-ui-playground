# Domain Pack

This directory is the system of record for the target domain used in UI experiments.

Current domain:
`connected circular laundry service operations`, grounded in ReCiPSS white-goods material.

The intent is to give agents a small, inspectable knowledge base they can query before generating schemas, fixtures, tasks, or UI proposals.

## Layout

- `sources/`: raw source documents that justify domain facts.
- `knowledge/`: curated domain facts, roles, entities, rules, and lifecycles.
- `tasks/`: canonical workflows that should be representable in generated interfaces.
- `fixtures/`: small synthetic-but-plausible scenarios for experiments and evals.

## Working rules

1. Treat `knowledge/` as the agent-facing source of truth for this domain.
2. Treat `sources/` as evidence, not as the primary runtime interface.
3. Keep facts source-backed where possible. Mark synthesis clearly when multiple sources are combined.
4. Prefer stable domain concepts over UI-specific terms. Example: `maintenance_case` is a domain object; `ticket card` is a view choice.
5. Keep the domain narrow enough to stay legible

## Current boundaries

In scope:

- Connected washing-machine service offering
- Contract creation and delivery
- Usage tracking and access control
- Billing and cost review
- Maintenance, predictive service, and repair
- Contract termination, pickup, refurbishment, and redeployment
- Sustainability feedback as part of user-facing service

Out of scope for the first pass:

- Full legal modeling by country
- Detailed ERP or SAP schemas
- Component mappings
- Formal ontology work
- Non-laundry product categories

