# Maintenance, Repair, And Predictive Service

## Purpose

Move from raw issue detection to a resolved service outcome with minimal downtime.

## Primary actors

- Private customer
- Business customer
- Service operator
- Technician

## Core entities

- `appliance`
- `maintenance_case`
- `site`

## Happy path

1. Issue is detected by user report, machine error, schedule, or predictive signal.
2. Case is triaged.
3. User receives guidance or appointment options.
4. Technician visits if needed.
5. Appliance returns to service or is marked for replacement.

## Key decisions

- Can the user solve it without a visit?
- Is the case urgent enough to override scheduling norms?
- Is repair viable or should replacement happen?

## UI-relevant questions

- How much machine context should an operator see at triage time?
- What does the user need to decide between self-service and a visit?
- How should predictive alerts be explained without causing false alarm?

## Failure and exception cases

- User cannot reproduce issue
- Missing parts delay repair
- No appointment match
- Asset needs replacement rather than repair

## Source basis

- `d5.1-iot-platform-supporting-smart-washing-machines.pdf`
- `d5.3-white-goods-demonstrator-documentation.pdf`

