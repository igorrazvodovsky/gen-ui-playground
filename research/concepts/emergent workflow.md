---
type: concept
tags: [interaction-paradigm, user-agency]
sources: [sources/lit-laui]
created: 2026-02-07
---
A workflow is how a user interacts with an application — the scheme, protocol, or pattern of usage. In conventional design, workflows are imagined at design-time: the designer explores the configuration space, picks some good patterns, builds a GUI around them, and the user learns to use it. Emergent workflows invert this: they arise at use-time from the intersection of the system's capabilities and the user's actual needs, discovered collaboratively by the user and an LLM agent.

## Context

The conventional approach has three drawbacks: (1) the design is limited by what the designer can imagine and test, (2) it provides one standard interface for everyone, and (3) usability depends on the user's willingness to learn the system. More information is available at use-time than at design-time — the user's specific goals, preferences, skill level, current context. An agent that can reason about both the system's capabilities and the user's situation can discover workflow configurations that no human designer would have pre-designed, because they're specific to *this* user in *this* moment.

The Flute X GPT example: the agent noticed a student was blowing during rests (a behaviour never anticipated at design-time) and improvised a corrective workflow. The configuration space of Music X Machine is too large for exhaustive design-time coverage, but an agent with system knowledge and user observation can navigate it on the fly.

## Connections

- Operationalises [[LLM agent UI as abstraction layer]] — emergent workflow is what the LAUI layer actually *does*. LAUI is the mechanism; emergent workflow is the outcome.
- Extends [[structured vs unstructured tension]] — the tension applies at the workflow level too. User needs are unstructured (vague goals, preferences, context). System capabilities are structured (configurations, settings, modes). The agent's job is to bridge this gap not just once (at generation time) but continuously (at use-time).
- Informs the **customisation loop** in the pipeline (`End-user customisation → Model evolution → UI update`). Emergent workflow is precisely what should happen in this loop: the user expresses a changed need, the agent navigates the model/spec/catalog space to find a new configuration, the UI updates.
- **Motivated by** [[high-dimensional-configuration-space]] — emergent workflows exist because the configuration space is too large for design-time coverage. Presets and patterns cover common regions; emergent workflows fill the gaps between them.
- **Enabled by** [[design-time-vs-use-time]] — the information available at use-time (actual user needs, context, skill level) is what makes emergent discovery possible. At design-time, you'd have to enumerate workflows for hypothetical users; at use-time, you search for a real user.
- **Structured version:** [[context-driven adaptation]] — OADAPT provides a rule-based, structured approach to what emergent workflow does fluidly. Adaptation rules (user profile → UI modifications) are pre-defined emergent workflows, crystallised into deterministic rules. The agent extends this by discovering adaptations that rules don't cover.
- **Operationalised by** [[bidirectional-context-loop]] — DuetUI's bidirectional context loop is a concrete runtime mechanism for emergent workflow. The agent observes user actions on the generated interface and infers evolved intent, producing emergent interaction patterns that were never pre-designed. The usage scenario (agent infers "budget-conscious traveller near Sagrada Família" from user's filtering and sorting behaviour) is exactly an emergent workflow arising from the user's actual context.

## Relevance to project

This is the long-term destination, not the current build target. But it imposes a design constraint now: the pipeline must support *continuous reconfiguration*, not just one-shot generation. Specs, data models, and catalog selections need to be modifiable at runtime, not baked in at generation time.

Concretely: when designing the data model → UI spec mapping, ask "can this mapping be re-evaluated by an agent when the user's context changes?" If the answer is "only by regenerating everything from scratch," that's a sign the mapping is too monolithic.

## Open threads

- How do you represent a workflow? Is it a sequence of configurations? A policy? A set of constraints? LAUI doesn't formalise this — it's implicit in the agent's behaviour.
- What's the feedback signal? How does the agent know a workflow is working or failing? In Flute X GPT it's music performance data. In a generative UI context, what's the equivalent — click patterns, explicit feedback, task completion?
- Emergent workflows could converge on local optima. How do you encourage exploration vs. exploitation?
