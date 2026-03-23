---
milestone: M4
status: not started
pipeline-segment: User prompt → Task analysis → Task-driven data model
depends-on:
  - "[[M2 - Intermediate representation design]]"
  - "[[M3 - Mapping rules (data types to components)]]"
---

# M4 — LLM → spec generation

## Hypothesis

An LLM can take a natural-language task description and produce a valid IR (from M2) that compiles to working json-render specs (via M3 mapping rules).

## Why this matters

This is where the system becomes generative. Everything before this is hand-authored infrastructure. This milestone closes the gap between "user says something" and "UI appears."

## What "done" looks like

A prompt + LLM call that takes "help me plan a dinner party" and produces an IR that, when compiled through the mapping rules, renders a usable interface. Evaluate on the same 3–5 example tasks used in M2.

## Open questions

- What does the LLM prompt look like? Does it receive the catalog schema as context?
- How do you validate the output? Schema validation catches structural errors, but can it catch semantic errors (e.g. mapping a person's name to a number input)?
- Single-shot generation or iterative refinement?
- How does the IR design (M2) affect generation quality?

## Informed by

- Papers 11–16 (intent, co-creation, AI instruments)
- 18 (ontology + LLM integration)
- 19 (JELLY's generation approach)

## Key blockers

Need IR + mapping rules as generation target

## Related Concepts

- [[LLM agent UI as abstraction layer]]
- [[LLM-operable interface]]
- [[emergent workflow]]
- [[ontology-driven UI generation]]
- [[abstraction-to-concrete mapping]]
- [[guardrailed generative UI]]
