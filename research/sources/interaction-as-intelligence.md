---
title: "Interaction As Intelligence: Deep Research With Human-AI Partnership"
authors: [Lyumanshan Ye, Xiaojie Cai, Xinkai Wang, Junfei Wang, Xiangkun Hu, Jiadi Su, Yang Nan, Sihan Wang, Bohan Zhang, Xiaoze Fan, Jinbin Luo, Yuxiang Zheng, Tianze Xu, Dayuan Fu, Yunze Wu, Pengrui Lu, Zengzhi Wang, Yiwei Qin, Zhen Huang, Yan Ma, Zhulin Hu, Haoyang Zou, Tiantian Mi, Yixin Ye, Ethan Chern, Pengfei Liu]
year: 2025
venue: "arXiv:2507.15759"
type: literature
status: processed
---
## Core idea

Interaction isn't a conduit for accessing AI — it's a fundamental dimension of intelligence itself. The paper introduces "Deep Cognition," a multi-agent research system that replaces the dominant input-wait-output paradigm with continuous cognitive partnership. Humans provide "cognitive oversight" — strategic intervention at critical junctures — rather than either constant supervision or fire-and-forget prompting.

## Key concepts

- **[[interaction-as-intelligence]]** — the philosophical reframe: interaction constitutes intelligence, not just accesses it
- **[[dynamic-cooperation-willingness]]** — users naturally oscillate between hands-on and hands-off modes across six empirically observed research phases
- **[[usage-as-annotation]]** — normal user actions (hesitations, corrections, smooth completions) implicitly generate annotation signals that guide system adaptation
- [[adaptive-autonomy]] — extended with empirical evidence for phase-dependent control allocation
- [[inferred-user-model]] — the preference agent builds a user model from interaction patterns via in-context reinforcement learning

## Technical approach

Deep Cognition is a multi-agent system with three components:

1. **Research agent** — the primary cognitive partner. Handles clarification (asks users to refine vague queries), web searching (generates and executes parallel search queries), report editing (iteratively drafts and self-critiques reports against quality rubrics), and research completion (decides when coverage and depth are sufficient).

2. **Browsing agent** — information retrieval specialist. Selects promising URLs from search results using multiple signals (title, snippet, structure, user preferences), scrapes content in parallel, extracts relevant information, and performs quality assessment to filter noise.

3. **Preference agent** — learns user preferences via in-context reinforcement learning (ICRL), treating user actions and feedback as reward signals. Tracks three dimensions: query preferences (search methodology choices), webpage preferences (source and domain preferences), and report preferences (style, format, structure). Adapts without explicit retraining — purely through contextual conditioning within the session.

The system implements four interaction principles:
- **Cognitive transparency** — exposes reasoning process, search strategies, and synthesis rationale at every stage
- **Real-time intervention** — pause button allows users to interrupt, redirect, or inject feedback mid-process
- **Fine-grained interaction** — users engage with specific output elements (question claims, redirect search focus, request elaboration on points)
- **Adaptive cognitive context** — evolves research strategy based on accumulated interaction patterns

Evaluation: user study (N=13) showed significant improvements over Gemini Deep Research, OpenAI Deep Research, and Grok 3 across all metrics. Transparency +25%, fine-grained interaction +44.6%, ease of collaboration +43%. On BrowseComp-ZH benchmark, cognition + interaction condition achieved 72.73% accuracy vs. 40.91% for Gemini/OpenAI and 22.73% for Grok 3. Critically, the ablation study showed neither cognition alone (45.45%) nor interaction alone (40.91%) approached the combined performance — both mechanisms are necessary.

## Extracted concepts

- [[interaction-as-intelligence]] — created
- [[dynamic-cooperation-willingness]] — created
- [[usage-as-annotation]] — created
- [[adaptive-autonomy]] — updated with empirical phase data
