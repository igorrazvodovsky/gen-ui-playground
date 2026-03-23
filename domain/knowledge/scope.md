# Scope

## Domain statement

The first target domain is not "washing machines" in isolation.

It is:

`circular product-service operations for connected laundry assets`

with ReCiPSS pay-per-use washing machines as the grounding case.

## Why this domain

This slice is narrow enough to model clearly and broad enough to generate several distinct UI families:

- contract and onboarding flows
- fleet and site operations
- usage and billing views
- maintenance and service work
- return, refurbishment, and redeployment flows
- sustainability and behavior feedback

## Core question the domain pack should answer

Given a user, role, site, contract state, appliance state, and recent events, what information and actions should be surfaced now?

## In-scope concepts

- OEM-owned appliance fleet
- Pay-per-use contracts and contract roles
- Shared and private usage contexts
- Telemetry and usage events
- Monthly charging and cost review
- Error handling, predictive maintenance, and service scheduling
- Asset return, cleaning, refurbishment, reuse, and end-of-life handling
- Sustainability-oriented feedback derived from usage data

## Out-of-scope concepts

- Generic circular-economy marketplaces
- Cross-industry ontology alignment
- Formal legal compliance engines
- Full pricing optimization
- Detailed accounting implementation
- Low-level IoT protocol design

## Canonical users

- OEM business owner
- Business customer or landlord
- Private end customer
- Visitor or alias user in shared settings
- Service operator and technician
- Logistics and refurbishment operators

## Domain design principles

1. Model ownership, responsibility, and billing separately. They do not always belong to the same person.
2. Distinguish the physical asset lifecycle from the contract lifecycle.
3. Treat shared usage as first-class, not as an edge case.
4. Keep sustainability features tied to concrete usage data and pricing consequences.
5. Preserve circularity operations as part of the domain, not as afterthoughts.

## Primary UI surfaces implied by the domain

- Contract setup and eligibility
- Appliance detail and telemetry
- Shared-site fleet overview
- Billing review and dispute inspection
- Maintenance queue and case detail
- Pickup and refurbishment workflow board
- User-facing sustainability feedback

## Open modeling questions

- How much of pricing logic should be explicit in the domain pack versus deferred to later experiments?
- Should visitor and alias behavior be represented as distinct contract entities or as role assignments on a single contract model?
- How much cross-country variation matters in the first pass?

