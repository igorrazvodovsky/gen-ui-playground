---
title: "Interactive AI Alignment: Specification, Process, and Evaluation Alignment"
authors: [Michael Terry, Chinmay Kulkarni, Martin Wattenberg, Lucas Dixon, Meredith Ringel Morris]
year: 2025
venue: "arXiv (Google DeepMind / Harvard)"
type: literature
status: processed
---
## Core idea

Modern AI shifts interaction from invoking specific operations to describing desired outcomes. This paper revisits Norman's gulfs (Execution, Evaluation) in light of this shift and identifies three user-centred alignment objectives: specification alignment (what to do), process alignment (how to do it), and evaluation alignment (verifying and understanding the output). Each implies a corresponding "gulf" the interface must bridge.

## Key concepts

- **Specification alignment** — the process of aligning user and AI on *what* the desired outcome is. Includes providing a specification, confirming the system's interpretation matches, and refining until alignment is sufficient. Bidirectional: the AI may also need to align the *user* to its capabilities (affordance communication). Can happen prospectively, in tandem with action, or retrospectively. → [[specification-alignment]]
- **Process alignment** — the ability for users to control and/or understand *how* the AI achieves the outcome. Includes direct control (choosing models, corpora, parameters), transparency (observing the process), and audit (reviewing after the fact). Introduces the concept of a **surrogate process**: when the AI's actual process is opaque, reverse-engineer a simplified, controllable representation. → [[surrogate-process]]
- **Evaluation alignment** — assisting users in assessing and understanding the AI's output. Two levels: **verification support** (does the output meet the objective?) and **comprehension support** (does the user *understand* the output?). Comprehension is the stronger requirement — relevant when outputs exceed user expertise. → [[evaluation-alignment]]
- **Three-gulf model** — Norman's two gulfs (Execution, Evaluation) refine into three for AI interaction: Specification Gulf (user ↔ AI on intent), Process Gulf (user ↔ AI on method), Validation Gulf (user ↔ AI on output). The Process Gulf spans both Execution and Evaluation — knowing *how* something was made helps both control the process and evaluate the result. → [[three-alignment-gulfs]]
- **Appropriate alignment** — full alignment before every action is impractical. The design challenge is enabling *appropriate levels* of alignment without hindering task progression. Sometimes acting first and refining is cheaper than specifying fully upfront. → [[alignment-cost-tradeoff]]

## Technical approach

Conceptual/analytical paper — no system built. Uses case studies of existing systems (Midjourney, PromptPaint, CoPilot, Liu et al.'s spreadsheet code synthesis) to demonstrate the framework descriptively. Each system is analysed through the three alignment lenses to identify existing mechanisms and gaps.

Key analytical contributions:
- Maps Norman's Gulf of Execution → Specification Gulf (user describing outcome, not operation)
- Maps Norman's Gulf of Evaluation → Validation Gulf (verifying+understanding output, not assessing system state)
- Identifies Process Gulf as *new* — spans both original gulfs. The AI's process is opaque in a way traditional system operations weren't.
- Notes each gulf may be *theoretically impossible* to fully bridge as AI capabilities increase (Specification Gulf: can't communicate all capabilities of a general system; Process Gulf: operations aren't interpretable; Validation Gulf: output may exceed human understanding).
- Discusses multi-party alignment (CSCW) — alignment across multiple users and AIs simultaneously.

## Extracted concepts

- [[three-alignment-gulfs]] — created
- [[surrogate-process]] — created
- [[alignment-cost-tradeoff]] — created

Existing concepts informed (connections noted in new notes):
- [[semantic-intermediate-layer]] — identifiable as a specification alignment mechanism
- [[augmented-semantics]] — identifiable as an evaluation alignment mechanism
- [[externalised-LLM-understanding]] — connected to process alignment
- [[parallel-state-display]] — connected to process alignment / evaluation alignment
- [[intent-decomposition]] — a specification alignment mechanism
- [[gentle slope]] — maps to graduated alignment levels
