---
type: concept
tags: [user-agency, generative-ui, intent, model-evolution]
sources: ["[[sources/cognitive-engagement-reliance|Building Human-AI Reliance (Raees et al., 2025)]]"]
created: 2026-03-06
---
Appropriate reliance on AI is built through active analytical engagement — users exploring, experimenting with, and constructing alongside AI models — not through passively consuming outputs or reading explanations. Over-reliance (blindly following AI) and under-reliance (ignoring AI) are both symptoms of insufficient cognitive engagement. The fix isn't better explanations; it's interaction patterns that force the user to exercise their domain judgement.

## Context

The XAI community has largely pursued transparency as the path to appropriate reliance: show the user *why* the AI decided X, and they'll know whether to trust it. Raees et al. argue this is necessary but insufficient. Explanations build *trust*, but trust isn't the same as appropriate reliance. A user can trust an AI and still over-rely on it (they trust it so much they stop checking). Or they can understand an explanation but lack the cognitive scaffolding to evaluate whether the AI's reasoning applies to their specific domain context.

The alternative: structure the interaction so users analytically engage *before* relying. Driver analysis (what features matter?), what-if analysis (what happens if I change this?), model building (can I construct my own version?), and model evaluation (does the AI's version match mine?) each force a different kind of cognitive work. By the time the user reaches the reliance decision, they have domain-grounded judgement, not just an explanation to read.

The eight-pattern reliance taxonomy (Table 1) clarifies the problem space. A "correct" final decision can arise from appropriate reliance on AI, but also from lucky over-reliance (AI happened to be right) or unnecessary under-reliance (human was right, AI was too, but user ignored it). Only active engagement distinguishes appropriate reliance from lucky reliance.

## Connections

- **Complements** [[interaction-as-intelligence]] — Ye et al. argue interaction *is* intelligence (philosophical framing). This concept says interaction *calibrates reliance* (practical framing). Different claims, same design implication: intermediate layers aren't overhead, they're where the user builds the cognitive scaffolding to rely appropriately on what the system produces.
- **Extends** [[adaptive-autonomy]] — adaptive autonomy asks "how much control should the user have?" This concept adds: the answer depends partly on how much cognitive engagement the user has *already had*. A user who has explored the data (driver analysis) and tested scenarios (what-if) can appropriately delegate more than a user who just typed a prompt.
- **Supports** [[dynamic-cooperation-willingness]] — the six-phase cooperation pattern maps well onto the four-phase engagement model. Clarification ≈ driver analysis (hands-on exploration), reasoning ≈ what-if (system runs scenarios), intervention ≈ model building (hands-on construction), summary ≈ evaluation (hands-off assessment).
- **Informs** [[gentle slope]] — the gentle slope is usually described spatially (view → tweak → edit → build). Cognitive engagement adds a *readiness* dimension: users need to have done enough exploration to make higher-slope actions meaningful, not just available.
- **Connects to** [[externalised-LLM-understanding]] — NeuroSync's editable task graph is an instance of cognitive engagement infrastructure. By making the LLM's understanding visible and editable, it forces the user to evaluate the AI's interpretation against their own domain knowledge — exactly the kind of analytical engagement this concept advocates.
- **Connects to** [[tangible-agency]] — embedded controls (sliders, pickers) enable the what-if style of engagement. The user doesn't just see the AI's output — they can manipulate parameters and observe how the output changes, building causal understanding.

## Practical implementations

- **What-if analysis tools** (Gafhani et al., 2021) — interactive scenario exploration as a decision support pattern
- **Interactive Machine Learning** (Dudley & Kristensson, 2018) — users with low technical expertise analytically engage with AI through model inspection and parameter adjustment
- **EXMOS** (Bhattacharya et al., 2024) — explanatory model steering through multifaceted data configurations. Users actively steer the model rather than passively receive its outputs.
- **Business intelligence dashboards** (Tableau, Power BI) — driver analysis and what-if patterns are standard. The novel claim is that these patterns should be embedded in *AI assistance interfaces*, not separated into "analytics" vs. "AI" tools.

## Relevance to project

The pipeline currently has multiple checkpoints (intent decomposition, semantic review, pattern selection) that are framed as *validation* points — catch errors before they propagate. Cognitive engagement reframes them as *scaffolding* points — each one builds the user's capacity to engage appropriately with the next stage.

Concretely, this suggests:
- The intent decomposition step ([[intent-decomposition]]) shouldn't just *show* the decomposition — it should let users *experiment* with it (what-if: "what happens to the generated UI if I remove this intent?")
- The [[semantic-intermediate-layer]] should support driver-analysis-style exploration: "which of my intent dimensions is driving the choice of table vs. cards?"
- [[usage-as-annotation]] gets a reliance dimension: the system should track not just *what* the user chose, but *how much analytical work* preceded the choice, as a signal of reliance quality

This also speaks to DuetUI's trust fragility finding. A single hallucination destroyed trust because users hadn't built enough cognitive scaffolding to distinguish "AI is usually right but wrong here" from "AI is unreliable." If the interaction had included what-if analysis (showing the user the model's reasoning path), the failure might have been recoverable.

- **Empirically supported by** [[impact-analysis-before-generation]] — SemanticCommit (Vaithilingam et al., UIST '25) provides direct evidence for the cognitive engagement thesis. Users who performed impact analysis first (detecting conflicts before accepting AI changes) showed better conflict identification, greater sense of control, and *no increase in perceived workload* — despite more manual steps. The "Check for Conflicts" action is driver analysis applied to knowledge integration: explore what's at stake before committing. The study found 6/12 participants always started with impact analysis, never delegating to the AI's global changes. This is cognitive engagement calibrating reliance in practice.
- **Accumulated via** [[intent-specification-as-common-ground]] — reviewing and correcting an intent specification is sustained cognitive engagement with the AI's model of you. Each correction builds the user's understanding of what the AI assumes, calibrating reliance not just for a single session but persistently.
- **Complicated by** [[process-induced-overreliance]] — Grunde-McLaughlin et al. (2026) demonstrate a failure mode: *structured* engagement (reading a process trace, checking a flowchart) can *increase* overreliance rather than calibrate it. A reasonable-looking agent workflow short-circuits critical evaluation. This sharpens the concept: the engagement must be *analytical* (domain-grounded reasoning, evaluating claims against knowledge) not merely *structured* (following a checklist of process steps). The false confidence finding (Hedges' g: 0.85) shows that better verification tools without deeper cognitive engagement make users more certain when wrong, not less.

## Open threads

- ~~The proposed study hasn't been run — the four-phase engagement model is theoretically motivated but empirically untested.~~ SemanticCommit provides partial empirical validation: impact analysis (≈ driver analysis) demonstrably calibrates reliance without increasing workload. The remaining phases (what-if, model building, evaluation) are still untested. The question narrows: does structured analytical engagement *beyond* impact analysis produce *additional* reliance calibration? Grunde-McLaughlin et al.'s false confidence result further sharpens this: even with structured outcome-oriented verification, accuracy improvement was marginal (g: 0.18) while false confidence spiked (g: 0.85). Checklist engagement isn't enough — what form of engagement breaks through the false confidence ceiling?
- How much engagement is enough? The paper implies all four phases (driver analysis → what-if → model building → evaluation) are necessary, but for low-stakes or time-pressured decisions, this is excessive. Does [[alignment-cost-tradeoff]] apply here — reliance calibration proportional to decision stakes?
- The paper focuses on business analytics (predicting customer value). Transfer to UI generation is non-trivial. In analytics, the user has ground truth to check against (actual customer value). In generative UI, "correct" is partly subjective. What does cognitive engagement look like when the evaluation criteria are softer?
