---
type: experiment
id: E1
solution: "[[Two-way reactive binding]]"
status: not-started
created: 2026-03-03
source: "[[solution tree]]"
---
# E1 — Round-trip binding

Build the simplest round-trip: a component rendered from a JSON spec where editing a value in the UI updates the spec, and spec changes re-render the component.

## What it validates

Reactive binding works with json-render's architecture.

## Setup

- Start with existing json-render output
- Add write-back path: UI edit → spec update
- Verify re-render picks up spec change
- Check for loops / infinite update cycles
