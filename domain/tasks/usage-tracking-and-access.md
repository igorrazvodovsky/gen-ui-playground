# Usage Tracking And Access

## Purpose

Allow the right person to use the appliance and ensure the resulting usage is attributed to the correct billing target.

## Primary actors

- Master user
- Visitor user
- Alias user
- Private customer
- Business customer

## Core entities

- `appliance`
- `contract`
- `contract_role_assignment`
- `usage_event`

## Happy path

1. User starts a session on a specific appliance.
2. System identifies role and billing target.
3. Appliance runs a program and reports usage data.
4. Usage event is stored and tied to contract or master account.
5. User can review status, progress, and cost context.

## Key decisions

- Is a visitor explicitly logged in?
- Is the user an alias awaiting approval?
- Is the appliance online and able to report correctly?

## UI-relevant questions

- What must be visible before starting a cycle in a shared setting?
- How does the user understand whether this wash bills to self or to master?
- How should offline or delayed telemetry be represented?

## Failure and exception cases

- Visitor not logged in, so billing falls back to master
- Alias request not yet approved
- Appliance offline or disconnected
- Incorrect session-to-contract linkage

## Source basis

- `d5.1-iot-platform-supporting-smart-washing-machines.pdf`
- `d5.3-white-goods-demonstrator-documentation.pdf`

