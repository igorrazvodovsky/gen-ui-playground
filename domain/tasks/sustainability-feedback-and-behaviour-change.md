# Sustainability Feedback And Behaviour Change

## Purpose

Turn usage data into understandable feedback that can influence customer behavior and support retention.

## Primary actors

- Private customer
- Business customer
- Manufacturer / platform owner

## Core entities

- `usage_event`
- `sustainability_report`
- `bill`

## Happy path

1. System derives usage insights from recent cycles.
2. Customer sees efficiency, program use, savings, or peer comparison.
3. Feedback is tied to recommendations, rewards, or price signals.
4. Customer changes behavior or preferences over time.

## Key decisions

- Which metrics are meaningful for the current user type?
- Should comparisons be against peer groups, own history, or optimal behavior?
- Should cost incentives be shown together with sustainability feedback?

## UI-relevant questions

- What feedback is actionable rather than ornamental?
- How do we avoid generic eco dashboards?
- When does operator-facing insight matter more than end-user feedback?

## Failure and exception cases

- User distrusts data collection
- Feedback is too abstract to change behavior
- Sustainability message conflicts with convenience or service expectations

## Source basis

- `d5.1-iot-platform-supporting-smart-washing-machines.pdf`
- `d6.6-lessons-learned-service-based-offering-of-washing-machines.pdf`

