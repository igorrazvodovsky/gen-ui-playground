# Opportunity Deltas

This file records where the project should stay grounded in the ReCiPSS problem while remaining open to software shapes that were not available or natural before LLM-era systems.

Each delta separates:

- stable problem to preserve
- incumbent ReCiPSS-style solution
- agent-native opportunity suggested by the research notes

## How this connects to the tree

The relevant guidance comes from:

- [solution tree.md](../../research/solution%20tree.md)
- [Task-driven data model.md](../../research/opportunities/Task-driven%20data%20model.md)
- [Hand-author IRs for 3-5 tasks.md](../../research/opportunities/Hand-author%20IRs%20for%203%E2%80%935%20tasks.md)
- [Business domain task decomposition.md](../../research/opportunities/Business%20domain%20task%20decomposition.md)
- [Domain-specific end-to-end.md](../../research/opportunities/Domain-specific%20end-to-end.md)

The tree implies a clear order:

1. ground the agent in structured domain knowledge
2. validate task decomposition and task-driven IRs
3. only later test end-to-end generative UI seams

## Delta 1 - From product checkout to task-grounded service setup

Stable problem:

- the user must establish a valid service contract under stock, geography, and service constraints

Incumbent shape:

- commerce-style web store and checkout flow

Agent-native opportunity:

- treat onboarding as task decomposition over the domain pack
- derive the required information dynamically from role, location, site type, and appliance availability
- surface assumptions explicitly before commitment

Research basis:

- [task-model.md](../../research/concepts/task-model.md)
- [knowledge-graph-grounded-generation.md](../../research/concepts/knowledge-graph-grounded-generation.md)
- [Business domain task decomposition.md](../../research/opportunities/Business%20domain%20task%20decomposition.md)

What this suggests experimentally:

- hand-author one onboarding task model and IR before designing a fixed checkout UI

## Delta 2 - From role-specific app silos to shared task surfaces

Stable problem:

- different actors need different capabilities and visibility

Incumbent shape:

- separate web store, mobile app, cloud web app, service applications, enterprise tools

Agent-native opportunity:

- a shared structured state with role- and task-dependent views generated from one domain model
- UI surfaces assembled per task rather than per application silo

Research basis:

- [domain-data-model.md](../../research/concepts/domain-data-model.md)
- [shared data layer.md](../../research/concepts/shared%20data%20layer.md)
- [tools-not-apps.md](../../research/concepts/tools-not-apps.md)

What this suggests experimentally:

- compare one domain scenario rendered as separate role apps versus a single task-grounded surface with role-based disclosure

## Delta 3 - From rigid forms to inspectable intermediate artefacts

Stable problem:

- the system must transform ambiguous business intent into a correct operational structure

Incumbent shape:

- fixed forms and fixed backend operations hidden behind conventional UI steps

Agent-native opportunity:

- make the task decomposition and task-driven data model visible and editable before compilation
- use an explicit intermediate artefact rather than a black-box jump from prompt to screen

Research basis:

- [Task-driven data model.md](../../research/opportunities/Task-driven%20data%20model.md)
- [Hand-author IRs for 3-5 tasks.md](../../research/opportunities/Hand-author%20IRs%20for%203%E2%80%935%20tasks.md)
- [semantic-intermediate-layer.md](../../research/concepts/semantic-intermediate-layer.md)

What this suggests experimentally:

- the next experiment should be a hand-authored IR exercise grounded in ReCiPSS tasks, not a polished UI generator

## Delta 4 - From fixed workflow routing to agent-assisted service orchestration

Stable problem:

- maintenance and repair require triage, scheduling, guidance, and context-sensitive decisions

Incumbent shape:

- service operator, call centre, SAG-style service workflow, and separate support tools

Agent-native opportunity:

- the agent assists with triage, case summarisation, appointment suggestions, and explanation of why a case is classified a certain way
- the UI can adapt by trigger type: user request, machine error, predictive alert, scheduled maintenance

Research basis:

- [task-model.md](../../research/concepts/task-model.md)
- [knowledge-graph-grounded-generation.md](../../research/concepts/knowledge-graph-grounded-generation.md)
- [solution tree.md](../../research/solution%20tree.md) under O5 and O4

What this suggests experimentally:

- make maintenance one of the first three hand-authored task-driven IRs

## Delta 5 - From hidden billing logic to legible attribution

Stable problem:

- charges must map correctly from usage to billing target under master, visitor, and alias behaviour

Incumbent shape:

- backend attribution rules and monthly bill generation with limited explanation at the user-facing layer

Agent-native opportunity:

- present attribution, assumptions, and exceptional cases as inspectable artefacts
- show why a cycle billed to a given contract, not just the final amount

Research basis:

- [outcome-oriented-verification.md](../../research/concepts/outcome-oriented-verification.md)
- [intent-output-traceability.md](../../research/concepts/intent-output-traceability.md)
- [solution tree.md](../../research/solution%20tree.md) under post-generation verification and quality gates

What this suggests experimentally:

- the billing attribution task is a strong early slice because it tests whether the IR can represent subtle domain semantics

## Delta 6 - From system integration as plumbing to domain knowledge as the first-class interface

Stable problem:

- the domain needs structured knowledge to avoid invalid decomposition and invalid actions

Incumbent shape:

- enterprise integration through backend services and APIs

Agent-native opportunity:

- expose domain schemas, glossary, rules, and task primitives as the first layer the LLM sees
- let the agent query structured repository knowledge before proposing UI or operations

Research basis:

- [knowledge-graph-grounded-generation.md](../../research/concepts/knowledge-graph-grounded-generation.md)
- [Knowledge-grounded task decomposition.md](../../research/opportunities/Knowledge-grounded%20task%20decomposition.md)

What this suggests experimentally:

- use the new `domain/knowledge` pack as the prompt-time knowledge store in E18-style decomposition tests

## Delta 7 - From app recreation to concept comparison

Stable problem:

- the domain still needs workable service operations and modifiable user-facing tools

Incumbent shape:

- reproduce the ReCiPSS system landscape as a modernised set of apps

Agent-native opportunity:

- treat ReCiPSS as a baseline and contrast class, not as the architecture to clone
- compare multiple solution shapes against the same invariant domain problem

Research basis:

- [software-landscape.md](./software-landscape.md)
- [invariants.md](./invariants.md)
- [solution tree.md](../../research/solution%20tree.md)

What this suggests experimentally:

- evaluate whether an agent-native concept solves the same invariant domain problem better, not whether it looks like the incumbent stack

## Immediate implication for next work

The next natural experiment is:

1. choose 3 ReCiPSS-grounded tasks
2. hand-author task models for them
3. hand-author task-driven data model IRs for them
4. compare those against LLM decompositions using the domain pack as structured context

That sequence is directly grounded in:

- S7 / E8 for the IR
- E18 for knowledge-grounded task decomposition
- and it deliberately avoids jumping too early to E23, which the tree says depends on earlier seams being validated first

