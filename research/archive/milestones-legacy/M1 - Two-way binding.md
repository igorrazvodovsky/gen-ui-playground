---
milestone: M1
status: not started
pipeline-segment: Rendered UI ↺ UI specification
depends-on:
  - "[[M0 - AI-assisted rendering from component catalog]]"
---

# M1 — Two-way binding

## Hypothesis

json-render can be made bidirectional — user edits in the UI flow back to update the spec, and spec changes re-render the UI.

## Why this matters

Without this, the system is a one-shot generator, not a malleable tool. [[json-document-backed-components]] shows the pattern: React components backed by shared JSON documents, reading and writing. json-render currently only reads.

## What "done" looks like

A component rendered from a JSON spec where changing a value in the UI (e.g. editing a text field, toggling a switch) updates the underlying spec, and changing the spec re-renders the component. The simplest possible round-trip.

## Open questions

- Where does spec state live? In-memory JSON? A reactive store? A CRDT document?
- How granular are updates? Full spec replacement or surgical patches?
- What happens when a user edit would violate the catalog schema?

## Informed by

- Malleable Software — DFRP pattern
- Varv — declarative data structures
- DuetUI — bidirectional co-generation

## Key blockers

Need to understand Varv + DFRP patterns more deeply

## Related Concepts

- [[json-document-backed-components]]
- [[shared data layer]]
- [[component catalog as schema]]
- [[gentle slope]]
