---
title: "Interaction-Augmented Instruction: Modeling the Synergy of Prompts and Interactions in Human-GenAI Collaboration"
authors: [Leixian Shen, Yifang Wang, Huamin Qu, Xing Xie, Haotian Li]
year: 2026
venue: "CHI '26, Barcelona"
type: literature
status: processed
---
## Core idea

Text prompts and GUI interactions are complementary, not competing, input modes for generative AI. Prompts are flexible but ambiguous; interactions are precise but rigid. The paper proposes a formal entity–relation graph (the Interaction-Augmented Instruction model) with six entities — Human (H), Interaction (I), Text Prompt (T), Augmented Instruction (Aug), Artifact (A), Generative AI (G) — that makes explicit how these modes combine into composite instructions. The model's key move: introducing **Aug** as the actual input GenAI receives, assembled from T + I + A context, which enables systematic comparison of interaction designs via graph topology.

## Key concepts

- [[prompt-interaction-synergy]] — text prompts and GUI interactions are complementary modalities with different strengths; combining them yields richer instructions than either alone
- [[augmented-instruction]] — the composite, machine-readable instruction that GenAI actually receives, assembled from prompt + interaction-derived information + artifact context
- [[paradigm-graph-as-design-language]] — interaction designs expressed as directed entity-relation graphs, enabling comparison, selection, and generation of new paradigms

Connects to existing concepts:
- [[prompt-as-interface-object]] — AI-Instruments' reification principle maps onto the IAI model's treatment of T and I as distinct manipulable entities
- [[tangible-agency]] — DuetUI's embedded controls correspond to IAI's P7 (generative prompt control widgets) and P8 (generative artifact control widgets)
- [[intent-decomposition]] — IAI's P6 (AI-driven prompt decomposition) is a specific paradigm for externalising the LLM's task understanding
- [[graduated-ambiguity-tolerance]] — the IAI model formalises why mixed-precision input works: T handles the ambiguous parts, I handles the precise parts
- [[reflection-in-intent]] — IAI's P5 (AI-driven prompt suggestion) is a post-invocation version of intent reflection
- [[grounding-by-example]] — IAI's artifact-grounded paradigms (P3, P4, P9–P12) formalise how existing artifacts reduce ambiguity
- [[semantic-intermediate-layer]] — Aug is structurally a semantic intermediate layer on the input side

## Technical approach

**Model derivation.** Iterative, deductive process starting from two canonical flows: prompt-driven (H → T → G → A) and GUI interaction (H → I → A). Three distinctions refine the model: (1) T (text) vs I (non-textual interaction) separated by modality; (2) Aug introduced as the composite instruction GenAI actually consumes; (3) auxiliary entities consolidated into the six core entities.

**Relation set.** Guided by three principles — semantic meaningfulness, discriminative value, and agency/provenance preservation. Key constraints: no G → T (AI can't author prompts without human mediation), no G → Aug (AI can't construct its own composite instruction), no H → G (humans don't directly execute generation). These preserve human agency.

**Atomic paradigm graph.** A minimal, self-contained subgraph capturing one coherent interaction workflow. Each atomic graph assigns GenAI exactly one role and must include at least one Interaction (I) entity. Complete application workflows are chains of atomic graphs.

**Corpus annotation.** 66 GenAI system interfaces from prior corpora, manually annotated into atomic paradigm graphs by two coders with cross-checking, yielding 12 recurring paradigms.

**12 paradigms** organised along two axes:
1. **Interaction timing**: before vs after GenAI invocation
2. **User resources**: prompt-only (no artifact at hand) vs artifact-grounded

| Timing | Resources | Paradigms |
|--------|-----------|-----------|
| Pre-invocation | Prompt-only | P1 Interactive Prompt Enhancement, P2 Interactive Prompt Organisation, P3 Interaction as Part of Instruction |
| Pre-invocation | Artifact-grounded | P4 Referenced Artifact as Part of Instruction |
| Post-invocation | Prompt-only | P5 AI-driven Prompt Suggestion, P6 AI-driven Prompt Decomposition, P7 Generative Prompt Control Widgets, P8 Generative Artifact Control Widgets |
| Post-invocation | Artifact-grounded | P9 Artifact to Structured Instruction, P10 Artifact to Multimodal Instruction, P11 Artifact-driven Prompt Enhancement, P12 Interactive Artifact Refinement |

**Design cheat sheet (Table 3).** Maps common design situations to recommended paradigms based on the IAI model's rationale (e.g., "Need structured intent or task decomposition" → P2; "Need transparent intermediate reasoning" → P6; "Need persistent, artifact-bound controls for iteration" → P8).

**Four usage methods (Table 4).** (1) Extend existing pipelines by chaining paradigms; (2) Refine interaction design by adjusting graph relations; (3) Design new tools for emerging scenarios by deriving paradigm graphs; (4) Hypothesise novel paradigms by modifying existing graph structures.

## Extracted concepts

- [[prompt-interaction-synergy]] — created
- [[augmented-instruction]] — created
- [[paradigm-graph-as-design-language]] — created

Updated existing concepts:
- [[tangible-agency]] — added IAI P7/P8 as formalisation
- [[prompt-as-interface-object]] — added IAI model connection
- [[gentle slope]] — added interaction paradigm selection as a new dimension
