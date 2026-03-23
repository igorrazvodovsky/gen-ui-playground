---
type: experiment
id: E23
solution: "[[Vertical slice integration]]"
status: not-started
created: 2026-03-03
source: "[[solution tree]]"
---
# E23 — Vertical slice integration

A user describes a task, gets a generated UI, modifies it (changes a value, adds a field, restructures a view), and the system updates coherently. Not polished — just not broken.

## What it validates

Whether the full pipeline seams hold under end-to-end use.

## Key questions to answer

- Does a user edit propagate to the IR, the task model, or both?
- Full regeneration vs. incremental spec patching (JSON Patch deltas vs. full snapshots)?
- What happens when a user edit conflicts with the generated structure?

## Depends on

Most of E1–E16. At minimum: a working IR (E8 or E9), mapping rules (E13), and two-way binding (E1).
