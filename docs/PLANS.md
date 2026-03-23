# Plans

These are the active **Branch 2** milestones. They sit inside the broader vision from `docs/VISION.md`, but they do not attempt to schedule all branches at once.

## Current milestone order

### M0. Repository bootstrap

Initialize the repo as an agent-friendly workspace:

- root Git repo,
- short `AGENTS.md`,
- `docs/` as the system of record,
- workspace tooling,
- first runnable dependency integration.

### M1. Renderer baseline

Validate the `UI specification -> rendered UI` segment with `json-render`.

Success looks like:

- one reusable spec,
- multiple domain-shaped state fixtures,
- visible validation status,
- a local run path with no external API dependency.

### M2. Two-way binding

Address the first major research gap from `research/solution tree.md`: generated UIs are disposable unless changes can propagate. This milestone should focus on the smallest credible write-back loop.

### M3. Task-model IR

Take the now-sharper S7 direction seriously:

- define a CQ-backed task model shape,
- represent JTBD-enriched goals separately from satisfying tasks,
- and prove that the IR is expressive enough to compile into useful specs.

### M4. Mapping rules

Move one step downstream from the IR: task/domain structures to UI spec generation rules. Do not start here before M3 is legible.

### M5. Vertical slice

Combine task framing, structured model, renderer, and refinement into one narrow end-to-end flow in the current domain.

## Immediate next actions

- Keep the `json-render` lab working.
- Turn the new ReTaMeta/JTBD research into an explicit task-model experiment plan.
- Record experiment findings in repo docs as soon as the baseline is exercised.
- Create execution plans in `docs/exec-plans/` when work spans multiple commits or branches.

## Cross-branch note

Branch 1 work is allowed when it directly de-risks shared infrastructure for Branch 2. Branch 3 remains out of active planning until Branch 1 and Branch 2 produce stronger reusable primitives.
