---
title: "Human-Centered LLM-Agent User Interface: A Position Paper"
authors: [Daniel Chin, Yuxuan Wang, Gus Xia]
year: 2024
venue: "arXiv:2405.13050v2"
type: literature
status: processed
---
## Core idea

Current LLM-powered applications are passive — they follow user commands without studying the user or the underlying system. A LAUI (LLM-Agent User Interface) flips this: the agent is initialised to be proficient with the system, proactively studies the user's needs, and proposes tailored interaction workflows that emerge at use-time rather than being pre-designed.

## Key concepts

- [[LLM agent UI as abstraction layer]] — LAUI as a fourth abstraction layer above Functions → API → GUI
- [[emergent workflow]] — workflows discovered at use-time from the intersection of system capabilities and user needs, rather than imagined at design-time
- [[LLM-operable interface]] — designing system surfaces to be navigated by an LLM agent, not just by humans
- [[high-dimensional-configuration-space]] — complex systems have exponentially many configurations (Cartesian product of independent settings). Human designers can only explore a fraction at design-time; LLM agents can navigate the full space at use-time.
- [[design-time-vs-use-time]] — more information is available during use-time than design-time (user needs, context, environment). This information asymmetry is why emergent workflows beat pre-designed ones.
- **Three levels of interface role** (Table 2): assistant/consultant (responds to NL) → butler/copilot (executes commands via tools) → secretary/consulting firm (proactively studies user, defines workflow). LAUI aspires to the third level. The user's expected burden decreases at each level: from "act on the response" to "understand the tools" to merely "know your needs."

## Technical approach

Illustrated via Flute X GPT — a music-tutoring application where an LLM agent (GPT-4) mediates between a student and Music X Machine (a multi-modal software-hardware system with haptic gloves, visual score feedback, audio, and a robot teacher).

Architecture: **System Principles** (prompt encoding full system knowledge) → **Manager** (rule-based state machine handling event routing and interaction consistency) → **Parser** (splits LLM output into thought/action/speech using function calling) → **LLM**. The manager relays events (user speech, performance evaluations) to the LLM, which reasons about pedagogy, configures system modes, and converses with the student. The agent doesn't just follow commands — it diagnoses musical challenges, proposes training workflows, and adjusts system configuration based on its understanding of the student's needs and the system's capabilities.

Key architectural detail: the Manager is a state machine that encapsulates both agents (LLM and user) in a consistent interaction environment. It synchronises function calls with speech (so the agent can refer to actions it's taking), batches text-to-speech for latency, and re-queries the LLM on malformed outputs. This is a concrete implementation of an [[event-driven agent-UI protocol]] — a precursor to more general protocols like AG-UI.

This is a position paper, not an implementation paper. No formal evaluation. Three video demos (one scripted, two improvised) show emergent behaviours — including the agent noticing a student blowing during rests (a behaviour never anticipated at design-time) and improvising a corrective workflow.

## Three drawbacks of conventional design (§3.3)

1. Design is limited by what the designer can imagine and test at design-time
2. One standard interface for everyone — no personalisation
3. Usability depends on user's willingness to learn the system

LAUI addresses all three by shifting workflow discovery to use-time, where more information is available.

## Extracted concepts

- [[LLM agent UI as abstraction layer]]
- [[emergent workflow]]
- [[LLM-operable interface]]
- [[high-dimensional-configuration-space]]
- [[design-time-vs-use-time]]
