---
title: "Building Human-AI Reliance Through Cognitive Engagement and Exploratory AI Assistance"
authors: [Muhammad Raees, Vassilis-Javed Khan, Konstantinos Papangelis]
year: 2025
venue: "UMAP Adjunct '25"
type: literature
status: processed
---
## Core idea

Appropriate reliance on AI assistance is built through active cognitive engagement — domain experts analytically interacting with AI models (driver analysis, what-if scenarios, model building, evaluation) — not through passive consumption of AI outputs or explanations alone. The paper argues for "cognitively aligned" AI assistance where users engage with both symbolic (logic-based) and sub-symbolic AI to interpret, influence, and co-construct decisions.

## Key concepts

- **[[cognitive-engagement-for-reliance]]** — the central thesis: active analytical interaction (not just explanations) calibrates human-AI reliance from inappropriate (over/under) to appropriate
- **Appropriate reliance taxonomy** — 8-pattern matrix of (human decision × AI assistance × final decision) outcomes, synthesised from three views in the literature: Appropriateness View, Traditional View, Dominance View (Table 1)
- **Semantic anchoring** — domain experts anchor AI interpretations to their existing business logic, mental models, and domain constraints. AI assistance must support this anchoring process, not bypass it.
- **Cognitive scaffolding** — AI evolves not just with data but through the cognitive engagement patterns of its users. The system learns from *how* users engage, not just what they input.

## Technical approach

Position paper — no system built. Proposes a study design (Figure 1) with four phases of user engagement with a business analytics prediction task (predicting customer value):

1. **Driver analysis** — users explore features, outlier analysis, correlations. Builds domain understanding.
2. **What-if analysis** — users manipulate input variables, run simulations, see how changes affect output. Builds causal understanding.
3. **Model building** — users combine previous knowledge with feature importance and what-if analysis to construct their own models. Builds ownership.
4. **Model evaluation** — users evaluate built models with decision support, provide feedback. Builds reliance.

Three experimental conditions: baseline (fixed AI assistance), interactive (user agency to adapt system dynamics), and a combined evaluation condition. Measures include user reliance rate, accuracy, effort, decision ownership, and engagement (Likert scales) plus qualitative interviews.

The step-wise progression from exploration → experimentation → construction → evaluation is designed to build cognitive understanding *before* asking the user to rely on AI. This contrasts with typical AI-assisted decision-making where the system presents a recommendation and asks the user to accept or reject it.

## Extracted concepts

- [[cognitive-engagement-for-reliance]] (new)
- [[adaptive-autonomy]] (updated — reliance calibration angle)
- [[interaction-as-intelligence]] (updated — complementary reliance perspective)
