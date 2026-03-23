---
title: "DuetUI: A Bidirectional Context Loop for Human-Agent Co-Generation of Task-Oriented Interfaces"
authors: [Yuan Xu, Shaowen Xiang, Yizhi Song, Ruoting Sun, Xin Tong]
year: 2025
venue: "arXiv preprint (2509.13444v1)"
type: literature
status: processed
---
## Core idea

DuetUI proposes a **human-agent co-generation paradigm** where the agent and user collaboratively shape a task-oriented interface through a bidirectional context loop. Instead of one-shot generation or turn-based supervision, the agent scaffolds the interface by decomposing the task, while the user's direct manipulations on that interface implicitly steer the agent's next step. The interface itself becomes the medium of communication — not chat.

## Key concepts

- **Bidirectional context loop** — the central mechanism. The agent generates UI structure (downward flow); the user's manipulations on that UI feed back as implicit context (upward flow). A shared action history captures both sides, enabling continuous alignment without explicit re-prompting. → [[bidirectional-context-loop]]
- **Staged co-generation** — six-stage workflow (Define → Empathise → Plan → Explore → Refine → Duet) derived from a formative study. Structures the collaboration as phases with distinct goals, not freeform conversation. → [[staged-co-generation]]
- **Tangible agency** — making the agent's abstract capabilities concrete and directly manipulable through embedded UI controls (input fields, sliders, action buttons, date pickers), replacing conversational prompting with direct manipulation. → [[tangible-agency]]
- **Task-interface duality** — a strict hierarchical mapping between the logical task decomposition (Task → Subtask → Data) and the visual interface description (Navigation → Page → Component). Every task element has a corresponding, manipulable UI element. → [[task-interface-duality]]
- **Bidirectional action history** — shared log of every meaningful action from both agent and user, serving as the living context for collaboration. Agent actions are communicated through visible UI changes; user actions (clicks, inputs) are explicitly recorded.

## Technical approach

**Architecture**: Three-layer system:
1. **Core layer** — stateless services: Memory Manager (session key-value store), LLM Manager (GPT-4o + Groq LLaMA3-70B), Schema Manager (Pydantic schemas for cross-agent consistency).
2. **Context layer** — stateful hub: Context Manager maintains the shared state (task stage, task decomposition, interface description, bidirectional action history). Single source of truth enabling both loops.
3. **Agent layer** — four specialised agents: Task Agent (maintains task decomposition — 3-level hierarchy), Interface Agent (manages interface description — parallel 3-level hierarchy), Service Agent (external data calls, simulated via LLMs in the study), Rendering Agent (translates interface description → interactive web UI using Vue.js + Element Plus).

**Operational loops**:
- **Task loop**: triggered when the task plan needs modification. Task Agent reads current decomposition + action history + interface description → infers user's implicit intent from recent manipulations → updates decomposition → may invoke Service Agent for data → commits back to Context Manager.
- **Interface loop**: triggered when UI must reflect a new state. Interface Agent reads updated decomposition + action history → generates updated interface description → Rendering Agent re-renders → user interactions captured in action history, closing the loop.

**Formative study** (N=12): four key findings — (F1) intent is emergent and incrementally refined through interaction, (F2) opaque AI creates a gulf of execution, (F3) users entangle task needs with interface expectations, (F4) users desire dynamic mixed-initiative collaboration. These map to four design goals: DG1 continuous co-creation, DG2 effortless instrumentality, DG3 task-oriented interface unfolding, DG4 mutual awareness for shared autonomy.

**User study** (N=24, within-subjects vs. Google Stitch baseline): DuetUI achieved significantly higher usability (SUS: 73.65 vs. 63.5, p=.002), task satisfaction (p=.005), interface satisfaction (p=.006), and AI satisfaction (p=.001). Comparable overall workload but significantly lower perceived performance demand (p=.028). 87.5% of participants preferred DuetUI; 83.3% would adopt it for daily use.

**Key qualitative findings**: participants overwhelmingly preferred iterative dialogue over one-shot generation; valued predictability and structural consistency over visual novelty; wanted adaptive control that shifts with growing expertise; trust was fragile and rooted in data veracity and transparency (citations helped).

## Extracted concepts

- [[bidirectional-context-loop]] — created
- [[staged-co-generation]] — created
- [[tangible-agency]] — created
- [[task-interface-duality]] — created
- [[adaptive-autonomy]] — created
- Updated: [[emergent workflow]], [[gentle slope]], [[intent-decomposition]], [[semantic-intermediate-layer]], [[in-place toolchain]]
