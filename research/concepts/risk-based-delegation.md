---
type: concept
tags: [user-agency, generative-ui]
sources: ["Cocoa: Co-Planning and Co-Execution with AI Agents (Feng et al., CHI '26)"]
created: 2026-03-06
---
When users can flexibly delegate subtasks between themselves and an agent, they consistently apply a risk/judgment heuristic: mechanical, low-risk, broad-search tasks go to the agent; consequential, high-judgment, synthesis tasks stay with the user. Delegation isn't about workload distribution — it's about where human judgment adds irreplaceable value.

## Context

Cocoa's lab study (N=16) and 7-day field deployment found that users assigned agent steps for tasks like "find papers related to X" or "search for prominent authors" — high-volume retrieval where the agent's breadth is an advantage and errors are easily caught. Users kept for themselves tasks requiring synthesis ("make connections between papers"), consequential decisions ("which direction to take the research"), and tasks where the process itself was valuable ("reading and playing around with the material is what gives you the ideas").

32.6% of plan steps were edited (descriptions changed) and 17.4% were reassigned (agent↔user toggle flipped), showing that delegation decisions aren't stable — they shift as users see intermediate results and reassess which tasks need human judgment. One participant initially assigned a broad search to the agent, then took over a narrower follow-up search themselves because they'd developed specific intuitions about what to look for.

The formative study (N=9) sharpened the motivation: participants wanted to keep "higher-level reasoning and information synthesis" for themselves, and were frustrated when AI attempted these tasks — not because the output was bad per se, but because automating the reasoning process removed the learning benefit. The process has value independent of the output.

## Connections

- Concretises [[adaptive-autonomy]] — adaptive autonomy describes a spectrum of control allocation that should shift dynamically. Risk-based delegation identifies the *heuristic* users apply when making those shifts: perceived risk and judgment-intensity of the subtask. This gives adaptive autonomy a concrete decision rule beyond "more expertise = more control."
- Extends [[dynamic-cooperation-willingness]] — Ye et al. found users oscillate between hands-on and hands-off across research phases. Risk-based delegation explains *why* they oscillate: different phases contain different mixes of mechanical and judgment-intensive tasks. The oscillation isn't random — it tracks the risk/judgment profile of the current subtask.
- Connects to [[cognitive-engagement-for-reliance]] — the finding that users want to keep synthesis tasks is consistent with the argument that cognitive engagement (doing the work yourself) builds better mental models and more appropriate reliance. Delegating judgment tasks to the agent short-circuits the engagement that leads to calibrated trust.
- Informs [[tangible-agency]] — the step assignment toggle in Cocoa is a minimal tangible agency control for delegation. A richer implementation might show a risk/confidence indicator per step, helping users make delegation decisions. The pipeline's tangible agency controls should include delegation affordances, not just execution triggers.
- Supports [[gentle slope]] — delegation is itself a position on the gentle slope. "Let the agent do everything" is the top (pure consumption); "do everything myself with agent as data source" is the bottom (pure authoring). Risk-based delegation means users naturally position themselves differently on the slope for different subtasks within the same workflow.

## Practical implementations

- **Cocoa**: binary agent/user toggle per plan step. Simple but effective. Users could also reassign mid-execution and the agent would pause to request guidance on user steps.
- **GitHub Copilot workspace**: users review AI-generated plans and can accept, edit, or reject individual steps — implicit delegation where accepting = agent-assigned and editing = user-assigned.
- **Collaborative document editing** (Google Docs suggestions mode): author delegates proofreading/formatting to the AI (accept suggestions) but keeps substantive writing. The accept/reject mechanism is a per-edit delegation control.

## Relevance to project

For the genUI pipeline, this has a direct implication: the system should expose delegation controls at each pipeline stage, not just at the top level. The user might want the agent to handle data retrieval and initial structuring (mechanical) but manually control pattern selection and layout decisions (judgment-intensive). A "generate everything" button is the wrong default — a step-by-step pipeline with per-stage delegation toggles matches how users actually want to work.

This also informs the [[semantic-intermediate-layer]] design: the semantic spec should be decomposable into independently delegatable chunks. "I'll specify the data model, you pick the components" or "I'll choose the layout pattern, you fill in the details" should both be natural interaction modes.

The risk heuristic also suggests the system could *recommend* delegation: "This step involves broad component search — want me to handle it?" vs. "This step requires choosing between two layout patterns for your specific use case — you should probably decide." The [[inferred-user-model]] could inform these recommendations.

## Open threads

- **Risk perception is subjective**: what one user considers low-risk ("search for papers") another might consider high-risk ("what if it misses the key paper?"). The system's delegation recommendations should adapt to the user's risk tolerance, not assume a universal threshold.
- **Process value is invisible to the system**: the insight that synthesis has value *as a process* (not just as output) is hard for the system to detect. A user choosing to do something themselves isn't necessarily because they distrust the agent — it might be because they want to learn. The system shouldn't interpret self-assignment as a signal of low trust.
- **Delegation granularity**: Cocoa delegates at the step level (coarse). For the genUI pipeline, delegation might need to be more granular — within a single spec, some attributes might be agent-generated while others are user-specified. How fine-grained can delegation controls get before they become more effort than doing the work?
