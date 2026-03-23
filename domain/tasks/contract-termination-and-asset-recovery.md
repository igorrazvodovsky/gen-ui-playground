# Contract Termination And Asset Recovery

## Purpose

Close the commercial relationship while recovering the physical asset for reuse or removal.

## Primary actors

- Manufacturer / platform owner
- Business customer
- Private customer
- Logistics partner
- Refurbishment operator

## Core entities

- `contract`
- `appliance`
- `site`
- `refurbishment_cycle`

## Happy path

1. Customer or OEM requests termination.
2. Eligibility and timing are checked.
3. Pickup is scheduled.
4. Appliance is collected and contract is ended.
5. User data is handled under policy.
6. Appliance is inspected, cleaned, repaired, and either redeployed or dismantled.

## Key decisions

- Is termination allowed now?
- Can the appliance go straight to refurbishment?
- Is the asset viable for another lifecycle?

## UI-relevant questions

- How do operators see the gap between contract closure and asset recovery?
- What should customers see about pickup, reset, and final charges?
- How visible should circular outcomes be after return?

## Failure and exception cases

- Customer not available for pickup
- Appliance missing or inaccessible
- Contract dispute or unpaid charges
- Returned asset fails inspection

## Source basis

- `d5.1-iot-platform-supporting-smart-washing-machines.pdf`
- `d5.3-white-goods-demonstrator-documentation.pdf`
- `d6.1-non-technical-barriers-and-legal-issues.pdf`

