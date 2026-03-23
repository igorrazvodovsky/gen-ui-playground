# Docs

`docs/` is the system of record for this repository.

The goal is the same one described in OpenAI's harness-engineering write-up: keep `AGENTS.md` short, use it as a table of contents, and store the real repo knowledge in versioned files that agents can discover incrementally.

## What belongs here

- `VISION.md`: how this repo fits into the broader LLM-operable-interface program and which branch is active now.
- `ARCHITECTURE.md`: repository structure, package boundaries, and extraction rules.
- `DESIGN.md`: operating principles for an AI-first research codebase.
- `FRONTEND.md`: renderer decisions, UI experiment boundaries, and frontend integration notes.
- `PLANS.md`: milestone order and active near-term work.
- `exec-plans/`: longer-lived execution plans once work exceeds a quick change.

## Relationship to the rest of the repo

- `research/` is upstream evidence and concept work. It can be broader and more speculative than the implementation repo.
- `research/vision tree.md` is the parent scope. It frames the three-branch program the repo should keep in mind.
- `research/research-project.md` is the current Branch 2 focus.
- `docs/` translates that research into concrete build decisions.
- `domain/` contains the current target domain pack that experiments should use when they need realistic fixtures.
- `experiments/` contains runnable validations of the hypotheses described in `research/solution tree.md`.

## Maintenance rule

When one of these becomes stale, fix the doc in the same change that invalidates it. The repo should remain legible to a new agent without access to external context.
