# Invariants

This file records domain truths that appear stable across implementation choices.

These are not "what ReCiPSS happened to build". They are the things a future solution still has to preserve even if the software architecture changes completely.

The split follows the distinction from [task-model.md](../../research/concepts/task-model.md) and [domain-data-model.md](../../research/concepts/domain-data-model.md):

- task model: what people need to do
- domain model: what the world contains and constrains
- software landscape: one historically contingent implementation of those needs

## How to use this file

1. Use these invariants to judge whether a new agent-native concept still solves the same domain problem.
2. Do not infer incumbent UI or system boundaries from them.
3. If an item here is violated, the redesign is likely solving a different problem.

## Stable problem truths

### 1. The OEM-owned asset and the customer relationship are separate

The service model depends on the manufacturer retaining ownership of the appliance while the customer pays for use and service.

Why this looks stable:

- It is the core economic shift in the ReCiPSS demonstrator.
- It is what makes pickup, replacement, refurbishment, and redeployment necessary.

Implication for new solutions:

- Any future UI or agent flow must model the physical asset lifecycle separately from the commercial relationship.

Primary evidence:

- `d5.1-iot-platform-supporting-smart-washing-machines.pdf`
- `d5.3-white-goods-demonstrator-documentation.pdf`

### 2. Identity, access, and billing responsibility are not the same thing

The domain distinguishes master, visitor, and alias behavior. The person who uses the machine, the person who is authorised, and the person or organisation billed are not always identical.

Why this looks stable:

- Shared usage is central in laundry rooms, hotels, and similar contexts.
- The domain logic breaks if usage attribution is reduced to a single user account.

Implication for new solutions:

- Any redesign must keep access control, session identity, and billing attribution as separate concepts.

Primary evidence:

- `d5.1-iot-platform-supporting-smart-washing-machines.pdf`
- `d5.3-white-goods-demonstrator-documentation.pdf`

### 3. Contract lifecycle and appliance lifecycle must both be visible

The service depends on two parallel state machines:

- commercial state: contract draft, active, suspended, terminated
- physical state: stocked, deployed, under service, returned, refurbished, redeployed, dismantled

Why this looks stable:

- Contract completion does not imply asset recovery is complete.
- Asset recovery and refurbishment are part of the business model, not back-office noise.

Implication for new solutions:

- User and operator tooling must be able to represent both lifecycles and their points of coupling.

Primary evidence:

- `d5.1-iot-platform-supporting-smart-washing-machines.pdf`
- `d5.3-white-goods-demonstrator-documentation.pdf`
- `d6.1-non-technical-barriers-and-legal-issues.pdf`

### 4. Usage data is operationally necessary, but privacy and retention still constrain it

The system needs usage information to bill, diagnose, and generate sustainability feedback. At the same time, customer trust, consent, and retention policy limit what can be stored and reused.

Why this looks stable:

- Billing without usage data is impossible in the demonstrator model.
- The legal and trust issues are domain-level, not framework-level.

Implication for new solutions:

- Telemetry should be treated as a governed domain resource, not just raw app state.

Primary evidence:

- `d5.3-white-goods-demonstrator-documentation.pdf`
- `d6.1-non-technical-barriers-and-legal-issues.pdf`

### 5. Maintenance is part of the product, not an exception path

Support, scheduled service, predictive maintenance, repair, and replacement are part of the normal value proposition.

Why this looks stable:

- Long-lived appliances only make business sense if service operations are integrated.
- The customer experience and business economics both depend on uptime.

Implication for new solutions:

- Service triage and repair flows should be first-class task models, not admin-only add-ons.

Primary evidence:

- `d5.1-iot-platform-supporting-smart-washing-machines.pdf`
- `d5.3-white-goods-demonstrator-documentation.pdf`
- `d6.6-lessons-learned-service-based-offering-of-washing-machines.pdf`

### 6. Shared usage is a primary context, not an edge case

Multi-apartment laundry rooms, hotels, dorms, and small businesses are core deployment settings.

Why this looks stable:

- The commercial rationale is especially strong in shared-use contexts.
- Shared usage introduces booking, session, attribution, and support needs that are structurally different from a single household.

Implication for new solutions:

- Any domain model or task model that assumes one user per asset is too weak for this domain.

Primary evidence:

- `d5.1-iot-platform-supporting-smart-washing-machines.pdf`
- `d5.3-white-goods-demonstrator-documentation.pdf`
- `d6.6-lessons-learned-service-based-offering-of-washing-machines.pdf`

### 7. Sustainability is not just branding; it changes product and service logic

The circular objective affects:

- appliance durability
- repairability and refurbishment
- pricing and behavior shaping
- user feedback
- environmental reporting

Why this looks stable:

- ReCiPSS exists to test a circular business model, not just a subscription business.
- The economic and environmental arguments are coupled.

Implication for new solutions:

- Circularity data and sustainability feedback belong in the domain model, not just in marketing copy.

Primary evidence:

- `d5.1-iot-platform-supporting-smart-washing-machines.pdf`
- `d6.6-lessons-learned-service-based-offering-of-washing-machines.pdf`

### 8. Retention risk is structurally important

The business has high early capital and operational cost, while value is recovered over time through continued use and repeat lifecycles.

Why this looks stable:

- The lessons-learned report treats contract duration and customer retention as major determinants of success.

Implication for new solutions:

- Signals of satisfaction, churn risk, unresolved friction, and value perception are part of the operational problem.

Primary evidence:

- `d6.6-lessons-learned-service-based-offering-of-washing-machines.pdf`
- `d2.3-circular-business-models-evaluation-reports.pdf`

## Research interpretation

These invariants support several research notes directly:

- [task-model.md](../../research/concepts/task-model.md): what users need to do should be modeled independently from incumbent screens or app modules.
- [domain-data-model.md](../../research/concepts/domain-data-model.md): the domain pack should preserve entities, relationships, and constraints without committing to a particular UI.
- [knowledge-graph-grounded-generation.md](../../research/concepts/knowledge-graph-grounded-generation.md): the LLM should query these facts rather than improvise domain logic.

## What is intentionally not invariant here

The following are important, but not assumed stable:

- the exact role taxonomy if a cleaner one preserves the same billing and access semantics
- the exact contract packaging or pricing formula
- the exact system boundaries between commerce, IoT, and service systems
- any particular frontend structure such as separate webstore versus operator app

