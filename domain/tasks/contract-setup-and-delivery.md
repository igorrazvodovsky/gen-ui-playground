# Contract Setup And Delivery

## Purpose

Turn user interest into an active service contract with a linked appliance at a real site.

## Primary actors

- Private customer
- Business customer
- Master user
- Strategic business unit
- Logistics partner

## Core entities

- `user_account`
- `contract`
- `contract_role_assignment`
- `site`
- `appliance`

## Happy path

1. User registers or signs in.
2. User chooses customer type and contract role.
3. System checks geography and stock availability.
4. User selects appliance and service options.
5. Contract is created.
6. Delivery and installation are scheduled.
7. Appliance is linked to the contract and site.
8. Contract becomes active.

## Key decisions

- Is the user private or business?
- Is the role master, visitor, or alias?
- Which appliance is available for the postal code?
- Which service package and payment options apply?

## UI-relevant questions

- What information is needed before showing available assets?
- How visible should stock and delivery constraints be?
- Should contract-role choice happen early or after appliance selection?

## Failure and exception cases

- No stock for location
- Incomplete identity or privacy choices
- Delivery cannot be scheduled
- Appliance installed but not linked correctly

## Source basis

- `d5.1-iot-platform-supporting-smart-washing-machines.pdf`
- `d5.3-white-goods-demonstrator-documentation.pdf`

