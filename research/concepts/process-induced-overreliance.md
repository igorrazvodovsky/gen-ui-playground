---
type: concept
tags: [user-agency, generative-ui, specification]
sources: ["[[sources/overseeing-agents-verification|Overseeing Agents (Grunde-McLaughlin et al., 2026)]]"]
created: 2026-03-06
updated: 2026-03-11
---
When users see a detailed, reasonable-looking record of an agent's step-by-step process, they become *less* likely to catch errors than when they see only the outcome. The process trace creates a false sense of due diligence: "if the agent followed sensible steps, the result must be correct." This is overreliance induced by the appearance of competent process, not by the actual quality of the result.

## Context

Grunde-McLaughlin et al. (2026) found that a Flowchart trace design — showing agent actions as a node-edge graph with screenshots — produced the worst error-finding accuracy among three trace designs tested. On tasks where the agent produced incorrect results, Flowchart viewers found errors only 39.13% of the time, compared to 65.22% for the Specification (outcome-oriented) design. The process information didn't help; it actively interfered with critical evaluation.

The mechanism: a reasonable process *justifies* the result in the user's mind. "The agent searched three websites, compared prices, and selected the cheapest option" sounds diligent. The user doesn't check whether the prices were read correctly — the process narrative carries enough surface credibility to short-circuit scrutiny. Same cognitive pattern as appeal to authority, but with the workflow as the authority.

## Resolution: the temporal design principle

The apparent contradiction between this finding and [[surrogate-process]] (which proposes process representations as valuable) resolves through **temporal context**:

- **Pre-generation (steering)**: process representations are valuable. The user is *deciding what to build*, not verifying output. NeuroSync's task graph, IntentFlow's dimension controls, and pattern selection summaries all help users redirect the system before it commits. Overreliance isn't a risk because there's no "result" to be overconfident about yet.
- **Post-generation (verification)**: process representations are dangerous. The user is evaluating *whether the output is correct*. A reasonable-looking step-by-step trace short-circuits scrutiny. Here, [[outcome-oriented-verification]] (Requirements + Assumptions decomposition, 77% accuracy) is the right design.

This temporal principle applies throughout the pipeline: use process-oriented transparency at intermediate checkpoints (intent decomposition, semantic specification, pattern selection) where the user can intervene, and outcome-oriented transparency at the final output where the user needs to verify.

## Connections

- **Resolves tension with** [[surrogate-process]] — surrogates for pre-generation steering are safe; surrogates for post-generation verification risk overreliance. See temporal principle above.
- **Motivates** [[outcome-oriented-verification]] — the alternative that worked. Decompose output into Requirements (explicit) + Assumptions (unilateral decisions).
- **Extends** [[cognitive-engagement-for-reliance]] — process traces enable *passive* engagement (read a narrative). Outcome-oriented verification forces *active* engagement (evaluate each claim against domain knowledge).
- **Connects to** [[parallel-state-display]] — *how* internal state is displayed matters enormously. Raw process data may be worse than distilled outcome data.
- **Cautions** [[externalised-LLM-understanding]] — NeuroSync's task graph is a process representation. As a pre-generation steering tool, it's valuable. As a post-generation verification aid, it could induce overreliance.
- **Connects to** [[alignment-cost-tradeoff]] — process transparency has costs beyond interaction time: it can *reduce* alignment quality.
- **Tension with** [[interaction-as-intelligence]] — that framework argues for rich process visibility for collaborative cognition. This finding argues process visibility can undermine cognition. Resolution: *interactive* process visibility (user can intervene, redirect) differs from *retrospective* process visibility (user can only review).

## Practical implementations

- **Automation testing** — showing testers a passing test suite can make them skip manual verification.
- **Medical AI explanations** — reasonable-seeming explanations for AI diagnoses can make clinicians *less* likely to override incorrect diagnoses.
- **Code review** — clean-looking diffs make reviewers less likely to catch logic errors than focusing on test results.
- **Financial audit narratives** — detailed management explanations reduce auditor scepticism. Audit standards explicitly warn against this.

## Relevance to project

Two direct implications:

1. **Post-generation verification should be outcome-oriented.** Show "here's what was required, here's what was assumed" rather than "here are the steps the LLM took." The pipeline's multiple process transparency mechanisms (pattern selection rationale, task graph, transformation pipeline) are valuable for *pre-generation steering* but potentially harmful for *post-generation verification*.

2. **Intermediate checkpoints are dual-edged.** Showing users the semantic decomposition and pattern selections is meant to enable correction. But if these intermediate steps "look right," they might reduce scrutiny of the final output. Each checkpoint is a potential site of overreliance if users treat it as validation rather than input.

The antidote is [[cognitive-engagement-for-reliance]]: structure verification to require analytical engagement, not passive consumption.

## Open threads

- Is there a process transparency design that *avoids* overreliance? Perhaps one that highlights uncertainties and alternatives rather than presenting a clean narrative.
- Does the finding transfer from verification (post-hoc review) to monitoring (real-time observation)? If users see a process that looks reasonable *while it's happening*, do they intervene less?
- How does expertise affect susceptibility? Expert users might be more resistant because they have stronger priors about correctness.
