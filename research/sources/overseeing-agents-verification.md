---
title: "Overseeing Agents Without Constant Oversight: Challenges and Opportunities"
authors: [Megan Grunde-McLaughlin, Saleema Amershi, Jina Suh, Advait Sarkar, Rida Qadri, Forough Poursabzi-Sangdeh, Victor Dibia, Adam Fourney]
year: 2026
venue: "Microsoft Research (arXiv 2602.16844)"
type: literature
status: processed
---
## Core idea

Current agent workflow traces — the records of what an agent did — are badly designed for human verification. Three user studies on a Computer Use Agent (Magentic-UI) reveal that how the trace is *structured* fundamentally shapes whether humans can find errors, and that outcome-oriented trace designs (showing *what* was achieved) consistently outperform process-oriented designs (showing *how* it was done). The sobering finding: even improved trace designs increase false confidence — users who fail to find errors become *more* confident in their incorrect judgement.

## Key concepts

- **Outcome-oriented vs. process-oriented verification** — [[outcome-oriented-verification]]. Trace designs that decompose agent output into verifiable requirements + assumptions achieve the highest error-finding accuracy (77.14%). Process-oriented designs (flowcharts of agent steps) achieve the lowest, because a "reasonable-looking" process justifies accepting incorrect results.
- **Process-induced overreliance** — [[process-induced-overreliance]]. When users see a detailed, reasonable-looking agent workflow, they're *less* likely to catch errors than when they see only the outcome. The process provenance creates a false sense of due diligence. Flowchart accuracy on incorrect tasks: 39.13%.
- **False confidence amplification** — related to [[cognitive-engagement-for-reliance]]. An improved verification interface helped users find errors faster (Hedges' g: −0.29) but simultaneously increased confidence when wrong (g: 0.85). Better tools make incorrect users *more* certain, not less.
- **Correctness as subjective and evolving** — related to [[alignment-cost-tradeoff]]. What counts as "correct" changes during task execution. Users discover new criteria, update existing ones, and resolve initial ambiguities as they inspect the agent's work. Benchmarks assuming a single correct answer miss this.

## Technical approach

Three studies, each N=12, on Magentic-UI (a Computer Use Agent that controls a browser):

**Study 1 (formative)**: Participants verified agent-completed tasks using existing Magentic-UI traces. Found: traces are verbose and cumbersome, participants miss small but impactful errors, correctness criteria are subjective and shift during inspection.

**Study 2 (design probes)**: Three alternative trace designs:
- *Flowchart* — process-oriented. Node-edge graph of agent steps with screenshots. Lowest error-finding accuracy.
- *Citation* — hybrid. Textual summary with inline citations linking to source evidence. Middle ground.
- *Specification* — outcome-oriented. Requirements (what was asked) + Assumptions (what the agent decided unilaterally) as a checklist. Highest accuracy (77.14%), most preferred (8/12). Key affordance: the Requirements/Assumptions split forces users to notice where the agent made *choices* rather than following instructions.

**Study 3 (controlled, within-subjects)**: Novel interface combining Specification approach with source-linking. Compared against existing Magentic-UI trace. Metrics (Hedges' g):
- Error-finding time: −0.29 (faster, small effect)
- Error-finding accuracy: +0.18 (marginal improvement, small effect)
- False confidence: +0.85 (large increase — users scored incorrect work as correct with higher confidence)
- Task-level accuracy: no significant improvement

The false confidence finding is the critical result. The improved interface didn't meaningfully improve overall accuracy because it simultaneously made users more confident in their wrong answers.

## Extracted concepts

- Created: [[outcome-oriented-verification]]
- Created: [[process-induced-overreliance]]
- Updated: [[cognitive-engagement-for-reliance]] — false confidence amplification as a failure mode of better interfaces without deeper analytical engagement
- Updated: [[surrogate-process]] — outcome-oriented traces as the preferred surrogate design; process traces as a cautionary example
- Updated: [[alignment-cost-tradeoff]] — subjective, evolving correctness criteria complicate alignment calculations
- Updated: [[three-alignment-gulfs]] — empirical evidence for the Validation Gulf
- Updated: [[adaptive-autonomy]] — verification as a mode within the autonomy spectrum
