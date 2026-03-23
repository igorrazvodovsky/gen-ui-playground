# Frontend

## Current frontend decision

Use `json-render` as the first frontend dependency and validate it in a dedicated experiment before building higher-order generation logic.

This is explicitly a Branch 2 decision inside the broader vision. It should not be mistaken for the whole repository mission.

The rationale is direct:

- `research/research-project.md` identifies `json-render` as the concrete starting point for the `UI specification -> rendered UI` segment.
- `json-render` supports hand-authored specs, streamed specs, state bindings, and a React renderer.
- Its docs already include an AG-UI integration path, which matches the longer-term protocol direction in `research/synthesis.md`.

## First experiment

`experiments/json-render-lab`

Purpose:

- render one reusable hand-authored spec against multiple domain-task states,
- keep the spec and state visible for inspection,
- validate the dependency and local workflow,
- and establish a base before testing two-way binding.

This experiment is intentionally not using live model generation yet. The missing research questions are upstream of rendering, so the first step should isolate the renderer slice rather than hide uncertainty behind an LLM call.

The newest research sharpens that upstream boundary: the next non-frontend work is not "generic AI generation," but a task-model layer with JTBD-enriched goals, satisfying tasks, and CQ-backed schemas. Frontend work should stay generic enough to receive that compiler output later rather than baking in app-specific assumptions now.

## Near-term frontend sequence

1. Renderer baseline: hand-authored spec + domain-shaped state
2. Two-way binding: verify that UI edits can write back into state/spec safely
3. Overlay or patch model: preserve user changes across regeneration
4. Task-model compiler handoff: accept spec/state generated from an explicit goal/task IR rather than only hand-authored fixtures
5. Agent/UI runtime integration: connect spec/state changes to AG-UI or similar event streams

## Frontend constraints

- Keep visual structure intentional but simple.
- Make inspectable artifacts first-class: rendered UI, input state, and current spec should all be easy to inspect.
- Prefer local fixtures over hidden API requirements for early experiments.
- Avoid renderer assumptions that would block a future goal/task IR compiler from targeting the same surface.
- Add shared UI code only after multiple experiments need it.
