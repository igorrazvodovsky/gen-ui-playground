# Monthly Billing And Cost Review

## Purpose

Aggregate usage into charges the customer and operator can understand and inspect.

## Primary actors

- Manufacturer / platform owner
- Business customer
- Private customer
- Master user
- Visitor user

## Core entities

- `usage_event`
- `billing_period`
- `bill`
- `contract`

## Happy path

1. System collects usage for the billing period.
2. Pricing logic is applied to each usage event.
3. Total cost is calculated per contract.
4. Bill is issued.
5. Customer reviews amount, period, and charge basis.

## Key decisions

- Which usage belongs to which contract?
- Which fixed and variable pricing elements apply?
- What data can still be retained after billing?

## UI-relevant questions

- Should users see per-cycle charges, aggregated totals, or both?
- How should shared billing be explained?
- Where do disputes or anomalies surface?

## Failure and exception cases

- Missing or delayed usage data
- Visitor and alias attribution confusion
- Payment failure or overdue bill
- Privacy limits on retained detail

## Source basis

- `d5.3-white-goods-demonstrator-documentation.pdf`
- `d6.6-lessons-learned-service-based-offering-of-washing-machines.pdf`

