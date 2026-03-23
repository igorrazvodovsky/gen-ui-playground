---
type: concept
tags: [user-agency, generative-ui, specification]
sources: ["[[sources/overseeing-agents-verification|Overseeing Agents (Grunde-McLaughlin et al., 2026)]]"]
created: 2026-03-06
---
When verifying agent output, decomposing the result into *what was required* (explicit task requirements) and *what was assumed* (decisions the agent made unilaterally) produces dramatically better error detection than showing users the step-by-step process the agent followed. The Requirements/Assumptions split forces the user to confront exactly where the agent exercised judgement — which is where errors concentrate.

## Context

Grunde-McLaughlin et al. tested three trace designs for a Computer Use Agent (Magentic-UI): a Flowchart (process-oriented, showing agent steps as a node-edge graph), a Citation view (textual summary with source links), and a Specification view (requirements checklist + assumptions list). The Specification design achieved the highest error-finding accuracy (77.14% vs. Flowchart's lowest) and was the most preferred (8/12 participants). The critical finding wasn't just that outcome-orientation is better — it's that process-orientation is *actively harmful*. Showing a detailed, reasonable-looking agent workflow caused [[process-induced-overreliance]]: users accepted incorrect results because the process *looked* diligent.

The Requirements/Assumptions decomposition works because it maps to a natural verification strategy: check each requirement against the output (mechanical), then evaluate each assumption for reasonableness (judgemental). Users know what they asked for (requirements are checkable); they need help noticing what the agent decided *for* them (assumptions require surfacing). Without the explicit assumptions list, unilateral agent decisions are invisible — buried in the process trace or simply not mentioned.

The study also found that correctness is subjective and evolves during inspection. Users changed what "correct" meant as they examined the output: discovering new criteria, updating old ones, resolving initial ambiguities. This means verification tools must support *emergent* evaluation criteria, not just upfront checklists.

## Connections

- **Reframes** [[surrogate-process]] — Terry et al. proposed surrogates as the way to bridge the Process Gulf. This paper complicates that: showing users a process surrogate (even a well-designed one like a flowchart) can *increase* overreliance rather than calibrate it. The more useful surrogate may not be the process at all, but the *outcome structure* (requirements + assumptions). The surrogate should reveal *what was decided*, not *how it was decided*.
- **Supports** [[impact-analysis-before-generation]] — Requirements/Assumptions is structurally similar to impact analysis: surface what the agent did (and didn't do) before the user accepts the result. The key overlap: both separate detection (see what happened) from resolution (decide whether it's acceptable), and both show that users prefer this separation.
- **Challenges** [[externalised-LLM-understanding]] — NeuroSync externalises the LLM's task graph (a process representation). The overseeing agents study suggests users may not benefit from seeing the process graph as much as from seeing the *outcome decomposition*. The task graph's value may be more for pre-generation steering than post-generation verification.
- **Extends** [[three-alignment-gulfs]] — provides the first empirical evidence for the Validation Gulf as a distinct problem. Verification isn't just "does the output look right?" — it's "can the user even know what 'right' is?"
- **Relates to** [[cognitive-engagement-for-reliance]] — the Requirements/Assumptions checklist is a cognitive forcing function: it structures the user's analytical engagement by making them evaluate each claim individually rather than forming a holistic impression. But the false confidence finding (Study 3) shows that *structured* engagement alone isn't enough — users need *analytical* engagement (domain-grounded reasoning), not just *checklist* engagement.
- **Informs** [[augmented-semantics]] — augmented semantics extract what the AI implemented. Requirements/Assumptions is a complementary extraction: what the AI was *asked* to implement vs. what it *chose* to implement. For generative UI, augmented semantics could separate "these components implement your stated requirements" from "these components were added based on inferred assumptions."

## Practical implementations

- **Magentic-UI Specification trace** — the primary implementation. Requirements + Assumptions as a structured checklist with linked source evidence.
- **Pull request review** — reviewers check changes against the ticket requirements. Good PR descriptions separate "what was requested" from "additional changes I made" — the same requirements/assumptions split.
- **Test-driven development** — tests define requirements; the implementation is the process. TDD verification checks outcomes (tests pass/fail), not process (how the code works). This is outcome-oriented verification applied to software.
- **Audit reports** — financial audits decompose into assertions (requirements) and findings (outcomes). The auditor doesn't need to replay every transaction (process); they verify that the assertions hold.

## Relevance to project

The pipeline generates UI from intent. Verification of that generated UI should follow the outcome-oriented pattern:

1. **Requirements**: "Your prompt asked for: guest management, menu planning, timeline coordination. Here's how each is implemented in the generated UI." — maps to [[intent-output-traceability]].
2. **Assumptions**: "The system also added: dietary filtering (inferred from 'dinner party' context), RSVP tracking (common for event planning), cost estimation (not mentioned but frequently needed)." — maps to implicit intent surfacing from [[intent-decomposition]].

This decomposition is more useful than showing the user the pipeline's process ("first I decomposed your intent, then I selected the Overview+Detail pattern, then I mapped guests to a table component..."). The process may be correct but overwhelming; the outcome decomposition is actionable.

The false confidence finding (Study 3) is a warning for the pipeline's verification layer. Simply making augmented semantics visible might make users *more* confident when the generation is wrong — particularly if the requirements all appear to be met but an assumption was subtly incorrect. The antidote is [[cognitive-engagement-for-reliance]]: require analytical engagement (e.g., "does this assumption make sense for your use case?") not just checklist completion.

## Open threads

- The study used a Computer Use Agent (browser automation). Transfer to generative UI verification is plausible but untested. UI generation errors may be more visually apparent (the table looks wrong) or more subtle (the data binding is incorrect but the layout looks fine) than browser automation errors.
- The Requirements/Assumptions decomposition requires the agent to *know* which decisions were requirements vs. assumptions. For the genUI pipeline, this maps to explicit intent (from the user prompt) vs. inferred intent (from the LLM's domain knowledge). How reliable is this classification?
- Study 3's combined interface (Specification + linking) didn't improve accuracy meaningfully (g: 0.18). Why? The authors suggest false confidence offset the gains from better error detection tools. Could deeper analytical engagement (what-if exploration, not just checklist review) break this ceiling?
- The paper notes that traces should show what the agent *didn't* do — unfound information, skipped alternatives, unstated assumptions. This is the negative space problem: verification needs to surface absences, not just presences. For generative UI, this means showing "I didn't include a budget tracker — should I have?" alongside "I included these components."
