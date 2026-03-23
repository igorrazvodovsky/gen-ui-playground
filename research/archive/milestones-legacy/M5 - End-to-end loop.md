---
milestone: M5
status: not started
pipeline-segment: Full pipeline with feedback
depends-on:
  - "[[M1 - Two-way binding]]"
  - "[[M4 - LLM to spec generation]]"
---

# M5 — End-to-end loop

## Hypothesis

The pieces (M1–M4) compose into a working loop: prompt → generate → render → user edits → model update → re-render.

## Why this matters

The individual pieces might each work but fail to compose. This milestone tests the seams — especially the feedback path (user edits → model evolution → spec regeneration).

## What "done" looks like

A user describes a task, gets a generated UI, modifies it (changes a value, adds a field, restructures a view), and the system updates coherently. Not polished — just not broken.

## Open questions

- When a user edits the UI, does the change propagate to the IR, the task model, or both?
- Full regeneration vs. incremental spec patching?
- How does the system handle contradictions (user edit conflicts with generated structure)?
- What does the [[gentle slope]] look like in practice — can a user go from tweaking values to modifying the IR to editing the prompt?

## Informed by

Everything. This is the integration test.

## Related Concepts

- [[gentle slope]]
- [[emergent workflow]]
- [[json-document-backed-components]]
- [[shared data layer]]
- [[LLM-operable interface]]
- [[in-place toolchain]]
- [[tools-not-apps]]
- [[UI composition]]
